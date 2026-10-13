# Portfolio de Alexandra Mena Sansano

Web en inglés para mostrar criterio de producto, liderazgo, IA aplicada y diseño físico-digital. La segunda dirección visual usa una base gráfica en blanco y negro, una portada tipográfica y cubiertas conceptuales originales. El retrato personal aparece solo en Profile. Incluye cinco casos públicos, perfil y tres selecciones con URL propia para candidaturas: Product leadership, Product & AI y Staff / Principal.

## Desarrollo

Node.js 24.19.0 es la versión comprobada; Astro requiere Node 22.12 o superior.

```sh
cd /workspace/Portfolio
npm ci --cache /workspace/.cache/npm --no-audit --no-fund
npm run dev
```

El servidor usa el puerto 4321. `npm run build` genera la web estática en `dist/`; `npm run preview` sirve ese resultado. Las fuentes se sirven localmente. No se necesita backend, base de datos, variables de entorno ni credenciales para desarrollar el portfolio.

## Validación

```sh
npm run build
npm test
```

Playwright comprueba rutas, enlaces internos, filtros, menú móvil y teclado, enlaces de selección, descarga PDF, atribuciones, ausencia de desbordamientos entre 320 y 1440 px, interacción con las cubiertas y controles de movimiento. Utiliza `/usr/bin/chromium` cuando existe. En otra máquina se puede instalar Chromium con `npx playwright install chromium` o indicar una instalación existente mediante `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

## Contenido

- `src/data/portfolio.ts`: hechos públicos, estados, textos de los casos y selecciones por candidatura.
- `/portfolio.json`: los mismos hechos y límites en un formato reutilizable por el futuro sistema de candidaturas, con rutas de proyectos y selecciones; no contiene los criterios privados de búsqueda.
- `src/pages/`: home, índice, casos, perfil y selecciones.
- `src/components/ProjectArt.astro`: cubiertas conceptuales originales; no reproduce pantallas de clientes ni representa productos entregados.
- `src/styles/visual-v2.css`: dirección de arte gráfica, composiciones de distinta escala, interacción y tratamiento responsive.
- `public/images/editorial-art.png`: una imagen conceptual generada con IA para este portfolio, usada como cuatro escenas de estudio. No son fotografías de productos de clientes.
- `public/images/markets-map.svg`: mapa derivado de los datos de dominio público de Natural Earth, con los seis mercados del caso BBVA destacados. Fuente: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson.
- `public/alexandra-mena-cv.pdf`: copia sin modificar del CV en inglés suministrado.
- `public/images/alexandra-portrait.jpg`: versión web del nuevo retrato suministrado en `DSC09951.ARW`, convertido a JPEG y orientado según la cámara. El original RAW permanece fuera del repositorio; el encuadre y el blanco y negro se aplican con CSS.

La base documental es el banco maestro (versión interna 7, 22 de septiembre de 2026), los CV, la arquitectura web, la dirección visual y los mensajes públicos compartidos por Alexandra. Los ZIP, la conversación, las condiciones personales de búsqueda y los materiales confidenciales quedan fuera del repositorio y de la web. Los estados de proyectos se presentan como documentados en septiembre de 2026, sin inferir avances posteriores.

Alexandra indicó Huge por dinamismo e interacción, AREA 17 por su carácter moderno, ordenado y minimalista, y Signal A como combinación de ambos. La versión 2 interpreta esas indicaciones. Tras el bloqueo inicial se revisó el HTML de los tres sitios y se obtuvieron capturas parciales de Huge y AREA 17. Los recursos externos de Signal A siguen sin cargar; para esa referencia se utiliza la descripción de Alexandra.

Mormedi no aparece como caso de éxito mientras no haya resultado final documentado. Los casos BBVA distinguen el alcance de cada iniciativa. El crecimiento de cuenta y los 40 FTE conservan la atribución compartida. No se inventan métricas de uso, conversión o ahorro.

## Publicación

La revisión navegable está preparada para GitHub Pages en `/Portfolio/`. Es necesario habilitar Pages en el repositorio, con **Deploy from a branch → gh-pages → / (root)**. La creación de la rama no activa ese ajuste por sí sola. La URL esperada tras activarlo es `https://alexmenasansano.github.io/Portfolio/`; no se da por operativa hasta comprobar una respuesta real.

```sh
npm run build:preview
npm run publish:preview
```

La primera orden genera `.preview-dist/` con los enlaces y recursos bajo `/Portfolio/`, una meta `noindex, nofollow`, `robots.txt` y `.nojekyll`. La segunda actualiza la rama `gh-pages` mediante un índice Git separado, sin cambiar el checkout ni su área de staging. No usa force push. Una vez activado Pages, cada actualización mantiene la misma URL; la publicación puede tardar unos minutos y no ofrece recarga en vivo del servidor local.

El build normal conserva `/` para desarrollo y otros alojamientos. `sitePath()` aplica el prefijo a enlaces y archivos públicos; Vite adapta los recursos CSS. Cuando se elija un dominio definitivo, añadir `site` en `astro.config.mjs` para generar URLs canónicas y preparar la imagen de compartir.

Para futuras tareas de Codex, usar este checkout existente: la tarea ya está aislada y no necesita un worktree adicional.
