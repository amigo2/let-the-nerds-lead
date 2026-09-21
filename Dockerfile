# --- build the React bundle ---
FROM node:22-slim AS web
WORKDIR /web
COPY web/package*.json ./
RUN npm ci --no-fund --no-audit
COPY web/ ./
RUN npm run build

# --- runtime ---
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /srv

COPY app/requirements.txt app/requirements.txt
RUN pip install --no-cache-dir -r app/requirements.txt

COPY app app

# The course itself. This app reads the markdown off disk on every request —
# there is no database and no copy of the content anywhere else — so the guides
# have to be in the image. Rebuilding is how the site gets new material.
COPY course course

# The scene specs drive the interactive diagrams on a lesson page. Only the
# specs are needed; the renderer and its node_modules stay out.
COPY video-studio/scenes video-studio/scenes

COPY --from=web /web/dist web/dist

EXPOSE 8000

# One container serves both the API and the built React app from the same
# origin, so there is no CORS and nothing else to deploy.
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
