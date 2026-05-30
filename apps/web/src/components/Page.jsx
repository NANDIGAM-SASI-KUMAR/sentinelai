import React from 'react';

export default function Page({ title, subtitle, right, children }) {
  return (
    <div className="reveal">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 22, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700 }}>{title}</h1>
          {subtitle && <p className="muted" style={{ fontSize: 14, marginTop: 5 }}>{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

export function Metric({ label, value, sub, color }) {
  return (
    <div className="glass" style={{ padding: 18, borderRadius: 'var(--radius)' }}>
      <div className="muted" style={{ fontSize: 12.5 }}>{label}</div>
      <div style={{ fontSize: 27, fontWeight: 700, marginTop: 6, fontFamily: 'var(--font-display)' }}>{value}</div>
      {sub && <div style={{ fontSize: 11.5, marginTop: 4, color: color || 'var(--muted)' }}>{sub}</div>}
    </div>
  );
}

export function Card({ children, style }) {
  return <div className="glass" style={{ padding: 18, borderRadius: 'var(--radius)', ...style }}>{children}</div>;
}

export function Pill({ children, color }) {
  const map = { critical: 'sev-critical', high: 'sev-high', medium: 'sev-medium', low: 'sev-low' };
  return <span className={`pill ${map[color] || ''}`} style={!map[color] ? { background: 'var(--surface2)', color: 'var(--muted)' } : {}}>{children}</span>;
}
