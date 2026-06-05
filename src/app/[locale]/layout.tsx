import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import BgGrid from "@/components/BgGrid";
import NavBar from "@/components/navBar/NavBar";
import Footer from "@/components/footer/Footer";
import JsonLd from "@/components/JsonLd";
import "../globals.css";

const miFuente = localFont({
  src: [
    {
      path: "../fonts/BlenderPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/BlenderPro-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/BlenderPro-Thin.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--blenderpro",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    // ── Core SEO ──
    title: {
      default: t("title"),
      template: "%s | Drillcorp",
    },
    description: t("description"),
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
      locale: locale === "es" ? "es_PE" : "en_US",
      url: "https://drillcorp.com.pe",
      siteName: "Drillcorp",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [
        {
          url: "/image/banner/banner_bg.png",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
          type: "image/png",
        },
      ],
    },

    // ── Twitter / X ──
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
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
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${miFuente.variable} relative`}>
        <NextIntlClientProvider messages={messages}>
          <JsonLd />
          <BgGrid />
          <NavBar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
