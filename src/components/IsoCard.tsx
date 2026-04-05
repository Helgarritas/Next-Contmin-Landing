"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

interface Item {
  title: string;
  text: string;
  image: string;
}

interface Props {
  item: Item;
  index: number;
}

export default function IsoCard({ item, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 30 },
        {
          duration: 0.8,
          autoAlpha: 1,
          y: 0,
          delay: index * 0.2,
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
      className="flex flex-col items-center text-center gap-5 flex-1 max-sm:flex-none max-sm:w-full"
    >
      <div className="w-[120px] h-[120px] max-sm:w-[100px] max-sm:h-[100px] relative flex items-center justify-center">
        <Image
          src={item.image}
          alt={item.title}
          width={120}
          height={120}
          className="object-contain"
        />
      </div>
      <div className="space-y-2 max-w-[280px] max-sm:max-w-full">
        <h4 className="text-lg uppercase font-medium">{item.title}</h4>
        <p className="text-sm text-secondary-foreground leading-relaxed">{item.text}</p>
      </div>
    </div>
  );
}
