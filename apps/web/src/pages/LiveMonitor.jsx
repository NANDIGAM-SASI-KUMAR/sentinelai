import React from 'react';
import Page from '../components/Page.jsx';

const feeds = [
  ['Loading dock', 'Cam 14', 'person 0.94', 'var(--green)', 'forklift 0.88', 'var(--amber)'],
  ['Main entrance', 'Cam 22', 'crowd 0.91', 'var(--amber)'],
  ['Server room', 'Cam 07', 'person 0.89', 'var(--red)'],
  ['Parking lot', 'Cam 03', 'idle', 'var(--accent)'],
];

function Feed({ name, cam, tag, col, tag2, col2 }) {
  return (
    <div style={{ position: 'relative', background: '#070a12', border: '1px solid var(--border)', borderRadius: 12, aspectRatio: '16/10', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg,rgba(255,255,255,.02) 0 2px,transparent 2px 4px)' }} />
      <div style={{ position: 'absolute', top: '32%', left: '26%', width: 44, height: 66, border: `2px solid ${col}`, borderRadius: 3 }}>
        <span style={{ position: 'absolute', top: -15, left: -2, fontSize: 9, background: col, color: '#000', padding: '1px 4px', borderRadius: 3 }}>{tag}</span>
      </div>
      {tag2 && <div style={{ position: 'absolute', top: '48%', left: '56%', width: 56, height: 36, border: `2px solid ${col2}`, borderRadius: 3 }}>
        <span style={{ position: 'absolute', top: -15, left: -2, fontSize: 9, background: col2, color: '#000', padding: '1px 4px', borderRadius: 3 }}>{tag2}</span>
      </div>}
      <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 5, alignItems: 'center' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--red)' }} /><span style={{ fontSize: 10, color: '#fff' }}>LIVE</span>
      </div>
      <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: '#fff' }}>{name}</span><span style={{ fontSize: 10, color: 'var(--muted)' }}>{cam}</span>
      </div>
    </div>
  );
}

export default function LiveMonitor() {
  return (
    <Page title="Live Monitor" subtitle="Real-time detection — YOLOv8 + DeepSORT">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {feeds.map(f => <Feed key={f[1]} name={f[0]} cam={f[1]} tag={f[2]} col={f[3]} tag2={f[4]} col2={f[5]} />)}
      </div>
    </Page>
  );
}
