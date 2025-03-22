import BtnPrimary from "../btnPrimary/BtnPrimary";
import BtnSnake from "../btnSnake/BtnSnake";

export default function Footer() {
  return (
    <>
      <section className="mt-[200px] px-[70px] py-[30px] bg-white/10 flex flex-col gap-10">
        <div className="grid grid-cols-4">
          <div>
            <h3 className="text-4xl uppercase">sigamos <br /> creciendo</h3>
            <BtnPrimary text="contactar" className="mt-6"/>
          </div>
          <div className="col-start-3 col-end-5 flex justify-between">
            <div className="col-start-2 flex flex-col gap-1.5 text-sm uppercase">
              {["ubicación", "correo", "teléfono"].map((text, i) => (
                <BtnSnake key={i} text={text}/>
              ))}
            </div>
            <div className="col-start-3 flex flex-col gap-1.5 text-sm uppercase">
              {["hogar", "nosotros", "soluciones", "proyectos"].map((text, i) => (
                <BtnSnake key={i} text={text}/>
              ))}
            </div>
            <div className="col-start-4 flex flex-col gap-1.5 text-sm uppercase">
              {["instagram", "facebook", "linkedin", "correo"].map((text, i) => (
                <BtnSnake key={i} text={text}/>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="uppercase">made by descodestudio</p>
          <p>&copy; 2025</p>
        </div>
      </section>
    </>
  )
}
