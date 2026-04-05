import ProjectCard from "@/components/ProjectCard";

const items = [
  {  
    title: "tunel incahuasi",
    ubication: "bolivia - santa cruz",
    image: "/image/project/incahuasi.jpeg"
  },  
  {  
    title: "u.m san vicente",
    ubication: "bolivia - potosí",
    image: "/image/project/san_vicente.jpg"
  },
  {  
    title: "u.m Austria Duvaz",
    ubication: "peru - junín",
    image: "/image/project/Austria_Duvaz.jpg"
  },
  {  
    title: "u.m suyubamba",
    ubication: "peru - cajamarca",
    image: "/image/project/suyubamba.jpg"
  }
];

export default function ProjectsPage() {
  return (
    <section id="proyectos" className="mt-[150px] px-[70px]
      max-sm:px-[32px]
    ">
      <h3 className="text-3xl uppercase
        max-sm:text-center
      ">principales proyectos</h3>
      <div className="mt-[60px] grid grid-cols-4 gap-4
        max-sm:grid-cols-1 max-sm:gap-10
      ">
        {items.map((item, i) => (
          <ProjectCard key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
