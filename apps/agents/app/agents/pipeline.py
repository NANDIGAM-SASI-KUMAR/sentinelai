"""The multi-agent pipeline: Watcher -> Investigator -> Analyst -> Responder.
Each agent is a small async step; state flows through a shared dict.
This mirrors a LangGraph state graph (swap in LangGraph for the production build)."""
from app.llm import chat
from app.rag.store import retrieve

SEVERITY_RANK = {"low": 1, "medium": 2, "high": 3, "critical": 4}

async def watcher(state):
    ev = state["event"]
    verdict = await chat(
        "You are the Watcher agent in a video-safety system. Reply only 'NOTEWORTHY' or 'IGNORE'.",
        f"Event: {ev['type']} on {ev['camera']} ({ev['detail']}), confidence {ev['confidence']}.")
    noteworthy = ev["confidence"] >= 0.6 and "IGNORE" not in verdict.upper()
    state["trace"]["watcher"] = {"verdict": verdict, "noteworthy": noteworthy}
    state["noteworthy"] = noteworthy
    return state

async def investigator(state):
    ev = state["event"]
    docs = retrieve(f"{ev['type']} {ev['detail']} {ev['camera']}")
    state["citations"] = [d["id"] for d in docs]
    context = "\n".join(f"- {d['id']}: {d['text']}" for d in docs)
    analysis = await chat(
        "You are the Investigator agent. Using ONLY the provided policy context, explain the risk in 2 sentences. Cite policy IDs.",
        f"Event: {ev['detail']} on {ev['camera']}.\nPolicy context:\n{context}")
    state["trace"]["investigator"] = {"retrieved": state["citations"], "analysis": analysis}
    state["analysis"] = analysis
    return state

async def analyst(state):
    ev = state["event"]
    base = {"ppe_violation": "high", "restricted_zone": "critical",
            "crowd_density": "medium", "loitering": "low"}.get(ev["type"], "medium")
    state["severity"] = base
    state["trace"]["analyst"] = {"severity": base, "risk_window": "14:00-16:00"}
    return state

async def responder(state):
    ev = state["event"]
    title = await chat(
        "You are the Responder agent. Write a 4-6 word alert title only.",
        f"Event: {ev['type']} on {ev['camera']} — {ev['detail']}")
    state["alert"] = {
        "title": title.strip().strip('"')[:80] or "Safety event detected",
        "summary": state.get("analysis", ev["detail"]),
        "severity": state["severity"],
    }
    state["trace"]["responder"] = {"routed_to": "manager", "awaiting_approval": True}
    return state

async def run_pipeline(event: dict):
    state = {"event": event, "trace": {}, "citations": []}
    state = await watcher(state)
    if not state["noteworthy"]:
        return {"alert": None, "trace": state["trace"], "citations": []}
    state = await investigator(state)
    state = await analyst(state)
    state = await responder(state)
    return {"alert": state["alert"], "trace": state["trace"], "citations": state["citations"]}
