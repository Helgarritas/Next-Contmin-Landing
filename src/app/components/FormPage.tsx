"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

export default function FormPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    mensaje: "",
    botField: "", // Honeypot field
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      setStatus("error");
      setErrorMsg("Completa la verificación de seguridad.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al enviar el mensaje");
      }

      setStatus("success");
      setFormData({ nombre: "", email: "", telefono: "", empresa: "", mensaje: "", botField: "" });
      setTurnstileToken(null);
      turnstileRef.current?.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error inesperado");
      turnstileRef.current?.reset();
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contactar"
      className="mt-[150px] mb-[100px] px-[70px] max-sm:px-[32px] max-w-[1400px] mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Columna izquierda - Imagen */}
        <div className="relative w-full h-[600px] max-sm:h-[400px]">
          <div className="relative w-full h-full z-10 bg-[#060813] [mask-image:linear-gradient(to_bottom,black_85%,transparent)]">
            <Image
              src="/image/Form_image.jpg"
              alt="Equipo de perforación en operación"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={80}
              className="object-cover object-[center_30%] opacity-90 grayscale-[20%]"
              loading="lazy"
            />
          </div>
        </div>

        {/* Columna derecha - Título + Formulario */}
        <div className="flex flex-col w-full">
          <div className="mb-10">
            <h2 className="text-3xl uppercase mb-3">
              Contáctanos
            </h2>
            <p className="text-secondary-foreground leading-relaxed w-full">
              Nuestro equipo de especialistas está listo para analizar tus requerimientos y ofrecerte la mejor solución en perforación.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col gap-8 w-full p-8 sm:p-10 rounded-2xl border border-border bg-card/50 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
              <div className="flex flex-col group">
                <label htmlFor="nombre" className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-2 transition-colors">
                  Nombre Completo
                </label>
                <input
                  id="nombre" name="nombre" type="text"
                  value={formData.nombre} onChange={handleChange}
                  placeholder="Ingresa tu nombre"
                  className="w-full pb-3 bg-transparent border-b border-white/20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary hover:border-white/40 transition-all duration-300"
                  required
                />
              </div>
              <div className="flex flex-col group">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-2 transition-colors">
                  Correo Electrónico
                </label>
                <input
                  id="email" name="email" type="email"
                  value={formData.email} onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full pb-3 bg-transparent border-b border-white/20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary hover:border-white/40 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
              <div className="flex flex-col group">
                <label htmlFor="telefono" className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-2 transition-colors">
                  Teléfono
                </label>
                <input
                  id="telefono" name="telefono" type="tel"
                  value={formData.telefono} onChange={handleChange}
                  placeholder="+51 999 999 999"
                  className="w-full pb-3 bg-transparent border-b border-white/20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary hover:border-white/40 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col group">
                <label htmlFor="empresa" className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-2 transition-colors">
                  Empresa
                </label>
                <input
                  id="empresa" name="empresa" type="text"
                  value={formData.empresa} onChange={handleChange}
                  placeholder="Nombre de tu empresa"
                  className="w-full pb-3 bg-transparent border-b border-white/20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary hover:border-white/40 transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col group">
              <label htmlFor="mensaje" className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-2 transition-colors">
                Mensaje
              </label>
              <textarea
                id="mensaje" name="mensaje"
                value={formData.mensaje} onChange={handleChange}
                placeholder="Cuéntanos sobre tu proyecto o requerimiento..."
                rows={3}
                className="w-full py-3 bg-transparent border-b border-white/20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary hover:border-white/40 transition-all duration-300 resize-none"
                required
              />
            </div>

            {/* Honeypot field */}
            <div className="hidden" aria-hidden="true">
              <input type="text" name="botField" value={formData.botField} onChange={handleChange} tabIndex={-1} />
            </div>

            <div className="mt-2">
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => setTurnstileToken(null)}
                onExpire={() => setTurnstileToken(null)}
                options={{ theme: "dark", size: "flexible" }}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || !turnstileToken}
              className="mt-4 flex items-center justify-between w-full h-14 px-6 bg-white text-black font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-primary hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <span className="relative z-10">{status === "loading" ? "Procesando solicitud..." : "Enviar Mensaje"}</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              {/* Sutil brillo industrial al hacer hover */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            {status === "success" && (
              <div className="flex items-center gap-3 mt-2 text-[10px] font-bold tracking-[0.15em] text-green-500 uppercase animate-in fade-in slide-in-from-left-2">
                <span className="px-1.5 py-0.5 border border-green-500/50">OK</span>
                <span>[LOG_SUCCESS]: Mensaje transmitido correctamente.</span>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-3 mt-2 text-[10px] font-bold tracking-[0.15em] text-red-500 uppercase animate-in fade-in slide-in-from-left-2">
                <span className="px-1.5 py-0.5 border border-red-500/50">ERR</span>
                <span>[LOG_ERROR]: {errorMsg || "Fallo en la transmisión."}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
