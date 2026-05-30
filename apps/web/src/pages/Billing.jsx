import React from 'react';
import Page, { Metric, Card } from '../components/Page.jsx';
export default function Billing() {
  return (
    <Page title="Billing & Plan" subtitle="Subscription and usage">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 14 }}>
        <Metric label="Plan" value="Enterprise" sub="annual" color="var(--accent)" />
        <Metric label="Cameras used" value="248 / 500" sub="49% of limit" />
        <Metric label="Next invoice" value="$4,200" sub="due Jun 30" color="var(--amber)" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Card>
          <strong style={{ fontSize: 15 }}>Usage this month</strong>
          <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}><span>Events processed</span><span>2.1M / 5M</span></div>
            <div style={{ height: 8, background: 'rgba(255,255,255,.06)', borderRadius: 20 }}><div style={{ height: '100%', width: '42%', background: 'var(--accent)', borderRadius: 20 }} /></div>
          </div>
        </Card>
        <Card>
          <strong style={{ fontSize: 15 }}>Payment method</strong>
          <div className="muted" style={{ marginTop: 12, fontSize: 13 }}>Visa ending 4242<br />Expires 09/27</div>
          <button className="btn btn-ghost" style={{ marginTop: 12, padding: '8px 14px', fontSize: 12 }}>Update</button>
        </Card>
      </div>
    </Page>
  );
}
