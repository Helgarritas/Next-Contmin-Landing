import { TypingAnimation } from "@/components/magicui/typing-animation";
import BtnPrimary from "@/components/btnPrimary/BtnPrimary";
import Spline from '@splinetool/react-spline/next';

export default function BannerPage() {
  return (
    <>
      <section id="hogar" className="h-[100vh] pt-[80px] px-[70px] flex items-center 
        max-sm:px-[32px] max-sm:pt-0 pb-6
      ">
        {/* Contenedor del banner con fondo distinto, borde sutil y sombra para destacar del resto de la web */}
        <div className="w-full h-full relative flex items-center rounded-[30px] overflow-hidden border border-white/5 bg-gradient-to-br from-[#0c0f22] to-[#060813] shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          
          {/* El contenedor de Spline */}
          <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
            <Spline
              scene="https://prod.spline.design/LNExFyWjFzaEKY33/scene.splinecode?v=2" 
              className="w-full h-full outline-none"
            />

            {/* Gradiente izquierdo para legibilidad del texto (reducido para no tapar el Spline) */}
            <div
              className="absolute inset-0 z-1 pointer-events-none"
              role="presentation"
              aria-hidden="true"
              style={{ background: 'linear-gradient(to right, rgba(6,8,19,0.85) 0%, rgba(6,8,19,0.2) 25%, transparent 35%)' }}
            />
            {/* Gradiente inferior (mucho más sutil) */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#060813]/30 to-transparent z-1 pointer-events-none h-[30%] mt-auto"
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
