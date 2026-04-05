"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Componentes
import Image from "next/image";
import BtnSnake from "../btnSnake/BtnSnake";
import NavMenu from "../navMenu/NavMenu";
// Estilos
import "./navbar.css";

gsap.registerPlugin(ScrollTrigger);
const links = ["hogar", "propuesta", "nosotros", "soluciones", "contactar"];

export default function NavBar() {
  // Referencias
  const navRef = useRef(null);
  const navBgRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  // Estado para controlar si el menú móvil está abierto
  const [menuOpen, setMenuOpen] = useState(false);
  // Hooks de navegación
  const pathname = usePathname();
  const router = useRouter();

  // Efecto para la animación del scroll
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      const trigger = ScrollTrigger.create({
        start: 0,
        onUpdate: (self) => {
          const scrollPos = window.scrollY;
          if (scrollPos === 0) {
            gsap.to(navBgRef.current, { height: "0%", duration: 0.2, overwrite: "auto" });
            gsap.to(ulRef.current, { opacity: 1, duration: 0.2, overwrite: "auto" });
          } else {
            if (self.direction < 0) {
              gsap.to(navBgRef.current, { height: "100%", duration: 0.35, overwrite: "auto" });
              gsap.to(ulRef.current, { opacity: 1, delay: 0.15, duration: 0.3, overwrite: "auto" });
            } else {
              gsap.to(navBgRef.current, { height: "0%", duration: 0.3, overwrite: "auto" });
              gsap.to(ulRef.current, { opacity: 0, duration: 0.25, overwrite: "auto" });
            }
          }
        },
      });

      return () => {
        trigger.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 640 && ulRef.current) {
      const liElements = Array.from(ulRef.current.querySelectorAll("li")) as HTMLLIElement[];
      const buttonElement = ulRef.current.querySelector(".btn-contactar") as HTMLButtonElement | null;

      const linksAndButton = buttonElement ? [...liElements, buttonElement] : liElements;

      if (menuOpen) {
        gsap.to(ulRef.current, { x: "80%", duration: 0.5, ease: "power2.out" });
        gsap.to(linksAndButton, { opacity: 1, duration: 0.5, stagger: 0.1 });
      } else {
        gsap.to(ulRef.current, { x: "-100%", duration: 0.5, ease: "power2.in" });
        gsap.to(linksAndButton, { opacity: 0, duration: 0.3 });
      }
    }
  }, [menuOpen]);

  const handleScroll = (link: string) => {
    if (pathname !== "/") {
      router.push("/");
      return;
    }
    const el = document.getElementById(link);
    if (el) {
      const yOffset = -80; // Ajusta según el alto de tu navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav
      ref={navRef}
      className="px-[70px] w-full fixed flex items-center z-50 nav 
        max-sm:px-[32px] max-sm:h-[100vh] max-sm:blur-none max-sm:bg-transparent"
    >
      {/* Fondo animado que reemplaza nav::before */}
      <div
        ref={navBgRef}
        className="absolute top-0 left-0 w-full h-0 pointer-events-none"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.10)", backdropFilter: "blur(12px)" }}
      />
      <div
        className="max-sm:absolute max-sm:top-[22px] z-50 hidden max-sm:inline-block max-sm:left-[32px]"
        onClick={toggleMenu}
      >
        <NavMenu />
      </div>
      <ul
        ref={ulRef}
        className="w-full h-[80px] grid grid-cols-4 items-center uppercase text-sm
                  max-sm:pt-[100px] max-sm:h-full max-sm:flex max-sm:flex-col max-sm:items-start max-sm:z-10
                  max-sm:-translate-x-full"
      >
        <div className="col-start-1 col-end-3 flex items-center shrink-0 max-sm:absolute max-sm:top-4 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:mb-6 mt-2 z-10">
          <Image
            src="/image/banner/LOGO-DRILLCORP.png"
            alt="Drillcorp Logo"
            width={140}
            height={55}
            className="object-contain"
            priority
          />
        </div>
        <div
          className="col-start-3 flex justify-between max-sm:flex-col max-sm:gap-2 max-sm:mt-[60px]"
        >
          {links.slice(0, 4).map((link, i) => (
            <li key={i} onClick={() => handleScroll(link)}>
              <BtnSnake text={link} className="max-sm:text-base" />
            </li>
          ))}
        </div>
        <button
          onClick={() => handleScroll("contactar")}
          className="ml-auto max-sm:ml-0 max-sm:mt-2 btn-contactar"
        >
          <BtnSnake text="contactar" className="max-sm:text-base teext-white" />
        </button>
      </ul>
    </nav>
  );
}
