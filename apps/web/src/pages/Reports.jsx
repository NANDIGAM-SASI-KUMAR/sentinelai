import React from 'react';
import Page, { Card } from '../components/Page.jsx';
const reports = [
  ['Weekly safety summary', 'PDF', 'Generated 2h ago'],
  ['Monthly compliance report', 'PDF', 'Generated yesterday'],
  ['Q2 incident analysis', 'XLSX', 'Generated 3 days ago'],
  ['Camera uptime report', 'PDF', 'Scheduled · Mon 9am'],
];
export default function Reports() {
  return (
    <Page title="Reports" subtitle="Generated & scheduled exports"
      right={<button className="btn btn-primary">+ New report</button>}>
      {reports.map(r => (
        <Card key={r[0]} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(91,141,239,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: 11 }}>{r[1]}</div>
            <div style={{ flex: 1 }}><strong style={{ fontSize: 14 }}>{r[0]}</strong><div className="muted" style={{ fontSize: 11 }}>{r[2]}</div></div>
            <button className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 12 }}>Download</button>
          </div>
        </Card>
      ))}
    </Page>
  );
}
