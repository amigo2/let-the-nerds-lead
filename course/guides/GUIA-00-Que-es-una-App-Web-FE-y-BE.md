# Guía 00 — ¿Qué es una App Web? Frontend y Backend

> Documento de estudio de Enmanuel. Creado el 31 de julio de 2026.
>
> **Esta guía va ANTES que [GUIA-01](GUIA-01-Terminal-y-Primeros-Proyectos.md).**
> Tu profesor tiene razón: primero hay que entender **qué** estás construyendo, y solo después
> aprender las herramientas para construirlo. Si no, terminás escribiendo comandos sin saber
> qué está pasando.
>
> Acá **no hay que instalar nada**. Es todo conceptos + un ejercicio con tu navegador.

---

## Índice

- [1. La idea central: cliente y servidor](#1-la-idea-central-cliente-y-servidor)
- [2. FE = Frontend](#2-fe--frontend)
- [3. BE = Backend](#3-be--backend)
- [4. Cómo se hablan: petición y respuesta](#4-cómo-se-hablan-petición-y-respuesta)
- [5. El viaje completo de un clic](#5-el-viaje-completo-de-un-clic)
- [6. HTTP: métodos y códigos](#6-http-métodos-y-códigos)
- [7. JSON: el idioma entre FE y BE](#7-json-el-idioma-entre-fe-y-be)
- [8. API: la palabra que vas a escuchar todo el tiempo](#8-api-la-palabra-que-vas-a-escuchar-todo-el-tiempo)
- [9. La base de datos](#9-la-base-de-datos)
- [10. El mapa completo: dónde encaja cada tecnología](#10-el-mapa-completo-dónde-encaja-cada-tecnología)
- [11. Tipos de aplicación web](#11-tipos-de-aplicación-web)
- [12. Cómo una app llega a internet](#12-cómo-una-app-llega-a-internet)
- [🔬 Ejercicio estrella: ver el FE y el BE con tus propios ojos](#-ejercicio-estrella-ver-el-fe-y-el-be-con-tus-propios-ojos)
- [🎬 Videos](#-videos)
- [Glosario](#glosario-de-la-guía-00)
- [Checklist de comprensión](#checklist-de-comprensión)

---

# 1. La idea central: cliente y servidor

Toda aplicación web es **dos programas distintos, en dos computadoras distintas, hablándose por
internet.**

Si entendés solo una cosa de esta guía, que sea esta.

```
   TU COMPUTADORA                              UNA COMPUTADORA EN ALGÚN LADO
   ┌─────────────────┐                         ┌─────────────────┐
   │                 │   "dame los videos"     │                 │
   │    NAVEGADOR    │ ──────────────────────► │    SERVIDOR     │
   │    (CLIENTE)    │                         │                 │
   │                 │ ◄────────────────────── │                 │
   │                 │   "acá están"           │                 │
   └─────────────────┘                         └─────────────────┘
         FRONTEND                                    BACKEND
    lo que VES y TOCÁS                        lo que NO VES nunca
```

- **Cliente** = el programa que **pide**. Casi siempre tu navegador (Chrome, Edge, Firefox).
- **Servidor** = el programa que **responde**. Está corriendo en otra computadora, encendida
  24/7, esperando pedidos.

Cuando abrís Instagram, tu teléfono no tiene las fotos de nadie guardadas. Las **pide** a un
servidor de Instagram, y ese servidor **responde** con ellas. Tu teléfono solo las dibuja
bonito.

### La analogía del restaurante

Es la mejor que existe para esto, y la vas a ver en todos los cursos:

| Restaurante | App web |
|---|---|
| El **salón**: mesas, menú, decoración, el mozo | **Frontend** — lo que el cliente ve |
| Vos, el comensal, pidiendo un plato | El **usuario** haciendo clic |
| El **pedido** que el mozo lleva a la cocina | La **petición** (request) |
| La **cocina**: nadie la ve, ahí se cocina de verdad | **Backend** — la lógica |
| La **despensa / heladera** con los ingredientes | La **base de datos** |
| El plato que sale de la cocina | La **respuesta** (response) |
| La **ventanilla** entre salón y cocina, con reglas de cómo pasar pedidos | La **API** |

Fijate el detalle importante: **el comensal nunca entra a la cocina.** Solo pide por la
ventanilla, con un formato acordado. Eso es exactamente una API.

---

# 2. FE = Frontend

**Frontend** = "la parte del frente". Todo lo que el usuario **ve y con lo que interactúa**.

Corre **en la computadora del usuario**, dentro del navegador. Eso significa que el usuario
puede verlo, inspeccionarlo y modificarlo. Es público. (Guardá ese dato — importa para
seguridad, y lo vas a comprobar en el ejercicio del final.)

**De qué se encarga:**

- Cómo se ve: colores, tipografías, tamaños, espacios
- La estructura: dónde va el menú, el botón, el formulario
- Que se adapte al celular (*responsive*)
- Reaccionar a lo que hace el usuario: clics, escritura, scroll
- Validaciones simples: "este campo está vacío", "este email no tiene @"
- **Pedirle datos al backend** y mostrarlos

**Sus tres lenguajes:**

| Lenguaje | Rol | Analogía |
|---|---|---|
| **HTML** | Estructura y contenido | El esqueleto |
| **CSS** | Aspecto visual | La ropa |
| **JavaScript** | Comportamiento e interacción | Los músculos |

**Herramientas que se le suman** (nunca reemplazan a los tres de arriba, se apoyan en ellos):

- **Bootstrap** → CSS ya escrito, para no diseñar de cero
- **React** → JavaScript organizado en piezas reutilizables (componentes)
- También existen Vue, Angular, Svelte, Tailwind… mismo terreno, otras marcas

**Frase para memorizar:** *el frontend no guarda nada. Solo muestra y pide.*

---

# 3. BE = Backend

**Backend** = "la parte de atrás". Todo lo que el usuario **nunca ve**.

Corre **en el servidor**, no en la máquina del usuario. Nadie puede ver su código. Por eso acá
van los secretos: contraseñas, claves, reglas de negocio.

**De qué se encarga:**

- **Guardar y recuperar datos** (hablar con la base de datos)
- **Autenticación**: verificar de verdad que la contraseña es correcta
- **Autorización**: decidir qué puede hacer cada usuario
- **Reglas de negocio**: cobrar el precio correcto, no vender stock que no hay, calcular el envío
- Tareas pesadas: procesar imágenes, generar PDFs, mandar emails
- Validar **en serio** lo que llega del frontend

**Lenguajes típicos:** Python (con **FastAPI** o Django), JavaScript (Node.js), Java, C#, PHP, Go.

## ⚠️ La regla de oro de la seguridad

**Nunca confíes en el frontend.**

Si el frontend valida que la edad sea mayor a 18, cualquier persona con conocimientos puede
saltarse esa validación —porque el frontend corre **en su computadora**, es suya, la puede
modificar—. La validación **de verdad** siempre tiene que estar también en el backend.

Ejemplo concreto: si escondés el botón "Borrar todo" para los usuarios normales pero el backend
igual acepta la orden de borrar de cualquiera, tu app está rota. Esconder el botón es
decoración, no seguridad.

**Frase para memorizar:** *el frontend es sugerencia; el backend es la ley.*

---

# 4. Cómo se hablan: petición y respuesta

La comunicación entre FE y BE tiene una forma fija y siempre la misma:

```
   FRONTEND                                          BACKEND
      │                                                 │
      │  ── PETICIÓN (request) ──────────────────────►  │
      │     • método:  GET                              │
      │     • dirección: /api/usuarios/7                │  ┌──────────┐
      │     • cabeceras: quién soy, qué formato quiero  │  │   BASE   │
      │     • cuerpo: (datos, si envío algo)            │◄─┤    DE    │
      │                                                 │  │  DATOS   │
      │  ◄── RESPUESTA (response) ─────────────────────  │  └──────────┘
      │     • código:  200 OK                           │
      │     • cuerpo:  {"nombre": "Enmanuel"}           │
      │                                                 │
```

Tres cosas clave de este dibujo:

1. **El frontend siempre inicia.** El backend nunca llama primero; espera. (Existen
   excepciones —*websockets*, notificaciones push— pero olvidate de eso por ahora.)
2. **Cada petición es independiente.** El backend no "recuerda" la anterior por sí solo. Por eso
   existen los tokens y las sesiones: para que puedas decir "soy el mismo de antes".
3. **El frontend nunca toca la base de datos directamente.** Siempre pasa por el backend. El
   comensal no entra a la despensa.

---

# 5. El viaje completo de un clic

Esto es lo que pasa, de verdad, cuando entrás a un sitio. Leelo despacio: entender estos 8
pasos te pone por delante de mucha gente que ya escribe código.

```
1. Escribís "youtube.com" en el navegador y apretás Enter.

2. DNS: el navegador pregunta "¿cuál es la dirección numérica de youtube.com?"
   El DNS es la guía telefónica de internet. Responde algo como 142.250.x.x (una IP).

3. El navegador se conecta a esa IP y pide la página.

4. El servidor responde con HTML, CSS y JavaScript. ── esto es el FRONTEND llegando.

5. El navegador lee el HTML, le aplica el CSS y ejecuta el JavaScript.
   Ya ves algo en pantalla. Puede estar vacío o con "cargando…".

6. Ese JavaScript hace nuevas peticiones al BACKEND: "dame los videos recomendados".

7. El backend consulta su BASE DE DATOS, arma la respuesta en JSON y la manda.

8. El JavaScript recibe el JSON y dibuja los videos en la pantalla.
```

Ese salto entre el paso 5 y el paso 8 es la razón por la que a veces ves la estructura de una
página cargada pero el contenido todavía en blanco, o con esos rectángulos grises pulsando.
Ahora sabés exactamente por qué pasa: **el frontend ya llegó, el backend todavía no respondió.**

---

# 6. HTTP: métodos y códigos

**HTTP** es el idioma de las peticiones. Las reglas de cómo se pide y cómo se responde.
La **S** de **HTTPS** es de *secure*: lo mismo pero cifrado, para que nadie en el medio pueda
leerlo. Hoy todo usa HTTPS.

## Los métodos: qué querés hacer

Cada petición lleva un **método** que declara la intención:

| Método | Intención | Ejemplo real |
|---|---|---|
| **GET** | **Leer** algo | ver un perfil, cargar la lista de productos |
| **POST** | **Crear** algo nuevo | registrarse, publicar un comentario |
| **PUT** / **PATCH** | **Modificar** algo que existe | editar tu foto de perfil |
| **DELETE** | **Borrar** algo | eliminar un mensaje |

En el Módulo 3 de la GUIA-01 escribiste `@app.get("/")`. Ahora ya sabés qué significa ese
`get`: "esta función responde cuando alguien quiera **leer** esta dirección".

> Detalle importante: cuando escribís una dirección en el navegador, siempre estás haciendo un
> **GET**. Los otros métodos los hace el JavaScript, o un formulario.

## Los códigos de estado: cómo salió

Toda respuesta trae un número de tres dígitos. El primer dígito te dice la familia:

| Rango | Significa | Ejemplos que vas a ver |
|---|---|---|
| **2xx** | ✅ Salió bien | `200 OK`, `201 Created` (algo se creó) |
| **3xx** | ↪️ Redirección | `301` "esto se mudó a otra dirección" |
| **4xx** | ❌ **Error del cliente** — pediste mal | `404 Not Found`, `401` (no logueado), `403` (logueado pero sin permiso), `400` (datos inválidos) |
| **5xx** | 💥 **Error del servidor** — el backend se rompió | `500 Internal Server Error` |

**La distinción que más te va a servir en tu vida de programador:**

- **4xx = la culpa es del que pidió.** Revisá la dirección, los datos que mandaste, tu token.
- **5xx = la culpa es del servidor.** Revisá tu código de backend, mirá los logs del servidor.

Cuando algo falle, lo primero que hacés es mirar el código. Te dice de qué lado buscar el
problema, y te ahorra horas.

---

# 7. JSON: el idioma entre FE y BE

**JSON** (*JavaScript Object Notation*) es el formato de texto en el que el FE y el BE se pasan
datos. Es un estándar universal: lo entienden Python, JavaScript, Java, todos.

```json
{
  "id": 7,
  "nombre": "Enmanuel",
  "activo": true,
  "edad": 20,
  "materias": ["Programación", "Base de Datos"],
  "profesor": {
    "nombre": "Prof. García",
    "email": "garcia@escuela.edu"
  }
}
```

Sus reglas son cinco, y con esto ya lo sabés leer:

1. `{ }` = un **objeto**: un conjunto de pares `"clave": valor`
2. `[ ]` = una **lista** de valores
3. Los textos van entre **comillas dobles** (nunca simples)
4. Los valores posibles son: texto, número, `true`/`false`, `null`, otro objeto, o una lista
5. Los objetos se pueden **anidar** (uno dentro de otro), como `"profesor"` arriba

Cuando en FastAPI escribiste `return {"mensaje": "Hola"}`, eso se convirtió en JSON y viajó al
navegador. Ya estabas usando JSON sin saberlo.

---

# 8. API: la palabra que vas a escuchar todo el tiempo

**API** = *Application Programming Interface*. Suena abstracto; la idea no lo es:

> Una API es la **lista de cosas que un programa le permite pedir a otro**, y en qué formato.

Es la ventanilla de la cocina: un conjunto de direcciones, cada una con su método, con reglas
claras de qué recibe y qué devuelve.

Un ejemplo de cómo se ve una API en la práctica:

| Método | Dirección | Qué hace |
|---|---|---|
| `GET` | `/api/productos` | devolver todos los productos |
| `GET` | `/api/productos/15` | devolver el producto 15 |
| `POST` | `/api/productos` | crear un producto nuevo |
| `PUT` | `/api/productos/15` | modificar el producto 15 |
| `DELETE` | `/api/productos/15` | borrar el producto 15 |

Cada una de esas líneas es un **endpoint** (o "ruta"). **La API es el conjunto de todos los
endpoints.**

**REST** es simplemente el estilo o la convención más común de organizar una API así:
direcciones con sustantivos (`/productos`), y el verbo lo pone el método HTTP. Cuando leas
"API REST", pensá "una API organizada de esta forma tan ordenada". No es una tecnología, es una
manera de hacer las cosas.

Detalle que aclara mucho: **el backend que escribís en FastAPI ES una API.** No son cosas
distintas. Por eso FastAPI se llama así.

---

# 9. La base de datos

Es donde los datos **sobreviven**. Si apagás el servidor y lo prendés de nuevo, lo que estaba
en la base de datos sigue ahí. Todo lo demás se pierde.

- **Solo el backend le habla.** El frontend nunca, jamás.
- **SQL** es el idioma con el que se le pregunta. Se ve así:
  `SELECT nombre FROM usuarios WHERE id = 7;`
- Bases relacionales (tablas, como un Excel gigante y ordenado): **PostgreSQL**, **MySQL**,
  **SQLite**. Las no relacionales (documentos JSON): **MongoDB**.
- **SQLite** es un archivo suelto en tu disco, sin instalar nada. Es la ideal para aprender.

Actualizá tu analogía: el mozo (frontend) no entra a la despensa. Le pide al cocinero
(backend), y el cocinero saca los ingredientes.

---

# 10. El mapa completo: dónde encaja cada tecnología

Ahora sí, todo junto y ubicado:

```
┌───────────────────────────────────────────────────────────────────┐
│  FRONTEND  —  corre en el navegador del usuario                   │
│                                                                   │
│    HTML  ....... estructura        ← el esqueleto                 │
│    CSS   ....... estilo            ← Bootstrap vive acá           │
│    JavaScript .. comportamiento    ← React vive acá               │
│                                                                   │
└──────────────────────────┬────────────────────────────────────────┘
                           │
                    HTTP + JSON       ← peticiones y respuestas
                           │
┌──────────────────────────▼────────────────────────────────────────┐
│  BACKEND  —  corre en el servidor                                 │
│                                                                   │
│    Python + FastAPI ..... recibe peticiones, aplica las reglas    │
│                                                                   │
└──────────────────────────┬────────────────────────────────────────┘
                           │
                          SQL
                           │
┌──────────────────────────▼────────────────────────────────────────┐
│  BASE DE DATOS  —  donde los datos sobreviven                     │
│                                                                   │
│    PostgreSQL / MySQL / SQLite                                    │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

Y así se ubica lo que estás aprendiendo:

| Lo que estudiás | Dónde vive | Qué es exactamente |
|---|---|---|
| **Bootstrap** | Frontend | Una librería de CSS |
| **React** | Frontend | Una librería de JavaScript |
| **FastAPI** | Backend | Un framework de Python |

Y por eso el orden de la GUIA-01 tiene sentido: Bootstrap (ver algo ya), FastAPI (entender el
backend), React (unir todo). Cuando terminás los tres, ya tocaste las tres capas del dibujo.

## Full Stack

Alguien **full stack** trabaja las dos partes: frontend y backend. "Stack" = la pila de
tecnologías, todo el dibujo de arriba. No es un nivel superior ni un título: es simplemente
alguien que se mueve en las dos capas.

---

# 11. Tipos de aplicación web

No todas las apps web tienen la misma forma. Estos son los tres tipos que vas a encontrar:

**1. Sitio estático**
Solo archivos HTML/CSS/JS. No hay backend, no hay base de datos. Todos ven exactamente lo
mismo. Un portafolio, la web de un restaurante.
→ *Esto es lo que hacés en el Módulo 2 con Bootstrap.*

**2. Sitio dinámico tradicional (renderizado en servidor)**
El servidor arma el HTML ya completo, con los datos dentro, y lo manda. Cada clic recarga la
página entera. Así funcionaba casi toda la web antes, y muchísimos sitios todavía.

**3. SPA — Single Page Application**
El servidor manda **una sola** página casi vacía y un montón de JavaScript. Ese JavaScript
dibuja todo y va pidiendo datos al backend en JSON, **sin recargar nunca la página**. Por eso
Gmail o Spotify web se sienten como programas de escritorio: no ves el parpadeo de la recarga.
→ *Esto es lo que hacés con React.*

La arquitectura moderna típica —y la que estás aprendiendo— es: **SPA en React + API en FastAPI.**
Dos proyectos separados, dos servidores, hablándose por HTTP con JSON.

---

# 12. Cómo una app llega a internet

Todo lo que hagas en la GUIA-01 corre en `localhost`: **solo en tu computadora, nadie más lo
ve.** Para que el mundo lo vea hacen falta cuatro cosas. No las necesitás ahora, pero conviene
que sepas que existen y para qué son:

| Concepto | Qué es |
|---|---|
| **Hosting** | Alquilar una computadora encendida 24/7 que corra tu app. Ej.: Vercel, Netlify (frontend); Render, Railway, AWS (backend). |
| **Dominio** | El nombre bonito: `mi-app.com`. Se compra por año. |
| **DNS** | La guía telefónica que conecta tu dominio con la IP de tu servidor. |
| **Deploy** | El acto de subir tu código al hosting y ponerlo a andar. |

**El paso mental importante:** cuando hacés *deploy*, tu app deja de estar en `localhost:8000` y
pasa a estar en `https://mi-app.com`. Es la **misma app**, solo cambió de casa.

---

# 🔬 Ejercicio estrella: ver el FE y el BE con tus propios ojos

Todo lo de arriba es teoría hasta que lo ves pasar. **Este ejercicio es el más importante de la
guía.** No necesitás instalar nada, solo tu navegador. Hacelo entero.

### Parte A — Ver el frontend, el que está en tu máquina

1. Abrí cualquier sitio con contenido, por ejemplo YouTube.
2. Apretá **`F12`**. Se abren las **DevTools** (Herramientas de Desarrollador). Esta ventana es
   tu instrumento de trabajo para toda tu carrera. Empezá a acostumbrarte a ella.
3. Andá a la pestaña **Elements** (o *Elementos*).
4. Ahí está el **HTML de la página en vivo**. Pasá el mouse por las líneas y mirá cómo se
   iluminan las partes de la página.
5. **Hacé doble clic sobre un texto cualquiera y cambialo.** Escribí tu nombre. Apretá Enter.

**El texto cambió en la página.** Acabás de "editar YouTube".

Pero ahora **recargá con `F5`** y volvió a la normalidad. ¿Por qué?

> Porque solo modificaste **la copia que estaba en tu computadora**. El frontend es tuyo, lo
> podés cambiar. Pero nada de eso llegó al servidor. **Esa es exactamente la razón por la que
> nunca se confía en el frontend** — cualquiera puede hacer lo que acabás de hacer.
>
> Ese único experimento explica la sección 3 mejor que cualquier texto.

### Parte B — Ver las conversaciones con el backend

1. En las DevTools andá a la pestaña **Network** (*Red*).
2. Con esa pestaña abierta, **recargá la página** con `F5`.
3. Se va a llenar de líneas. **Cada línea es una petición.** Estás viendo, en vivo, todo lo que
   tu navegador le pidió al servidor.
4. Mirá las columnas: **Name** (qué pidió), **Status** (el código: 200, 304, 404…), **Type**
   (si era HTML, CSS, JS, una imagen o `fetch`/`xhr`), **Size** y **Time**.
5. Filtrá por **Fetch/XHR**. Eso deja **solo las llamadas al backend** —las peticiones de datos,
   sin las imágenes ni el CSS.
6. Hacé clic en una de ellas y mirá la pestaña **Response** o **Preview**.

**Eso que estás leyendo es JSON viniendo del backend.** Es la sección 7, real, delante tuyo.

7. Ahora, sin recargar, **navegá por el sitio** (hacé clic en un video, en una sección). Mirá
   cómo **aparecen nuevas líneas** en Network sin que la página se recargue del todo.

Acabás de ver una **SPA** funcionando: el frontend pidiéndole datos al backend a demanda.
Sección 11, comprobada.

### Preguntas para responder acá

Anotá tus respuestas en este archivo:

- **P1** — ¿Cuántas peticiones hizo la página al cargar? (abajo en Network aparece el total)
  ```
  respuesta:
  ```
- **P2** — Buscá una petición con `Status 200` y una con un código distinto. ¿Cuáles encontraste
  y qué significan según la sección 6?
  ```
  respuesta:
  ```
- **P3** — Copiá acá un pedacito del JSON que encontraste en Fetch/XHR:
  ```json

  ```
- **P4** — Entrá a una dirección inventada de un sitio real, tipo `youtube.com/estonoexiste123`.
  ¿Qué código aparece en Network? ¿De quién es la culpa según la sección 6?
  ```
  respuesta:
  ```

---

# 🎬 Videos

**Mirá estos ANTES de los videos de la GUIA-01.** Son cortos y son la base de todo lo demás.

**Paso 1 — Frontend vs Backend (empezá acá):**

| Video | Nota |
|---|---|
| [¿Qué son Frontend y Backend? En 2 Minutos](https://www.youtube.com/watch?v=hZebFTAuEF4) | ⭐ Dos minutos. Empezá por este. |
| [¿Qué es BACKEND y FRONTEND? — La mejor explicación en español](https://www.youtube.com/watch?v=50RbVujPPGs) | ⭐ El más recomendado del tema. |
| [Frontend vs Backend: ¿Cuál es la diferencia?](https://www.youtube.com/watch?v=NCc9tDzs2FA) | De Código Fácilito, buen canal para seguir. |
| [¿Qué es frontend y backend? Explicación para novatos](https://www.youtube.com/watch?v=mTnSfpckyQ4) | Otra explicación si alguna no te cerró. |

**Paso 2 — Cliente/servidor y HTTP:**

| Video | Nota |
|---|---|
| [¿Qué es HTTP? — Introducción Práctica](https://www.youtube.com/watch?v=WlIIkVOWlT4) | ⭐ Cubre las secciones 4 y 6. |
| [Cómo funciona un servidor web — definición sencilla](https://www.youtube.com/watch?v=vG4LLrLXPU8) | Qué es un servidor, en concreto. |
| [Métodos HTTP explicados: GET, POST, PUT, PATCH y DELETE](https://www.youtube.com/watch?v=gMTlkzccFqs) | ⭐ Exactamente la sección 6. |
| [Cliente-Servidor: Protocolo HTTP](https://www.youtube.com/watch?v=w4cyaV-uA2k) | Refuerzo del modelo cliente-servidor. |

**Paso 3 — APIs (esto conecta con FastAPI):**

| Video | Nota |
|---|---|
| [Qué es una REST API y cómo funciona — para principiantes](https://www.youtube.com/watch?v=LQdJG8Qc5xo) | ⭐ El mejor del tema. |
| [REST y RESTful APIs — Te lo explico en 5 minutos](https://www.youtube.com/watch?v=JD6VNRdGl98) | Cinco minutos, al punto. |
| [¿Qué es API, REST y RESTFul? (explicación simple)](https://www.youtube.com/watch?v=sB6Vc3gze3w) | Aclara la diferencia entre los tres términos. |

> Enlaces buscados el 31/07/2026. No vi los videos; los elegí por título, tema y fecha. Si
> alguno está caído o no te sirve, decime y busco reemplazo.

---

# Glosario de la Guía 00

| Término | Significado |
|---|---|
| **Cliente** | El programa que pide. Normalmente el navegador. |
| **Servidor** | El programa que responde. Corre en otra computadora, siempre encendida. |
| **FE / Frontend** | Lo que el usuario ve. Corre en su navegador. HTML, CSS, JS. |
| **BE / Backend** | Lo que el usuario no ve. Corre en el servidor. Datos y lógica. |
| **Full Stack** | Quien trabaja frontend y backend. |
| **Petición / Request** | El pedido que el cliente le manda al servidor. |
| **Respuesta / Response** | Lo que el servidor devuelve. |
| **HTTP / HTTPS** | El idioma de las peticiones. La S es de cifrado. |
| **Método HTTP** | La intención del pedido: GET, POST, PUT, PATCH, DELETE. |
| **Código de estado** | El número del resultado: 200 bien, 4xx culpa del cliente, 5xx culpa del servidor. |
| **JSON** | El formato de texto en que viajan los datos entre FE y BE. |
| **API** | El conjunto de cosas que un programa permite pedirle, y en qué formato. |
| **Endpoint / Ruta** | Una dirección concreta de la API: `/api/productos/15`. |
| **REST** | La convención más común para organizar una API. |
| **Base de datos** | Donde los datos sobreviven al apagado. Solo el backend le habla. |
| **SQL** | El idioma para consultar bases de datos relacionales. |
| **SPA** | *Single Page Application*: una sola página que se actualiza sin recargar. Lo que hace React. |
| **Sitio estático** | Solo archivos, sin backend. Lo que hacés con Bootstrap. |
| **IP** | La dirección numérica de una computadora en la red. |
| **DNS** | La guía telefónica: traduce `youtube.com` a una IP. |
| **Dominio** | El nombre comprado de un sitio: `mi-app.com`. |
| **Hosting** | El servicio que mantiene tu app encendida en internet. |
| **Deploy** | Subir tu app al hosting y ponerla a funcionar. |
| **localhost** | Tu propia computadora como servidor. Nadie más lo ve. |
| **DevTools** | Las herramientas del navegador que se abren con `F12`. |
| **Framework** | Una estructura de trabajo con reglas y piezas ya armadas. FastAPI, por ejemplo. |
| **Librería** | Código de otra persona que reutilizás. Bootstrap, React. |

---

# Checklist de comprensión

No es "¿lo leí?" — es **"¿puedo explicárselo a alguien sin mirar el papel?"**. Ese es el
estándar. Probá decirlo en voz alta.

## Conceptos base
- [ ] Puedo explicar qué es un cliente y qué es un servidor
- [ ] Sé decir qué es el frontend y dónde corre
- [ ] Sé decir qué es el backend y dónde corre
- [ ] Puedo contar la analogía del restaurante completa, con la base de datos incluida
- [ ] Entiendo por qué **nunca se confía en el frontend**
- [ ] Sé qué es Full Stack

## Comunicación
- [ ] Sé qué es una petición y qué es una respuesta
- [ ] Sé quién habla primero, y por qué
- [ ] Puedo nombrar los métodos HTTP y qué intención tiene cada uno
- [ ] Sé la diferencia entre un error **4xx** y un error **5xx**, y de qué lado buscar el problema
- [ ] Puedo leer un JSON y decir qué es un objeto y qué es una lista
- [ ] Puedo explicar qué es una API con mis propias palabras
- [ ] Sé qué es un endpoint

## El mapa
- [ ] Sé ubicar **Bootstrap** en el dibujo de la sección 10
- [ ] Sé ubicar **React** en el dibujo
- [ ] Sé ubicar **FastAPI** en el dibujo
- [ ] Sé por qué el frontend no habla directo con la base de datos
- [ ] Entiendo qué es una SPA y en qué se diferencia de un sitio estático
- [ ] Sé qué significa hacer *deploy* y en qué se diferencia de `localhost`

## Práctica
- [ ] Abrí las DevTools con `F12`
- [ ] Edité el HTML de una página en vivo, y entendí por qué se deshace al recargar
- [ ] Vi las peticiones en la pestaña **Network**
- [ ] Encontré un JSON real en **Fetch/XHR**
- [ ] Respondí las cuatro preguntas P1–P4

---

## Cuando termines esto

Pasá a **[GUIA-01 — Terminal y Primeros Proyectos](GUIA-01-Terminal-y-Primeros-Proyectos.md)**.

Ahí ya no vas a estar aprendiendo comandos sueltos: vas a saber que `uvicorn main:app` levanta
**un backend**, que `localhost:8000` es **tu servidor**, que `return {"mensaje": "Hola"}` manda
**JSON**, y que `npm run dev` levanta **un frontend**. Todo lo de esta guía, en la práctica.

**Ese es el punto de haber empezado por acá.**
