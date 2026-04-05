"use client";

import { useState } from "react";
import Image from "next/image";

export default function FormPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    mensaje: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al enviar el mensaje");
      }

      setStatus("success");
      setFormData({ nombre: "", email: "", telefono: "", empresa: "", mensaje: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error inesperado");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contactar"
      className="mt-[180px] mb-[100px] px-[70px] max-sm:px-[32px]"
    >
      <div className="grid lg:grid-cols-2 gap-[50px] max-sm:grid-cols-1">
        {/* Columna izquierda - Imagen */}
        <div className="relative w-full min-h-[500px] rounded-2xl overflow-hidden max-sm:min-h-[300px]">
          <Image
            src="/image/contact.png"
            alt="Equipo de perforación en operación"
            fill
            className="object-cover"
          />
        </div>

        {/* Columna derecha - Título + Formulario */}
        <div className="flex flex-col gap-8 lg:justify-center lg:px-12 xl:px-20">
          <div>
            <h1 className="text-3xl uppercase">Contáctanos</h1>
            <p className="mt-4 text-secondary-foreground">
              ¿Tienes un proyecto en mente o necesitas una solución especializada
              en perforación? Completa el formulario y nuestro equipo se comunicará
              contigo a la brevedad.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm"
          >
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="nombre" className="text-sm text-foreground">
                  Nombre completo
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="h-11 px-4 rounded-lg bg-input/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:border-neutral-500 focus:ring-neutral-500 transition-all"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm text-foreground">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="h-11 px-4 rounded-lg bg-input/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:border-neutral-500 focus:ring-neutral-500 transition-all"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="telefono"
                  className="text-sm text-foreground"
                >
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+51 999 999 999"
                  className="h-11 px-4 rounded-lg bg-input/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:border-neutral-500 focus:ring-neutral-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="empresa"
                  className="text-sm text-foreground"
                >
                  Empresa
                </label>
                <input
                  id="empresa"
                  name="empresa"
                  type="text"
                  value={formData.empresa}
                  onChange={handleChange}
                  placeholder="Nombre de tu empresa"
                  className="h-11 px-4 rounded-lg bg-input/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:border-neutral-500 focus:ring-neutral-500 transition-all"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="mensaje" className="text-sm text-foreground">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Cuéntanos sobre tu proyecto..."
                rows={5}
                className="px-4 py-3 rounded-lg bg-input/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:border-neutral-500 focus:ring-neutral-500 transition-all resize-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-12 mt-2 rounded-lg bg-primary font-bold uppercase text-sm tracking-wider hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Enviando..." : "Enviar mensaje"}
            </button>
            {status === "success" && (
              <p className="text-sm text-green-400 text-center mt-2">
                ✓ Mensaje enviado correctamente. Nos comunicaremos contigo pronto.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400 text-center mt-2">
                ✗ {errorMsg || "Error al enviar. Intenta de nuevo."}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
