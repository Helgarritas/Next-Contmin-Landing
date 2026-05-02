"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
  className?: string;
  children?: React.ReactNode;
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();

          const from = direction === "down" ? value : startValue;
          const to = direction === "down" ? startValue : value;
          const startTime = performance.now() + delay * 1000;
          const duration = 1500; // ms

          const formatter = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          });

          const animate = (currentTime: number) => {
            if (currentTime < startTime) {
              requestAnimationFrame(animate);
              return;
            }

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = from + (to - from) * eased;

            if (ref.current) {
              ref.current.textContent = formatter.format(
                Number(current.toFixed(decimalPlaces))
              );
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0, margin: "0px" } as IntersectionObserverInit
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, startValue, direction, delay, decimalPlaces, hasAnimated]);

  return (
    <span
      ref={ref}
      className={cn("", className)}
      {...props}
    >
      {startValue}
    </span>
  );
}
