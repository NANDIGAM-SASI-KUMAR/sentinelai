import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Page, { Card, Pill } from '../components/Page.jsx';
export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const load = () => api.get('/alerts').then(r => setAlerts(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);
  const act = async (id, status) => { await api.patch(`/alerts/${id}`, { status }); load(); };
  return (
    <Page title="Alerts" subtitle="Human-in-the-loop review queue">
      {alerts.map(a => (
        <Card key={a._id} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <strong style={{ fontSize: 15 }}>{a.title}</strong><Pill color={a.severity}>{a.severity}</Pill>
            <span className="muted" style={{ fontSize: 12, marginLeft: 'auto' }}>{a.cameraName}</span>
          </div>
          <p className="muted" style={{ fontSize: 13, marginBottom: a.citations?.length ? 8 : 12 }}>{a.summary}</p>
          {a.citations?.length > 0 && <div className="muted" style={{ fontSize: 11, marginBottom: 12 }}>⌖ Cited: {a.citations.join(', ')}</div>}
          {a.status === 'pending'
            ? <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn" style={{ background: 'var(--green)', color: '#fff', padding: '8px 16px', fontSize: 13 }} onClick={() => act(a._id, 'confirmed')}>Confirm & escalate</button>
                <button className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }} onClick={() => act(a._id, 'dismissed')}>Dismiss</button>
              </div>
            : <Pill>{a.status}</Pill>}
        </Card>
      ))}
      {alerts.length === 0 && <p className="muted">No alerts yet — run the agent pipeline from the dashboard.</p>}
    </Page>
  );
}
