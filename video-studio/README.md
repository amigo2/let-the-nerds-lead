# Course video studio

Turns a bootcamp guide into a YouTube lesson video: animated boxes-and-arrows diagrams,
cut to a voiceover.

Spec: `course/notes/instructor/production/SPEC-Video-Studio.md`.

## Status — M0 done

One scene of GUIDE-01 (§1, client and server), hand-written spec, rendered to MP4.

```bash
npm install
npm run preview    # Remotion Studio, live preview in the browser
npm run render     # -> ../course/video/out/client-server.mp4
npm run still      # -> ../course/video/out/client-server.png
```

Renders land in the course repo, in `course/video/out/`, which is gitignored there.
It assumes the two repos are siblings — both directly on the Desktop. The output is a
derived artefact: the scene spec is the source of truth, and the mp4 is rebuilt on demand.

## Presenting the lesson

```bash
npm run capture     # http://localhost:5174
```

Opens on the title card. **Arrows move through the whole lesson.**

| Key | Does |
|---|---|
| `→` | reveal the next thing — and at the end of a shot, move to the next shot |
| `←` | back |

42 presses takes you from the title card to the close, through all eleven shots.

```
┌────────────────────────────┬──────────────┐
│                            │  all eleven  │
│        the picture         │  shots, the  │
│                            │  current one │
│                            │  open to     │
│                            │  show what   │
│                            │  lands next  │
├────────────────────────────┴──────────────┤
│  the script for this shot                 │
├───────────────────────────────────────────┤
│  ←  →     Shot 2 of 11 · 3 of 5           │
└───────────────────────────────────────────┘
```

The outline sits on the **right**, deliberately: the course app owns the left rail, so when
this becomes a route inside it there is only ever one sidebar.

It lists every shot, with the current one opened to show what is coming. Ticked things have landed, the highlighted one is next. The script for whatever is on
screen sits along the bottom, so this is what you practise the read with.

Click any shot in the outline to jump to it. **▶ Play** runs the current shot in real time;
**Interactive** swaps the picture for the React Flow view a student would get.

## Recording a shot

**● Record this shot** asks for the microphone, jumps to the top of the shot and starts the
clock. Read the script aloud and step with `→` as you go — the audio and the cue timings come
from the same performance, so they are in sync by construction.

**Stop** ends the take and gives you a player to listen back on. Then either:

- **Discard** — nothing is written, go again
- **Keep & render** — three things, in order: the wav is saved to
  `course/video/audio/guide-01/NN-<shot>.wav`, the spec gets the cue timings and the `audio`
  filename, and then the shot is **rendered to MP4 with the voice in it**, landing in
  `course/video/out/`. The footer reports progress and tells you where it went.

**Render lesson** does the whole eleven-shot film the same way, without recording anything.

Rendering is a Node job — headless browser plus ffmpeg — so it cannot run in the page. The
button starts one on the dev server and polls it.

Once a shot has audio, its length comes from the recording rather than the estimate — so the
video follows your voice.

The browser records webm/opus; it is decoded and re-encoded as 16-bit mono wav before saving,
because that is what the renderer handles reliably.

## How it fits together

```
scenes/guide-01.json      the scene spec — data, never generated code
      │
      ▼
src/types.ts              the shape of that data
src/theme.ts              every colour and size, in one place
src/scenes/DiagramScene   boxes, arrows, labels
src/Root.tsx              one Remotion composition per scene
      │
      ▼
out/*.mp4                 1920x1080, 30fps, h264
```

## The rules this follows

1. **The spec is data, not code.** An LLM will eventually write `scenes/*.json` from a guide.
   Generated JSON is reviewable, diffable and cannot break the build. Generated React is none
   of those things.
2. **Coordinates are explicit.** Auto-layout looks auto-laid-out.
3. **Duration will come from the audio.** `durationSeconds` is an M0 placeholder. Once there is
   a voiceover per scene, the scene is as long as its `.wav` — so re-recording one section
   never becomes a manual re-edit.
4. **Nothing spins.** Boxes fade and rise a few pixels, arrows draw along their path, labels
   arrive after the arrow lands.

## Why SVG and not React Flow

The spec named React Flow. For the *video renderer* this uses plain SVG instead: React Flow's
value is pan, zoom, drag and viewport measurement, none of which exist in a fixed 1920x1080
frame, and its measurement machinery is fragile under a headless renderer. Since the spec
already requires explicit coordinates, there is no layout engine to borrow.

React Flow remains the right choice for the **website**, rendering the same `scenes/*.json`
as an interactive diagram. The shared artifact is the spec, which is what decision 2 in
SPEC-Video-Studio.md was actually protecting.

## Next

- **M1** — all 11 GUIDE-01 scenes, voiceover, one stitched video with captions and chapters.
- **M2** — generate the spec from the guide's ASCII diagrams.
- **M3** — the editor UI.
