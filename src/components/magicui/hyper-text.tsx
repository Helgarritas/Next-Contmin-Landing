"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type CharacterSet = string[] | readonly string[];

interface HyperTextProps {
  /** The text content to be animated */
  children: string;
  /** Optional className for styling */
  className?: string;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  /** Whether to trigger animation on hover */
  animateOnHover?: boolean;
  /** Custom character set for scramble effect */
  characterSet?: CharacterSet;
}

const DEFAULT_CHARACTER_SET = Object.freeze(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
) as readonly string[];

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      iterationCount.current = 0;
      setIsAnimating(true);
    }
  };

  // Handle initial animation with delay
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsAnimating(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  // Handle scramble animation
  useEffect(() => {
    if (!isAnimating) return;

    const chars = Array.from(children);
    const intervalDuration = duration / (chars.length * 10);
    const maxIterations = chars.length;

    const interval = setInterval(() => {
      if (iterationCount.current < maxIterations) {
        setDisplayText(
          chars
            .map((char, index) =>
              char === " "
                ? char
                : index <= iterationCount.current
                  ? children[index]
                  : characterSet[getRandomInt(characterSet.length)],
            )
            .join(""),
        );
        iterationCount.current += 0.1;
      } else {
        setDisplayText(children);
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [children, duration, isAnimating, characterSet]);

  return (
    <div
      className={cn("overflow-hidden font-mono whitespace-nowrap", className)}
      onMouseEnter={handleAnimationTrigger}
    >
      {displayText.toUpperCase()}
    </div>
  );
}
