# Índice maestro de contenido — Bootcamp Full Stack + IA

> Documento de producción alineado con el [curriculum maestro](CURRICULUM-Full-Stack-AI-Bootcamp.md).

## Modelo del programa

- **58 guías = 58 días de curso**, numerados de 00 a 57.
- **Una guía = un día = un tema principal + un resultado práctico.**
- Orden: configuración/Claude → conceptos web → primer proyecto guiado → Python → FastAPI → PostgreSQL → TypeScript → React → testing → despliegue → IA aplicada → mobile → empleabilidad → proyecto final.
- Python es el primer lenguaje y el lenguaje principal de backend e IA.
- TypeScript es el segundo lenguaje y se introduce cuando llega el momento de construir el frontend.
- No existe un bloque independiente de JavaScript. Solo se explica el contexto mínimo necesario dentro de TypeScript, navegador y React.
- Frontend se enseña de forma práctica y condensada; no se busca especialización profunda en HTML o CSS.
- Terminal, instalaciones, comandos exactos, scaffolding y configuración repetitiva se realizan con ayuda de Claude. El alumno debe entender el propósito, el riesgo y el resultado, pero no memorizar sintaxis de bajo valor.
- Git y GitHub aparecen dentro del trabajo real desde el primer proyecto, no como una larga fase aislada.

## Estados de producción

| Marca | Estado | Significado |
|---|---|---|
| `—` | Sin empezar | No existe contenido desarrollado |
| `ESQ` | Esquema | Estructura definida |
| `TXT` | Texto | Guía escrita y revisada |
| `GUI` | Guion | Guion de vídeo preparado |
| `VID` | Vídeo | Vídeo producido |
| `OK` | Cerrada | Texto, práctica y vídeo validados con alumnos |

---

## Mapa de fases

| Fase | Guías | Días | Resultado |
|---|---:|---:|---|
| 0. Configuración, Claude y primer proyecto | 00–03 | 4 | Entorno listo y primer sistema web comprendido |
| 1. Fundamentos de Python | 04–08 | 5 | Programas pequeños escritos y razonados |
| 2. FastAPI e ingeniería backend | 09–14 | 6 | API REST estructurada y validada |
| 3. PostgreSQL y persistencia | 15–19 | 5 | Datos relacionales modelados, consultados y migrados |
| 4. TypeScript como segundo lenguaje | 20–24 | 5 | Código tipado para navegador y frontend |
| 5. React con TypeScript | 25–30 | 6 | Frontend usable conectado a la API |
| 6. Testing y calidad | 31–34 | 4 | Backend, frontend y flujos completos validados |
| 7. Docker y despliegue | 35–39 | 5 | Sistema empaquetado, automatizado y desplegado |
| 8. Ingeniería de IA aplicada | 40–45 | 6 | Funciones de IA seguras, evaluadas y conectadas a datos |
| 9. Mobile con Expo | 46–49 | 4 | Cliente móvil conectado al backend |
| 10. Empleabilidad | 50–52 | 3 | Perfil profesional y defensa técnica preparados |
| 11. Proyecto final | 53–57 | 5 | Producto definido, construido, desplegado y presentado |
| | **Total** | **58** | |

---

## Índice de producción, guía a guía

### Fase 0 — Configuración, Claude y primer proyecto

| # | Guía | Estado | Resultado práctico |
|---:|---|---|---|
| 00 | [VS Code, Claude, GitHub y aprendizaje seguro con un agente](../00-onboarding/CLASS-00-First-Contact-VS-Code-Claude-and-Starter-Prompt.md) | TXT | Repositorio descargado y agente de aprendizaje configurado |
| 01 | [Qué es un sistema web: frontend, backend, HTTP, JSON y APIs](../guides/GUIA-00-Que-es-una-App-Web-FE-y-BE.md) | TXT | Trazar una petición y una respuesta completas |
| 02 | [Flujo local con terminal y Git asistidos por Claude](../guides/GUIA-01-Terminal-y-Primeros-Proyectos.md) | TXT | Abrir, ejecutar, inspeccionar, detener y guardar un proyecto |
| 03 | [Primer proyecto guiado: arquitectura antes que sintaxis](../guides/GUIA-03-Conceptos-Para-Tu-Primer-Proyecto.md) | TXT | Construir y explicar una pequeña funcionalidad de extremo a extremo |

> La [TAREA-01 — La Cesta](../projects/TAREA-01-La-Cesta-FE-BE-y-GitHub.md) y el [PROYECTO-01 — App de Salud](../projects/PROYECTO-01-App-de-Salud-Paso-a-Paso.md) son material práctico existente. Deben revisarse para encajar como proyectos progresivos del nuevo recorrido y no como prerequisitos desalineados.

### Fase 1 — Fundamentos de Python

| # | Tema principal | Estado | Resultado práctico |
|---:|---|---|---|
| 04 | Valores, variables, tipos y expresiones | — | Transformar datos de entrada |
| 05 | Decisiones, bucles y flujo del programa | — | Implementar reglas de negocio pequeñas |
| 06 | Listas, diccionarios, sets y tuplas | — | Procesar una colección de registros |
| 07 | Funciones, módulos y estructura legible | — | Separar un programa en unidades comprensibles |
| 08 | Errores, archivos, entornos, dependencias y logging | — | Ejecutar y diagnosticar una aplicación resistente |

### Fase 2 — FastAPI e ingeniería backend

| # | Tema principal | Estado | Resultado práctico |
|---:|---|---|---|
| 09 | Aplicación FastAPI y primer endpoint | — | Ejecutar e inspeccionar una API |
| 10 | Rutas, parámetros y validación con Pydantic | — | Aceptar y rechazar datos correctamente |
| 11 | Recursos REST, verbos, respuestas y códigos de estado | — | Diseñar un contrato CRUD coherente |
| 12 | Estructura backend y límites de servicios | — | Organizar una API mantenible |
| 13 | Autenticación, autorización y seguridad | — | Proteger una ruta y sus permisos |
| 14 | Errores, middleware, async, logging y observabilidad | — | Diagnosticar peticiones y fallos previsibles |

### Fase 3 — PostgreSQL y persistencia

| # | Tema principal | Estado | Resultado práctico |
|---:|---|---|---|
| 15 | Tablas, claves, relaciones y constraints | — | Diseñar el modelo de datos |
| 16 | SQL esencial: CRUD, filtros, joins y agregaciones | — | Resolver preguntas útiles en SQL |
| 17 | SQLAlchemy, sesiones y transacciones | — | Persistir datos desde la API |
| 18 | Migraciones Alembic y datos semilla | — | Evolucionar la base de datos de forma reproducible |
| 19 | Índices, rendimiento, conexiones y copias | — | Mejorar y proteger un flujo de datos |

### Fase 4 — TypeScript como segundo lenguaje

| # | Tema principal | Estado | Resultado práctico |
|---:|---|---|---|
| 20 | Valores, inferencia, operadores y contexto mínimo de JavaScript | — | Escribir un programa tipado pequeño |
| 21 | Funciones, control de flujo, arrays y objetos tipados | — | Transformar datos de la API de forma segura |
| 22 | Interfaces, uniones, genéricos y narrowing | — | Modelar estados y respuestas |
| 23 | Async/await, Fetch, HTTP y respuestas tipadas | — | Consumir la API desde TypeScript |
| 24 | Eventos, formularios, tooling y DevTools | — | Crear y depurar una interacción de navegador |

### Fase 5 — React con TypeScript

| # | Tema principal | Estado | Resultado práctico |
|---:|---|---|---|
| 25 | JSX, componentes, props y composición | — | Construir la primera interfaz tipada |
| 26 | Estado, eventos, listas, condiciones y feedback | — | Crear una pantalla interactiva completa |
| 27 | Formularios, validación y accesibilidad esencial | — | Enviar datos válidos mediante un formulario usable |
| 28 | Efectos e integración con la API | — | Conectar React con FastAPI |
| 29 | Routing, autenticación y estado compartido | — | Navegar por áreas protegidas |
| 30 | Hooks, organización, estilos esenciales y UI de producción | — | Entregar un frontend coherente sin crear un design system |

### Fase 6 — Testing y calidad

| # | Tema principal | Estado | Resultado práctico |
|---:|---|---|---|
| 31 | Estrategia de pruebas, riesgo y pirámide | — | Crear el plan de pruebas del proyecto |
| 32 | Pytest e integración FastAPI | — | Validar comportamiento backend |
| 33 | Vitest y React Testing Library | — | Validar comportamiento visible al usuario |
| 34 | Playwright y TDD práctico | — | Automatizar un recorrido crítico completo |

### Fase 7 — Docker y despliegue

| # | Tema principal | Estado | Resultado práctico |
|---:|---|---|---|
| 35 | Imágenes y contenedores Docker | — | Empaquetar un componente |
| 36 | Docker Compose para frontend, API y base de datos | — | Ejecutar el sistema completo localmente |
| 37 | CI/CD con GitHub Actions | — | Validar cambios automáticamente |
| 38 | Arquitectura cloud, AWS, dominios, HTTPS y configuración | — | Dibujar y explicar producción |
| 39 | Despliegue, secretos, monitoring, rollback y recuperación | — | Publicar y verificar una release segura |

### Fase 8 — Ingeniería de IA aplicada

| # | Tema principal | Estado | Resultado práctico |
|---:|---|---|---|
| 40 | Modelos, tokens, contexto, capacidades y límites | — | Seleccionar y justificar un modelo |
| 41 | APIs de modelos, salida estructurada, retries y proveedores | — | Añadir un endpoint fiable con IA |
| 42 | Prompts, privacidad, prompt injection y aprobación humana | — | Crear una interacción restringida y revisable |
| 43 | Embeddings, búsqueda vectorial y RAG | — | Responder usando datos aprobados |
| 44 | Tool calling, Agentic RAG, LangGraph y agentes acotados | — | Crear un agente con herramientas permitidas |
| 45 | Evaluación, tracing, calidad, latencia y coste | — | Medir la función de IA antes de publicarla |

### Fase 9 — Mobile con Expo

| # | Tema principal | Estado | Resultado práctico |
|---:|---|---|---|
| 46 | Expo y diferencias entre React Native y web | — | Ejecutar la primera pantalla móvil |
| 47 | Componentes, estilos, navegación y formularios | — | Construir un flujo móvil navegable |
| 48 | API, autenticación, almacenamiento y permisos | — | Conectar la app al backend con seguridad |
| 49 | Notificaciones, builds y publicación | — | Producir una build instalable |

### Fase 10 — Empleabilidad

| # | Tema principal | Estado | Resultado práctico |
|---:|---|---|---|
| 50 | Portfolio, CV, LinkedIn, GitHub y narrativa | — | Publicar un perfil profesional coherente |
| 51 | Complejidad, estructuras y patrones de entrevista | — | Resolver y explicar un problema en voz alta |
| 52 | System design junior, live coding y defensa técnica | — | Completar una entrevista simulada |

### Fase 11 — Proyecto final

| # | Tema principal | Estado | Resultado práctico |
|---:|---|---|---|
| 53 | Problema, usuarios, restricciones y alcance | — | Aprobar un scope de una página |
| 54 | Arquitectura, datos, contrato API, frontera IA y tickets | — | Crear diagramas y plan ordenado |
| 55 | Construcción de backend y datos con revisión | — | Entregar el núcleo probado |
| 56 | Cliente, IA, despliegue y validación | — | Publicar el producto completo |
| 57 | Demo, retrospectiva, portfolio y defensa | — | Presentar y defender con evidencias |

---

## Regla de condensación

Cada día introduce **un solo tema principal**. Configuración, comandos, boilerplate y detalles secundarios se subordinan al resultado de ese día y pueden realizarse con Claude. Si una guía requiere más tiempo, se extiende el trabajo práctico; no se añaden varios temas principales no relacionados al mismo día.

## Documentos internos relacionados

Los documentos del instructor están en `course/notes/instructor`:

- Producción de contenido: [pipeline de producción con IA](../notes/instructor/production/PIPELINE-PRODUCCION-IA.md).
- Propuesta y negocio: [propuesta completa](../notes/instructor/business/propuesta-bootcamp-sevilla.md).
- Mensaje inicial: [WhatsApp listo para enviar](../notes/instructor/WHATSAPP-First-Contact-Ready-to-Send.md).
