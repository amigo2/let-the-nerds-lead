# Guide 02 — The Terminal and your first projects

> ⚠️ **Before this guide, read [GUIDE-01 — What Is a Web App? FE and BE](GUIDE-01-What-Is-A-Web-App-FE-And-BE.md).**
> That is where the concepts live (client/server, frontend, backend, HTTP, JSON, API) that give
> meaning to every command here. Without them, this guide is a list of commands to memorise;
> with them, you understand what you are asking the machine to do.
>
> Enmanuel's study document. Start date: 31 July 2026.
> Goal: understand the terminal and start three projects from scratch (Bootstrap, FastAPI, React).
>
> **How to use this document:** read it top to bottom, without skipping. Every module has
> exercises. Do not move to the next module until you can do the exercises **without looking at
> your notes**. Tick the boxes `[ ]` → `[x]` as you go.

---

## Index

- [Module 0 — The terminal](#module-0--the-terminal)
- [Module 1 — Installing the tools](#module-1--installing-the-tools)
- [Module 2 — Bootstrap (your first page)](#module-2--bootstrap-your-first-page)
- [Module 3 — FastAPI (your first server)](#module-3--fastapi-your-first-server)
- [Module 4 — React (your first app)](#module-4--react-your-first-app)
- [🎬 Ordered video path](#-ordered-video-path)
- [Command cheat sheet](#command-cheat-sheet)
- [Common errors and how to read them](#common-errors-and-how-to-read-them)
- [Glossary](#glossary)
- [Progress checklist](#progress-checklist)

---

# Module 0 — The terminal

## 0.1 What is it?

A window where you give the computer orders by **typing text**, instead of clicking.

It is not magic and it is not "a hacker thing". It is simply the interface development tools
use, because they have no buttons: creating a project, installing a library or starting a server
are all actions you ask for in text.

The terminal you use on Windows is called **PowerShell**.

## 0.2 The most important idea: the terminal is ALWAYS inside a folder

When you open the terminal, you see something like this:

```
PS C:\Users\enman\OneDrive\Desktop\LEARNING TO PROGRAM>
```

That is called the **prompt**. It is telling you two things:

1. `PS` = you are in PowerShell.
2. `C:\Users\enman\...\LEARNING TO PROGRAM` = **the folder you are standing in right now**.

Every command you type acts on that folder. If you are in the wrong folder, the correct command
will fail, or it will create things in the wrong place.

> 🔑 **Golden rule:** before typing any command, look at the prompt and ask yourself
> *"am I in the right folder?"*. 80% of beginner errors are this.

## 0.3 Anatomy of a command

Every command has the same structure:

```
npm            install          --save-dev
└─ program     └─ argument      └─ flag (option)
```

| Part | What it is | Examples |
|---|---|---|
| **program** | The tool you are invoking | `npm`, `git`, `python`, `cd` |
| **argument** | What it acts on | a folder name, a file, a package |
| **flag** | An option that changes the behaviour. Starts with `-` or `--` | `--version`, `-r`, `--reload` |

**This is what lets you stop copying and pasting blindly.** When you see a command on the
internet, split it into these three parts and you will already sense what it does.

Example: `node --version` → program `node`, flag `--version` → "node, tell me your version".

## 0.4 Moving around: the navigation commands

These four are how you walk around the hard drive.

```powershell
pwd          # "print working directory" -> where am I?
ls           # "list" -> what is in here?
cd folder    # "change directory" -> go into a folder
cd ..        # go up one level (leave the current folder)
```

`..` means "the folder above". It is a concept, not a folder name.

**Paths with spaces:** your folder is called `LEARNING TO PROGRAM`, with spaces. The terminal
uses the space to separate arguments, so it has to go in quotes:

```powershell
cd "LEARNING TO PROGRAM"     # ✅ correct
cd LEARNING TO PROGRAM       # ❌ the terminal reads 3 separate arguments and fails
```

## 0.5 Creating and viewing things

```powershell
mkdir my-project       # create a folder
cat file.txt           # view a file's contents in the terminal
```

## 0.6 The three keys that will save you most often

| Key | What it does | Why it matters |
|---|---|---|
| `Tab` | **Autocompletes** file and folder names | You type `cd my` + `Tab` → it completes `my-project`. Eliminates typos. Use it ALWAYS. |
| `↑` `↓` | Scrolls through the commands you already typed | Do not retype anything. Up arrow and `Enter`. |
| `Ctrl + C` | **Kills** the running process | When you start a server, the terminal stays "busy". This shuts it down. It also rescues anything that has hung. |

## 0.7 What it means when the terminal "gets stuck"

When you run a server (`npm run dev`, `uvicorn ...`), the terminal will print something and then
**sit still, without giving you the prompt back**.

**That is NOT an error.** The server is alive and listening. That terminal is now dedicated to
it. If you want to type other commands, open a **second terminal**. To shut the server down:
`Ctrl + C`.

## 0.8 `localhost` and ports

Servers will give you an address like `http://localhost:5173`.

- **`localhost`** = "this very computer". It is not on the internet, nobody else sees it. It is
  yours.
- **`5173`** = the **port**, like a door number. Each server uses a different one so they do not
  collide. Conventions you will see: `5173` (Vite/React), `8000` (FastAPI), `3000` (Node).

You copy that address into the browser and there is your project.

## 0.9 🎬 Supporting videos

Pick **one** and watch it with the terminal open beside it, pausing to repeat every command.
Do not watch all four: watch one and practise.

> These videos are in **Spanish**; their original titles are kept so you can find them. English
> replacements are on the production list.

| Video | Why this one |
|---|---|
| [¿Cómo se usa la TERMINAL? Tutorial de CMD/PowerShell para PRINCIPIANTES](https://www.youtube.com/watch?v=kfEpjj2NZxU) | **Start here.** It is Windows, same as your machine. |
| [Comandos Básicos de PowerShell en Windows 11 — Guía para Principiantes](https://www.youtube.com/watch?v=6ryVGNDEXj8) | Windows 11 exactly, like yours. |
| [CURSO rápido de TERMINAL y línea de comandos](https://www.youtube.com/watch?v=iZtojEmq--c) | Short, for the general picture fast. |
| [Curso COMPLETO de BASH y la Terminal — desde Cero](https://www.youtube.com/watch?v=ABgLEKFhlZE) | Very complete (~6 h). For later, once you move around on your own. |

> ⚠️ **Important warning:** most terminal courses on YouTube are **Linux/Mac (bash)**, not
> Windows. The commands they teach are almost the same (`ls`, `cd`, `pwd` work the same in your
> PowerShell), but some differ. If a video uses `touch`, `rm -rf` or `grep` and it does not work
> for you, it is not your fault: that is a Linux command. Ask me for the Windows equivalent.

## 0.10 Module 0 exercises

Do them in the terminal, for real. Reading them is not enough.

- [ ] **E0.1** — Open the terminal and run `pwd`. Write below what it answered:
  ```
  answer:
  ```
- [ ] **E0.2** — Run `ls`. Do you see this file (`GUIDE-02-Terminal-And-First-Projects.md`) in the list?
- [ ] **E0.3** — Create a folder called `practice` with `mkdir`, go in with `cd` and confirm with `pwd` that you are inside.
- [ ] **E0.4** — Leave `practice` with `cd ..` and check with `pwd` that you are back.
- [ ] **E0.5** — Type `cd prac` and press `Tab` **without finishing the word**. Watch it complete itself.
- [ ] **E0.6** — Press `↑` three times and watch your previous commands appear.
- [ ] **E0.7** — Run `cat zTODO.md` and read what it prints.

---

# Module 1 — Installing the tools

## 1.1 Starting point (checked on 31/07/2026)

The real state of your machine:

| Tool | State | What you need it for |
|---|---|---|
| Node + npm | ❌ not installed | React |
| Real Python | ❌ not installed (there is only a fake Microsoft Store shortcut) | FastAPI |
| Git | ❌ not installed | Saving versions of your code |

## 1.2 Installing with winget

`winget` is the terminal installer that already ships with Windows. Run these commands **one by
one**, waiting for each to finish:

```powershell
winget install OpenJS.NodeJS.LTS
winget install Python.Python.3.12
winget install Git.Git
```

- `LTS` means *Long Term Support* → the stable, recommended version. Always choose LTS.

## 1.3 ⚠️ The step everyone forgets

After installing, **close the terminal and open it again.**

Reason: the terminal learns where programs are when it starts. If you install something while it
is open, that terminal will not find it and you will see `is not recognized as the name of a
cmdlet`. Nothing is broken — it just needs restarting.

## 1.4 Verify

```powershell
node --version      # you expect something like v22.x.x
npm --version       # you expect something like 10.x.x
python --version    # you expect something like Python 3.12.x
git --version       # you expect something like git version 2.4x.x
```

If all four give you back a number, the environment is ready.

## 1.5 Advice on where to keep your projects

Right now you are working inside **OneDrive**, and in a folder **with spaces in its name**. Both
cause problems when you program:

- OneDrive tries to sync the thousands of files `npm install` generates → it becomes extremely
  slow and sometimes corrupts things.
- Spaces in paths break commands and force you to use quotes all the time.

Recommendation: create a `C:\dev` folder and keep your projects there.

```powershell
cd C:\
mkdir dev
cd dev
```

This study document can stay on the Desktop without any problem. It is only text.

## 1.6 Module 1 exercises

- [ ] **E1.1** — Install Node, Python and Git with the three commands above.
- [ ] **E1.2** — Close and reopen the terminal.
- [ ] **E1.3** — Run the four `--version` commands and note the numbers you got here:
  ```
  node:
  npm:
  python:
  git:
  ```
- [ ] **E1.4** — Create the `C:\dev` folder.

---

# Module 2 — Bootstrap (your first page)

## 2.1 What Bootstrap is

A **CSS library**: visual styles already written by other people. You put specific names on your
HTML tags (`class="btn btn-primary"`) and you get buttons, cards, forms and menus that are
already designed.

**Bootstrap is not a language or a program.** You do not install it, it does not use the
terminal, it does not run anything. It is just a CSS file your page loads.

We start here because it is the only thing that gives you a visible result without installing
anything.

## 2.2 The three languages of a web page

Before the code, this distinction has to be clear to you:

| Language | Role | Analogy |
|---|---|---|
| **HTML** | The structure and the content | The skeleton |
| **CSS** | The appearance: colours, sizes, positions | The clothes |
| **JavaScript** | The behaviour: what happens on a click | The muscles |

Bootstrap is **CSS**. React is **JavaScript**.

## 2.3 Hands on

```powershell
cd C:\dev
mkdir bootstrap-practice
cd bootstrap-practice
```

Create a file inside called `index.html` with this content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My first page</title>

  <!-- This line is Bootstrap. It brings all the CSS from the internet. -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

  <div class="container py-5">

    <h1 class="display-4">Hi, I am Enmanuel</h1>
    <p class="lead text-muted">I am learning to program from scratch.</p>

    <button class="btn btn-primary">A button</button>
    <button class="btn btn-outline-secondary">Another button</button>

    <div class="card mt-4" style="max-width: 24rem;">
      <div class="card-body">
        <h5 class="card-title">A card</h5>
        <p class="card-text">All of this design comes from Bootstrap. I did not write a single line of CSS.</p>
      </div>
    </div>

  </div>

</body>
</html>
```

Now open it in the browser:

```powershell
start index.html
```

## 2.4 How to read that file

- `<!DOCTYPE html>` → "this is a modern HTML page".
- `<head>` → information **about** the page (title, language, which CSS to load). Not visible.
- `<body>` → what **is** visible.
- `<link href="...bootstrap...">` → the line that brings Bootstrap in. Without it, the page looks
  black and white and unstyled. **Try deleting it and reloading** to see the difference. It is
  the best experiment in the module.
- `class="..."` → this is where you tell Bootstrap which style to apply.

Classes you have already used: `container` (centres the content), `py-5` (vertical padding),
`btn btn-primary` (blue button), `card` (card), `mt-4` (top margin).

## 2.5 🎬 Supporting videos

**HTML and CSS first, Bootstrap after.** Bootstrap is CSS already written: if you do not
understand basic HTML and CSS, you will be copying classes without knowing what they do. Do not
skip this step.

> These videos are in **Spanish**; their original titles are kept so you can find them.

**Step 1 — HTML and CSS (the foundation, it does matter):**

| Video | Note |
|---|---|
| [Curso de HTML y CSS desde CERO (Completo)](https://www.youtube.com/watch?v=ELSm-G201Ls) | The most recommended one as a solid foundation. |
| [Aprende HTML y CSS — Curso Desde Cero](https://www.youtube.com/watch?v=XqFR2lqBYPs) | Alternative, a different explaining style. |
| [Curso de HTML y CSS Desde Cero para Principiantes](https://www.youtube.com/watch?v=lMkiGNlavPk) | Another recent option. |

**Step 2 — Bootstrap:**

| Video | Note |
|---|---|
| [Aprende Bootstrap 5 en 15 minutos](https://www.youtube.com/watch?v=qgxhrJFTOJs) | **Watch this one first.** Short, gives you the whole idea. |
| [Curso de BOOTSTRAP desde CERO (Completo)](https://www.youtube.com/watch?v=kLBlM3yF2-A) | Full course if you want to go deeper. |
| [Curso de Bootstrap 5 desde cero — Web responsiva para tu portafolio](https://www.youtube.com/watch?v=gWan3LptzgM) | With a real portfolio project at the end. |
| [Curso COMPLETO de Bootstrap desde cero v5 (playlist)](https://www.youtube.com/playlist?list=PLUW3XAK9O3HFfc7KryNaE9jsqhmCpbBQi) | Series in short chapters. |

> Make sure it says **Bootstrap 5**. Bootstrap 3 or 4 tutorials use different class names and
> will confuse you.

## 2.6 Module 2 exercises

- [ ] **E2.1** — Create the file, open it in the browser and confirm you see it styled.
- [ ] **E2.2** — Delete the Bootstrap `<link>` line, save, reload (`F5`). Note what changed. Then put it back.
- [ ] **E2.3** — Change `btn-primary` to `btn-success` and then to `btn-danger`. What happens?
- [ ] **E2.4** — Add a third button on your own.
- [ ] **E2.5** — Search Google for "bootstrap alert" and add an alert box to your page. **Learning to search documentation is part of the craft.**

---

# Module 3 — FastAPI (your first server)

## 3.1 What it is

**FastAPI** is a **Python** library for building a **backend**: a program that runs on a server,
stores data and answers questions.

The key difference from Module 2:

- Bootstrap = **frontend** → what the user sees.
- FastAPI = **backend** → what the user does NOT see: the database, the accounts, the logic.

When you open an app and your messages appear, the frontend draws them but the backend fetched
them and sent them.

## 3.2 The new concept: virtual environment (`venv`)

A **virtual environment** is a little box of libraries that belongs only to *this* project.

Why does it exist? Because project A may need FastAPI version 1 and project B version 2. If you
install everything together on the computer, they collide and everything breaks. With one `venv`
per project, each has its own.

It is an absolutely standard convention in Python. Get used to always creating one.

## 3.3 Hands on

```powershell
cd C:\dev
mkdir fastapi-practice
cd fastapi-practice

python -m venv venv            # 1. create the box
.\venv\Scripts\Activate.ps1    # 2. enter the box
pip install fastapi uvicorn    # 3. install INSIDE the box
```

Breakdown:

| Command | What it does |
|---|---|
| `python -m venv venv` | `-m venv` = "run the venv module". The second `venv` is the name of the folder it creates. |
| `.\venv\Scripts\Activate.ps1` | Activates the environment. **After this you will see `(venv)` at the start of the prompt.** That is your sign that you are inside. |
| `pip install ...` | `pip` is Python's library installer (the equivalent of `npm`). |

> If `Activate.ps1` gives you a "scripts are disabled" error, run this once:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```
> It is a Windows permission that lets you run local scripts.

Create a file `main.py`:

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Hello, my first backend"}


@app.get("/greeting/{name}")
def greet(name: str):
    return {"message": f"Hello, {name}"}
```

Start it:

```powershell
uvicorn main:app --reload
```

Open `http://127.0.0.1:8000` in the browser. Then try:

- `http://127.0.0.1:8000/greeting/Enmanuel`
- `http://127.0.0.1:8000/docs` ← **this is the best thing about FastAPI**: it generates a page
  for testing your API automatically, without you writing anything.

To shut it down: `Ctrl + C`.

## 3.4 How to read that code

- `from fastapi import FastAPI` → bring in a tool from another library.
- `app = FastAPI()` → create the application.
- `@app.get("/")` → a **decorator**. It means: "when someone asks for the address `/`, run the
  function below". Each of these is a **route** (*endpoint*).
- `def home():` → define a function.
- `return {...}` → what gets returned to the browser. That `{"key": "value"}` format is **JSON**,
  the language frontend and backend speak to each other in.
- `{name}` in the route → a variable part of the address, which arrives as an argument to the
  function.
- `uvicorn main:app` → "in the file `main`, run the variable `app`". `--reload` = restart
  yourself every time I save a change.

## 3.5 🎬 Supporting videos

FastAPI is Python. **If you have never written Python, watch a basic course of the language
first** (variables, functions, `if`, lists). Without that, FastAPI turns into copy and paste.

> These videos are in **Spanish**; their original titles are kept so you can find them.

| Video | Note |
|---|---|
| [FastAPI explicado fácil y rápido para principiantes](https://www.youtube.com/watch?v=FpjdLbm30ZY) | **Start here.** Short, to get the idea. |
| [Tutorial FastAPI: Crea tu primera API con Python en 10 Minutos](https://www.youtube.com/watch?v=nOnceJl6UjE) | Very fast and recent (2026). |
| [FastAPI desde cero: Tu primera API en Python (Hola Mundo)](https://www.youtube.com/watch?v=buRAjFyuM9M) | Does almost exactly what this module does. |
| [Curso de Introducción a FastAPI 2025 — Backend con Python (playlist)](https://www.youtube.com/playlist?list=PLHftsZss8mw7pSRpCyd-TM4Mu43XdyB3R) | Full course by chapters, to go deeper. |
| [⚡ Curso FastAPI con Python](https://www.youtube.com/watch?v=yQ35nqHaJ5c) | Alternative in a single video. |

## 3.6 Module 3 exercises

- [ ] **E3.1** — Do the whole flow and confirm you see `(venv)` in the prompt.
- [ ] **E3.2** — Open `/docs` and try your two routes from there.
- [ ] **E3.3** — Add a route `/about-me` that returns your name and what you are studying.
- [ ] **E3.4** — With the server running, change a text in the `return`, save and reload the browser. Notice that `--reload` applied it by itself.
- [ ] **E3.5** — Shut the server down with `Ctrl + C` and reload the browser. Note what error it shows. **Understanding that error is understanding what a server is.**

---

# Module 4 — React (your first app)

## 4.1 What it is

**React** is a **JavaScript** library for building interfaces. Its central idea: split the screen
into reusable **components** (a button, a card, a menu) and combine them like Lego bricks.

We leave it for last because it introduces more new concepts at once. Do not get frustrated if
Module 4 is harder than the previous ones — that is normal and it happens to everyone.

## 4.2 Hands on

```powershell
cd C:\dev
npm create vite@latest react-practice -- --template react
cd react-practice
npm install
npm run dev
```

Breakdown:

| Command | What it does |
|---|---|
| `npm create vite@latest` | **Vite** is the tool that builds the project for you: it creates the base folders and files. |
| `-- --template react` | The lone `--` tells npm "what follows is not for you, pass it to Vite". `--template react` = I want the React template. |
| `npm install` | Downloads all the libraries the project needs, into `node_modules`. |
| `npm run dev` | Starts the development server → `http://localhost:5173`. |

## 4.3 Which files matter to you

Of all the files that were created, at first you only look at these:

```
react-practice/
├── src/
│   ├── App.jsx      ← YOU WRITE HERE. It is your main component.
│   └── main.jsx     ← the startup. You almost never touch it.
├── index.html       ← the page that loads everything.
├── package.json     ← the project's record card: name, libraries, commands.
└── node_modules/    ← the downloaded libraries. NEVER touched or read.
```

Open `src/App.jsx`, delete everything and put this:

```jsx
function App() {
  return (
    <div>
      <h1>Hi, I am Enmanuel</h1>
      <p>This is my first React app.</p>
    </div>
  )
}

export default App
```

Save. **The browser updates by itself.** That is called *hot reload*.

## 4.4 The new concepts

- A **component** is a JavaScript function that returns something that looks like HTML.
- That "HTML inside JavaScript" is called **JSX**. It is not real HTML: that is why you write
  `className` instead of `class`.
- `export default App` → makes this component available for other files to use.
- `package.json` → the project's record card. Under `"scripts"` are the commands you can run with
  `npm run`.

## 4.5 🎬 Supporting videos

React is **JavaScript**. This is the module where missing foundations show up most: **before
React, learn JavaScript** (functions, arrays, `map`, arrow functions). It is the number one
reason people abandon React.

> These videos are in **Spanish**; their original titles are kept so you can find them.

| Video | Note |
|---|---|
| [Curso COMPLETO de REACT desde CERO 2025 (playlist)](https://www.youtube.com/playlist?list=PLO8lO9oepSLv0zh2j644zWefsxEGR8zdC) | **The best option**: short chapters, you go at your own pace. |
| [¿POR QUÉ utilizar VITE con REACT?](https://www.youtube.com/watch?v=MWh33z6qtAw) | Explains exactly the tool we use in this module. |
| [CURSO de REACT desde cero 2025](https://www.youtube.com/watch?v=2xhAcqhSuVU) | A single video, from zero, no prior experience. |
| [Curso React JS 2025 desde cero — Proyecto completo con Hooks y JSX](https://www.youtube.com/watch?v=BisJdN2LWEY) | With a real end-to-end project. |
| [REACT curso de 0 a EXPERTO 2025](https://www.youtube.com/watch?v=GMnWXlJnbNo) | Longer and deeper, for when you already feel comfortable. |

> Look for courses from **2024 or later** that use **Vite**. The old ones use
> `create-react-app`, which is discontinued, and "class components", which are no longer used.

## 4.6 Module 4 exercises

- [ ] **E4.1** — Create the project and confirm you see it at `localhost:5173`.
- [ ] **E4.2** — Edit `App.jsx` with the server running and watch it update by itself.
- [ ] **E4.3** — Open `package.json` and find the `"scripts"` section. Note which commands exist.
- [ ] **E4.4** — Create a second component `Card` in the same file and use it inside `App`.
- [ ] **E4.5** — Add Bootstrap to this React project (`npm install bootstrap`) and use `className="btn btn-primary"` on a button. **This is where Module 2 and Module 4 come together.**

---

# 🎬 Ordered video path

Every module already has its videos above. This is the **complete path in order**, so you can see
the whole route at a glance. The ones marked ⭐ are the minimum path: if you are only going to
watch a few, watch those.

| # | Topic | Video |
|---|---|---|
| 1 | ⭐ Terminal (Windows) | [Tutorial de CMD/PowerShell para PRINCIPIANTES](https://www.youtube.com/watch?v=kfEpjj2NZxU) |
| 2 | ⭐ HTML + CSS | [Curso de HTML y CSS desde CERO (Completo)](https://www.youtube.com/watch?v=ELSm-G201Ls) |
| 3 | ⭐ Bootstrap | [Aprende Bootstrap 5 en 15 minutos](https://www.youtube.com/watch?v=qgxhrJFTOJs) |
| 4 | Bootstrap in depth | [Curso de BOOTSTRAP desde CERO (Completo)](https://www.youtube.com/watch?v=kLBlM3yF2-A) |
| 5 | ⭐ FastAPI | [FastAPI explicado fácil y rápido para principiantes](https://www.youtube.com/watch?v=FpjdLbm30ZY) |
| 6 | FastAPI in depth | [Curso de Introducción a FastAPI 2025 (playlist)](https://www.youtube.com/playlist?list=PLHftsZss8mw7pSRpCyd-TM4Mu43XdyB3R) |
| 7 | ⭐ React | [Curso COMPLETO de REACT desde CERO 2025 (playlist)](https://www.youtube.com/playlist?list=PLO8lO9oepSLv0zh2j644zWefsxEGR8zdC) |
| 8 | Vite (the tool) | [¿POR QUÉ utilizar VITE con REACT?](https://www.youtube.com/watch?v=MWh33z6qtAw) |
| 9 | ⭐ Git and GitHub | [Curso de GIT y GITHUB desde CERO para PRINCIPIANTES](https://www.youtube.com/watch?v=3GymExBkKjE) |
| 10 | Git alternative | [Curso de GIT desde CERO (Completo)](https://www.youtube.com/watch?v=9ZJ-K-zk_Go) |

## How to watch a programming video (important)

Watching tutorials **feels** like learning, but if you only watch, you learn nothing. It is the
most common trap. Rules:

1. **Terminal and editor open beside the video.** Always.
2. **Pause and type the code yourself.** No copy and paste. If the video moves on and you have
   not typed it, rewind.
3. **Speed 1x the first time.** After that you can go to 1.25x or 1.5x.
4. **Do not watch more than one course on the same topic at a time.** Pick one and finish it.
5. **When the video ends, redo the project on your own, from scratch, without the video.** That
   moment — when you can do it unaided — is the only one that counts as "learned".
6. **If a video bores you or you do not understand the speaker, change it.** There are dozens. Do
   not spend a week fighting an explainer who does not suit you.

> These links came from searches made on 31/07/2026. I did not watch the videos, I selected them
> by title, topic and date. If one is down, is very old or does not help you, tell me and I will
> find you a replacement.

---

# Command cheat sheet

## Navigation

```powershell
pwd                  # where am I?
ls                   # what is here?
cd folder            # go in
cd ..                # go up one level
cd C:\dev            # go to an exact path
mkdir name           # create folder
cat file.txt         # view a file
start file.html      # open with the default program
```

## Keys

```
Tab          autocomplete
↑ / ↓        previous commands
Ctrl + C     kill whatever is running
```

## Node / React

```powershell
node --version
npm install                    # install the project's libraries
npm install library-name       # add a new library
npm run dev                    # start the development server
```

## Python / FastAPI

```powershell
python --version
python -m venv venv               # create virtual environment
.\venv\Scripts\Activate.ps1       # activate it ("(venv)" appears)
deactivate                        # leave the environment
pip install library-name          # install inside the environment
pip list                          # see what is installed
uvicorn main:app --reload         # start the server
```

---

# Common errors and how to read them

**Reading errors is a skill, not a punishment.** Almost always the error tells you exactly what
is happening. Practical rule: read the **last** line first, that is usually where the important
part is.

> The messages below are the English-locale Windows wording. If your Windows is set to another
> language, the text will be translated but the meaning and the fix are identical.

| What you see | What it means | Fix |
|---|---|---|
| `'node' is not recognized as the name of a cmdlet` | The terminal cannot find the program | Did you install it? Did you restart the terminal after installing? |
| `Python was not found; run without arguments to install from the Microsoft Store` | You are hitting the fake Windows shortcut, not a real Python | Install real Python (Module 1) |
| `ENOENT: no such file or directory, open 'package.json'` | You are in the wrong folder | `pwd` to see where you are, `cd` to the project folder |
| `Port 5173 is already in use` | You already have another server running on that port | `Ctrl+C` in the other terminal, or let it use another port |
| `Activate.ps1 cannot be loaded because running scripts is disabled on this system` | Windows permission | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| `ModuleNotFoundError: No module named 'fastapi'` | You installed outside the environment, or did not activate it | Check that you can see `(venv)` in the prompt |
| `Cannot find path` when running `cd` | Misspelled name, or missing quotes because of spaces | Use `Tab` to autocomplete |

---

# Glossary

| Term | Meaning |
|---|---|
| **Terminal / shell** | The window where you type commands. Yours is PowerShell. |
| **Prompt** | The text before the cursor. It tells you which folder you are in. |
| **Directory** | Another word for "folder". |
| **Path** | The address of a file: `C:\dev\my-app\src\App.jsx`. |
| **Flag** | An option of a command, starts with `-` or `--`. |
| **Frontend** | The part the user sees. HTML, CSS, JavaScript, React, Bootstrap. |
| **Backend** | The part the user does not see: data and logic. Python, FastAPI. |
| **Server** | A program that waits for requests and answers them. |
| **localhost** | Your own computer, acting as a server. Nobody else sees it. |
| **Port** | The number identifying a server on your machine: `8000`, `5173`. |
| **API** | A set of addresses a program exposes so others can ask it for data. |
| **Endpoint / route** | One of those concrete addresses: `/greeting/Enmanuel`. |
| **JSON** | The text format data is exchanged in: `{"name": "Enmanuel"}`. |
| **Library** | Code someone else wrote that you reuse. |
| **Package** | A library bundled up for installing. |
| **npm** | JavaScript's package installer. |
| **pip** | Python's package installer. |
| **venv** | Virtual environment: a box of libraries per Python project. |
| **node_modules** | The folder where npm stores libraries. Not touched. |
| **Component** | In React, a reusable piece of interface. |
| **JSX** | React's syntax that looks like HTML inside JavaScript. |
| **Hot reload** | The browser updating by itself when you save. |
| **LTS** | *Long Term Support*: the stable, recommended version. |
| **Git** | Tool for saving the version history of your code. |

---

# Progress checklist

## Module 0 — Terminal
- [ ] I understand that the terminal is always standing in a folder
- [ ] I can split a command into program / argument / flag
- [ ] I move around with `pwd`, `ls`, `cd`, `cd ..` without thinking
- [ ] I use `Tab` automatically
- [ ] I know that `Ctrl+C` kills a process
- [ ] I understand why the terminal "gets stuck" with a server running
- [ ] I can explain what `localhost:8000` is
- [ ] I did the 7 Module 0 exercises

## Module 1 — Environment
- [ ] Node and npm installed and verified
- [ ] Python installed and verified
- [ ] Git installed and verified
- [ ] I have `C:\dev` for my projects

## Module 2 — Bootstrap
- [ ] I know the difference between HTML, CSS and JavaScript
- [ ] My page appears styled in the browser
- [ ] I tried removing the Bootstrap `<link>` and understood what it contributes
- [ ] I added a component by looking it up in the documentation

## Module 3 — FastAPI
- [ ] I understand what a virtual environment is and why it exists
- [ ] My server answers at `127.0.0.1:8000`
- [ ] I used the `/docs` page
- [ ] I created a route of my own
- [ ] I can explain the difference between frontend and backend

## Module 4 — React
- [ ] My app runs at `localhost:5173`
- [ ] I understand what a component is
- [ ] I know which files matter and which one is never touched
- [ ] I created a second component
- [ ] I combined Bootstrap with React

## After this
- [ ] Basic Git: `git init`, `git add`, `git commit` → [video](https://www.youtube.com/watch?v=3GymExBkKjE)
- [ ] Connect my React to my FastAPI (the frontend asking the backend for data)
- [ ] Push a project to GitHub

---

## Study rules

1. **Type the commands by hand, do not copy them.** Copy and paste builds no memory.
2. **When something fails, read the whole error before asking for help.** Last line first.
3. **One module per session.** Better to understand one well than to pass through all four
   understanding none.
4. **Break things on purpose.** Delete a line and see what happens. That is how you learn what
   each part does.
5. **If something is not clear, ask "why?" all the way down.** Do not memorise commands:
   understand what you are asking the machine to do.
