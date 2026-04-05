import IsoCard from "@/components/IsoCard"

const items = [
  { 
    title: "Sistema de Gestión de Calidad", 
    text: "Garantizamos procesos eficientes y mejora continua.", 
    image: "/image/iso/about-img1.png"
  },
  { 
    title: "Sistema de Gestión Ambiental", 
    text: "Comprometidos con prácticas ambientales sostenibles.", 
    image: "/image/iso/about-img3.png"
  },
  { 
    title: "Seguridad y Salud en el Trabajo", 
    text: "Protegemos activamente la integridad de nuestros colaboradores.", 
    image: "/image/iso/about-img2.png"
  }
]

export default function IsoPage() {

  
  return (
    <>
      <section className='mt-[180px] mb-[150px] px-[70px] max-sm:px-[32px]'>
        <div className='flex flex-col gap-[60px]
          max-sm:gap-[50px]
        '>
          <h3 className='text-3xl text-center uppercase'>trabajamos sobre cimientos fuertes</h3>
          <div className="grid grid-cols-3 gap-10
            max-sm:grid-cols-1 max-sm:gap-12
          ">
            {items.map((item, i) => (
              <IsoCard key={i} item={item} index={i}/>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
