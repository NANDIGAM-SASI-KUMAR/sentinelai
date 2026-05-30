import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Page, { Metric, Card } from '../components/Page.jsx';

export default function Dashboard() {
  const [s, setS] = useState(null);
  const [running, setRunning] = useState(false);
  const [last, setLast] = useState(null);
  useEffect(() => { api.get('/analytics/summary').then(r => setS(r.data)).catch(() => {}); }, []);
  const run = async () => {
    setRunning(true);
    try { const { data } = await api.post('/agents/run', {}); setLast(data); }
    catch (e) { setLast({ error: e.response?.data?.error || 'failed' }); }
    setRunning(false);
  };
  const bars = [30,42,38,55,48,62,40,35,50,68,75,60,82,90,72,65,80,95,88,70];
  const agents = [['Watcher','#5b8def'],['Investigator','#7c5cff'],['Analyst','#22c79a'],['Responder','#fb9a6f']];
  return (
    <Page title="Dashboard" subtitle="Command center — live operations overview"
      right={<button className="btn btn-primary" onClick={run} disabled={running}>{running ? 'Agents running…' : '▶ Run agent pipeline'}</button>}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
        <Metric label="Active cameras" value={s?.cameras ?? '—'} sub="connected" color="var(--green)" />
        <Metric label="Events today" value={s?.eventsToday?.toLocaleString() ?? '—'} sub="live ingest" />
        <Metric label="Alerts" value={s?.alerts ?? '—'} sub={`${s?.pending ?? 0} pending`} color="var(--amber)" />
        <Metric label="Avg response" value={s?.avgResponse ?? '—'} sub="agent decision" color="var(--green)" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14, marginBottom: 14 }}>
        <Card>
          <div style={{ fontSize: 14, marginBottom: 14 }}>Event activity — last 24h</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 120 }}>
            {bars.map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, background: h > 80 ? 'var(--red)' : h > 60 ? 'var(--amber)' : 'var(--accent)', borderRadius: '3px 3px 0 0' }} />)}
          </div>
        </Card>
        <Card>
          <div style={{ fontSize: 14, marginBottom: 12 }}>Agent pipeline</div>
          {agents.map(([n, c], i) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', background: 'rgba(255,255,255,.04)', borderRadius: 9, marginBottom: 6 }}>
              <span style={{ width: 24, height: 24, borderRadius: 7, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff' }}>{i + 1}</span>
              <span style={{ fontSize: 13, flex: 1 }}>{n}</span>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)' }} />
            </div>
          ))}
        </Card>
      </div>
      {last && (
        <Card>
          <div style={{ fontSize: 14, marginBottom: 12 }}>Latest agent run</div>
          {last.error ? <p style={{ color: 'var(--red)' }}>{last.error}</p> : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <strong>{last.alert?.title}</strong>
                <span className={`pill sev-${last.alert?.severity}`}>{last.alert?.severity}</span>
              </div>
              <p className="muted" style={{ fontSize: 13, marginBottom: 8 }}>{last.alert?.summary}</p>
              <div className="muted" style={{ fontSize: 12 }}>Cited: {(last.citations || []).join(', ') || 'none'}</div>
            </>
          )}
        </Card>
      )}
    </Page>
  );
}
