import { TypingAnimation } from "@/components/magicui/typing-animation";
import BtnPrimary from "@/components/btnPrimary/BtnPrimary";
import Image from "next/image";

export default function BannerPage() {
  return (
    <>
      <section id="hogar" className="h-[100vh] pt-[80px] px-[70px] flex items-center 
        max-sm:px-[32px] max-sm:pt-0
      ">
        <div className="w-full h-full relative flex items-center rounded-[20px] overflow-hidden">
          <style>{`
            @keyframes kenburns {
              0% { transform: scale(1.0) translate(0, 0); }
              50% { transform: scale(1.08) translate(-1%, -1%); }
              100% { transform: scale(1.0) translate(0, 0); }
            }
            .animate-kenburns {
              animation: kenburns 25s ease-in-out infinite;
            }
          `}</style>

          <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            <Image
              src="/image/banner/banner_bg.png"
              alt="Drillcorp - Perforación minera"
              fill
              className="object-cover animate-kenburns"
              priority
            />
            {/* Gradiente izquierdo para legibilidad del texto */}
            <div className="absolute inset-0 z-1" style={{ background: 'linear-gradient(to right, rgba(6,8,19,0.92) 0%, rgba(6,8,19,0.5) 25%, transparent 45%)' }} />
            {/* Gradiente inferior sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060813]/60 to-transparent z-1" />
          </div>
          <div className="pl-10 w-[430px] max-sm:pl-0 z-10">
            <h1 className="uppercase min-h-[180px] max-sm:min-h-[144px]">
              <TypingAnimation className="text-6xl max-sm:text-5xl" duration={50}>
                la innovacion es parte de nuestro adn
              </TypingAnimation>
            </h1>
            <p className="mt-2.5 mb-6 text-secondary-foreground">
              En Drillcorp, desarrollamos soluciones mineras innovadoras y sostenibles, impulsando el crecimiento del sector con excelencia operativa y un firme compromiso con el futuro.
            </p>
            <a href="#contactar" >
              <BtnPrimary text={"contactar"} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
