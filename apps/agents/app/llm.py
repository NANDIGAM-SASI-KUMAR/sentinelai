"""LLM client: uses Groq free API if GROQ_API_KEY set, else a deterministic mock."""
import os, httpx

GROQ_KEY = os.getenv("GROQ_API_KEY", "").strip()
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")

async def chat(system: str, user: str) -> str:
    if not GROQ_KEY:
        # Mock fallback — keeps the whole pipeline runnable with zero keys.
        return f"[mock-llm] {user[:160]}"
    async with httpx.AsyncClient(timeout=40) as c:
        resp = await c.post(GROQ_URL,
            headers={"Authorization": f"Bearer {GROQ_KEY}"},
            json={"model": MODEL, "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": user}],
                "temperature": 0.3})
        resp.raise_for_status()
        return resp.json()["choices"][0]["message"]["content"].strip()
