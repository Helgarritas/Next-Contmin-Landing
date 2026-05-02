import type { Metadata } from "next";
import localFont from "next/font/local";
import BgGrid from "@/components/BgGrid";
import NavBar from "@/components/navBar/NavBar";
import Footer from "@/components/footer/Footer";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const miFuente = localFont({
  src: [
    {
      path: "./fonts/BlenderPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/BlenderPro-Medium.woff2",
      weight: "500", 
      style: "normal",
    },
    {
      path: "./fonts/BlenderPro-Thin.woff2", 
      weight: "300", 
      style: "normal",
    },
  ],
  variable: "--blenderpro",
});

export const metadata: Metadata = {
  // ── Core SEO ──
  title: {
    default: "Drillcorp | Perforación Minera de Clase Mundial en Perú",
    template: "%s | Drillcorp",
  },
  description:
    "Drillcorp: empresa líder en perforación diamantina, RC, geotécnica, hidrogeológica e inyecciones para proyectos mineros de alta exigencia en Perú y Latinoamérica. +6 líneas de servicio con estándares internacionales de seguridad y calidad.",
  keywords: [
    "perforación minera",
    "perforación diamantina",
    "perforación RC",
    "perforación geotécnica",
    "perforación hidrogeológica",
    "inyecciones de cemento minería",
    "servicios geológicos",
    "exploración minera",
    "sondajes mineros",
    "perforación Perú",
    "Drillcorp",
    "empresa de perforación minera",
    "servicios de perforación técnica",
    "minería Perú",
    "minería Latinoamérica",
  ],
  authors: [{ name: "Drillcorp", url: "https://drillcorp.com.pe" }],
  creator: "Drillcorp S.A.C.",
  publisher: "Drillcorp S.A.C.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://drillcorp.com.pe"),
  alternates: {
    canonical: "/",
  },

  // ── Open Graph (Facebook, LinkedIn, WhatsApp) ──
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://drillcorp.com.pe",
    siteName: "Drillcorp",
    title: "Drillcorp | Perforación Minera de Clase Mundial",
    description:
      "Soluciones de perforación técnica para la industria minera. Diamantina, RC, inyecciones, geotécnica, hidrogeológica y servicios geológicos con estándares internacionales.",
    images: [
      {
        url: "/image/banner/banner_bg.png",
        width: 1200,
        height: 630,
        alt: "Drillcorp - Perforación Minera de Clase Mundial",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X ──
  twitter: {
    card: "summary_large_image",
    title: "Drillcorp | Perforación Minera de Clase Mundial",
    description:
      "Soluciones de perforación técnica para la industria minera con estándares internacionales de seguridad y calidad.",
    images: ["/image/banner/banner_bg.png"],
  },

  // ── Verificación de buscadores (reemplazar con tus códigos reales) ──
  // verification: {
  //   google: "TU_CÓDIGO_DE_GOOGLE_SEARCH_CONSOLE",
  //   yandex: "TU_CÓDIGO_YANDEX",
  // },

  // ── Otros ──
  category: "mining",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${miFuente.variable} relative`}>
        <JsonLd />
        <BgGrid/>
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
