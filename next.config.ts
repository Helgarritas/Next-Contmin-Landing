import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Aplica estas cabeceras a todas las rutas de la aplicación
        source: "/(.*)",
        headers: [
          {
            // Previene el Clickjacking limitando quién puede embutir tu web en un iframe
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            // Evita que los navegadores traten de "adivinar" el tipo de contenido (MIME-Sniffing)
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Controla cuánta información se comparte a través del encabezado HTTP Referer
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            // Bloquea el uso de cámara, micrófono o ubicaciones que no deberíamos usar
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            // Fuerza la comunicación segura por HTTPS (HSTS)
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
