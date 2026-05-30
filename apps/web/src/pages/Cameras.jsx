import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Page, { Card, Pill } from '../components/Page.jsx';
export default function Cameras() {
  const [cams, setCams] = useState([]);
  useEffect(() => { api.get('/cameras').then(r => setCams(r.data)).catch(() => {}); }, []);
  return (
    <Page title="Cameras" subtitle="Camera fleet management">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {cams.map(c => (
          <Card key={c._id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▣</div>
              <div style={{ flex: 1 }}><strong style={{ fontSize: 14 }}>{c.name}</strong><div className="muted" style={{ fontSize: 11 }}>{c.location} · {(c.rules || []).join(', ')}</div></div>
              <Pill color={c.status === 'online' ? 'low' : ''}>{c.status}</Pill>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}
