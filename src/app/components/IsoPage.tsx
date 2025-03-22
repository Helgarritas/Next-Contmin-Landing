import CustomImage from "@/hooks/CustomImage";

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
      <section className='mt-[200px] px-[70px]'>
        <div className='text-center flex flex-col gap-[80px]'>
          <h3 className='text-3xl uppercase'>trabajamos sobre cimientos fuertes</h3>
          <div className="flex justify-between">
            {items.map((item, i) => (
              <div key={i}>
                <div className="mx-auto w-[80px] h-[80px] relative">
                  <CustomImage
                    width={80}
                    height={80}
                    src={item.image}
                    alt={item.image}
                    className=""
                  />
                </div>
                <div className="mt-4.5 w-[250px] flex flex-col items-center space-y-0.5">
                  <h3 className="uppercase w-max">{item.title}</h3>
                  <p className="text-secondary-foreground">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
