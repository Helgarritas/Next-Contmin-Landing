"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  isTextarea?: boolean;
  rows?: number;
}

const FormInput = ({ label, isTextarea, className, ...props }: FormInputProps) => {
  const baseClasses = "w-full bg-transparent border-b border-white/20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary hover:border-white/40 transition-all duration-300";

  return (
    <div className="flex flex-col group">
      <label htmlFor={props.id || props.name} className="text-[16px] capitalize text-foreground mb-2 transition-colors">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={`${baseClasses} py-3 resize-none text-[17px] ${className || ""}`}
        />
      ) : (
        <input
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          className={`${baseClasses} pb-2 text-[17px] ${className || ""}`}
        />
      )}
    </div>
  );
};

export default function FormPage() {
  const t = useTranslations("form");
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
      setErrorMsg(t("errorCaptcha"));
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
        throw new Error(data.error || t("errorSend"));
      }

      setStatus("success");
      setFormData({ nombre: "", email: "", telefono: "", empresa: "", mensaje: "", botField: "" });
      setTurnstileToken(null);
      turnstileRef.current?.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : t("errorUnexpected"));
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
        <div className="relative w-full h-[250px] md:h-[400px] lg:h-[600px]">
          <div className="relative w-full h-full z-10 bg-[#060813] [mask-image:linear-gradient(to_bottom,black_85%,transparent)]">
            <Image
              src="/image/Form_image.jpg"
              alt={t("imageAlt")}
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
            <h2 className="text-3xl uppercase text-center">
              {t("title")}
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col gap-6 sm:gap-8 w-full p-6 sm:p-10 rounded-2xl border border-border bg-card/50 shadow-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <FormInput
                label={t("fullName")} id="nombre" name="nombre" type="text"
                value={formData.nombre} onChange={handleChange}
                placeholder={t("namePlaceholder")} required
              />
              <FormInput
                label={t("email")} id="email" name="email" type="email"
                value={formData.email} onChange={handleChange}
                placeholder={t("emailPlaceholder")} required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <FormInput
                label={t("phone")} id="telefono" name="telefono" type="tel"
                value={formData.telefono} onChange={handleChange}
                placeholder={t("phonePlaceholder")} maxLength={9}
              />
              <FormInput
                label={t("company")} id="empresa" name="empresa" type="text"
                value={formData.empresa} onChange={handleChange}
                placeholder={t("companyPlaceholder")}
              />
            </div>

            <FormInput
              isTextarea
              label={t("message")} id="mensaje" name="mensaje"
              value={formData.mensaje} onChange={handleChange}
              placeholder={t("messagePlaceholder")}
              rows={3} required
            />

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
              <span className="relative z-10">{status === "loading" ? t("submitLoading") : t("submitButton")}</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            {status === "success" && (
              <div className="flex items-center gap-3 mt-2 text-[10px] font-bold tracking-[0.15em] text-green-500 uppercase animate-in fade-in slide-in-from-left-2">
                <span className="px-1.5 py-0.5 border border-green-500/50">OK</span>
                <span>{t("successMessage")}</span>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-3 mt-2 text-[10px] font-bold tracking-[0.15em] text-red-500 uppercase animate-in fade-in slide-in-from-left-2">
                <span className="px-1.5 py-0.5 border border-red-500/50">ERR</span>
                <span>[LOG_ERROR]: {errorMsg || t("errorDefault")}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
