# Python Methods Reference v3.12

Dashboard de referencia interactivo con los métodos nativos y el control de flujo de Python. Incluye las estructuras **listas**, **tuplas**, **diccionarios** y **conjuntos**, además de la sección de **bucles** con `for`, `range`, `enumerate`, `zip`, `break`, `continue` y `for…else`.

Diseño oscuro (dark mode), minimalista, de tres columnas, con alta accesibilidad tipográfica.

## Características

- **4 estructuras** con 45 métodos y **7 temas de bucles** documentados (esenciales y regulares).
- **Menú lateral desplegable** con los grupos Estructuras y Bucles.
- **Buscador global en tiempo real** sobre nombre, firma, descripción, parámetros y ejemplos, agrupado por categoría.
- **Filtros por nivel** (`All`, `Essential ★`, `Regular`).
- **Línea de tiempo vertical** con tarjetas de métodos y temas: documentación, sintaxis y código ejecutable.
- **Resaltado de sintaxis** con Prism.js (tema Tomorrow Night, lenguaje Python).
- **Copiado de snippets** con feedback visual ("¡Copiado!").
- **Enlaces permanentes**: el símbolo `#` de cada método o tema copia su URL con ancla; los deep links restauran la categoría desde el `hash` al cargar (ej. `/#diccionarios-update` o `/#bucles-for`).
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
 pnpm check     # comprobación de tipos con @astrojs/check y TypeScript 6
```

## Estructura del proyecto

```
├── public/
│   ├── favicon.svg          # icono >_ del sitio
│   └── fonts/               # Antonio.woff2 y FiraCode.woff2
├── src/
│   ├── components/
│   │   ├── ReferenceHub.astro   # composición principal de la interfaz
│   │   ├── hub/                 # header y paneles de contenido
│   │   ├── estructuras/         # componentes de estructuras de datos
│   │   │   └── MethodCard.astro  # tarjeta de cada método
│   │   ├── bucles/               # componentes de control de flujo
│   │   │   └── LoopCard.astro    # tarjeta de cada tema de bucles
│   │   ├── navigation/           # grupos y botones del menú lateral
│   │   ├── search/               # resultados de búsqueda global
│   │   ├── CodeBox.astro        # caja de código compartida
│   │   ├── TierFilter.astro     # filtros por nivel
│   │   ├── Seo.astro            # meta tags (OG, Twitter, fonts preload)
│   │   └── Icon.astro           # iconos SVG inline
│   ├── data/
│   │   ├── estructuras/
│   │   │   └── pythonData.json  # estructuras y métodos
│   │   ├── bucles/
│   │   │   └── buclesData.json  # temas y ejemplos de bucles
│   │   ├── index.ts             # datos normalizados para la UI
│   │   └── types.ts             # interfaces y tipos
│   ├── scripts/
│   │   └── referenceHub.ts      # estado e interactividad cliente
│   ├── layouts/Layout.astro     # documento HTML + favicon
│   ├── pages/index.astro        # página raíz
│   └── styles/global.css        # @font-face, :root (colores, fuentes, tamaños)
├── astro.config.mjs
└── package.json
```

## Formato de los datos (`src/data/estructuras/pythonData.json`)

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

## Datos de bucles (`src/data/bucles/buclesData.json`)

Los bucles usan un modelo diferente al de los métodos porque `for`, `break` y `continue` son construcciones de control de flujo. La categoría `bucles` contiene temas con `syntax`, `returns`, `desc`, `params` y una lista de `examples`. Cada ejemplo incluye `name`, `tier`, `syntax`, `returns` y `code`.

Los IDs de los temas utilizan el prefijo `bucles-` para mantener anclas únicas, por ejemplo `bucles-for`, `bucles-range` y `bucles-enumerate`.

## Paleta de colores

| Token | Valor |
|---|---|
| Fondo | `#131417` |
| Superficies | `#16171b` / `#191A1F` / `#1D1E24` |
| Acento | `#f97316` (naranja) |
| Texto | `#e7e7ea` / `#9a9ba3` |

## Licencia

ISC
