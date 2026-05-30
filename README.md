# SentinelAI — Agentic Visual Intelligence Platform

A production-grade starter for an agentic visual-intelligence SaaS: a MERN backend with
JWT auth + RBAC, a React dashboard, and a Python multi-agent (LangGraph-style) service
with RAG. Runs end-to-end with `docker compose up`.

> This is a **working foundation** (the hard wiring is done). The computer-vision worker
> (YOLOv8 + DeepSORT) and full Kubernetes deploy are scaffolded as next steps in the roadmap.

## Architecture
```
React (Vite)  ──REST/WS──►  Express API (auth, RBAC, alerts)  ──HTTP──►  Python Agents (FastAPI)
                                      │                                        │
                                   MongoDB                                  RAG + LLM (Groq free tier)
```

## Quick start
```bash
cp .env.example .env          # optionally add GROQ_API_KEY (free at console.groq.com)
docker compose up --build
```
- Web:    http://localhost:5173
- API:    http://localhost:4000
- Agents: http://localhost:8000/docs

Default login (auto-seeded):  admin@sentinel.ai / Admin123!

## Without Docker (dev)
```bash
# 1. API
cd apps/api && npm install && npm run dev
# 2. Agents
cd apps/agents && pip install -r requirements.txt && uvicorn app.main:app --reload --port 8000
# 3. Web
cd apps/web && npm install && npm run dev
```

## The 4 agents
| Agent | Role |
|-------|------|
| Watcher | Decides if a detection event is noteworthy |
| Investigator | RAG over past incidents + policies, captions the scene |
| Analyst | Scores severity, forecasts risk |
| Responder | Drafts the alert + routes for human approval |

## Stack
MERN (MongoDB, Express, React, Node) · Python FastAPI · LangGraph-style orchestration ·
RAG · JWT + RBAC · WebSockets · Docker.

## Roadmap
- [x] Auth (JWT + RBAC), dashboard, alerts API, 4-agent pipeline, RAG, Docker
- [ ] YOLOv8 + DeepSORT vision worker → emits events to queue
- [ ] Real-time WebSocket alert push to dashboard
- [ ] Vector DB (Qdrant), BullMQ queue, Redis cache
- [ ] OTP + Google OAuth, CAPTCHA
- [ ] Kubernetes + CI/CD + observability
