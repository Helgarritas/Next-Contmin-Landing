"use client"

import CustomImage from "@/hooks/CustomImage";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Data {
  title: string;
  ubication: string;
  image: string;
}

interface Props {
  item: Data,
  index: number
}

export default function ProjectCard({ item, index }: Props) {
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
    <div ref={cardRef} className="flex flex-col gap-4">
      <div className="mx-6 h-[200px] relative rounded-[6px] overflow-hidden">
        <CustomImage src={item.image} alt={item.title} />
      </div>
      <div className="px-6 flex justify-between">
        <h3 className="text-lg uppercase">{item.title}</h3>
        <div>
          <p className="text-secondary-foreground capitalize">{item.ubication}</p>
        </div>
      </div>
    </div>
  );
}
