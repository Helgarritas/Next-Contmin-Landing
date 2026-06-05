import { useTranslations } from "next-intl";
import { NumberTicker } from "@/components/magicui/number-ticker";

export default function AboutPage() {
  const t = useTranslations("about");
  const stats = t.raw("stats") as Array<{ prefix: string; value: number; label: string }>;

  return (
    <>
      <section id="nosotros" className="mt-[180px] px-[70px] flex flex-col gap-[90px]
        max-sm:px-[32px] max-sm:gap-[60px]
      ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0">
          <h2 className="text-3xl uppercase">{t("title")}</h2>
          <p className="lg:pl-6 lg:pr-8 text-description text-secondary-foreground">
            {t("description")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((item, i) => (
            <div key={i} className="pl-6 border-l-[2px] border-primary z-10 
              max-sm:w-full max-sm:pl-10 max-sm:flex max-sm:items-center max-sm:gap-4
            ">
              <p className="text-6xl font-medium">
                {item.prefix}<NumberTicker value={item.value}></NumberTicker>
              </p>
              <h3 className="capitalize mt-2 max-sm:mt-0">{item.label}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
