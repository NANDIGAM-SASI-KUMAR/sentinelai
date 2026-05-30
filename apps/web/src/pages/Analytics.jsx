import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Page, { Metric, Card } from '../components/Page.jsx';
export default function Analytics() {
  const [s, setS] = useState(null);
  useEffect(() => { api.get('/analytics/summary').then(r => setS(r.data)).catch(() => {}); }, []);
  const bars = [['PPE violations', 82, '#fb9a6f'], ['Zone intrusion', 64, '#7c5cff'], ['Crowd density', 47, '#5b8def'], ['Loitering', 38, '#f5b544']];
  return (
    <Page title="Analytics" subtitle="Operational intelligence & forecasting">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
        <Metric label="False-positive rate" value={s?.falsePositiveRate ?? '3.2%'} sub="↓ vs manual" color="var(--green)" />
        <Metric label="Incidents" value={s?.alerts ?? '1,284'} sub="all time" />
        <Metric label="Time saved" value="6.5h" sub="per operator/day" color="var(--green)" />
        <Metric label="Risk peak" value="14-16h" sub="forecast" color="var(--amber)" />
      </div>
      <Card>
        <div style={{ fontSize: 14, marginBottom: 16 }}>Incidents by type</div>
        {bars.map(([l, v, c]) => (
          <div key={l} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}><span className="muted">{l}</span><span>{v}</span></div>
            <div style={{ height: 8, background: 'rgba(255,255,255,.06)', borderRadius: 20 }}><div style={{ height: '100%', width: `${v / 82 * 100}%`, background: c, borderRadius: 20 }} /></div>
          </div>
        ))}
      </Card>
    </Page>
  );
}
