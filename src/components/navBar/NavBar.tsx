"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Componentes
import Image from "next/image";
import BtnSnake from "../btnSnake/BtnSnake";
// Estilos
import "./navbar.css";

gsap.registerPlugin(ScrollTrigger);
const links = ["hogar", "propuesta", "soluciones", "contactar"];

export default function NavBar() {
  const navRef = useRef(null);
  const navBgRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // ── Animación de scroll para desktop ──
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 641px)", () => {
      const trigger = ScrollTrigger.create({
        start: 0,
        onUpdate: (self) => {
          const scrollPos = window.scrollY;
          if (scrollPos === 0) {
            gsap.to(navBgRef.current, { height: "0%", duration: 0.2, overwrite: "auto" });
            gsap.to(ulRef.current, { opacity: 1, duration: 0.2, overwrite: "auto" });
            gsap.to(logoRef.current, { opacity: 1, duration: 0.2, overwrite: "auto" });
          } else {
            if (self.direction < 0) {
              gsap.to(navBgRef.current, { height: "100%", duration: 0.35, overwrite: "auto" });
              gsap.to(ulRef.current, { opacity: 1, delay: 0.15, duration: 0.3, overwrite: "auto" });
              gsap.to(logoRef.current, { opacity: 1, delay: 0.15, duration: 0.3, overwrite: "auto" });
            } else {
              gsap.to(navBgRef.current, { height: "0%", duration: 0.3, overwrite: "auto" });
              gsap.to(ulRef.current, { opacity: 0, duration: 0.25, overwrite: "auto" });
              gsap.to(logoRef.current, { opacity: 0, duration: 0.25, overwrite: "auto" });
            }
          }
        },
      });
      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);

  // ── Animación del drawer móvil ──
  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    const drawerLinks = drawerRef.current.querySelectorAll(".drawer-link");

    if (menuOpen) {
      // Bloquear scroll del body
      document.body.style.overflow = "hidden";
      // Mostrar overlay
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3 });
      // Deslizar el drawer
      gsap.to(drawerRef.current, { x: "0%", duration: 0.4, ease: "power3.out" });
      // Animar links con stagger
      gsap.fromTo(
        drawerLinks,
        { x: -30, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.08, delay: 0.15, ease: "power2.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.25 });
      gsap.to(drawerRef.current, { x: "-100%", duration: 0.35, ease: "power2.in" });
      gsap.to(drawerLinks, { autoAlpha: 0, duration: 0.15 });
    }
  }, [menuOpen]);

  const handleScroll = useCallback((link: string) => {
    if (pathname !== "/") {
      router.push(`/#${link}`);
      setMenuOpen(false);
      return;
    }

    const scrollToSection = () => {
      const el = document.getElementById(link);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (menuOpen) {
      setMenuOpen(false);
      setTimeout(scrollToSection, 350);
    } else {
      scrollToSection();
    }
  }, [pathname, router, menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      {/* ════════ NAVBAR DESKTOP + HEADER MÓVIL ════════ */}
      <nav
        ref={navRef}
        className="nav-bar px-[70px] w-full h-[80px] fixed flex items-center z-50
          max-sm:px-[32px] max-sm:h-[60px]"
      >
        {/* Fondo animado desktop */}
        <div
          ref={navBgRef}
          className="absolute top-0 left-0 w-full h-0 pointer-events-none"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.10)", backdropFilter: "blur(12px)" }}
        />

        {/* Hamburguesa (solo móvil) */}
        <button
          onClick={toggleMenu}
          className="hamburger-btn hidden max-sm:flex z-50 relative w-[30px] h-[22px] flex-col justify-between"
          aria-label="Abrir menú"
        >
          <span className={`hamburger-line ${menuOpen ? "hamburger-open-top" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "hamburger-open-mid" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "hamburger-open-bot" : ""}`} />
        </button>

        {/* Logo (visible en ambos) */}
        <div ref={logoRef} className="max-sm:absolute max-sm:left-1/2 max-sm:-translate-x-1/2 z-10">
          <Image
            src="/image/banner/LOGO-DRILLCORP.png"
            alt="Drillcorp Logo"
            width={130}
            height={50}
            sizes="130px"
            className="object-contain max-sm:w-[110px]"
            priority
          />
        </div>

        {/* Links desktop */}
        <ul
          ref={ulRef}
          className="relative z-20 w-1/2 ml-auto h-full flex items-center justify-between uppercase text-sm
            max-sm:hidden"
        >
          <div className="flex items-center gap-[50px]">
            {links.slice(0, 4).map((link, i) => (
              <li 
                key={i} 
                onClick={() => handleScroll(link)} 
                className="cursor-pointer text-white/60 hover:text-white transition-colors duration-300"
              >
                {link}
              </li>
            ))}
          </div>
          <button
            onClick={() => handleScroll("contactar")}
            className="text-white/60 hover:text-white transition-colors duration-300 uppercase"
          >
            contactar
          </button>
        </ul>
      </nav>

      {/* ════════ OVERLAY OSCURO (solo móvil) ════════ */}
      <div
        ref={overlayRef}
        onClick={() => setMenuOpen(false)}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm invisible opacity-0
          sm:hidden"
      />

      {/* ════════ DRAWER LATERAL (solo móvil) ════════ */}
      <div
        ref={drawerRef}
        className="fixed top-0 left-0 w-[280px] h-full z-50 -translate-x-full
          flex flex-col bg-[#0a0c1a]/95 backdrop-blur-xl border-r border-white/10
          sm:hidden"
      >
        {/* Logo en el drawer */}
        <div className="px-8 pt-6 pb-4 border-b border-white/10">
          <Image
            src="/image/banner/LOGO-DRILLCORP.png"
            alt="Drillcorp Logo"
            width={120}
            height={45}
            sizes="120px"
            loading="lazy"
            className="object-contain"
          />
        </div>

        {/* Links del menú */}
        <div className="flex-1 flex flex-col px-8 pt-8 gap-1">
          {links.map((link, i) => (
            <button
              key={i}
              onClick={() => handleScroll(link)}
              className="drawer-link text-left py-3 uppercase text-base tracking-wide
                text-white/60 hover:text-white transition-colors duration-300
                border-b border-white/5 last:border-0"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Footer del drawer */}
        <div className="px-8 py-6 border-t border-white/10">
          <p className="text-xs text-white/40 uppercase tracking-wider">© 2025 Drillcorp</p>
        </div>
      </div>
    </>
  );
}
