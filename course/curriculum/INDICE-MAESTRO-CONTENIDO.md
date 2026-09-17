# Índice maestro de contenido — Bootcamp Full Stack + AI

> Documento de trabajo. Creado el 31 de julio de 2026.
>
> Este es el **esqueleto completo del temario**. No hay que escribirlo de golpe: la idea es
> ir rellenando guía a guía, marcando estado en las tablas.
>
> Documentos relacionados:
> - [Propuesta completa](../notes/instructor/business/propuesta-bootcamp-sevilla.md) — negocio, pricing, subvenciones.
> - [Propuesta ejecutiva para el socio](../notes/instructor/business/propuesta-ejecutiva-socio-bootcamp-sevilla.md)
> - [Pipeline de producción con IA](../notes/instructor/production/PIPELINE-PRODUCCION-IA.md) — cómo se fabrica cada pieza.

---

## Índice

- [1. La unidad de trabajo: una guía = una clase](#1-la-unidad-de-trabajo-una-guía--una-clase)
- [2. Anatomía de una guía](#2-anatomía-de-una-guía)
- [3. Estados de producción](#3-estados-de-producción)
- [4. Mapa de bloques](#4-mapa-de-bloques)
- [5. El índice, bloque a bloque](#5-el-índice-bloque-a-bloque)
- [6. Los dos ritmos: 9 meses y 2 años](#6-los-dos-ritmos-9-meses-y-2-años)
- [7. Proyectos troncales](#7-proyectos-troncales)
- [8. Orden de producción recomendado](#8-orden-de-producción-recomendado)
- [9. Decisiones pendientes](#9-decisiones-pendientes)

---

# 1. La unidad de trabajo: una guía = una clase

Ya está validado con un alumno real: [GUIA-00](../guides/GUIA-00-Que-es-una-App-Web-FE-y-BE.md) y
[GUIA-01](../guides/GUIA-01-Terminal-y-Primeros-Proyectos.md) son la primera clase del bootcamp, dada de verdad.

Eso fija la unidad atómica de todo el programa:

**1 guía = 1 clase = 1 documento markdown + sus videos + sus ejercicios.**

Todo lo demás (módulos, bloques, ritmos, precios por módulo) se construye agrupando guías. No hay
que inventar un formato nuevo: hay que replicar el que ya funciona, unas 95 veces.

Ventajas de mantener esta unidad:

- cada guía se produce, se revisa y se vende por separado,
- un bloque de guías = un módulo vendible suelto (ver pricing por módulo en la propuesta),
- si el temario cambia, se toca una guía, no el programa entero,
- el alumno tiene un entregable claro por clase.

---

# 2. Anatomía de una guía

Estructura extraída de las dos guías ya escritas. Es la plantilla:

| Sección | Qué lleva |
|---|---|
| Cabecera | Fecha, a quién va dirigida, qué guía va antes y después, si hay que instalar algo |
| Índice | Enlaces internos a cada sección |
| Contenido | Numerado. Concepto → analogía → ejemplo concreto |
| ⚠️ Avisos | Las trampas donde todo el mundo se cae |
| 🔬 Ejercicio estrella | Uno solo, el que de verdad fija el concepto |
| Ejercicios por módulo | Práctica corta y repetible |
| 🎬 Videos | Tabla de videos con nota de por qué está cada uno |
| Chuleta | Comandos o sintaxis de referencia rápida |
| Errores comunes | El error literal + cómo leerlo |
| Glosario | Tabla término → significado |
| Checklist | Casillas de autoevaluación antes de pasar a la siguiente |

> **Nota sobre los videos.** Ahora mismo las dos guías enlazan a videos de YouTube de terceros,
> con el aviso honesto de que no están vistos. Eso está bien como punto de partida, pero el
> objetivo es sustituirlos por video propio. Ese es todo el contenido de
> [PIPELINE-PRODUCCION-IA.md](../notes/instructor/production/PIPELINE-PRODUCCION-IA.md).

---

# 3. Estados de producción

Cada guía pasa por estos estados. Se marcan en las tablas del punto 5:

| Marca | Estado | Significa |
|---|---|---|
| `—` | Sin empezar | No existe nada |
| `ESQ` | Esquema | Solo el índice de la guía, sin desarrollar |
| `TXT` | Texto | Guía escrita y revisada, con ejercicios |
| `GUI` | Guion | Guion de video escrito a partir del texto |
| `VID` | Video | Video producido y montado |
| `OK` | Cerrada | Texto + video + ejercicios corregidos, dada en clase al menos una vez |

Las columnas de las tablas son: **Txt** (documento), **Gui** (guion), **Vid** (video).

---

# 4. Mapa de bloques

| # | Bloque | Guías | Nº | Vendible suelto |
|---|---|---|---|---|
| 0 | Fundamentos y entorno | 00-02 | 3 | Sí — curso de entrada gratuito o de captación |
| 1 | HTML, CSS y Bootstrap | 03-08 | 6 | Sí |
| 2 | JavaScript | 09-16 | 8 | Sí |
| 3 | Git y GitHub | 17-20 | 4 | Sí — el corto que mejor vende a empresas |
| 4 | React | 21-30 | 10 | Sí — el buque insignia de los cortos |
| 5 | TypeScript | 31-34 | 4 | Sí |
| 6 | Python | 35-40 | 6 | Sí |
| 7 | FastAPI y APIs | 41-48 | 8 | Sí |
| 8 | PostgreSQL y datos | 49-54 | 6 | Sí |
| 9 | Testing | 55-60 | 6 | Sí |
| 10 | Docker, cloud y despliegue | 61-68 | 8 | Sí |
| 11 | Expo y mobile | 69-74 | 6 | Sí |
| 12 | IA aplicada al desarrollo | 75-82 | 8 | Sí — el que más demanda tiene ahora |
| 13 | Empleabilidad y entrevistas | 83-90 | 8 | Sí — diferencial fuerte, casi nadie lo hace bien |
| 14 | Proyecto final | 91-95 | 5 | No — cierre del programa |
| | **Total** | | **95** | |

95 guías. A 2 clases por semana son unas 48 semanas, que encaja con el recorrido part-time de
casi un año; a ritmo intensivo comprimido, con los 9 meses mínimo. Ver punto 6.

---

# 5. El índice, bloque a bloque

## Bloque 0 — Fundamentos y entorno

| # | Guía | Txt | Gui | Vid |
|---|---|---|---|---|
| 00 | [¿Qué es una app web? Frontend y Backend](../guides/GUIA-00-Que-es-una-App-Web-FE-y-BE.md) | TXT | — | — |
| 01 | [La terminal y tus primeros proyectos](../guides/GUIA-01-Terminal-y-Primeros-Proyectos.md) | TXT | — | — |
| 02 | El editor: VS Code, extensiones y atajos que sí importan | — | — | — |

> **[TAREA-01 — La Cesta](../projects/TAREA-01-La-Cesta-FE-BE-y-GitHub.md)** va después de la guía 01. Es la
> primera app completa del alumno: React + FastAPI + PostgreSQL en Docker, sin auth, entregada por
> GitHub. Adelanta a propósito parte del bloque 3 (Git), del 8 (base de datos) y del 10 (Docker),
> porque el alumno necesita entregar trabajo desde el primer mes.

## Bloque 1 — HTML, CSS y Bootstrap

| # | Guía | Txt | Gui | Vid |
|---|---|---|---|---|
| 03 | HTML: la estructura. Etiquetas, semántica y formularios | — | — | — |
| 04 | CSS: selectores, caja, colores y tipografía | — | — | — |
| 05 | CSS layout: Flexbox | — | — | — |
| 06 | CSS layout: Grid y responsive | — | — | — |
| 07 | Bootstrap a fondo: grid, componentes y utilidades | — | — | — |
| 08 | Tailwind CSS: el enfoque de utilidades | — | — | — |

## Bloque 2 — JavaScript

| # | Guía | Txt | Gui | Vid |
|---|---|---|---|---|
| 09 | Variables, tipos y operadores | — | — | — |
| 10 | Condicionales, bucles y funciones | — | — | — |
| 11 | Arrays y objetos | — | — | — |
| 12 | Métodos de array: map, filter, reduce | — | — | — |
| 13 | El DOM: leer y modificar la página | — | — | — |
| 14 | Eventos y formularios | — | — | — |
| 15 | Asincronía: callbacks, promesas y async/await | — | — | — |
| 16 | Fetch: hablar con una API de verdad | — | — | — |

## Bloque 3 — Git y GitHub

| # | Guía | Txt | Gui | Vid |
|---|---|---|---|---|
| 17 | Git: por qué existe, commits y el flujo básico | — | — | — |
| 18 | Ramas, merge y resolución de conflictos | — | — | — |
| 19 | GitHub: remotos, pull requests y revisión de código | — | — | — |
| 20 | Trabajo en equipo: GitFlow, issues y tableros | — | — | — |

## Bloque 4 — React

| # | Guía | Txt | Gui | Vid |
|---|---|---|---|---|
| 21 | Qué problema resuelve React. JSX y el primer componente | — | — | — |
| 22 | Props y composición de componentes | — | — | — |
| 23 | Estado: useState | — | — | — |
| 24 | Listas, claves y renderizado condicional | — | — | — |
| 25 | Formularios controlados | — | — | — |
| 26 | Efectos: useEffect y el ciclo de vida | — | — | — |
| 27 | Consumir una API desde React | — | — | — |
| 28 | Rutas: React Router | — | — | — |
| 29 | Estado global: context y cuándo NO usarlo | — | — | — |
| 30 | Hooks propios y organización de un proyecto React | — | — | — |

## Bloque 5 — TypeScript

| # | Guía | Txt | Gui | Vid |
|---|---|---|---|---|
| 31 | Por qué TypeScript. Tipos básicos e inferencia | — | — | — |
| 32 | Interfaces, tipos y genéricos | — | — | — |
| 33 | TypeScript en React: props, estado y eventos tipados | — | — | — |
| 34 | Configuración, errores típicos y migración de JS a TS | — | — | — |

## Bloque 6 — Python

| # | Guía | Txt | Gui | Vid |
|---|---|---|---|---|
| 35 | Python: sintaxis, tipos y control de flujo | — | — | — |
| 36 | Estructuras de datos: listas, diccionarios, sets y tuplas | — | — | — |
| 37 | Funciones, módulos y paquetes | — | — | — |
| 38 | Clases y objetos, lo justo y necesario | — | — | — |
| 39 | Entornos virtuales, pip y gestión de dependencias | — | — | — |
| 40 | Ficheros, errores y logging | — | — | — |

## Bloque 7 — FastAPI y APIs

| # | Guía | Txt | Gui | Vid |
|---|---|---|---|---|
| 41 | FastAPI: primer endpoint y documentación automática | — | — | — |
| 42 | Rutas, parámetros y validación con Pydantic | — | — | — |
| 43 | Diseño de una API REST: recursos, verbos y códigos | — | — | — |
| 44 | Autenticación: JWT, login y protección de rutas | — | — | — |
| 45 | Estructura de un proyecto backend serio | — | — | — |
| 46 | Async en Python y cuándo sirve de verdad | — | — | — |
| 47 | Conectar el frontend React con tu API | — | — | — |
| 48 | Errores, middlewares y observabilidad básica | — | — | — |

## Bloque 8 — PostgreSQL y datos

| # | Guía | Txt | Gui | Vid |
|---|---|---|---|---|
| 49 | Bases de datos relacionales: por qué tablas y no ficheros | — | — | — |
| 50 | SQL: SELECT, WHERE, JOIN y agregaciones | — | — | — |
| 51 | Modelado de datos: claves, relaciones y normalización útil | — | — | — |
| 52 | SQLAlchemy: el ORM y cómo no pelearse con él | — | — | — |
| 53 | Migraciones con Alembic sin romper producción | — | — | — |
| 54 | Índices, rendimiento y consultas que van lentas | — | — | — |

## Bloque 9 — Testing

| # | Guía | Txt | Gui | Vid |
|---|---|---|---|---|
| 55 | Por qué se testea. Tipos de test y la pirámide | — | — | — |
| 56 | Pytest: primeros tests, fixtures y parametrización | — | — | — |
| 57 | Testear una API: base de datos de test y mocks | — | — | — |
| 58 | Vitest y React Testing Library | — | — | — |
| 59 | End-to-end con Playwright | — | — | — |
| 60 | TDD en la práctica: una kata de principio a fin | — | — | — |

## Bloque 10 — Docker, cloud y despliegue

| # | Guía | Txt | Gui | Vid |
|---|---|---|---|---|
| 61 | Docker: imágenes, contenedores y por qué "en mi máquina funciona" | — | — | — |
| 62 | Docker Compose: levantar app + base de datos | — | — | — |
| 63 | CI/CD con GitHub Actions | — | — | — |
| 64 | Desplegar de verdad: primer deploy con Dokploy | — | — | — |
| 65 | AWS: los servicios que se usan y para qué | — | — | — |
| 66 | Terraform: infraestructura como código | — | — | — |
| 67 | Dominios, HTTPS, Nginx y variables de entorno | — | — | — |
| 68 | Secretos, seguridad básica y qué NO subir nunca a un repo | — | — | — |

## Bloque 11 — Expo y mobile

| # | Guía | Txt | Gui | Vid |
|---|---|---|---|---|
| 69 | React Native y Expo: qué cambia respecto a React web | — | — | — |
| 70 | Componentes, estilos y navegación en mobile | — | — | — |
| 71 | Consumir tu API desde la app | — | — | — |
| 72 | Cámara, almacenamiento y permisos del dispositivo | — | — | — |
| 73 | Notificaciones push | — | — | — |
| 74 | Build y publicación en las tiendas | — | — | — |

## Bloque 12 — IA aplicada al desarrollo

| # | Guía | Txt | Gui | Vid |
|---|---|---|---|---|
| 75 | Qué es un LLM y qué no. Tokens, contexto y límites | — | — | — |
| 76 | Llamar a un modelo desde tu código | — | — | — |
| 77 | Prompt engineering con criterio de ingeniero | — | — | — |
| 78 | RAG: embeddings, búsqueda vectorial y por qué se usa | — | — | — |
| 79 | LangChain y LangGraph: agentes y el patrón ReAct | — | — | — |
| 80 | Tool calling: dar acceso seguro a datos reales | — | — | — |
| 81 | Evaluación de salidas y control de coste | — | — | — |
| 82 | Agentes de código (Cursor, Claude Code, Codex) en flujo real | — | — | — |

## Bloque 13 — Empleabilidad y entrevistas

| # | Guía | Txt | Gui | Vid |
|---|---|---|---|---|
| 83 | Big O y complejidad, explicado sin matemáticas | — | — | — |
| 84 | Estructuras de datos para entrevistas | — | — | — |
| 85 | Patrones de problemas: dos punteros, ventana, hash, recursión | — | — | — |
| 86 | Cómo atacar un problema de LeetCode en voz alta | — | — | — |
| 87 | Live coding: qué evalúan de verdad | — | — | — |
| 88 | System design nivel junior/junior+ | — | — | — |
| 89 | CV, LinkedIn, GitHub y portfolio que se leen en 20 segundos | — | — | — |
| 90 | Entrevistas simuladas y defensa técnica del proyecto | — | — | — |

## Bloque 14 — Proyecto final

| # | Guía | Txt | Gui | Vid |
|---|---|---|---|---|
| 91 | Elegir proyecto y escribir el alcance | — | — | — |
| 92 | Del alcance a los tickets: planificar como en una empresa | — | — | — |
| 93 | Semanas de construcción con revisión de código | — | — | — |
| 94 | Despliegue, dominio y puesta en producción | — | — | — |
| 95 | Demo day: presentar y defender lo construido | — | — | — |

---

# 6. Los dos ritmos: 9 meses y 2 años

Mismo contenido, distinta intensidad. Es lo que se acordó en la propuesta.

| | Comprimido | Extendido |
|---|---|---|
| Duración | 9-10 meses | 18-24 meses |
| Clases por semana | 3 | 1 |
| Horas semanales estimadas | 12-15 | 4-6 |
| Perfil | Reskilling a tiempo completo, desempleado, dedicación total | Compatible con trabajo o estudios |
| Riesgo principal | Saturación y abandono por ritmo | Abandono por pérdida de impulso |

El bloque 13 (empleabilidad) no va al final en ninguno de los dos: conviene arrancarlo en paralelo
hacia la mitad del programa, porque preparar entrevistas es una habilidad que necesita meses de
repetición, no un módulo de tres semanas.

---

# 7. Proyectos troncales

Las guías enseñan piezas. Los proyectos son lo que el alumno enseña en una entrevista. Propuesta
de tres, encadenados:

| Proyecto | Después del bloque | Qué demuestra |
|---|---|---|
| **P1 — Página personal desplegada** | 1 | HTML, CSS, responsive, un dominio real funcionando |
| **P2 — App con API propia** | 8 | React + FastAPI + PostgreSQL hablando entre sí, con auth |
| **P3 — Producto con IA desplegado** | 12 | El anterior + agente, RAG, Docker y despliegue en cloud |
| **P4 — Proyecto final libre** | 14 | Todo, más autonomía y defensa técnica |

La ventaja competitiva declarada en la propuesta —que detrás hay una empresa que ya desarrolla
software— se materializa aquí: los proyectos deberían apoyarse en dinámicas reales de los
productos de Alameda (leer código ajeno, coger un ticket, abrir una PR, desplegar).

---

# 8. Orden de producción recomendado

No producir en orden 00 → 95. El orden que conviene es el que antes genera ingresos:

1. **Bloques 0 y 3** (fundamentos + Git). Baratos de producir, sirven de curso gratuito de captación
   y de corto vendible a empresas. Además ya tienes 2 de las 3 guías del bloque 0 escritas.
2. **Bloque 4 (React)** y **bloque 12 (IA)**. Son los dos cortos con más demanda y los que mejor
   posicionan la marca. Vendibles sueltos a `300-900€` según la propuesta.
3. **Bloques 1, 2, 6, 7** — el troncal que sostiene el programa largo.
4. **Bloques 8, 9, 10** — profundidad.
5. **Bloques 5, 11, 13, 14** — cierre.

Regla práctica: **una guía no se produce en video hasta que se ha dado en clase al menos una vez.**
La clase real es la que revela dónde el alumno se atasca, y eso cambia el guion. Grabar antes de
dar la clase es la forma más rápida de tener 95 videos que hay que rehacer.

---

# 9. Decisiones pendientes

Cosas que hay que cerrar y que afectan al contenido:

- **Nivel de entrada.** Las guías 00 y 01 asumen cero conocimiento. ¿Se mantiene eso para todo el
  bootcamp o habrá una prueba de acceso?
- **Windows, Mac o los dos.** La GUIA-01 usa `winget`, que es Windows. Si hay alumnos en Mac hace
  falta la rama paralela de cada guía de entorno, o decidir que se trabaja sobre una única
  plataforma.
- **Español neutro o rioplatense.** Las guías actuales usan voseo ("mirá", "terminás"), que encaja
  con el alumno actual pero no con un aula en Sevilla. Hay que fijar la variante antes de grabar
  voz, porque rehacer audio es caro.
- **Idioma del bootcamp.** Si se produce también en inglés, hay que decidirlo antes de grabar
  (ver la sección de doblaje en el pipeline).
- **Qué parte de los repos reales de Alameda se abre a los alumnos** y bajo qué acuerdo.
