# Guía 03 — Los conceptos para tu primer proyecto

> Documento de estudio de Enmanuel. Creado el 8 de agosto de 2026.
>
> **Va después de la GUIA-02 *(pending production)*.** El orden completo es:
>
> ```
> GUIA-00  →  GUIA-01  →  GUIA-02  →  GUIA-03  +  PROYECTO-01
> qué es      terminal    inglés      conceptos    tu primera
> una app     y las       técnico     del primer   app, paso
> web         3 bases                 proyecto     a paso
> ```
>
> **Guía compañera de [PROYECTO-01 — Mi App de Salud](../projects/PROYECTO-01-App-de-Salud-Paso-a-Paso.md).**
> Se leen **juntas**: el proyecto te dice *qué escribir*, esta te dice *por qué funciona*.

---

## Cómo usar esta guía

No la leas de corrido. **Funciona mejor así:**

1. Abrí el PROYECTO-01 y empezá a hacer los pasos.
2. Cuando aparezca algo que no entendés, buscalo acá.
3. Volvé al proyecto.

Las secciones están **en el mismo orden en que las cosas aparecen en el proyecto**, así que
podés ir bajando en paralelo.

| Si estás en… | Leé las secciones |
|---|---|
| Paso 2 — `datos.py` | 1, 2 |
| Pasos 3-5 — `logica.py` | 3, 4, 5, 6 |
| Paso 6 — `probar.py` | 7 |
| Paso 7 — `main.py` | 8, 9 |
| Pasos 8-9 — `index.html` | 10, 11, 12, 13 |
| Cuando algo falle | 14 |
| Al terminar | 15 |

---

## Índice

- [1. Los tipos de datos de Python](#1-los-tipos-de-datos-de-python)
- [2. 🔑 Listas y diccionarios](#2--listas-y-diccionarios)
- [3. Los bucles `for`](#3-los-bucles-for)
- [4. Funciones: parámetros y `return`](#4-funciones-parámetros-y-return)
- [5. Varios archivos: `import` y separar responsabilidades](#5-varios-archivos-import-y-separar-responsabilidades)
- [6. Detalles de Python que vas a ver](#6-detalles-de-python-que-vas-a-ver)
- [7. `print` y probar cosas sueltas](#7-print-y-probar-cosas-sueltas)
- [8. FastAPI: GET vs POST y Pydantic](#8-fastapi-get-vs-post-y-pydantic)
- [9. 🚧 CORS: por qué el navegador te bloquea](#9--cors-por-qué-el-navegador-te-bloquea)
- [10. El DOM: la página como objetos](#10-el-dom-la-página-como-objetos)
- [11. Eventos: reaccionar a los clics](#11-eventos-reaccionar-a-los-clics)
- [12. 🔑 `fetch`, `async` y `await`](#12--fetch-async-y-await)
- [13. Dibujar HTML desde JavaScript](#13-dibujar-html-desde-javascript)
- [14. 🔍 Depurar: encontrar el problema](#14--depurar-encontrar-el-problema)
- [15. Git: guardar tu trabajo](#15-git-guardar-tu-trabajo)
- [Qué mirar y dónde buscar](#qué-mirar-y-dónde-buscar)
- [Glosario](#glosario-de-la-guía-03)
- [Checklist de comprensión](#checklist-de-comprensión)

---

# 1. Los tipos de datos de Python

Todo valor en Python es de algún **tipo**. Estos cinco te alcanzan para el proyecto entero:

| Tipo | Qué es | Ejemplo |
|---|---|---|
| `int` | Número entero | `20`, `450`, `-5` |
| `float` | Número con decimales | `70.5`, `1.55`, `6.25` |
| `str` | Texto (*string*) | `"hombre"`, `"avena"` |
| `bool` | Verdadero o falso | `True`, `False` |
| `None` | "nada", ausencia de valor | `None` |

Dos avisos que te van a ahorrar errores:

**`True` y `False` van en mayúscula en Python.** En JavaScript y en JSON son `true` y `false`
en minúscula. Es la fuente de error más tonta y más frecuente cuando trabajás con los dos
lenguajes el mismo día.

**`"20"` no es `20`.** El primero es texto, el segundo es un número. `"20" + "5"` te da `"205"`;
`20 + 5` te da `25`. Esto va a importar cuando el frontend te mande datos (sección 12).

---

# 2. 🔑 Listas y diccionarios

Esta sección es la más importante de la guía. **El 90% de la programación es meter datos en
estas dos cosas y sacarlos.**

## La lista: cosas en orden

```python
tipos = ["desayuno", "almuerzo", "cena", "snack"]
```

- Va entre **corchetes** `[ ]`
- Tiene **orden**, y se accede por **posición** (índice)
- **Los índices empiezan en 0.** Siempre. Es la convención universal.

```python
tipos[0]        # "desayuno"    ← el primero es el CERO
tipos[3]        # "snack"
tipos[4]        # 💥 IndexError: list index out of range
len(tipos)      # 4  ← cuántos hay
tipos.append("postre")   # agregar uno al final
```

> **El error clásico:** una lista de 4 elementos tiene los índices **0, 1, 2, 3**. El índice 4
> no existe. Por eso el último válido siempre es `len(lista) - 1`. Este es el motivo del truco
> del `%` en el Paso 4 del proyecto.

## El diccionario: cosas con nombre

```python
comida = {
    "nombre": "Avena con banana",
    "calorias": 450,
}
```

- Va entre **llaves** `{ }`
- **No importa el orden**: se accede por **nombre** (clave), no por posición
- Cada entrada es un par `"clave": valor`

```python
comida["nombre"]         # "Avena con banana"
comida["calorias"]       # 450
comida["proteina"]       # 💥 KeyError: 'proteina'   ← esa clave no existe

comida["proteina"] = 12  # crear o cambiar una clave
"calorias" in comida     # True  ← preguntar si existe, SIN romper
```

Ese `in` es lo que usás en `armar_lista_compras()` para preguntar "¿ya anoté este alimento?"
sin que explote.

## Cuál usar

| Usá **lista** cuando… | Usá **diccionario** cuando… |
|---|---|
| Tenés **muchas cosas del mismo tipo** | Tenés **una cosa con varias propiedades** |
| El orden importa | Cada dato tiene un nombre propio |
| "las comidas", "los días", "los ingredientes" | "una comida", "un usuario", "un perfil" |

## Y ahora, la combinación estrella

Casi nunca vas a usar una lista o un diccionario solos. Vas a usar **listas de diccionarios**:

```python
COMIDAS = [
    {"nombre": "Avena", "calorias": 450},
    {"nombre": "Pollo", "calorias": 650},
]
```

*Una lista (muchas comidas) de diccionarios (cada una con sus propiedades).*

**Esa forma es una tabla.** Cada diccionario es una fila, cada clave es una columna. Es la
estructura de una base de datos, de un Excel, de la respuesta de cualquier API del mundo.
Cuando la reconozcas a simple vista, vas a poder leer código de cualquier lado.

## 🔗 Y por eso el JSON se parece tanto

Volvé un segundo a la
[GUIA-00 sección 7](GUIA-00-Que-es-una-App-Web-FE-y-BE.md#7-json-el-idioma-entre-fe-y-be) —
la duda que tenías. Mirá los dos lado a lado:

```python
# Diccionario de Python           # El mismo dato en JSON
{                                 {
  "nombre": "Enmanuel",             "nombre": "Enmanuel",
  "activo": True,                   "activo": true,
  "materias": ["Prog", "BD"]        "materias": ["Prog", "BD"]
}                                 }
```

Casi idénticos. Las diferencias son estas:

| | Diccionario Python | JSON |
|---|---|---|
| Qué es | Un **objeto vivo** en la memoria | **Texto**, y nada más |
| Booleanos | `True` / `False` | `true` / `false` |
| Vacío | `None` | `null` |
| Comillas | Simples o dobles | **Solo dobles** |

Y por eso, cuando en `main.py` hacés `return {...}`, **FastAPI convierte solo tu diccionario a
texto JSON** antes de mandarlo. Ese paso se llama **serializar**. No tenés que hacer nada: es
automático porque las dos estructuras son casi la misma cosa.

---

# 3. Los bucles `for`

Un `for` significa: *"hacé esto una vez por cada elemento"*.

```python
for comida in COMIDAS:
    print(comida["nombre"])
```

Se lee literal: **"por cada `comida` dentro de `COMIDAS`, imprimí su nombre"**.

- `comida` es un nombre que inventás vos. Es la variable que en cada vuelta vale un elemento
  distinto.
- Lo que va **indentado** (con espacios) debajo, se repite. Lo que no está indentado, no.

> ⚠️ **En Python la indentación no es estética: es sintaxis.** Los espacios definen qué está
> adentro del bucle y qué está afuera. Cuatro espacios por nivel, siempre. Si te sale
> `IndentationError`, es esto.

## `range()`: repetir N veces

Cuando querés repetir un número de veces en vez de recorrer una lista:

```python
for numero_dia in range(3):
    print(numero_dia)      # imprime 0, después 1, después 2
```

`range(3)` da **0, 1, 2** — tres valores, empezando en cero. Por eso en el proyecto hacés
`"dia": numero_dia + 1`: internamente contás desde 0, pero al usuario le mostrás "Día 1".

## Bucles anidados

Un `for` dentro de otro. Es lo que da miedo al principio y es lo más normal del mundo:

```python
for dia in plan:                            # 3 vueltas
    for comida in dia["comidas"]:           # 4 por cada día    →  12 en total
        for ing in comida["ingredientes"]:  # ~4 por cada comida → ~48 en total
            print(ing["alimento"])
```

**La clave para leerlos: seguí la indentación, no el texto.** Cada nivel de sangría es un nivel
de profundidad. Y siempre son datos anidados: una lista dentro de una lista dentro de una lista.

## El patrón "acumulador"

Lo vas a escribir mil veces en tu vida. Se ve así:

```python
total = 0                                # 1. empezar en cero
for comida in comidas:
    total = total + comida["calorias"]   # 2. ir sumando
# 3. después del bucle, total tiene el resultado
```

Y su versión con diccionario, que es la de la lista de compras:

```python
acumulado = {}                 # 1. empezar vacío
for ing in ingredientes:
    if ing["alimento"] in acumulado:
        acumulado[ing["alimento"]] += ing["cantidad"]   # ya estaba → sumar
    else:
        acumulado[ing["alimento"]] = ing["cantidad"]    # primera vez → anotar
```

> `+=` es un atajo: `x += 5` es exactamente lo mismo que `x = x + 5`.

---

# 4. Funciones: parámetros y `return`

Una función es **un pedazo de código con nombre**, que podés ejecutar cuando quieras.

```python
def calcular_calorias(peso, altura, edad):
    resultado = 10 * peso + 6.25 * altura - 5 * edad
    return resultado
```

| Parte | Qué es |
|---|---|
| `def` | "voy a definir una función" |
| `calcular_calorias` | El nombre que le ponés |
| `(peso, altura, edad)` | Los **parámetros**: lo que la función necesita recibir |
| `return` | Lo que la función **devuelve** a quien la llamó |

## Definir ≠ ejecutar

```python
def saludar(nombre):           # ← esto NO ejecuta nada. Solo la define.
    return "Hola, " + nombre

mensaje = saludar("Enmanuel")  # ← ACÁ se ejecuta. mensaje vale "Hola, Enmanuel"
```

Una función definida y nunca llamada no hace absolutamente nada. Es una receta guardada en un
cajón.

## `return` termina la función

En cuanto se ejecuta un `return`, la función se corta ahí. Lo que venga después no corre.

Y una función sin `return` devuelve `None`. Si te pasa que "la función anda pero me da `None`",
casi seguro te olvidaste el `return`.

## Argumentos por nombre

Estas dos llamadas hacen lo mismo:

```python
calcular_calorias(70, 175, 20)
calcular_calorias(peso=70, altura=175, edad=20)     # ← más largo, mucho más claro
```

Cuando una función tiene más de tres parámetros, **usá siempre la segunda forma**. Es imposible
confundir el orden, y dentro de seis meses vas a poder leer tu propio código. Por eso `probar.py`
está escrito así.

## Por qué separar en funciones

Comparalo:

```
UN SOLO BLOQUE GIGANTE          TRES FUNCIONES

todo mezclado                   calcular_calorias()  → la puedo probar sola
                                armar_plan()         → la puedo probar sola
si falla algo,                  armar_lista()        → la puedo probar sola
¿dónde busco?
                                si falla → sé exactamente cuál probar
```

**Una función = una responsabilidad.** Si al describir lo que hace tenés que usar un "y", capaz
son dos funciones.

---

# 5. Varios archivos: `import` y separar responsabilidades

## Cómo se importa

```python
# En logica.py:
from datos import COMIDAS
```

Se lee: *"del archivo `datos.py`, traeme `COMIDAS`"*. Sin el `.py`, solo el nombre.

```python
from logica import calcular_calorias, armar_plan     # traer varias cosas, con comas
```

Para que funcione, los archivos tienen que estar **en la misma carpeta**, y tenés que correr
Python **desde esa carpeta**. Si te da `ModuleNotFoundError: No module named 'logica'`, hacé
`pwd` — casi siempre estás parado en el lugar equivocado.

## Por qué tres archivos y no uno

```
datos.py    →  QUÉ HAY.        Solo información. Ni una decisión.
logica.py   →  QUÉ SE HACE.    Los cálculos. No sabe que existe internet.
main.py     →  CÓMO SE PIDE.   La puerta HTTP. No calcula nada por su cuenta.
```

Esto se llama **separación de responsabilidades**, y no es decoración. Mirá lo que te compra:

- Agregar 50 comidas → tocás **solo** `datos.py`
- Cambiar la fórmula → tocás **solo** `logica.py`
- Mañana querés una app de escritorio en vez de web → tirás `main.py` y `logica.py` sigue
  sirviendo intacta

Es exactamente por eso que el **E1** del proyecto (agregar comidas sin tocar la lógica)
funciona. Cuando lo hagas, vas a sentir la ventaja en vez de leerla.

---

# 6. Detalles de Python que vas a ver

## `%` — el resto de la división

```python
7 % 3     # 1   (7 dividido 3 da 2, y sobra 1)
4 % 2     # 0   (exacto, no sobra nada)
5 % 5     # 0
2 % 5     # 2   (5 no entra en 2, sobra todo)
```

Sus dos usos reales:

```python
lista[i % len(lista)]     # recorrer en círculo, sin salirse nunca
if numero % 2 == 0:       # ¿es par?
```

## `round()`

```python
round(2233.0625)      # 2233
round(2233.0625, 2)   # 2233.06   ← con 2 decimales
```

## f-strings — meter variables dentro de un texto

```python
nombre = "Enmanuel"
edad = 20

f"Hola, {nombre}, tenés {edad} años"      # "Hola, Enmanuel, tenés 20 años"
```

La `f` antes de la comilla es obligatoria. Sin ella, te imprime `{nombre}` literal.
Es lo que usa el `@app.get("/saludo/{nombre}")` de la GUIA-01.

## `if` / `elif` / `else`

```python
if total < 1200:
    nivel = "muy bajo"
elif total < 2000:
    nivel = "normal"
else:
    nivel = "alto"
```

Se evalúan **en orden** y **solo entra en uno**. El primero que da `True` gana; el resto ni se
mira.

> ⚠️ `=` asigna, `==` compara. `x = 5` guarda un 5. `x == 5` pregunta si vale 5. Confundirlos
> es un clásico eterno.

## Adelanto: la versión corta de un `for` que filtra

En el proyecto escribimos:

```python
resultado = []
for comida in COMIDAS:
    if comida["tipo"] == tipo:
        resultado.append(comida)
return resultado
```

Lo mismo se escribe en una línea:

```python
return [comida for comida in COMIDAS if comida["tipo"] == tipo]
```

Se llama **list comprehension** y es lo que vas a ver en el código de cualquier proyecto real.
**No la uses todavía** — usá el `for` largo hasta que te salga solo. Pero cuando la veas en
internet, ahora sabés que es exactamente eso.

---

# 7. `print` y probar cosas sueltas

`print()` es tu instrumento principal para entender qué está pasando. No es "para
principiantes": todo el mundo lo usa, siempre.

```python
print("Mi plan:", plan)                      # con coma, mete un espacio solo
print("Día", dia["dia"], "→", total, "kcal")
```

## El truco más útil: prints numerados

Cuando algo no funciona y no sabés ni por dónde va el código:

```python
print("1 - entré a la función")
print("2 - las opciones son:", opciones)
print("3 - elegí:", elegida)
```

Corrés, mirás hasta qué número imprimió, y ya sabés en qué línea murió. Es tosco y es efectivo.
Después los borrás.

## El intérprete interactivo

```powershell
python
```

Se abre un `>>>` donde podés probar una línea suelta sin crear ningún archivo. Ideal para "¿qué
me da `7 % 3`?" o para probar una función recién escrita. Salís con `exit()`.

**Usalo mucho.** Es la diferencia entre suponer qué hace algo y saberlo en cinco segundos.

---

# 8. FastAPI: GET vs POST y Pydantic

## Por qué este endpoint es POST

Repasá la [GUIA-00 sección 6](GUIA-00-Que-es-una-App-Web-FE-y-BE.md#6-http-métodos-y-códigos):

| | GET | POST |
|---|---|---|
| Intención | **Leer** algo | **Enviar** datos |
| Los datos van… | en la dirección | en el **cuerpo** (*body*) de la petición |
| Se puede escribir en la barra del navegador | Sí | **No** |

Tu `/api/plan` recibe seis datos: peso, altura, edad, sexo, actividad, objetivo. Podrías meterlos
en la dirección (`/api/plan?peso=70&altura=175&...`), pero queda horrible y son datos personales
que quedarían en el historial del navegador. **Van en el cuerpo → POST.**

Consecuencia práctica: **no podés probar un POST escribiendo la dirección en el navegador.** Por
eso `/docs` es tan importante.

## Pydantic: el contrato de entrada

```python
class Perfil(BaseModel):
    peso: float
    altura: float
    edad: int
    sexo: str
    actividad: str
    objetivo: str
```

Esto declara: *"cuando alguien llame a este endpoint, tiene que mandarme exactamente estos seis
campos, con estos tipos"*.

Y FastAPI, gratis, sin que escribas nada más:

1. **Verifica** que llegaron todos los campos
2. **Convierte** los tipos si puede (`"70"` → `70.0`)
3. **Rechaza con un `422`** y un mensaje claro si algo no cuadra
4. **Documenta** el endpoint en `/docs` con el formulario ya armado

```
Frontend manda:  {"peso": 70, "altura": 175, ...}
                          │
                    ┌─────▼─────┐
                    │  Perfil   │  ← ¿está todo? ¿los tipos están bien?
                    └─────┬─────┘
                     ✅   │   ❌
                          │    └──► 422, y tu función NUNCA se ejecuta
                          ▼
                   tu función corre, con datos garantizados
```

**Ese último punto es lo valioso.** Dentro de tu función ya no tenés que preguntarte "¿y si
`peso` vino vacío?". No puede venir vacío: Pydantic lo frenó antes.

Y es la
[regla de oro de la GUIA-00](GUIA-00-Que-es-una-App-Web-FE-y-BE.md#-la-regla-de-oro-de-la-seguridad)
en la práctica: *el backend es la ley*. Aunque el frontend valide, el backend vuelve a validar.

## La respuesta

En la otra dirección no hace falta declarar nada: devolvés un diccionario y FastAPI lo serializa
a JSON solo, como vimos en la sección 2.

---

# 9. 🚧 CORS: por qué el navegador te bloquea

Este concepto frena a todo el mundo la primera vez y parece un bug. No lo es.

## Qué está pasando

Tu página está en un lado (`file:///...` o `localhost:5500`) y tu backend en otro
(`127.0.0.1:8000`). **Son dos orígenes distintos.**

Los navegadores tienen una regla de seguridad vieja y muy importante:

> Una página **no puede leer** la respuesta de un servidor de otro origen, a menos que ese
> servidor **diga explícitamente que la autoriza**.

El motivo es real: sin esa regla, cualquier página maliciosa que abrieras podría hacerle
peticiones a tu banco usando tus cookies y leer la respuesta.

```
   Tu página                        Tu backend
   localhost:5500                   127.0.0.1:8000
        │                                 │
        │  ── fetch ──────────────────►   │
        │                                 │  el servidor responde normal
        │  ◄─────── respuesta ─────────   │
        │
   ┌────▼──────────────┐
   │ EL NAVEGADOR mira │  ¿el servidor puso la cabecera que me autoriza?
   │ la respuesta      │      NO → la tira y te escribe el error en rojo
   └───────────────────┘      SÍ → te la entrega
```

## Los tres detalles que aclaran todo

**1. El que bloquea es el navegador, no el servidor.** El servidor respondió perfecto. Es el
navegador el que decide no dejarte leer la respuesta.

**2. Por eso `/docs` funciona igual.** `/docs` se sirve desde `127.0.0.1:8000` — el mismo origen
que la API. No hay cruce, no hay CORS. **Esa es la razón por la que tu backend puede estar
perfecto y la página fallar igual.**

**3. `CORSMiddleware` no "arregla" nada.** Solo hace que tu servidor agregue la cabecera que le
dice al navegador "esta página tiene permiso". Es un permiso, no un parche.

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # ← "*" = cualquier origen
    allow_methods=["*"],
    allow_headers=["*"],
)
```

> ⚠️ `allow_origins=["*"]` significa "que cualquier página del mundo pueda llamarme". Para
> practicar en tu máquina está perfecto. **En una app real se pone la lista exacta de tus
> dominios**, por ejemplo `allow_origins=["https://mi-app.com"]`.

---

# 10. El DOM: la página como objetos

Cuando el navegador lee tu HTML, no se queda con el texto: **construye un árbol de objetos** en
memoria. Ese árbol se llama **DOM** (*Document Object Model*).

```
document
   └── html
        └── body
             └── div.container
                  ├── h1
                  ├── input#peso        ← cada etiqueta es un objeto
                  └── div#resultado        que JavaScript puede tocar
```

Ese árbol es exactamente lo que ves en **F12 → Elements**. Y como es un objeto vivo, JavaScript
lo puede leer y modificar — que es justo lo que comprobaste editando YouTube en el
[ejercicio estrella de la GUIA-00](GUIA-00-Que-es-una-App-Web-FE-y-BE.md#-ejercicio-estrella-ver-el-fe-y-el-be-con-tus-propios-ojos).

## Agarrar un elemento

```html
<input id="peso" type="number" value="70">
```

```javascript
const campo = document.getElementById("peso");   // buscar por su id
const valor = campo.value;                       // leer lo que tiene escrito
```

El `id` en el HTML es el gancho. Por eso en el proyecto cada input tiene uno.

## ⚠️ `.value` SIEMPRE devuelve texto

Aunque el input sea `type="number"`:

```javascript
document.getElementById("peso").value          // "70"  ← texto, con comillas
Number(document.getElementById("peso").value)  // 70    ← ahora sí, número
```

Por eso en el proyecto está el `Number(...)` envolviendo los tres campos numéricos. Sin eso
mandarías `"70"` en el JSON. **Es la causa número uno de bugs raros con formularios.**

## Las tres cosas que le hacés a un elemento

| Código | Qué hace |
|---|---|
| `elemento.value` | Leer o escribir lo que hay en un input |
| `elemento.innerHTML = "..."` | Reemplazar todo el contenido de un elemento |
| `elemento.addEventListener(...)` | Escuchar algo que hace el usuario (sección 11) |

---

# 11. Eventos: reaccionar a los clics

Un frontend no corre de arriba abajo y termina. **Se queda esperando** a que el usuario haga
algo. Cada cosa que el usuario hace es un **evento**.

```javascript
const boton = document.getElementById("boton");
boton.addEventListener("click", pedirPlan);
```

Se lee: *"botón, cuando te hagan **click**, ejecutá `pedirPlan`"*.

## El detalle que confunde a todo el mundo

```javascript
boton.addEventListener("click", pedirPlan);      // ✅ le paso LA FUNCIÓN
boton.addEventListener("click", pedirPlan());    // ❌ la EJECUTO ahora mismo
```

Con los paréntesis, la función corre **al cargar la página** y al botón le pasás el resultado
(que no sirve para nada). Sin paréntesis, le pasás la función misma para que la guarde y la
llame después.

**La regla:** `pedirPlan` es la receta, `pedirPlan()` es cocinarla. A `addEventListener` le
tenés que dar la receta.

Otros eventos que vas a usar: `"submit"` (enviar un formulario), `"input"` (mientras escribe),
`"change"` (cambió un select).

---

# 12. 🔑 `fetch`, `async` y `await`

Esta sección es la más importante del lado del frontend. Es **el momento exacto** en que tu
frontend le habla a tu backend.

## Las cosas que tardan

Pedirle algo a un servidor puede tardar 50 ms o 3 segundos. Si el navegador se quedara parado
esperando, la página se congelaría entera.

Por eso `fetch` no devuelve el resultado: devuelve una **promesa** (*promise*) — un "te aviso
cuando llegue".

## `await`: esperá acá

```javascript
async function pedirPlan() {
  const respuesta = await fetch("http://127.0.0.1:8000/api/plan", { ... });
  const datos = await respuesta.json();
  dibujar(datos);
}
```

- **`await`** = "no sigas a la línea siguiente hasta que esto llegue". Convierte la promesa en el
  valor de verdad.
- **`async`** = obligatorio en la función que contiene un `await`. Es el permiso.

**La regla mecánica:** si escribís `await` adentro, ponele `async` a la función. Si te olvidás,
el error te lo dice: `await is only valid in async functions`.

## La llamada completa, línea por línea

```javascript
const respuesta = await fetch("http://127.0.0.1:8000/api/plan", {
  method: "POST",                                    // 1
  headers: { "Content-Type": "application/json" },   // 2
  body: JSON.stringify(perfil),                      // 3
});

const datos = await respuesta.json();                // 4
```

| # | Qué es |
|---|---|
| 1 | El **método** HTTP. Sin esto, `fetch` hace un GET y tu endpoint POST responde `405`. |
| 2 | La **cabecera**: "lo que te mando es JSON". Sin esto, FastAPI no sabe cómo leerlo. |
| 3 | El **cuerpo**: los datos. `JSON.stringify` convierte tu objeto de JavaScript en texto. |
| 4 | La **respuesta**. `.json()` hace el camino inverso: texto → objeto de JavaScript. |

## Las dos traducciones

Este es el concepto de la sección 2, ahora del lado de JavaScript:

```
    OBJETO JS                     TEXTO JSON                  DICCIONARIO PYTHON

   {peso: 70}   ──stringify──►  '{"peso":70}'  ──Pydantic──►   {"peso": 70.0}
                                    (el cable)
   {plan:[…]}   ◄──.json()───   '{"plan":[…]}' ◄──FastAPI───   {"plan": [...]}
```

**Por el cable solo viaja texto.** Los objetos y los diccionarios son cosas vivas en la memoria
de cada programa. Las cuatro flechas del dibujo son las cuatro traducciones, y **tres son
automáticas** — solo `JSON.stringify` la escribís vos.

## Ojo: `fetch` no falla con un 404

Contraintuitivo, pero importante:

```javascript
const respuesta = await fetch(url);
// Si el servidor respondió 404 o 500, ACÁ NO PASA NADA. La promesa se cumplió.
// El servidor contestó — contestó "error", pero contestó.

if (!respuesta.ok) {                  // .ok es true solo si el código es 2xx
  console.log("Falló:", respuesta.status);
  return;
}
```

`fetch` solo lanza un error de verdad si **no hubo respuesta**: el servidor está apagado, no hay
red, o CORS la bloqueó. Ese es el `Failed to fetch` que ves en la consola.

En el proyecto no pusimos ese `if` para no cargar el código. **Agregalo cuando te sientas
cómodo** — es lo que separa una demo de algo usable.

---

# 13. Dibujar HTML desde JavaScript

## Template literals: los backticks

```javascript
"Hola, " + nombre + ". Tenés " + edad + " años."     // ❌ lo viejo, ilegible
`Hola, ${nombre}. Tenés ${edad} años.`               // ✅ template literal
```

Se usan **comillas invertidas** `` ` `` (en tu teclado suele estar al lado del `1` o del `P`) y
las variables van dentro de `${...}`.

Sus dos ventajas: metés variables sin cortar el texto, y **pueden ocupar varias líneas**. Por eso
sirven tanto para armar HTML:

```javascript
html += `
  <div class="card mb-3">
    <h5>Día ${dia.dia}</h5>
  </div>
`;
```

Es el equivalente exacto de las f-strings de Python (sección 6). Mismo concepto, otra sintaxis.

## Construir de a pedazos

El patrón del proyecto es el acumulador de la sección 3, pero con texto:

```javascript
let items = "";                          // 1. empezar vacío
for (const item of lista) {
  items += `<li>${item.alimento}</li>`;  // 2. ir pegando
}
elemento.innerHTML = items;              // 3. meterlo todo de una
```

## `innerHTML` reemplaza todo

```javascript
document.getElementById("resultado").innerHTML = html;
```

Borra lo que hubiera dentro de ese `<div>` y pone lo nuevo. Por eso podés apretar el botón muchas
veces sin que se acumulen los resultados.

> 🔒 **Nota de seguridad para más adelante:** `innerHTML` interpreta lo que le das como HTML de
> verdad. Si algún día metés ahí texto que escribió un usuario, alguien puede inyectar código.
> En tu app de práctica todo el contenido lo generás vos, así que no hay riesgo. Pero guardate el
> dato: se llama **XSS**, y es la misma idea de la GUIA-00 —*nunca confíes en lo que llega de
> afuera*.

## `let` y `const`

```javascript
const boton = ...;   // no lo voy a reasignar
let html = "";       // sí lo voy a ir cambiando
```

**Usá `const` por defecto.** Cambiá a `let` solo cuando el valor de verdad tenga que cambiar. Así,
cuando leas `const`, sabés de un vistazo que esa variable no se mueve. (`var` es la forma vieja:
si la ves en un tutorial, el tutorial es viejo.)

---

# 14. 🔍 Depurar: encontrar el problema

**Depurar no es un castigo por escribir mal el código. Es la mitad del trabajo.** Todos los
programadores del mundo pasan más tiempo averiguando por qué algo falla que escribiendo cosas
nuevas.

## Primero: ¿de qué lado está el problema?

Nunca busques en los dos lados a la vez.

```
        ¿El endpoint funciona en /docs?
                    │
        ┌───────────┴───────────┐
       NO                      SÍ
        │                       │
   BACKEND roto            FRONTEND roto
   → Terminal 1            → F12 en el navegador
   → El error de           → Console (errores de JS)
     Python está ahí       → Network (la petición)
     completo
```

## `console.log`: el `print` de JavaScript

```javascript
console.log(datos);
console.log("perfil que voy a mandar:", perfil);
```

Aparece en **F12 → Console**. Y tiene una ventaja sobre el `print` de Python: si le pasás un
objeto, la consola te lo muestra **desplegable**, para abrir y cerrar cada rama. Probá hacer clic
en el resultado de tu `console.log(datos)`.

## Los tres lugares donde mirar

| Dónde | Qué te dice |
|---|---|
| **Terminal 1** (uvicorn) | Errores de Python, y una línea por cada petición que llega |
| **F12 → Console** | Errores de JavaScript (en rojo) y tus `console.log` |
| **F12 → Network** | La conversación completa: qué mandaste, qué te contestaron, con qué código |

En **Network**, hacé clic en tu petición y mirá estas tres pestañas:

- **Headers** → el código de estado (200, 422, 500…)
- **Payload** → **lo que tu frontend envió**
- **Response** → **lo que el backend contestó**

Comparar Payload con lo que esperaba Pydantic resuelve casi todos los `422`.

## Cómo leer un error de Python

```
Traceback (most recent call last):
  File "logica.py", line 47, in armar_plan
    elegida = opciones[numero_dia]
              ~~~~~~~~^^^^^^^^^^^^
IndexError: list index out of range
```

**Leé de abajo hacia arriba:**

1. La **última línea** es el error: `IndexError: list index out of range` → me pasé del final de
   una lista
2. La **anteúltima** es la línea exacta: `opciones[numero_dia]`
3. Arriba, el archivo y el número: `logica.py`, línea 47

Con esas tres cosas ya sabés qué pasó y dónde. Y si el mensaje en inglés no te cierra, tenés la
GUIA-02, sección 6 *(pending production)*, que es exactamente esto.

## Los tres errores que más te van a pasar

| Error | Casi siempre es… |
|---|---|
| `KeyError: 'algo'` | Escribiste mal el nombre de una clave, o no existe en ese diccionario |
| `IndexError` | Te pasaste del final de una lista. Acordate: la última posición es `len - 1` |
| `TypeError: unsupported operand type(s)` | Sumás un texto con un número. Falta un `Number()` o un `int()` |

## Cuando estés trabado de verdad

1. **Leé el error completo.** Entero. La gente lo saltea y ahí estaba la respuesta.
2. **`print` numerados** hasta encontrar la última línea que se ejecuta.
3. **Comentá código** hasta que funcione, y volvé a agregarlo de a poco.
4. **Explicáselo en voz alta**, aunque sea a la pared. En serio funciona: al forzarte a decirlo
   en palabras, encontrás el hueco. Tiene nombre: *rubber duck debugging*.
5. **Buscá el error literal en Google**, en inglés, sin tus nombres de variables.
6. Recién ahí, preguntá.

---

# 15. Git: guardar tu trabajo

Lo instalaste en el Módulo 1 de la GUIA-01 y todavía no lo usaste. Es el momento: ahora tenés un
proyecto que te dolería perder.

**Git guarda fotos de tu proyecto en el tiempo.** Podés volver a cualquiera. Es la red de
seguridad que te deja romper cosas sin miedo, que es como se aprende.

## Antes de nada: `.gitignore`

Creá un archivo llamado exactamente `.gitignore` (con el punto adelante) en tu carpeta:

```
venv/
__pycache__/
```

Le dice a Git **qué NO guardar**. El `venv` son miles de archivos que se regeneran con un
`pip install`; guardarlos no sirve de nada y hace el proyecto pesadísimo. Esto es lo primero que
se hace en cualquier proyecto de Python.

## Los cuatro comandos

```powershell
git init                              # una sola vez: "empezá a seguir esta carpeta"
git add .                             # "preparo TODOS los cambios"  (el . = todo)
git commit -m "Mi app de salud v1"    # "sacá la foto, con este nombre"
git log --oneline                     # ver todas las fotos que sacaste
```

Y el más útil de todos:

```powershell
git status                            # ¿qué cambió desde la última foto?
```

**Corré `git status` todo el tiempo.** Es gratis, no modifica nada, y te dice exactamente en qué
estado estás.

## El ciclo

```
   escribís código
        │
   git status           ← ¿qué cambié?
        │
   git add .            ← preparo los cambios
        │
   git commit -m "..."  ← saco la foto
        │
   (y vuelta a empezar)
```

## Cuándo hacer un commit

Cada vez que algo **funciona**. No cuando terminás el día, no cuando está perfecto: cuando algo
anda.

En este proyecto serían más o menos cinco:

```
"Datos de las comidas"
"Cálculo de calorías"
"Plan y lista de compras funcionando en la terminal"
"Backend con FastAPI"
"Frontend conectado"
```

Ese es el tamaño correcto de un commit: **un paso que funciona.**

## Los mensajes

En imperativo y diciendo **qué** hiciste, no cómo. La
GUIA-02, sección 13 *(pending production)* tiene el detalle de cómo escribirlos en
inglés.

```
✅ "Agregar cálculo de calorías"
✅ "Arreglar el índice fuera de rango en armar_plan"
❌ "cambios"
❌ "asdf"
❌ "ahora sí"
```

---

# Qué mirar y dónde buscar

> **Nota honesta:** acá no te pongo links de YouTube porque no puedo verificar que sigan vivos.
> Te doy **las búsquedas exactas** para escribir en YouTube —te van a dar resultados actuales,
> que es mejor que un link de hace un año— y **la documentación oficial**, que sí es estable.

## Búsquedas en YouTube, en orden de urgencia

| Prioridad | Buscá exactamente esto | Para qué |
|---|---|---|
| ⭐⭐⭐ | `curso python desde cero listas y diccionarios` | Secciones 1-4. **Es lo que más te falta.** |
| ⭐⭐⭐ | `javascript para principiantes DOM eventos` | Secciones 10-11 |
| ⭐⭐⭐ | `javascript fetch api tutorial español` | Sección 12 |
| ⭐⭐ | `python funciones parametros return` | Sección 4 |
| ⭐⭐ | `async await javascript explicado` | Sección 12 |
| ⭐⭐ | `git y github desde cero para principiantes` | Sección 15 |
| ⭐ | `fastapi pydantic modelos` | Sección 8 |
| ⭐ | `que es CORS y como solucionarlo` | Sección 9 |

Filtrá por **"Este año"** cuando busques cosas de JavaScript. Para Python la antigüedad importa
mucho menos: un video de Python de 2020 sigue siendo válido.

## Documentación oficial

Estas páginas son las fuentes de verdad. Acostumbrate a ir a ellas antes que a un blog:

| Recurso | Para qué | Dirección |
|---|---|---|
| **MDN** | *La* referencia de HTML, CSS y JavaScript. Está en español y es excelente. | `developer.mozilla.org/es/` |
| **Documentación de FastAPI** | Tutorial oficial, muy bien escrito y con ejemplos que andan | `fastapi.tiangolo.com` |
| **Tutorial de Python** | El tutorial oficial del lenguaje | `docs.python.org/es/3/tutorial/` |
| **Documentación de Bootstrap** | Copiá y pegá componentes de acá | `getbootstrap.com/docs/5.3/` |

**Truco de búsqueda:** poné `mdn` al final de lo que busques en Google.
`javascript addeventlistener mdn` te lleva directo a la buena, sin pasar por cinco blogs con
publicidad.

## Cómo estudiar esto sin perder el tiempo

Lo dice la GUIA-01 y lo repito porque es lo que más falla:

**Mirar tutoriales se siente como aprender, pero no lo es.** La única prueba de que aprendiste
algo es poder hacerlo con el editor vacío y sin el video.

El ciclo que sí funciona:

```
1. Frenar cuando el proyecto te pide algo que no sabés
2. Buscar SOLO eso (no el curso completo de 8 horas)
3. Volver al proyecto y usarlo
4. Repetir
```

Aprender con un proyecto que te importa es lento al principio y muchísimo más rápido después,
porque cada concepto llega cuando lo necesitás y se te queda pegado a un problema real.

---

# Glosario de la Guía 03

| Término | Significado |
|---|---|
| **Lista** | Colección ordenada, entre `[ ]`. Se accede por posición, desde 0. |
| **Diccionario** | Colección de pares `clave: valor`, entre `{ }`. Se accede por nombre. |
| **Índice** | La posición de un elemento en una lista. El primero es el 0. |
| **Clave (key)** | El nombre de una entrada en un diccionario. |
| **Bucle / loop** | Repetir algo. En Python, `for`. |
| **Iterar** | Recorrer una colección elemento por elemento. |
| **Indentación** | Los espacios al principio de la línea. En Python **es sintaxis**, no estilo. |
| **Función** | Bloque de código con nombre, que recibe parámetros y devuelve algo. |
| **Parámetro** | Lo que una función declara que necesita recibir. |
| **Argumento** | El valor concreto que le pasás al llamarla. |
| **`return`** | Lo que la función devuelve. Sin él, devuelve `None`. |
| **Acumulador** | Variable que empieza vacía y se va llenando dentro de un bucle. |
| **`import`** | Traer código de otro archivo. |
| **Serializar** | Convertir un objeto en texto (dict → JSON). Lo inverso es *parsear*. |
| **Pydantic** | La librería que FastAPI usa para validar los datos que entran. |
| **`BaseModel`** | La clase de Pydantic con la que declarás la forma de los datos. |
| **`422`** | El código que devuelve FastAPI cuando los datos no cumplen el modelo. |
| **Middleware** | Código que se ejecuta con cada petición, antes o después de tu función. |
| **CORS** | La regla del navegador sobre peticiones entre orígenes distintos. |
| **Origen** | La combinación protocolo + dominio + puerto. `http://localhost:8000`. |
| **DOM** | El árbol de objetos que el navegador arma a partir de tu HTML. |
| **Evento** | Algo que hace el usuario: un clic, escribir, enviar un formulario. |
| **Listener** | La función que queda esperando un evento. |
| **`fetch`** | La función de JavaScript que hace peticiones HTTP. |
| **Promesa (promise)** | Un valor que todavía no llegó. `await` espera a que llegue. |
| **`async` / `await`** | Cómo se escribe código que espera, sin congelar la página. |
| **`JSON.stringify`** | Objeto de JavaScript → texto JSON. |
| **`.json()`** | Texto JSON → objeto de JavaScript. |
| **Template literal** | Texto entre backticks `` ` `` que admite `${variables}` y varias líneas. |
| **`innerHTML`** | El contenido HTML de un elemento. Asignarlo lo reemplaza todo. |
| **XSS** | Ataque que inyecta código a través de contenido no confiable. |
| **Depurar (debug)** | Encontrar y arreglar la causa de un error. |
| **Traceback** | El informe de error de Python. Se lee de abajo hacia arriba. |
| **Commit** | Una foto guardada de tu proyecto en Git. |
| **`.gitignore`** | El archivo que lista lo que Git debe ignorar. |
| **Repositorio** | La carpeta que Git está siguiendo. |

---

# Checklist de comprensión

El estándar es el mismo de siempre: **¿lo puedo explicar sin mirar?**

## Python
- [ ] Sé la diferencia entre una lista y un diccionario, y cuándo usar cada una
- [ ] Sé por qué los índices empiezan en 0 y por qué el último es `len - 1`
- [ ] Puedo leer una lista de diccionarios y decir qué hay adentro
- [ ] **Puedo explicar por qué un diccionario de Python se parece tanto al JSON, y en qué se diferencian**
- [ ] Entiendo que la indentación en Python cambia el significado del código
- [ ] Puedo escribir un bucle acumulador (empezar en 0, ir sumando)
- [ ] Sé leer tres `for` anidados siguiendo la indentación
- [ ] Sé la diferencia entre definir una función y ejecutarla
- [ ] Sé qué hace `%` y para qué sirve recorrer en círculo
- [ ] Entiendo por qué el proyecto está separado en `datos`, `logica` y `main`

## Backend
- [ ] Sé por qué `/api/plan` es POST y no GET
- [ ] Puedo explicar qué hace `class Perfil(BaseModel)` y qué pasa si mando datos mal
- [ ] Sé qué significa un `422`
- [ ] **Puedo explicar CORS: quién bloquea, por qué, y por qué `/docs` funciona igual**
- [ ] Sé que `allow_origins=["*"]` es solo para practicar

## Frontend
- [ ] Sé qué es el DOM y sé encontrarlo en F12 → Elements
- [ ] Sé por qué `.value` siempre devuelve texto y para qué está el `Number()`
- [ ] Sé la diferencia entre `pedirPlan` y `pedirPlan()` en un `addEventListener`
- [ ] **Puedo explicar el camino completo: objeto JS → stringify → texto → Pydantic → dict**
- [ ] Sé para qué está el `await` y por qué la función tiene que ser `async`
- [ ] Sé que un `404` no hace fallar a `fetch`
- [ ] Sé usar template literals con backticks

## Oficio
- [ ] Ante un error, sé decidir si mirar la terminal o el navegador
- [ ] Uso `console.log` y `print` sin que me dé vergüenza
- [ ] Sé leer un traceback de Python de abajo hacia arriba
- [ ] Sé mirar Payload y Response en la pestaña Network
- [ ] Hice `git init`, `git add`, `git commit` en mi proyecto
- [ ] Tengo un `.gitignore` con `venv/`

---

## Reglas de estudio (las mismas de siempre)

1. **Escribí el código a mano.** Copiar y pegar no genera memoria.
2. **Rompé cosas a propósito.** Sacá el `%`, sacá el `Number()`, apagá el backend. Mirá qué error
   da. Provocar un error a propósito enseña más que evitarlo.
3. **Un concepto por vez.** No leas esta guía entera hoy. Leé lo que el proyecto te está pidiendo
   ahora.
4. **Terminá el proyecto aunque quede feo.** Feo y terminado le gana a lindo y abandonado,
   siempre.
5. **Si no entendés algo, preguntá "¿por qué?" hasta el fondo.** No memorices: entendé.
