import { useTranslations } from "next-intl";
import SolutionCard from "@/components/SolutionCard"

const images = [
  "/image/solutions/diamantina_v2.png",
  "/image/solutions/inyecciones_v2.png",
  "/image/solutions/rc_v2.png",
  "/image/solutions/ww_v2.png",
  "/image/solutions/geotecnica_v2.png",
  "/image/solutions/geologicos_v2.png",
];

export default function SolutionsPage() {
  const t = useTranslations("solutions");
  const items = t.raw("items") as Array<{ title: string; text: string }>;

  return (
    <>
      <section id="soluciones" className="mt-[180px] px-[70px] max-sm:px-[32px]">
        <div>
          <h2 className="text-3xl text-center uppercase">
            <span>{t("titleLine1")}</span>
            <br />
            <span>{t("titleLine2")}</span>
          </h2>
        </div>
        <div className="mt-[60px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-9 lg:gap-y-10">
          {items.map((item, i) => (
            <SolutionCard key={i} card={{ ...item, image: images[i] }} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
