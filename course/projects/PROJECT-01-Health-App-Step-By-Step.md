# Project 01 — My Health App (minimal version, step by step)

> Enmanuel's study document. Created 8 August 2026.
>
> **Requirement:** having done Module 1 (install Python), Module 2 (Bootstrap) and Module 3
> (FastAPI) of [GUIDE-02](../guides/GUIDE-02-Terminal-And-First-Projects.md).
> **React is not needed.** This project does not use it.
>
> **The new concepts that appear here are explained in
> [GUIDE-03 — Concepts for your first project](../guides/GUIDE-03-Concepts-For-Your-First-Project.md).**
> Keep it open beside you. Every time you see something you do not know, the why is there.

---

## ⚠️ Read this before starting

This is a **practice draft, for you**. It is not a product, it is not medical advice and nobody
else is going to use it. The goal is not to build a good health app: the goal is for you to
**finish something end to end** and watch the complete frontend → backend → frontend circuit work
with your own data.

A tiny finished project teaches ten times more than an ambitious half-done one.

---

## Index

- [What you are going to build](#what-you-are-going-to-build)
- [The 9 steps at a glance](#the-9-steps-at-a-glance)
- [Step 1 — Create the project](#step-1--create-the-project)
- [Step 2 — The data (`data.py`)](#step-2--the-data-datapy)
- [Step 3 — Calculate the calories (`logic.py`)](#step-3--calculate-the-calories-logicpy)
- [Step 4 — Build the meal plan](#step-4--build-the-meal-plan)
- [Step 5 — Build the shopping list](#step-5--build-the-shopping-list)
- [Step 6 — Test it all in the terminal](#step-6--test-it-all-in-the-terminal)
- [Step 7 — Turn it into a backend (`main.py`)](#step-7--turn-it-into-a-backend-mainpy)
- [Step 8 — The screen (`index.html`)](#step-8--the-screen-indexhtml)
- [Step 9 — Connect the two sides](#step-9--connect-the-two-sides)
- [What your app still does NOT do (and that is fine)](#what-your-app-still-does-not-do-and-that-is-fine)
- [Exercises to continue on your own](#exercises-to-continue-on-your-own)
- [If something fails](#if-something-fails)
- [Project checklist](#project-checklist)

---

# What you are going to build

A page with a form. You enter your data, press a button, and three things appear:

1. **How many calories per day** you need according to your goal
2. **A 3-day meal plan** (breakfast, lunch, dinner and snack for each day)
3. **The shopping list** for those 3 days, with the amounts already added up

```
┌─────────────────────────────────────────────────────────┐
│  My Health App                                          │
│                                                         │
│  Weight [ 70  ]  Height [ 175 ]  Age  [ 20 ]            │
│  Sex    [ male ▾] Activity [moderate▾] Goal [ lose ▾]   │
│                                                         │
│           [ Generate my plan ]                          │
│  ─────────────────────────────────────────────────────  │
│  ✅ 2233 kcal per day is your target                    │
│                                                         │
│  Day 1  (1900 kcal)                                     │
│    breakfast: Oatmeal with banana and peanuts — 450 kcal│
│    lunch:     Chicken with rice and salad — 650 kcal    │
│    dinner:    Baked fish with potatoes — 550 kcal       │
│    snack:     Yoghurt with nuts — 250 kcal              │
│  Day 2 ...                                              │
│                                                         │
│  SHOPPING LIST                                          │
│    olive oil (ml) — 65                                  │
│    tomato (unit) — 4                                    │
│    ...                                                  │
└─────────────────────────────────────────────────────────┘
```

**What it does NOT have** (on purpose): database, login, React, deploy. None of that is needed
for the app to work. It gets added later, if you want.

---

# The 9 steps at a glance

Notice the order: **the brain in pure Python first, then the server, and the screen last.** That
is deliberate. If the logic works in the terminal, when you put it behind FastAPI you already
know the problem is not there.

```
  STEPS 1-6  ──►  Pure Python, in the terminal. No web, no browser.
                  ALL the intelligence of the app lives here.
                        │
  STEP  7    ──►  You put FastAPI on top. The same logic, now over HTTP.
                        │
  STEPS 8-9  ──►  An HTML page that asks it for the data and draws it.
```

At the end you will have five files:

```
C:\dev\my-health-app\
├── venv\          ← the virtual environment (not touched)
├── data.py        ← the meals and their ingredients
├── logic.py       ← the brain: calculate, build plan, build list
├── try_it.py      ← a file for testing the logic in the terminal
├── main.py        ← the backend (FastAPI)
└── index.html     ← the frontend (the screen)
```

---

# Step 1 — Create the project

Terminal:

```powershell
cd C:\dev
mkdir my-health-app
cd my-health-app

python -m venv venv
.\venv\Scripts\Activate.ps1
pip install fastapi uvicorn
```

`(venv)` has to appear at the start of the prompt. If it does not appear, do not continue: go back
to [Module 3 of GUIDE-02](../guides/GUIDE-02-Terminal-And-First-Projects.md#module-3--fastapi-your-first-server).

Open the folder in your editor:

```powershell
code .
```

> The `.` means "this folder". If `code` does not work, open VS Code and use *File → Open
> folder*.

---

# Step 2 — The data (`data.py`)

First of all: **your app needs food to offer.** This is not clever code, it is a hand-written
list. And it is perfectly fine that it is.

Create `data.py`:

```python
# Each meal is a dictionary.
# They all have exactly the same keys: name, type, calories, ingredients.
# That regularity is what later lets me walk through all of them with a for.

MEALS = [
    {
        "name": "Oatmeal with banana and peanuts",
        "type": "breakfast",
        "calories": 450,
        "ingredients": [
            {"food": "oats", "amount": 60, "unit": "g"},
            {"food": "banana", "amount": 1, "unit": "unit"},
            {"food": "peanuts", "amount": 20, "unit": "g"},
            {"food": "milk", "amount": 200, "unit": "ml"},
        ],
    },
    {
        "name": "Scrambled eggs with wholemeal bread",
        "type": "breakfast",
        "calories": 400,
        "ingredients": [
            {"food": "egg", "amount": 2, "unit": "unit"},
            {"food": "wholemeal bread", "amount": 60, "unit": "g"},
            {"food": "tomato", "amount": 1, "unit": "unit"},
            {"food": "olive oil", "amount": 5, "unit": "ml"},
        ],
    },
    {
        "name": "Chicken with rice and salad",
        "type": "lunch",
        "calories": 650,
        "ingredients": [
            {"food": "chicken breast", "amount": 150, "unit": "g"},
            {"food": "rice", "amount": 80, "unit": "g"},
            {"food": "lettuce", "amount": 50, "unit": "g"},
            {"food": "tomato", "amount": 1, "unit": "unit"},
            {"food": "olive oil", "amount": 10, "unit": "ml"},
        ],
    },
    {
        "name": "Lentils with vegetables",
        "type": "lunch",
        "calories": 600,
        "ingredients": [
            {"food": "lentils", "amount": 100, "unit": "g"},
            {"food": "carrot", "amount": 1, "unit": "unit"},
            {"food": "onion", "amount": 1, "unit": "unit"},
            {"food": "rice", "amount": 50, "unit": "g"},
            {"food": "olive oil", "amount": 10, "unit": "ml"},
        ],
    },
    {
        "name": "Baked fish with potatoes",
        "type": "dinner",
        "calories": 550,
        "ingredients": [
            {"food": "fish fillet", "amount": 150, "unit": "g"},
            {"food": "potato", "amount": 200, "unit": "g"},
            {"food": "lemon", "amount": 1, "unit": "unit"},
            {"food": "olive oil", "amount": 10, "unit": "ml"},
        ],
    },
    {
        "name": "Spinach omelette with salad",
        "type": "dinner",
        "calories": 500,
        "ingredients": [
            {"food": "egg", "amount": 3, "unit": "unit"},
            {"food": "spinach", "amount": 100, "unit": "g"},
            {"food": "lettuce", "amount": 50, "unit": "g"},
            {"food": "tomato", "amount": 1, "unit": "unit"},
            {"food": "olive oil", "amount": 10, "unit": "ml"},
        ],
    },
    {
        "name": "Yoghurt with nuts",
        "type": "snack",
        "calories": 250,
        "ingredients": [
            {"food": "plain yoghurt", "amount": 200, "unit": "g"},
            {"food": "walnuts", "amount": 20, "unit": "g"},
        ],
    },
    {
        "name": "Apple with peanuts",
        "type": "snack",
        "calories": 220,
        "ingredients": [
            {"food": "apple", "amount": 1, "unit": "unit"},
            {"food": "peanuts", "amount": 25, "unit": "g"},
        ],
    },
]
```

## 🔑 Look carefully at this structure

`MEALS` is a **list of dictionaries**. And inside each dictionary, `"ingredients"` is **another
list of dictionaries**.

```
MEALS  ──────────────────────────────  [ ] a list
   │
   ├─ meal 1  ─────────────────────────  { } a dictionary
   │     ├─ "name"          → text
   │     ├─ "calories"      → number
   │     └─ "ingredients"   →  [ ] another list
   │           ├─ ingredient 1  → { } another dictionary
   │           └─ ingredient 2  → { }
   └─ meal 2  ...
```

**This shape — nested lists and dictionaries — is the most common data structure you will use in
your life.** And it is no coincidence that it looks like the JSON from
[GUIDE-01 section 7](../guides/GUIDE-01-What-Is-A-Web-App-FE-And-BE.md#7-json-the-language-between-fe-and-be):
it is exactly the same shape. When FastAPI returns this in Step 7, it will be turned into JSON
without you doing anything.

Names in CAPITALS (`MEALS`) are the Python convention for saying "this is a fixed value, do not
change it during the program".

---

# Step 3 — Calculate the calories (`logic.py`)

This is the first piece of "intelligence". It is not AI: it is a **public formula** nutritionists
use, Mifflin-St Jeor. You copy it and that is that.

Create `logic.py`:

```python
from data import MEALS


# How much more you spend depending on how much you move.
ACTIVITY_FACTOR = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "intense": 1.725,
}

# How many calories to add or subtract depending on what you want to achieve.
GOAL_ADJUSTMENT = {
    "lose": -400,
    "maintain": 0,
    "gain": 300,
}

# Safety floor. Never recommend less than this.
SAFE_MINIMUM = {
    "male": 1500,
    "female": 1200,
}


def calculate_calories(weight, height, age, sex, activity, goal):
    # 1. Basal metabolism: what you spend sitting still all day.
    if sex == "male":
        base = 10 * weight + 6.25 * height - 5 * age + 5
    else:
        base = 10 * weight + 6.25 * height - 5 * age - 161

    # 2. Adjust for how much you move.
    total = base * ACTIVITY_FACTOR[activity]

    # 3. Adjust for the goal.
    total = total + GOAL_ADJUSTMENT[goal]

    # 4. Never go below the safety floor.
    minimum = SAFE_MINIMUM[sex]
    if total < minimum:
        total = minimum

    return round(total)
```

## Why step 4 is not optional

Without that `if`, someone weighing 45 kg asking to "lose weight" would get a dangerously low
number. **Your app is going to do arithmetic about a person's body.** Putting limits in is not
bureaucracy: it is the difference between a programming exercise and something that can do harm.

Get used to it from your first project: *every time your code calculates a number someone is
going to follow, ask yourself what happens at the extremes.*

## Test just this part

Before going on, check that it works. In the terminal, with `(venv)` active:

```powershell
python
```

The Python interpreter opens (you will see `>>>`). Type:

```python
from logic import calculate_calories
calculate_calories(70, 175, 20, "male", "moderate", "lose")
```

It has to give you back **`2233`**. Leave with `exit()`.

> If you got something else, check the formula character by character before continuing. **Do not
> move forward with a broken piece.** That is the most valuable habit you can pick up now.

---

# Step 4 — Build the meal plan

Continue in the same `logic.py`, adding this at the end:

```python
def meals_of_type(meal_type):
    """Returns only the meals of one type: 'breakfast', 'lunch', 'dinner' or 'snack'."""
    result = []
    for meal in MEALS:
        if meal["type"] == meal_type:
            result.append(meal)
    return result


def build_plan(days):
    """Builds an N-day plan. For now it rotates through the options of each type."""
    meal_types = ["breakfast", "lunch", "dinner", "snack"]
    plan = []

    for day_number in range(days):
        day_meals = []

        for meal_type in meal_types:
            options = meals_of_type(meal_type)
            # The % makes the number "wrap around" and never run off the list.
            chosen = options[day_number % len(options)]
            day_meals.append(chosen)

        # Add up the day's calories.
        total = 0
        for meal in day_meals:
            total = total + meal["calories"]

        plan.append({
            "day": day_number + 1,
            "meals": day_meals,
            "day_calories": total,
        })

    return plan
```

## The `%` trick

`%` is the **remainder of a division**. It is used to walk round a list in a circle, without ever
running off it:

```
You have 2 breakfasts → len(options) = 2

day 0 →  0 % 2 = 0  → breakfast[0]
day 1 →  1 % 2 = 1  → breakfast[1]
day 2 →  2 % 2 = 0  → breakfast[0]   ← it went back to the start by itself
day 3 →  3 % 2 = 1  → breakfast[1]
```

Without the `%`, on day 2 you would ask for `options[2]` of a list that only has indexes 0 and 1,
and Python would throw `IndexError: list index out of range`. You will use this trick your whole
life.

---

# Step 5 — Build the shopping list

This is the heart of the project and it is **pure adding up**. Nothing more.

At the end of `logic.py`:

```python
def build_shopping_list(plan):
    """Walks through all the meals in the plan and adds up the repeated ingredients."""
    totals = {}

    for day in plan:
        for meal in day["meals"]:
            for ingredient in meal["ingredients"]:
                # The key includes the unit so grams are not added to units.
                key = ingredient["food"] + " (" + ingredient["unit"] + ")"

                if key in totals:
                    totals[key] = totals[key] + ingredient["amount"]
                else:
                    totals[key] = ingredient["amount"]

    # Convert the dictionary into a list, which is more convenient to display.
    result = []
    for key in totals:
        result.append({"food": key, "amount": totals[key]})

    return result
```

## How to read the three nested `for` loops

It is a bit intimidating at first, but it is literally what you would do by hand:

```
for each DAY in the plan:                      ← 3 days
    for each MEAL of that day:                 ← 4 meals per day
        for each INGREDIENT of that meal:      ← 2-5 ingredients
            if I already wrote it down → add the amount
            if not                     → write it down for the first time
```

It is the same thing you do with a piece of paper: you read the recipes and note down "tomato:
1... ah, another tomato: 2... another: 3".

## Why the key carries the unit

If the key were only `"rice"`, and one recipe used grams and another cups, you would add 80 g +
2 cups = 82 of nothing. By using `"rice (g)"` as the key, each unit is counted separately.

It is a small decision, but it is exactly the kind of detail that separates a program that "runs"
from one that gives correct results.

---

# Step 6 — Test it all in the terminal

**Before touching anything web**, check that the brain works.

Create `try_it.py`:

```python
from logic import calculate_calories, build_plan, build_shopping_list

# --- 1. The calories ---
calories = calculate_calories(
    weight=70,
    height=175,
    age=20,
    sex="male",
    activity="moderate",
    goal="lose",
)
print("Your daily target:", calories, "kcal")
print()

# --- 2. The plan ---
plan = build_plan(3)

for day in plan:
    print("=== DAY", day["day"], "—", day["day_calories"], "kcal ===")
    for meal in day["meals"]:
        print("   ", meal["type"], ":", meal["name"], "-", meal["calories"], "kcal")
    print()

# --- 3. The shopping list ---
print("=== SHOPPING LIST ===")
for item in build_shopping_list(plan):
    print("  -", item["food"], ":", item["amount"])
```

Run it:

```powershell
python try_it.py
```

You should see something like this:

```
Your daily target: 2233 kcal

=== DAY 1 — 1900 kcal ===
    breakfast : Oatmeal with banana and peanuts - 450 kcal
    lunch : Chicken with rice and salad - 650 kcal
    dinner : Baked fish with potatoes - 550 kcal
    snack : Yoghurt with nuts - 250 kcal

=== DAY 2 — 1720 kcal ===
    ...

=== SHOPPING LIST ===
  - oats (g) : 120
  - banana (unit) : 2
  - peanuts (g) : 65
  - milk (ml) : 400
  ...
  - tomato (unit) : 4
  - olive oil (ml) : 65
  ...
```

> The order is not alphabetical: ingredients come out in the order they were first seen while
> walking through the plan. Do not worry if yours is in a different order from a classmate's —
> worry if the **numbers** differ.

## 🎉 Stop here for a second

**Your app already works.** Everything that follows is putting a pretty face on it. The logic —
the genuinely hard part, the part that makes the app *your* app — is already written and you have
already tested it.

Almost everyone does this backwards: they start with the screen, fight with CSS for three weeks
and never reach the part that does something. You already have the part that does something.

---

# Step 7 — Turn it into a backend (`main.py`)

Now we put FastAPI on top. **You are not going to rewrite any of the logic** — you are only going
to expose it over HTTP.

Create `main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from logic import calculate_calories, build_plan, build_shopping_list

app = FastAPI()

# Lets a page open in the browser talk to this server.
# Without this, the browser blocks the request. (See GUIDE-03, the CORS section.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Profile(BaseModel):
    """The exact shape of the data I expect to receive from the frontend."""
    weight: float
    height: float
    age: int
    sex: str
    activity: str
    goal: str


@app.get("/")
def home():
    return {"message": "My Health App API. Go to /docs to try it."}


@app.post("/api/plan")
def generate_plan(profile: Profile):
    calories = calculate_calories(
        profile.weight,
        profile.height,
        profile.age,
        profile.sex,
        profile.activity,
        profile.goal,
    )

    plan = build_plan(3)
    shopping_list = build_shopping_list(plan)

    return {
        "daily_calories": calories,
        "plan": plan,
        "shopping_list": shopping_list,
    }
```

Start it:

```powershell
uvicorn main:app --reload
```

## Test it WITHOUT writing a frontend

Open **`http://127.0.0.1:8000/docs`**. Find `POST /api/plan`, press *Try it out*, paste this into
the box and hit *Execute*:

```json
{
  "weight": 70,
  "height": 175,
  "age": 20,
  "sex": "male",
  "activity": "moderate",
  "goal": "lose"
}
```

The complete response appears below in JSON.

**That JSON is your finished backend.** And notice: it is exactly the same dictionary `try_it.py`
returned, but converted to JSON by FastAPI. It is the answer to the doubt you had about section 7
of GUIDE-01 — now you are seeing it with your own data.

> `/docs` is your best tool throughout development. **Always test here first.** If it works in
> `/docs`, the backend is fine; if the page then fails, the problem is in the frontend. That saves
> you hours of searching on the wrong side.

## Three new things in this file

| What | What for |
|---|---|
| `class Profile(BaseModel)` | Declares **what data I expect to receive and of what type**. If the frontend sends rubbish, FastAPI rejects it on its own with a `422`, before your code runs. |
| `@app.post(...)` | **POST**, not GET, because the frontend is **sending** data. (GUIDE-01, section 6.) |
| `CORSMiddleware` | The permission for the browser to let the request pass between two different servers. |

---

# Step 8 — The screen (`index.html`)

A single file, with Bootstrap just like in Module 2. Create `index.html` in the same folder:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My Health App</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container py-5" style="max-width: 720px;">

  <h1 class="mb-1">My Health App</h1>
  <p class="text-muted">Practice project. This is not medical advice.</p>

  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title mb-3">Your data</h5>

      <div class="row g-3">
        <div class="col-4">
          <label class="form-label">Weight (kg)</label>
          <input id="weight" type="number" class="form-control" value="70">
        </div>
        <div class="col-4">
          <label class="form-label">Height (cm)</label>
          <input id="height" type="number" class="form-control" value="175">
        </div>
        <div class="col-4">
          <label class="form-label">Age</label>
          <input id="age" type="number" class="form-control" value="20">
        </div>

        <div class="col-4">
          <label class="form-label">Sex</label>
          <select id="sex" class="form-select">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="col-4">
          <label class="form-label">Activity</label>
          <select id="activity" class="form-select">
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate" selected>Moderate</option>
            <option value="intense">Intense</option>
          </select>
        </div>
        <div class="col-4">
          <label class="form-label">Goal</label>
          <select id="goal" class="form-select">
            <option value="lose">Lose weight</option>
            <option value="maintain">Maintain</option>
            <option value="gain">Gain weight</option>
          </select>
        </div>
      </div>

      <button id="button" class="btn btn-primary mt-4">Generate my plan</button>
    </div>
  </div>

  <!-- The JavaScript will write the result here. It starts empty. -->
  <div id="result"></div>

</div>

<script>
  // 1. Grab the button and listen for its clicks.
  const button = document.getElementById("button");
  button.addEventListener("click", requestPlan);


  // 2. When they click: gather the data and send it to the backend.
  async function requestPlan() {
    const profile = {
      weight:   Number(document.getElementById("weight").value),
      height:   Number(document.getElementById("height").value),
      age:      Number(document.getElementById("age").value),
      sex:      document.getElementById("sex").value,
      activity: document.getElementById("activity").value,
      goal:     document.getElementById("goal").value,
    };

    document.getElementById("result").innerHTML =
      '<p class="text-muted">Calculating…</p>';

    const response = await fetch("http://127.0.0.1:8000/api/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    const data = await response.json();

    console.log(data);   // ← look at this in the browser console (F12)
    render(data);
  }


  // 3. Turn the received JSON into visible HTML.
  function render(data) {
    let html = `
      <div class="alert alert-success">
        Your target: <strong>${data.daily_calories} kcal per day</strong>
      </div>
      <h4 class="mt-4 mb-3">Your plan</h4>
    `;

    for (const day of data.plan) {
      let meals = "";
      for (const meal of day.meals) {
        meals += `<li><strong>${meal.type}:</strong> ${meal.name}
                  <span class="text-muted">— ${meal.calories} kcal</span></li>`;
      }

      html += `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">
              Day ${day.day}
              <small class="text-muted">(${day.day_calories} kcal)</small>
            </h5>
            <ul class="mb-0">${meals}</ul>
          </div>
        </div>
      `;
    }

    let items = "";
    for (const item of data.shopping_list) {
      items += `<li class="list-group-item d-flex justify-content-between">
                  <span>${item.food}</span>
                  <strong>${item.amount}</strong>
                </li>`;
    }

    html += `
      <h4 class="mt-4 mb-3">Shopping list</h4>
      <ul class="list-group mb-5">${items}</ul>
    `;

    document.getElementById("result").innerHTML = html;
  }
</script>

</body>
</html>
```

## The three parts of the `<script>`

They are numbered in the code on purpose, because they are three distinct ideas:

```
1. LISTEN   →  "when they press the button, call requestPlan"
2. ASK      →  gather the inputs → fetch to the backend → receive JSON
3. RENDER   →  turn that JSON into HTML and put it in the page
```

**Every frontend in the world is this.** React does it more elegantly and more tidily when the app
grows, but conceptually it does exactly these three things. That is why it is worth seeing it this
raw once.

The line that really matters is:

```javascript
const response = await fetch("http://127.0.0.1:8000/api/plan", { ... });
```

**That is the exact moment the frontend talks to the backend.** The whole drawing from
[GUIDE-01 section 4](../guides/GUIDE-01-What-Is-A-Web-App-FE-And-BE.md#4-how-they-talk-request-and-response),
in one line.

---

# Step 9 — Connect the two sides

You need **the backend running** and **the page open** at the same time.

**Terminal 1** — leave it running, do not close it:

```powershell
cd C:\dev\my-health-app
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

**Terminal 2** — open a second terminal window:

```powershell
cd C:\dev\my-health-app
start index.html
```

Enter your real data and press **Generate my plan**.

## Now open F12 and look at what you did

This closes the circle with the star exercise from GUIDE-01, but now **with your own app**:

1. `F12` → **Network** tab → filter by **Fetch/XHR**
2. Press the button again
3. A line appears: `plan`. Click it.
4. **Payload** tab → **that is what your frontend sent to the backend**
5. **Response** tab → **that is what the backend answered**
6. **Console** tab → there is the `console.log(data)` you left in the code

You are both ends of that conversation. You wrote the one who asks and the one who answers.

---

# What your app still does NOT do (and that is fine)

I am telling you explicitly so you do not think you got it wrong:

**1. The plan ignores your target calories.**
It tells you "2233 kcal" and then builds you a 1900 plan. They do not talk to each other. The app
calculates both things correctly on their own, but it does not connect them yet. **That is
exercise E6, and it is the most interesting leap in the project.**

**2. Days 1 and 3 are the same.** There are only 2 options of each type, so the rotation repeats
immediately. It is fixed by adding more meals.

**3. It stores nothing.** You close the server and no trace is left. For that you need a database,
and it is the natural step when you want to continue.

**4. There are no allergies, no vegetarians, no preferences.** Everyone gets the same plan.

None of these four things stops you saying you finished. **A version 1 that works and has known
limits is worth infinitely more than a perfect version that does not exist.**

---

# Exercises to continue on your own

In order of difficulty. Do them in this order, not skipping around.

- [ ] **E1** — Add a third breakfast, a third lunch, a third dinner and a third snack in
  `data.py`. Run `try_it.py` again and notice that the 3 days are now different. **You did not
  have to touch a single line of `logic.py`.** Think about why. That separation between data and
  logic is the reason.

- [ ] **E2** — Make the plan 7 days instead of 3. It is changing **one single number**. Can you
  find which?

- [ ] **E3** — Add a `"protein"` key (in grams) to each meal and also display each day's total
  protein. You have to touch `data.py`, `logic.py` and the HTML's `render()`: it is your first
  change that crosses all three layers.

- [ ] **E4** — In the HTML, add an input to choose **how many days** you want. You will also have
  to add the field to the `Profile` in `main.py`.

- [ ] **E5** — Add a "vegetarian" checkbox. Mark in `data.py` which meals are
  (`"vegetarian": True`) and filter them in `meals_of_type()`.

- [ ] **E6** — **The big one.** Make the plan try to get close to your target calories: instead of
  rotating blindly, have it choose from each type the option whose calories are closest to the
  day's quota. Hint: split the target into 25% breakfast, 35% lunch, 30% dinner, 10% snack, and
  for each quota find the meal with the smallest difference. **This is where your app stops being
  an exercise and starts being your idea.**

- [ ] **E7** — `git init` and save the project. See the Git section in GUIDE-03.

---

# If something fails

| What you see | What is happening | How to fix it |
|---|---|---|
| `ModuleNotFoundError: No module named 'fastapi'` | You did not activate the virtual environment | Check that it says `(venv)` in the prompt |
| `ModuleNotFoundError: No module named 'logic'` | You are running from another folder | `pwd` and `cd` to `C:\dev\my-health-app` |
| `IndexError: list index out of range` | The `%` was missing in Step 4, or you are missing a meal of some type | Check there is at least one of each `type` |
| The button does nothing | There is a JavaScript error | `F12` → **Console** tab. The error is there, in red |
| `Failed to fetch` in the console | The backend is not running | Look at Terminal 1: is it still alive? Did you close it by accident? |
| `blocked by CORS policy` | The middleware is missing, or the browser is blocking directly-opened files | Check the `add_middleware`. If it continues, use the trick below ↓ |
| `422 Unprocessable Entity` | The JSON you sent does not match `Profile` | Look at **Payload** in Network: was a field missing? did you send text where a number goes? |
| `500 Internal Server Error` | Your Python code broke | The complete error is in **Terminal 1**. Read the last line first |

## If the browser blocks the `fetch` from the file

Some browsers do not let a page opened with `start index.html` (that is, with `file:///`) talk to
a server. If that happens to you, serve it with a mini-server. In **Terminal 2**:

```powershell
python -m http.server 5500
```

And open **`http://localhost:5500/index.html`**. Done: now you have two servers talking to each
other, just like in a real app — the frontend on `5500` and the backend on `8000`.

## The rule for not getting lost

When something fails, **first decide which side the problem is on.** It is the 4xx/5xx
distinction from
[GUIDE-01 section 6](../guides/GUIDE-01-What-Is-A-Web-App-FE-And-BE.md#6-http-methods-and-status-codes):

```
Does it work in /docs?
    │
    ├─ NO  → the problem is the BACKEND. Look at Terminal 1.
    │
    └─ YES → the problem is the FRONTEND. Look at F12 → Console and Network.
```

Never search on both sides at once. That question saves you half the time.

---

# Project checklist

## The logic (pure Python)
- [ ] I created the folder and the virtual environment, and I see `(venv)`
- [ ] `data.py` with at least 8 meals
- [ ] I understand that `MEALS` is a list of dictionaries, and why it looks like JSON
- [ ] `calculate_calories()` gives me back 2233 with the test data
- [ ] I understand why the safety floor exists
- [ ] `build_plan()` works, and I know what the `%` does
- [ ] `build_shopping_list()` adds up the repeats correctly
- [ ] I can explain why the key carries the unit in parentheses
- [ ] `python try_it.py` prints me the three things

## The backend
- [ ] `main.py` starts without errors
- [ ] I tested `POST /api/plan` from `/docs` and it returned the complete JSON
- [ ] I understand what `class Profile(BaseModel)` does
- [ ] I know why this endpoint is POST and not GET
- [ ] I know what problem CORS solves

## The frontend
- [ ] The page looks right with Bootstrap
- [ ] The button fires the request
- [ ] I see the result drawn on the screen
- [ ] I found my request in the **Network** tab
- [ ] I saw the `console.log` in the **Console** tab
- [ ] I can explain the three parts of the `<script>`

## What really matters
- [ ] I can explain to someone the complete journey of a click **in my own app**
- [ ] Faced with an error, I can decide whether to look at the terminal or the browser
- [ ] I did at least exercises E1, E2 and E3
- [ ] I saved the project with Git

---

## When you finish

You have two paths, and both are good:

**A. Go deeper on this app** → E6 (the plan that respects the calories), then a database with
SQLite, then login. It is your idea growing.

**B. Rebuild the frontend in React** → same API, same logic, different face. It is the best way
to learn React there is, because you already know exactly what it has to do and you are not
fighting two new things at once.

I would go with A up to E6, and only then with B.

> **Remember:** this is a programming exercise, not a health tool. If you are going to change your
> diet for real, talk to a professional.
