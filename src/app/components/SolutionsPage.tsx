import SolutionCard from "@/components/SolutionCard"

const items = [
  {
    title: "mineria subterranea",
    text: 'Soluciones avanzadas para maximizar la productividad operativa.',
    image: "/image/solutions/subterraneo.jpg"
  },
  {
    title: "mineria superficial",
    text: 'Tecnología especializada para operaciones eficientes y seguras.',
    image: "/image/solutions/superficial.jpg"
  },
  {
    title: "alquiler de maquinaria",
    text: 'Amplia flota de equipos disponibles para cualquier proyecto.',
    image: "/image/solutions/maquinaria.jpg"
  },
  {
    title: "obras civiles",
    text: 'Desarrollamos proyectos sólidos con estándares de calidad garantizados.',

    image: "/image/solutions/civiles.jpg"
  },
]


export default function SolutionsPage() {
  return (
    <>
      <section className="mt-[100px] px-[70px]">
        <div>
          <h1 className="text-3xl text-center uppercase">
            <p>resolvemos problemas</p>
            <p>con experiencia de clase mundial</p>
          </h1>
        </div>
        <div className="mt-[60px] grid grid-cols-4 place-items-center">
          {items.map((card, i) => (
            <SolutionCard key={i} card={card}/>
          ))}
        </div>
      </section>
    </>
  )
}
