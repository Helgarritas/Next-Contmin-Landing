"use client";

import { useEffect, useRef } from "react";

const items = [
  {
    title: "Reducir costos internos",
    text: "Reducir costos a corto plazo dejando en nuestras manos la gestión de perforación mientras se centran en potenciar los recursos geológicos.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Reducir los costos de perforación",
    text: "Implementamos y desarrollamos mejoras para reducir costos operativos e incrementar la productividad y calidad.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Optimizar los proyectos de perforación",
    text: "Los proyectos de perforación serán estables y eficientes en el corto y mediano plazo.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

function ValueCard({
  item,
  index,
}: {
  item: (typeof items)[0];
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
          }, index * 150);
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
      className="group relative flex flex-col items-center text-center gap-6 p-8 rounded-2xl border border-border bg-card/30 opacity-0 scale-95 translate-y-5 transition-all duration-700 ease-out [&.is-visible]:opacity-100 [&.is-visible]:scale-100 [&.is-visible]:translate-y-0"
    >
      {/* Glow accent */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon with scale on hover */}
      <div className="w-20 h-20 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-primary/20">
        {item.icon}
      </div>

      {/* Title */}
      <h4 className="text-xl uppercase font-medium leading-tight">{item.title}</h4>

      {/* Description */}
      <p className="text-secondary-foreground leading-relaxed">
        {item.text}
      </p>
    </div>
  );
}

export default function ValuePropositionPage() {
  return (
    <section id="propuesta" className="mt-[120px] mb-[150px] px-[70px] max-sm:px-[32px]">
      <div className="flex flex-col gap-[60px] max-sm:gap-[50px]">
        <div className="text-center">
          <h3 className="text-3xl uppercase">Propuesta de valor</h3>
          <p className="mt-4 text-secondary-foreground max-w-[600px] mx-auto">
            Nos enfocamos en generar impacto real en sus operaciones a través de tres pilares fundamentales.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-8 max-sm:grid-cols-1 max-sm:gap-10">
          {items.map((item, i) => (
            <ValueCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
