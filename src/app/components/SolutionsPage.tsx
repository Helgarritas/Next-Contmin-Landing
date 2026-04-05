import SolutionCard from "@/components/SolutionCard"

const items = [
  {
    title: "Perforación Diamantina",
    text: 'Extracción de testigos de roca en superficie e interior mina con precisión milimétrica.',
    image: "/image/solutions/diamantina.png"
  },
  {
    title: "Perforación para Inyecciones",
    text: 'Inyección de cemento y lechada para estabilización de terreno y sellado de filtraciones.',
    image: "/image/solutions/inyecciones.png"
  },
  {
    title: "Perforación RC",
    text: 'Circulación reversa para exploración minera rápida y eficiente con muestreo continuo.',
    image: "/image/solutions/rc.png"
  },
  {
    title: "Perforación WW",
    text: 'Construcción de pozos de agua con equipos de última generación.',
    image: "/image/solutions/ww.png"
  },
  {
    title: "Perforación Geotécnica e Hidrogeología",
    text: 'Investigación de suelos y aguas subterráneas para proyectos de ingeniería.',
    image: "/image/solutions/geotecnica.png"
  },
  {
    title: "Servicios Geológicos",
    text: 'Mapeo, muestreo y análisis geológico de campo para exploración y evaluación de yacimientos.',
    image: "/image/solutions/geologicos.png"
  },
]


export default function SolutionsPage() {
  return (
    <>
      <section id="soluciones" className="mt-[180px] px-[70px] max-sm:px-[32px]">
        <div>
          <h1 className="text-3xl text-center uppercase">
            <span>resolvemos problemas</span>
            <br />
            <span>con experiencia de clase mundial</span>
          </h1>
        </div>
        <div className="mt-[60px] grid grid-cols-3 place-items-center gap-y-8
          max-sm:grid-cols-1 max-sm:gap-6
        ">
          {items.map((card, i) => (
            <SolutionCard key={i} card={card} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
