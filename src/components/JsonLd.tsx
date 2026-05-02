export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Drillcorp",
    legalName: "Drillcorp S.A.C.",
    url: "https://drillcorp.com.pe",
    logo: "https://drillcorp.com.pe/image/banner/LOGO-DRILLCORP.png",
    description:
      "Empresa líder en servicios de perforación técnica para la industria minera en Perú y Latinoamérica. Especialistas en perforación diamantina, RC, geotécnica, hidrogeológica e inyecciones.",
    foundingDate: "2020",
    areaServed: [
      {
        "@type": "Country",
        name: "Perú",
      },
      {
        "@type": "Place",
        name: "Latinoamérica",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+51-982561603",
        contactType: "sales",
        name: "Hernán Villafuerte",
        email: "hernan.villafuerte@drillcorp.com.pe",
        availableLanguage: ["Spanish"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+51-948125458",
        contactType: "sales",
        name: "Daniel Gutierrez",
        email: "daniel.gutierrez@drillcorp.com.pe",
        availableLanguage: ["Spanish"],
      },
    ],
    sameAs: [],
    knowsAbout: [
      "Perforación diamantina",
      "Perforación RC (Reverse Circulation)",
      "Perforación geotécnica",
      "Perforación hidrogeológica",
      "Inyecciones de cemento",
      "Servicios geológicos",
      "Exploración minera",
      "Sondajes mineros",
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Servicios de Perforación Minera",
    provider: {
      "@type": "Organization",
      name: "Drillcorp",
      url: "https://drillcorp.com.pe",
    },
    areaServed: {
      "@type": "Country",
      name: "Perú",
    },
    description:
      "Servicios profesionales de perforación técnica incluyendo diamantina, RC, geotécnica, hidrogeológica, inyecciones y servicios geológicos para proyectos mineros de alta exigencia.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Perforación",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Perforación Diamantina",
            description:
              "Sondajes de exploración con recuperación de testigos para análisis geológico de alta precisión.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Perforación RC",
            description:
              "Perforación de circulación reversa para muestreo rápido y eficiente en exploración minera.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Perforación Geotécnica",
            description:
              "Estudios geotécnicos y ensayos in situ para la caracterización del terreno y diseño de infraestructura minera.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Perforación Hidrogeológica (Water Well)",
            description:
              "Perforación de pozos para captación de agua subterránea y estudios hidrogeológicos.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Inyecciones",
            description:
              "Inyecciones de cemento y químicos para estabilización del terreno y sellado de fracturas.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Servicios Geológicos",
            description:
              "Logging geológico, mapeo estructural y análisis de muestras para soporte técnico integral.",
          },
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Drillcorp",
    url: "https://drillcorp.com.pe",
    description:
      "Sitio web oficial de Drillcorp, empresa de perforación minera de clase mundial en Perú.",
    inLanguage: "es",
    publisher: {
      "@type": "Organization",
      name: "Drillcorp",
      url: "https://drillcorp.com.pe",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
