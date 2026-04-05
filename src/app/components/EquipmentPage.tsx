import EquipmentCard from "@/components/EquipmentCard";

const equipmentList = [
  {
    title: "Perforación Diamantina",
    description: "Obtención de testigos de alta precisión para análisis geológico y geotécnico.",
    image: "/image/equipment/diamantina.png",
  },
  {
    title: "Perforación RC-WW",
    description: "Muestreo rápido y eficiente para exploración minera y perforación de pozos de bombeo y obtención de agua.",
    image: "/image/equipment/rc_ww.png",
  },
  {
    title: "Perforación para Inyecciones",
    description: "Para mejorar la estabilidad de presas, así como para eliminar filtraciones o erosión.",
    image: "/image/equipment/inyecciones.png",
  },
  {
    title: "Perforación Geotécnica e Hidrogeología",
    description: "Estudios de suelo, estabilidad, hídricos para minería, infraestructura y construcción.",
    image: "/image/equipment/geotecnica.png",
  },
];

export default function EquipmentPage() {
  return (
    <section id="equipos" className="mt-[180px] px-[70px] max-sm:px-[32px]">
      <div className="flex flex-col gap-[60px]">
        <div className="space-y-4 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Nuestra Flota
          </p>
          <h2 className="text-3xl uppercase">
            Equipos de Última Generación
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-6 max-xl:grid-cols-2 max-sm:grid-cols-1">
          {equipmentList.map((item, i) => (
            <EquipmentCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
