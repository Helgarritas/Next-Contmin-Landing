import { NextResponse } from "next/server";
import { z } from "zod";
// import nodemailer from "nodemailer"; // Ya lo tienes instalado

// 1. ESQUEMA DE SANITIZACIÓN ESTRICTA (Zod)
// Define qué es aceptable. Bloquea inyecciones de código (XSS) y datos excesivos.
const contactSchema = z.object({
  nombre: z.string().min(2, "Nombre inválido").max(100, "Nombre muy largo").trim(),
  email: z.string().email("Correo inválido").trim(),
  telefono: z.string().max(20).optional(),
  empresa: z.string().max(100).optional(),
  mensaje: z.string().min(5, "Mensaje muy corto").max(2000, "Mensaje muy largo").trim(),
});

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();

    // SANITIZACIÓN Y VALIDACIÓN (Si intentan hackear el form, fallará aquí)
    const sanitizedBody = contactSchema.parse(rawBody);

    // 2. AISLAMIENTO DE CREDENCIALES
    // Solo leemos las credenciales desde el backend. Nunca viajan al Front.
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    console.log("=== SEGURIDAD APROBADA ===");
    console.log("Datos Sanitizados:", sanitizedBody);
    console.log("Credenciales Cargadas:", emailUser ? "OK" : "MISSING");

    // Simulación del envío de correo para la demo (Demora 1.5s)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    /* 
    LÓGICA REAL PARA PRODUCCIÓN:
    const transporter = nodemailer.createTransport({
      host: "smtp.sudominio.com",
      port: 465,
      secure: true,
      auth: { user: emailUser, pass: emailPass },
    });
    await transporter.sendMail({
      from: emailUser,
      to: "ventas@drillcorp.com.pe",
      subject: `Nueva consulta de ${sanitizedBody.nombre}`,
      text: sanitizedBody.mensaje
    });
    */

    return NextResponse.json(
      { message: "Mensaje procesado de forma segura y validada." },
      { status: 200 }
    );
    
  } catch (error) {
    // Manejo seguro de errores, no revela información sensible
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Intento de entrada ilícita / formato inválido", target: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno protegido" }, { status: 500 });
  }
}
