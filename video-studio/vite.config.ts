import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Lets the capture page write the timings straight back into the scene spec.
 * Without this you would be downloading a JSON file and moving it by hand,
 * which is exactly the kind of friction that stops a tool getting used.
 */
function writeSpec(): Plugin {
  return {
    name: 'write-spec',
    configureServer(server) {
      server.middlewares.use('/__write-spec', (req, res) => {
        if (req.method !== 'POST') return res.end()
        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', () => {
          try {
            const { file, contents } = JSON.parse(body)
            const target = path.resolve(process.cwd(), 'scenes', path.basename(file))
            fs.writeFileSync(target, JSON.stringify(contents, null, 2) + '\n')
            res.end(JSON.stringify({ ok: true, target }))
          } catch (err) {
            res.statusCode = 500
            res.end(JSON.stringify({ ok: false, error: String(err) }))
          }
        })
      })
    },
  }
}

/** Writes a recorded take into the course repo, beside the guides. */
function writeAudio(): Plugin {
  return {
    name: 'write-audio',
    configureServer(server) {
      server.middlewares.use('/__write-audio', (req, res) => {
        if (req.method !== 'POST') return res.end()
        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', () => {
          try {
            const { file, base64 } = JSON.parse(body)
            // Never escape the audio directory, whatever the client sends.
            const safe = String(file).replace(/\.\./g, '').replace(/^\/+/, '')
            const target = path.resolve(__dirname, '../course/video/audio', safe)
            fs.mkdirSync(path.dirname(target), { recursive: true })
            fs.writeFileSync(target, Buffer.from(base64, 'base64'))
            res.end(JSON.stringify({ ok: true, target }))
          } catch (err) {
            res.statusCode = 500
            res.end(JSON.stringify({ ok: false, error: String(err) }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  root: 'capture',
  plugins: [react(), writeSpec(), writeAudio()],
  // Voiceover lives in the course repo, same as for rendering.
  publicDir: path.resolve(__dirname, '../course/video'),
  server: { port: 5174, open: true },
})
