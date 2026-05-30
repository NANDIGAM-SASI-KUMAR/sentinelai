import React from 'react';
import Page, { Pill } from '../components/Page.jsx';
const rows = [
  ['#2294', 'PPE violation', 'Loading dock', 'Resolved', 'low'],
  ['#2293', 'Zone intrusion', 'Server room', 'Escalated', 'critical'],
  ['#2291', 'After-hours access', 'Server room', 'Review', 'medium'],
  ['#2288', 'Crowd density', 'Main entrance', 'Resolved', 'low'],
  ['#2285', 'Loitering', 'Parking lot', 'Dismissed', ''],
];
export default function Incidents() {
  return (
    <Page title="Incidents" subtitle="Full incident history">
      <div className="glass" style={{ borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '.7fr 1.3fr 1.2fr 1fr', padding: '12px 16px', background: 'rgba(255,255,255,.04)', fontSize: 12, color: 'var(--muted)' }}>
          <span>ID</span><span>Type</span><span>Location</span><span>Status</span>
        </div>
        {rows.map(r => (
          <div key={r[0]} style={{ display: 'grid', gridTemplateColumns: '.7fr 1.3fr 1.2fr 1fr', padding: '13px 16px', fontSize: 13, borderTop: '1px solid var(--border)', alignItems: 'center' }}>
            <span style={{ color: 'var(--accent)' }}>{r[0]}</span><span>{r[1]}</span><span className="muted">{r[2]}</span><Pill color={r[4]}>{r[3]}</Pill>
          </div>
        ))}
      </div>
    </Page>
  );
}
