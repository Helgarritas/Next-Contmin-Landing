"use client";

import { TypingAnimation } from "@/components/magicui/typing-animation";
import BtnPrimary from "@/components/btnPrimary/BtnPrimary";
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-black animate-pulse"></div>
});

export default function BannerPage() {
  return (
    <>
      <section id="hogar" className="h-[100vh] pt-[80px] px-[70px] flex items-center 
        max-sm:px-[32px] max-sm:pt-0
      ">
        <div className="w-full h-full relative flex items-center rounded-[20px] overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden bg-black flex items-center justify-center">
            <Spline 
              scene="https://prod.spline.design/Jfpw9IVNB7cjToCg/scene.splinecode" 
              className="w-full h-full"
              style={{ width: '100%', height: '100%' }}
            />
            {/* Gradiente izquierdo para legibilidad del texto */}
            <div
              className="absolute inset-0 z-1 pointer-events-none"
              role="presentation"
              aria-hidden="true"
              style={{ background: 'linear-gradient(to right, rgba(6,8,19,0.92) 0%, rgba(6,8,19,0.5) 25%, transparent 45%)' }}
            />
            {/* Gradiente inferior sutil */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#060813]/60 to-transparent z-1 pointer-events-none"
              role="presentation"
              aria-hidden="true"
            />
          </div>
          <div className="pl-10 w-[430px] max-sm:pl-0 z-10 pointer-events-none">
            <div className="pointer-events-auto">
              <h1 className="uppercase min-h-[180px] max-sm:min-h-[144px]">
                <TypingAnimation className="text-6xl max-sm:text-5xl" duration={50}>
                  la innovacion es parte de nuestro adn
                </TypingAnimation>
              </h1>
              <p className="mt-2.5 mb-6 text-secondary-foreground leading-relaxed">
                En Drillcorp, desarrollamos soluciones mineras innovadoras y sostenibles, impulsando el crecimiento del sector con excelencia operativa y un firme compromiso con el futuro.
              </p>
              <a href="#contactar" className="inline-block">
                <BtnPrimary text={"contactar"} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
