import React from 'react';
import Page, { Card } from '../components/Page.jsx';
const log = [
  ['Sasi K.', 'Confirmed alert #2291', '2m ago', false],
  ['AI Agent', 'Generated alert from Cam 07', '8m ago', true],
  ['Maya R.', 'Updated access policy §4.2', '1h ago', false],
  ['James P.', 'Dismissed alert #2280', '2h ago', false],
  ['AI Agent', 'Ran pipeline on Cam 14 event', '3h ago', true],
];
export default function Audit() {
  return (
    <Page title="Audit Log" subtitle="Immutable record of every action">
      {log.map((a, i) => (
        <Card key={i} style={{ marginBottom: 8, padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: a[3] ? 'rgba(124,92,255,.2)' : 'rgba(91,141,239,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: a[3] ? '#a78bff' : 'var(--accent)', fontSize: 11 }}>{a[3] ? 'AI' : a[0][0]}</div>
            <span style={{ fontSize: 13, flex: 1 }}>{a[1]}</span>
            <span className="muted" style={{ fontSize: 11 }}>{a[2]}</span>
          </div>
        </Card>
      ))}
    </Page>
  );
}
