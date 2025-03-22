import ProjectCard from "@/components/ProjectCard"

const items = [
  {  
    title: "shuntur",
    ubication: "peru - ancash" ,
    image: "/image/project/incahuasi.jpeg"
  },
  {  
    title: "shuntur",
    ubication: "peru - ancash" ,
    image: "/image/project/incahuasi.jpeg"
  },
  {  
    title: "shuntur",
    ubication: "peru - ancash" ,
    image: "/image/project/incahuasi.jpeg"
  },
  {  
    title: "shuntur",
    ubication: "peru - ancash" ,
    image: "/image/project/incahuasi.jpeg"
  }
]

export default function ProjectsPage() {
  return (
    <>
      <section className="px-[70px]">
        <h3 className="text-3xl uppercase">principales proyectos</h3>
        <div className="mt-[60px] grid grid-cols-4">
          {items.map((item, i) => (
            <ProjectCard key={i} item={item}/>
          ))}
        </div>
      </section>
    </>
  )
}
