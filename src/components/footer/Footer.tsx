"use client"
// Hooks
import Link from "next/link";
import { useTranslations } from "next-intl";
// Components
import BtnSnake from "../btnSnake/BtnSnake";
import BtnPrimary from "../btnPrimary/BtnPrimary";

export default function Footer() {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");

  // Section IDs stay fixed for anchor navigation
  const navSectionIds: Record<string, string> = {
    "inicio": "hogar",
    "home": "hogar",
    "propuesta": "propuesta",
    "value": "propuesta",
    "soluciones": "soluciones",
    "solutions": "soluciones",
  };

  const handleScroll = (id: string) => {
    const sectionId = navSectionIds[id] || id;
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -80; // Ajusta según el alto de tu navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const navLinks = t.raw("navLinks") as string[];

  return (
    <>
      <section className="px-[70px] pt-[50px] pb-[40px] bg-[#15151E] flex flex-col
        max-sm:px-[32px]
      ">
        <div className="grid grid-cols-4
          max-sm:flex max-sm:flex-col
        ">
          <div className="space-y-4">
            <h3 className="text-2xl uppercase">{t("downloadBrochure")}</h3>
            <div className=" relative hover:bg-muted">
              <a href="/pdf/Presentacion Drillcorp - Mar 26 (1).pdf" download="Presentacion_Drillcorp.pdf" target="_blank">
                <BtnPrimary text={t("download")} />
              </a>
            </div>
          </div>
          <div className="col-start-3 col-end-5 grid grid-cols-2
            max-sm:mt-10 max-sm:grid-cols-1 max-sm:gap-10
          ">
            <div className="pl-6 flex flex-col items-start gap-1.5 uppercase max-sm:pl-0">
              <h4 className="text-foreground mb-1 text-sm">{t("navigation")}</h4>
              {navLinks.map((link: string, i: number) => (
                <button key={i} onClick={() => handleScroll(link)}>
                  <BtnSnake text={link} />
                </button>
              ))}
            </div>
            <div className="pl-6 flex flex-col items-start gap-7 text-sm uppercase max-sm:pl-0">
              <div className="flex flex-col items-start gap-1.5">
                <h4 className="text-foreground text-sm mb-1">Hernán Villafuerte</h4>
                <Link href="tel:+51982561603" target="_blank">
                  <BtnSnake text="+51 982561603" />
                </Link>
                <Link href="mailto:hernan.villafuerte@drillcorp.com.pe" target="_blank">
                  <BtnSnake className="max-sm:text-[12px]" text="hernan.villafuerte@drillcorp.com.pe" />
                </Link>
              </div>

              <div className="flex flex-col items-start gap-1.5">
                <h4 className="text-foreground text-sm mb-1">Daniel Gutierrez</h4>
                <Link href="tel:+51948125458" target="_blank">
                  <BtnSnake text="+51 948125458" />
                </Link>
                <Link href="mailto:daniel.gutierrez@drillcorp.com.pe" target="_blank">
                  <BtnSnake className="max-sm:text-[12px]" text="daniel.gutierrez@drillcorp.com.pe" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 mt-20 text-sm uppercase
          max-sm:mt-14 max-sm:grid-cols-2 max-sm:grid-rows-2 
        ">
          <p
            className="max-sm:mt-4 max-sm:col-start-1 max-sm:col-end-3 max-sm:row-start-2 max-sm:text-center"
          >{t("copyright")}</p>
        </div>
      </section>
    </>
  )
}
