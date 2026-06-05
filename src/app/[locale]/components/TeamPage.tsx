"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const memberImages = [
  "/image/Form_image.jpg",
  "/image/Form_image.jpg",
  "/image/Form_image.jpg",
];

/* ── Animated team card ── */
function TeamCard({
  member,
  index,
}: {
  member: { name: string; role: string };
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, index * 200);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative w-full h-[340px] md:h-[350px] lg:h-[400px] flex items-end rounded-2xl border border-white/5 bg-[#060813] overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 cursor-pointer"
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={memberImages[index]}
          alt={`${member.name} — ${member.role}`}
          fill
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 opacity-60 group-hover:opacity-100 grayscale-[40%] group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* ── Gradients for text readability ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#060813] from-10% via-[#060813]/70 to-transparent z-10 pointer-events-none" />

      {/* ── Info side (bottom) ── */}
      <div className="relative z-20 flex flex-col w-full px-6 md:px-8 pb-6 md:pb-8 pt-4 transition-transform duration-500 ease-out">
        {/* Accent Line */}
        <div className="w-8 h-[2px] bg-primary mb-3 transition-all duration-500 ease-out group-hover:w-16" />

        {/* Name */}
        <h3 className="text-lg lg:text-lg uppercase font-bold text-foreground leading-tight">
          {member.name}
        </h3>
        {/* Role */}
        <span className="text-[10px] sm:text-sm text-secondary-foreground block">
          {member.role}
        </span>
      </div>
    </div>
  );
}

/* ── Section ── */
export default function TeamPage() {
  const t = useTranslations("team");
  const members = t.raw("members") as Array<{ name: string; role: string }>;

  return (
    <section id="equipo" className="mt-[180px] px-[200px] max-sm:px-[32px]">
      <div className="flex flex-col gap-[60px] max-sm:gap-[50px]">
        {/* ── Heading ── */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 lg:gap-10">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl lg:text-4xl uppercase ">
              {t("title")}
            </h2>
          </div>
          <div className="md:w-1/2 md:max-w-xl">
            <p className="text-description text-secondary-foreground text-sm md:text-base leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>

        {/* ── Team cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {members.map((member, i) => (
            <TeamCard key={i} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
