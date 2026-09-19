# Voiceover

Drop recordings here. The filename in the scene spec's `audio` field is relative to this
folder, so `"audio": "guide-01/scene-02-client-server.wav"` means
`course/video/audio/guide-01/scene-02-client-server.wav`.

## How it works

**The recording sets the length of the scene.** Not the other way round.

- Record a scene. Drop the wav in. Re-render. The scene is now as long as your voice,
  plus a 1.2 second tail so the picture does not cut the instant you stop talking.
- `durationSeconds` in the spec is only the fallback used *before* a recording exists.
- If the file is missing, the scene still renders — silently, at the fallback length.
  Nothing breaks, so you can name a recording before you have made it.

This is what makes re-recording cheap. Re-record one section, drop in the new wav, and the
timeline re-flows on its own. Never edit timings by hand to match a recording.

## Recording

- **One take per scene**, not one take for the whole video. A fluff means redoing 20 seconds.
- Wav, mono is fine, 44.1kHz or 48kHz.
- Leave about half a second of silence at the start and end.
- Quiet room, mic close, no music.
- Read it as if explaining to one person, not presenting to a room.

## Scene 02 — client and server

File: `guide-01/scene-02-client-server.wav`

> Every web application is two separate programs, on two separate computers, talking to each
> other over the internet.
>
> On your side, the browser. That is the client — the one that asks.
>
> Somewhere else, a server. Powered on, waiting, ready to answer.
>
> When you open a site, the browser sends a request: *give me the videos.*
>
> And the server sends back a response: *here they are.*
>
> That is the whole shape of it. The client asks. The server answers. Everything else in this
> course is detail on top of those two boxes.

The visuals are timed to land with it: browser at 1.2s, server at 2.4s, the request arrow at
5.6s, the response at 9.4s, the closing line at 13.2s. If your read is much faster or slower,
change those `appearAt` values in `scenes/guide-01.json` rather than changing your delivery.
