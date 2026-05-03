import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

// ── 1. VALIDACIÓN ESTRICTA (Zod) ──
const contactSchema = z.object({
  nombre: z.string().min(2, "Nombre inválido").max(100, "Nombre muy largo").trim(),
  email: z.string().email("Correo inválido").trim(),
  telefono: z.string().regex(/^\d{9}$/, "Ingresa 9 dígitos").optional().or(z.literal("")).transform(v => v === "" ? undefined : v),
  empresa: z.string().max(100).optional().transform(v => v === "" ? undefined : v),
  mensaje: z.string().min(5, "Mensaje muy corto").max(2000, "Mensaje muy largo").trim(),
  turnstileToken: z.string().min(1, "Token de verificación requerido"),
  botField: z.string().optional(), // Honeypot
});

// ── 2. RATE LIMITER — Protección contra spam/bots ──
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

const rateLimitMap = new Map<string, { count: number; firstRequest: number }>();

setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now - value.firstRequest > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(key);
    }
  }
}, 30 * 60 * 1000);

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.firstRequest > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  record.count++;
  return record.count > RATE_LIMIT_MAX;
}

// ── 3. SANITIZAR HTML — previene XSS en el email ──
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ── 4. VERIFICAR TURNSTILE TOKEN ──
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY no configurada.");
    return false;
  }

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: token,
          remoteip: ip,
        }),
      }
    );

    const data = await res.json();
    return data.success === true;
  } catch {
    console.error("Error verificando Turnstile.");
    return false;
  }
}

export async function POST(req: Request) {
  try {
    // ── Rate Limiting ──
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Demasiados intentos. Intenta de nuevo en 15 minutos." },
        { status: 429 }
      );
    }

    // ── Validar tamaño del body (max 10KB) ──
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 10_240) {
      return NextResponse.json(
        { error: "Solicitud demasiado grande." },
        { status: 413 }
      );
    }

    const rawBody = await req.json();

    // ── Sanitización y validación ──
    const { turnstileToken, botField, ...formFields } = contactSchema.parse(rawBody);

    // ── Verificar Honeypot ──
    if (botField && botField.length > 0) {
      // Si el campo trampa tiene texto, es un bot.
      // Retornamos 200 OK para engañar al bot de que tuvo éxito, pero no enviamos nada.
      return NextResponse.json({ message: "Mensaje enviado." }, { status: 200 });
    }

    // ── Verificar Turnstile ──
    const isHuman = await verifyTurnstile(turnstileToken, ip);
    if (!isHuman) {
      return NextResponse.json(
        { error: "Verificación de seguridad fallida. Intenta de nuevo." },
        { status: 403 }
      );
    }

    // ── Credenciales aisladas en backend ──
    const emailHost = process.env.EMAIL_HOST;
    const emailPort = Number(process.env.EMAIL_PORT) || 587;
    const emailSecure = process.env.EMAIL_SECURE === "true";
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailFrom = process.env.EMAIL_FROM || emailUser;

    if (!emailUser || !emailPass || !emailHost) {
      console.error("Credenciales de correo no configuradas.");
      return NextResponse.json(
        { error: "Error de configuración del servidor." },
        { status: 500 }
      );
    }

    const data = formFields;

    // ── Escapar datos antes de inyectarlos en HTML ──
    const safe = {
      nombre: escapeHtml(data.nombre),
      email: escapeHtml(data.email),
      telefono: data.telefono ? escapeHtml(data.telefono) : null,
      empresa: data.empresa ? escapeHtml(data.empresa) : null,
      mensaje: escapeHtml(data.mensaje),
    };

    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailSecure,
      auth: { user: emailUser, pass: emailPass },
    });

    await transporter.sendMail({
      from: `"Drillcorp Web" <${emailFrom}>`,
      to: "poppingpleace2@gmail.com",
      replyTo: data.email,
      subject: `Nueva consulta web de ${data.nombre}${data.empresa ? ` — ${data.empresa}` : ""}`,
      text: [
        `Nombre: ${data.nombre}`,
        `Email: ${data.email}`,
        data.telefono ? `Teléfono: ${data.telefono}` : null,
        data.empresa ? `Empresa: ${data.empresa}` : null,
        "",
        "Mensaje:",
        data.mensaje,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
            Nueva consulta desde la web
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #333; width: 120px;">Nombre</td>
              <td style="padding: 8px 12px; color: #555;">${safe.nombre}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #333;">Email</td>
              <td style="padding: 8px 12px;"><a href="mailto:${safe.email}" style="color: #dc2626;">${safe.email}</a></td>
            </tr>
            ${safe.telefono ? `
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #333;">Teléfono</td>
              <td style="padding: 8px 12px; color: #555;">${safe.telefono}</td>
            </tr>` : ""}
            ${safe.empresa ? `
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #333;">Empresa</td>
              <td style="padding: 8px 12px; color: #555;">${safe.empresa}</td>
            </tr>` : ""}
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-left: 3px solid #dc2626; border-radius: 4px;">
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #333;">Mensaje:</p>
            <p style="margin: 0; color: #555; white-space: pre-wrap;">${safe.mensaje}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Enviado desde el formulario de contacto de drillcorp.com.pe
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Mensaje enviado correctamente." },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join(", ");
      console.error("Zod validation error:", fieldErrors);
      return NextResponse.json(
        { error: `Formato de datos inválido: ${fieldErrors}` },
        { status: 400 }
      );
    }
    console.error("Error al enviar correo:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
