"""Tiny RAG store. Keyword-scored retrieval over policy/incident docs.
Swap this for Qdrant + embeddings in production — interface stays the same."""

KNOWLEDGE = [
    {"id": "Safety Policy §3.1", "text": "All personnel in loading and forklift zones must wear a helmet and hi-vis vest at all times."},
    {"id": "Access Policy §4.2", "text": "Server room access is restricted to scheduled windows; after-hours entry requires a matching badge event."},
    {"id": "Incident #2291", "text": "Previous after-hours server-room entry was an unauthorised contractor; escalated to security."},
    {"id": "Crowd Policy §2.0", "text": "Main entrance occupancy must not exceed 40 people; density alerts trigger above threshold."},
    {"id": "Forklift SOP", "text": "Pedestrians must maintain 3m clearance from active forklifts in the loading dock."},
]

def retrieve(query: str, k: int = 3):
    q = set(query.lower().split())
    scored = []
    for doc in KNOWLEDGE:
        words = set(doc["text"].lower().split())
        score = len(q & words)
        if score:
            scored.append((score, doc))
    scored.sort(key=lambda x: -x[0])
    return [d for _, d in scored[:k]]
