import React from 'react';
import Page, { Card, Pill } from '../components/Page.jsx';
const team = [
  ['Sasi Kumar', 'Super Admin', '#7c5cff'],
  ['Maya Rodriguez', 'Compliance Manager', '#22c79a'],
  ['James Park', 'Analyst', '#5b8def'],
  ['Aisha Khan', 'Operator', '#f5b544'],
  ['Tom Lee', 'Auditor (read-only)', '#8b93a7'],
];
export default function Team() {
  return (
    <Page title="Team & Roles" subtitle="Members and role-based access control"
      right={<button className="btn btn-primary">+ Invite member</button>}>
      {team.map(t => (
        <Card key={t[0]} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: t[2], display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600 }}>{t[0][0]}</div>
            <div style={{ flex: 1 }}><strong style={{ fontSize: 14 }}>{t[0]}</strong><div className="muted" style={{ fontSize: 11 }}>{t[1]}</div></div>
            <Pill color="low">active</Pill>
          </div>
        </Card>
      ))}
    </Page>
  );
}
