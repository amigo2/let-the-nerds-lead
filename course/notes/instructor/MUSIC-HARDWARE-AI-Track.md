# Music, hardware and AI — a proposed strand for the two students

**Author:** Fernando · **Created:** 19 September 2026 · **Status:** proposal, nothing built
Instructor planning note. **No course document has been changed.** This exists to be argued
with before anything moves.

---

## Why this note exists

Both current students are into music. In a 65-day programme the scarcest resource is not
time or money — it is the student still caring on day 40. A thread that runs from day 04 to
the final project and happens to be *the thing they already love* is worth more than any
improvement to the material itself.

There is also an asset here that most bootcamps cannot buy: **a working commercial recording
studio**, with real gear, real clients and five years of real data, already half-instrumented.

---

## The design rule: generic core, optional skin

**The course stays general-purpose.** These are two students out of every student who will ever
take it, and a bootcamp that only makes sense if you play guitar is a worse bootcamp.

So nothing here replaces anything. The pattern is:

```
GUIDE-NN           the concept          ← generic, unchanged, one version only
PROJECT-NN         the default build    ← generic, unchanged, everyone can do it
PROJECT-NN-music   an alternative skin  ← same concepts, same shapes, different domain
```

Three rules that keep this from rotting the course:

1. **A variant never introduces a concept the generic version does not.** If the music version
   needs something the guide has not taught, the variant is wrong — not the guide.
2. **A variant is a *project*, never a *guide*.** Guides explain concepts and stay single-source.
   Only the thing being built changes.
3. **The generic version stays the one that is maintained.** If the two of them move on and
   nobody skins anything again, the course is exactly as good as it was.

Written down because the failure mode is obvious and slow: a year from now half the exercises
assume you know what a bar of music is, and a student who does not is quietly excluded.

---

## 1. The asset: Old Street Studios

A 28-year-old recording studio in Hoxton (Grade II listed), SSL Matrix 2 console, vintage
Neumann / Neve / API outboard. Captured in
[`REFERENCE-Old-Street-Studios.md`](REFERENCE-Old-Street-Studios.md) — this repo no longer
depends on that project being present.

What already exists there and is directly reusable as teaching material:

| Already built | What a student gets out of it |
|---|---|
| FastAPI + Postgres + React booking app | A real codebase in exactly the stack the course teaches |
| 453 labelled historical enquiries | A real dataset — not Iris, not Titanic |
| A triage classifier (~88%, scikit-learn) | A real model with a real, honest flaw to fix |
| A **Lab** section in the app | Five projects already scoped, deliberately off the revenue path |
| v3 "Studio systems & machine control" on the roadmap | Hardware work with a stated business case |

> The Lab page already says the quiet part: *"nothing in this list can stop a session being
> booked or an invoice going out if it breaks."* That constraint is what makes it safe to hand
> to a learner, and it should be preserved in anything we add.

**The single best property of this asset:** the work is real but the blast radius is zero.
A student cannot cost the studio money by getting the humidity chart wrong.

---

## 2. Three ladders, not one

"Music + programming" is three separate skills that get conflated. Keeping them apart is what
stops a student stalling.

### Ladder A — Music as software (needs nothing but a laptop)

Fits the existing curriculum with **no changes at all**.

| Course day | Already teaches | Music version of the same exercise |
|---:|---|---|
| 04–08 | Python foundations | Parse a MIDI file. Count notes, find the key, transpose it |
| 06 | Lists, dictionaries, sets, and tuples | A song is a list of bars; a bar is a dict of events. Same shape as `MEALS` |
| 08 | Errors, files, environments, and logging | Read a `.wav` header by hand. Discover that audio is just numbers |
| 09–14 | FastAPI | An API that returns the studio's availability |
| 15–19 | PostgreSQL | Model sessions, tracks, takes, stems. Foreign keys with a reason to exist |
| 25–30 | React | A waveform that draws itself from an array |
| 35–46 | Docker / DevOps | Deploy it on the OVH box, next to the real one |
| 47–52 | Applied AI | Classify the 453 enquiries properly |
| 60–64 | Final project | Any Lab project, owned end to end |

**This ladder costs £0 and requires zero curriculum change.** It is a different set of
*examples* for days that already exist.

#### Week one — what they can see before they can code

The table above is mostly the back half of the course. They will not wait that long for it to
get interesting, and they should not have to. Everything below is available in **days 01–03**,
before they have written a loop.

**Day 01 — the star exercise, on their own music.** GUIDE-01 already sends them into DevTools →
Network → Fetch/XHR on YouTube. Point them at a music streaming site instead and the exercise
is identical: they watch the JSON of a playlist arrive over the wire. *The thing they use every
day is a list of dictionaries in a text format, and they can read it.* That reframes the whole
course in twenty minutes and costs one sentence of instruction.

**Day 02 — the terminal, over their own library.** `cd` into their samples folder, `ls` a few
hundred files, `cat` a `.wav` header. The terminal stops being an abstraction the moment it is
pointed at files they care about.

**Day 03 + PROJECT-01 — the one worth building.** This is the strongest fit and it needs no new
concepts whatsoever, because the health app and a **setlist builder are structurally the same
program**:

| PROJECT-01 (generic) | Music skin | Concept, unchanged |
|---|---|---|
| `MEALS` — list of dicts, nested `ingredients` | `TRACKS` — list of dicts, nested `gear` | List of dictionaries |
| `calculate_calories(...)` → a number | `calculate_set_length(...)` → minutes | A formula with named parameters |
| Safety floor: never below 1200 kcal | Venue curfew: never over the slot | *What happens at the extremes* |
| `meals_of_type("breakfast")` | `tracks_of_type("opener")` | Filtering a list |
| `build_plan(3)` — rotate with `%` | `build_setlist(3)` — rotate with `%` | The `%` wrap-around trick |
| Sum calories per day | Sum minutes per set | The accumulator |
| `build_shopping_list()` — 3 nested loops | `build_gear_list()` — 3 nested loops | Nested data, accumulate into a dict |
| Key includes the unit: `"rice (g)"` | Key includes the type: `"strings (set)"` | Why the key needs the unit |
| `POST /api/plan` | `POST /api/setlist` | Pydantic, POST vs GET, CORS |

Every line of GUIDE-03 still applies word for word. The guide is not touched; only `data.py` and
the names inside `logic.py` change. A student doing the music skin and a student doing the
health app can sit next to each other, hit the same bug, and help each other — which is the
actual test of whether a variant is done right.

> **This is the cheapest thing in this entire note and probably the highest value.** One
> `PROJECT-01-Setlist` file, same nine steps, same concepts, and two students who are building
> something they would plausibly use.

**A hardware taster, if they want one in week one.** Rung 1 (blink → button → potentiometer)
needs no Python and no course knowledge — it is wiring and copy-paste. Worth offering as an
evening thing precisely *because* it is not on the path: they get the "I made a physical object
do something" hit in an hour, with nothing to fail at. Make an LED blink in time with a tempo
they set, and the link to music is made without a word of theory.

### Ladder B — Music as hardware

This is the one that needs honesty, because "Arduino" is doing a lot of work in most people's
heads. Three genuinely different things get called "building audio hardware":

| What you want | What actually does it | Can an Arduino do it? |
|---|---|---|
| **Control / monitoring** — switching, relays, MIDI, sensors, bias monitoring | Arduino / ESP32 | ✅ Yes. This is its real job |
| **Digital audio DSP** — delay, reverb, distortion, synthesis | Teensy 4.x + Audio Shield, or Daisy Seed | ⚠️ Not a classic Arduino. Needs a board with a codec and the CPU for it |
| **Amplification** — making a signal loud enough to drive a speaker | Analogue electronics. Transistors, valves, transformers | ❌ No. No microcontroller amplifies anything |

> **Be straight with them about this one.** "You can build anything once you know how to build"
> is true and worth saying — but the amplifier is analogue electronics, a different discipline
> from the one we are teaching. A microcontroller can *switch* an amp's channels, *monitor* its
> bias, and *remember* its settings. It cannot *be* the amp.
>
> The honest pitch is better than the vague one: **the computer is the brain, the analogue
> circuit is the muscle, and you are learning to build brains.**

#### ⚠️ Safety — this is not negotiable

**Students do not open valve amplifiers.** Valve amps hold several hundred volts in their
filter capacitors and stay lethal **after being unplugged, sometimes for days**. This has
killed people who knew what they were doing.

Everything in the proposed ladder is **battery or USB powered, under 12 V**. Mains-side work
and anything inside the studio's own amps is Luis's or a qualified tech's job, not a
learning exercise. If a student wants to go further, that is a course in electronics, with a
different teacher, and it happens after this one.

#### The rungs

| Rung | Project | Board | Rough cost | Teaches |
|---|---|---|---:|---|
| 1 | Blink, then a button, then a potentiometer | Arduino Uno / ESP32 | £10–25 | A pin is a variable. That is the whole leap |
| 2 | **Room conditions monitor** — temp/humidity → HTTP POST → chart | ESP32 + DHT22/SHT31 | ~£20 | Sensor → network → API → UI. The full stack, in physical form |
| 3 | MIDI controller — knobs and pads that talk to a DAW | Arduino Micro / ESP32 | £25–40 | Protocols, latency, a thing they will actually use |
| 4 | Guitar pedal / audio effect — delay, reverb, distortion | **Teensy 4.1 + Audio Shield** | £45–70 | Real DSP. Sample rates, buffers, why audio is hard |
| 5 | Small synth or effect box | Daisy Seed, or Bela for lowest latency | £30–150 | Embedded audio as a discipline |

**Rung 2 is the one to start with**, and not for teaching reasons: it is the only hardware item
in the studio roadmap with a stated business case. A listed building full of irreplaceable
valve gear needs its humidity watched. A student's first hardware project protecting six
figures of kit is a very different feeling from blinking an LED.

Teensy's audio library has a **drag-and-drop patching GUI** that generates the Arduino sketch —
a student can hear a working delay line before understanding a circular buffer, then go back
and learn why it works. That ordering matches how the rest of the course teaches.

### Ladder C — Where AI actually meets the machines

This is what was asked for, and it is worth being precise, because there are four distinct
things here and only two are beginner-shaped.

| Approach | What it means | Where it runs | Ready for our students? |
|---|---|---|---|
| **AI → tools → hardware** (MCP) | An assistant is given tools it can call: read a sensor, move a fader, upload a sketch | Laptop, talking to the board | ✅ **Yes.** Course day 51 already teaches tool calling |
| **TinyML on the board** | A small trained model runs *on* the microcontroller — keyword spotting, sound classification, anomaly detection | On the ESP32 itself | ✅ Yes, via Edge Impulse |
| **Neural audio synthesis** | A neural net generates or transforms audio in real time | Pi / Bela class hardware, not a microcontroller | ⚠️ Stretch. Fascinating, genuinely hard |
| **Model in the signal path of a paid session** | Anything touching a client's recording | — | ❌ No. Never |

#### C1 — MCP: the cleanest bridge, and we already own it

The Lab's *"Console control over MCP"* project is exactly the right shape, and it generalises.
An MCP server is a small program that declares what it can do; the assistant calls those
declared tools. Nothing magic — **it is the FastAPI lesson again, with a different client on
the other end.** A student who has done days 09–14 already understands the hard part.

Off-the-shelf MCP servers for microcontrollers now exist — for `arduino-cli` (compile, upload,
monitor serial, check wiring) and for raw serial ports. Worth reading as worked examples before
writing our own, and worth noting that *someone already built this* is itself a lesson.

The progression that makes sense for us:

```
day 51  tool calling                    →  the concept
Lab     read-only MCP: "what is the      →  safe: it can only look
        temperature in the live room?"
Lab     MCP writes to OUR hardware       →  it can change something we own
        "turn the machine-room fan on"
v3      MCP reads the console            →  read-only against the SSL, never during a session
```

> **The rule that keeps this safe:** an assistant may *read* anything and *write* only to
> hardware we built ourselves. The existing Lab note already says start read-only and never
> move anything during a live session. Keep that rule and inherit it everywhere.

#### C2 — TinyML: a model that fits in 50 KB

Edge Impulse handles collection, feature extraction, training and quantisation, then exports a
C++ library you compile into the firmware. Recent work reports meaningful RAM/ROM reductions
via its compiler, and the tutorials target exactly the ESP32-S3 class of board we would buy for
rung 2.

Studio-shaped projects that are real rather than toy:

- **Is the room actually quiet?** Classify ambient noise — traffic, the tube, the fan, a
  neighbour. Decide when the room is fit to record.
- **Did the session start?** Detect that sound is happening, for occupancy data Jerry
  currently has to ask about.
- **Is something wrong with the gear?** Anomaly detection on a fan or transformer hum. This is
  predictive maintenance, which is a real industry, on kit that genuinely matters.

The teaching value is the honest one: **the model is small and the data is yours.** A student
who collects their own dataset, hears it fail on a sound it never saw, and fixes it by
recording more, has learned more about ML than any Kaggle notebook teaches.

#### C3 — Neural audio, as the stretch goal

RAVE (IRCAM) is a real-time neural audio autoencoder; the `nn~` external puts it inside
Pure Data and Max/MSP, and it has been run on embedded platforms like Bela. This is the
"holy hell" moment for a music student — a neural network that turns their voice into a violin,
running on a box they built.

Flag it as the horizon, not the plan. It needs a Pi/Bela rather than a microcontroller, and it
needs the rest of the ladder underneath it first.

---

## 3. What this would cost

| Item | Cost |
|---|---|
| Ladder A (software only) | **£0** |
| Rung 1–2 starter kit, per student — ESP32, sensor, breadboard, jumpers | **£25–35** |
| Rung 4, per student — Teensy 4.1 + Audio Shield | **£45–70** |
| Edge Impulse | Free tier is enough |
| Studio access | Already have it |

**Under £100 per student** to run the whole hardware ladder. This is the cheapest motivation
available anywhere in the programme.

---

## 4. Where it fits without changing the 65 days

The honest position: **Ladder A needs no change at all** — it is a different set of examples
for days that already exist, and could start tomorrow.

Ladders B and C have no home in the current 65 days. Three options, not yet decided:

| Option | What it means | Cost to the curriculum |
|---|---|---|
| **1. Parallel strand** | The Lab runs alongside, at the student's own pace. Not a day, not assessed | None. Nothing moves |
| **2. Final project route** | The 5 final-project days (60–64) can be spent on a Lab project instead of a generic app | None. Days 60–64 are already open-ended |
| **3. A hardware phase** | 3–5 new days, probably after Phase 7 — the DevOps mindset transfers well | Course grows past 65 |

**Recommendation: options 1 and 2 now, option 3 only if the two students actually bite.**
Option 3 costs real writing time; the first two cost nothing and tell us whether it is worth
spending. We have two students — that is a small enough sample to just ask them.

> **The trap to avoid:** the hardware is the fun part, exactly like Phase 4 in the studio
> roadmap. It would be very easy to build a lovely Arduino strand for a course that still has
> 54 unwritten guides. **Days 04–64 being written is worth more than any of this.**

---

## 5. Risks

| Risk | Honest assessment |
|---|---|
| **Safety — mains and valve amps** | The real one. Handled by the under-12 V rule above. Not negotiable |
| **Hardware eats the time** | A broken solder joint can burn an evening with nothing learned. Keep it off the assessed path |
| **It becomes a hobby, not employability** | Frame it as embedded + IoT + edge ML, which are jobs, not as a music hobby |
| **Two students is not a market** | This is a bet on *these two*, not a product decision. Do not generalise it into the curriculum yet |
| **Studio dependency** | If the Old Street work ends, Ladder A survives; B and C lose their venue. Keep the exercises portable |
| **The blast-radius rule slips** | Someone will eventually want the assistant to touch the real console during a session. The answer is no |

---

## 6. What to decide next, in order

0. **The day-01 and day-02 reframings cost nothing and need no decision.** Point them at their
   own music in DevTools and their own samples folder in the terminal. Do that this week.
1. **Write `PROJECT-01-Setlist`** — the music skin of the health app. One project file, same
   nine steps, no guide touched, no concept added. This is the cheapest high-value item here
   and it is the one that makes the early stages land. Everything else can wait behind it.
2. **Ask the two students** which of the three ladders appeals, once they have finished the
   first project and know what programming actually feels like. Asking now gets an answer about
   what they *hope* it is.
3. **Ask Jerry and Luis** whether students in the building is acceptable at all, and when.
   This gates everything in Ladders B and C.
4. If yes — **buy one ESP32 kit and do rung 2 yourself first**, before proposing it. The
   course's own evidence rule applies to the instructor too.
5. Only then decide between options 1, 2 and 3 above.
6. Only after that, touch a curriculum document.

**Generic first, always.** If writing a music variant is ever competing for time with writing
the next generic guide, the generic guide wins. There are 54 days still unwritten and they serve
every future student; the skin serves two.

Nothing above is committed. Nothing in `course/guides/`, `course/projects/` or
`course/curriculum/` has been modified.

---

## Sources

Research for section 2 (Ladder C), September 2026:

- [RAVE — official implementation, ACIDS-IRCAM](https://github.com/acids-ircam/RAVE)
- [RAVE: A variational autoencoder for fast and high-quality neural audio synthesis](https://arxiv.org/abs/2111.05011)
- [Pipeline for recording datasets and running neural networks on the Bela embedded platform](https://arxiv.org/pdf/2306.11389)
- [Neutone SDK: an open source framework for neural audio processing](https://arxiv.org/pdf/2508.09126)
- [arduino-mcp-server — AI assistants controlling Arduino via MCP](https://github.com/hardware-mcp/arduino-mcp-server)
- [serial-mcp — MCP server for serial connections to microcontrollers](https://mcp.so/servers/serial-mcp)
- [Teensy Audio Library tutorial](https://zbotic.in/teensy-audio-library-build-a-dsp-audio-project-tutorial/)
- [Teensy 4.1 programmable guitar pedal](https://hackaday.io/project/203208-teensy-41-programmable-guitar-pedal)
- [Blackaddr Arduino/Teensy guitar audio shield](https://www.tindie.com/products/Blackaddr/arduino-teensy-guitar-audio-shield/)
- [Deploying real-time speech recognition on ESP32 using TinyML and Edge Impulse](https://link.springer.com/chapter/10.1007/978-3-031-97907-1_17)
- [Voice control with XIAO ESP32-S3 Sense and Edge Impulse](https://www.makerguides.com/voice-control-with-xiao-esp32-s3-sense-and-edge-impulse/)
- [ESP32-S3 TinyML guide — image, audio and sensor models](https://openelab.io/blogs/learn/esp32-s3-tinyml-image-audio-sensor-models)

Internal: [`REFERENCE-Old-Street-Studios.md`](REFERENCE-Old-Street-Studios.md), which records
the hardware track, the five Lab projects and the architecture, so none of it depends on the
studio project being on this machine.
