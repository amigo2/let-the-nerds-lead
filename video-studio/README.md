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

## Stepping through a scene

```bash
npm run capture     # http://localhost:5174
```

**Arrows. That is the whole interaction.**

| Key | Does |
|---|---|
| `→` | reveal the next thing |
| `←` | take the last one back |
| `[` `]` | previous / next shot |

Press `→` and the next box or arrow appears. Press it again for the one after. Read the
script aloud while you step and you are doing two jobs at once: **each press is timestamped
against the player's own clock**, so the pace you set becomes the scene's timing. There is
no record mode to remember to switch on.

When the last thing has landed, **Save timings to spec** writes those moments and the scene
length into `scenes/guide-01.json`. **Start over** throws the take away. Nothing is written
until you press save, so step through it as often as you like.

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
