import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'node:fs'
import { spawn } from 'node:child_process'
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

/**
 * Renders a composition to MP4, from the browser.
 *
 * Rendering is a Node job — it drives a headless browser and shells out to
 * ffmpeg — so it cannot happen in the page. The page starts one and asks how it
 * is doing; the work happens here.
 */
type Job = { status: 'running' | 'done' | 'failed'; log: string; out: string }
const jobs = new Map<string, Job>()

function render(): Plugin {
  return {
    name: 'render',
    configureServer(server) {
      server.middlewares.use('/__render', (req, res) => {
        const url = new URL(req.url ?? '', 'http://localhost')
        res.setHeader('Content-Type', 'application/json')

        // How is it going?
        const id = url.searchParams.get('id')
        if (req.method === 'GET' && id) {
          return res.end(JSON.stringify(jobs.get(id) ?? { status: 'failed', log: 'no such job', out: '' }))
        }

        if (req.method !== 'POST') return res.end('{}')

        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', () => {
          const { composition, out } = JSON.parse(body)
          // Only ever write inside the course's video output directory.
          const safe = String(out).replace(/\.\./g, '').replace(/^\/+/, '')
          const target = path.resolve(__dirname, '../course/video/out', safe)
          const jobId = String(Date.now())
          const job: Job = { status: 'running', log: '', out: target }
          jobs.set(jobId, job)

          fs.mkdirSync(path.dirname(target), { recursive: true })
          const child = spawn('npx', ['remotion', 'render', String(composition), target], {
            cwd: __dirname,
          })
          const note = (d: Buffer) => { job.log = (job.log + d.toString()).slice(-4000) }
          child.stdout.on('data', note)
          child.stderr.on('data', note)
          child.on('close', (code) => { job.status = code === 0 ? 'done' : 'failed' })

          res.end(JSON.stringify({ id: jobId }))
        })
      })
    },
  }
}

export default defineConfig({
  root: 'capture',
  plugins: [react(), writeSpec(), writeAudio(), render()],
  // Voiceover lives in the course repo, same as for rendering.
  publicDir: path.resolve(__dirname, '../course/video'),
  server: { port: 5174, open: true },
})
