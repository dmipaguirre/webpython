# Python Methods Reference v3.12

Dashboard de referencia interactivo con los métodos nativos de las estructuras de datos de Python: **listas**, **tuplas**, **diccionarios** y **conjuntos**. Cada método incluye firma, parámetros, valor de retorno, nivel de uso y un ejemplo ejecutable.

Diseño oscuro (dark mode), minimalista, de tres columnas, con alta accesibilidad tipográfica.

## Características

- **4 categorías** con 41 métodos documentados (esenciales y regulares).
- **Buscador global en tiempo real** sobre nombre, firma, descripción y parámetros.
- **Filtros por nivel** (`All`, `Essential ★`, `Regular`).
- **Línea de tiempo vertical** con tarjeta de método de dos columnas: documentación a la izquierda, código a la derecha.
- **Resaltado de sintaxis** con Prism.js (tema Tomorrow Night, lenguaje Python).
- **Copiado de snippets** con feedback visual ("¡Copiado!").
- **Enlaces permanentes**: el símbolo `#` de cada método copia su URL con ancla; los deep links restauran la categoría desde el `hash` al cargar (ej. `/#diccionarios-update`).
- **Atajo de teclado**: `/` enfoca el buscador, `Escape` lo limpia.
- **Índice lateral** "En esta página" con anclas dinámicas a los métodos visibles.

## Stack

| Tecnología | Uso |
|---|---|
| [Astro](https://astro.build) | Framework SSG |
| [Prism.js](https://prismjs.com) | Resaltado de sintaxis |
| CSS puro | Diseño de 3 columnas, dark mode |
| JSON local | Base de datos estructurada de métodos |

- **Gestor de paquetes:** pnpm
- **Fuentes:** Antonio (display) y Fira Code (monoespaciada), autoalojadas en `public/fonts/`.

## Requisitos

- Node.js
- pnpm (`packageManager`: `pnpm@12.18.0`)

## Instalación y uso

```bash
pnpm install
pnpm dev       # servidor de desarrollo
pnpm build     # build de producción en dist/
pnpm preview   # previsualizar el build
pnpm check     # comprobación de tipos (requiere @astrojs/check y typescript)
```

## Estructura del proyecto

```
├── public/
│   ├── favicon.svg          # icono >_ del sitio
│   └── fonts/               # Antonio.woff2 y FiraCode.woff2
├── src/
│   ├── components/
│   │   ├── ReferenceHub.astro   # componente principal (3 columnas + script cliente)
│   │   ├── MethodCard.astro     # tarjeta de cada método
│   │   ├── TierFilter.astro     # filtros por nivel
│   │   ├── Seo.astro            # meta tags (OG, Twitter, fonts preload)
│   │   └── Icon.astro           # iconos SVG inline
│   ├── data/
│   │   ├── pythonData.json      # base de datos de métodos
│   │   └── types.ts             # interfaces y tipos
│   ├── layouts/Layout.astro     # documento HTML + favicon
│   ├── pages/index.astro        # página raíz
│   └── styles/global.css        # @font-face, :root (colores, fuentes, tamaños)
├── astro.config.mjs
└── package.json
```

## Formato de los datos (`src/data/pythonData.json`)

Cuatro categorías clave: `listas`, `tuplas`, `diccionarios`, `sets`. Cada una contiene:

```jsonc
{
  "title": "Métodos para Listas (list)",
  "breadcrumb": "Listas",
  "description": "…",
  "properties": ["Mutable", "Secuencia ordenada", "…"],
  "methods": [
    {
      "id": "listas-append",        // ancla única (prefijo de categoría)
      "name": "append()",
      "tier": "essential",           // essential | regular
      "signature": "list.append(x)",
      "returns": "None",
      "desc": "…",
      "params": [{ "name": "x", "type": "object", "req": true, "desc": "…" }],
      "code": "frutas = [\"manzana\"]\nfrutas.append(\"naranja\")"
    }
  ]
}
```

Los `id` llevan el prefijo de su categoría para que las anclas sean únicas en toda la página.

## Paleta de colores

| Token | Valor |
|---|---|
| Fondo | `#131417` |
| Superficies | `#16171b` / `#191A1F` / `#1D1E24` |
| Acento | `#f97316` (naranja) |
| Texto | `#e7e7ea` / `#9a9ba3` |

## Licencia

ISC
