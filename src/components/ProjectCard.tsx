"use client"

import CustomImage from "@/hooks/CustomImage";
import { useEffect, useRef } from "react";

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
    <div ref={cardRef} className="flex flex-col gap-4 opacity-0 translate-y-5 transition-all duration-700 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
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
