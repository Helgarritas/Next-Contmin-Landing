"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Componentes
import Image from "next/image";
import BtnSnake from "../btnSnake/BtnSnake";
import { HyperText } from "../magicui/hyper-text";
import LanguageSwitcher from "../LanguageSwitcher";
// Estilos
import "./navbar.css";

gsap.registerPlugin(ScrollTrigger);

export default function NavBar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const links = [t("home"), t("proposal"), t("solutions"), t("contact")];

  const navRef = useRef(null);
  const navBgRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
      // Animar links con stagger
      gsap.fromTo(
        drawerLinks,
        { x: -30, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.08, delay: 0.15, ease: "power2.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.25 });
      gsap.to(drawerLinks, { autoAlpha: 0, duration: 0.15 });
    }
  }, [menuOpen]);

  // Section IDs mapping: nav labels → section IDs (section IDs stay in Spanish)
  const sectionIds: Record<string, string> = {
    [t("home")]: "hogar",
    [t("proposal")]: "propuesta",
    [t("solutions")]: "soluciones",
    [t("contact")]: "contactar",
  };

  const handleScroll = useCallback((link: string) => {
    const sectionId = sectionIds[link] || link;

    const scrollToSection = () => {
      const el = document.getElementById(sectionId);
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
  }, [menuOpen, sectionIds]);

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
          className="hamburger-btn hidden max-sm:flex z-[60] relative w-[30px] h-[22px] flex-col justify-between"
          aria-label={t("openMenu")}
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

        {/* Links desktop + Language Switcher */}
        <ul
          ref={ulRef}
          className="relative z-20 w-auto ml-auto h-full flex items-center justify-end uppercase text-sm
            max-sm:hidden"
        >
          <div className="flex items-center gap-6 lg:gap-[50px]">
            {links.map((link, i) => (
              <li
                key={i}
                onClick={() => handleScroll(link)}
                className="text-sm cursor-pointer text-white/60 hover:text-white transition-colors duration-300"
              >
                <HyperText duration={600}>{link}</HyperText>
              </li>
            ))}
          </div>
          {/* Language Switcher */}
          <div className="ml-6 lg:ml-[50px] pl-6 lg:pl-[50px] border-l border-white/10">
            <LanguageSwitcher />
          </div>
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
        className={`fixed top-0 left-0 w-[280px] h-full z-50 flex flex-col bg-[#0a0c1a]/95 backdrop-blur-xl border-r border-white/10 sm:hidden transition-transform duration-[400ms] ease-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
            <div
              key={i}
              role="button"
              tabIndex={0}
              onClick={() => handleScroll(link)}
              onKeyDown={(e) => e.key === 'Enter' && handleScroll(link)}
              className="drawer-link cursor-pointer text-left py-3 uppercase text-sm tracking-wide
                text-white/60 hover:text-white transition-colors duration-300
                border-b border-white/5 last:border-0"
            >
              <HyperText duration={600}>{link}</HyperText>
            </div>
          ))}
        </div>

        {/* Language Switcher + Footer del drawer */}
        <div className="px-8 py-4 border-t border-white/10 flex items-center justify-between">
          <p className="text-xs text-white/40 uppercase tracking-wider">{t("copyright")}</p>
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
}
