## 1. Resumen del Proyecto y Objetivo
Crear una aplicación web interactiva de documentación técnica estilo "Dashboard / Hub de referencia" sobre métodos nativos de Python. El diseño debe ser oscuro (dark mode), minimalista, de tres columnas y con alta accesibilidad tipográfica.

### Stack Tecnológico:
* **Framework:** Astro (SSG/SSR)
* **Resaltado de sintaxis:** Prism.js (lenguaje Python, tema Tomorrow Night/Dark)
* **Datos:** Archivo JSON local con la información estructurada

---

## 2. Arquitectura de Archivos Sugerida

```
src/
├── data/
│   └── pythonData.json        # Base de datos JSON de métodos
├── components/
│   └── ReferenceHub.astro     # Componente principal interactivo
└── pages/
    └── index.astro            # Página raíz que aloja el componente

```
* Genera componentes que sean reutilizables para no generarl componentes extensos, por ejemplo, si se incluye un ícono de lupa, genera un componente de íconos para que sea incrustado donde se necesita
* Fenera un componente de `Seo` para incluir:
    * La etiqueta title
    * Las etiquetas meta como son description, author y robots
    * Las etiquetas Open Graph Meta Tags
    * Las etiquetas Twitter Card Meta Tags
    * Solo si es considerado buena practica, incluir las etiquetas de preload de las fuentes a autilizar, en caso negativo, estarán directamente en el archivo layout.astro
* El archivo Layout.astro hirá el cuerpo del documento HTML y el componente `Seo`
* Para la estructura de archivo globa.css genera:
    * Las propiedades @font-fase para las fuentes Antonio.woff2 y FiraCode.woff2 con su correspondiente Fallback
    * Genera la propiedad :root para los colores, fuentes, tamaños
---

## 3. Estructura del JSON de Datos (`pythonData.json`)

El archivo JSON debe organizarse en 4 llaves principales de estructuras de datos: `listas`, `tuplas`, `diccionarios` y `sets`.

Cada categoría contiene:
* `title`: Título visible (ej. "Métodos para Listas (list)")
* `breadcrumb`: Cadena para la navegación (ej. "Listas")
* `description`: Explicación conceptual del tipo de dato.
* `properties`: Lista de cadenas con características (ej. `["Mutable", "Secuencia Ordenada"]`).
* `methods`: Lista de objetos por método, con los atributos:
  * `id`: Identificador único para anclas `#` (ej. "append")
  * `name`: Nombre visible (ej. "append()")
  * `tier`: Nivel de uso (`"essential"` o `"regular"`)
  * `signature`: Firma del método (ej. "list.append(x)")
  * `returns`: Tipo de retorno (ej. "None" o "int")
  * `desc`: Explicación concisa del funcionamiento.
  * `params`: Arreglo de parámetros con `name`, `type`, `req` (booleano) y `desc`.
  * `code`: String con el código de ejemplo ejecutable en Python.
---

## 4. Diseño y UI/UX (Layout de 3 Columnas)

### Cabecera Superior (Header):
* Fondo oscuro semi-transparente con efecto *blur* (`#191a1f`).
* Título del proyecto ("Python Methods Reference v3.12").
* Buscador global con icono de lupa, atajo de teclado `/` y foco automático.

### Columna 1 (Barra lateral izquierda - Categorías):
* Lista de navegación vertical con botones para alternar entre: **Listas**, **Tuplas**, **Diccionarios** y **Conjuntos**.
* Badge contativo que indica la cantidad total de métodos por categoría.
* Estado activo destacado en color naranja (`#f97316`).

### Columna 2 (Área Central de Contenido):
* **Breadcrumbs y Título:** Muestra la ruta actual y descripción del tipo de dato.
* **Badges de Propiedades:** Etiquetas informativas sobre si es mutable, ordenado, etc.
* **Filtros por Nivel (Tier):** Tres botones para filtrar los métodos visibles (`All`, `Essential ★`, `Regular`).
* **Línea de Tiempo Vertical (Timeline):**
  * Cada método se presenta como una fila en la línea de tiempo.
  * Riel vertical con una línea gris y un punto naranja (`timeline-node`) alineado por cada método.
  * **Tarjetas de método de 2 columnas interna:**
    * *Lado izquierdo:* Nombre del método, badge de nivel, firma de función, tipo de retorno, descripción corta y tabla/lista de parámetros.
    * *Lado derecho:* Caja de código estilo terminal oscura con botón de "Copiar" interactivo y resaltado de código mediante Prism.js.

### Columna 3 (Índice Derecho - "En esta página"):
* Menú de anclas dinámico que lista los métodos visibles en la categoría actual para scroll rápido.

---

## 5. Requerimientos de Lógica Reactiva (Script de Cliente)

1. **Estado Inicial:** Cargar por defecto la categoría `listas` y el filtro `all`.
2. **Cambio de Categoría:** Al hacer clic en un tipo de dato lateral, actualizar títulos, propiedades, contadores, lista de métodos y resetear la barra de búsqueda.
3. **Buscador en Tiempo Real:** Filtrar la lista de métodos dinámicamente según texto ingresado en el buscador (buscando en nombre, firma, descripción y parámetros).
4. **Filtro de Tier:** Permitir filtrar entre todos los métodos, solo esenciales (`essential`) o comunes (`regular`).
5. **Copia al Portapapeles:**
   * Botón en los bloques de código para copiar el snippet con feedback visual ("¡Copiado!").
   * Enlace en el símbolo `#` de cada método para copiar la URL directa con el hash ancla (`#append`).
6. **Resaltado de Sintaxis:** Ejecutar `Prism.highlightAll()` o `Prism.highlightAllUnder()` cada vez que se re-renderice la lista de métodos en el DOM.
7. **Atajo de Teclado:** Presionar la tecla `/` en cualquier momento debe enfocar la barra de búsqueda.

---

## 6. Instrucción para la IA / Desarrollador

> *"Genera los componentes de Astro necesarios (`ReferenceHub.astro`) consumiendo un archivo JSON con la estructura descrita. Implementa el diseño de 3 columnas con CSS puro utilizando la paleta de colores oscuros (fondos `#131417`, `#16171b`, acentos en naranja `#f97316`). Toda la interactividad (búsqueda, filtros, cambio de categoría y Prism.js) debe ser manejada dentro de una etiqueta `<script>` del lado del cliente en Astro."*

## Restricciones
- **Package Manager**: pnpm (not npm)
- No levantes servidores ni hagas `build`, simplemente avisa, que lo hará un humano.
- Si una página se está repitiendo mucho, contempla separarlo a un componente Astro.
- No levantes servidores sin previa autorización
- No generes comentarios dentro del codigo a menos de que yo te lo indique