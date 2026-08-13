# Guía 01 — La Terminal y tus primeros proyectos

> ⚠️ **Antes de esta guía, leé [GUIA-00 — ¿Qué es una App Web? FE y BE](GUIA-00-Que-es-una-App-Web-FE-y-BE.md).**
> Ahí están los conceptos (cliente/servidor, frontend, backend, HTTP, JSON, API) que le dan
> sentido a todos los comandos de acá. Sin eso, esta guía es una lista de comandos para
> memorizar; con eso, entendés qué le estás pidiendo a la máquina.
>
> Documento de estudio de Enmanuel. Fecha de inicio: 31 de julio de 2026.
> Objetivo: entender la terminal y levantar tres proyectos desde cero (Bootstrap, FastAPI, React).
>
> **Cómo usar este documento:** leelo de arriba hacia abajo, sin saltar. Cada módulo tiene
> ejercicios. No pases al siguiente módulo hasta que los ejercicios te salgan **sin mirar
> los apuntes**. Marcá las casillas `[ ]` → `[x]` a medida que avanzás.

---

## Índice

- [Módulo 0 — La terminal](#módulo-0--la-terminal)
- [Módulo 1 — Instalar las herramientas](#módulo-1--instalar-las-herramientas)
- [Módulo 2 — Bootstrap (tu primera página)](#módulo-2--bootstrap-tu-primera-página)
- [Módulo 3 — FastAPI (tu primer servidor)](#módulo-3--fastapi-tu-primer-servidor)
- [Módulo 4 — React (tu primera app)](#módulo-4--react-tu-primera-app)
- [🎬 Ruta de videos ordenada](#-ruta-de-videos-ordenada)
- [Chuleta de comandos](#chuleta-de-comandos)
- [Errores comunes y cómo leerlos](#errores-comunes-y-cómo-leerlos)
- [Glosario](#glosario)
- [Checklist de progreso](#checklist-de-progreso)

---

# Módulo 0 — La terminal

## 0.1 ¿Qué es?

Una ventana donde le das órdenes a la computadora **escribiendo texto**, en vez de hacer clic.

No es magia ni es "cosa de hackers". Es simplemente la interfaz que usan las herramientas de
desarrollo, porque no tienen botones: crear un proyecto, instalar una librería o levantar un
servidor son acciones que se piden por texto.

La terminal que usás en Windows se llama **PowerShell**.

## 0.2 La idea más importante: la terminal SIEMPRE está dentro de una carpeta

Cuando abrís la terminal, ves algo así:

```
PS C:\Users\enman\OneDrive\Escritorio\APRENDER A PROGRAMAR>
```

Eso se llama el **prompt**. Te está diciendo dos cosas:

1. `PS` = estás en PowerShell.
2. `C:\Users\enman\...\APRENDER A PROGRAMAR` = **la carpeta donde estás parado ahora**.

Todo comando que escribas actúa sobre esa carpeta. Si estás en la carpeta equivocada, el
comando correcto va a fallar o va a crear cosas en el lugar equivocado.

> 🔑 **Regla de oro:** antes de escribir cualquier comando, mirá el prompt y preguntate
> *"¿estoy en la carpeta correcta?"*. El 80% de los errores de principiante son esto.

## 0.3 Anatomía de un comando

Todos los comandos tienen la misma estructura:

```
npm            install          --save-dev
└─ programa    └─ argumento     └─ flag (opción)
```

| Parte | Qué es | Ejemplos |
|---|---|---|
| **programa** | La herramienta que invocás | `npm`, `git`, `python`, `cd` |
| **argumento** | Sobre qué actúa | un nombre de carpeta, un archivo, un paquete |
| **flag** | Una opción que modifica el comportamiento. Empieza con `-` o `--` | `--version`, `-r`, `--reload` |

**Esto es lo que te permite dejar de copiar y pegar a ciegas.** Cuando veas un comando en
internet, separalo en estas tres partes y ya vas a intuir qué hace.

Ejemplo: `node --version` → programa `node`, flag `--version` → "node, decime tu versión".

## 0.4 Moverse: los comandos de navegación

Estos cuatro son tu forma de caminar por el disco duro.

```powershell
pwd          # "print working directory" -> ¿dónde estoy?
ls           # "list" -> ¿qué hay acá dentro?
cd carpeta   # "change directory" -> entrar a una carpeta
cd ..        # subir un nivel (salir de la carpeta actual)
```

`..` significa "la carpeta de arriba". Es un concepto, no un nombre de carpeta.

**Rutas con espacios:** tu carpeta se llama `APRENDER A PROGRAMAR`, con espacios. La terminal
usa el espacio para separar argumentos, así que hay que ponerla entre comillas:

```powershell
cd "APRENDER A PROGRAMAR"     # ✅ correcto
cd APRENDER A PROGRAMAR       # ❌ la terminal lee 3 argumentos distintos y falla
```

## 0.5 Crear y ver cosas

```powershell
mkdir mi-proyecto      # crear una carpeta
cat archivo.txt        # ver el contenido de un archivo en la terminal
```

## 0.6 Las tres teclas que más te van a salvar

| Tecla | Qué hace | Por qué importa |
|---|---|---|
| `Tab` | **Autocompleta** nombres de archivos y carpetas | Escribís `cd mi` + `Tab` → completa `mi-proyecto`. Elimina los errores de tipeo. Usalo SIEMPRE. |
| `↑` `↓` | Recorre los comandos que ya escribiste | No retipees nada. Flecha arriba y `Enter`. |
| `Ctrl + C` | **Mata** el proceso que está corriendo | Cuando levantás un servidor, la terminal queda "ocupada". Esto lo apaga. También rescata cualquier cosa colgada. |

## 0.7 Qué significa que la terminal "se quede trabada"

Cuando corras un servidor (`npm run dev`, `uvicorn ...`), la terminal va a imprimir algo y
después **se queda quieta, sin devolverte el prompt**.

**Eso NO es un error.** El servidor está vivo y escuchando. Esa terminal ahora está dedicada
a él. Si querés escribir otros comandos, abrí una **segunda terminal**. Para apagar el
servidor: `Ctrl + C`.

## 0.8 `localhost` y los puertos

Los servidores te van a dar una dirección como `http://localhost:5173`.

- **`localhost`** = "esta misma computadora". No está en internet, nadie más lo ve. Es tuyo.
- **`5173`** = el **puerto**, como el número de puerta. Cada servidor usa una distinta para no
  chocarse. Convenciones que vas a ver: `5173` (Vite/React), `8000` (FastAPI), `3000` (Node).

Esa dirección la copiás en el navegador y ahí está tu proyecto.

## 0.9 🎬 Videos de apoyo

Elegí **uno** y miralo con la terminal abierta al lado, pausando para repetir cada comando.
No mires los cuatro: mirá uno y practicá.

| Video | Por qué este |
|---|---|
| [¿Cómo se usa la TERMINAL? Tutorial de CMD/PowerShell para PRINCIPIANTES](https://www.youtube.com/watch?v=kfEpjj2NZxU) | **Empezá por acá.** Es de Windows, igual que tu máquina. |
| [Comandos Básicos de PowerShell en Windows 11 — Guía para Principiantes](https://www.youtube.com/watch?v=6ryVGNDEXj8) | Windows 11 exactamente, como el tuyo. |
| [CURSO rápido de TERMINAL y línea de comandos](https://www.youtube.com/watch?v=iZtojEmq--c) | Corto, para tener el panorama general rápido. |
| [Curso COMPLETO de BASH y la Terminal — desde Cero](https://www.youtube.com/watch?v=ABgLEKFhlZE) | Muy completo (~6 h). Para más adelante, cuando ya te muevas solo. |

> ⚠️ **Aviso importante:** la mayoría de los cursos de terminal en YouTube son de **Linux/Mac
> (bash)**, no de Windows. Los comandos que enseñan son casi los mismos (`ls`, `cd`, `pwd`
> funcionan igual en tu PowerShell), pero algunos cambian. Si un video usa `touch`, `rm -rf`
> o `grep` y no te funciona, no es tu culpa: es un comando de Linux. Preguntame el equivalente
> en Windows.

## 0.10 Ejercicios del Módulo 0

Hacelos en la terminal, de verdad. No sirve leerlos.

- [ ] **E0.1** — Abrí la terminal y corré `pwd`. Escribí acá abajo qué te respondió:
  ```
  respuesta:
  ```
- [ ] **E0.2** — Corré `ls`. ¿Ves este archivo (`GUIA-01-Terminal-y-Primeros-Proyectos.md`) en la lista?
- [ ] **E0.3** — Creá una carpeta llamada `practica` con `mkdir`, entrá con `cd` y confirmá con `pwd` que estás dentro.
- [ ] **E0.4** — Salí de `practica` con `cd ..` y verificá con `pwd` que volviste.
- [ ] **E0.5** — Escribí `cd prac` y apretá `Tab` **sin terminar de escribir**. Mirá cómo se completa solo.
- [ ] **E0.6** — Apretá `↑` tres veces y observá cómo aparecen tus comandos anteriores.
- [ ] **E0.7** — Corré `cat zTODO.md` y leé lo que imprime.

---

# Módulo 1 — Instalar las herramientas

## 1.1 Punto de partida (verificado el 31/07/2026)

Estado real de tu máquina:

| Herramienta | Estado | Para qué la necesitás |
|---|---|---|
| Node + npm | ❌ no instalado | React |
| Python real | ❌ no instalado (solo hay un atajo falso de la Microsoft Store) | FastAPI |
| Git | ❌ no instalado | Guardar versiones de tu código |

## 1.2 Instalar con winget

`winget` es el instalador por terminal que ya viene con Windows. Corré estos comandos **uno
por uno**, esperando que cada uno termine:

```powershell
winget install OpenJS.NodeJS.LTS
winget install Python.Python.3.12
winget install Git.Git
```

- `LTS` significa *Long Term Support* → la versión estable y recomendada. Siempre elegí LTS.

## 1.3 ⚠️ Paso que todo el mundo se olvida

Después de instalar, **cerrá la terminal y abrila de nuevo.**

Motivo: la terminal aprende dónde están los programas cuando arranca. Si instalás algo
mientras está abierta, esa terminal no lo va a encontrar y vas a ver `no se reconoce el
comando`. No está roto — solo hay que reiniciarla.

## 1.4 Verificar

```powershell
node --version      # esperás algo como v22.x.x
npm --version       # esperás algo como 10.x.x
python --version    # esperás algo como Python 3.12.x
git --version       # esperás algo como git version 2.4x.x
```

Si los cuatro te devuelven un número, el entorno está listo.

## 1.5 Consejo sobre dónde guardar tus proyectos

Ahora estás trabajando dentro de **OneDrive**, y en una carpeta **con espacios en el nombre**.
Las dos cosas dan problemas cuando programás:

- OneDrive intenta sincronizar los miles de archivos que genera `npm install` → se pone lentísimo
  y a veces corrompe cosas.
- Los espacios en las rutas rompen comandos y obligan a poner comillas todo el tiempo.

Recomendación: creá una carpeta `C:\dev` y guardá los proyectos ahí.

```powershell
cd C:\
mkdir dev
cd dev
```

Este documento de estudio puede quedarse en el Escritorio sin problema. Es solo texto.

## 1.6 Ejercicios del Módulo 1

- [ ] **E1.1** — Instalá Node, Python y Git con los tres comandos de arriba.
- [ ] **E1.2** — Cerrá y volvé a abrir la terminal.
- [ ] **E1.3** — Corré los cuatro `--version` y anotá acá los números que te dio:
  ```
  node:
  npm:
  python:
  git:
  ```
- [ ] **E1.4** — Creá la carpeta `C:\dev`.

---

# Módulo 2 — Bootstrap (tu primera página)

## 2.1 Qué es Bootstrap

Una **librería de CSS**: estilos visuales ya escritos por otra gente. Le pones nombres
concretos a tus etiquetas HTML (`class="btn btn-primary"`) y aparecen botones, tarjetas,
formularios y menús ya diseñados.

**Bootstrap no es un lenguaje ni un programa.** No se instala, no usa terminal, no corre nada.
Es solo un archivo CSS que tu página carga.

Arrancamos por acá porque es lo único que te da un resultado visible sin instalar nada.

## 2.2 Los tres lenguajes de una página web

Antes del código, esta distinción tiene que quedarte clara:

| Lenguaje | Rol | Analogía |
|---|---|---|
| **HTML** | La estructura y el contenido | El esqueleto |
| **CSS** | El aspecto: colores, tamaños, posiciones | La ropa |
| **JavaScript** | El comportamiento: qué pasa al hacer clic | Los músculos |

Bootstrap es **CSS**. React es **JavaScript**.

## 2.3 Manos a la obra

```powershell
cd C:\dev
mkdir practica-bootstrap
cd practica-bootstrap
```

Creá dentro un archivo llamado `index.html` con este contenido:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mi primera página</title>

  <!-- Esta línea es Bootstrap. Trae todo el CSS desde internet. -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

  <div class="container py-5">

    <h1 class="display-4">Hola, soy Enmanuel</h1>
    <p class="lead text-muted">Estoy aprendiendo a programar desde cero.</p>

    <button class="btn btn-primary">Un botón</button>
    <button class="btn btn-outline-secondary">Otro botón</button>

    <div class="card mt-4" style="max-width: 24rem;">
      <div class="card-body">
        <h5 class="card-title">Una tarjeta</h5>
        <p class="card-text">Todo este diseño viene de Bootstrap. No escribí una sola línea de CSS.</p>
      </div>
    </div>

  </div>

</body>
</html>
```

Ahora abrilo en el navegador:

```powershell
start index.html
```

## 2.4 Cómo leer ese archivo

- `<!DOCTYPE html>` → "esto es una página HTML moderna".
- `<head>` → información **sobre** la página (título, idioma, qué CSS cargar). No se ve.
- `<body>` → lo que **sí se ve**.
- `<link href="...bootstrap...">` → la línea que trae Bootstrap. Sin ella, la página se ve en
  blanco y negro sin estilo. **Probá borrarla y recargar** para ver la diferencia. Es el mejor
  experimento del módulo.
- `class="..."` → acá le decís a Bootstrap qué estilo aplicar.

Clases que ya usaste: `container` (centra el contenido), `py-5` (padding vertical),
`btn btn-primary` (botón azul), `card` (tarjeta), `mt-4` (margen arriba).

## 2.5 🎬 Videos de apoyo

**Primero HTML y CSS, después Bootstrap.** Bootstrap es CSS ya escrito: si no entendés algo de
HTML y CSS base, vas a estar copiando clases sin saber qué hacen. No te saltes este paso.

**Paso 1 — HTML y CSS (la base, sí importa):**

| Video | Nota |
|---|---|
| [Curso de HTML y CSS desde CERO (Completo)](https://www.youtube.com/watch?v=ELSm-G201Ls) | El más recomendado como base sólida. |
| [Aprende HTML y CSS — Curso Desde Cero](https://www.youtube.com/watch?v=XqFR2lqBYPs) | Alternativa, otro estilo de explicación. |
| [Curso de HTML y CSS Desde Cero para Principiantes](https://www.youtube.com/watch?v=lMkiGNlavPk) | Otra opción reciente. |

**Paso 2 — Bootstrap:**

| Video | Nota |
|---|---|
| [Aprende Bootstrap 5 en 15 minutos](https://www.youtube.com/watch?v=qgxhrJFTOJs) | **Mirá este primero.** Corto, te da la idea completa. |
| [Curso de BOOTSTRAP desde CERO (Completo)](https://www.youtube.com/watch?v=kLBlM3yF2-A) | Curso completo si querés profundizar. |
| [Curso de Bootstrap 5 desde cero — Web responsiva para tu portafolio](https://www.youtube.com/watch?v=gWan3LptzgM) | Con un proyecto real de portafolio al final. |
| [Curso COMPLETO de Bootstrap desde cero v5 (playlist)](https://www.youtube.com/playlist?list=PLUW3XAK9O3HFfc7KryNaE9jsqhmCpbBQi) | Serie en capítulos cortos. |

> Asegurate de que diga **Bootstrap 5**. Los tutoriales de Bootstrap 3 o 4 usan nombres de
> clases distintos y te van a confundir.

## 2.6 Ejercicios del Módulo 2

- [ ] **E2.1** — Creá el archivo, abrilo en el navegador y confirmá que lo ves con estilo.
- [ ] **E2.2** — Borrá la línea del `<link>` de Bootstrap, guardá, recargá (`F5`). Anotá qué cambió. Después volvé a ponerla.
- [ ] **E2.3** — Cambiá `btn-primary` por `btn-success` y luego por `btn-danger`. ¿Qué pasa?
- [ ] **E2.4** — Agregá un tercer botón vos solo.
- [ ] **E2.5** — Buscá en Google "bootstrap alert" y agregá un cuadro de alerta a tu página. **Aprender a buscar documentación es parte del oficio.**

---

# Módulo 3 — FastAPI (tu primer servidor)

## 3.1 Qué es

**FastAPI** es una librería de **Python** para construir un **backend**: un programa que corre
en un servidor, guarda datos y responde preguntas.

La diferencia clave con el Módulo 2:

- Bootstrap = **frontend** → lo que el usuario ve.
- FastAPI = **backend** → lo que el usuario NO ve: la base de datos, las cuentas, la lógica.

Cuando entrás a una app y aparecen tus mensajes, el frontend los dibuja pero el backend los
buscó y los mandó.

## 3.2 El concepto nuevo: entorno virtual (`venv`)

Un **entorno virtual** es una cajita de librerías que le pertenece solo a *este* proyecto.

¿Por qué existe? Porque el proyecto A puede necesitar FastAPI versión 1 y el proyecto B la
versión 2. Si instalás todo junto en la computadora, se pisan y se rompe todo. Con un `venv`
por proyecto, cada uno tiene lo suyo.

Es una convención absolutamente estándar en Python. Acostumbrate a crear uno siempre.

## 3.3 Manos a la obra

```powershell
cd C:\dev
mkdir practica-fastapi
cd practica-fastapi

python -m venv venv            # 1. crear la cajita
.\venv\Scripts\Activate.ps1    # 2. entrar a la cajita
pip install fastapi uvicorn    # 3. instalar DENTRO de la cajita
```

Desglose:

| Comando | Qué hace |
|---|---|
| `python -m venv venv` | `-m venv` = "ejecutá el módulo venv". El segundo `venv` es el nombre de la carpeta que crea. |
| `.\venv\Scripts\Activate.ps1` | Activa el entorno. **Después de esto vas a ver `(venv)` al principio del prompt.** Esa es tu señal de que estás dentro. |
| `pip install ...` | `pip` es el instalador de librerías de Python (el equivalente a `npm`). |

> Si `Activate.ps1` te da un error de "scripts deshabilitados", corré una sola vez:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```
> Es un permiso de Windows para poder ejecutar scripts locales.

Creá un archivo `main.py`:

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def inicio():
    return {"mensaje": "Hola, mi primer backend"}


@app.get("/saludo/{nombre}")
def saludar(nombre: str):
    return {"mensaje": f"Hola, {nombre}"}
```

Levantalo:

```powershell
uvicorn main:app --reload
```

Abrí `http://127.0.0.1:8000` en el navegador. Después probá:

- `http://127.0.0.1:8000/saludo/Enmanuel`
- `http://127.0.0.1:8000/docs` ← **esto es lo mejor de FastAPI**: te genera una página para
  probar tu API automáticamente, sin que escribas nada.

Para apagarlo: `Ctrl + C`.

## 3.4 Cómo leer ese código

- `from fastapi import FastAPI` → traer una herramienta de otra librería.
- `app = FastAPI()` → crear la aplicación.
- `@app.get("/")` → un **decorador**. Significa: "cuando alguien pida la dirección `/`, ejecutá
  la función que viene abajo". Cada uno de estos es una **ruta** (*endpoint*).
- `def inicio():` → definir una función.
- `return {...}` → lo que se le devuelve al navegador. Ese formato `{"clave": "valor"}` es
  **JSON**, el idioma en que frontend y backend se hablan.
- `{nombre}` en la ruta → una parte variable de la dirección, que llega como argumento a la función.
- `uvicorn main:app` → "en el archivo `main`, corré la variable `app`". `--reload` = reiniciate
  solo cada vez que guarde un cambio.

## 3.5 🎬 Videos de apoyo

FastAPI es Python. **Si nunca escribiste Python, mirá primero un curso básico del lenguaje**
(variables, funciones, `if`, listas). Sin eso, FastAPI se vuelve copiar y pegar.

| Video | Nota |
|---|---|
| [FastAPI explicado fácil y rápido para principiantes](https://www.youtube.com/watch?v=FpjdLbm30ZY) | **Empezá acá.** Corto, para entender la idea. |
| [Tutorial FastAPI: Crea tu primera API con Python en 10 Minutos](https://www.youtube.com/watch?v=nOnceJl6UjE) | Rapidísimo y reciente (2026). |
| [FastAPI desde cero: Tu primera API en Python (Hola Mundo)](https://www.youtube.com/watch?v=buRAjFyuM9M) | Hace casi exactamente lo mismo que este módulo. |
| [Curso de Introducción a FastAPI 2025 — Backend con Python (playlist)](https://www.youtube.com/playlist?list=PLHftsZss8mw7pSRpCyd-TM4Mu43XdyB3R) | Curso completo por capítulos, para profundizar. |
| [⚡ Curso FastAPI con Python](https://www.youtube.com/watch?v=yQ35nqHaJ5c) | Alternativa en un solo video. |

## 3.6 Ejercicios del Módulo 3

- [ ] **E3.1** — Hacé todo el flujo y confirmá que ves `(venv)` en el prompt.
- [ ] **E3.2** — Abrí `/docs` y probá tus dos rutas desde ahí.
- [ ] **E3.3** — Agregá una ruta `/sobre-mi` que devuelva tu nombre y qué estás estudiando.
- [ ] **E3.4** — Con el servidor corriendo, cambiá un texto del `return`, guardá y recargá el navegador. Fijate que `--reload` lo aplicó solo.
- [ ] **E3.5** — Apagá el servidor con `Ctrl + C` y recargá el navegador. Anotá qué error muestra. **Entender ese error es entender qué es un servidor.**

---

# Módulo 4 — React (tu primera app)

## 4.1 Qué es

**React** es una librería de **JavaScript** para construir interfaces. Su idea central:
partir la pantalla en **componentes** reutilizables (un botón, una tarjeta, un menú) y
combinarlos como bloques de Lego.

Lo dejamos para el final porque tiene más conceptos nuevos de golpe. No te frustres si el
Módulo 4 te cuesta más que los anteriores — es normal y le pasa a todos.

## 4.2 Manos a la obra

```powershell
cd C:\dev
npm create vite@latest practica-react -- --template react
cd practica-react
npm install
npm run dev
```

Desglose:

| Comando | Qué hace |
|---|---|
| `npm create vite@latest` | **Vite** es la herramienta que arma el proyecto por vos: crea las carpetas y archivos base. |
| `-- --template react` | El `--` suelto le dice a npm "lo que sigue no es para vos, pasalo a Vite". `--template react` = quiero la plantilla de React. |
| `npm install` | Descarga todas las librerías que el proyecto necesita, dentro de `node_modules`. |
| `npm run dev` | Levanta el servidor de desarrollo → `http://localhost:5173`. |

## 4.3 Qué archivos te importan

De todos los archivos que se crearon, al principio solo mirás estos:

```
practica-react/
├── src/
│   ├── App.jsx      ← ACÁ ESCRIBÍS. Es tu componente principal.
│   └── main.jsx     ← el arranque. Casi nunca lo tocás.
├── index.html       ← la página que carga todo.
├── package.json     ← la ficha del proyecto: nombre, librerías, comandos.
└── node_modules/    ← las librerías descargadas. NUNCA se toca ni se lee.
```

Abrí `src/App.jsx`, borrá todo y poné esto:

```jsx
function App() {
  return (
    <div>
      <h1>Hola, soy Enmanuel</h1>
      <p>Esta es mi primera app en React.</p>
    </div>
  )
}

export default App
```

Guardá. **El navegador se actualiza solo.** Eso se llama *hot reload*.

## 4.4 Los conceptos nuevos

- Un **componente** es una función de JavaScript que devuelve algo que parece HTML.
- Ese "HTML dentro de JavaScript" se llama **JSX**. No es HTML de verdad: por eso se escribe
  `className` en lugar de `class`.
- `export default App` → hacer este componente disponible para que otros archivos lo usen.
- `package.json` → la ficha del proyecto. En `"scripts"` están los comandos que podés correr
  con `npm run`.

## 4.5 🎬 Videos de apoyo

React es **JavaScript**. Este es el módulo donde más se nota si te faltan bases: **antes de
React, aprendé JavaScript** (funciones, arrays, `map`, arrow functions). Es la causa número uno
de que la gente abandone React.

| Video | Nota |
|---|---|
| [Curso COMPLETO de REACT desde CERO 2025 (playlist)](https://www.youtube.com/playlist?list=PLO8lO9oepSLv0zh2j644zWefsxEGR8zdC) | **La mejor opción**: capítulos cortos, vas a tu ritmo. |
| [¿POR QUÉ utilizar VITE con REACT?](https://www.youtube.com/watch?v=MWh33z6qtAw) | Explica exactamente la herramienta que usamos en este módulo. |
| [CURSO de REACT desde cero 2025](https://www.youtube.com/watch?v=2xhAcqhSuVU) | Un solo video, de cero, sin experiencia previa. |
| [Curso React JS 2025 desde cero — Proyecto completo con Hooks y JSX](https://www.youtube.com/watch?v=BisJdN2LWEY) | Con proyecto real de punta a punta. |
| [REACT curso de 0 a EXPERTO 2025](https://www.youtube.com/watch?v=GMnWXlJnbNo) | Más largo y profundo, para cuando ya te sientas cómodo. |

> Buscá cursos de **2024 o posteriores** y que usen **Vite**. Los viejos usan
> `create-react-app`, que ya está descontinuado, y "componentes de clase", que ya no se usan.

## 4.6 Ejercicios del Módulo 4

- [ ] **E4.1** — Creá el proyecto y confirmá que lo ves en `localhost:5173`.
- [ ] **E4.2** — Editá `App.jsx` con el servidor corriendo y mirá cómo se actualiza solo.
- [ ] **E4.3** — Abrí `package.json` y buscá la sección `"scripts"`. Anotá qué comandos existen.
- [ ] **E4.4** — Creá un segundo componente `Tarjeta` en el mismo archivo y usalo dentro de `App`.
- [ ] **E4.5** — Agregá Bootstrap a este proyecto React (`npm install bootstrap`) y usá `className="btn btn-primary"` en un botón. **Acá se juntan el Módulo 2 y el Módulo 4.**

---

# 🎬 Ruta de videos ordenada

Cada módulo ya tiene sus videos arriba. Esta es la **ruta completa en orden**, para que veas el
camino entero de un vistazo. Los marcados con ⭐ son el camino mínimo: si solo vas a ver unos
pocos, mirá esos.

| # | Tema | Video |
|---|---|---|
| 1 | ⭐ Terminal (Windows) | [Tutorial de CMD/PowerShell para PRINCIPIANTES](https://www.youtube.com/watch?v=kfEpjj2NZxU) |
| 2 | ⭐ HTML + CSS | [Curso de HTML y CSS desde CERO (Completo)](https://www.youtube.com/watch?v=ELSm-G201Ls) |
| 3 | ⭐ Bootstrap | [Aprende Bootstrap 5 en 15 minutos](https://www.youtube.com/watch?v=qgxhrJFTOJs) |
| 4 | Bootstrap a fondo | [Curso de BOOTSTRAP desde CERO (Completo)](https://www.youtube.com/watch?v=kLBlM3yF2-A) |
| 5 | ⭐ FastAPI | [FastAPI explicado fácil y rápido para principiantes](https://www.youtube.com/watch?v=FpjdLbm30ZY) |
| 6 | FastAPI a fondo | [Curso de Introducción a FastAPI 2025 (playlist)](https://www.youtube.com/playlist?list=PLHftsZss8mw7pSRpCyd-TM4Mu43XdyB3R) |
| 7 | ⭐ React | [Curso COMPLETO de REACT desde CERO 2025 (playlist)](https://www.youtube.com/playlist?list=PLO8lO9oepSLv0zh2j644zWefsxEGR8zdC) |
| 8 | Vite (la herramienta) | [¿POR QUÉ utilizar VITE con REACT?](https://www.youtube.com/watch?v=MWh33z6qtAw) |
| 9 | ⭐ Git y GitHub | [Curso de GIT y GITHUB desde CERO para PRINCIPIANTES](https://www.youtube.com/watch?v=3GymExBkKjE) |
| 10 | Git alternativa | [Curso de GIT desde CERO (Completo)](https://www.youtube.com/watch?v=9ZJ-K-zk_Go) |

## Cómo mirar un video de programación (importante)

Mirar tutoriales **se siente** como aprender, pero si solo mirás no aprendés nada. Es la trampa
más común. Reglas:

1. **Terminal y editor abiertos al lado del video.** Siempre.
2. **Pausá y escribí el código vos.** Sin copiar y pegar. Si el video avanza y vos no
   escribiste, retrocedé.
3. **Velocidad 1x la primera vez.** Después podés ir a 1.25x o 1.5x.
4. **No mires más de un curso del mismo tema a la vez.** Elegí uno y terminalo.
5. **Cuando el video termine, rehacé el proyecto solo, desde cero, sin el video.** Ese momento
   —cuando podés hacerlo sin ayuda— es el único que cuenta como "aprendido".
6. **Si un video te aburre o no le entendés al que habla, cambialo.** Hay decenas. No pierdas
   una semana peleando con un explicador que no te encaja.

> Estos enlaces salieron de búsquedas hechas el 31/07/2026. No vi los videos, los seleccioné
> por título, tema y fecha. Si alguno está caído, es muy viejo o no te sirve, decime y te busco
> un reemplazo.

---

# Chuleta de comandos

## Navegación

```powershell
pwd                  # ¿dónde estoy?
ls                   # ¿qué hay acá?
cd carpeta           # entrar
cd ..                # subir un nivel
cd C:\dev            # ir a una ruta exacta
mkdir nombre         # crear carpeta
cat archivo.txt      # ver un archivo
start archivo.html   # abrir con el programa por defecto
```

## Teclas

```
Tab          autocompletar
↑ / ↓        comandos anteriores
Ctrl + C     matar lo que está corriendo
```

## Node / React

```powershell
node --version
npm install                    # instalar las librerías del proyecto
npm install nombre-libreria    # agregar una librería nueva
npm run dev                    # levantar el servidor de desarrollo
```

## Python / FastAPI

```powershell
python --version
python -m venv venv               # crear entorno virtual
.\venv\Scripts\Activate.ps1       # activarlo (aparece "(venv)")
deactivate                        # salir del entorno
pip install nombre-libreria       # instalar dentro del entorno
pip list                          # ver qué hay instalado
uvicorn main:app --reload         # levantar el servidor
```

---

# Errores comunes y cómo leerlos

**Leer errores es una habilidad, no un castigo.** Casi siempre el error te dice exactamente
qué pasa. Regla práctica: leé la **última** línea primero, ahí suele estar lo importante.

| Lo que ves | Qué significa | Solución |
|---|---|---|
| `no se reconoce el comando 'node'` | La terminal no encuentra el programa | ¿Lo instalaste? ¿Reiniciaste la terminal después de instalar? |
| `no se encontró Python; ejecutar sin argumentos para instalar desde Microsoft Store` | Estás tocando el atajo falso de Windows, no un Python real | Instalá Python de verdad (Módulo 1) |
| `ENOENT: no such file or directory, open 'package.json'` | Estás en la carpeta equivocada | `pwd` para ver dónde estás, `cd` a la carpeta del proyecto |
| `Port 5173 is already in use` | Ya tenés otro servidor corriendo en ese puerto | `Ctrl+C` en la otra terminal, o dejá que use otro puerto |
| `Activate.ps1 no se puede cargar porque la ejecución de scripts está deshabilitada` | Permiso de Windows | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| `ModuleNotFoundError: No module named 'fastapi'` | Instalaste fuera del entorno, o no lo activaste | Verificá que veas `(venv)` en el prompt |
| `No se puede encontrar la ruta` al hacer `cd` | Nombre mal escrito, o falta comillas por los espacios | Usá `Tab` para autocompletar |

---

# Glosario

| Término | Significado |
|---|---|
| **Terminal / shell** | La ventana donde escribís comandos. La tuya es PowerShell. |
| **Prompt** | El texto antes del cursor. Te dice en qué carpeta estás. |
| **Directorio** | Otra palabra para "carpeta". |
| **Ruta (path)** | La dirección de un archivo: `C:\dev\mi-app\src\App.jsx`. |
| **Flag** | Opción de un comando, empieza con `-` o `--`. |
| **Frontend** | La parte que el usuario ve. HTML, CSS, JavaScript, React, Bootstrap. |
| **Backend** | La parte que el usuario no ve: datos y lógica. Python, FastAPI. |
| **Servidor** | Un programa que espera pedidos y responde. |
| **localhost** | Tu propia computadora, como servidor. Nadie más lo ve. |
| **Puerto** | El número que identifica a un servidor en tu máquina: `8000`, `5173`. |
| **API** | Un conjunto de direcciones que un programa expone para que otros le pidan datos. |
| **Endpoint / ruta** | Una de esas direcciones concretas: `/saludo/Enmanuel`. |
| **JSON** | El formato de texto en que se intercambian datos: `{"nombre": "Enmanuel"}`. |
| **Librería** | Código que escribió otra persona y vos reutilizás. |
| **Paquete** | Una librería empaquetada para instalar. |
| **npm** | El instalador de paquetes de JavaScript. |
| **pip** | El instalador de paquetes de Python. |
| **venv** | Entorno virtual: cajita de librerías por proyecto de Python. |
| **node_modules** | Carpeta donde npm guarda las librerías. No se toca. |
| **Componente** | En React, una pieza reutilizable de interfaz. |
| **JSX** | La sintaxis de React que parece HTML dentro de JavaScript. |
| **Hot reload** | Que el navegador se actualice solo al guardar. |
| **LTS** | *Long Term Support*: la versión estable y recomendada. |
| **Git** | Herramienta para guardar el historial de versiones de tu código. |

---

# Checklist de progreso

## Módulo 0 — Terminal
- [ ] Entiendo que la terminal siempre está parada en una carpeta
- [ ] Sé separar un comando en programa / argumento / flag
- [ ] Me muevo con `pwd`, `ls`, `cd`, `cd ..` sin pensarlo
- [ ] Uso `Tab` automáticamente
- [ ] Sé que `Ctrl+C` mata un proceso
- [ ] Entiendo por qué la terminal "se queda trabada" con un servidor corriendo
- [ ] Puedo explicar qué es `localhost:8000`
- [ ] Hice los 7 ejercicios del Módulo 0

## Módulo 1 — Entorno
- [ ] Node y npm instalados y verificados
- [ ] Python instalado y verificado
- [ ] Git instalado y verificado
- [ ] Tengo `C:\dev` para mis proyectos

## Módulo 2 — Bootstrap
- [ ] Sé la diferencia entre HTML, CSS y JavaScript
- [ ] Mi página se ve con estilo en el navegador
- [ ] Probé quitar el `<link>` de Bootstrap y entendí qué aporta
- [ ] Agregué un componente buscándolo en la documentación

## Módulo 3 — FastAPI
- [ ] Entiendo qué es un entorno virtual y por qué existe
- [ ] Mi servidor responde en `127.0.0.1:8000`
- [ ] Usé la página `/docs`
- [ ] Creé una ruta propia
- [ ] Puedo explicar la diferencia entre frontend y backend

## Módulo 4 — React
- [ ] Mi app corre en `localhost:5173`
- [ ] Entiendo qué es un componente
- [ ] Sé qué archivos importan y cuál no se toca nunca
- [ ] Creé un segundo componente
- [ ] Junté Bootstrap con React

## Después de esto
- [ ] Git básico: `git init`, `git add`, `git commit` → [video](https://www.youtube.com/watch?v=3GymExBkKjE)
- [ ] Conectar mi React con mi FastAPI (que el frontend le pida datos al backend)
- [ ] Subir un proyecto a GitHub

---

## Reglas de estudio

1. **Escribí los comandos a mano, no los copies.** Copiar y pegar no genera memoria.
2. **Cuando algo falle, leé el error completo antes de pedir ayuda.** La última línea primero.
3. **Un módulo por sesión.** Es mejor entender uno bien que pasar por los cuatro sin entender.
4. **Rompé cosas a propósito.** Borrá una línea y mirá qué pasa. Así se aprende qué hace cada
   parte.
5. **Si algo no se entiende, preguntá "¿por qué?" hasta el fondo.** No memorices comandos:
   entendé qué le estás pidiendo a la máquina.
