# Pipeline de producción de contenido con IA

> Documento de trabajo. Creado el 31 de julio de 2026.
>
> Cómo fabricar las ~95 guías del [índice maestro](../curriculum/INDICE-MAESTRO-CONTENIDO.md) —texto, guion,
> voz, video e imágenes— sin que se coma dos años de trabajo manual.
>
> Premisa fija: **el profesor eres tú.** No es un avatar genérico de stock leyendo un temario.

---

## Índice

- [1. El principio: el markdown es la fuente de la verdad](#1-el-principio-el-markdown-es-la-fuente-de-la-verdad)
- [2. Las siete capas del pipeline](#2-las-siete-capas-del-pipeline)
- [3. Qué video hace falta de verdad en un curso de código](#3-qué-video-hace-falta-de-verdad-en-un-curso-de-código)
- [4. Capa por capa: herramientas y decisiones](#4-capa-por-capa-herramientas-y-decisiones)
- [5. El problema difícil: consistencia](#5-el-problema-difícil-consistencia)
- [6. Mighty y SecretSauce: qué te enseña esa oferta](#6-mighty-y-secretsauce-qué-te-enseña-esa-oferta)
- [7. La herramienta como producto](#7-la-herramienta-como-producto)
- [8. Coste y esfuerzo realista](#8-coste-y-esfuerzo-realista)
- [9. Límites honestos y riesgos](#9-límites-honestos-y-riesgos)
- [10. Primer paso concreto](#10-primer-paso-concreto)

---

# 1. El principio: el markdown es la fuente de la verdad

La tentación es abrir una herramienta de video y empezar a grabar. Eso genera 95 videos que no se
pueden mantener: cambia una versión de React y hay que regrabar, y como regrabar duele, el curso
envejece.

El planteamiento correcto es tratar el curso como **código**:

```
GUIA-04-CSS.md   ← lo único que se edita a mano
      │
      ├─→ guion.md          (generado)
      ├─→ voz.mp3           (generado)
      ├─→ diagramas.svg     (generados)
      ├─→ terminal.mp4      (generado)
      ├─→ video-final.mp4   (ensamblado)
      ├─→ subtitulos.srt    (generados)
      └─→ quiz.json         (generado)
```

Todo lo que está debajo de la guía es **artefacto derivado y regenerable**. Se borra y se vuelve a
construir con un comando. Si cambias un párrafo de la guía, se regenera solo lo afectado.

Las tres consecuencias que importan:

- **Mantener el curso deja de ser un proyecto** y pasa a ser un `rebuild`.
- **Traducir al inglés es otro build**, no rehacer el curso.
- **El contenido vive en Git**, con historial, ramas y revisión — que además es exactamente lo que
  enseñas en el bloque 3.

---

# 2. Las siete capas del pipeline

| # | Capa | Entrada | Salida | ¿Se automatiza? |
|---|---|---|---|---|
| 1 | Guion | Guía en markdown | Guion con tiempos y notas de pantalla | Sí, con LLM |
| 2 | Voz | Guion | Audio con tu voz | Sí, con clonado de voz |
| 3 | Cara | Guion + audio | Video de ti hablando | Sí, con avatar propio |
| 4 | Pantalla | Guía (comandos y código) | Screencast y demos de terminal | Sí, en parte |
| 5 | Gráficos | Conceptos de la guía | Diagramas e ilustraciones | Sí |
| 6 | Montaje | Todo lo anterior | Video final | Parcial |
| 7 | Distribución | Video final | Subtítulos, traducción, publicación | Sí |

---

# 3. Qué video hace falta de verdad en un curso de código

Esta es la decisión que más dinero y tiempo ahorra, así que va antes que las herramientas.

En un curso de programación, **el video de la cara del profesor es la parte menos valiosa**. Lo que
el alumno necesita ver es la pantalla: el comando, el error, el fichero, el navegador. La cara
sirve para tres cosas concretas —presentar, dar confianza y marcar transiciones— y para poco más.

Reparto sensato por guía (unos 20-30 minutos de video):

| Tipo de plano | % del tiempo | Cómo se produce |
|---|---|---|
| Screencast (código, terminal, navegador) | 70-80% | Grabación de pantalla real + tu voz |
| Diagramas y conceptos en pantalla | 10-15% | Diagramas generados + tu voz |
| Tú a cámara | 10-15% | Avatar o grabación real, solo intro/cierre/avisos |

**Por qué importa:** la parte cara del pipeline (avatar, sincronía labial, resolución alta) solo se
aplica al 10-15% del metraje. El 85% restante es pantalla y voz, que es mucho más barato, más
rápido de regenerar y —esto es lo importante— **más útil para el alumno**.

Los cursos que fallan con IA son los que ponen un avatar hablando 25 minutos seguidos sobre un
fondo con slides. Eso se nota y se abandona.

---

# 4. Capa por capa: herramientas y decisiones

> Aviso: el mercado de herramientas de IA generativa cambia cada pocos meses. Los nombres de abajo
> son los de referencia a día de hoy, pero **hay que verificar precios y capacidades antes de
> comprometerse** con ninguna, sobre todo las de video.

## 4.1 Guion

La guía ya tiene la estructura pedagógica. El guion es una transformación de formato, no creación
nueva: es el trabajo perfecto para un LLM con un prompt fijo.

- **Herramienta:** Claude / API, con una plantilla de prompt versionada en el repo.
- **Entrada:** la guía completa.
- **Salida:** guion segmentado en escenas, cada una con: texto a locutar, qué se ve en pantalla,
  duración estimada.
- **Clave:** el prompt debe llevar tus reglas de estilo (analogías antes que definiciones, avisar
  de la trampa antes de que el alumno caiga, nada de "en este video vamos a ver..."). Ese prompt es
  tu voz docente destilada y es un activo en sí mismo.

Revisión humana obligatoria en esta capa. Es la más barata de corregir y la que más contamina si
sale mal.

## 4.2 Voz

Como el profesor eres tú, aquí se clona **tu** voz, no se elige una de catálogo.

- **Herramienta de referencia:** ElevenLabs (clonado de voz y doblaje). Alternativas del mismo tipo
  existen y conviene comparar.
- **Cómo funciona:** grabas una muestra de tu voz (los clones buenos piden entre varios minutos y
  media hora de audio limpio) y a partir de ahí generas locución de cualquier texto.
- **Por qué es la capa más rentable:** una vez clonada, corregir un error en el minuto 14 de una
  guía es cambiar una frase del guion y regenerar ese fragmento. Sin clonado, es volver a montar el
  micro y encontrar el mismo tono de voz que tenías hace tres meses.
- **Bonus:** habilita el doblaje al inglés manteniendo tu voz, que abre el mercado de UK sin volver
  a grabar. Con tus 25 años allí, eso no es una hipótesis lejana.

## 4.3 Cara / avatar

Solo para ese 10-15% de metraje.

- **Herramientas de referencia:** HeyGen y Synthesia permiten crear un avatar a partir de vídeo
  tuyo, no solo usar actores de stock. D-ID es la opción ligera.
- **Decisión:** avatar propio entrenado con tu cara y tu voz. Un avatar de stock rompe la promesa de
  "el profesor es un ingeniero con 25 años en UK y FAANG" — que es justo lo que se vende.
- **Alternativa a considerar:** grabar tú mismo las intros con una cámara decente. Son 95 clips de
  1-2 minutos. Es asumible, sale mejor, y el avatar queda como recurso para correcciones y para la
  versión en inglés.

## 4.4 Pantalla — la capa donde está el truco

Aquí hay una optimización que casi nadie aplica y que encaja perfectamente con un curso de código:
**las demos de terminal se pueden generar desde un script, no grabarse a mano.**

- **VHS** (de Charm) genera un vídeo de terminal a partir de un fichero `.tape` que describe las
  teclas y los tiempos. **asciinema** graba sesiones de terminal como texto reproducible.
- Consecuencia: la demo de terminal de una guía es *código*. Si cambia un comando, se edita el
  `.tape` y se regenera el clip. Nunca hay un desajuste entre lo que dice la guía y lo que se ve
  en el video, porque salen del mismo sitio.
- El LLM puede escribir el `.tape` directamente desde la sección de comandos de la guía.

Para lo que no es terminal (navegador, VS Code, Figma):

- **Screen Studio** (Mac) da acabado profesional con zooms automáticos; **OBS** es la opción libre.
- Se graba a mano, pero se graba **en silencio**: la voz se pone después desde la capa 4.2. Grabar
  pantalla y voz a la vez es lo que obliga a repetir la toma entera cuando te trabas.

## 4.5 Gráficos y diagramas

Para contenido técnico, **diagramas como código** gana a imágenes generadas:

- **Mermaid** para arquitecturas, flujos y secuencias; se escribe en texto, se versiona y se
  regenera. Un diagrama cliente-servidor de la GUIA-00 son seis líneas.
- **Excalidraw** para lo que necesita aspecto dibujado a mano.
- **Generación de imágenes** solo para portadas, miniaturas y material de marketing — no para
  explicar conceptos técnicos, donde la IA todavía comete errores de detalle que confunden al
  alumno (etiquetas mal escritas, flechas que no corresponden).

## 4.6 Montaje

- **Descript** monta el vídeo editando la transcripción: borras una frase del texto y desaparece del
  vídeo. Para este pipeline encaja muy bien porque el guion ya es texto.
- **Remotion** genera vídeo desde código React. Es la opción más alineada con este planteamiento:
  intros, títulos, transiciones y tarjetas de código como componentes reutilizables, con un
  `render` que reconstruye todo. Además lo puedes enseñar en el bloque 4 como proyecto real.
- **CapCut / DaVinci** si en algún momento hace falta montaje manual clásico.

## 4.7 Distribución

- **Whisper** para transcribir y generar subtítulos.
- Doblaje ES↔EN con la voz clonada.
- Plataforma: decisión pendiente (ver punto 9). Para el piloto presencial en Sevilla, el vídeo es
  material de apoyo y no hace falta LMS todavía.

---

# 5. El problema difícil: consistencia

Generar un video con IA es fácil. Generar **noventa y cinco** que parezcan el mismo curso es el
problema de verdad.

Sin un sistema, la deriva es inevitable: la guía 04 usa un azul, la 37 otro; en unas dices "vamos a
ver" y en otras "mirá"; los diagramas de un bloque tienen un estilo y los del siguiente otro; el
ritmo de locución cambia según el día. El alumno no sabe decir qué falla, pero percibe amateurismo.

La solución es un **kit de marca del curso** versionado en el repo, que alimenta todas las capas:

| Elemento | Qué fija |
|---|---|
| Paleta y tipografía | Colores de diagramas, títulos, resaltados de código |
| Tema de código | El mismo esquema de colores en todos los screencasts |
| Reglas de voz | Variante de español, tratamiento, ritmo, muletillas prohibidas |
| Plantillas de escena | Intro, concepto, demo, aviso, cierre |
| Prompt de guion | Las reglas pedagógicas, idénticas para las 95 guías |
| Plantilla de diagrama | Estilo Mermaid común |

Esto no es decoración: es la diferencia entre un curso y una colección de videos.

---

# 6. Mighty y SecretSauce: qué te enseña esa oferta

[Mighty](https://www.wearemighty.ai/) es un estudio de producto de IA en Singapur. Su producto,
**SecretSauce**, aprende la identidad de una marca —desde su web, sus guidelines o un moodboard— y
genera activos on-brand a partir de un brief: contenido para redes, product shots, material visual.
Publicación multicanal la anuncian como "coming soon".

Lo relevante para ti: **el problema que resuelve SecretSauce es exactamente el del punto 5**, solo
que aplicado a marcas de consumo en vez de a cursos. Aprender una identidad y mantenerla constante
a escala. Ellos mencionan haber trabajado a escala de 25 millones de modelos 3D; tu escala son 95
guías. Mismo problema, tres órdenes de magnitud menos.

Eso significa dos cosas:

1. **Si aceptas ese trabajo, te pagan por aprender la infraestructura que necesitas para el
   bootcamp.** No es una distracción del proyecto de Sevilla, es I+D subvencionada por un tercero.
2. **La arquitectura de SecretSauce es la referencia a copiar** para tu pipeline: capa de identidad
   → brief → generación multiformato → activos consistentes.

Ojo con lo obvio: si acabas construyendo y vendiendo una herramienta parecida mientras trabajas
para ellos, hay un problema de conflicto de intereses y probablemente de contrato. Conviene mirar
las cláusulas de IP y de no competencia **antes** de firmar, no después. Tu vertical (educación
técnica) no es la suya (marketing de marca), pero eso hay que dejarlo claro por escrito.

---

# 7. La herramienta como producto

La idea de "de camino vendemos la herramienta" es sólida, con una condición: **que salga de
construir el bootcamp de verdad, no en lugar de construirlo.** Un pipeline diseñado en abstracto no
vale nada; uno que ha producido 95 guías es un producto con caso de uso demostrado.

## Qué sería exactamente

Un sistema de **producción de cursos como código**: repositorio de markdown → build → curso
completo en video, con kit de marca, voz clonada del instructor y regeneración incremental.

## Quién lo compraría

| Segmento | Dolor que le resuelve |
|---|---|
| Academias y bootcamps | Producen video a mano y no pueden actualizarlo; su catálogo envejece |
| Formadores individuales | No tienen equipo de producción y graban todo ellos |
| Departamentos de formación interna | Onboarding y compliance que cambia cada trimestre |
| Empresas de software | Documentación y formación de producto que se desactualiza en cada release |

El último segmento es el más interesante: es B2B, tiene presupuesto, y el dolor —"nuestros vídeos
de producto están obsoletos desde la v3"— es agudo y recurrente.

## Por qué tú puedes construirlo

Mirando tu CV, el stack del producto es literalmente lo que llevas años haciendo: FastAPI,
PostgreSQL, React, LangChain/LangGraph, tool calling, evaluación de salidas, Docker, Terraform,
AWS, Stripe con facturación idempotente. No hay que aprender nada nuevo para el backend; lo nuevo
son las integraciones con las APIs de voz y video.

## Orden correcto

1. Construir el pipeline para tus propias guías. Hoy es un conjunto de scripts, no un producto.
2. Producir con él los bloques 0, 3, 4 y 12 (los de la fase 1 del índice).
3. Solo si el pipeline sobrevive a 20-30 guías reales, plantearse envolverlo como producto.
4. Primer cliente natural: la academia del socio de Sevilla. Segundo: otras academias.

Lo que **no** conviene hacer es lanzar la herramienta antes que el bootcamp. El bootcamp es el
negocio con demanda validada y con vía de subvención; la herramienta es un subproducto con un
mercado mucho más competido, donde compites con empresas financiadas —Mighty entre ellas.

---

# 8. Coste y esfuerzo realista

No tengo precios actuales fiables de las herramientas de video, así que doy estructura de coste, no
cifras.

| Concepto | Naturaleza | Comentario |
|---|---|---|
| Clonado de voz | Suscripción mensual + consumo por caracteres | El más barato de las tres capas de IA |
| Avatar de video | Suscripción mensual, con minutos incluidos | La capa más cara; por eso solo el 10-15% del metraje |
| LLM para guiones | Consumo por tokens | Marginal frente a lo anterior |
| Montaje | Suscripción o gratuito | Remotion es libre; Descript de pago |
| Grabación de pantalla | Compra única o gratuito | OBS gratis |

Dónde está el trabajo humano que no se automatiza:

- escribir la guía (lo más lento, y no es automatizable si quieres calidad),
- revisar el guion generado,
- grabar los screencasts de navegador y editor,
- corregir ejercicios y dar la clase.

Estimación por guía una vez el pipeline funciona: **la guía escrita es el 70% del esfuerzo, la
producción de video el 30%.** Antes del pipeline, esa proporción se invierte. Ese es todo el
argumento.

---

# 9. Límites honestos y riesgos

- **El pipeline es un proyecto de software.** Montarlo son semanas de trabajo tuyo que no estás
  dedicando a escribir guías ni a captar alumnos. Merece la pena a partir de ~20 guías; por debajo
  de eso, grabar a mano sale más a cuenta.
- **La calidad del avatar sigue notándose.** Aceptable en intros cortas; en explicaciones largas,
  no. La regla del punto 3 no es solo pedagógica, también es una restricción técnica.
- **Riesgo reputacional.** Un bootcamp que se vende por la experiencia real del profesor no puede
  parecer generado por IA. Hay que decidir si se declara abiertamente el uso de IA en producción
  —recomendable, y además es coherente con el bloque 12 del temario— o no se usa.
- **Dependencia de proveedores.** Si el proveedor de avatar sube precios o cierra, se queda ese
  material congelado. Se mitiga guardando siempre los originales: guion, audio y screencasts. Con
  eso se puede reconstruir en otra herramienta.
- **Nada de esto sustituye dar clase.** El vídeo es material de apoyo y activo de escalado a la
  fase online. El piloto de Sevilla es presencial y su valor está en el aula.

---

# 10. Primer paso concreto

No montar el pipeline entero. Hacer **una guía completa de punta a punta** y medir cuánto cuesta.

Candidata: la [GUIA-00](../guides/GUIA-00-Que-es-una-App-Web-FE-y-BE.md), porque ya está escrita, es
conceptual (mucho diagrama, poca terminal) y sus videos actuales son enlaces a terceros que
conviene sustituir cuanto antes.

Secuencia:

1. Clonar tu voz con una muestra de audio limpio.
2. Generar el guion de la GUIA-00 con un prompt escrito por ti, y corregirlo a mano anotando qué ha
   fallado — esas correcciones son las que mejoran el prompt para las otras 94.
3. Hacer los diagramas de las secciones 1, 5 y 10 en Mermaid.
4. Locutar el guion con tu voz clonada.
5. Grabar el ejercicio estrella (abrir las DevTools) como screencast mudo.
6. Montar un video de 10-15 minutos.
7. **Enseñárselo a Enmanuel** y ver si le sirve más o menos que los enlaces de YouTube actuales.

Ese último punto es el que decide si todo esto tiene sentido. Todo lo demás son suposiciones hasta
que un alumno real lo mira.
