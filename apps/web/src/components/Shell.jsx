import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const groups = [
  ['MONITOR', [['/app', 'Dashboard', '◧'], ['/app/live', 'Live Monitor', '▦'], ['/app/cameras', 'Cameras', '▣']]],
  ['INTELLIGENCE', [['/app/agents', 'AI Agents', '◉'], ['/app/alerts', 'Alerts', '◬'], ['/app/incidents', 'Incidents', '▤'], ['/app/analytics', 'Analytics', '◈']]],
  ['MANAGE', [['/app/reports', 'Reports', '▥'], ['/app/team', 'Team & Roles', '◎'], ['/app/audit', 'Audit Log', '▦']]],
  ['SETUP', [['/app/integrations', 'Integrations', '◉'], ['/app/billing', 'Billing', '◫'], ['/app/settings', 'Settings', '⚙']]],
];

export default function Shell() {
  const [theme, setTheme] = useState('dark');
  const nv = useNavigate();
  document.documentElement.setAttribute('data-theme', theme);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const logout = () => { localStorage.clear(); nv('/'); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div className="ambient" />
      <aside className="glass" style={{ width: 230, padding: '18px 14px', position: 'sticky', top: 0, height: '100vh', borderRadius: 0, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, cursor: 'pointer' }} onClick={() => nv('/')}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,var(--accent),var(--accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: '#fff' }}>S</div>
          <div><div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>SentinelAI</div></div>
        </div>
        {groups.map(([label, items]) => (
          <div key={label}>
            <div style={{ fontSize: 10, color: 'var(--faint)', letterSpacing: '.5px', margin: '14px 0 6px 4px' }}>{label}</div>
            {items.map(([to, lab, icon]) => (
              <NavLink key={to} to={to} end={to === '/app'} style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 9, padding: '8px 11px', borderRadius: 9, marginBottom: 2,
                fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 500,
                color: isActive ? '#fff' : 'var(--muted)',
                background: isActive ? 'linear-gradient(120deg,var(--accent),var(--accent2))' : 'transparent',
              })}>
                <span style={{ width: 16 }}>{icon}</span>{lab}
              </NavLink>
            ))}
          </div>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: 14 }}>
          <div className="glass" style={{ padding: 10, borderRadius: 11, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,var(--accent),var(--accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#fff' }}>{(user.name || 'A')[0]}</div>
            <div style={{ minWidth: 0 }}><div style={{ fontSize: 12.5, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name || 'Admin'}</div><div className="muted" style={{ fontSize: 10.5 }}>{user.role || 'super_admin'}</div></div>
          </div>
          <button className="btn btn-ghost" style={{ width: '100%', marginBottom: 7, padding: '9px', fontSize: 12.5 }} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? '☀ Light' : '☾ Dark'} mode</button>
          <button className="btn btn-ghost" style={{ width: '100%', padding: '9px', fontSize: 12.5 }} onClick={logout}>Log out</button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: 30, maxWidth: 1200 }}><Outlet /></main>
    </div>
  );
}
