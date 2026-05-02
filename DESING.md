# Sistema de Diseño: Drillcorp Landing Page

Este documento define la identidad visual, los tokens de diseño y los componentes clave del ecosistema web de Drillcorp, enfocado en una estética "Premium Industrial Brutalista" que transmite robustez, alta tecnología y confiabilidad en la perforación minera.

## 1. Identidad Visual (Look & Feel)
- **Concepto:** Industrial Premium / Glassmorphism de alta tecnología.
- **Sensación:** Seguridad, precisión milimétrica, modernidad y solidez.
- **Detalles clave:** Texturas sutiles (noise/blur), bordes acentuados, fondos oscuros inmersivos (Dark Mode puro), y animaciones de tipo micro-interacción sin sobrecargar la experiencia.

## 2. Paleta de Colores (Tokens)

| Variable CSS | Valor / HEX | Uso |
| :--- | :--- | :--- |
| `--background` | `#060813` | Fondo principal inmersivo (Azul/Negro muy oscuro). |
| `--foreground` | `oklch(0.985 0 0)` | Textos principales (Blanco puro/Casi blanco). |
| `--primary` | `#dc2626` | Color de acento primario (Rojo). Usado para botones, highlights y llamadas a la acción. |
| `--secondary` | `oklch(0.274 ...)` | Fondos secundarios y de tarjetas. |
| `--secondary-foreground`| `#9F9F9F` | Textos descriptivos, párrafos secundarios. |
| `--tertiary-foreground` | `#707070` | Textos sutiles, detalles menores y placeholders. |
| `--border` | `10% opacity` | Bordes sutiles para delimitar componentes sin romper la inmersión. |
| `--muted` | `5% opacity` | Fondos de elementos desactivados o de muy bajo énfasis. |

## 3. Tipografía

La familia tipográfica principal elegida para la identidad es **BlenderPro**. Esta fuente aporta un estilo técnico, geométrico e industrial, ideal para el sector minero.

- **BlenderPro Bold (700):** Títulos principales (H1, H2), números destacados de métricas y botones CTA. Letras en MAYÚSCULAS para mayor impacto.
- **BlenderPro Medium (500):** Subtítulos y navegación.
- **BlenderPro Thin (300):** Párrafos de texto largos y descripciones secundarias.

*Regla de interlineado:* Se utiliza `leading-relaxed` en los párrafos para asegurar una legibilidad premium.

## 4. Componentes y Estilos Core

### 4.1 Tarjetas (Cards) - Estilo Glassmorphism
Las tarjetas (ProjectCard, SolutionCard) utilizan un diseño tipo "cristal" para fusionarse con el fondo oscuro:
- **Efecto de fondo:** Ligeramente translúcido con efecto de desenfoque (`backdrop-blur`).
- **Highlight (Acento):** Borde superior o iluminación centrada (`border-t-primary` o glow de CSS) que reacciona sutilmente al `hover`.
- **Interacción:** Las tarjetas no sufren grandes desplazamientos físicos, sino transiciones de iluminación o de color en el texto.

### 4.2 Botones (CTAs)
- **Botón Primario (BtnPrimary):** Relleno rojo (`var(--primary)`), texto en mayúsculas, hover con transición suave de opacidad/brillo.
- **Comportamiento:** Sensación táctil rápida sin animaciones exageradas (GSAP fue reemplazado por CSS transitions nativas para mayor rendimiento).

### 4.3 Formularios
- Estilo minimalista tipo tarjeta premium.
- Inputs con bordes tenues (`border-border`), fondo semi-transparente (`bg-input`).
- Focus states con un anillo rojo (`ring-primary`) suave.

## 5. Animaciones y Movimiento (Motion Design)
- **Objetivo:** 0% de Shift de Layout (CLS). Todo el movimiento debe ocurrir en la capa de composición gráfica (transform y opacity).
- **Hero/Banner:** Integración con elementos 3D a través de Web Components (Spline) o fondos de partículas. Carga dinámica e independiente.
- **Transiciones:** Uso de utilidades Tailwind como `duration-300 ease-in-out` para hover states.
- **Typing Animation:** Revelación progresiva para el titular principal (ADN Drillcorp), configurada a una velocidad conservadora (50ms) para no marear al usuario.

## 6. Rendimiento y SEO (Best Practices Implementadas)
- Meta Tags enriquecidos (Open Graph, Twitter Cards).
- Exportación estática optimizada para CDN rápido.
- Carga progresiva de componentes dinámicos pesados (`next/dynamic` para Spline y formularios).
- Rutas y assets estandarizados en `_next/` (asegurando permisos de servidor 755/644).

---
*Documento generado para el equipo de desarrollo y diseño de Drillcorp.*
