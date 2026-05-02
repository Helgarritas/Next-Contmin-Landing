import { NumberTicker } from "@/components/magicui/number-ticker";

const items = [
  { prefix: "+", title: 6, text: "tipos de perforación" },
  { prefix: "", title: 100, text: "% operaciones seguras" },
  { prefix: "+", title: 6, text: "líneas de servicio" },
  { prefix: "+", title: 24, text: "horas de soporte operativo" },
]

export default function AboutPage() {
  return (
    <>
      <section id="nosotros" className="mt-[180px] px-[70px] flex flex-col gap-[90px]
        max-sm:px-[32px] max-sm:gap-[60px]
      ">
        <div className="grid grid-cols-2
          max-sm:grid-cols-1 max-sm:space-y-2.5
        ">
          <h2 className="text-3xl uppercase">acerca de nuestra empresa</h2>
          <p className="pl-6 pr-8 text-secondary-foreground leading-relaxed max-sm:pl-0">
            Somos una empresa especializada en servicios de perforación técnica para proyectos de alta exigencia. Operamos bajo los más estrictos estándares internacionales de seguridad, eficiencia y control de calidad. Nuestro compromiso se centra en cuatro pilares fundamentales: el cumplimiento riguroso de los plazos de entrega, la optimización de los costos operativos de nuestros clientes, la entrega de información geológica altamente confiable y el desarrollo de operaciones que priorizan la seguridad y la sostenibilidad ambiental.
          </p>
        </div>
        <div className="grid grid-cols-4 
          max-sm:grid-cols-1 max-sm:gap-7
        ">
          {items.map((item, i) => (
            <div key={i} className="pl-6 border-l-[2px] border-primary max-sm: z-10 
              max-sm:w-full max-sm:pl-10 max-sm:flex max-sm:items-center max-sm:gap-2
            ">
              <p className="text-6xl font-medium">
                {item.prefix}<NumberTicker value={item.title}></NumberTicker>
              </p>
              <h3 className="capitalize">{item.text}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
