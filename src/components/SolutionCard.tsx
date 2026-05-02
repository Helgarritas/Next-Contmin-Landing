"use client"

import { useEffect, useRef } from "react";
import CustomImage from "@/hooks/CustomImage";

interface Card {
  title: string;
  text: string;
  image: string;
}

interface Props {
  card: Card;
  index: number;
}

export default function SolutionCard({ card, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the fade-in based on index
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, index * 100);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="solution-card group w-full h-[400px] relative flex items-end rounded-2xl overflow-hidden cursor-pointer border border-white/5 transition-all duration-500 bg-[#060813] opacity-0 translate-y-4 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <CustomImage
          src={card.image}
          alt={card.title}
          loading="lazy"
          quality={75}
          className="w-full h-full object-cover object-[center_15%] transition-all duration-700 ease-out group-hover:scale-110 opacity-50 group-hover:opacity-90 grayscale-[60%] group-hover:grayscale-0"
        />
      </div>

      {/* Gradients for text readability & effect - strictly at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-[#060813] from-10% via-[#060813]/70 to-transparent z-10 pointer-events-none" />

      {/* Card Content */}
      <div className="p-5 pb-4 relative z-20 w-full transition-transform duration-500 ease-out">
        {/* Accent Line */}
        <div className="w-8 h-[2px] bg-primary mb-3 transition-all duration-500 ease-out group-hover:w-16" />
        
        <h3 className="text-base uppercase font-semibold text-white mb-1.5 transition-colors duration-300">
          {card.title}
        </h3>
        
        <p className="text-secondary-foreground leading-relaxed line-clamp-3">
          {card.text}
        </p>
      </div>
    </div>
  );
}
