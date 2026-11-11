# AGENTS.md

Sitio estático en Astro con el hub de referencia de métodos nativos de Python (listas, tuplas, diccionarios y sets) para Python 3.12. La interfaz y el contenido están en español; los identificadores de código en inglés.

## Comandos y restricciones

- Gestor de paquetes: **pnpm** (`packageManager: pnpm@12.18.0`). No uses npm ni yarn.
- No levantes servidores (`pnpm dev`, `pnpm preview`) ni ejecutes `pnpm build`. Indícale al usuario que lo haga él.
- `pnpm check` ejecuta `astro check` (tipos de `.astro` y `.ts`). Requiere `@astrojs/check` y `typescript` en devDependencies. `typescript` debe quedarse en 6.x: `@astrojs/check` no soporta la 7.
- No hay tests, linter ni formatter configurados. La verificación es manual, más ejecutar los ejemplos (ver abajo).
- No hay `opencode.json` ni CI.

## Estructura

- `src/data/pythonData.json`: contenido completo (fuente única). El esquema está en `src/data/types.ts`.
- `src/components/ReferenceHub.astro`: página principal y **todo** el JS cliente en su `<script>` (búsqueda, filtro de tier, cambio de categoría, copiado, Prism, restauración por hash).
- `MethodCard.astro` (tarjeta de método), `TierFilter.astro`, `Icon.astro` (íconos SVG inline; los íconos nuevos van aquí), `Seo.astro` (title, meta, Open Graph, Twitter, preload de fuentes).
- `src/layouts/Layout.astro`: documento HTML, favicon y `Seo`. `src/pages/index.astro` pasa `title` y `description`.
- `src/styles/global.css`: `@font-face` y tokens en `:root`. Usa esos tokens en lugar de colores o tamaños sueltos.
- `public/`: `fonts/` (Antonio y Fira Code, woff2) y `favicon.svg`.
- Artefactos que no son fuente: `dist/`, `.astro/`, `page.html` (snapshot de dev server, nada lo referencia), `renders/`, `capture/`.
- `website-loop/` es un proyecto de video HyperFrames separado, con su propio `AGENTS.md`. No aplica a la web.

## Datos (`pythonData.json`)

- Cuatro claves de categoría: `listas`, `tuplas`, `diccionarios`, `sets`. El orden del JSON es el orden de la UI.
- Cada categoría: `title`, `breadcrumb`, `description`, `properties` (lista de strings), `methods`.
- Cada método: `id`, `name`, `tier`, `signature`, `returns`, `desc`, `params`, `code`.
- **`id` debe ser único en todo el archivo** con formato `<categoria>-<nombre>` (ej. `diccionarios-update`, `sets-pop`). Es el ancla `#`, el `id` del DOM y el destino de los enlaces. Sin prefijo, `pop`, `update`, etc. se repiten entre categorías y los deep links se rompen. `ReferenceHub.astro` deduce la categoría del prefijo del hash.
- `tier`: solo `"essential"` o `"regular"`.
- `params`: objetos con `name`, `type`, `req` (booleano) y `desc`.
- `code`: string Python con escapes JSON (`\n`, `\"`).

## Ejemplos de código (`code`)

- Cada método necesita un ejemplo corto y ejecutable en Python 3.12 que muestre lo que dice `desc`.
- Formato de salida: cada `print` lleva su salida como comentario inline, con dos espacios antes de `#` y alineado con los `print` consecutivos (`print(a)  # 1`). Solo los bucles, donde un `print` produce varias salidas, muestran la salida en un bloque de comentarios debajo del bucle.
- Estos comentarios `# ...` son contenido didáctico de la web, no comentarios del código del proyecto: no los quites al editar.
- Los comentarios de salida deben coincidir exactamente con lo que imprime Python.
- Si el resultado depende del orden (sets, `set.pop()`), dilo en el comentario.
- Tras editar ejemplos, ejecuta cada `code` con `exec` (con `contextlib.redirect_stdout`) y compara la salida con los comentarios. Todos deben ejecutarse sin error. Local hay Python 3.14, así que evita funciones exclusivas de versiones posteriores a 3.12.

## Código y comportamiento

- Sin comentarios en el código del proyecto (TS, Astro, CSS). Esta regla no aplica a los comentarios de salida de los ejemplos.
- Si un bloque se repite, extráelo a un componente (ej. un ícono nuevo en `Icon.astro`, no inline en cada sitio). No hagas crecer `ReferenceHub.astro` más de lo necesario.
- Si cambias ids, `data-*` o nombres de clase, revisa también `MethodCard.astro` y el script: `data-toc-link`, `getElementById`, `data-category-panel`, `data-cards`, `data-tier-filter`, `data-copy-link`.
- Tras insertar tarjetas en el DOM, resalta con Prism (`Prism.highlightAllUnder`).
- Comportamiento que no debe romperse: búsqueda en tiempo real sobre nombre, firma, descripción y parámetros, que con texto busca en todas las categorías (vista `data-results-view`, con las tarjetas clonadas desde los `<template>`; el DOM original queda vacío mientras dura la búsqueda); cambio de categoría que limpia la búsqueda y reinicia el tier a `all`; `/` enfoca el buscador; `Escape` lo limpia; botón de copiar el snippet con "¡Copiado!"; `#` copia el enlace con ancla; el índice "En esta página" solo lista métodos visibles.
- Al cargar, si el hash apunta a un método, se abre su categoría y se hace scroll a él.
