# Proyecto 01 — Mi App de Salud (versión mínima, paso a paso)

> Documento de estudio de Enmanuel. Creado el 8 de agosto de 2026.
>
> **Requisito:** haber hecho el Módulo 1 (instalar Python), el Módulo 2 (Bootstrap) y el
> Módulo 3 (FastAPI) de [GUIA-01](../guides/GUIA-01-Terminal-y-Primeros-Proyectos.md).
> **No hace falta React.** Este proyecto no lo usa.
>
> **Los conceptos nuevos que aparecen acá están explicados en
> [GUIA-03 — Conceptos para tu primer proyecto](../guides/GUIA-03-Conceptos-Para-Tu-Primer-Proyecto.md).**
> Tenela abierta al lado. Cada vez que veas algo que no conocés, ahí está el por qué.

---

## ⚠️ Leé esto antes de empezar

Esto es un **borrador de práctica, para vos**. No es un producto, no es consejo médico y no lo
va a usar nadie más. El objetivo no es hacer una buena app de salud: el objetivo es que
**termines algo de punta a punta** y veas funcionar el circuito completo frontend → backend →
frontend con tus propios datos.

Un proyecto chiquito y terminado enseña diez veces más que uno ambicioso a medio hacer.

---

## Índice

- [Qué vas a construir](#qué-vas-a-construir)
- [Los 9 pasos de un vistazo](#los-9-pasos-de-un-vistazo)
- [Paso 1 — Crear el proyecto](#paso-1--crear-el-proyecto)
- [Paso 2 — Los datos (`datos.py`)](#paso-2--los-datos-datospy)
- [Paso 3 — Calcular las calorías (`logica.py`)](#paso-3--calcular-las-calorías-logicapy)
- [Paso 4 — Armar el plan de comidas](#paso-4--armar-el-plan-de-comidas)
- [Paso 5 — Armar la lista de compras](#paso-5--armar-la-lista-de-compras)
- [Paso 6 — Probarlo todo en la terminal](#paso-6--probarlo-todo-en-la-terminal)
- [Paso 7 — Convertirlo en backend (`main.py`)](#paso-7--convertirlo-en-backend-mainpy)
- [Paso 8 — La pantalla (`index.html`)](#paso-8--la-pantalla-indexhtml)
- [Paso 9 — Conectar los dos lados](#paso-9--conectar-los-dos-lados)
- [Lo que tu app TODAVÍA no hace (y está bien)](#lo-que-tu-app-todavía-no-hace-y-está-bien)
- [Ejercicios para seguir solo](#ejercicios-para-seguir-solo)
- [Si algo falla](#si-algo-falla)
- [Checklist del proyecto](#checklist-del-proyecto)

---

# Qué vas a construir

Una página con un formulario. Ponés tus datos, apretás un botón, y aparecen tres cosas:

1. **Cuántas calorías por día** te corresponden según tu objetivo
2. **Un plan de comidas de 3 días** (desayuno, almuerzo, cena y snack de cada día)
3. **La lista de compras** de esos 3 días, con las cantidades ya sumadas

```
┌─────────────────────────────────────────────────────────┐
│  Mi App de Salud                                        │
│                                                         │
│  Peso   [ 70  ]  Altura [ 175 ]  Edad [ 20 ]            │
│  Sexo   [hombre▾] Actividad [moderado▾] Objetivo [bajar▾]│
│                                                         │
│           [ Generar mi plan ]                           │
│  ─────────────────────────────────────────────────────  │
│  ✅ 2233 kcal por día es tu objetivo                    │
│                                                         │
│  Día 1  (1900 kcal)                                     │
│    desayuno: Avena con banana y maní — 450 kcal         │
│    almuerzo: Pollo con arroz y ensalada — 650 kcal      │
│    cena:     Pescado al horno con papas — 550 kcal      │
│    snack:    Yogur con frutos secos — 250 kcal          │
│  Día 2 ...                                              │
│                                                         │
│  LISTA DE COMPRAS                                       │
│    aceite de oliva (ml) — 60                            │
│    tomate (unidad) — 4                                  │
│    ...                                                  │
└─────────────────────────────────────────────────────────┘
```

**Qué NO tiene** (a propósito): base de datos, login, React, deploy. Nada de eso hace falta
para que la app funcione. Se agrega después, si querés.

---

# Los 9 pasos de un vistazo

Fijate el orden: **primero el cerebro en Python puro, después el servidor, y al final la
pantalla.** Eso es a propósito. Si la lógica funciona en la terminal, cuando la pongas detrás
de FastAPI ya sabés que el problema no está ahí.

```
  PASOS 1-6  ──►  Python puro, en la terminal. Sin web, sin navegador.
                  Acá vive TODA la inteligencia de la app.
                        │
  PASO  7    ──►  Le ponés FastAPI encima. La misma lógica, ahora por HTTP.
                        │
  PASOS 8-9  ──►  Una página HTML que le pide los datos y los dibuja.
```

Al final vas a tener cinco archivos:

```
C:\dev\mi-app-salud\
├── venv\          ← el entorno virtual (no se toca)
├── datos.py       ← las comidas y sus ingredientes
├── logica.py      ← el cerebro: calcular, armar plan, armar lista
├── probar.py      ← un archivo para probar la lógica en la terminal
├── main.py        ← el backend (FastAPI)
└── index.html     ← el frontend (la pantalla)
```

---

# Paso 1 — Crear el proyecto

Terminal:

```powershell
cd C:\dev
mkdir mi-app-salud
cd mi-app-salud

python -m venv venv
.\venv\Scripts\Activate.ps1
pip install fastapi uvicorn
```

Tiene que aparecerte `(venv)` al principio del prompt. Si no aparece, no sigas: volvé al
[Módulo 3 de la GUIA-01](../guides/GUIA-01-Terminal-y-Primeros-Proyectos.md#módulo-3--fastapi-tu-primer-servidor).

Abrí la carpeta en tu editor:

```powershell
code .
```

> El `.` significa "esta carpeta". Si `code` no funciona, abrí VS Code y usá *Archivo → Abrir
> carpeta*.

---

# Paso 2 — Los datos (`datos.py`)

Antes que nada: **tu app necesita comida que ofrecer.** Esto no es código inteligente, es una
lista escrita a mano. Y está perfecto que lo sea.

Creá `datos.py`:

```python
# Cada comida es un diccionario.
# Todas tienen exactamente las mismas claves: nombre, tipo, calorias, ingredientes.
# Esa regularidad es lo que después me permite recorrerlas todas con un for.

COMIDAS = [
    {
        "nombre": "Avena con banana y maní",
        "tipo": "desayuno",
        "calorias": 450,
        "ingredientes": [
            {"alimento": "avena", "cantidad": 60, "unidad": "g"},
            {"alimento": "banana", "cantidad": 1, "unidad": "unidad"},
            {"alimento": "maní", "cantidad": 20, "unidad": "g"},
            {"alimento": "leche", "cantidad": 200, "unidad": "ml"},
        ],
    },
    {
        "nombre": "Huevos revueltos con pan integral",
        "tipo": "desayuno",
        "calorias": 400,
        "ingredientes": [
            {"alimento": "huevo", "cantidad": 2, "unidad": "unidad"},
            {"alimento": "pan integral", "cantidad": 60, "unidad": "g"},
            {"alimento": "tomate", "cantidad": 1, "unidad": "unidad"},
            {"alimento": "aceite de oliva", "cantidad": 5, "unidad": "ml"},
        ],
    },
    {
        "nombre": "Pollo con arroz y ensalada",
        "tipo": "almuerzo",
        "calorias": 650,
        "ingredientes": [
            {"alimento": "pechuga de pollo", "cantidad": 150, "unidad": "g"},
            {"alimento": "arroz", "cantidad": 80, "unidad": "g"},
            {"alimento": "lechuga", "cantidad": 50, "unidad": "g"},
            {"alimento": "tomate", "cantidad": 1, "unidad": "unidad"},
            {"alimento": "aceite de oliva", "cantidad": 10, "unidad": "ml"},
        ],
    },
    {
        "nombre": "Lentejas con verduras",
        "tipo": "almuerzo",
        "calorias": 600,
        "ingredientes": [
            {"alimento": "lentejas", "cantidad": 100, "unidad": "g"},
            {"alimento": "zanahoria", "cantidad": 1, "unidad": "unidad"},
            {"alimento": "cebolla", "cantidad": 1, "unidad": "unidad"},
            {"alimento": "arroz", "cantidad": 50, "unidad": "g"},
            {"alimento": "aceite de oliva", "cantidad": 10, "unidad": "ml"},
        ],
    },
    {
        "nombre": "Pescado al horno con papas",
        "tipo": "cena",
        "calorias": 550,
        "ingredientes": [
            {"alimento": "filete de pescado", "cantidad": 150, "unidad": "g"},
            {"alimento": "papa", "cantidad": 200, "unidad": "g"},
            {"alimento": "limón", "cantidad": 1, "unidad": "unidad"},
            {"alimento": "aceite de oliva", "cantidad": 10, "unidad": "ml"},
        ],
    },
    {
        "nombre": "Tortilla de espinaca con ensalada",
        "tipo": "cena",
        "calorias": 500,
        "ingredientes": [
            {"alimento": "huevo", "cantidad": 3, "unidad": "unidad"},
            {"alimento": "espinaca", "cantidad": 100, "unidad": "g"},
            {"alimento": "lechuga", "cantidad": 50, "unidad": "g"},
            {"alimento": "tomate", "cantidad": 1, "unidad": "unidad"},
            {"alimento": "aceite de oliva", "cantidad": 10, "unidad": "ml"},
        ],
    },
    {
        "nombre": "Yogur con frutos secos",
        "tipo": "snack",
        "calorias": 250,
        "ingredientes": [
            {"alimento": "yogur natural", "cantidad": 200, "unidad": "g"},
            {"alimento": "nueces", "cantidad": 20, "unidad": "g"},
        ],
    },
    {
        "nombre": "Manzana con maní",
        "tipo": "snack",
        "calorias": 220,
        "ingredientes": [
            {"alimento": "manzana", "cantidad": 1, "unidad": "unidad"},
            {"alimento": "maní", "cantidad": 25, "unidad": "g"},
        ],
    },
]
```

## 🔑 Mirá bien esta estructura

`COMIDAS` es una **lista de diccionarios**. Y dentro de cada diccionario, `"ingredientes"` es
**otra lista de diccionarios**.

```
COMIDAS  ────────────────────────────  [ ] una lista
   │
   ├─ comida 1  ───────────────────────  { } un diccionario
   │     ├─ "nombre"        → texto
   │     ├─ "calorias"      → número
   │     └─ "ingredientes"  →  [ ] otra lista
   │           ├─ ingrediente 1  → { } otro diccionario
   │           └─ ingrediente 2  → { }
   └─ comida 2  ...
```

**Esta forma —listas y diccionarios anidados— es la estructura de datos más común que vas a
usar en tu vida.** Y no es casualidad que se parezca al JSON de la
[GUIA-00 sección 7](../guides/GUIA-00-Que-es-una-App-Web-FE-y-BE.md#7-json-el-idioma-entre-fe-y-be): es
exactamente la misma forma. Cuando en el Paso 7 FastAPI devuelva esto, se va a convertir en JSON
sin que hagas nada.

Los nombres en MAYÚSCULA (`COMIDAS`) son la convención de Python para decir "esto es un valor
fijo, no lo cambies durante el programa".

---

# Paso 3 — Calcular las calorías (`logica.py`)

Este es el primer pedazo de "inteligencia". No es IA: es una **fórmula pública** que usan los
nutricionistas, la Mifflin-St Jeor. Vos la copiás y ya está.

Creá `logica.py`:

```python
from datos import COMIDAS


# Cuánto más gastás según lo que te movés.
FACTOR_ACTIVIDAD = {
    "sedentario": 1.2,
    "ligero": 1.375,
    "moderado": 1.55,
    "intenso": 1.725,
}

# Cuántas calorías sumar o restar según lo que querés lograr.
AJUSTE_OBJETIVO = {
    "bajar": -400,
    "mantener": 0,
    "subir": 300,
}

# Piso de seguridad. Nunca recomendar menos que esto.
MINIMO_SEGURO = {
    "hombre": 1500,
    "mujer": 1200,
}


def calcular_calorias(peso, altura, edad, sexo, actividad, objetivo):
    # 1. Metabolismo basal: lo que gastás estando quieto todo el día.
    if sexo == "hombre":
        base = 10 * peso + 6.25 * altura - 5 * edad + 5
    else:
        base = 10 * peso + 6.25 * altura - 5 * edad - 161

    # 2. Ajustar por cuánto te movés.
    total = base * FACTOR_ACTIVIDAD[actividad]

    # 3. Ajustar por el objetivo.
    total = total + AJUSTE_OBJETIVO[objetivo]

    # 4. Nunca bajar del piso de seguridad.
    minimo = MINIMO_SEGURO[sexo]
    if total < minimo:
        total = minimo

    return round(total)
```

## Por qué el paso 4 no es opcional

Sin ese `if`, alguien de 45 kg pidiendo "bajar de peso" recibiría un número peligrosamente
bajo. **Tu app va a hacer cuentas sobre el cuerpo de una persona.** Poner límites no es
burocracia: es la diferencia entre un ejercicio de programación y algo que puede hacer daño.

Acostumbrate desde el primer proyecto: *cada vez que tu código calcula un número que alguien va
a seguir, preguntate qué pasa en los extremos.*

## Probá solo esta parte

Antes de seguir, comprobá que funciona. En la terminal, con el `(venv)` activo:

```powershell
python
```

Se abre el intérprete de Python (vas a ver `>>>`). Escribí:

```python
from logica import calcular_calorias
calcular_calorias(70, 175, 20, "hombre", "moderado", "bajar")
```

Te tiene que devolver **`2233`**. Salí con `exit()`.

> Si te dio otra cosa, revisá la fórmula carácter por carácter antes de seguir. **No avances
> con una pieza rota.** Ese es el hábito más valioso que podés agarrar ahora.

---

# Paso 4 — Armar el plan de comidas

Seguí en el mismo `logica.py`, agregando esto al final:

```python
def comidas_de_tipo(tipo):
    """Devuelve solo las comidas de un tipo: 'desayuno', 'almuerzo', 'cena' o 'snack'."""
    resultado = []
    for comida in COMIDAS:
        if comida["tipo"] == tipo:
            resultado.append(comida)
    return resultado


def armar_plan(dias):
    """Arma un plan de N días. Por ahora va rotando las opciones de cada tipo."""
    tipos = ["desayuno", "almuerzo", "cena", "snack"]
    plan = []

    for numero_dia in range(dias):
        comidas_del_dia = []

        for tipo in tipos:
            opciones = comidas_de_tipo(tipo)
            # El % hace que el número "dé la vuelta" y nunca se salga de la lista.
            elegida = opciones[numero_dia % len(opciones)]
            comidas_del_dia.append(elegida)

        # Sumar las calorías del día.
        total = 0
        for comida in comidas_del_dia:
            total = total + comida["calorias"]

        plan.append({
            "dia": numero_dia + 1,
            "comidas": comidas_del_dia,
            "calorias_del_dia": total,
        })

    return plan
```

## El truco del `%`

`%` es el **resto de la división**. Sirve para recorrer una lista en círculo, sin salirte nunca:

```
Tenés 2 desayunos → len(opciones) = 2

día 0 →  0 % 2 = 0  → desayuno[0]
día 1 →  1 % 2 = 1  → desayuno[1]
día 2 →  2 % 2 = 0  → desayuno[0]   ← volvió al principio solo
día 3 →  3 % 2 = 1  → desayuno[1]
```

Sin el `%`, en el día 2 pedirías `opciones[2]` de una lista que solo tiene los índices 0 y 1, y
Python te tiraría `IndexError: list index out of range`. Este truco lo vas a usar toda la vida.

---

# Paso 5 — Armar la lista de compras

Este es el corazón del proyecto y es **puro sumar**. Nada más.

Al final de `logica.py`:

```python
def armar_lista_compras(plan):
    """Recorre todas las comidas del plan y suma los ingredientes repetidos."""
    acumulado = {}

    for dia in plan:
        for comida in dia["comidas"]:
            for ingrediente in comida["ingredientes"]:
                # La clave incluye la unidad para no sumar gramos con unidades.
                clave = ingrediente["alimento"] + " (" + ingrediente["unidad"] + ")"

                if clave in acumulado:
                    acumulado[clave] = acumulado[clave] + ingrediente["cantidad"]
                else:
                    acumulado[clave] = ingrediente["cantidad"]

    # Convertir el diccionario a una lista, que es más cómoda de mostrar.
    lista = []
    for clave in acumulado:
        lista.append({"alimento": clave, "cantidad": acumulado[clave]})

    return lista
```

## Cómo leer los tres `for` anidados

Da un poco de impresión al principio, pero es literalmente lo que harías a mano:

```
para cada DÍA del plan:                     ← 3 días
    para cada COMIDA de ese día:            ← 4 comidas por día
        para cada INGREDIENTE de esa comida:   ← 2-5 ingredientes
            si ya lo tengo anotado → le sumo la cantidad
            si no                  → lo anoto por primera vez
```

Es lo mismo que hacés con un papel: vas leyendo las recetas y anotando "tomate: 1... ah, otro
tomate: 2... otro: 3".

## Por qué la clave lleva la unidad

Si la clave fuera solo `"arroz"`, y una receta usara gramos y otra tazas, sumarías 80 g + 2
tazas = 82 de nada. Al usar `"arroz (g)"` como clave, cada unidad se cuenta por separado.

Es una decisión chiquita, pero es exactamente el tipo de detalle que separa un programa que
"anda" de uno que da resultados correctos.

---

# Paso 6 — Probarlo todo en la terminal

**Antes de tocar nada de web**, comprobá que el cerebro funciona.

Creá `probar.py`:

```python
from logica import calcular_calorias, armar_plan, armar_lista_compras

# --- 1. Las calorías ---
calorias = calcular_calorias(
    peso=70,
    altura=175,
    edad=20,
    sexo="hombre",
    actividad="moderado",
    objetivo="bajar",
)
print("Tu objetivo diario:", calorias, "kcal")
print()

# --- 2. El plan ---
plan = armar_plan(3)

for dia in plan:
    print("=== DÍA", dia["dia"], "—", dia["calorias_del_dia"], "kcal ===")
    for comida in dia["comidas"]:
        print("   ", comida["tipo"], ":", comida["nombre"], "-", comida["calorias"], "kcal")
    print()

# --- 3. La lista de compras ---
print("=== LISTA DE COMPRAS ===")
for item in armar_lista_compras(plan):
    print("  -", item["alimento"], ":", item["cantidad"])
```

Corrélo:

```powershell
python probar.py
```

Deberías ver algo así:

```
Tu objetivo diario: 2233 kcal

=== DÍA 1 — 1900 kcal ===
    desayuno : Avena con banana y maní - 450 kcal
    almuerzo : Pollo con arroz y ensalada - 650 kcal
    cena : Pescado al horno con papas - 550 kcal
    snack : Yogur con frutos secos - 250 kcal

=== DÍA 2 — 1720 kcal ===
    ...

=== LISTA DE COMPRAS ===
  - avena (g) : 120
  - banana (unidad) : 2
  - aceite de oliva (ml) : 60
  - tomate (unidad) : 4
  ...
```

## 🎉 Parate un segundo acá

**Tu app ya funciona.** Todo lo que sigue es ponerle una cara bonita. La lógica —lo difícil de
verdad, lo que hace que la app sea *tu* app— ya está escrita y ya la probaste.

Casi todo el mundo hace esto al revés: empieza por la pantalla, se pelea tres semanas con el
CSS y nunca llega a la parte que hace algo. Vos ya tenés la parte que hace algo.

---

# Paso 7 — Convertirlo en backend (`main.py`)

Ahora le ponemos FastAPI encima. **No vas a reescribir nada de la lógica** — solo la vas a
exponer por HTTP.

Creá `main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from logica import calcular_calorias, armar_plan, armar_lista_compras

app = FastAPI()

# Permite que una página abierta en el navegador le hable a este servidor.
# Sin esto, el navegador bloquea la petición. (Ver GUIA-03, sección de CORS.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Perfil(BaseModel):
    """La forma exacta de los datos que espero recibir del frontend."""
    peso: float
    altura: float
    edad: int
    sexo: str
    actividad: str
    objetivo: str


@app.get("/")
def inicio():
    return {"mensaje": "API de Mi App de Salud. Andá a /docs para probarla."}


@app.post("/api/plan")
def generar_plan(perfil: Perfil):
    calorias = calcular_calorias(
        perfil.peso,
        perfil.altura,
        perfil.edad,
        perfil.sexo,
        perfil.actividad,
        perfil.objetivo,
    )

    plan = armar_plan(3)
    lista = armar_lista_compras(plan)

    return {
        "calorias_diarias": calorias,
        "plan": plan,
        "lista_compras": lista,
    }
```

Levantalo:

```powershell
uvicorn main:app --reload
```

## Probalo SIN escribir frontend

Abrí **`http://127.0.0.1:8000/docs`**. Buscá `POST /api/plan`, apretá *Try it out*, pegá esto en
el cuadro y dale *Execute*:

```json
{
  "peso": 70,
  "altura": 175,
  "edad": 20,
  "sexo": "hombre",
  "actividad": "moderado",
  "objetivo": "bajar"
}
```

Abajo te aparece la respuesta completa en JSON.

**Ese JSON es tu backend terminado.** Y fijate: es exactamente el mismo diccionario que
devolvía `probar.py`, pero convertido a JSON por FastAPI. Es la respuesta a la duda que tenías
sobre la sección 7 de la GUIA-00 — ahora lo estás viendo con tus propios datos.

> `/docs` es tu mejor herramienta durante todo el desarrollo. **Probá siempre acá primero.**
> Si funciona en `/docs`, el backend está bien; si después la página falla, el problema está en
> el frontend. Eso te ahorra horas de buscar en el lado equivocado.

## Tres cosas nuevas en este archivo

| Qué | Para qué |
|---|---|
| `class Perfil(BaseModel)` | Declara **qué datos espero recibir y de qué tipo**. Si el frontend manda basura, FastAPI la rechaza solo con un `422`, antes de que tu código se ejecute. |
| `@app.post(...)` | **POST**, no GET, porque el frontend está **enviando** datos. (GUIA-00, sección 6.) |
| `CORSMiddleware` | El permiso para que el navegador deje pasar la petición entre dos servidores distintos. |

---

# Paso 8 — La pantalla (`index.html`)

Un solo archivo, con Bootstrap igual que en el Módulo 2. Creá `index.html` en la misma carpeta:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mi App de Salud</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container py-5" style="max-width: 720px;">

  <h1 class="mb-1">Mi App de Salud</h1>
  <p class="text-muted">Proyecto de práctica. No es consejo médico.</p>

  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title mb-3">Tus datos</h5>

      <div class="row g-3">
        <div class="col-4">
          <label class="form-label">Peso (kg)</label>
          <input id="peso" type="number" class="form-control" value="70">
        </div>
        <div class="col-4">
          <label class="form-label">Altura (cm)</label>
          <input id="altura" type="number" class="form-control" value="175">
        </div>
        <div class="col-4">
          <label class="form-label">Edad</label>
          <input id="edad" type="number" class="form-control" value="20">
        </div>

        <div class="col-4">
          <label class="form-label">Sexo</label>
          <select id="sexo" class="form-select">
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
          </select>
        </div>
        <div class="col-4">
          <label class="form-label">Actividad</label>
          <select id="actividad" class="form-select">
            <option value="sedentario">Sedentario</option>
            <option value="ligero">Ligero</option>
            <option value="moderado" selected>Moderado</option>
            <option value="intenso">Intenso</option>
          </select>
        </div>
        <div class="col-4">
          <label class="form-label">Objetivo</label>
          <select id="objetivo" class="form-select">
            <option value="bajar">Bajar de peso</option>
            <option value="mantener">Mantener</option>
            <option value="subir">Subir de peso</option>
          </select>
        </div>
      </div>

      <button id="boton" class="btn btn-primary mt-4">Generar mi plan</button>
    </div>
  </div>

  <!-- Acá el JavaScript va a escribir el resultado. Empieza vacío. -->
  <div id="resultado"></div>

</div>

<script>
  // 1. Agarrar el botón y escuchar sus clics.
  const boton = document.getElementById("boton");
  boton.addEventListener("click", pedirPlan);


  // 2. Cuando hacen clic: juntar los datos y mandarlos al backend.
  async function pedirPlan() {
    const perfil = {
      peso:      Number(document.getElementById("peso").value),
      altura:    Number(document.getElementById("altura").value),
      edad:      Number(document.getElementById("edad").value),
      sexo:      document.getElementById("sexo").value,
      actividad: document.getElementById("actividad").value,
      objetivo:  document.getElementById("objetivo").value,
    };

    document.getElementById("resultado").innerHTML =
      '<p class="text-muted">Calculando…</p>';

    const respuesta = await fetch("http://127.0.0.1:8000/api/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(perfil),
    });

    const datos = await respuesta.json();

    console.log(datos);   // ← mirá esto en la consola del navegador (F12)
    dibujar(datos);
  }


  // 3. Convertir el JSON recibido en HTML visible.
  function dibujar(datos) {
    let html = `
      <div class="alert alert-success">
        Tu objetivo: <strong>${datos.calorias_diarias} kcal por día</strong>
      </div>
      <h4 class="mt-4 mb-3">Tu plan</h4>
    `;

    for (const dia of datos.plan) {
      let comidas = "";
      for (const comida of dia.comidas) {
        comidas += `<li><strong>${comida.tipo}:</strong> ${comida.nombre}
                    <span class="text-muted">— ${comida.calorias} kcal</span></li>`;
      }

      html += `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">
              Día ${dia.dia}
              <small class="text-muted">(${dia.calorias_del_dia} kcal)</small>
            </h5>
            <ul class="mb-0">${comidas}</ul>
          </div>
        </div>
      `;
    }

    let items = "";
    for (const item of datos.lista_compras) {
      items += `<li class="list-group-item d-flex justify-content-between">
                  <span>${item.alimento}</span>
                  <strong>${item.cantidad}</strong>
                </li>`;
    }

    html += `
      <h4 class="mt-4 mb-3">Lista de compras</h4>
      <ul class="list-group mb-5">${items}</ul>
    `;

    document.getElementById("resultado").innerHTML = html;
  }
</script>

</body>
</html>
```

## Las tres partes del `<script>`

Están numeradas en el código a propósito, porque son tres ideas distintas:

```
1. ESCUCHAR    →  "cuando toquen el botón, llamá a pedirPlan"
2. PEDIR       →  juntar los inputs → fetch al backend → recibir JSON
3. DIBUJAR     →  convertir ese JSON en HTML y meterlo en la página
```

**Todo el frontend del mundo es esto.** React lo hace más elegante y más ordenado cuando la app
crece, pero conceptualmente hace exactamente estas tres cosas. Por eso conviene verlo así de
crudo una vez.

La línea que importa de verdad es:

```javascript
const respuesta = await fetch("http://127.0.0.1:8000/api/plan", { ... });
```

**Ese es el momento exacto en que el frontend le habla al backend.** Todo el dibujo de la
[GUIA-00 sección 4](../guides/GUIA-00-Que-es-una-App-Web-FE-y-BE.md#4-cómo-se-hablan-petición-y-respuesta),
en una línea.

---

# Paso 9 — Conectar los dos lados

Necesitás **el backend corriendo** y **la página abierta** al mismo tiempo.

**Terminal 1** — dejala corriendo, no la cierres:

```powershell
cd C:\dev\mi-app-salud
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

**Terminal 2** — abrí una segunda ventana de terminal:

```powershell
cd C:\dev\mi-app-salud
start index.html
```

Poné tus datos reales y apretá **Generar mi plan**.

## Ahora abrí F12 y mirá lo que hiciste

Esto cierra el círculo con el ejercicio estrella de la GUIA-00, pero ahora **con tu propia app**:

1. `F12` → pestaña **Network** → filtrá por **Fetch/XHR**
2. Apretá el botón otra vez
3. Aparece una línea: `plan`. Hacé clic.
4. Pestaña **Payload** → **eso es lo que tu frontend le mandó al backend**
5. Pestaña **Response** → **eso es lo que el backend le contestó**
6. Pestaña **Console** → ahí está el `console.log(datos)` que dejaste en el código

Sos las dos puntas de esa conversación. Escribiste al que pregunta y al que responde.

---

# Lo que tu app TODAVÍA no hace (y está bien)

Te lo digo explícito para que no pienses que te salió mal:

**1. El plan ignora tus calorías objetivo.**
Te dice "2233 kcal" y después te arma un plan de 1900. No se hablan entre ellos. La app calcula
bien las dos cosas por separado, pero todavía no las conecta. **Ese es el ejercicio E6, y es el
salto más interesante del proyecto.**

**2. Los días 1 y 3 son iguales.** Solo hay 2 opciones de cada tipo, así que la rotación se
repite enseguida. Se arregla con más comidas.

**3. No guarda nada.** Cerrás el servidor y no queda rastro. Para eso hace falta una base de
datos, y es el paso natural cuando quieras seguir.

**4. No hay alergias, ni vegetarianos, ni gustos.** Cualquiera recibe el mismo plan.

Ninguna de estas cuatro cosas te impide decir que terminaste. **Una versión 1 que funciona y
tiene límites conocidos vale infinitamente más que una versión perfecta que no existe.**

---

# Ejercicios para seguir solo

En orden de dificultad. Hacelos en este orden, no salteados.

- [ ] **E1** — Agregá un tercer desayuno, un tercer almuerzo, una tercera cena y un tercer
  snack en `datos.py`. Volvé a correr `probar.py` y fijate que ahora los 3 días son distintos.
  **No tuviste que tocar ni una línea de `logica.py`.** Pensá por qué. Esa separación entre
  datos y lógica es el motivo.

- [ ] **E2** — Hacé que el plan sea de 7 días en vez de 3. Es cambiar **un solo número**.
  ¿Encontrás cuál?

- [ ] **E3** — Agregá a cada comida una clave `"proteina"` (en gramos) y mostrá también la
  proteína total de cada día. Tenés que tocar `datos.py`, `logica.py` y el `dibujar()` del HTML:
  es tu primer cambio que atraviesa las tres capas.

- [ ] **E4** — En el HTML, agregá un input para elegir **cuántos días** querés. Vas a tener que
  agregar el campo al `Perfil` de `main.py` también.

- [ ] **E5** — Agregá un checkbox "vegetariano". Marcá en `datos.py` cuáles comidas lo son
  (`"vegetariana": True`) y filtralas en `comidas_de_tipo()`.

- [ ] **E6** — **El grande.** Que el plan intente acercarse a tus calorías objetivo: en vez de
  rotar a ciegas, que elija de cada tipo la opción cuya caloría esté más cerca del cupo del día.
  Pista: repartí el objetivo en 25% desayuno, 35% almuerzo, 30% cena, 10% snack, y para cada
  cupo buscá la comida con la menor diferencia. **Acá tu app deja de ser un ejercicio y empieza
  a ser tu idea.**

- [ ] **E7** — `git init` y guardá el proyecto. Ver la sección de Git en la GUIA-03.

---

# Si algo falla

| Lo que ves | Qué pasa | Cómo se arregla |
|---|---|---|
| `ModuleNotFoundError: No module named 'fastapi'` | No activaste el entorno virtual | Fijate que diga `(venv)` en el prompt |
| `ModuleNotFoundError: No module named 'logica'` | Estás corriendo desde otra carpeta | `pwd` y `cd` a `C:\dev\mi-app-salud` |
| `IndexError: list index out of range` | Faltó el `%` en el Paso 4, o te falta una comida de algún tipo | Revisá que haya al menos una de cada `tipo` |
| El botón no hace nada | Hay un error de JavaScript | `F12` → pestaña **Console**. El error está ahí, en rojo |
| `Failed to fetch` en la consola | El backend no está corriendo | Mirá la Terminal 1: ¿sigue viva? ¿La cerraste sin querer? |
| `blocked by CORS policy` | Falta el middleware, o el navegador bloquea archivos abiertos directo | Revisá el `add_middleware`. Si sigue, usá el truco de abajo ↓ |
| `422 Unprocessable Entity` | El JSON que mandaste no coincide con `Perfil` | Mirá **Payload** en Network: ¿faltó un campo? ¿mandaste texto donde va número? |
| `500 Internal Server Error` | Se rompió tu código Python | El error completo está en la **Terminal 1**. Leé la última línea primero |

## Si el navegador bloquea el `fetch` desde el archivo

Algunos navegadores no dejan que una página abierta con `start index.html` (o sea, con
`file:///`) le hable a un servidor. Si te pasa, servila con un mini-servidor. En la **Terminal 2**:

```powershell
python -m http.server 5500
```

Y abrí **`http://localhost:5500/index.html`**. Listo: ahora tenés dos servidores hablándose,
igual que en una app de verdad — el frontend en el `5500` y el backend en el `8000`.

## La regla para no perderte

Cuando algo falle, **primero decidí de qué lado está el problema.** Es la distinción 4xx/5xx de
la [GUIA-00 sección 6](../guides/GUIA-00-Que-es-una-App-Web-FE-y-BE.md#6-http-métodos-y-códigos):

```
¿Funciona en /docs?
    │
    ├─ NO  → el problema es del BACKEND. Mirá la Terminal 1.
    │
    └─ SÍ  → el problema es del FRONTEND. Mirá F12 → Console y Network.
```

Nunca busques en los dos lados a la vez. Esa pregunta te ahorra la mitad del tiempo.

---

# Checklist del proyecto

## La lógica (Python puro)
- [ ] Creé la carpeta y el entorno virtual, y veo `(venv)`
- [ ] `datos.py` con al menos 8 comidas
- [ ] Entiendo que `COMIDAS` es una lista de diccionarios, y por qué se parece al JSON
- [ ] `calcular_calorias()` me devuelve 2233 con los datos de prueba
- [ ] Entiendo por qué existe el piso de seguridad
- [ ] `armar_plan()` funciona, y sé qué hace el `%`
- [ ] `armar_lista_compras()` suma bien los repetidos
- [ ] Sé explicar por qué la clave lleva la unidad entre paréntesis
- [ ] `python probar.py` me imprime las tres cosas

## El backend
- [ ] `main.py` levanta sin errores
- [ ] Probé `POST /api/plan` desde `/docs` y me devolvió el JSON completo
- [ ] Entiendo qué hace `class Perfil(BaseModel)`
- [ ] Sé por qué este endpoint es POST y no GET
- [ ] Sé qué problema resuelve el CORS

## El frontend
- [ ] La página se ve bien con Bootstrap
- [ ] El botón dispara la petición
- [ ] Veo el resultado dibujado en la pantalla
- [ ] Encontré mi petición en la pestaña **Network**
- [ ] Vi el `console.log` en la pestaña **Console**
- [ ] Puedo explicar las tres partes del `<script>`

## Lo que de verdad importa
- [ ] Puedo explicarle a alguien el camino completo de un clic **en mi propia app**
- [ ] Sé decidir, ante un error, si mirar la terminal o el navegador
- [ ] Hice al menos los ejercicios E1, E2 y E3
- [ ] Guardé el proyecto con Git

---

## Cuando termines

Tenés dos caminos, y los dos son buenos:

**A. Profundizar esta app** → E6 (el plan que respeta las calorías), después base de datos con
SQLite, después login. Es tu idea creciendo.

**B. Rehacer el frontend en React** → misma API, misma lógica, otra cara. Es la mejor forma de
aprender React que existe, porque ya sabés exactamente qué tiene que hacer y no estás peleando
con dos cosas nuevas a la vez.

Yo iría por A hasta el E6, y recién después por B.

> **Recordá:** esto es un ejercicio de programación, no una herramienta de salud. Si vas a
> cambiar tu alimentación de verdad, hablalo con un profesional.