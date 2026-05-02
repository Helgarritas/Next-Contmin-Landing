import SolutionCard from "@/components/SolutionCard"

const items = [
  {
    title: "Perforación Diamantina",
    text: 'Extracción de testigos de roca en superficie e interior mina con precisión milimétrica.',
    image: "/image/solutions/diamantina_v2.png"
  },
  {
    title: "Perforación para Inyecciones",
    text: 'Inyección de cemento y lechada para estabilización de terreno y sellado de filtraciones.',
    image: "/image/solutions/inyecciones_v2.png"
  },
  {
    title: "Perforación RC",
    text: 'Circulación reversa para exploración minera rápida y eficiente con muestreo continuo.',
    image: "/image/solutions/rc_v2.png"
  },
  {
    title: "Perforación WW",
    text: 'Construcción de pozos de agua (Water Well) con equipos de última generación, garantizandoeficiencia y rendimiento hídrico.',
    image: "/image/solutions/ww_v2.png"
  },
  {
    title: "Perforación Geotécnica e Hidrogeología",
    text: 'Investigación de suelos y aguas subterráneas para proyectos de ingeniería.',
    image: "/image/solutions/geotecnica_v2.png"
  },
  {
    title: "Servicios Geológicos",
    text: 'Mapeo, muestreo y análisis geológico de campo para exploración y evaluación de yacimientos.',
    image: "/image/solutions/geologicos_v2.png"
  },
]


export default function SolutionsPage() {
  return (
    <>
      <section id="soluciones" className="mt-[180px] px-[70px] max-sm:px-[32px]">
        <div>
          <h2 className="text-3xl text-center uppercase">
            <span>resolvemos problemas</span>
            <br />
            <span>con experiencia de clase mundial</span>
          </h2>
        </div>
        <div className="mt-[60px] grid grid-cols-3 gap-6 gap-y-10
          max-sm:grid-cols-1 max-sm:gap-8
        ">
          {items.map((card, i) => (
            <SolutionCard key={i} card={card} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
