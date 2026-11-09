# El Guardián de la Interfaz

Aplicación web de una sola página que permite al usuario personalizar el entorno visual (nombre, color de fondo y tema claro u oscuro) y recordar su configuración aunque recargue la página o cierre el navegador. La persistencia se consigue con cookies nativas (`document.cookie`), sin librerías ni `localStorage`.

Actividad de JavaScript del ciclo formativo CFGS Desarrollo de Aplicaciones Web (objeto `document`, manipulación dinámica del DOM y cookies).

- Repositorio: https://github.com/Pablobc1208/Guardian_Interfaz
- Aplicación desplegada: https://pablobc1208.github.io/Guardian_Interfaz/
- Documentación JSDoc: https://pablobc1208.github.io/Guardian_Interfaz/docs/

---

## Índice

1. [Estructura del proyecto](#estructura-del-proyecto)
2. [Ramas y desarrollo](#ramas-y-desarrollo)
3. [Funcionalidades](#funcionalidades)
4. [Cookies utilizadas](#cookies-utilizadas)
5. [Cómo ejecutarlo en local](#cómo-ejecutarlo-en-local)
6. [Documentación con JSDoc](#documentación-con-jsdoc)
7. [Despliegue en GitHub Pages](#despliegue-en-github-pages)
8. [Correspondencia con la rúbrica](#correspondencia-con-la-rúbrica)
9. [Tecnologías](#tecnologías)

---

## Estructura del proyecto

```text
Guardian_Interfaz/
├── index.html        Estructura de la página y formulario
├── style.css         Estilos base y clases de los temas (.tema-claro y .tema-oscuro)
├── script.js         Lógica de la aplicación, comentada con JSDoc
├── docs/             Documentación generada automáticamente con JSDoc
│   ├── index.html        Página de inicio de la documentación
│   ├── global.html       Funciones y variables globales documentadas
│   ├── script.js.html    Código fuente con numeración de líneas
│   ├── fonts/            Tipografías de la plantilla
│   ├── scripts/          Scripts de la plantilla (resaltado de código)
│   └── styles/           Hojas de estilo de la plantilla
├── .gitignore
└── README.md
```

---

## Ramas y desarrollo

El proyecto se ha trabajado por fases, con dos ramas:

| Rama | Uso |
|---|---|
| `dev` | Rama de desarrollo. Aquí se construyen y prueban los cambios. |
| `main` | Rama de producción. Es la que se publica en GitHub Pages. |

Fases del desarrollo, siguiendo los apartados del enunciado:

1. Estructura HTML y contenedor vacío `contenedor-bienvenida`.
2. Formulario y modificación inmediata del aspecto (color de fondo y tema con `classList`).
3. Persistencia con cookies (guardado, caducidad y recuperación al recargar).
4. Reto de borrado: botón para restablecer las preferencias.
5. Documentación con JSDoc, README y despliegue en GitHub Pages.

---

## Funcionalidades

### Generación dinámica del DOM

En `index.html` existe un contenedor con el identificador `contenedor-bienvenida`. Si el usuario ya se había registrado (existe la cookie `nombre`), `script.js` crea el encabezado de bienvenida con `document.createElement()`, le asigna el texto con `textContent` y lo inyecta con `appendChild()`. No se utiliza `document.write()`.

### Formulario y modificación del aspecto

El formulario tiene tres controles:

| Control | Efecto inmediato |
|---|---|
| Input de texto "Nombre de usuario" | Su valor se guarda al pulsar "Guardar Preferencias". |
| `input type="color"` | Cambia el fondo al instante con `document.body.style.backgroundColor`. |
| `select` "Tema visual" | Activa o desactiva las clases `.tema-claro` y `.tema-oscuro` con `classList.add()` y `classList.remove()`. |

Los temas no se aplican con estilos en línea: las clases están definidas previamente en `style.css`.

### Persistencia con cookies

El botón "Guardar Preferencias" almacena la configuración en tres cookies. Al recargar la página, el script lee las cookies existentes, aplica el color y el tema, rellena los campos del formulario y genera la bienvenida.

### Restablecer preferencias

El botón "Restablecer Preferencias":

- Elimina las tres cookies asignándoles una fecha de caducidad pasada (1 de enero de 1970).
- Devuelve la interfaz a su estado inicial sin recargar la página: `formulario.reset()`, fondo blanco y tema claro.
- Destruye del DOM el nodo de bienvenida con `remove()`.

---

## Cookies utilizadas

| Cookie | Contenido | Caducidad |
|---|---|---|
| `nombre` | Nombre de usuario | 7 días, calculados con el objeto `Date` |
| `color` | Color de fondo en hexadecimal | 7 días, calculados con el objeto `Date` |
| `tema` | `claro` u `oscuro` | Sesión (sin `Expires` ni `Max-Age`) |

Los valores se codifican con `encodeURIComponent()` al guardarlos y se decodifican con `decodeURIComponent()` al leerlos. Todas las cookies se crean con `path=/`.

Cálculo de la caducidad a 7 días:

```javascript
const fecha = new Date();
fecha.setDate(fecha.getDate() + 7);
document.cookie = "nombre=Ana; expires=" + fecha.toUTCString() + "; path=/";
```

Para comprobarlo en el navegador: tecla F12, pestaña Application, apartado Cookies. Aparecen `nombre` y `color` con su fecha de caducidad y `tema` como Session.

Funciones principales de `script.js`:

| Función | Descripción |
|---|---|
| `setCookie(nombre, valor, dia)` | Crea una cookie. Con el parámetro `dia` calcula la caducidad; sin él, la cookie es de sesión. |
| `getCookie(nombre)` | Lee una cookie parseando `document.cookie`. |
| `borrarCookie(nombre)` | Elimina una cookie con una fecha de caducidad pasada. |
| `guardarPreferencias()` | Guarda nombre, color y tema en tres cookies. |
| `restaurarPreferencias()` | Lee las cookies y restaura la interfaz al cargar la página. |
| `restablecerPreferencias()` | Borra cookies, resetea el formulario y elimina el nodo de bienvenida. |
| `mostrarBienvenida(nombre)` | Genera el encabezado de bienvenida en el DOM. |
| `cambiarColorFondo(color)` | Aplica el color de fondo a la página. |
| `cambiarTema(tema)` | Cambia el tema con `classList`. |

---

## Documentación con JSDoc

La documentación se genera a partir de los comentarios `/** ... */` escritos en `script.js`. Cada función incluye su descripción, `@param` y `@returns`, y los elementos del DOM se documentan con `@type`.

Ejemplo de comentario:

```javascript
/**
 * Crea o actualiza una cookie.
 *
 * @param {string} nombre - Nombre de la cookie.
 * @param {string} valor - Valor que se va a almacenar.
 * @param {number} [dia] - Días hasta la caducidad. Si se omite, cookie de sesión.
 * @returns {void}
 */
function setCookie(nombre, valor, dia) { ... }
```

### Cómo se ha generado la carpeta docs

1. Instalar Node.js, que incluye `npm` y `npx`.
2. Desde la raíz del proyecto, ejecutar:

   ```bash
   npx jsdoc script.js -d docs
   ```

   - `script.js` es el archivo fuente que se documenta.
   - `-d docs` es la carpeta de destino donde se genera la documentación.

   Alternativa instalando JSDoc de forma global:

   ```bash
   npm install -g jsdoc
   jsdoc script.js -d docs
   ```

3. Abrir `docs/index.html` en el navegador para consultar la documentación.

Cada vez que se modifiquen el código o los comentarios hay que volver a ejecutar el comando para actualizar la carpeta `docs`.

---

## Despliegue en GitHub Pages

GitHub Pages publica una rama concreta del repositorio. Como el desarrollo se hace en `dev` y la publicación se hace desde `main`, antes de desplegar hay que llevar los cambios a `main`:

```bash
git checkout main
git merge dev
git push origin main
```

Después, en el repositorio de GitHub:

1. Entrar en Settings y luego en Pages.
2. En "Build and deployment", elegir "Deploy from a branch".
3. Seleccionar la rama `main` y la carpeta `/ (root)`, y guardar.
4. Esperar un par de minutos hasta que GitHub publique la web.

Resultado:

- Aplicación: https://pablobc1208.github.io/Guardian_Interfaz/
- Documentación: https://pablobc1208.github.io/Guardian_Interfaz/docs/

---

## Correspondencia con la rúbrica

| Apartado | Dónde se cumple |
|---|---|
| Parte 1. DOM dinámico (criterio d) | `mostrarBienvenida()`: `createElement`, `textContent` y `appendChild` |
| Parte 2. Aspecto y estilos (criterio c) | `cambiarColorFondo()` y `cambiarTema()` con `classList` |
| Parte 3. Persistencia (criterio g) | `setCookie()`, `getCookie()`, `guardarPreferencias()` y `restaurarPreferencias()` |
| Parte 4. Reto de borrado (criterios c, g) | `borrarCookie()` y `restablecerPreferencias()` |
| Parte 5. Documentación (criterio h) | Comentarios JSDoc en `script.js`, carpeta `docs/` y despliegue en GitHub Pages |

---

## Tecnologías

- HTML5
- CSS3, con clases para los temas
- JavaScript puro: DOM y `document.cookie`
- JSDoc, para la documentación
- Git y GitHub, para el control de versiones
- GitHub Pages, para el despliegue

---

Autor: Pablo Barrera Corbacho. CFGS Desarrollo de Aplicaciones Web, Ilerna.