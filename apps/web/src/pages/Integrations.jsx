import React from 'react';
import Page, { Card } from '../components/Page.jsx';
const apps = [
  ['Slack', 'Notifications', true], ['PagerDuty', 'Escalation', true],
  ['Jira', 'Ticketing', false], ['Google Drive', 'Storage', true],
  ['Webhooks', 'Custom events', false], ['Genetec', 'Access control', false],
];
export default function Integrations() {
  return (
    <Page title="Integrations" subtitle="Connect your tools">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {apps.map(([n, d, on]) => (
          <Card key={n}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,.06)' }} />
              <div style={{ flex: 1 }}><strong style={{ fontSize: 14 }}>{n}</strong><div className="muted" style={{ fontSize: 11 }}>{d}</div></div>
              <button className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 12, ...(on ? { background: 'rgba(34,199,154,.2)', color: 'var(--green)' } : {}) }}>{on ? 'Connected' : 'Connect'}</button>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}
