# Tarea 01 — "La Cesta": tu primera app completa (FE + BE + DB + GitHub)

> Para Enmanuel. Creado el 31 de julio de 2026.
>
> **Antes de esto tenés que haber terminado la [GUIA-00](../guides/GUIA-00-Que-es-una-App-Web-FE-y-BE.md) y
> la [GUIA-01](../guides/GUIA-01-Terminal-y-Primeros-Proyectos.md).** Todo lo que hay acá se apoya en eso.
>
> Esta ya no es una guía: es una **tarea**. Hay cosas que te doy hechas para que no te trabes, y
> hay cosas marcadas con **🔧 TU TURNO** que tenés que resolver vos. Esas son las que valen.
>
> Tiempo estimado: entre 10 y 15 horas repartidas en varios días. No lo hagas de una sentada.

---

## Índice

- [Qué vas a construir](#qué-vas-a-construir)
- [Por qué esta tarea y no otra](#por-qué-esta-tarea-y-no-otra)
- [⚠️ Aviso: esta app NO tiene seguridad](#️-aviso-esta-app-no-tiene-seguridad)
- [Parte 0 — GitHub desde cero](#parte-0--github-desde-cero)
- [Parte 1 — La base de datos con Docker](#parte-1--la-base-de-datos-con-docker)
- [Parte 2 — El backend (FastAPI + PostgreSQL)](#parte-2--el-backend-fastapi--postgresql)
- [Parte 3 — El frontend (React)](#parte-3--el-frontend-react)
- [Parte 4 — Conectar los tres](#parte-4--conectar-los-tres)
- [Parte 5 — Subirlo a GitHub](#parte-5--subirlo-a-github)
- [🔧 Lo que tenés que hacer vos](#-lo-que-tenés-que-hacer-vos)
- [Criterios de entrega](#criterios-de-entrega)
- [Errores comunes y cómo leerlos](#errores-comunes-y-cómo-leerlos)
- [Glosario](#glosario)
- [Checklist](#checklist)

---

# Qué vas a construir

Una **cesta de la compra** con base de datos de verdad. Suena tonto, pero es literalmente el
esqueleto de casi cualquier SaaS que se vende hoy: hay unos productos, el usuario elige, se calcula
un total, y todo eso queda guardado.

```
┌────────────────────┐     ┌────────────────────┐     ┌────────────────────┐
│  FRONTEND (React)  │     │ BACKEND (FastAPI)  │     │  DB (PostgreSQL)   │
│  localhost:5173    │◄───►│  127.0.0.1:8000    │◄───►│  localhost:5432    │
│                    │JSON │                    │ SQL │  dentro de Docker  │
│ - lista productos  │     │ - lee/escribe DB   │     │                    │
│ - botón "Agregar"  │     │ - calcula el total │     │ - tabla productos  │
│ - muestra la cesta │     │ - valida datos     │     │ - tabla cesta      │
└────────────────────┘     └────────────────────┘     └────────────────────┘
   tu navegador              tu máquina (venv)          contenedor Docker
```

Fijate que es el dibujo de la GUIA-00 completo: las tres capas. La diferencia es que esta vez las
escribís vos.

**Dos reglas de diseño que no se negocian:**

1. **El total se calcula en el backend**, nunca en el frontend. Acordate de la regla de oro de la
   GUIA-00: si el precio se calculara en React, cualquiera abre las DevTools y se compra un coche
   por un euro.
2. **El frontend nunca habla con la base de datos.** Solo habla con el backend. La flecha
   `React ──► PostgreSQL` no existe y no debe existir nunca.

---

# Por qué esta tarea y no otra

Cuatro motivos:

1. **Junta todo lo de la GUIA-01** en un solo proyecto: terminal, venv, FastAPI, React, Bootstrap.
2. **Te obliga a que las tres capas se hablen**, que es donde de verdad se entiende qué es una API.
   Hasta ahora los levantaste por separado.
3. **Te mete una base de datos real en Docker**, que es como se trabaja en cualquier empresa hoy.
4. **Te mete GitHub**, la herramienta que vas a usar todos los días del resto de tu carrera y de la
   que ahora mismo no sabés nada. Ninguna empresa te contrata sin esto.

---

# ⚠️ Aviso: esta app NO tiene seguridad

Esto es **a propósito**, y quiero que lo tengas claro desde el principio.

Esta app no tiene:

- login ni usuarios,
- contraseñas,
- permisos,
- protección de ningún tipo.

Hay **una sola cesta global**: si dos personas abrieran la app a la vez, compartirían la misma. En
un SaaS de verdad cada usuario tiene la suya, y para eso hace falta autenticación (JWT, sesiones,
hashing de contraseñas), que es un módulo entero más adelante.

Meter todo eso ahora te haría fracasar en la tarea: son demasiados conceptos nuevos de golpe. Lo
que sí tenés que hacer es **saber que falta**. Si alguna vez en una entrevista te preguntan por
este proyecto, la respuesta correcta no es "no sabía", es:

> "No tiene auth a propósito, era una práctica de integración FE-BE-DB. Para hacerlo multiusuario
> habría que añadir usuarios, login con JWT y asociar cada cesta a un usuario."

Esa respuesta vale oro. La otra te hunde.

---

# Parte 0 — GitHub desde cero

Esto va primero. Vas a crear el repositorio **antes** de escribir código, porque así vas guardando
el trabajo desde el minuto uno en vez de subir un bulto al final.

## 0.1 Git y GitHub no son lo mismo

Esta confusión la tiene todo el mundo al principio, así que aclarémosla ya:

| | Qué es | Dónde vive |
|---|---|---|
| **Git** | Un programa que guarda el historial de cambios de tus archivos | En tu computadora |
| **GitHub** | Una web donde subís ese historial para tenerlo a salvo y compartirlo | En internet |

Git funciona perfectamente sin internet y sin GitHub. GitHub sin Git no sirve de nada.

La analogía: **Git es escribir el diario. GitHub es la caja fuerte donde lo guardás.**

## 0.2 Los cuatro conceptos que necesitás

No hay más por ahora. No leas tutoriales de ramas todavía.

| Concepto | Qué es | Analogía |
|---|---|---|
| **Repositorio** (*repo*) | La carpeta de tu proyecto, pero con historial | El álbum de fotos |
| **Commit** | Una foto del estado de tus archivos en un momento dado | Una foto del álbum |
| **Push** | Mandar tus commits a GitHub | Subir las fotos a la nube |
| **Clone** | Bajarte a tu máquina un repo que está en GitHub | Descargarte el álbum de otro |

Un commit tiene siempre dos cosas: **los cambios** y **un mensaje** que explica qué hiciste. El
mensaje importa. `"cambios"` no es un mensaje. `"agregar endpoint para vaciar la cesta"` sí lo es.

## 0.3 Crear la cuenta

1. Andá a [github.com](https://github.com) y creá una cuenta.
2. Elegí bien el nombre de usuario: **esto es tu CV.** Los que te van a contratar lo van a mirar.
   `enmanuel-dev` sirve. `xXpro_gamer99Xx` no.
3. Verificá el email.

## 0.4 Configurar Git en tu máquina (una sola vez en la vida)

Git ya lo instalaste en el Módulo 1 de la GUIA-01. Ahora hay que decirle quién sos, para que pueda
firmar tus commits:

```powershell
git config --global user.name "Enmanuel Apellido"
git config --global user.email "el-email-de-tu-cuenta-de-github@ejemplo.com"
```

| Parte | Qué hace |
|---|---|
| `git config` | El comando para configurar Git |
| `--global` | "Para todos mis proyectos", no solo para este |
| `user.email` | **Tiene que ser el mismo email de tu cuenta de GitHub**, o tus commits no se van a asociar a tu perfil |

Comprobá que quedó bien:

```powershell
git config --global --list
```

## 0.5 Crear el repositorio en GitHub

1. En GitHub, botón **New repository**.
2. Nombre: `cesta`
3. Descripción: `Mi primera app full stack: React + FastAPI + PostgreSQL`
4. **Public**.
5. **NO marques** ninguna de las casillas de abajo (README, .gitignore, licencia). Las dejamos
   vacías porque el repo lo vamos a crear desde tu máquina y si GitHub crea archivos, chocan.
6. **Create repository**.

Te va a quedar una página con unos comandos. No los corras todavía; los vemos en la Parte 5.

## 0.6 Crear el proyecto local

```powershell
cd C:\dev
mkdir cesta
cd cesta
git init
```

`git init` convierte esa carpeta normal en un repositorio: crea una carpeta oculta `.git` donde va a
vivir todo el historial. Si borrás `.git`, perdés el historial y vuelve a ser una carpeta normal.

## 0.7 El `.gitignore` — el archivo más importante de esta parte

⚠️ **Leé esto con atención porque es donde falla el 90% de la gente que empieza.**

Hay carpetas que **NUNCA** se suben a GitHub:

| Carpeta | Por qué no |
|---|---|
| `node_modules/` | Son miles de archivos y cientos de megas. Se regeneran con `npm install`. Subirlas es de novato y además revienta el repo. |
| `venv/` | Lo mismo, pero de Python. Se regenera con `pip install`. |
| `__pycache__/` | Archivos temporales de Python. Basura. |
| `.env` | **Acá van las contraseñas y claves.** Si esto se sube a un repo público, te roban las claves en minutos. Hay bots que escanean GitHub buscando exactamente esto. |

El `.gitignore` es un archivo de texto donde listás lo que Git tiene que ignorar. Creá uno en
`C:\dev\cesta\.gitignore` con este contenido:

```gitignore
# Python
venv/
__pycache__/
*.pyc

# Node
node_modules/
dist/

# Entorno y secretos
.env
.env.local

# Sistema
.DS_Store
Thumbs.db

# Editor
.vscode/
```

> El `#` es un comentario, igual que en Python. Las líneas con `/` al final son carpetas.

**Creá el `.gitignore` ANTES de instalar nada.** Si primero instalás y después ignorás, Git ya
"vio" esos archivos y hay que sacarlos a mano, que es un lío innecesario.

## 0.8 Tu primer commit

```powershell
git status
```

Te va a decir que hay un archivo sin seguir (`.gitignore`). `git status` es el comando que más vas a
usar en tu vida: siempre te dice en qué estado estás. **Ante la duda, `git status`.**

```powershell
git add .gitignore
git commit -m "agregar gitignore"
```

| Comando | Qué hace |
|---|---|
| `git add <archivo>` | "Este archivo entra en la próxima foto". Se llama *stage*. |
| `git add .` | El punto significa "todo lo que hay acá". Cuidado con este, mirá siempre `git status` antes. |
| `git commit -m "mensaje"` | Saca la foto. `-m` es el mensaje. |

Ya tenés tu primer commit. Mirá el historial:

```powershell
git log --oneline
```

---

# Parte 1 — La base de datos con Docker

## 1.1 Qué es Docker, en una frase

**Docker es un programa que levanta otros programas ya instalados y configurados, dentro de una
cajita aislada de tu sistema.**

Esa cajita se llama **contenedor**.

La analogía: instalar PostgreSQL a mano en Windows es como montar un mueble de IKEA. Docker es que
te llegue montado, y que puedas tirarlo y pedir otro idéntico en 10 segundos.

## 1.2 Qué vamos a meter en Docker y qué no

⚠️ **Esto es importante que lo entiendas bien**, porque se malinterpreta mucho:

| Pieza | ¿En Docker? | Por qué |
|---|---|---|
| PostgreSQL | ✅ Sí | Instalarlo a mano en Windows es un dolor. En Docker son 8 líneas. |
| Tu backend Python | ❌ No | Lo corrés en tu `venv`, como hasta ahora |
| Tu frontend React | ❌ No | Lo corrés con `npm run dev`, como hasta ahora |

**Solo la base de datos va en Docker.** Tu código sigue corriendo en tu máquina igual que siempre.

Más adelante, cuando lleguemos a despliegue, meteremos también el backend y el frontend en
contenedores. Ahora no: sería añadir un montón de complejidad sin que aprendas nada nuevo, y cada
cambio en tu código te obligaría a reconstruir la imagen.

Regla mental por ahora: **Docker es para las cosas que instalarías, no para el código que escribís.**

## 1.3 Instalar Docker Desktop

```powershell
winget install Docker.DockerDesktop
```

Después de instalarlo:

1. **Reiniciá la computadora.** Sí, de verdad. Docker en Windows necesita WSL2 y no funciona hasta
   que reinicies.
2. Abrí **Docker Desktop** desde el menú de inicio y dejalo abierto.
3. Esperá a que el icono de la ballena deje de moverse.

⚠️ **Docker Desktop tiene que estar abierto** para que los comandos `docker` funcionen. Si lo
cerrás, tu base de datos se apaga. Es el error número uno del primer día.

Comprobá:

```powershell
docker --version
docker ps
```

`docker ps` lista los contenedores corriendo. Ahora mismo va a estar vacío, pero si te responde sin
error, Docker está vivo.

## 1.4 El `docker-compose.yml`

En vez de escribir un comando kilométrico, se describe lo que querés en un archivo. Creá
`C:\dev\cesta\docker-compose.yml`:

```yaml
services:
  db:
    image: postgres:16
    container_name: cesta-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: cesta
      POSTGRES_PASSWORD: cesta
      POSTGRES_DB: cesta
    ports:
      - "5432:5432"
    volumes:
      - datos_cesta:/var/lib/postgresql/data

volumes:
  datos_cesta:
```

Línea por línea, porque esto no se copia sin entender:

| Línea | Qué hace |
|---|---|
| `services:` | La lista de contenedores. Acá solo hay uno. |
| `db:` | El nombre que le doy yo. Podría llamarse `pepe`. |
| `image: postgres:16` | Qué programa levantar. `postgres` es la imagen oficial, `16` la versión. **Siempre poné versión**; si escribís `postgres` a secas, un día cambia sola y te rompe el proyecto. |
| `container_name` | El nombre con el que lo vas a ver en `docker ps`. |
| `restart: unless-stopped` | Que se levante solo al arrancar Docker, salvo que vos lo pares. |
| `environment:` | Variables de configuración. Postgres las lee la primera vez para crear el usuario y la base. |
| `ports: "5432:5432"` | **La línea clave.** Conecta el puerto 5432 de tu máquina con el 5432 del contenedor. Sin esto, la base existe pero no podés llegar a ella. Se lee `"tu_máquina:contenedor"`. |
| `volumes:` | Dónde se guardan los datos **fuera** del contenedor. Sin esto, si borrás el contenedor perdés todo. Con esto, los datos sobreviven. |

Levantala:

```powershell
cd C:\dev\cesta
docker compose up -d
```

- `up` = levantar lo que dice el archivo.
- `-d` = *detached*, en segundo plano. Sin el `-d` te ocuparía la terminal.

Comprobá:

```powershell
docker ps
```

Tenés que ver `cesta-db` con estado `Up`.

## 1.5 Los cuatro comandos de Docker que vas a usar

| Comando | Qué hace |
|---|---|
| `docker compose up -d` | Levantar la base de datos |
| `docker compose down` | Apagarla (los datos se quedan, están en el volumen) |
| `docker ps` | Ver qué está corriendo |
| `docker compose logs db` | Ver qué dice Postgres. Acá mirás cuando algo falla |

Con eso te sobra por ahora. No te metas en Dockerfiles todavía.

## 1.6 Sobre la contraseña

Sí, la contraseña es `cesta` y está escrita en un archivo que vas a subir a GitHub. **Eso solo se
puede hacer porque esta base de datos es local, de mentira, y no tiene ningún dato real.**

En un proyecto de verdad esas credenciales van en un archivo `.env` que **nunca** se sube al repo
—por eso está en el `.gitignore`— y el `docker-compose.yml` las lee de ahí. Lo veremos cuando
lleguemos a despliegue.

Que quede claro el principio: **una credencial de verdad no se escribe nunca en un archivo que va a
Git.**

## 1.7 Commit

```powershell
git add docker-compose.yml
git commit -m "agregar postgres con docker compose"
```

---

# Parte 2 — El backend (FastAPI + PostgreSQL)

## 2.1 Montar el entorno

Desde `C:\dev\cesta`:

```powershell
mkdir backend
cd backend

python -m venv venv
.\venv\Scripts\Activate.ps1
pip install fastapi uvicorn sqlalchemy "psycopg[binary]"
```

Acordate: tenés que ver `(venv)` al principio del prompt. Si no lo ves, no estás dentro del
entorno y `pip install` te va a instalar las cosas donde no debe.

Las dos librerías nuevas:

| Librería | Para qué |
|---|---|
| `sqlalchemy` | El **ORM**: te deja trabajar con la base de datos usando clases de Python en vez de escribir SQL a mano |
| `psycopg[binary]` | El **driver**: el que sabe hablar el idioma concreto de PostgreSQL. SQLAlchemy le da las órdenes, este las traduce |

Guardá las dependencias:

```powershell
pip freeze > requirements.txt
```

Ese archivo dice qué librerías necesita tu proyecto y en qué versión. Es lo que permite que otra
persona (o vos en otra máquina) lo levante con un solo comando. **Este sí se sube a GitHub**, al
revés que `venv/`.

## 2.2 La conexión — `backend/database.py`

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# usuario:contraseña@dónde:puerto/nombre_de_la_base
# Todo esto viene del docker-compose.yml
URL_BASE_DE_DATOS = "postgresql+psycopg://cesta:cesta@localhost:5432/cesta"

engine = create_engine(URL_BASE_DE_DATOS)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


def get_db():
    """Abre una sesión, la presta, y la cierra pase lo que pase."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

| Elemento | Qué es |
|---|---|
| La URL | La dirección de la base. Fijate que cada trozo sale del `docker-compose.yml`: usuario `cesta`, contraseña `cesta`, base `cesta`, puerto 5432 |
| `engine` | El motor: el que mantiene la conexión abierta |
| `SessionLocal` | Una fábrica de **sesiones**. Una sesión es una conversación con la base |
| `Base` | La clase de la que van a heredar tus tablas |
| `yield` en vez de `return` | "Prestá esto, y cuando terminen, seguí ejecutando lo de abajo". El `finally` garantiza que la sesión se cierra aunque haya un error. Si no cerrás sesiones, la base se queda sin conexiones y la app muere |

## 2.3 Las tablas — `backend/models.py`

```python
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    precio = Column(Float, nullable=False)


class ItemCesta(Base):
    __tablename__ = "items_cesta"

    id = Column(Integer, primary_key=True, index=True)
    producto_id = Column(Integer, ForeignKey("productos.id"), nullable=False)

    producto = relationship("Producto")
```

Esto es un **modelo**: una clase de Python que representa una tabla.

| Elemento | Qué es |
|---|---|
| `__tablename__` | Cómo se va a llamar la tabla en PostgreSQL |
| `primary_key=True` | La columna que identifica de forma única cada fila. Postgres la rellena solo, subiendo de uno en uno |
| `nullable=False` | "Esta columna no puede estar vacía". Es una regla que la base hace cumplir, aunque tu código falle |
| `ForeignKey("productos.id")` | **Clave foránea.** Dice: este número tiene que ser el `id` de un producto que exista de verdad. Si intentás guardar un `producto_id` inventado, la base lo rechaza |
| `relationship("Producto")` | Comodidad de SQLAlchemy: te deja escribir `item.producto.nombre` y él hace la consulta por vos |

**Por qué dos tablas y no una:** los productos son el catálogo, existen aunque nadie compre. Los
items de la cesta son lo que alguien eligió. Son cosas distintas y por eso van separadas, unidas por
la clave foránea. Esto es lo más básico del modelado de datos.

## 2.4 La app — `backend/main.py`

```python
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import Base, engine, get_db
import models

app = FastAPI()

# Permite que el frontend (que corre en otro puerto) le hable a este backend.
# Sin esto, el navegador bloquea las peticiones. Lo explico en la Parte 4.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crea las tablas en PostgreSQL si todavía no existen.
Base.metadata.create_all(bind=engine)


class ItemNuevo(BaseModel):
    producto_id: int


@app.on_event("startup")
def cargar_productos_iniciales():
    """Si el catálogo está vacío, lo llena. Solo pasa la primera vez."""
    db = next(get_db())
    if db.query(models.Producto).count() == 0:
        db.add_all([
            models.Producto(nombre="Café", precio=3.50),
            models.Producto(nombre="Té verde", precio=2.80),
            models.Producto(nombre="Chocolate", precio=4.20),
            models.Producto(nombre="Galletas", precio=1.95),
        ])
        db.commit()
    db.close()


@app.get("/productos")
def listar_productos(db: Session = Depends(get_db)):
    """Devuelve el catálogo completo."""
    return db.query(models.Producto).all()


@app.get("/cesta")
def ver_cesta(db: Session = Depends(get_db)):
    """Devuelve lo que hay en la cesta y el total."""
    items = db.query(models.ItemCesta).all()

    respuesta = []
    total = 0
    for item in items:
        respuesta.append({
            "id": item.id,
            "nombre": item.producto.nombre,
            "precio": item.producto.precio,
        })
        total = total + item.producto.precio

    return {"items": respuesta, "total": round(total, 2)}


@app.post("/cesta")
def agregar_a_cesta(item: ItemNuevo, db: Session = Depends(get_db)):
    """Agrega un producto a la cesta."""
    producto = db.query(models.Producto).filter(
        models.Producto.id == item.producto_id
    ).first()

    if producto is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    db.add(models.ItemCesta(producto_id=producto.id))
    db.commit()
    return {"ok": True, "agregado": producto.nombre}


@app.delete("/cesta")
def vaciar_cesta(db: Session = Depends(get_db)):
    """Vacía la cesta entera."""
    db.query(models.ItemCesta).delete()
    db.commit()
    return {"ok": True}
```

Levantalo (con Docker corriendo, si no va a dar error de conexión):

```powershell
uvicorn main:app --reload
```

## 2.5 Cómo leer ese código

Lo nuevo respecto a la GUIA-01:

| Elemento | Qué es |
|---|---|
| `db: Session = Depends(get_db)` | **Inyección de dependencias.** Le decís a FastAPI: "antes de ejecutar esta función, llamá a `get_db` y pasame lo que devuelva". Así cada petición tiene su propia sesión y no te la tenés que crear a mano en cada endpoint |
| `Base.metadata.create_all(bind=engine)` | "Mirá mis modelos y creá en Postgres las tablas que falten". Sirve para aprender, pero tiene un problema serio: leé la sección 2.6 |
| `db.query(models.Producto).all()` | Un `SELECT * FROM productos`, pero en Python |
| `.filter(...).first()` | Un `WHERE`, y quedate con el primero. Devuelve `None` si no hay ninguno |
| `db.add(...)` | Preparar una fila para insertar |
| `db.commit()` | **Confirmar.** Hasta que no hacés commit, los cambios no existen de verdad en la base. Si te olvidás del commit, no se guarda nada y no da error: es el fallo más frustrante del principio |
| `class ItemNuevo(BaseModel)` | Un **modelo de Pydantic**. Describe qué forma tiene que tener el JSON que llega. Si el frontend manda otra cosa, FastAPI lo rechaza solo con un 422 |
| `raise HTTPException(404)` | Cortar y devolver un error HTTP en condiciones, en vez de reventar con un 500 |

⚠️ **Ojo con la confusión de nombres:** hay dos tipos de "modelo" en juego. Los de **SQLAlchemy**
(`models.py`) describen tablas de la base. Los de **Pydantic** (`ItemNuevo`) describen la forma del
JSON que entra y sale. Se parecen y hacen cosas distintas.

## 2.6 ⚠️ `create_all` es una muleta: esto en la vida real se hace con Alembic

Quiero que sepas desde ahora que la línea `Base.metadata.create_all(bind=engine)` **no es como se
hace esto en una empresa**. Te la doy porque para arrancar es lo más simple, pero tiene un límite
que vas a chocar la semana que viene.

### El problema, en 30 segundos

`create_all` hace exactamente una cosa: **crea las tablas que no existen**. Y nada más.

**Nunca modifica una tabla que ya existe.**

Probalo cuando termines la tarea, porque verlo vale más que leerlo. Andá a `models.py` y agregale
una columna a `Producto`:

```python
stock = Column(Integer, default=0)
```

Reiniciá el backend. Y ahora fijate bien en lo que pasa:

- No da ningún error.
- No aparece ningún aviso.
- **La columna `stock` no existe en PostgreSQL.**

Después, cuando tu código intente leer `producto.stock`, te va a reventar con un error raro que no
apunta para nada al verdadero problema. Perder una tarde con esto es un rito de paso.

### Por qué no basta con borrar y volver a crear

En tu proyecto de práctica, la solución fácil es tirar la base entera y dejar que `create_all` la
rehaga:

```powershell
docker compose down -v    # el -v borra tambien el volumen: se pierden TODOS los datos
docker compose up -d
```

Eso vale acá, donde los datos son de mentira. **En producción no podés hacer eso**: hay clientes,
pedidos, facturas. Borrar la base para añadir una columna no es una opción.

Y sin embargo el diseño de la base cambia constantemente: añadir un campo, cambiar un tipo, crear
una tabla nueva, poner un índice. Eso pasa cada pocas semanas en cualquier producto vivo.

### Qué es Alembic

**Alembic** es la herramienta que resuelve esto, y es la estándar para SQLAlchemy.

La idea: cada cambio en el diseño de la base se guarda como un **archivo de migración**, con dos
funciones dentro:

```python
def upgrade():
    op.add_column("productos", sa.Column("stock", sa.Integer()))

def downgrade():
    op.drop_column("productos", "stock")
```

- `upgrade()` → aplicar el cambio.
- `downgrade()` → deshacerlo si sale mal.

Esos archivos **viven en tu repositorio, junto al código**, y se revisan en las pull requests como
cualquier otra cosa. La base guarda en una tabla interna en qué versión está, así que sabe cuáles le
faltan por aplicar.

Los tres comandos que vas a usar el día que lleguemos ahí:

| Comando | Qué hace |
|---|---|
| `alembic revision --autogenerate -m "agregar stock"` | Compara tus modelos con la base y escribe el archivo de migración |
| `alembic upgrade head` | Aplica todas las migraciones pendientes |
| `alembic downgrade -1` | Deshace la última |

### La analogía que lo deja claro

**Alembic es Git, pero para la forma de tu base de datos.**

Fijate lo bien que encaja con todo lo de la Parte 0:

| Git | Alembic |
|---|---|
| Historial de cambios de tu código | Historial de cambios del diseño de tu base |
| Commit | Migración |
| `git log` | La cadena de revisiones |
| Volver a un commit anterior | `downgrade` |
| Todo el equipo aplica los mismos commits | Todo el equipo aplica las mismas migraciones |

Y ahí está el motivo de fondo: sin migraciones, **la base de datos de cada compañero de equipo es
distinta**, y la de producción es distinta de todas. Con migraciones, todas pasan exactamente por
los mismos pasos, en el mismo orden. Por eso el despliegue automático puede aplicarlas solo.

### Qué tenés que hacer ahora con esto

**Nada.** No instales Alembic para esta tarea; sería añadir una capa de complejidad que ahora no te
aporta.

Lo único que quiero es que:

1. sepas que `create_all` es una muleta de aprendizaje y **por qué** lo es,
2. entiendas qué problema resuelve Alembic,
3. y que cuando en una entrevista te pregunten "¿cómo gestionás cambios de esquema?", no te quedes
   en blanco. La respuesta es "con migraciones", y sabés el nombre de la herramienta.

Lo vemos en condiciones en el módulo de bases de datos.

## 2.7 Probalo sin frontend

Andá a `http://127.0.0.1:8000/docs`. Esa página la genera FastAPI sola y te deja **probar tu API sin
haber escrito una línea de frontend**. Es la mejor herramienta que tenés para saber si el problema
está en el backend o en el frontend.

Probá en este orden:

1. `GET /productos` → **Try it out** → **Execute**. Tenés que ver los 4 productos, cada uno con su
   `id`.
2. `POST /cesta` con `{"producto_id": 1}` → tenés que ver `"agregado": "Café"`.
3. `GET /cesta` → el café y `total: 3.5`.
4. `POST /cesta` con `{"producto_id": 99}` → un **404**. Ese es el código de la GUIA-00 que significa
   "no encontrado". Está bien que falle: lo programamos para eso.
5. `DELETE /cesta`, y después `GET /cesta` otra vez, para ver que quedó vacía.

## 2.8 La prueba que demuestra que la base de datos sirve

Esto hacelo, es el punto de toda la Parte 1:

1. Agregá dos productos a la cesta.
2. Parale el backend con `Ctrl+C`.
3. Volvé a levantarlo con `uvicorn main:app --reload`.
4. `GET /cesta`.

**Los productos siguen ahí.** Antes de tener base de datos, se habrían perdido, porque vivían en
una variable de Python que muere con el proceso. Ahora viven en PostgreSQL, que es otro programa,
en otro contenedor, con los datos en un volumen del disco.

Eso es exactamente para lo que sirve una base de datos, y no lo entendés del todo hasta que lo ves.

## 2.9 Commit

```powershell
cd C:\dev\cesta
git status
```

⚠️ **Parate acá y mirá bien la salida.** Si aparece `backend/venv/` en la lista, el `.gitignore`
está mal. No sigas hasta arreglarlo.

```powershell
git add .
git commit -m "backend: modelos, conexion a postgres y endpoints de cesta"
```

---

# Parte 3 — El frontend (React)

## 3.1 Crear el proyecto

⚠️ Abrí una **tercera terminal**. La primera tiene `uvicorn`, y Docker corre por su cuenta. Esto es
normal: en desarrollo tenés siempre varias terminales abiertas, una por programa.

```powershell
cd C:\dev\cesta
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm run dev
```

Debería levantar en `http://localhost:5173`.

## 3.2 Meter Bootstrap

Abrí `frontend/index.html` y pegá esta línea dentro del `<head>`:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
```

Es el mismo Bootstrap del Módulo 2 de la GUIA-01, cargado desde internet en vez de descargado.

## 3.3 El código

Abrí `frontend/src/App.jsx`, borrá todo y poné:

```jsx
import { useState, useEffect } from 'react'

const API = 'http://127.0.0.1:8000'

function App() {
  const [productos, setProductos] = useState([])
  const [cesta, setCesta] = useState({ items: [], total: 0 })

  // Se ejecuta una sola vez, cuando el componente aparece en pantalla.
  useEffect(() => {
    cargarProductos()
    cargarCesta()
  }, [])

  function cargarProductos() {
    fetch(`${API}/productos`)
      .then((respuesta) => respuesta.json())
      .then((datos) => setProductos(datos))
  }

  function cargarCesta() {
    fetch(`${API}/cesta`)
      .then((respuesta) => respuesta.json())
      .then((datos) => setCesta(datos))
  }

  function agregar(id) {
    fetch(`${API}/cesta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ producto_id: id }),
    }).then(() => cargarCesta())
  }

  function vaciar() {
    fetch(`${API}/cesta`, { method: 'DELETE' }).then(() => cargarCesta())
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">La Cesta</h1>

      <div className="row">
        <div className="col-md-7">
          <h2 className="h4">Productos</h2>
          <ul className="list-group">
            {productos.map((producto) => (
              <li
                key={producto.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {producto.nombre} — {producto.precio} €
                </span>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => agregar(producto.id)}
                >
                  Agregar
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-5">
          <h2 className="h4">Tu cesta</h2>

          {cesta.items.length === 0 ? (
            <p className="text-muted">Está vacía.</p>
          ) : (
            <ul className="list-group mb-3">
              {cesta.items.map((item) => (
                <li key={item.id} className="list-group-item">
                  {item.nombre} — {item.precio} €
                </li>
              ))}
            </ul>
          )}

          <p className="fs-5">
            <strong>Total: {cesta.total} €</strong>
          </p>

          <button className="btn btn-outline-danger" onClick={vaciar}>
            Vaciar cesta
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
```

## 3.4 Cómo leer ese código

Esto tiene conceptos nuevos de React. Van despacio:

| Elemento | Qué es |
|---|---|
| `useState([])` | El **estado**: datos que, cuando cambian, hacen que React vuelva a dibujar la pantalla. Devuelve dos cosas: el valor y la función para cambiarlo |
| `const [productos, setProductos]` | Se lee: "`productos` es el valor, `setProductos` es cómo lo cambio". **Nunca** hagas `productos = algo`; siempre `setProductos(algo)`, o React no se entera |
| `useEffect(() => {...}, [])` | "Ejecutá esto cuando el componente aparezca". El `[]` del final significa "una sola vez". Sin el `[]` se ejecutaría en bucle infinito |
| `fetch(url)` | Hacer una petición HTTP desde JavaScript. Es el `GET` de la GUIA-00, pero desde código |
| `.then(...)` | `fetch` tarda, así que devuelve una **promesa**. `.then()` es "cuando termine, hacé esto" |
| `respuesta.json()` | Convertir el texto JSON que llegó en un objeto de JavaScript usable |
| `productos.map(...)` | Convertir una lista de datos en una lista de elementos visuales. Así se pintan listas en React |
| `key={producto.id}` | React necesita un identificador único por elemento. Acá usamos el `id` que puso PostgreSQL |
| `onClick={() => agregar(producto.id)}` | Qué hacer al hacer clic. Ojo: `agregar(producto.id)` sin la flecha se ejecutaría solo al dibujar. La flecha crea una función que se ejecuta *después* |
| `{condicion ? A : B}` | Operador ternario: si se cumple, muestro A, si no, B. Así se hace un "if" dentro del JSX |
| `className` | En JSX no se dice `class` porque esa palabra ya la usa JavaScript |

---

# Parte 4 — Conectar los tres

## 4.1 Levantar todo, en este orden

El orden importa: si el backend arranca sin base de datos, revienta.

| # | Qué | Dónde | Comando |
|---|---|---|---|
| 1 | Docker Desktop | Menú de inicio | Abrirlo y esperar a la ballena |
| 2 | PostgreSQL | `C:\dev\cesta` | `docker compose up -d` |
| 3 | Backend | `C:\dev\cesta\backend` con `(venv)` | `uvicorn main:app --reload` |
| 4 | Frontend | `C:\dev\cesta\frontend` | `npm run dev` |

Abrí `http://localhost:5173`. Tenés que ver los productos, poder agregarlos y ver el total subir.

## 4.2 El error que te va a pasar: CORS

Si en `main.py` no estuviera el `CORSMiddleware`, verías la página cargar pero sin productos, y en
la consola del navegador (F12 → Console) un error rojo:

```
Access to fetch at 'http://127.0.0.1:8000/productos' from origin
'http://localhost:5173' has been blocked by CORS policy
```

**Qué está pasando:** el navegador tiene una regla de seguridad. Una página servida desde un sitio
(`localhost:5173`) no puede pedirle datos a otro sitio (`127.0.0.1:8000`) salvo que ese segundo
sitio diga explícitamente "sí, autorizo a ese". Se llama **CORS**.

Existe para que una web maliciosa no pueda hacer peticiones a tu banco usando tus cookies.

El `add_middleware` que ya te puse es esa autorización. Está limitado a `http://localhost:5173` a
propósito: no pongas `allow_origins=["*"]` aunque lo veas en tutoriales. Eso significa "que
cualquiera me llame" y en producción es un agujero.

**Esto te va a volver a pasar el resto de tu vida profesional.** Cuando veas "CORS" en un error, ya
sabés que es el backend el que tiene que autorizar al frontend.

## 4.3 Cómo depurar cuando algo no funciona

Con tres capas, lo primero es **averiguar cuál falla**. En este orden, siempre:

1. **¿Está Docker corriendo?** `docker ps`. Si no aparece `cesta-db`, ahí está el problema.
2. **¿Funciona el backend solo?** Andá a `/docs` y probá el endpoint. Si ahí falla, el problema es
   de Python o de la base, y el frontend no tiene nada que ver.
3. **F12 → pestaña Network.** Hacé clic en el botón que falla y mirá la petición: ¿salió? ¿qué
   código devolvió? Esto es exactamente el ejercicio estrella de la GUIA-00, ahora sobre tu app.
4. **F12 → pestaña Console.** Los errores de JavaScript salen ahí en rojo.

Aprender a localizar la capa que falla **antes** de tocar nada es probablemente la habilidad más
rentable de todo este oficio.

---

# Parte 5 — Subirlo a GitHub

Volvé a la carpeta raíz del proyecto:

```powershell
cd C:\dev\cesta
git status
```

⚠️ Antes de nada, comprobá que **NO** aparecen `node_modules` ni `venv`. Si aparecen, arreglá el
`.gitignore` primero.

```powershell
git add .
git commit -m "frontend: pantalla de cesta conectada al backend"
```

Ahora conectá tu repo local con el de GitHub. Estos comandos están en la página que te quedó
abierta al crear el repositorio; cambiá `TU-USUARIO` por el tuyo:

```powershell
git branch -M main
git remote add origin https://github.com/TU-USUARIO/cesta.git
git push -u origin main
```

| Comando | Qué hace |
|---|---|
| `git branch -M main` | Renombra tu rama principal a `main`, que es el nombre estándar hoy |
| `git remote add origin <url>` | "El repo remoto que se llama `origin` está en esta dirección". `origin` es solo un apodo, es la convención |
| `git push -u origin main` | Subir. El `-u` guarda la relación, para que a partir de ahora te baste con `git push` |

La primera vez se te va a abrir una ventana del navegador para que inicies sesión en GitHub. Es el
Git Credential Manager, que viene con Git para Windows. Autorizá y listo.

Entrá a `https://github.com/TU-USUARIO/cesta` y mirá tu código ahí. **Ese es el momento.** A partir
de ahora tu trabajo existe fuera de tu computadora.

## El ciclo que vas a repetir toda tu vida

```
escribir código  →  git add .  →  git commit -m "qué hice"  →  git push
```

Hacelo cada vez que termines algo que funcione. No una vez al día: cada pieza que funciona es un
commit. Si rompés algo, siempre podés volver a un commit anterior.

---

# 🔧 Lo que tenés que hacer vos

Todo lo de arriba era para dejarte la base montada. **Esto es la tarea de verdad.** Cada punto es un
commit con su mensaje.

## Obligatorio

- [ ] **T1 — README.md**
      Creá un `README.md` en la raíz que explique: qué es el proyecto, qué tecnologías usa y **cómo
      levantarlo paso a paso**, incluyendo el `docker compose up -d`. Escribilo pensando en alguien
      que se acaba de clonar el repo y no sabe nada. Esto es lo primero que mira un reclutador.

- [ ] **T2 — Quitar un producto de la cesta**
      Endpoint `DELETE /cesta/{item_id}` que borre **un solo** item, y un botón "Quitar" en cada
      línea de la cesta.
      Pista: buscalo con `.filter(models.ItemCesta.id == item_id).first()`, y si no existe devolvé
      un 404. Acordate del `db.commit()`.

- [ ] **T3 — Contador de productos**
      Que la cesta muestre cuántos artículos hay, no solo el total en euros. Decidí vos si lo
      calcula el backend o el frontend, **y escribí en el README por qué lo decidiste así**. No hay
      una única respuesta correcta; quiero el razonamiento.

- [ ] **T4 — Un producto más**
      Agregá un quinto producto al catálogo.
      ⚠️ Ojo: la función `cargar_productos_iniciales` solo mete productos **si la tabla está
      vacía**, así que reiniciar el backend no va a bastar. Vas a tener que decidir cómo meterlo.
      Pensá qué opciones tenés — el problema es más interesante que la solución.

- [ ] **T5 — Manejar el error de conexión**
      Ahora mismo, si el backend está apagado, la página se queda en blanco sin explicar nada.
      Hacé que muestre "No se pudo conectar con el servidor".
      Pista: `fetch(...).then(...).catch((error) => ...)`.

- [ ] **T6 — Endpoint de salud**
      Un `GET /health` que devuelva `{"estado": "ok"}` solo si la base de datos responde de verdad.
      Esto se usa en todas las empresas para que el sistema sepa si tu app está viva.
      Pista: hacé una consulta cualquiera dentro de un `try/except`.

- [ ] **T7 — Mínimo 8 commits** con mensajes que se entiendan. Nada de `"cambios"`, `"update"` ni
      `"asdf"`.

## Opcional (si te sobra tiempo)

- [ ] **T8** — Que si agregás dos veces el mismo producto, aparezca una sola línea con "x2". Es más
      difícil de lo que parece: pensá si cambia el modelo de datos o solo la consulta.
- [ ] **T9** — Un campo de búsqueda que filtre el catálogo mientras escribís.
- [ ] **T10** — Un endpoint `POST /productos` para dar de alta productos nuevos desde `/docs`, y una
      pantalla en React para hacerlo. Esto ya es un CRUD completo.

---

# Criterios de entrega

Me mandás **el enlace a tu repositorio de GitHub**. Nada más: ni un zip, ni capturas.

Voy a mirar esto:

| # | Criterio |
|---|---|
| 1 | El repo **no** tiene `node_modules` ni `venv` subidos |
| 2 | Está el `docker-compose.yml` |
| 3 | Hay un `requirements.txt` en `backend/` |
| 4 | Hay un `README.md` que me permite levantar el proyecto sin preguntarte nada |
| 5 | Hay al menos 8 commits con mensajes que se entienden |
| 6 | Me clono el repo, sigo tu README, y la app funciona |
| 7 | Las tareas T1 a T7 están hechas |
| 8 | El total se calcula en el backend |
| 9 | Los datos sobreviven a reiniciar el backend |

El criterio 6 es el importante. Es exactamente lo que pasa cuando entrás a una empresa: te dan un
repo y te tenés que apañar con lo que hay escrito.

**Antes de mandármelo**, hacé esta prueba vos mismo:

```powershell
git clone https://github.com/TU-USUARIO/cesta.git C:\dev\prueba
```

Seguí tu propio README a rajatabla, sin usar nada que sepas de memoria, y comprobá que arranca. Te
vas a llevar sorpresas, y es mejor que te las lleves vos antes que yo.

---

# Errores comunes y cómo leerlos

| Lo que ves | Qué significa | Qué hacer |
|---|---|---|
| `connection to server at "localhost", port 5432 failed` | La base no está corriendo | `docker ps`. ¿Está Docker Desktop abierto? |
| `docker: error during connect` | Docker Desktop está cerrado | Abrilo y esperá a la ballena |
| `port is already allocated` | Ya hay algo en el 5432 | `docker ps` para ver si lo levantaste dos veces |
| `has been blocked by CORS policy` | El backend no autoriza al frontend | Revisá el `add_middleware` y que el puerto coincida |
| `Failed to fetch` | El backend no está corriendo, o la URL está mal | Mirá la terminal del backend. ¿Sigue viva? |
| `ModuleNotFoundError: No module named 'fastapi'` | Instalaste fuera del venv, o no lo activaste | ¿Ves `(venv)` en el prompt? |
| `Activate.ps1 cannot be loaded` | Permisos de PowerShell | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| `port 8000 is already in use` | Ya hay un uvicorn corriendo | Buscá la otra terminal y `Ctrl+C` |
| Guardaste algo y no aparece | Te faltó el `db.commit()` | Es el error más común con SQLAlchemy |
| `ForeignKeyViolation` | Intentaste guardar un `producto_id` que no existe | La base te está protegiendo. Está bien que falle |
| `Each child in a list should have a unique "key" prop` | Falta el `key` en un `.map()` | Poné `key={algo único}` |
| `Cannot read properties of undefined` | Usás un dato que todavía no llegó del backend | Fijate el valor inicial del `useState` |
| `422 Unprocessable Entity` | El JSON no tiene la forma del modelo Pydantic | Mirá en Network qué mandaste exactamente |
| `fatal: remote origin already exists` | Ya habías hecho el `remote add` | `git remote -v` para ver cómo quedó |
| `Updates were rejected` | Hay cosas en GitHub que no tenés en local | `git pull` primero |

**La regla de siempre:** leé el error entero, y empezá por la última línea. Ahí suele estar lo que de
verdad pasó.

---

# Glosario

| Término | Significado |
|---|---|
| **Repositorio** | Carpeta de proyecto con historial de cambios |
| **Commit** | Foto guardada del estado del proyecto, con un mensaje |
| **Push** | Subir tus commits a GitHub |
| **Clone** | Descargar un repo de GitHub a tu máquina |
| **Remote / origin** | El repo en GitHub al que apunta el tuyo local |
| **`.gitignore`** | Lista de lo que Git tiene que ignorar |
| **Stage** | Marcar archivos para que entren en el próximo commit (`git add`) |
| **Contenedor** | Un programa corriendo aislado, gestionado por Docker |
| **Imagen** | La plantilla de la que nace un contenedor (`postgres:16`) |
| **Volumen** | Carpeta donde el contenedor guarda datos para que sobrevivan si lo borrás |
| **ORM** | Traductor entre clases de Python y tablas de SQL. Acá, SQLAlchemy |
| **Driver** | La librería que sabe hablar con una base concreta. Acá, psycopg |
| **Sesión** | Una conversación abierta con la base de datos |
| **Commit (de base de datos)** | Confirmar los cambios. **Ojo: no tiene nada que ver con el commit de Git** |
| **Clave primaria** | La columna que identifica cada fila de forma única |
| **Clave foránea** | Columna que apunta a la clave primaria de otra tabla |
| **Migración** | Un cambio del diseño de la base guardado como archivo, con su `upgrade` y su `downgrade`. Sección 2.6 |
| **Alembic** | La herramienta de migraciones de SQLAlchemy. "Git para la forma de tu base de datos" |
| **Esquema** | El diseño de la base: qué tablas hay, con qué columnas y de qué tipo |
| **CORS** | Regla del navegador sobre quién puede pedirle datos a quién |
| **Middleware** | Código que se ejecuta entre que llega la petición y responde tu función |
| **Endpoint** | Una dirección concreta de tu API (`/productos`, `/cesta`) |
| **Inyección de dependencias** | Que el framework te pase lo que necesitás (`Depends`) en vez de crearlo vos |
| **Estado (state)** | Datos de React que, al cambiar, redibujan la pantalla |
| **Hook** | Función de React que empieza por `use` (`useState`, `useEffect`) |
| **Promesa** | Un valor que todavía no llegó. Se maneja con `.then()` |
| **Pydantic** | Librería que valida la forma de los datos que entran a FastAPI |

---

# Checklist

## Parte 0 — GitHub
- [ ] Cuenta de GitHub creada
- [ ] `git config` con nombre y email
- [ ] Repo `cesta` creado en GitHub, vacío
- [ ] `git init` en `C:\dev\cesta`
- [ ] `.gitignore` creado **antes** de instalar nada
- [ ] Primer commit hecho

## Parte 1 — Docker y base de datos
- [ ] Docker Desktop instalado y la máquina reiniciada
- [ ] `docker-compose.yml` escrito y entendido línea por línea
- [ ] `docker compose up -d` funciona
- [ ] `docker ps` me muestra `cesta-db` en `Up`
- [ ] Entiendo por qué solo la DB va en Docker y mi código no

## Parte 2 — Backend
- [ ] `venv` creado y activado (veo `(venv)`)
- [ ] `fastapi`, `uvicorn`, `sqlalchemy` y `psycopg` instalados
- [ ] `requirements.txt` generado
- [ ] `database.py`, `models.py` y `main.py` escritos
- [ ] Los endpoints probados en `/docs`
- [ ] **Hice la prueba de la sección 2.8 y los datos sobrevivieron**
- [ ] Entiendo la diferencia entre modelo de SQLAlchemy y modelo de Pydantic
- [ ] Sé por qué `create_all` no vale en producción y qué resuelve Alembic

## Parte 3 — Frontend
- [ ] Proyecto Vite creado
- [ ] Bootstrap enlazado en `index.html`
- [ ] `App.jsx` escrito
- [ ] Entiendo qué hace `useState` y qué hace `useEffect`

## Parte 4 — Conexión
- [ ] Las tres capas corriendo a la vez
- [ ] Puedo agregar productos y ver el total
- [ ] Entiendo qué es CORS y por qué existe
- [ ] Sé localizar en qué capa está el fallo antes de tocar nada

## Parte 5 — Entrega
- [ ] `git push` hecho, veo el código en github.com
- [ ] `node_modules` y `venv` NO están en el repo
- [ ] T1 a T7 completadas
- [ ] Cloné mi propio repo en otra carpeta y arranca siguiendo mi README

---

> **Si te trabás más de 40 minutos en el mismo punto, escribime.** Pero mandame las tres cosas: qué
> estabas haciendo, el error completo copiado, y qué probaste. Con eso te contesto en dos minutos;
> sin eso, tardamos media hora en averiguar dónde estás.
