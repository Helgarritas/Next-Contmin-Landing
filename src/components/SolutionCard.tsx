"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomImage from "@/hooks/CustomImage";

gsap.registerPlugin(ScrollTrigger);

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
            start: "top 80%",
          },
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="solution-card mx-6 h-[370px] relative flex items-end rounded-[6px] overflow-hidden"
    >
      <div className="px-5 py-4 space-y-0.5">
        <h3 className="text-lg uppercase">{card.title}</h3>
        <p className="text-base text-secondary-foreground">{card.text}</p>
      </div>
      <CustomImage
        src={card.image}
        alt={card.image}
        style={{ maskImage: "linear-gradient(to bottom, #060813 70%, transparent" }}
      />
    </div>
  );
}
