import BtnSnake from "../btnSnake/BtnSnake";

const links = ["hogar", "nosotros", "soluciones", "proyectos"];

export default function NavBar() {
  return (
    <>
      <nav className="px-[70px] w-full h-[80px] fixed flex items-center bg-muted backdrop-blur-md">
        <ul className="w-full grid grid-cols-4 uppercase text-sm">
          <div className="col-start-3 flex justify-between">
            {links.map((link, i) => (
              <BtnSnake key={i} text={link}/>
            ))}
          </div>  
          <div className="ml-auto">
            <BtnSnake text={"contactar"}/>
          </div>
          <div>
          </div>
        </ul>
      </nav>
    </>
  )
}
