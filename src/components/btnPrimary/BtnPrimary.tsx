"use client"

import { useCallback } from "react";
import { HyperText } from "../magicui/hyper-text";
import { ChevronRight } from "lucide-react";

interface Props {
  text: string;
  className?: string;
}

export default function BtnPrimary({ text = "contactar", className }: Props) {
  const handleClick = useCallback(() => {
    const el = document.getElementById(text);
    if (el) {
      const yOffset = -80; // el espacio que quieres dejar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [text]);

  return (
    <button
      onClick={handleClick}
      className={`${className} h-[52px] w-full flex cursor-pointer duration-200 ease transition-colors border-muted hover:bg-muted hover:border-y-[.5px]`}
    >
      <div className="h-full w-[2px] bg-primary"></div>
      <div className="flex-1 flex items-center w-full pr-4">
        <div className="flex-1 text-left text-base font-medium uppercase pl-4">
          <HyperText className="whitespace-nowrap">
            {text}
          </HyperText>
        </div>
        <ChevronRight className="w-5.5 h-5.5 shrink-0 opacity-80" />
      </div>
    </button>
  );
}
