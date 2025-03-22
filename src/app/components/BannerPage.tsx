import BtnPrimary from "@/components/btnPrimary/BtnPrimary";

export default function BannerPage() {
  return (
    <>
      <section className="h-[100vh] px-[70px] flex items-center">
        <div className="w-min">
          <h1 className="text-6xl uppercase w-max">
            <p>la innovacion</p>
            <p>es parte de</p>
            <p>nuestro adn</p>
          </h1>
          <p className="mt-2.5 text-secondary-foreground">
            En Contmin, desarrollamos soluciones mineras innovadoras y sostenibles, impulsando el crecimiento del sector con excelencia operativa y un firme compromiso con el futuro.
          </p>
          <BtnPrimary className="mt-6" text={"contactar"}/>
        </div>
      </section>    
    </>
  )
}
