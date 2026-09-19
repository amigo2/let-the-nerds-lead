# Video: the diagram-first approach

**Author:** Fernando · **Created:** 19 September 2026 · **Status:** Tier 0 not started
Decides **how the visuals get made**. Companion to [`PIPELINE-PRODUCCION-IA.md`](PIPELINE-PRODUCCION-IA.md),
which stays the authority on the seven layers and the cost structure. This one answers a
narrower question: *boxes, lines, arrows and text — what actually draws them?*

---

## What we are making

Not talking heads. Not stock footage. Not AI-generated scenes.

**Boxes, lines, arrows and labels that appear in time with a voice explaining them.** A client
box, a server box, an arrow that travels between them while the narration says "the browser
asks". That is the whole visual language, and it is the right one for this course — the
pipeline doc already put face-to-camera at 10–15% and screen at 70–80%.

---

## The decision: AI does not draw this

Your instinct was right, and it is the single most important call in this document.

**Generative video and image models still cannot render reliable text**, and that is not a
detail here — every box in our diagrams has a word in it. The research is blunt about why:
text demands **character-level precision**, and unlike a tree or a face, *one wrong letter makes
the output unusable*. It gets worse when the text is on something that moves, which is exactly
what an animated diagram is.

So a model that writes "SREVER" in the server box has produced a worthless frame, and you
cannot fix it by re-rolling because the next frame will be wrong differently.

> **The rule:** anything with a word in it is **rendered deterministically from code**, never
> generated. Code output is identical every time, correct by construction, and re-renders for
> free when the guide changes.

This is not an anti-AI position. It is putting AI where it is good — see *Where AI actually
earns its place* below.

---

## The thing we already have: the diagrams are written

The guides are full of ASCII diagrams. They are not decoration — **they are the storyboard**,
already drawn, already reviewed, already correct.

| Document | Diagram lines already written |
|---|---:|
| GUIDE-01 | 43 |
| GUIDE-03 | 46 |
| PROJECT-01 | 56 |
| ASSIGNMENT-01 | 9 |
| GUIDE-02 | 7 |

GUIDE-01 alone has four blocks: client/server, request/response with the database, the
eight-step journey of a click, and the full stack map. Each is a scene. Nobody has to invent
the visuals — the job is translating ASCII that already says the right thing into moving
vector shapes that say the same thing.

This also means the guide stays the source of truth for the *picture*, not just the words.

---

## The three tiers — do not skip to tier 2

The temptation is to build the renderer first. The pipeline doc already sets the threshold:
**a pipeline pays for itself somewhere above 20 guides, and we have 3.**

### Tier 0 — this week, no tool, no code

Prove the *format* before building anything to produce it.

| Layer | Tier 0 answer |
|---|---|
| Diagrams | The ASCII block, cleaned up as a static image. Excalidraw or Mermaid, exported as PNG/SVG |
| Motion | None. Cut between stills, or a slow zoom. Narration carries it |
| Voice | **Yours, recorded on a decent mic.** No cloning |
| Screencast | OBS, free. Terminal and browser, real |
| Captions | Auto-generated, hand-corrected |
| Assembly | DaVinci Resolve (free) or CapCut. A normal editor |
| Output | One 10–15 min video for GUIDE-01 |

**Cost: £0 and an afternoon.** What it buys is the only number that matters — do the two
students find it more useful than the YouTube links they have now?

If the answer is no, we have spent an afternoon instead of three weekends building a renderer
for a format nobody wanted.

### Tier 1 — animate the diagrams, only if tier 0 lands

Replace the static images with code-rendered animation. Voice and screencast stay exactly as
they are. This is where a tool choice happens, and only here.

### Tier 2 — the pipeline, only above ~20 guides

Markdown → script → scene definitions → render → assemble, as one command. Everything the
pipeline doc describes. **Not now.**

---

## Tool comparison, for the tier 1 gate

Deciding now would be premature, but having the comparison done makes the gate a five-minute
decision instead of a week of reading.

| | **Remotion** | **Motion Canvas** |
|---|---|---|
| Model | React components → video | TypeScript generator functions, scene graph |
| Best at | Video whose content is driven by **data** | **Carefully choreographed** sequences where timing is the point |
| Editor | Player component, browser preview | Real-time visual editor |
| Ecosystem | ~60k weekly downloads | ~8k weekly downloads |
| Fit for boxes-and-arrows explainers | Good | **Purpose-built** — explainers, animated diagrams, code walkthroughs, voiceover-led |
| Fit for "generate 65 from markdown" | **Strong** — data in, video out | Weaker; built for hand-crafting |
| Overlap with the course | **It is React and TypeScript** — days 20–30. The tool is also teaching material | None |

**The honest read:** Motion Canvas is the better tool for *making one beautiful explainer by
hand*. Remotion is the better bet for *making sixty-five*, and it is built from the stack the
course already teaches, so time spent learning it is not time spent away from the course.

Leaning Remotion, decided at the tier 1 gate, on evidence from tier 0.

> Revideo also exists, aimed at automated pipelines. Worth a look at the tier 2 gate, not
> before.

---

## Where AI actually earns its place

Not in drawing the frames. In three other places:

| Job | Verdict |
|---|---|
| **Drafting the script from the guide** | ✅ Yes, now. Cheapest layer in the cost table, and the guide already contains the argument — the script is a re-voicing of it |
| **Building the tool** | ✅ Yes. Writing Remotion scenes, wiring the render pipeline, parsing markdown into scene data. This is ordinary coding work and it is what AI is best at |
| **Voice cloning** | ⏸ Later. Record it yourself while there are 3 guides. Revisit when recording 20 more is the bottleneck — which is a real and predictable moment |
| **Generating the visuals** | ❌ No. See above |
| **Avatar / face** | ⏸ Only for the 10–15% intro and outro, and only once the rest works |

On **"do we need our own LLM?"** — no, and especially not here. Scripts are the cheapest layer
by your own cost table; self-hosting would optimise the one thing that is already nearly free.

---

## Pilot: GUIDE-01, tier 0

The pipeline doc already chose GUIDE-01 and the reasoning still holds — written, conceptual,
diagram-heavy, and its current videos are third-party YouTube links worth replacing.

### Shot list, straight from the guide

| # | Source in GUIDE-01 | Visual | Rough |
|---:|---|---|---:|
| 1 | Title | Title card | 0:20 |
| 2 | §1 client/server ASCII block | Two boxes, arrow out, arrow back | 2:00 |
| 3 | §1 restaurant analogy table | Table rows appearing one at a time | 1:30 |
| 4 | §2–3 frontend / backend | The two boxes, each filling with its jobs | 2:00 |
| 5 | §3 golden rule callout | Full-screen text. **The one thing to remember** | 0:40 |
| 6 | §4 request/response ASCII block | Arrow with method, address, headers, body | 2:00 |
| 7 | §5 the eight steps | Numbered list building up, one line at a time | 2:00 |
| 8 | §6 status code table | 2xx/4xx/5xx, colour-coded | 1:00 |
| 9 | **Star exercise** | **Screencast** — real DevTools, real Network tab | 3:00 |
| 10 | §10 the full map | The three stacked boxes assembling | 1:30 |
| 11 | Close | Where this goes next | 0:30 |

≈ **16 minutes**, of which one shot is a screencast and the rest are diagrams and text — which
is why nothing here needs a generative model.

### Order of work

1. Draft the script from the guide. Correct it by hand and **keep the notes on what the draft
   got wrong** — those corrections are what make the prompt work for the other 64.
2. Redraw the four ASCII blocks in Excalidraw. Export SVG.
3. Record the voiceover. One take per section, not one take for the whole thing.
4. Screencast the DevTools exercise, silent, then narrate over it.
5. Assemble in Resolve. Captions last.
6. **Show both students. Ask which parts they skipped.**

Step 6 is the experiment. Everything before it is setup.

---

## Open questions

- **How long should a lesson video be?** 16 minutes for GUIDE-01 may already be too long.
  Splitting into 4–5 minute pieces per section is probably better for attention and
  definitely better for re-rendering when a guide changes.
- **On-screen keystrokes during screencasts?** Useful for terminal work where the student
  cannot see what was typed. Worth testing in the pilot rather than deciding now.
- **Does the website host the video or embed it?** Hosting costs bandwidth; embedding hands
  the viewer to a platform's recommendations. Decide before the site is built.
- **Do all 65 guides need video at all?** Probably not. Concept and setup days benefit most;
  pure syntax days may be better as text and exercises.

---

## Next concrete action

**Tier 0, shot 1–11 above, for GUIDE-01.** No repository, no renderer, no framework. An
afternoon, £0, and a real answer from two real students.
