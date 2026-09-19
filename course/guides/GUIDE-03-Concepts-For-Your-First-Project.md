# Guide 03 — The concepts for your first project

> Enmanuel's study document. Created 8 August 2026.
>
> **This comes after GUIDE-02.** The complete order is:
>
> ```
> GUIDE-01  →  GUIDE-02  →  GUIDE-03  +  PROJECT-01
> what a      terminal    concepts     your first
> web app     and the     of the       app, step
> is          3 bases     first one    by step
> ```
>
> **Companion guide to [PROJECT-01 — My Health App](../projects/PROJECT-01-Health-App-Step-By-Step.md).**
> They are read **together**: the project tells you *what to write*, this one tells you *why it
> works*.

---

## How to use this guide

Do not read it straight through. **It works better like this:**

1. Open PROJECT-01 and start doing the steps.
2. When something you do not understand shows up, look it up here.
3. Go back to the project.

The sections are **in the same order things appear in the project**, so you can scroll down in
parallel.

| If you are on… | Read sections |
|---|---|
| Step 2 — `data.py` | 1, 2 |
| Steps 3-5 — `logic.py` | 3, 4, 5, 6 |
| Step 6 — `try_it.py` | 7 |
| Step 7 — `main.py` | 8, 9 |
| Steps 8-9 — `index.html` | 10, 11, 12, 13 |
| When something fails | 14 |
| When you finish | 15 |

---

## Index

- [1. Python data types](#1-python-data-types)
- [2. 🔑 Lists and dictionaries](#2--lists-and-dictionaries)
- [3. `for` loops](#3-for-loops)
- [4. Functions: parameters and `return`](#4-functions-parameters-and-return)
- [5. Several files: `import` and separating responsibilities](#5-several-files-import-and-separating-responsibilities)
- [6. Python details you will run into](#6-python-details-you-will-run-into)
- [7. `print` and trying things out](#7-print-and-trying-things-out)
- [8. FastAPI: GET vs POST and Pydantic](#8-fastapi-get-vs-post-and-pydantic)
- [9. 🚧 CORS: why the browser blocks you](#9--cors-why-the-browser-blocks-you)
- [10. The DOM: the page as objects](#10-the-dom-the-page-as-objects)
- [11. Events: reacting to clicks](#11-events-reacting-to-clicks)
- [12. 🔑 `fetch`, `async` and `await`](#12--fetch-async-and-await)
- [13. Drawing HTML from JavaScript](#13-drawing-html-from-javascript)
- [14. 🔍 Debugging: finding the problem](#14--debugging-finding-the-problem)
- [15. Git: saving your work](#15-git-saving-your-work)
- [What to watch and where to look](#what-to-watch-and-where-to-look)
- [Glossary](#glossary-for-guide-03)
- [Comprehension checklist](#comprehension-checklist)

---

# 1. Python data types

Every value in Python has a **type**. These five are enough for the entire project:

| Type | What it is | Example |
|---|---|---|
| `int` | Whole number | `20`, `450`, `-5` |
| `float` | Number with decimals | `70.5`, `1.55`, `6.25` |
| `str` | Text (*string*) | `"male"`, `"oatmeal"` |
| `bool` | True or false | `True`, `False` |
| `None` | "nothing", absence of a value | `None` |

Two warnings that will save you errors:

**`True` and `False` are capitalised in Python.** In JavaScript and in JSON they are `true` and
`false` in lower case. It is the silliest and most frequent source of error when you work with
both languages on the same day.

**`"20"` is not `20`.** The first is text, the second is a number. `"20" + "5"` gives you `"205"`;
`20 + 5` gives you `25`. This will matter when the frontend sends you data (section 12).

---

# 2. 🔑 Lists and dictionaries

This section is the most important one in the guide. **90% of programming is putting data into
these two things and taking it out.**

## The list: things in order

```python
meal_types = ["breakfast", "lunch", "dinner", "snack"]
```

- It goes in **square brackets** `[ ]`
- It has **order**, and you access it by **position** (index)
- **Indexes start at 0.** Always. It is the universal convention.

```python
meal_types[0]        # "breakfast"   ← the first one is ZERO
meal_types[3]        # "snack"
meal_types[4]        # 💥 IndexError: list index out of range
len(meal_types)      # 4  ← how many there are
meal_types.append("dessert")   # add one at the end
```

> **The classic error:** a list of 4 elements has indexes **0, 1, 2, 3**. Index 4 does not exist.
> That is why the last valid one is always `len(list) - 1`. This is the reason for the `%` trick
> in Step 4 of the project.

## The dictionary: things with names

```python
meal = {
    "name": "Oatmeal with banana",
    "calories": 450,
}
```

- It goes in **curly braces** `{ }`
- **Order does not matter**: you access it by **name** (key), not by position
- Each entry is a `"key": value` pair

```python
meal["name"]          # "Oatmeal with banana"
meal["calories"]      # 450
meal["protein"]       # 💥 KeyError: 'protein'   ← that key does not exist

meal["protein"] = 12  # create or change a key
"calories" in meal    # True  ← ask whether it exists, WITHOUT breaking
```

That `in` is what you use in `build_shopping_list()` to ask "have I already written this food
down?" without it blowing up.

## Which one to use

| Use a **list** when… | Use a **dictionary** when… |
|---|---|
| You have **many things of the same kind** | You have **one thing with several properties** |
| Order matters | Each piece of data has its own name |
| "the meals", "the days", "the ingredients" | "a meal", "a user", "a profile" |

## And now, the star combination

You will almost never use a list or a dictionary on their own. You will use **lists of
dictionaries**:

```python
MEALS = [
    {"name": "Oatmeal", "calories": 450},
    {"name": "Chicken", "calories": 650},
]
```

*A list (many meals) of dictionaries (each with its properties).*

**That shape is a table.** Each dictionary is a row, each key is a column. It is the structure of
a database, of a spreadsheet, of the response of any API in the world. Once you recognise it at a
glance, you will be able to read code from anywhere.

## 🔗 And that is why JSON looks so similar

Go back for a second to
[GUIDE-01 section 7](GUIDE-01-What-Is-A-Web-App-FE-And-BE.md#7-json-the-language-between-fe-and-be) —
the thing you were unsure about. Look at the two side by side:

```python
# Python dictionary                # The same data as JSON
{                                 {
  "name": "Enmanuel",               "name": "Enmanuel",
  "active": True,                   "active": true,
  "subjects": ["Prog", "DB"]        "subjects": ["Prog", "DB"]
}                                 }
```

Almost identical. These are the differences:

| | Python dictionary | JSON |
|---|---|---|
| What it is | A **live object** in memory | **Text**, nothing more |
| Booleans | `True` / `False` | `true` / `false` |
| Empty | `None` | `null` |
| Quotes | Single or double | **Double only** |

And that is why, when you write `return {...}` in `main.py`, **FastAPI converts your dictionary
to JSON text by itself** before sending it. That step is called **serialising**. You do not have
to do anything: it is automatic because the two structures are almost the same thing.

---

# 3. `for` loops

A `for` means: *"do this once for each element"*.

```python
for meal in MEALS:
    print(meal["name"])
```

It reads literally: **"for each `meal` inside `MEALS`, print its name"**.

- `meal` is a name you invent. It is the variable that holds a different element on each pass.
- What goes **indented** (with spaces) below is repeated. What is not indented is not.

> ⚠️ **In Python indentation is not decoration: it is syntax.** The spaces define what is inside
> the loop and what is outside. Four spaces per level, always. If you get an `IndentationError`,
> this is it.

## `range()`: repeat N times

When you want to repeat a number of times instead of walking through a list:

```python
for day_number in range(3):
    print(day_number)      # prints 0, then 1, then 2
```

`range(3)` gives **0, 1, 2** — three values, starting at zero. That is why in the project you
write `"day": day_number + 1`: internally you count from 0, but you show the user "Day 1".

## Nested loops

A `for` inside another. It is what looks frightening at first and is the most normal thing in the
world:

```python
for day in plan:                          # 3 passes
    for meal in day["meals"]:             # 4 per day        →  12 in total
        for ing in meal["ingredients"]:   # ~4 per meal      → ~48 in total
            print(ing["food"])
```

**The key to reading them: follow the indentation, not the text.** Each level of indentation is a
level of depth. And it is always nested data: a list inside a list inside a list.

## The "accumulator" pattern

You will write this a thousand times in your life. It looks like this:

```python
total = 0                             # 1. start at zero
for meal in meals:
    total = total + meal["calories"]  # 2. keep adding
# 3. after the loop, total holds the result
```

And its dictionary version, which is the shopping-list one:

```python
totals = {}                  # 1. start empty
for ing in ingredients:
    if ing["food"] in totals:
        totals[ing["food"]] += ing["amount"]   # already there → add
    else:
        totals[ing["food"]] = ing["amount"]    # first time → write it down
```

> `+=` is a shortcut: `x += 5` is exactly the same as `x = x + 5`.

---

# 4. Functions: parameters and `return`

A function is **a piece of code with a name**, that you can run whenever you want.

```python
def calculate_calories(weight, height, age):
    result = 10 * weight + 6.25 * height - 5 * age
    return result
```

| Part | What it is |
|---|---|
| `def` | "I am going to define a function" |
| `calculate_calories` | The name you give it |
| `(weight, height, age)` | The **parameters**: what the function needs to receive |
| `return` | What the function **gives back** to whoever called it |

## Defining ≠ running

```python
def greet(name):              # ← this does NOT run anything. It only defines it.
    return "Hello, " + name

message = greet("Enmanuel")   # ← HERE it runs. message holds "Hello, Enmanuel"
```

A function that is defined and never called does absolutely nothing. It is a recipe kept in a
drawer.

## `return` ends the function

As soon as a `return` runs, the function stops there. Anything after it does not run.

And a function without a `return` returns `None`. If you find that "the function works but gives
me `None`", you almost certainly forgot the `return`.

## Arguments by name

These two calls do the same thing:

```python
calculate_calories(70, 175, 20)
calculate_calories(weight=70, height=175, age=20)   # ← longer, much clearer
```

When a function has more than three parameters, **always use the second form**. It is impossible
to get the order wrong, and in six months you will still be able to read your own code. That is
why `try_it.py` is written that way.

## Why split into functions

Compare them:

```
ONE GIANT BLOCK                 THREE FUNCTIONS

everything mixed together       calculate_calories()  → I can test it alone
                                build_plan()          → I can test it alone
if something fails,             build_shopping_list() → I can test it alone
where do I look?
                                if it fails → I know exactly which to test
```

**One function = one responsibility.** If you have to use an "and" to describe what it does, it
is probably two functions.

---

# 5. Several files: `import` and separating responsibilities

## How importing works

```python
# In logic.py:
from data import MEALS
```

It reads: *"from the file `data.py`, bring me `MEALS`"*. Without the `.py`, just the name.

```python
from logic import calculate_calories, build_plan     # bring several things, with commas
```

For this to work, the files have to be **in the same folder**, and you have to run Python **from
that folder**. If you get `ModuleNotFoundError: No module named 'logic'`, run `pwd` — you are
almost always standing in the wrong place.

## Why three files and not one

```
data.py    →  WHAT THERE IS.   Information only. Not a single decision.
logic.py   →  WHAT IS DONE.    The calculations. It does not know the internet exists.
main.py    →  HOW IT IS ASKED. The HTTP door. It calculates nothing on its own.
```

This is called **separation of responsibilities**, and it is not decoration. Look at what it buys
you:

- Add 50 meals → you touch **only** `data.py`
- Change the formula → you touch **only** `logic.py`
- Tomorrow you want a desktop app instead of a web one → you throw away `main.py` and `logic.py`
  still works untouched

That is exactly why **E1** of the project (adding meals without touching the logic) works. When
you do it, you will feel the advantage instead of reading about it.

---

# 6. Python details you will run into

## `%` — the remainder of a division

```python
7 % 3     # 1   (7 divided by 3 gives 2, and 1 is left over)
4 % 2     # 0   (exact, nothing left over)
5 % 5     # 0
2 % 5     # 2   (5 does not fit into 2, all of it is left over)
```

Its two real uses:

```python
items[i % len(items)]     # go round in a circle, never running off the end
if number % 2 == 0:       # is it even?
```

## `round()`

```python
round(2233.0625)      # 2233
round(2233.0625, 2)   # 2233.06   ← with 2 decimals
```

## f-strings — putting variables inside text

```python
name = "Enmanuel"
age = 20

f"Hello, {name}, you are {age} years old"      # "Hello, Enmanuel, you are 20 years old"
```

The `f` before the quote is mandatory. Without it, it prints `{name}` literally.
It is what the `@app.get("/greeting/{name}")` from GUIDE-02 uses.

## `if` / `elif` / `else`

```python
if total < 1200:
    level = "very low"
elif total < 2000:
    level = "normal"
else:
    level = "high"
```

They are evaluated **in order** and **only one is entered**. The first one that is `True` wins;
the rest are not even looked at.

> ⚠️ `=` assigns, `==` compares. `x = 5` stores a 5. `x == 5` asks whether it is 5. Confusing them
> is an eternal classic.

## A preview: the short version of a filtering `for`

In the project we write:

```python
result = []
for meal in MEALS:
    if meal["type"] == meal_type:
        result.append(meal)
return result
```

The same thing written on one line:

```python
return [meal for meal in MEALS if meal["type"] == meal_type]
```

It is called a **list comprehension** and it is what you will see in the code of any real
project. **Do not use it yet** — use the long `for` until it comes naturally. But when you see it
on the internet, you now know that is exactly what it is.

---

# 7. `print` and trying things out

`print()` is your main instrument for understanding what is going on. It is not "for beginners":
everyone uses it, always.

```python
print("My plan:", plan)                      # with a comma, it inserts one space
print("Day", day["day"], "→", total, "kcal")
```

## The most useful trick: numbered prints

When something does not work and you do not even know where the code is going:

```python
print("1 - entered the function")
print("2 - the options are:", options)
print("3 - chose:", chosen)
```

You run it, look at which number it printed up to, and now you know which line it died on. It is
crude and it is effective. Afterwards you delete them.

## The interactive interpreter

```powershell
python
```

A `>>>` opens where you can try a single line without creating any file. Ideal for "what does
`7 % 3` give me?" or for trying out a function you have just written. You leave with `exit()`.

**Use it a lot.** It is the difference between assuming what something does and knowing it in
five seconds.

---

# 8. FastAPI: GET vs POST and Pydantic

## Why this endpoint is POST

Review [GUIDE-01 section 6](GUIDE-01-What-Is-A-Web-App-FE-And-BE.md#6-http-methods-and-status-codes):

| | GET | POST |
|---|---|---|
| Intention | **Read** something | **Send** data |
| The data travels… | in the address | in the **body** of the request |
| Can be typed in the browser bar | Yes | **No** |

Your `/api/plan` receives six pieces of data: weight, height, age, sex, activity, goal. You could
put them in the address (`/api/plan?weight=70&height=175&...`), but it looks awful and they are
personal data that would end up in the browser history. **They go in the body → POST.**

Practical consequence: **you cannot test a POST by typing the address in the browser.** That is
why `/docs` is so important.

## Pydantic: the input contract

```python
class Profile(BaseModel):
    weight: float
    height: float
    age: int
    sex: str
    activity: str
    goal: str
```

This declares: *"when someone calls this endpoint, they have to send me exactly these six fields,
with these types"*.

And FastAPI, for free, without you writing anything else:

1. **Checks** that all the fields arrived
2. **Converts** the types if it can (`"70"` → `70.0`)
3. **Rejects with a `422`** and a clear message if something does not add up
4. **Documents** the endpoint in `/docs` with the form already built

```
Frontend sends:  {"weight": 70, "height": 175, ...}
                          │
                    ┌─────▼─────┐
                    │  Profile  │  ← is everything there? are the types right?
                    └─────┬─────┘
                     ✅   │   ❌
                          │    └──► 422, and your function NEVER runs
                          ▼
                  your function runs, with guaranteed data
```

**That last point is the valuable one.** Inside your function you no longer have to wonder "what
if `weight` came in empty?". It cannot come in empty: Pydantic stopped it first.

And it is the
[golden rule from GUIDE-01](GUIDE-01-What-Is-A-Web-App-FE-And-BE.md#the-golden-rule-of-security)
in practice: *the backend is the law*. Even if the frontend validates, the backend validates
again.

## The response

In the other direction you do not need to declare anything: you return a dictionary and FastAPI
serialises it to JSON by itself, as we saw in section 2.

---

# 9. 🚧 CORS: why the browser blocks you

This concept stops everyone the first time and looks like a bug. It is not.

## What is happening

Your page is in one place (`file:///...` or `localhost:5500`) and your backend in another
(`127.0.0.1:8000`). **They are two different origins.**

Browsers have an old and very important security rule:

> A page **cannot read** the response of a server from another origin, unless that server
> **explicitly says it authorises it**.

The reason is real: without that rule, any malicious page you opened could make requests to your
bank using your cookies and read the response.

```
   Your page                        Your backend
   localhost:5500                   127.0.0.1:8000
        │                                 │
        │  ── fetch ──────────────────►   │
        │                                 │  the server responds normally
        │  ◄─────── response ──────────   │
        │
   ┌────▼──────────────┐
   │ THE BROWSER looks │  did the server add the header that authorises me?
   │ at the response   │      NO → it throws it away and writes the error in red
   └───────────────────┘      YES → it hands it to you
```

## The three details that clear it all up

**1. The one blocking is the browser, not the server.** The server answered perfectly. It is the
browser that decides not to let you read the response.

**2. That is why `/docs` works anyway.** `/docs` is served from `127.0.0.1:8000` — the same origin
as the API. There is no crossing, there is no CORS. **That is the reason your backend can be
perfect and the page fail anyway.**

**3. `CORSMiddleware` does not "fix" anything.** It only makes your server add the header that
tells the browser "this page has permission". It is a permission, not a patch.

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # ← "*" = any origin
    allow_methods=["*"],
    allow_headers=["*"],
)
```

> ⚠️ `allow_origins=["*"]` means "let any page in the world call me". For practising on your
> machine it is perfectly fine. **In a real app you put the exact list of your domains**, for
> example `allow_origins=["https://my-app.com"]`.

---

# 10. The DOM: the page as objects

When the browser reads your HTML, it does not keep the text: **it builds a tree of objects** in
memory. That tree is called the **DOM** (*Document Object Model*).

```
document
   └── html
        └── body
             └── div.container
                  ├── h1
                  ├── input#weight      ← each tag is an object
                  └── div#result           that JavaScript can touch
```

That tree is exactly what you see in **F12 → Elements**. And because it is a live object,
JavaScript can read and modify it — which is just what you proved by editing YouTube in the
[star exercise in GUIDE-01](GUIDE-01-What-Is-A-Web-App-FE-And-BE.md#-star-exercise-see-the-fe-and-the-be-with-your-own-eyes).

## Grabbing an element

```html
<input id="weight" type="number" value="70">
```

```javascript
const field = document.getElementById("weight");   // find it by its id
const value = field.value;                         // read what is typed in it
```

The `id` in the HTML is the hook. That is why every input in the project has one.

## ⚠️ `.value` ALWAYS returns text

Even if the input is `type="number"`:

```javascript
document.getElementById("weight").value          // "70"  ← text, with quotes
Number(document.getElementById("weight").value)  // 70    ← now it is a number
```

That is why the project has `Number(...)` wrapping the three numeric fields. Without it you would
send `"70"` in the JSON. **It is the number one cause of strange form bugs.**

## The three things you do to an element

| Code | What it does |
|---|---|
| `element.value` | Read or write what is in an input |
| `element.innerHTML = "..."` | Replace all the content of an element |
| `element.addEventListener(...)` | Listen for something the user does (section 11) |

---

# 11. Events: reacting to clicks

A frontend does not run top to bottom and finish. **It waits** for the user to do something.
Every thing the user does is an **event**.

```javascript
const button = document.getElementById("button");
button.addEventListener("click", requestPlan);
```

It reads: *"button, when you get **clicked**, run `requestPlan`"*.

## The detail that confuses everyone

```javascript
button.addEventListener("click", requestPlan);      // ✅ I pass THE FUNCTION
button.addEventListener("click", requestPlan());    // ❌ I RUN it right now
```

With the parentheses, the function runs **when the page loads** and you pass the button the
result (which is useless). Without parentheses, you pass it the function itself so it can store
it and call it later.

**The rule:** `requestPlan` is the recipe, `requestPlan()` is cooking it. You have to give
`addEventListener` the recipe.

Other events you will use: `"submit"` (sending a form), `"input"` (while typing), `"change"` (a
select changed).

---

# 12. 🔑 `fetch`, `async` and `await`

This section is the most important one on the frontend side. It is **the exact moment** your
frontend talks to your backend.

## Things that take time

Asking a server for something can take 50 ms or 3 seconds. If the browser sat still waiting, the
whole page would freeze.

That is why `fetch` does not return the result: it returns a **promise** — an "I will let you know
when it arrives".

## `await`: wait here

```javascript
async function requestPlan() {
  const response = await fetch("http://127.0.0.1:8000/api/plan", { ... });
  const data = await response.json();
  render(data);
}
```

- **`await`** = "do not move to the next line until this arrives". It turns the promise into the
  real value.
- **`async`** = mandatory on the function that contains an `await`. It is the permission.

**The mechanical rule:** if you write `await` inside, put `async` on the function. If you forget,
the error tells you: `await is only valid in async functions`.

## The complete call, line by line

```javascript
const response = await fetch("http://127.0.0.1:8000/api/plan", {
  method: "POST",                                    // 1
  headers: { "Content-Type": "application/json" },   // 2
  body: JSON.stringify(profile),                     // 3
});

const data = await response.json();                  // 4
```

| # | What it is |
|---|---|
| 1 | The HTTP **method**. Without this, `fetch` does a GET and your POST endpoint answers `405`. |
| 2 | The **header**: "what I am sending you is JSON". Without this, FastAPI does not know how to read it. |
| 3 | The **body**: the data. `JSON.stringify` converts your JavaScript object into text. |
| 4 | The **response**. `.json()` does the reverse trip: text → JavaScript object. |

## The two translations

This is the concept from section 2, now on the JavaScript side:

```
     JS OBJECT                     JSON TEXT                 PYTHON DICTIONARY

  {weight: 70}  ──stringify──► '{"weight":70}' ──Pydantic──►  {"weight": 70.0}
                                   (the cable)
  {plan:[…]}    ◄──.json()───  '{"plan":[…]}'  ◄──FastAPI───  {"plan": [...]}
```

**Only text travels down the cable.** Objects and dictionaries are living things in the memory of
each program. The four arrows in the drawing are the four translations, and **three are
automatic** — you only write `JSON.stringify` yourself.

## Careful: `fetch` does not fail on a 404

Counter-intuitive, but important:

```javascript
const response = await fetch(url);
// If the server answered 404 or 500, NOTHING HAPPENS HERE. The promise was kept.
// The server answered — it answered "error", but it answered.

if (!response.ok) {                  // .ok is true only if the code is 2xx
  console.log("Failed:", response.status);
  return;
}
```

`fetch` only throws a real error if **there was no response**: the server is off, there is no
network, or CORS blocked it. That is the `Failed to fetch` you see in the console.

In the project we did not put that `if` in, so as not to overload the code. **Add it when you
feel comfortable** — it is what separates a demo from something usable.

---

# 13. Drawing HTML from JavaScript

## Template literals: the backticks

```javascript
"Hello, " + name + ". You are " + age + " years old."   // ❌ the old way, unreadable
`Hello, ${name}. You are ${age} years old.`             // ✅ template literal
```

You use **backticks** `` ` `` (on your keyboard it is usually next to the `1` or the `P`) and the
variables go inside `${...}`.

Their two advantages: you insert variables without cutting the text, and **they can span several
lines**. That is why they are so useful for building HTML:

```javascript
html += `
  <div class="card mb-3">
    <h5>Day ${day.day}</h5>
  </div>
`;
```

It is the exact equivalent of Python's f-strings (section 6). Same concept, different syntax.

## Building piece by piece

The project's pattern is the accumulator from section 3, but with text:

```javascript
let items = "";                       // 1. start empty
for (const item of list) {
  items += `<li>${item.food}</li>`;   // 2. keep gluing
}
element.innerHTML = items;            // 3. put it all in at once
```

## `innerHTML` replaces everything

```javascript
document.getElementById("result").innerHTML = html;
```

It deletes whatever was inside that `<div>` and puts the new thing in. That is why you can press
the button many times without the results piling up.

> 🔒 **Security note for later:** `innerHTML` interprets what you give it as real HTML. If one day
> you put text written by a user in there, someone can inject code. In your practice app you
> generate all the content yourself, so there is no risk. But keep the fact: it is called **XSS**,
> and it is the same idea from GUIDE-01 — *never trust what comes from outside*.

## `let` and `const`

```javascript
const button = ...;  // I am not going to reassign it
let html = "";       // I am going to keep changing it
```

**Use `const` by default.** Switch to `let` only when the value really has to change. That way,
when you read `const`, you know at a glance that the variable does not move. (`var` is the old
form: if you see it in a tutorial, the tutorial is old.)

---

# 14. 🔍 Debugging: finding the problem

**Debugging is not a punishment for writing bad code. It is half the job.** Every programmer in
the world spends more time working out why something fails than writing new things.

## First: which side is the problem on?

Never look on both sides at once.

```
        Does the endpoint work in /docs?
                    │
        ┌───────────┴───────────┐
       NO                      YES
        │                       │
   BACKEND broken          FRONTEND broken
   → Terminal 1            → F12 in the browser
   → The Python error      → Console (JS errors)
     is there in full      → Network (the request)
```

## `console.log`: JavaScript's `print`

```javascript
console.log(data);
console.log("profile I am about to send:", profile);
```

It appears in **F12 → Console**. And it has an advantage over Python's `print`: if you pass it an
object, the console shows it **expandable**, so you can open and close each branch. Try clicking
on the result of your `console.log(data)`.

## The three places to look

| Where | What it tells you |
|---|---|
| **Terminal 1** (uvicorn) | Python errors, and one line per request that arrives |
| **F12 → Console** | JavaScript errors (in red) and your `console.log`s |
| **F12 → Network** | The complete conversation: what you sent, what answered, with what code |

In **Network**, click your request and look at these three tabs:

- **Headers** → the status code (200, 422, 500…)
- **Payload** → **what your frontend sent**
- **Response** → **what the backend answered**

Comparing Payload against what Pydantic expected solves almost every `422`.

## How to read a Python error

```
Traceback (most recent call last):
  File "logic.py", line 47, in build_plan
    chosen = options[day_number]
             ~~~~~~~^^^^^^^^^^^^
IndexError: list index out of range
```

**Read from the bottom up:**

1. The **last line** is the error: `IndexError: list index out of range` → I went past the end of
   a list
2. The **second to last** is the exact line: `options[day_number]`
3. Above, the file and the number: `logic.py`, line 47

With those three things you already know what happened and where. And if the message does not
make sense to you, do not guess: paste it to Claude with `/explain` and ask it to tell you what
caused it.

## The three errors that will happen to you most

| Error | It is almost always… |
|---|---|
| `KeyError: 'something'` | You misspelled a key name, or it does not exist in that dictionary |
| `IndexError` | You went past the end of a list. Remember: the last position is `len - 1` |
| `TypeError: unsupported operand type(s)` | You are adding text to a number. A `Number()` or an `int()` is missing |

## When you are really stuck

1. **Read the whole error.** All of it. People skip it and the answer was right there.
2. **Numbered `print`s** until you find the last line that runs.
3. **Comment out code** until it works, and add it back bit by bit.
4. **Explain it out loud**, even to the wall. It genuinely works: forcing yourself to say it in
   words, you find the gap. It has a name: *rubber duck debugging*.
5. **Search the literal error on Google**, without your variable names.
6. Only then, ask.

---

# 15. Git: saving your work

You installed it in Module 1 of GUIDE-02 and have not used it yet. Now is the moment: you now have
a project it would hurt to lose.

**Git saves photos of your project through time.** You can go back to any of them. It is the
safety net that lets you break things without fear, which is how you learn.

## Before anything: `.gitignore`

Create a file called exactly `.gitignore` (with the dot in front) in your folder:

```
venv/
__pycache__/
```

It tells Git **what NOT to save**. The `venv` is thousands of files that regenerate with a
`pip install`; saving them is useless and makes the project enormous. This is the first thing
done in any Python project.

## The four commands

```powershell
git init                              # once only: "start tracking this folder"
git add .                             # "I am staging ALL the changes"  (the . = everything)
git commit -m "My health app v1"      # "take the photo, with this name"
git log --oneline                     # see all the photos you took
```

And the most useful of all:

```powershell
git status                            # what changed since the last photo?
```

**Run `git status` all the time.** It is free, it modifies nothing, and it tells you exactly what
state you are in.

## The cycle

```
   you write code
        │
   git status           ← what did I change?
        │
   git add .            ← I stage the changes
        │
   git commit -m "..."  ← I take the photo
        │
   (and round again)
```

## When to make a commit

Every time something **works**. Not when you finish the day, not when it is perfect: when
something runs.

In this project that would be roughly five:

```
"Meal data"
"Calorie calculation"
"Plan and shopping list working in the terminal"
"Backend with FastAPI"
"Frontend connected"
```

That is the right size for a commit: **one step that works.**

## The messages

In the imperative, saying **what** you did, not how.

```
✅ "Add calorie calculation"
✅ "Fix index out of range in build_plan"
❌ "changes"
❌ "asdf"
❌ "now it works"
```

---

# What to watch and where to look

> **Honest note:** I am not putting YouTube links here because I cannot verify they are still
> alive. I give you **the exact searches** to type into YouTube — they will give you current
> results, which is better than a link from a year ago — and **the official documentation**, which
> is stable.

## YouTube searches, in order of urgency

| Priority | Search exactly this | What for |
|---|---|---|
| ⭐⭐⭐ | `python lists and dictionaries for beginners` | Sections 1-4. **It is what you lack most.** |
| ⭐⭐⭐ | `javascript for beginners DOM events` | Sections 10-11 |
| ⭐⭐⭐ | `javascript fetch api tutorial` | Section 12 |
| ⭐⭐ | `python functions parameters return` | Section 4 |
| ⭐⭐ | `async await javascript explained` | Section 12 |
| ⭐⭐ | `git and github from scratch for beginners` | Section 15 |
| ⭐ | `fastapi pydantic models` | Section 8 |
| ⭐ | `what is CORS and how to fix it` | Section 9 |

Filter by **"This year"** when you search for JavaScript things. For Python the age matters much
less: a Python video from 2020 is still valid.

## Official documentation

These pages are the sources of truth. Get used to going to them before a blog:

| Resource | What for | Address |
|---|---|---|
| **MDN** | *The* reference for HTML, CSS and JavaScript. Excellent. | `developer.mozilla.org` |
| **FastAPI documentation** | Official tutorial, very well written and with examples that work | `fastapi.tiangolo.com` |
| **Python tutorial** | The official tutorial of the language | `docs.python.org/3/tutorial/` |
| **Bootstrap documentation** | Copy and paste components from here | `getbootstrap.com/docs/5.3/` |

**Search trick:** put `mdn` at the end of what you search for on Google.
`javascript addeventlistener mdn` takes you straight to the good one, without going through five
blogs full of ads.

## How to study this without wasting time

GUIDE-02 says it and I repeat it because it is what fails most:

**Watching tutorials feels like learning, but it is not.** The only proof you learned something is
being able to do it with an empty editor and no video.

The cycle that does work:

```
1. Stop when the project asks you for something you do not know
2. Search for ONLY that (not the complete 8-hour course)
3. Go back to the project and use it
4. Repeat
```

Learning with a project you care about is slow at first and much faster afterwards, because every
concept arrives when you need it and sticks to a real problem.

---

# Glossary for Guide 03

| Term | Meaning |
|---|---|
| **List** | Ordered collection, in `[ ]`. Accessed by position, from 0. |
| **Dictionary** | Collection of `key: value` pairs, in `{ }`. Accessed by name. |
| **Index** | The position of an element in a list. The first is 0. |
| **Key** | The name of an entry in a dictionary. |
| **Loop** | Repeating something. In Python, `for`. |
| **Iterate** | Walk through a collection element by element. |
| **Indentation** | The spaces at the start of the line. In Python **it is syntax**, not style. |
| **Function** | Named block of code that receives parameters and returns something. |
| **Parameter** | What a function declares it needs to receive. |
| **Argument** | The concrete value you pass when calling it. |
| **`return`** | What the function gives back. Without it, it returns `None`. |
| **Accumulator** | A variable that starts empty and fills up inside a loop. |
| **`import`** | Bring code in from another file. |
| **Serialise** | Turn an object into text (dict → JSON). The reverse is *parsing*. |
| **Pydantic** | The library FastAPI uses to validate incoming data. |
| **`BaseModel`** | The Pydantic class you declare the shape of the data with. |
| **`422`** | The code FastAPI returns when the data does not match the model. |
| **Middleware** | Code that runs with every request, before or after your function. |
| **CORS** | The browser rule about requests between different origins. |
| **Origin** | The combination protocol + domain + port. `http://localhost:8000`. |
| **DOM** | The tree of objects the browser builds from your HTML. |
| **Event** | Something the user does: a click, typing, submitting a form. |
| **Listener** | The function left waiting for an event. |
| **`fetch`** | The JavaScript function that makes HTTP requests. |
| **Promise** | A value that has not arrived yet. `await` waits for it. |
| **`async` / `await`** | How you write code that waits, without freezing the page. |
| **`JSON.stringify`** | JavaScript object → JSON text. |
| **`.json()`** | JSON text → JavaScript object. |
| **Template literal** | Text between backticks `` ` `` that allows `${variables}` and several lines. |
| **`innerHTML`** | The HTML content of an element. Assigning it replaces everything. |
| **XSS** | An attack that injects code through untrusted content. |
| **Debug** | Find and fix the cause of an error. |
| **Traceback** | Python's error report. Read from the bottom up. |
| **Commit** | A saved photo of your project in Git. |
| **`.gitignore`** | The file listing what Git should ignore. |
| **Repository** | The folder Git is tracking. |

---

# Comprehension checklist

The standard is the same as always: **can I explain it without looking?**

## Python
- [ ] I know the difference between a list and a dictionary, and when to use each
- [ ] I know why indexes start at 0 and why the last is `len - 1`
- [ ] I can read a list of dictionaries and say what is inside
- [ ] **I can explain why a Python dictionary looks so much like JSON, and how they differ**
- [ ] I understand that indentation in Python changes the meaning of the code
- [ ] I can write an accumulator loop (start at 0, keep adding)
- [ ] I can read three nested `for` loops by following the indentation
- [ ] I know the difference between defining a function and running it
- [ ] I know what `%` does and what going round in a circle is for
- [ ] I understand why the project is split into `data`, `logic` and `main`

## Backend
- [ ] I know why `/api/plan` is POST and not GET
- [ ] I can explain what `class Profile(BaseModel)` does and what happens if I send bad data
- [ ] I know what a `422` means
- [ ] **I can explain CORS: who blocks, why, and why `/docs` works anyway**
- [ ] I know that `allow_origins=["*"]` is only for practising

## Frontend
- [ ] I know what the DOM is and can find it in F12 → Elements
- [ ] I know why `.value` always returns text and what the `Number()` is for
- [ ] I know the difference between `requestPlan` and `requestPlan()` in an `addEventListener`
- [ ] **I can explain the complete path: JS object → stringify → text → Pydantic → dict**
- [ ] I know what the `await` is for and why the function has to be `async`
- [ ] I know that a `404` does not make `fetch` fail
- [ ] I can use template literals with backticks

## Craft
- [ ] Faced with an error, I can decide whether to look at the terminal or the browser
- [ ] I use `console.log` and `print` without being embarrassed
- [ ] I can read a Python traceback from the bottom up
- [ ] I can look at Payload and Response in the Network tab
- [ ] I ran `git init`, `git add`, `git commit` in my project
- [ ] I have a `.gitignore` with `venv/`

---

## Study rules (the same as always)

1. **Type the code by hand.** Copy and paste builds no memory.
2. **Break things on purpose.** Take out the `%`, take out the `Number()`, switch the backend off.
   Look at the error it gives. Causing an error on purpose teaches more than avoiding it.
3. **One concept at a time.** Do not read this whole guide today. Read what the project is asking
   you for right now.
4. **Finish the project even if it is ugly.** Ugly and finished beats pretty and abandoned, every
   time.
5. **If you do not understand something, ask "why?" all the way down.** Do not memorise:
   understand.
