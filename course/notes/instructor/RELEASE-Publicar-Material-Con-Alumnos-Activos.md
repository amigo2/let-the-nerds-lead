# Publicar material mientras hay alumnos activos

> Documento de instructor. Cómo subir guías nuevas y correcciones sin romperle la sesión a nadie.

El curso se escribe con alumnos dentro. Eso significa que `main` no es tu borrador: **es lo que
un alumno va a leer esta tarde**. Este documento es la disciplina mínima para que eso no duela.

---

## Cómo lo recibe el alumno

No tenés que avisar por WhatsApp cada vez que subís algo. El repo lo hace solo:

| Mecanismo | Cuándo actúa |
|---|---|
| Hook `SessionStart` | Al abrir sesión: si está atrasado, se lo dice a Claude |
| `/update-course` | El alumno lo corre y baja lo nuevo con `git pull --ff-only` |
| `/start-session` y `/next` | Vuelven a chequear; `/next` es el momento clave |
| Skill `course-sync` | Decide cómo actualizar sin perder notas locales |

El hook hace `fetch` como máximo **una vez cada 30 minutos** y tiene un límite de 8 segundos de
red. Si no hay internet, la sesión arranca igual. Si el alumno está al día, no dice nada.

---

## Regla central

> **`main` siempre tiene que estar en un estado enseñable.**

Un alumno puede clonar o actualizar en cualquier momento, sin avisarte. No existe una ventana
"todavía no lo mires".

### Qué implica

- No subas una guía a medias. Si necesitás guardar trabajo en curso, usá una rama:
  `git switch -c wip/guia-07` y mergeá cuando esté lista.
- No subas un enlace a un archivo que todavía no existe. El
  [índice maestro](../../curriculum/INDICE-MAESTRO-CONTENIDO.md) es lo primero que lee Claude:
  un enlace roto ahí manda al alumno a un archivo fantasma.
- Marcá el estado real en el índice (`—`, `ESQ`, `TXT`, `GUI`, `VID`, `OK`). Un `TXT` optimista
  es peor que un `ESQ` honesto.

---

## Antes de cada push

```bash
git status                  # qué cambió
git diff                    # revisá el contenido, no solo los nombres
git add <archivos>          # a dedo, no `git add .`
git diff --staged           # última mirada
git commit -m "..."
git push
```

Chequeo de 30 segundos antes de subir:

- [ ] ¿Todos los enlaces nuevos apuntan a archivos que existen?
- [ ] ¿El índice maestro refleja lo que realmente subo?
- [ ] ¿La guía usa solo conceptos ya vistos en días anteriores?
- [ ] ¿Está en español rioplatense (`vos`), consistente con el resto?
- [ ] ¿No hay material de `business/` ni precios en lo que toco?

Para una revisión más seria, lanzá el subagente:

```text
Use the curriculum-auditor subagent to audit the course before I push.
```

---

## Mensajes de commit que le sirven al alumno

El alumno **ve tus mensajes de commit**: el hook le muestra los últimos ocho. Escribilos para él,
no para vos.

| Mal | Bien |
|---|---|
| `cambios` | `Add GUIA-05: bucles y flujo de programa (día 05)` |
| `fix` | `Fix: el ejemplo de CORS de la GUIA-03 usaba el puerto equivocado` |
| `wip` | `Aclarar el ejercicio E2.3 de la GUIA-01, confundía a dos alumnos` |
| `update index` | `Marcar GUIA-04 como TXT en el índice maestro` |

Regla simple: que se entienda **por qué le conviene actualizar**.

---

## Corregir algo que un alumno ya leyó

Si el error ya está en la calle:

1. Corregilo en `main` con un commit que diga **qué** estaba mal.
2. Si el error hacía perder tiempo de verdad (un comando que no funciona, un concepto al revés),
   avisá por el canal del curso además del commit. El hook avisa que hay cambios, no que había
   un error grave.
3. **No reescribas historia** para tapar el error. Un `push --force` le rompe el `pull --ff-only`
   a todos los alumnos que ya bajaron ese commit, y los deja con un repo divergente que no saben
   arreglar. Los hooks lo bloquean, y está bien que lo hagan.

---

## Cambios en la configuración del agente

Si tocás `CLAUDE.md`, `.claude/skills/`, `.claude/commands/`, `.claude/agents/` o
`.claude/settings.json`:

- Esos archivos se cargan **al iniciar sesión**. El alumno tiene que **reiniciar la sesión**
  después de actualizar, no solo hacer pull. `/update-course` ya se lo dice.
- Si tocás `.claude/hooks/*.sh`, avisá del `chmod +x .claude/hooks/*.sh`. Git no siempre preserva
  el bit de ejecución, y un hook sin permiso **falla en silencio**: el alumno no se enteraría de
  que dejó de chequear actualizaciones.
- Cambios en permisos (`allow`/`ask`/`deny`) cambian qué puede hacer Claude en la máquina del
  alumno. Probalos en una sesión real antes de subirlos.

---

## Ritmo de publicación

Lo que funciona con alumnos activos:

- **Guías nuevas:** publicá la guía completa de una vez, no por partes.
- **Correcciones:** en cuanto estén. Son baratas y siempre mejoran la situación.
- **Reestructuras grandes** (renumerar días, mover archivos): hacelas en rama y mergéalas entre
  cohortes o en fin de semana. Mover archivos rompe los enlaces que el alumno tenga abiertos.
- Evitá subir diez commits sueltos en media hora: el alumno ve el aviso y actualiza varias veces
  por nada. Agrupá.

---

## Si un alumno queda con el repo trabado

Casi siempre es porque escribió notas dentro de una guía y el `pull --ff-only` falla.

El orden correcto —está en la skill `course-sync`, Claude ya lo sabe:

1. Copiar sus notas **fuera** del repo.
2. `git restore` sobre el archivo del curso.
3. `git pull --ff-only`.

Nunca `reset --hard` con trabajo del alumno sin copiar primero. Perder las respuestas de un alumno
es peor que tenerlo desactualizado un día más.

**Prevención:** en la Clase 00 ya se le dice que sus notas y su código van **fuera** de este repo.
Vale repetirlo la primera vez que veas a alguien escribiendo dentro de una guía.
