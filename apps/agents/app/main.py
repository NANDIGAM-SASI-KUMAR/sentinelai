from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.agents.pipeline import run_pipeline

app = FastAPI(title="SentinelAI Agents")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class Event(BaseModel):
    camera: str = "Camera 14"
    type: str = "ppe_violation"
    detail: str = "person without helmet near forklift"
    confidence: float = 0.94

class RunReq(BaseModel):
    event: Event

@app.get("/health")
def health():
    return {"ok": True, "service": "agents"}

@app.post("/run")
async def run(req: RunReq):
    return await run_pipeline(req.event.model_dump())
