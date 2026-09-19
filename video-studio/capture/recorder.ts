/**
 * Recording the voiceover in the browser, and saving it as a wav.
 *
 * MediaRecorder gives webm/opus, which Remotion's <Audio> is not reliable with.
 * So the recording is decoded with the Web Audio API and re-encoded as a plain
 * 16-bit wav — the format everything downstream already handles, and the one
 * the scene spec expects.
 */

export interface Recording {
  wav: Blob
  seconds: number
}

export async function startRecording(): Promise<{
  stop: () => Promise<Recording>
  cancel: () => void
}> {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: true, noiseSuppression: true },
  })
  const chunks: BlobPart[] = []
  const recorder = new MediaRecorder(stream)
  recorder.ondataavailable = (e) => e.data.size > 0 && chunks.push(e.data)
  recorder.start()

  const release = () => stream.getTracks().forEach((t) => t.stop())

  return {
    cancel: () => {
      if (recorder.state !== 'inactive') recorder.stop()
      release()
    },
    stop: () =>
      new Promise<Recording>((resolve, reject) => {
        recorder.onstop = async () => {
          release()
          try {
            const raw = new Blob(chunks, { type: recorder.mimeType })
            const ctx = new AudioContext()
            const audio = await ctx.decodeAudioData(await raw.arrayBuffer())
            await ctx.close()
            resolve({ wav: encodeWav(audio), seconds: audio.duration })
          } catch (err) {
            reject(err)
          }
        }
        recorder.stop()
      }),
  }
}

/** Mono 16-bit PCM wav. Small, universal, and what the renderer wants. */
function encodeWav(buffer: AudioBuffer): Blob {
  const samples = buffer.getChannelData(0)
  const rate = buffer.sampleRate
  const out = new ArrayBuffer(44 + samples.length * 2)
  const view = new DataView(out)

  const text = (offset: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(offset + i, s.charCodeAt(i))
  }

  text(0, 'RIFF')
  view.setUint32(4, 36 + samples.length * 2, true)
  text(8, 'WAVE')
  text(12, 'fmt ')
  view.setUint32(16, 16, true)          // chunk size
  view.setUint16(20, 1, true)           // PCM
  view.setUint16(22, 1, true)           // mono
  view.setUint32(24, rate, true)
  view.setUint32(28, rate * 2, true)    // byte rate
  view.setUint16(32, 2, true)           // block align
  view.setUint16(34, 16, true)          // bits per sample
  text(36, 'data')
  view.setUint32(40, samples.length * 2, true)

  let offset = 44
  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]))
    view.setInt16(offset, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true)
    offset += 2
  }
  return new Blob([out], { type: 'audio/wav' })
}

export async function toBase64(blob: Blob): Promise<string> {
  const buf = new Uint8Array(await blob.arrayBuffer())
  let binary = ''
  const CHUNK = 0x8000 // avoid blowing the call stack on a long take
  for (let i = 0; i < buf.length; i += CHUNK) {
    binary += String.fromCharCode(...buf.subarray(i, i + CHUNK))
  }
  return btoa(binary)
}
