"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import CustomImage from "@/hooks/CustomImage";

interface Equipment {
  title: string;
  description: string;
  image: string;
}

interface Props {
  item: Equipment;
  index: number;
}

export default function EquipmentCard({ item, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 40 },
        {
          duration: 0.8,
          autoAlpha: 1,
          y: 0,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col items-start gap-4 rounded-xl border border-border/50 bg-card/20 p-6 backdrop-blur-md transition-all hover:bg-card/40 hover:border-primary/50"
    >
      <div className="relative h-[240px] w-full overflow-hidden rounded-lg bg-black/50">
        <CustomImage
          src={item.image}
          alt={item.title}
          className="transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        {/* Un brillo sutil encima */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <h3 className="text-xl uppercase text-primary tracking-wide">
          {item.title}
        </h3>
        <p className="text-sm text-secondary-foreground leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}
