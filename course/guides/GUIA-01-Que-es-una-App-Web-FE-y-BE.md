# Guide 01 — What Is a Web App? Frontend and Backend

> Enmanuel's study document. Created 31 July 2026.
>
> **This guide comes BEFORE [GUIA-02](GUIA-02-Terminal-y-Primeros-Proyectos.md).**
> Your instructor is right: first you understand **what** you are building, and only then do you
> learn the tools to build it. Otherwise you end up typing commands without knowing what is
> going on.
>
> **Nothing to install here.** It is all concepts plus one exercise with your browser.

---

## Index

- [1. The core idea: client and server](#1-the-core-idea-client-and-server)
- [2. FE = Frontend](#2-fe--frontend)
- [3. BE = Backend](#3-be--backend)
- [4. How they talk: request and response](#4-how-they-talk-request-and-response)
- [5. The complete journey of a click](#5-the-complete-journey-of-a-click)
- [6. HTTP: methods and status codes](#6-http-methods-and-status-codes)
- [7. JSON: the language between FE and BE](#7-json-the-language-between-fe-and-be)
- [8. API: the word you will hear constantly](#8-api-the-word-you-will-hear-constantly)
- [9. The database](#9-the-database)
- [10. The complete map: where each technology fits](#10-the-complete-map-where-each-technology-fits)
- [11. Types of web application](#11-types-of-web-application)
- [12. How an app reaches the internet](#12-how-an-app-reaches-the-internet)
- [🔬 Star exercise: see the FE and the BE with your own eyes](#-star-exercise-see-the-fe-and-the-be-with-your-own-eyes)
- [🎬 Videos](#-videos)
- [Glossary](#glossary-for-guide-01)
- [Comprehension checklist](#comprehension-checklist)

---

# 1. The core idea: client and server

Every web application is **two separate programs, on two separate computers, talking to each
other over the internet.**

If you take away only one thing from this guide, make it this.

```
   YOUR COMPUTER                               A COMPUTER SOMEWHERE
   ┌─────────────────┐                         ┌─────────────────┐
   │                 │   "give me the videos"  │                 │
   │     BROWSER     │ ──────────────────────► │     SERVER      │
   │    (CLIENT)     │                         │                 │
   │                 │ ◄────────────────────── │                 │
   │                 │   "here they are"       │                 │
   └─────────────────┘                         └─────────────────┘
         FRONTEND                                    BACKEND
    what you SEE and TOUCH                    what you NEVER see
```

- **Client** = the program that **asks**. Almost always your browser (Chrome, Edge, Firefox).
- **Server** = the program that **answers**. It runs on another computer, powered on 24/7,
  waiting for requests.

When you open Instagram, your phone does not have anyone's photos stored on it. It **asks** an
Instagram server for them, and that server **responds** with them. Your phone just draws them
nicely.

### The restaurant analogy

It is the best one there is for this, and you will see it in every course:

| Restaurant | Web app |
|---|---|
| The **dining room**: tables, menu, decor, the waiter | **Frontend** — what the customer sees |
| You, the diner, ordering a dish | The **user** clicking |
| The **order** the waiter carries to the kitchen | The **request** |
| The **kitchen**: nobody sees it, the real cooking happens there | **Backend** — the logic |
| The **pantry / fridge** with the ingredients | The **database** |
| The dish that comes out of the kitchen | The **response** |
| The **service window** between room and kitchen, with rules for passing orders | The **API** |

Notice the important detail: **the diner never walks into the kitchen.** They only order through
the window, in an agreed format. That is exactly what an API is.

---

# 2. FE = Frontend

**Frontend** = "the front part". Everything the user **sees and interacts with**.

It runs **on the user's computer**, inside the browser. That means the user can see it, inspect
it and modify it. It is public. (Hold on to that fact — it matters for security, and you will
prove it yourself in the exercise at the end.)

**What it is responsible for:**

- How it looks: colours, fonts, sizes, spacing
- The structure: where the menu goes, the button, the form
- Adapting to phones (*responsive*)
- Reacting to what the user does: clicks, typing, scrolling
- Simple validation: "this field is empty", "this email has no @"
- **Asking the backend for data** and displaying it

**Its three languages:**

| Language | Role | Analogy |
|---|---|---|
| **HTML** | Structure and content | The skeleton |
| **CSS** | Visual appearance | The clothes |
| **JavaScript** | Behaviour and interaction | The muscles |

**Tools that get added on top** (they never replace the three above, they build on them):

- **Bootstrap** → CSS already written, so you do not design from scratch
- **React** → JavaScript organised into reusable pieces (components)
- Vue, Angular, Svelte and Tailwind also exist… same ground, different brands

**Sentence to memorise:** *the frontend stores nothing. It only displays and asks.*

---

# 3. BE = Backend

**Backend** = "the back part". Everything the user **never sees**.

It runs **on the server**, not on the user's machine. Nobody can see its code. That is why the
secrets live here: passwords, keys, business rules.

**What it is responsible for:**

- **Storing and retrieving data** (talking to the database)
- **Authentication**: actually verifying that the password is correct
- **Authorisation**: deciding what each user is allowed to do
- **Business rules**: charging the right price, not selling stock that does not exist,
  calculating shipping
- Heavy work: processing images, generating PDFs, sending emails
- Validating **for real** whatever arrives from the frontend

**Typical languages:** Python (with **FastAPI** or Django), JavaScript (Node.js), Java, C#, PHP,
Go.

## The golden rule of security

> ⚠️ **Never trust the frontend.**

If the frontend validates that the age is over 18, anyone with a little knowledge can skip that
validation — because the frontend runs **on their computer**, it is theirs, they can modify it.
The **real** validation always has to be in the backend as well.

A concrete example: if you hide the "Delete everything" button from normal users but the backend
still accepts a delete order from anyone, your app is broken. Hiding the button is decoration,
not security.

**Sentence to memorise:** *the frontend is a suggestion; the backend is the law.*

---

# 4. How they talk: request and response

Communication between FE and BE has a fixed shape, always the same:

```
   FRONTEND                                          BACKEND
      │                                                 │
      │  ── REQUEST ─────────────────────────────────►  │
      │     • method:   GET                             │
      │     • address:  /api/users/7                    │  ┌──────────┐
      │     • headers:  who I am, what format I want    │  │          │
      │     • body:     (data, if I am sending any)     │◄─┤ DATABASE │
      │                                                 │  │          │
      │  ◄── RESPONSE ─────────────────────────────────  │  └──────────┘
      │     • code:  200 OK                             │
      │     • body:  {"name": "Enmanuel"}               │
      │                                                 │
```

Three key things about this drawing:

1. **The frontend always starts.** The backend never calls first; it waits. (There are
   exceptions — *websockets*, push notifications — but forget about those for now.)
2. **Every request is independent.** The backend does not "remember" the previous one on its
   own. That is why tokens and sessions exist: so you can say "I am the same person as before".
3. **The frontend never touches the database directly.** It always goes through the backend. The
   diner does not walk into the pantry.

---

# 5. The complete journey of a click

This is what really happens when you visit a site. Read it slowly: understanding these 8 steps
puts you ahead of plenty of people who already write code.

```
1. You type "youtube.com" in the browser and press Enter.

2. DNS: the browser asks "what is the numeric address of youtube.com?"
   DNS is the phone book of the internet. It answers something like 142.250.x.x (an IP).

3. The browser connects to that IP and asks for the page.

4. The server responds with HTML, CSS and JavaScript. ── this is the FRONTEND arriving.

5. The browser reads the HTML, applies the CSS and runs the JavaScript.
   You now see something on screen. It may be empty, or say "loading…".

6. That JavaScript makes new requests to the BACKEND: "give me the recommended videos".

7. The backend queries its DATABASE, builds the response as JSON and sends it.

8. The JavaScript receives the JSON and draws the videos on the screen.
```

That gap between step 5 and step 8 is the reason you sometimes see a page's structure loaded but
the content still blank, or showing those pulsing grey rectangles. Now you know exactly why it
happens: **the frontend has arrived, the backend has not answered yet.**

---

# 6. HTTP: methods and status codes

**HTTP** is the language of requests. The rules for how you ask and how you answer.
The **S** in **HTTPS** stands for *secure*: the same thing but encrypted, so nobody in the middle
can read it. Everything uses HTTPS today.

## The methods: what you want to do

Every request carries a **method** that declares the intention:

| Method | Intention | Real example |
|---|---|---|
| **GET** | **Read** something | view a profile, load the product list |
| **POST** | **Create** something new | sign up, post a comment |
| **PUT** / **PATCH** | **Modify** something that exists | edit your profile picture |
| **DELETE** | **Delete** something | remove a message |

In Module 3 of GUIA-02 you wrote `@app.get("/")`. Now you know what that `get` means: "this
function answers when someone wants to **read** this address".

> Important detail: when you type an address in the browser, you are always making a **GET**. The
> other methods are made by JavaScript, or by a form.

## Status codes: how it went

Every response carries a three-digit number. The first digit tells you the family:

| Range | Meaning | Examples you will see |
|---|---|---|
| **2xx** | ✅ It worked | `200 OK`, `201 Created` (something was created) |
| **3xx** | ↪️ Redirect | `301` "this moved to another address" |
| **4xx** | ❌ **Client error** — you asked wrongly | `404 Not Found`, `401` (not logged in), `403` (logged in but no permission), `400` (invalid data) |
| **5xx** | 💥 **Server error** — the backend broke | `500 Internal Server Error` |

**The distinction that will serve you most in your life as a programmer:**

- **4xx = the fault is with whoever asked.** Check the address, the data you sent, your token.
- **5xx = the fault is with the server.** Check your backend code, look at the server logs.

When something fails, the first thing you do is look at the code. It tells you which side to
look on, and it saves you hours.

---

# 7. JSON: the language between FE and BE

**JSON** (*JavaScript Object Notation*) is the text format in which the FE and the BE pass data
to each other. It is a universal standard: Python, JavaScript and Java all understand it.

```json
{
  "id": 7,
  "name": "Enmanuel",
  "active": true,
  "age": 20,
  "subjects": ["Programming", "Databases"],
  "teacher": {
    "name": "Prof. García",
    "email": "garcia@school.edu"
  }
}
```

It has five rules, and with these you can already read it:

1. `{ }` = an **object**: a set of `"key": value` pairs
2. `[ ]` = a **list** of values
3. Text goes in **double quotes** (never single ones)
4. The possible values are: text, number, `true`/`false`, `null`, another object, or a list
5. Objects can be **nested** (one inside another), like `"teacher"` above

When you wrote `return {"message": "Hello"}` in FastAPI, that was turned into JSON and travelled
to the browser. You were already using JSON without knowing it.

---

# 8. API: the word you will hear constantly

**API** = *Application Programming Interface*. It sounds abstract; the idea is not:

> An API is the **list of things one program lets another ask for**, and in what format.

It is the kitchen service window: a set of addresses, each with its method, with clear rules
about what it receives and what it returns.

An example of what an API looks like in practice:

| Method | Address | What it does |
|---|---|---|
| `GET` | `/api/products` | return all products |
| `GET` | `/api/products/15` | return product 15 |
| `POST` | `/api/products` | create a new product |
| `PUT` | `/api/products/15` | modify product 15 |
| `DELETE` | `/api/products/15` | delete product 15 |

Each of those lines is an **endpoint** (or "route"). **The API is the set of all the endpoints.**

**REST** is simply the most common style or convention for organising an API like this:
addresses with nouns (`/products`), with the verb supplied by the HTTP method. When you read
"REST API", think "an API organised in this tidy way". It is not a technology, it is a way of
doing things.

A detail that clears a lot up: **the backend you write in FastAPI IS an API.** They are not
different things. That is why FastAPI is called that.

---

# 9. The database

This is where data **survives**. If you switch the server off and on again, whatever was in the
database is still there. Everything else is lost.

- **Only the backend talks to it.** The frontend never, ever does.
- **SQL** is the language you use to ask it things. It looks like this:
  `SELECT name FROM users WHERE id = 7;`
- Relational databases (tables, like a giant tidy spreadsheet): **PostgreSQL**, **MySQL**,
  **SQLite**. Non-relational ones (JSON documents): **MongoDB**.
- **SQLite** is a single loose file on your disk, with nothing to install. It is the ideal one
  for learning.

Update your analogy: the waiter (frontend) does not walk into the pantry. They ask the cook
(backend), and the cook fetches the ingredients.

---

# 10. The complete map: where each technology fits

Now, all together and placed:

```
┌───────────────────────────────────────────────────────────────────┐
│  FRONTEND  —  runs in the user's browser                          │
│                                                                   │
│    HTML  ....... structure         ← the skeleton                 │
│    CSS   ....... style             ← Bootstrap lives here         │
│    JavaScript .. behaviour         ← React lives here             │
│                                                                   │
└──────────────────────────┬────────────────────────────────────────┘
                           │
                    HTTP + JSON       ← requests and responses
                           │
┌──────────────────────────▼────────────────────────────────────────┐
│  BACKEND  —  runs on the server                                   │
│                                                                   │
│    Python + FastAPI ..... receives requests, applies the rules    │
│                                                                   │
└──────────────────────────┬────────────────────────────────────────┘
                           │
                          SQL
                           │
┌──────────────────────────▼────────────────────────────────────────┐
│  DATABASE  —  where data survives                                 │
│                                                                   │
│    PostgreSQL / MySQL / SQLite                                    │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

And this is where what you are learning fits:

| What you are studying | Where it lives | What it is exactly |
|---|---|---|
| **Bootstrap** | Frontend | A CSS library |
| **React** | Frontend | A JavaScript library |
| **FastAPI** | Backend | A Python framework |

And that is why the order in GUIA-02 makes sense: Bootstrap (see something immediately), FastAPI
(understand the backend), React (tie it all together). When you finish the three, you have
touched all three layers of the drawing.

## Full Stack

Someone **full stack** works on both parts: frontend and backend. "Stack" = the pile of
technologies, the whole drawing above. It is not a higher rank or a title: it is simply someone
who moves across both layers.

---

# 11. Types of web application

Not every web app has the same shape. These are the three types you will come across:

**1. Static site**
Only HTML/CSS/JS files. No backend, no database. Everyone sees exactly the same thing. A
portfolio, a restaurant's website.
→ *This is what you build in Module 2 with Bootstrap.*

**2. Traditional dynamic site (server-rendered)**
The server builds the complete HTML, with the data already inside it, and sends it. Every click
reloads the whole page. This is how almost the entire web used to work, and how a great many
sites still do.

**3. SPA — Single Page Application**
The server sends **one** nearly empty page and a lot of JavaScript. That JavaScript draws
everything and asks the backend for data in JSON, **without ever reloading the page**. That is
why Gmail or Spotify web feel like desktop programs: you never see the reload flicker.
→ *This is what you build with React.*

The typical modern architecture — and the one you are learning — is: **a React SPA + a FastAPI
API.** Two separate projects, two servers, talking over HTTP with JSON.

---

# 12. How an app reaches the internet

Everything you do in GUIA-02 runs on `localhost`: **only on your computer, nobody else sees it.**
For the world to see it, four things are needed. You do not need them now, but it is worth
knowing they exist and what they are for:

| Concept | What it is |
|---|---|
| **Hosting** | Renting a computer that is on 24/7 to run your app. E.g. Vercel, Netlify (frontend); Dokploy on an OVH VPS, AWS (backend). |
| **Domain** | The nice name: `my-app.com`. Bought by the year. |
| **DNS** | The phone book that connects your domain to your server's IP. |
| **Deploy** | The act of uploading your code to the hosting and getting it running. |

**The important mental step:** when you *deploy*, your app stops being at `localhost:8000` and
moves to `https://my-app.com`. It is the **same app**, it just changed house.

---

# 🔬 Star exercise: see the FE and the BE with your own eyes

Everything above is theory until you watch it happen. **This exercise is the most important one
in the guide.** You do not need to install anything, just your browser. Do all of it.

### Part A — See the frontend, the one on your machine

1. Open any site with content, for example YouTube.
2. Press **`F12`**. The **DevTools** open. This window is your working instrument for your whole
   career. Start getting used to it.
3. Go to the **Elements** tab.
4. There is the **live HTML of the page**. Move the mouse over the lines and watch parts of the
   page light up.
5. **Double-click on any text and change it.** Type your name. Press Enter.

**The text changed on the page.** You have just "edited YouTube".

But now **reload with `F5`** and it is back to normal. Why?

> Because you only modified **the copy that was on your computer**. The frontend is yours, you
> can change it. But none of that reached the server. **That is exactly the reason you never
> trust the frontend** — anyone can do what you have just done.
>
> That single experiment explains section 3 better than any text can.

### Part B — See the conversations with the backend

1. In the DevTools, go to the **Network** tab.
2. With that tab open, **reload the page** with `F5`.
3. It will fill up with lines. **Every line is a request.** You are watching, live, everything
   your browser asked the server for.
4. Look at the columns: **Name** (what it asked for), **Status** (the code: 200, 304, 404…),
   **Type** (whether it was HTML, CSS, JS, an image, or `fetch`/`xhr`), **Size** and **Time**.
5. Filter by **Fetch/XHR**. That leaves **only the backend calls** — the data requests, without
   the images or the CSS.
6. Click on one of them and look at the **Response** or **Preview** tab.

**What you are reading there is JSON coming from the backend.** That is section 7, real, in
front of you.

7. Now, without reloading, **navigate around the site** (click a video, a section). Watch how
   **new lines appear** in Network without the page fully reloading.

You have just watched a **SPA** working: the frontend asking the backend for data on demand.
Section 11, confirmed.

### Questions to answer here

Write your answers in this file:

- **Q1** — How many requests did the page make while loading? (the total appears at the bottom
  of Network)
  ```
  answer:
  ```
- **Q2** — Find a request with `Status 200` and one with a different code. Which ones did you
  find and what do they mean according to section 6?
  ```
  answer:
  ```
- **Q3** — Copy a small piece of the JSON you found in Fetch/XHR here:
  ```json

  ```
- **Q4** — Go to a made-up address on a real site, something like
  `youtube.com/thisdoesnotexist123`. What code appears in Network? Whose fault is it according to
  section 6?
  ```
  answer:
  ```

---

# 🎬 Videos

**Watch these BEFORE the GUIA-02 videos.** They are short and they are the foundation for
everything else.

> These videos are in **Spanish**; their original titles are kept below so you can find them.
> English replacements are on the production list.

**Step 1 — Frontend vs Backend (start here):**

| Video | Note |
|---|---|
| [¿Qué son Frontend y Backend? En 2 Minutos](https://www.youtube.com/watch?v=hZebFTAuEF4) | ⭐ Two minutes. Start with this one. |
| [¿Qué es BACKEND y FRONTEND? — La mejor explicación en español](https://www.youtube.com/watch?v=50RbVujPPGs) | ⭐ The most recommended one on the topic. |
| [Frontend vs Backend: ¿Cuál es la diferencia?](https://www.youtube.com/watch?v=NCc9tDzs2FA) | From Código Fácilito, a good channel to follow. |
| [¿Qué es frontend y backend? Explicación para novatos](https://www.youtube.com/watch?v=mTnSfpckyQ4) | Another explanation if one of them did not click. |

**Step 2 — Client/server and HTTP:**

| Video | Note |
|---|---|
| [¿Qué es HTTP? — Introducción Práctica](https://www.youtube.com/watch?v=WlIIkVOWlT4) | ⭐ Covers sections 4 and 6. |
| [Cómo funciona un servidor web — definición sencilla](https://www.youtube.com/watch?v=vG4LLrLXPU8) | What a server is, concretely. |
| [Métodos HTTP explicados: GET, POST, PUT, PATCH y DELETE](https://www.youtube.com/watch?v=gMTlkzccFqs) | ⭐ Exactly section 6. |
| [Cliente-Servidor: Protocolo HTTP](https://www.youtube.com/watch?v=w4cyaV-uA2k) | Reinforces the client-server model. |

**Step 3 — APIs (this connects to FastAPI):**

| Video | Note |
|---|---|
| [Qué es una REST API y cómo funciona — para principiantes](https://www.youtube.com/watch?v=LQdJG8Qc5xo) | ⭐ The best one on the topic. |
| [REST y RESTful APIs — Te lo explico en 5 minutos](https://www.youtube.com/watch?v=JD6VNRdGl98) | Five minutes, to the point. |
| [¿Qué es API, REST y RESTFul? (explicación simple)](https://www.youtube.com/watch?v=sB6Vc3gze3w) | Clarifies the difference between the three terms. |

> Links searched on 31/07/2026. I did not watch the videos; I chose them by title, topic and
> date. If one is down or does not help you, tell me and I will find a replacement.

---

# Glossary for Guide 01

| Term | Meaning |
|---|---|
| **Client** | The program that asks. Normally the browser. |
| **Server** | The program that answers. Runs on another computer, always on. |
| **FE / Frontend** | What the user sees. Runs in their browser. HTML, CSS, JS. |
| **BE / Backend** | What the user does not see. Runs on the server. Data and logic. |
| **Full Stack** | Someone who works on frontend and backend. |
| **Request** | The ask the client sends to the server. |
| **Response** | What the server returns. |
| **HTTP / HTTPS** | The language of requests. The S is for encryption. |
| **HTTP method** | The intention of the request: GET, POST, PUT, PATCH, DELETE. |
| **Status code** | The result number: 200 fine, 4xx client's fault, 5xx server's fault. |
| **JSON** | The text format data travels in between FE and BE. |
| **API** | The set of things a program lets you ask it, and in what format. |
| **Endpoint / Route** | One concrete API address: `/api/products/15`. |
| **REST** | The most common convention for organising an API. |
| **Database** | Where data survives a power-off. Only the backend talks to it. |
| **SQL** | The language for querying relational databases. |
| **SPA** | *Single Page Application*: one page that updates without reloading. What React does. |
| **Static site** | Files only, no backend. What you build with Bootstrap. |
| **IP** | The numeric address of a computer on the network. |
| **DNS** | The phone book: translates `youtube.com` into an IP. |
| **Domain** | The purchased name of a site: `my-app.com`. |
| **Hosting** | The service that keeps your app running on the internet. |
| **Deploy** | Uploading your app to the hosting and getting it working. |
| **localhost** | Your own computer acting as a server. Nobody else sees it. |
| **DevTools** | The browser tools that open with `F12`. |
| **Framework** | A working structure with rules and ready-made pieces. FastAPI, for example. |
| **Library** | Someone else's code that you reuse. Bootstrap, React. |

---

# Comprehension checklist

It is not "did I read it?" — it is **"can I explain it to someone without looking at the page?"**
That is the standard. Try saying it out loud.

## Core concepts
- [ ] I can explain what a client is and what a server is
- [ ] I can say what the frontend is and where it runs
- [ ] I can say what the backend is and where it runs
- [ ] I can tell the whole restaurant analogy, database included
- [ ] I understand why you **never trust the frontend**
- [ ] I know what Full Stack means

## Communication
- [ ] I know what a request is and what a response is
- [ ] I know who speaks first, and why
- [ ] I can name the HTTP methods and the intention of each one
- [ ] I know the difference between a **4xx** and a **5xx** error, and which side to look on
- [ ] I can read a JSON and say what is an object and what is a list
- [ ] I can explain what an API is in my own words
- [ ] I know what an endpoint is

## The map
- [ ] I can place **Bootstrap** in the section 10 drawing
- [ ] I can place **React** in the drawing
- [ ] I can place **FastAPI** in the drawing
- [ ] I know why the frontend does not talk directly to the database
- [ ] I understand what a SPA is and how it differs from a static site
- [ ] I know what *deploy* means and how it differs from `localhost`

## Practice
- [ ] I opened the DevTools with `F12`
- [ ] I edited a page's live HTML, and understood why it undoes itself on reload
- [ ] I saw the requests in the **Network** tab
- [ ] I found real JSON in **Fetch/XHR**
- [ ] I answered the four questions Q1–Q4

---

## When you finish this

Move on to **[GUIA-02 — Terminal and First Projects](GUIA-02-Terminal-y-Primeros-Proyectos.md)**.

There you will no longer be learning loose commands: you will know that `uvicorn main:app`
starts **a backend**, that `localhost:8000` is **your server**, that `return {"message":
"Hello"}` sends **JSON**, and that `npm run dev` starts **a frontend**. Everything in this
guide, in practice.

**That is the point of having started here.**
