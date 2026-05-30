import React from 'react';
import Page, { Card } from '../components/Page.jsx';
const secs = [
  ['Authentication', ['Mobile OTP', 'Google OAuth', 'JWT + refresh rotation', 'CAPTCHA', 'Session management']],
  ['Access control', ['RBAC (6 roles)', 'Tenant isolation', 'Scoped agent permissions', 'Audit logging']],
  ['AI configuration', ['Agent workflow builder', 'RAG knowledge base', 'Detection rules & zones', 'Fine-tuning hooks']],
  ['Notifications', ['Email alerts', 'Slack', 'Push notifications', 'Digest schedule']],
];
export default function Settings() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <Page title="Settings" subtitle={`Signed in as ${user.email || ''} · role: ${user.role || ''}`}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {secs.map(([t, items]) => (
          <Card key={t}>
            <strong style={{ fontSize: 15 }}>{t}</strong>
            <div style={{ marginTop: 10 }}>{items.map(i => <div key={i} className="muted" style={{ fontSize: 13, padding: '4px 0' }}>✓ {i}</div>)}</div>
          </Card>
        ))}
      </div>
    </Page>
  );
}
