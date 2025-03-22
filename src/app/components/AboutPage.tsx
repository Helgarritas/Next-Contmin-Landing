import { NumberTicker } from "@/components/magicui/number-ticker";

const items = [
  { title: 100, text: "años de experiencia" },
  { title: 100, text: "proyectos realizados" },
  { title: 100, text: "empleados activos" },
  { title: 100, text: "alianzas estratégicas" },
]

export default function AboutPage() {
  return (
    <>
      <section className="mt-[200px] px-[70px] flex flex-col gap-[90px]">
        <div className="grid grid-cols-2">
          <h1 className="text-3xl uppercase">acerca de nuestra empresa</h1>
          <p className="pl-6 pr-8 text-secondary-foreground">
            Somos una empresa líder en excavación subterránea y minería, comprometida
            con la innovación, la eficiencia y la seguridad. Con una trayectoria 
            consolidada y un equipo de profesionales altamente capacitado, nos 
            adaptamos ágilmente a los desafíos del mercado global para ofrecer 
            soluciones integrales de primer nivel. Nuestra misión es superar los 
            estándares de calidad en cada proyecto, implementando tecnologías de 
            vanguardia y promoviendo el desarrollo sostenible.
          </p>
        </div>
        <div className="grid grid-cols-4">
          {items.map((item) => (
            <div className="flex gap-6 items-center">
              <span className="w-[1.5px] h-full bg-primary"></span>
              <div>
                <p className="text-6xl font-medium">
                  +<NumberTicker value={item.title}></NumberTicker>
                </p>
                <h3 className="capitalize">{item.text}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
