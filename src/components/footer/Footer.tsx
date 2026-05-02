"use client"
// Hooks
import Link from "next/link";
// Components
import BtnSnake from "../btnSnake/BtnSnake";
import BtnPrimary from "../btnPrimary/BtnPrimary";

export default function Footer() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80; // Ajusta según el alto de tu navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="px-[70px] pt-[50px] pb-[40px] bg-[#15151E] flex flex-col
        max-sm:px-[32px]
      ">
        <div className="grid grid-cols-4
          max-sm:flex max-sm:flex-col
        ">
          <div className="space-y-4">
            <h3 className="text-2xl uppercase">descargar brochure </h3>
            <div className=" relative hover:bg-muted">
              <a href="/pdf/Presentacion Drillcorp - Mar 26 (1).pdf" download="Presentacion_Drillcorp.pdf" target="_blank">
                <BtnPrimary text="descargar" />
              </a>
            </div>
          </div>
          <div className="col-start-3 col-end-5 grid grid-cols-2
            max-sm:mt-10
          ">
            <div className="pl-6 flex flex-col items-start gap-1.5 text-sm uppercase
              max-sm:pl-0
            ">
              {["hogar", "propuesta", "soluciones"].map((link, i) => (
                <button key={i} onClick={() => handleScroll(link)}>
                  <BtnSnake text={link} />
                </button>
              ))}
            </div>
            <div className="pl-6 flex flex-col items-start gap-1.5 text-sm uppercase
              max-sm:pl-0
            ">
              {[
                {
                  item: "correo drillcorp",
                  link: "mailto:contacto@drillcorp.com.pe"
                },
                {
                  item: "hernán villafuerte",
                  link: "mailto:hernan.villafuerte@drillcorp.com.pe"
                },
                {
                  item: "+51 982561603",
                  link: "tel:+51982561603"
                },
                {
                  item: "daniel gutierrez",
                  link: "mailto:daniel.gutierrez@drillcorp.com.pe"
                },
                {
                  item: "+51 948125458",
                  link: "tel:+51948125458"
                },
              ].map((link, i) => (
                <Link key={i} href={`${link.link}`} target="_blank">
                  <BtnSnake text={link.item} />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 mt-20 text-sm uppercase
          max-sm:mt-14 max-sm:grid-cols-2 max-sm:grid-rows-2 
        ">
          <p
            className="max-sm:mt-4 max-sm:col-start-1 max-sm:col-end-3 max-sm:row-start-2 max-sm:text-center"
          >&copy; 2025 Drillcorp</p>

          {/* <Link href={"/privacity-policies"} className="pl-6 col-start-3
            max-sm:col-start-2 max-sm:pl-0
          ">
            <BtnSnake text="políticas de privacidad"></BtnSnake>
          </Link>

          <Link href={"/terms-conditions"} className="pl-6
            max-sm:pl-0 max-sm:col-start-1 max-sm:col-end-2 max-sm:row-start-1
          ">
            <BtnSnake text="terminos y condiciones"></BtnSnake>
          </Link> */}
        </div>
      </section>
    </>
  )
}
