# One verb per thing you need to do, so nothing has to be remembered.
# Modelled on the studio app — see course/notes/instructor/REFERENCE-Old-Street-Studios.md

PY      := .venv/bin/python
PIP     := .venv/bin/pip
UVICORN := .venv/bin/uvicorn
PORT    ?= 8010

.PHONY: help install api web dev build serve typecheck video capture clean
.DEFAULT_GOAL := help

help:  ## show this
	@grep -hE '^[a-z-]+:.*##' $(MAKEFILE_LIST) | sed 's/:.*##/|/' | awk -F'|' '{printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

install:  ## venv, python deps, node deps
	python3.11 -m venv .venv
	$(PIP) install -q -r app/requirements.txt
	cd web && npm install
	cd video-studio && npm install

api:  ## FastAPI only -> http://localhost:$(PORT)
	$(UVICORN) app.main:app --reload --port $(PORT)

web:  ## Vite only -> http://localhost:5173
	cd web && npm run dev

dev:  ## both: API on $(PORT), app on http://localhost:5173
	@$(MAKE) -j2 api web

build:  ## production bundle; FastAPI then serves web/dist from the same origin
	cd web && npm run build

serve: build  ## build, then serve everything from one origin
	$(UVICORN) app.main:app --port $(PORT)

typecheck:  ## strict TS across both frontends
	cd web && npm run typecheck
	cd video-studio && npx tsc --noEmit

video:  ## render the GUIDE-01 lesson -> course/video/out/
	cd video-studio && npm run render

capture:  ## cue capture + interactive preview -> http://localhost:5174
	cd video-studio && npm run capture

clean:  ## remove build output
	rm -r web/dist || true
