<div align="center">

# 🛡️ SentinelAI

### Agentic Visual Intelligence Platform

**Your cameras can see. Now they can think.**

A production-grade SaaS where a team of autonomous AI agents watch video feeds, reason about what's happening, and surface real risk with evidence — built on the MERN stack with a Python multi-agent reasoning layer.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_App-6c5ce7?style=for-the-badge)](https://sentinelai-swart.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-22c79a?style=for-the-badge)](LICENSE)

`React` · `Node.js` · `Express` · `MongoDB` · `Python` · `FastAPI` · `LangGraph` · `RAG` · `Docker`

</div>

---

## 🔗 Live Links

| | |
|---|---|
| 🌐 **Live App** | https://sentinelai-swart.vercel.app |
| ⚙️ **API** | https://sentinelai-9wo1.onrender.com |
| 🧠 **Agents service** | https://sentinelai-brain.onrender.com |

> **Demo login:** `admin@sentinel.ai` / `Admin123!`
> The backend runs on a free tier and sleeps when idle — the first request after a pause may take ~50 seconds to wake up.

---

## 💡 The Problem

Organizations have cameras everywhere, but humans can't watch them all. Footage gets reviewed *after* incidents, not during. Traditional video analytics fire dumb alerts ("motion detected") that bury teams in false positives — they detect objects but don't *reason* about context.

## ✨ The Solution

SentinelAI adds a **reasoning layer** on top of detection. Deep-learning vision models detect events; a multi-agent AI system then understands context ("a person in a restricted zone after hours, with no matching badge access"), investigates against past incidents and policies, scores the risk, and escalates only what matters — with citations and a full audit trail.

---

## 🤖 The Multi-Agent Pipeline

Four autonomous agents collaborate on every significant event, orchestrated as a stateful graph:

| Agent | Role |
|-------|------|
| 👁️ **Watcher** | Filters the firehose — decides which detections are actually noteworthy |
| 🔍 **Investigator** | Runs RAG over past incidents & policies, captions the scene |
| 📊 **Analyst** | Scores severity and forecasts risk windows |
| 📤 **Responder** | Drafts the alert and routes it for human approval |

A **citation guardrail** rejects any claim not backed by retrieved evidence — no hallucinated alerts.

---

## 🧱 Architecture

```
                          ┌────────────────────────┐
   React (Vite) SPA ────► │   Express API (Node)   │ ────► Python Agents (FastAPI)
   • Landing page         │  • JWT auth + RBAC      │       • LangGraph-style graph
   • 13-page dashboard    │  • Alerts, cameras      │       • RAG retrieval
   • Real-time UI         │  • Audit logging        │       • Watcher -> Investigator
                          │  • WebSockets           │         -> Analyst -> Responder
                          └───────────┬────────────┘       • LLM (Groq)
                                      │
                                  MongoDB (Atlas)

   Deployed: Frontend -> Vercel  |  API + Agents -> Render  |  Database -> MongoDB Atlas
```

---

## 🚀 Features

**AI & reasoning**
- Multi-agent workflow with autonomous task planning and tool calling
- Retrieval-Augmented Generation (RAG) with citation enforcement
- Agent memory (scratchpad + episodic incident store)
- Predictive risk analytics

**Platform**
- 13-page dashboard: live monitor, agents, alerts, incidents, analytics, cameras, reports, team, audit log, integrations, billing, settings
- JWT authentication + Role-Based Access Control (6 roles)
- Human-in-the-loop alert approval queue
- Immutable audit log of every human and agent action
- Real-time WebSocket notifications
- Dark / light mode, glassmorphism UI, fully responsive

**Engineering**
- Microservice architecture (frontend / API / agents / database)
- Dockerized — one-command local spin-up with `docker compose up`
- Deployed across Vercel + Render + MongoDB Atlas
- REST APIs, rate limiting, CORS

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, Vite, React Router, custom design system |
| **Backend** | Node.js, Express, JWT, Socket.IO, Mongoose |
| **AI service** | Python, FastAPI, LangGraph-style orchestration, RAG, Groq LLM |
| **Database** | MongoDB (Atlas) |
| **DevOps** | Docker, Docker Compose, Vercel, Render, GitHub |

---

## ⚡ Run Locally

**With Docker (recommended):**
```bash
git clone https://github.com/NANDIGAM-SASI-KUMAR/sentinelai.git
cd sentinelai
cp .env.example .env          # optionally add GROQ_API_KEY (free at console.groq.com)
docker compose up --build
```
- Web -> http://localhost:5173
- API -> http://localhost:4000
- Agents -> http://localhost:8000/docs

Default login: `admin@sentinel.ai` / `Admin123!`

**Without Docker:**
```bash
# API
cd apps/api && npm install && npm run dev
# Agents
cd apps/agents && pip install -r requirements.txt && uvicorn app.main:app --reload --port 8000
# Web
cd apps/web && npm install && npm run dev
```

---

## 📂 Project Structure

```
sentinelai/
├── apps/
│   ├── web/        # React + Vite frontend (landing + 13-page dashboard)
│   ├── api/        # Express API — auth, RBAC, alerts, sockets
│   └── agents/     # Python FastAPI — multi-agent pipeline + RAG
├── docker-compose.yml
└── README.md
```

---

## 🗺️ Roadmap

- [x] JWT auth + RBAC, 13-page dashboard, alerts API
- [x] 4-agent reasoning pipeline with RAG
- [x] Dockerized, deployed to the cloud (Vercel + Render + Atlas)
- [ ] YOLOv8 + DeepSORT vision worker -> real-time detections
- [ ] WebSocket live alert push to dashboard
- [ ] Vector DB (Qdrant), Redis queue + cache
- [ ] Google OAuth + Mobile OTP + CAPTCHA
- [ ] Kubernetes + CI/CD + observability

---

## 👤 Author

**Nandigam Sasi Kumar** — B.Tech, IIIT Sri City
[GitHub](https://github.com/NANDIGAM-SASI-KUMAR)

---

<div align="center">

*Built with a focus on production-grade engineering: multi-agent orchestration, citation-grounded RAG, and a distributed cloud-native architecture.*

</div>