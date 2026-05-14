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
    text: 'Construcción de pozos de agua con equipos de última generación, garantizando eficiencia y rendimiento.',
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
        <div className="mt-[60px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 lg:gap-y-10">
          {items.map((card, i) => (
            <SolutionCard key={i} card={card} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
