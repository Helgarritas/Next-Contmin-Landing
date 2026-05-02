"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface TypingAnimationProps {
  children?: string
  className?: string
  duration?: number
  delay?: number
  showCursor?: boolean
  blinkCursor?: boolean
}

export function TypingAnimation({
  children = "",
  className,
  duration = 100,
  delay = 0,
  showCursor = true,
  blinkCursor = true,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!elementRef.current || hasStarted.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          observer.disconnect()

          const graphemes = Array.from(children)
          let charIndex = 0

          const startTyping = () => {
            const interval = setInterval(() => {
              if (charIndex < graphemes.length) {
                charIndex++
                setDisplayedText(graphemes.slice(0, charIndex).join(""))
              } else {
                setIsComplete(true)
                clearInterval(interval)
              }
            }, duration)
          }

          if (delay > 0) {
            setTimeout(startTyping, delay)
          } else {
            startTyping()
          }
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [children, duration, delay])

  const shouldShowCursor = showCursor && !isComplete

  return (
    <span
      ref={elementRef}
      className={cn("inline-block leading-20 tracking-[-0.02em]", className)}
    >
      {displayedText}
      {shouldShowCursor && (
        <span
          className={cn("inline-block", blinkCursor && "animate-blink-cursor")}
        >
          |
        </span>
      )}
    </span>
  )
}
