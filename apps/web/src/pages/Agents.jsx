import React from 'react';
import Page, { Card } from '../components/Page.jsx';
const agents = [
  ['Watcher', 'Filters the firehose — decides which detections are noteworthy.', '#5b8def'],
  ['Investigator', 'RAG over policies & past incidents; captions the scene.', '#7c5cff'],
  ['Analyst', 'Scores severity and forecasts risk windows.', '#22c79a'],
  ['Responder', 'Drafts the alert and routes for human approval.', '#fb9a6f'],
];
export default function Agents() {
  return (
    <Page title="AI Agents" subtitle="The multi-agent reasoning pipeline">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {agents.map(([n, d, c], i) => (
          <Card key={n}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ width: 34, height: 34, borderRadius: 9, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600 }}>{i + 1}</span>
              <strong style={{ fontSize: 15 }}>{n} agent</strong>
            </div>
            <p className="muted" style={{ fontSize: 13 }}>{d}</p>
          </Card>
        ))}
      </div>
      <Card style={{ marginTop: 12 }}>
        <strong style={{ fontSize: 14 }}>Shared infrastructure</strong>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
          {['LangGraph orchestration', 'Episodic memory', 'Citation guardrail', 'Tool registry', 'RAG retrieval'].map(t =>
            <span key={t} className="pill" style={{ background: 'var(--surface2)', color: 'var(--muted)' }}>{t}</span>)}
        </div>
      </Card>
    </Page>
  );
}
