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

## Capturing timings from a performance

```bash
npm run capture     # http://localhost:5174
```

Rather than guessing `appearAt` values and then recording a voiceover that has to match
them, you drive the pace yourself:

1. Pick the scene, hit **Start** (or Enter). The scene begins playing, empty.
2. **Read the script aloud** — it is on screen.
3. Tap **SPACE** at the moment each element should land. The panel shows what is next.
4. When the last cue fires the take ends. **Save timings to spec** writes the `appearAt`
   values and the scene length straight into `scenes/guide-01.json`.

The clock is the Player's own frame counter, not wall time, so a cue lands on exactly the
frame the rendered video will show it on.

Record your voice on a separate recorder during the same take and the two are in sync by
construction — the timings came from that performance. Re-take as often as you like; it
only writes when you press save.

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
