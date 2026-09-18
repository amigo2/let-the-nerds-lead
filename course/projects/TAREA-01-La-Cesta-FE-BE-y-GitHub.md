# Assignment 01 — "The Basket": your first complete app (FE + BE + DB + GitHub)

> For Enmanuel. Created 31 July 2026.
>
> **Before this you have to have finished [GUIA-01](../guides/GUIA-01-Que-es-una-App-Web-FE-y-BE.md) and
> [GUIA-02](../guides/GUIA-02-Terminal-y-Primeros-Proyectos.md).** Everything here builds on those.
>
> This is no longer a guide: it is an **assignment**. Some things are given to you done so you do
> not get stuck, and some are marked **🔧 YOUR TURN** and you have to solve them yourself. Those
> are the ones that count.
>
> Estimated time: between 10 and 15 hours spread over several days. Do not do it in one sitting.

---

## Index

- [What you are going to build](#what-you-are-going-to-build)
- [Why this assignment and not another](#why-this-assignment-and-not-another)
- [Warning: this app has NO security](#warning-this-app-has-no-security)
- [Part 0 — GitHub from scratch](#part-0--github-from-scratch)
- [Part 1 — The database with Docker](#part-1--the-database-with-docker)
- [Part 2 — The backend (FastAPI + PostgreSQL)](#part-2--the-backend-fastapi--postgresql)
- [Part 3 — The frontend (React)](#part-3--the-frontend-react)
- [Part 4 — Connecting the three](#part-4--connecting-the-three)
- [Part 5 — Pushing it to GitHub](#part-5--pushing-it-to-github)
- [🔧 What you have to do yourself](#-what-you-have-to-do-yourself)
- [Submission criteria](#submission-criteria)
- [Common errors and how to read them](#common-errors-and-how-to-read-them)
- [Glossary](#glossary)
- [Checklist](#checklist)

---

# What you are going to build

A **shopping basket** with a real database. It sounds trivial, but it is literally the skeleton of
almost any SaaS sold today: there are some products, the user chooses, a total is calculated, and
all of it is stored.

```
┌────────────────────┐     ┌────────────────────┐     ┌────────────────────┐
│  FRONTEND (React)  │     │ BACKEND (FastAPI)  │     │  DB (PostgreSQL)   │
│  localhost:5173    │◄───►│  127.0.0.1:8000    │◄───►│  localhost:5432    │
│                    │JSON │                    │ SQL │  inside Docker     │
│ - product list     │     │ - reads/writes DB  │     │                    │
│ - "Add" button     │     │ - computes total   │     │ - products table   │
│ - shows the basket │     │ - validates data   │     │ - basket table     │
└────────────────────┘     └────────────────────┘     └────────────────────┘
   your browser              your machine (venv)        Docker container
```

Notice it is the complete drawing from GUIA-01: the three layers. The difference is that this time
you write them.

**Two design rules that are not up for negotiation:**

1. **The total is calculated in the backend**, never in the frontend. Remember the golden rule from
   GUIA-01: if the price were calculated in React, anyone could open the DevTools and buy a car for
   one euro.
2. **The frontend never talks to the database.** It only talks to the backend. The arrow
   `React ──► PostgreSQL` does not exist and must never exist.

---

# Why this assignment and not another

Four reasons:

1. **It brings together everything from GUIA-02** in a single project: terminal, venv, FastAPI,
   React, Bootstrap.
2. **It forces the three layers to talk to each other**, which is where you really understand what
   an API is. Until now you started them separately.
3. **It puts a real database in Docker**, which is how any company works today.
4. **It puts you on GitHub**, the tool you will use every day for the rest of your career and about
   which you currently know nothing. No company hires you without this.

---

# Warning: this app has NO security

> ⚠️ This app is deliberately insecure. Read this section before you start.

This is **on purpose**, and I want it clear from the start.

This app has no:

- login or users,
- passwords,
- permissions,
- protection of any kind.

There is **a single global basket**: if two people opened the app at once, they would share it. In a
real SaaS every user has their own, and that needs authentication (JWT, sessions, password hashing),
which is a whole module later on.

Putting all that in now would make you fail the assignment: too many new concepts at once. What you
do have to do is **know that it is missing**. If someone in an interview ever asks you about this
project, the correct answer is not "I did not know", it is:

> "It has no auth on purpose, it was an FE-BE-DB integration exercise. To make it multi-user you
> would add users, JWT login, and associate each basket with a user."

That answer is worth gold. The other one sinks you.

---

# Part 0 — GitHub from scratch

This comes first. You are going to create the repository **before** writing code, because that way
you save your work from minute one instead of uploading a lump at the end.

## 0.1 Git and GitHub are not the same thing

Everyone gets this confused at the start, so let us clear it up now:

| | What it is | Where it lives |
|---|---|---|
| **Git** | A program that stores the change history of your files | On your computer |
| **GitHub** | A website where you upload that history to keep it safe and share it | On the internet |

Git works perfectly without the internet and without GitHub. GitHub without Git is useless.

The analogy: **Git is writing the diary. GitHub is the safe you keep it in.**

## 0.2 The four concepts you need

There are no more for now. Do not read branch tutorials yet.

| Concept | What it is | Analogy |
|---|---|---|
| **Repository** (*repo*) | Your project folder, but with history | The photo album |
| **Commit** | A photo of the state of your files at a given moment | A photo in the album |
| **Push** | Sending your commits to GitHub | Uploading the photos to the cloud |
| **Clone** | Downloading to your machine a repo that is on GitHub | Downloading someone else's album |

A commit always has two things: **the changes** and **a message** explaining what you did. The
message matters. `"changes"` is not a message. `"add endpoint to empty the basket"` is.

## 0.3 Create the account

1. Go to [github.com](https://github.com) and create an account.
2. Choose the username carefully: **this is your CV.** The people who will hire you are going to
   look at it. `enmanuel-dev` works. `xXpro_gamer99Xx` does not.
3. Verify the email.

## 0.4 Configure Git on your machine (once in your life)

You already installed Git in Module 1 of GUIA-02. Now you have to tell it who you are, so it can
sign your commits:

```powershell
git config --global user.name "Enmanuel Surname"
git config --global user.email "your-github-account-email@example.com"
```

| Part | What it does |
|---|---|
| `git config` | The command for configuring Git |
| `--global` | "For all my projects", not just this one |
| `user.email` | **It has to be the same email as your GitHub account**, or your commits will not be associated with your profile |

Check that it worked:

```powershell
git config --global --list
```

## 0.5 Create the repository on GitHub

1. On GitHub, the **New repository** button.
2. Name: `basket`
3. Description: `My first full stack app: React + FastAPI + PostgreSQL`
4. **Public**.
5. **Do NOT tick** any of the boxes below (README, .gitignore, licence). We leave them empty because
   we are going to create the repo from your machine, and if GitHub creates files they collide.
6. **Create repository**.

You will end up on a page with some commands. Do not run them yet; we cover them in Part 5.

## 0.6 Create the local project

```powershell
cd C:\dev
mkdir basket
cd basket
git init
```

`git init` turns that ordinary folder into a repository: it creates a hidden `.git` folder where all
the history will live. If you delete `.git`, you lose the history and it goes back to being an
ordinary folder.

## 0.7 The `.gitignore` — the most important file in this part

⚠️ **Read this carefully because it is where 90% of people starting out go wrong.**

There are folders that are **NEVER** pushed to GitHub:

| Folder | Why not |
|---|---|
| `node_modules/` | Thousands of files and hundreds of megabytes. They regenerate with `npm install`. Pushing them is a rookie move and it wrecks the repo. |
| `venv/` | The same, but for Python. It regenerates with `pip install`. |
| `__pycache__/` | Python temporary files. Rubbish. |
| `.env` | **This is where passwords and keys live.** If this goes into a public repo, your keys are stolen within minutes. There are bots scanning GitHub for exactly this. |

The `.gitignore` is a text file where you list what Git has to ignore. Create one at
`C:\dev\basket\.gitignore` with this content:

```gitignore
# Python
venv/
__pycache__/
*.pyc

# Node
node_modules/
dist/

# Environment and secrets
.env
.env.local

# System
.DS_Store
Thumbs.db

# Editor
.vscode/
```

> The `#` is a comment, just like in Python. Lines with a `/` at the end are folders.

**Create the `.gitignore` BEFORE installing anything.** If you install first and ignore afterwards,
Git has already "seen" those files and you have to remove them by hand, which is a needless mess.

## 0.8 Your first commit

```powershell
git status
```

It will tell you there is an untracked file (`.gitignore`). `git status` is the command you will use
most in your life: it always tells you what state you are in. **When in doubt, `git status`.**

```powershell
git add .gitignore
git commit -m "add gitignore"
```

| Command | What it does |
|---|---|
| `git add <file>` | "This file goes into the next photo". It is called *staging*. |
| `git add .` | The dot means "everything here". Be careful with this one, always look at `git status` first. |
| `git commit -m "message"` | Takes the photo. `-m` is the message. |

You already have your first commit. Look at the history:

```powershell
git log --oneline
```

---

# Part 1 — The database with Docker

## 1.1 What Docker is, in one sentence

**Docker is a program that starts other programs, already installed and configured, inside a little
box isolated from your system.**

That little box is called a **container**.

The analogy: installing PostgreSQL by hand on Windows is like assembling IKEA furniture. Docker is
having it arrive assembled, and being able to throw it away and ask for an identical one in 10
seconds.

## 1.2 What we are going to put in Docker and what we are not

⚠️ **It is important you understand this properly**, because it is widely misread:

| Piece | In Docker? | Why |
|---|---|---|
| PostgreSQL | ✅ Yes | Installing it by hand on Windows is painful. In Docker it is 8 lines. |
| Your Python backend | ❌ No | You run it in your `venv`, as you have been doing |
| Your React frontend | ❌ No | You run it with `npm run dev`, as you have been doing |

**Only the database goes in Docker.** Your code keeps running on your machine just as always.

Later on, when we reach deployment, we will put the backend and the frontend in containers too. Not
now: it would add a lot of complexity without you learning anything new, and every change in your
code would force you to rebuild the image.

Mental rule for now: **Docker is for the things you would install, not for the code you write.**

## 1.3 Install Docker Desktop

```powershell
winget install Docker.DockerDesktop
```

After installing it:

1. **Restart the computer.** Yes, really. Docker on Windows needs WSL2 and does not work until you
   restart.
2. Open **Docker Desktop** from the start menu and leave it open.
3. Wait until the whale icon stops moving.

⚠️ **Docker Desktop has to be open** for the `docker` commands to work. If you close it, your
database shuts down. It is the number one error of day one.

Check:

```powershell
docker --version
docker ps
```

`docker ps` lists the running containers. Right now it will be empty, but if it answers without an
error, Docker is alive.

## 1.4 The `docker-compose.yml`

Instead of writing an enormous command, you describe what you want in a file. Create
`C:\dev\basket\docker-compose.yml`:

```yaml
services:
  db:
    image: postgres:16
    container_name: basket-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: basket
      POSTGRES_PASSWORD: basket
      POSTGRES_DB: basket
    ports:
      - "5432:5432"
    volumes:
      - basket_data:/var/lib/postgresql/data

volumes:
  basket_data:
```

Line by line, because this is not copied without understanding it:

| Line | What it does |
|---|---|
| `services:` | The list of containers. There is only one here. |
| `db:` | The name I give it. It could be called `bob`. |
| `image: postgres:16` | Which program to start. `postgres` is the official image, `16` the version. **Always put a version**; if you write plain `postgres`, one day it changes by itself and breaks your project. |
| `container_name` | The name you will see it under in `docker ps`. |
| `restart: unless-stopped` | Start it automatically when Docker starts, unless you stopped it yourself. |
| `environment:` | Configuration variables. Postgres reads them the first time to create the user and the database. |
| `ports: "5432:5432"` | **The key line.** It connects port 5432 on your machine with 5432 in the container. Without this the database exists but you cannot reach it. It reads `"your_machine:container"`. |
| `volumes:` | Where the data is stored **outside** the container. Without this, if you delete the container you lose everything. With it, the data survives. |

Start it:

```powershell
cd C:\dev\basket
docker compose up -d
```

- `up` = start what the file describes.
- `-d` = *detached*, in the background. Without the `-d` it would occupy the terminal.

Check:

```powershell
docker ps
```

You have to see `basket-db` with status `Up`.

## 1.5 The four Docker commands you will use

| Command | What it does |
|---|---|
| `docker compose up -d` | Start the database |
| `docker compose down` | Shut it down (the data stays, it is in the volume) |
| `docker ps` | See what is running |
| `docker compose logs db` | See what Postgres says. This is where you look when something fails |

That is plenty for now. Do not get into Dockerfiles yet.

## 1.6 About the password

Yes, the password is `basket` and it is written in a file you are going to push to GitHub. **That is
only acceptable because this database is local, fake, and has no real data in it.**

In a real project those credentials go in a `.env` file that is **never** pushed to the repo — that
is why it is in the `.gitignore` — and the `docker-compose.yml` reads them from there. We will cover
it when we reach deployment.

Let the principle be clear: **a real credential is never written in a file that goes into Git.**

## 1.7 Commit

```powershell
git add docker-compose.yml
git commit -m "add postgres with docker compose"
```

---

# Part 2 — The backend (FastAPI + PostgreSQL)

## 2.1 Set up the environment

From `C:\dev\basket`:

```powershell
mkdir backend
cd backend

python -m venv venv
.\venv\Scripts\Activate.ps1
pip install fastapi uvicorn sqlalchemy "psycopg[binary]"
```

Remember: you have to see `(venv)` at the start of the prompt. If you do not see it, you are not
inside the environment and `pip install` will install things where it should not.

The two new libraries:

| Library | What for |
|---|---|
| `sqlalchemy` | The **ORM**: lets you work with the database using Python classes instead of writing SQL by hand |
| `psycopg[binary]` | The **driver**: the one that knows how to speak PostgreSQL's specific language. SQLAlchemy gives the orders, this translates them |

Save the dependencies:

```powershell
pip freeze > requirements.txt
```

That file says which libraries your project needs and at which version. It is what lets another
person (or you on another machine) start it with a single command. **This one does get pushed to
GitHub**, unlike `venv/`.

## 2.2 The connection — `backend/database.py`

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# user:password@where:port/database_name
# All of this comes from the docker-compose.yml
DATABASE_URL = "postgresql+psycopg://basket:basket@localhost:5432/basket"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


def get_db():
    """Opens a session, lends it out, and closes it whatever happens."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

| Element | What it is |
|---|---|
| The URL | The address of the database. Notice every piece comes from the `docker-compose.yml`: user `basket`, password `basket`, database `basket`, port 5432 |
| `engine` | The motor: the thing that keeps the connection open |
| `SessionLocal` | A factory of **sessions**. A session is a conversation with the database |
| `Base` | The class your tables are going to inherit from |
| `yield` instead of `return` | "Lend this out, and when they are done, carry on running what is below". The `finally` guarantees the session is closed even if there is an error. If you do not close sessions, the database runs out of connections and the app dies |

## 2.3 The tables — `backend/models.py`

```python
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)


class BasketItem(Base):
    __tablename__ = "basket_items"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)

    product = relationship("Product")
```

This is a **model**: a Python class that represents a table.

| Element | What it is |
|---|---|
| `__tablename__` | What the table will be called in PostgreSQL |
| `primary_key=True` | The column that uniquely identifies each row. Postgres fills it in by itself, counting up one by one |
| `nullable=False` | "This column cannot be empty". It is a rule the database enforces, even if your code fails |
| `ForeignKey("products.id")` | **Foreign key.** It says: this number has to be the `id` of a product that really exists. If you try to save a made-up `product_id`, the database rejects it |
| `relationship("Product")` | SQLAlchemy convenience: it lets you write `item.product.name` and it does the query for you |

**Why two tables and not one:** the products are the catalogue, they exist even if nobody buys. The
basket items are what someone chose. They are different things and that is why they are separate,
joined by the foreign key. This is the most basic bit of data modelling.

## 2.4 The app — `backend/main.py`

```python
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import Base, engine, get_db
import models

app = FastAPI()

# Lets the frontend (running on another port) talk to this backend.
# Without this, the browser blocks the requests. I explain it in Part 4.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Creates the tables in PostgreSQL if they do not exist yet.
Base.metadata.create_all(bind=engine)


class NewItem(BaseModel):
    product_id: int


@app.on_event("startup")
def load_initial_products():
    """If the catalogue is empty, fill it. This only happens the first time."""
    db = next(get_db())
    if db.query(models.Product).count() == 0:
        db.add_all([
            models.Product(name="Coffee", price=3.50),
            models.Product(name="Green tea", price=2.80),
            models.Product(name="Chocolate", price=4.20),
            models.Product(name="Biscuits", price=1.95),
        ])
        db.commit()
    db.close()


@app.get("/products")
def list_products(db: Session = Depends(get_db)):
    """Returns the complete catalogue."""
    return db.query(models.Product).all()


@app.get("/basket")
def view_basket(db: Session = Depends(get_db)):
    """Returns what is in the basket and the total."""
    items = db.query(models.BasketItem).all()

    result = []
    total = 0
    for item in items:
        result.append({
            "id": item.id,
            "name": item.product.name,
            "price": item.product.price,
        })
        total = total + item.product.price

    return {"items": result, "total": round(total, 2)}


@app.post("/basket")
def add_to_basket(item: NewItem, db: Session = Depends(get_db)):
    """Adds a product to the basket."""
    product = db.query(models.Product).filter(
        models.Product.id == item.product_id
    ).first()

    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    db.add(models.BasketItem(product_id=product.id))
    db.commit()
    return {"ok": True, "added": product.name}


@app.delete("/basket")
def empty_basket(db: Session = Depends(get_db)):
    """Empties the whole basket."""
    db.query(models.BasketItem).delete()
    db.commit()
    return {"ok": True}
```

Start it (with Docker running, otherwise you get a connection error):

```powershell
uvicorn main:app --reload
```

## 2.5 How to read that code

What is new compared to GUIA-02:

| Element | What it is |
|---|---|
| `db: Session = Depends(get_db)` | **Dependency injection.** You tell FastAPI: "before running this function, call `get_db` and pass me what it returns". That way each request has its own session and you do not have to create it by hand in every endpoint |
| `Base.metadata.create_all(bind=engine)` | "Look at my models and create in Postgres any tables that are missing". Useful for learning, but it has a serious problem: read section 2.6 |
| `db.query(models.Product).all()` | A `SELECT * FROM products`, but in Python |
| `.filter(...).first()` | A `WHERE`, and keep the first one. Returns `None` if there are none |
| `db.add(...)` | Prepare a row for insertion |
| `db.commit()` | **Confirm.** Until you commit, the changes do not really exist in the database. If you forget the commit, nothing is saved and no error appears: it is the most frustrating failure at the start |
| `class NewItem(BaseModel)` | A **Pydantic model**. It describes what shape the incoming JSON has to have. If the frontend sends something else, FastAPI rejects it by itself with a 422 |
| `raise HTTPException(404)` | Stop and return a proper HTTP error, instead of blowing up with a 500 |

⚠️ **Careful with the name clash:** there are two kinds of "model" in play. The **SQLAlchemy** ones
(`models.py`) describe database tables. The **Pydantic** ones (`NewItem`) describe the shape of the
JSON coming in and going out. They look alike and do different things.

## 2.6 ⚠️ `create_all` is a crutch: in real life this is done with Alembic

I want you to know from now that the line `Base.metadata.create_all(bind=engine)` **is not how this
is done in a company**. I give it to you because it is the simplest way to get going, but it has a
limit you will hit next week.

### The problem, in 30 seconds

`create_all` does exactly one thing: **it creates the tables that do not exist**. And nothing else.

**It never modifies a table that already exists.**

Try it when you finish the assignment, because seeing it is worth more than reading it. Go to
`models.py` and add a column to `Product`:

```python
stock = Column(Integer, default=0)
```

Restart the backend. And now look carefully at what happens:

- No error appears.
- No warning appears.
- **The `stock` column does not exist in PostgreSQL.**

Later, when your code tries to read `product.stock`, it will blow up with a strange error that
points nowhere near the real problem. Losing an afternoon to this is a rite of passage.

### Why deleting and recreating is not enough

In your practice project, the easy fix is to throw the whole database away and let `create_all`
rebuild it:

```powershell
docker compose down -v    # the -v also deletes the volume: ALL data is lost
docker compose up -d
```

That is fine here, where the data is fake. **In production you cannot do that**: there are
customers, orders, invoices. Deleting the database to add a column is not an option.

And yet the design of the database changes constantly: adding a field, changing a type, creating a
new table, adding an index. That happens every few weeks in any living product.

### What Alembic is

**Alembic** is the tool that solves this, and it is the standard one for SQLAlchemy.

The idea: every change to the database design is saved as a **migration file**, with two functions
inside:

```python
def upgrade():
    op.add_column("products", sa.Column("stock", sa.Integer()))

def downgrade():
    op.drop_column("products", "stock")
```

- `upgrade()` → apply the change.
- `downgrade()` → undo it if it goes wrong.

Those files **live in your repository, next to the code**, and are reviewed in pull requests like
anything else. The database stores in an internal table which version it is on, so it knows which
ones it still has to apply.

The three commands you will use the day we get there:

| Command | What it does |
|---|---|
| `alembic revision --autogenerate -m "add stock"` | Compares your models with the database and writes the migration file |
| `alembic upgrade head` | Applies all pending migrations |
| `alembic downgrade -1` | Undoes the last one |

### The analogy that makes it click

**Alembic is Git, but for the shape of your database.**

Notice how well it fits with everything in Part 0:

| Git | Alembic |
|---|---|
| History of changes to your code | History of changes to your database design |
| Commit | Migration |
| `git log` | The chain of revisions |
| Going back to an earlier commit | `downgrade` |
| The whole team applies the same commits | The whole team applies the same migrations |

And there is the underlying reason: without migrations, **every teammate's database is different**,
and production's is different from all of them. With migrations, all of them go through exactly the
same steps, in the same order. That is why automated deployment can apply them on its own.

### What you have to do about this now

**Nothing.** Do not install Alembic for this assignment; it would add a layer of complexity that
does not help you right now.

All I want is for you to:

1. know that `create_all` is a learning crutch and **why** it is one,
2. understand what problem Alembic solves,
3. and, when in an interview they ask "how do you manage schema changes?", not go blank. The answer
   is "with migrations", and you know the name of the tool.

We cover it properly in the databases module.

## 2.7 Test it without a frontend

Go to `http://127.0.0.1:8000/docs`. FastAPI generates that page on its own and lets you **test your
API without having written a line of frontend**. It is the best tool you have for knowing whether
the problem is in the backend or the frontend.

Test in this order:

1. `GET /products` → **Try it out** → **Execute**. You have to see the 4 products, each with its
   `id`.
2. `POST /basket` with `{"product_id": 1}` → you have to see `"added": "Coffee"`.
3. `GET /basket` → the coffee and `total: 3.5`.
4. `POST /basket` with `{"product_id": 99}` → a **404**. That is the code from GUIA-01 that means
   "not found". It is right that it fails: we programmed it to.
5. `DELETE /basket`, and then `GET /basket` again, to see that it is empty.

## 2.8 The test that proves the database is worth having

Do this one, it is the whole point of Part 1:

1. Add two products to the basket.
2. Stop the backend with `Ctrl+C`.
3. Start it again with `uvicorn main:app --reload`.
4. `GET /basket`.

**The products are still there.** Before having a database they would have been lost, because they
lived in a Python variable that dies with the process. Now they live in PostgreSQL, which is another
program, in another container, with the data in a volume on the disk.

That is exactly what a database is for, and you do not fully understand it until you see it.

## 2.9 Commit

```powershell
cd C:\dev\basket
git status
```

⚠️ **Stop here and look carefully at the output.** If `backend/venv/` appears in the list, the
`.gitignore` is wrong. Do not continue until you fix it.

```powershell
git add .
git commit -m "backend: models, postgres connection and basket endpoints"
```

---

# Part 3 — The frontend (React)

## 3.1 Create the project

⚠️ Open a **third terminal**. The first has `uvicorn`, and Docker runs on its own. This is normal: in
development you always have several terminals open, one per program.

```powershell
cd C:\dev\basket
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm run dev
```

It should start at `http://localhost:5173`.

## 3.2 Add Bootstrap

Open `frontend/index.html` and paste this line inside the `<head>`:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
```

It is the same Bootstrap from Module 2 of GUIA-02, loaded from the internet instead of downloaded.

## 3.3 The code

Open `frontend/src/App.jsx`, delete everything and put:

```jsx
import { useState, useEffect } from 'react'

const API = 'http://127.0.0.1:8000'

function App() {
  const [products, setProducts] = useState([])
  const [basket, setBasket] = useState({ items: [], total: 0 })

  // Runs once only, when the component appears on screen.
  useEffect(() => {
    loadProducts()
    loadBasket()
  }, [])

  function loadProducts() {
    fetch(`${API}/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
  }

  function loadBasket() {
    fetch(`${API}/basket`)
      .then((response) => response.json())
      .then((data) => setBasket(data))
  }

  function addItem(id) {
    fetch(`${API}/basket`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: id }),
    }).then(() => loadBasket())
  }

  function emptyBasket() {
    fetch(`${API}/basket`, { method: 'DELETE' }).then(() => loadBasket())
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">The Basket</h1>

      <div className="row">
        <div className="col-md-7">
          <h2 className="h4">Products</h2>
          <ul className="list-group">
            {products.map((product) => (
              <li
                key={product.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {product.name} — {product.price} €
                </span>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => addItem(product.id)}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-5">
          <h2 className="h4">Your basket</h2>

          {basket.items.length === 0 ? (
            <p className="text-muted">It is empty.</p>
          ) : (
            <ul className="list-group mb-3">
              {basket.items.map((item) => (
                <li key={item.id} className="list-group-item">
                  {item.name} — {item.price} €
                </li>
              ))}
            </ul>
          )}

          <p className="fs-5">
            <strong>Total: {basket.total} €</strong>
          </p>

          <button className="btn btn-outline-danger" onClick={emptyBasket}>
            Empty basket
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
```

## 3.4 How to read that code

This has new React concepts. Take them slowly:

| Element | What it is |
|---|---|
| `useState([])` | The **state**: data that, when it changes, makes React redraw the screen. It returns two things: the value and the function for changing it |
| `const [products, setProducts]` | It reads: "`products` is the value, `setProducts` is how I change it". **Never** write `products = something`; always `setProducts(something)`, or React does not find out |
| `useEffect(() => {...}, [])` | "Run this when the component appears". The `[]` at the end means "once only". Without the `[]` it would run in an infinite loop |
| `fetch(url)` | Make an HTTP request from JavaScript. It is the `GET` from GUIA-01, but from code |
| `.then(...)` | `fetch` takes time, so it returns a **promise**. `.then()` is "when it finishes, do this" |
| `response.json()` | Turn the JSON text that arrived into a usable JavaScript object |
| `products.map(...)` | Turn a list of data into a list of visual elements. That is how lists are drawn in React |
| `key={product.id}` | React needs a unique identifier per element. Here we use the `id` PostgreSQL assigned |
| `onClick={() => addItem(product.id)}` | What to do on click. Careful: `addItem(product.id)` without the arrow would run at draw time. The arrow creates a function that runs *afterwards* |
| `{condition ? A : B}` | Ternary operator: if it holds, show A, otherwise B. That is how you do an "if" inside JSX |
| `className` | In JSX you do not say `class` because JavaScript already uses that word |

---

# Part 4 — Connecting the three

## 4.1 Start everything, in this order

The order matters: if the backend starts without a database, it blows up.

| # | What | Where | Command |
|---|---|---|---|
| 1 | Docker Desktop | Start menu | Open it and wait for the whale |
| 2 | PostgreSQL | `C:\dev\basket` | `docker compose up -d` |
| 3 | Backend | `C:\dev\basket\backend` with `(venv)` | `uvicorn main:app --reload` |
| 4 | Frontend | `C:\dev\basket\frontend` | `npm run dev` |

Open `http://localhost:5173`. You have to see the products, be able to add them and watch the total
go up.

## 4.2 The error that will happen to you: CORS

If the `CORSMiddleware` were not in `main.py`, you would see the page load but with no products, and
in the browser console (F12 → Console) a red error:

```
Access to fetch at 'http://127.0.0.1:8000/products' from origin
'http://localhost:5173' has been blocked by CORS policy
```

**What is happening:** the browser has a security rule. A page served from one place
(`localhost:5173`) cannot ask another place (`127.0.0.1:8000`) for data unless that second place
explicitly says "yes, I authorise that one". It is called **CORS**.

It exists so a malicious site cannot make requests to your bank using your cookies.

The `add_middleware` I already gave you is that authorisation. It is limited to
`http://localhost:5173` on purpose: do not put `allow_origins=["*"]` even if you see it in
tutorials. That means "let anyone call me" and in production it is a hole.

**This will keep happening to you for the rest of your professional life.** When you see "CORS" in
an error, you already know it is the backend that has to authorise the frontend.

## 4.3 How to debug when something does not work

With three layers, the first thing is to **work out which one is failing**. In this order, always:

1. **Is Docker running?** `docker ps`. If `basket-db` does not appear, that is the problem.
2. **Does the backend work on its own?** Go to `/docs` and try the endpoint. If it fails there, the
   problem is Python or the database, and the frontend has nothing to do with it.
3. **F12 → Network tab.** Click the button that fails and look at the request: did it go out? what
   code did it return? This is exactly the star exercise from GUIA-01, now on your own app.
4. **F12 → Console tab.** JavaScript errors come out there in red.

Learning to locate the failing layer **before** touching anything is probably the most profitable
skill in this whole craft.

---

# Part 5 — Pushing it to GitHub

Go back to the project's root folder:

```powershell
cd C:\dev\basket
git status
```

⚠️ First of all, check that `node_modules` and `venv` do **NOT** appear. If they do, fix the
`.gitignore` first.

```powershell
git add .
git commit -m "frontend: basket screen connected to the backend"
```

Now connect your local repo to the GitHub one. These commands are on the page left open when you
created the repository; change `YOUR-USERNAME` to yours:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/basket.git
git push -u origin main
```

| Command | What it does |
|---|---|
| `git branch -M main` | Renames your main branch to `main`, which is the standard name today |
| `git remote add origin <url>` | "The remote repo called `origin` is at this address". `origin` is just a nickname, it is the convention |
| `git push -u origin main` | Push. The `-u` remembers the relationship, so from now on `git push` is enough |

The first time, a browser window will open for you to sign in to GitHub. It is the Git Credential
Manager, which comes with Git for Windows. Authorise it and you are done.

Go to `https://github.com/YOUR-USERNAME/basket` and look at your code there. **That is the moment.**
From now on your work exists outside your computer.

## The cycle you will repeat your whole life

```
write code  →  git add .  →  git commit -m "what I did"  →  git push
```

Do it every time you finish something that works. Not once a day: every piece that works is a
commit. If you break something, you can always go back to an earlier commit.

---

# 🔧 What you have to do yourself

Everything above was to get the foundation set up for you. **This is the real assignment.** Each
point is a commit with its message.

## Compulsory

- [ ] **T1 — README.md**
      Create a `README.md` at the root explaining: what the project is, what technologies it uses
      and **how to start it step by step**, including the `docker compose up -d`. Write it thinking
      of someone who has just cloned the repo and knows nothing. This is the first thing a recruiter
      looks at.

- [ ] **T2 — Remove one product from the basket**
      A `DELETE /basket/{item_id}` endpoint that deletes **a single** item, and a "Remove" button on
      each line of the basket.
      Hint: find it with `.filter(models.BasketItem.id == item_id).first()`, and if it does not
      exist return a 404. Remember the `db.commit()`.

- [ ] **T3 — Item counter**
      Make the basket show how many items there are, not just the total in euros. You decide whether
      the backend or the frontend calculates it, **and write in the README why you decided that
      way**. There is no single correct answer; I want the reasoning.

- [ ] **T4 — One more product**
      Add a fifth product to the catalogue.
      ⚠️ Careful: the `load_initial_products` function only inserts products **if the table is
      empty**, so restarting the backend will not be enough. You will have to decide how to get it
      in. Think about what options you have — the problem is more interesting than the solution.

- [ ] **T5 — Handle the connection error**
      Right now, if the backend is off, the page stays blank without explaining anything. Make it
      show "Could not connect to the server".
      Hint: `fetch(...).then(...).catch((error) => ...)`.

- [ ] **T6 — Health endpoint**
      A `GET /health` that returns `{"status": "ok"}` only if the database really answers. This is
      used in every company so the system knows whether your app is alive.
      Hint: make any query inside a `try/except`.

- [ ] **T7 — At least 8 commits** with messages that make sense. No `"changes"`, `"update"` or
      `"asdf"`.

## Optional (if you have time left)

- [ ] **T8** — Make it so that adding the same product twice shows a single line with "x2". It is
      harder than it looks: think about whether the data model changes or only the query.
- [ ] **T9** — A search field that filters the catalogue as you type.
- [ ] **T10** — A `POST /products` endpoint for adding new products from `/docs`, and a React screen
      for doing it. That is already a complete CRUD.

---

# Submission criteria

You send me **the link to your GitHub repository**. Nothing else: no zip, no screenshots.

I am going to look at this:

| # | Criterion |
|---|---|
| 1 | The repo does **not** have `node_modules` or `venv` pushed |
| 2 | The `docker-compose.yml` is there |
| 3 | There is a `requirements.txt` in `backend/` |
| 4 | There is a `README.md` that lets me start the project without asking you anything |
| 5 | There are at least 8 commits with messages that make sense |
| 6 | I clone the repo, follow your README, and the app works |
| 7 | Tasks T1 to T7 are done |
| 8 | The total is calculated in the backend |
| 9 | The data survives restarting the backend |

Criterion 6 is the important one. It is exactly what happens when you join a company: they give you
a repo and you have to manage with what is written.

**Before sending it to me**, do this test yourself:

```powershell
git clone https://github.com/YOUR-USERNAME/basket.git C:\dev\test-clone
```

Follow your own README to the letter, without using anything you know by heart, and check that it
starts. You will get some surprises, and it is better that you get them before I do.

---

# Common errors and how to read them

| What you see | What it means | What to do |
|---|---|---|
| `connection to server at "localhost", port 5432 failed` | The database is not running | `docker ps`. Is Docker Desktop open? |
| `docker: error during connect` | Docker Desktop is closed | Open it and wait for the whale |
| `port is already allocated` | There is already something on 5432 | `docker ps` to see if you started it twice |
| `has been blocked by CORS policy` | The backend does not authorise the frontend | Check the `add_middleware` and that the port matches |
| `Failed to fetch` | The backend is not running, or the URL is wrong | Look at the backend terminal. Is it still alive? |
| `ModuleNotFoundError: No module named 'fastapi'` | You installed outside the venv, or did not activate it | Do you see `(venv)` in the prompt? |
| `Activate.ps1 cannot be loaded` | PowerShell permissions | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| `port 8000 is already in use` | There is already a uvicorn running | Find the other terminal and `Ctrl+C` |
| You saved something and it does not appear | You forgot the `db.commit()` | It is the most common error with SQLAlchemy |
| `ForeignKeyViolation` | You tried to save a `product_id` that does not exist | The database is protecting you. It is right that it fails |
| `Each child in a list should have a unique "key" prop` | The `key` is missing in a `.map()` | Put `key={something unique}` |
| `Cannot read properties of undefined` | You are using data that has not arrived from the backend yet | Check the initial value of the `useState` |
| `422 Unprocessable Entity` | The JSON does not have the shape of the Pydantic model | Look in Network at exactly what you sent |
| `fatal: remote origin already exists` | You had already done the `remote add` | `git remote -v` to see how it ended up |
| `Updates were rejected` | There are things on GitHub you do not have locally | `git pull` first |

**The usual rule:** read the whole error, and start with the last line. That is usually where what
really happened is.

---

# Glossary

| Term | Meaning |
|---|---|
| **Repository** | Project folder with a history of changes |
| **Commit** | A saved photo of the project's state, with a message |
| **Push** | Upload your commits to GitHub |
| **Clone** | Download a repo from GitHub to your machine |
| **Remote / origin** | The GitHub repo your local one points at |
| **`.gitignore`** | List of what Git has to ignore |
| **Stage** | Marking files to go into the next commit (`git add`) |
| **Container** | A program running isolated, managed by Docker |
| **Image** | The template a container is born from (`postgres:16`) |
| **Volume** | Folder where the container stores data so it survives if you delete it |
| **ORM** | Translator between Python classes and SQL tables. Here, SQLAlchemy |
| **Driver** | The library that knows how to talk to a specific database. Here, psycopg |
| **Session** | An open conversation with the database |
| **Commit (database)** | Confirming the changes. **Careful: nothing to do with a Git commit** |
| **Primary key** | The column that uniquely identifies each row |
| **Foreign key** | Column pointing at another table's primary key |
| **Migration** | A change to the database design saved as a file, with its `upgrade` and `downgrade`. Section 2.6 |
| **Alembic** | SQLAlchemy's migration tool. "Git for the shape of your database" |
| **Schema** | The database design: which tables exist, with which columns and of what type |
| **CORS** | Browser rule about who can ask whom for data |
| **Middleware** | Code that runs between the request arriving and your function answering |
| **Endpoint** | A concrete address of your API (`/products`, `/basket`) |
| **Dependency injection** | The framework passing you what you need (`Depends`) instead of you creating it |
| **State** | React data that redraws the screen when it changes |
| **Hook** | A React function starting with `use` (`useState`, `useEffect`) |
| **Promise** | A value that has not arrived yet. Handled with `.then()` |
| **Pydantic** | Library that validates the shape of data coming into FastAPI |

---

# Checklist

## Part 0 — GitHub
- [ ] GitHub account created
- [ ] `git config` with name and email
- [ ] `basket` repo created on GitHub, empty
- [ ] `git init` in `C:\dev\basket`
- [ ] `.gitignore` created **before** installing anything
- [ ] First commit done

## Part 1 — Docker and database
- [ ] Docker Desktop installed and the machine restarted
- [ ] `docker-compose.yml` written and understood line by line
- [ ] `docker compose up -d` works
- [ ] `docker ps` shows me `basket-db` as `Up`
- [ ] I understand why only the DB goes in Docker and my code does not

## Part 2 — Backend
- [ ] `venv` created and activated (I see `(venv)`)
- [ ] `fastapi`, `uvicorn`, `sqlalchemy` and `psycopg` installed
- [ ] `requirements.txt` generated
- [ ] `database.py`, `models.py` and `main.py` written
- [ ] The endpoints tested in `/docs`
- [ ] **I did the section 2.8 test and the data survived**
- [ ] I understand the difference between a SQLAlchemy model and a Pydantic model
- [ ] I know why `create_all` is no good in production and what Alembic solves

## Part 3 — Frontend
- [ ] Vite project created
- [ ] Bootstrap linked in `index.html`
- [ ] `App.jsx` written
- [ ] I understand what `useState` does and what `useEffect` does

## Part 4 — Connection
- [ ] The three layers running at once
- [ ] I can add products and see the total
- [ ] I understand what CORS is and why it exists
- [ ] I can locate which layer the failure is in before touching anything

## Part 5 — Submission
- [ ] `git push` done, I can see the code on github.com
- [ ] `node_modules` and `venv` are NOT in the repo
- [ ] T1 to T7 completed
- [ ] I cloned my own repo into another folder and it starts by following my README

---

> **If you are stuck on the same point for more than 40 minutes, write to me.** But send me the
> three things: what you were doing, the complete error copied out, and what you tried. With that I
> answer you in two minutes; without it, we spend half an hour working out where you are.
