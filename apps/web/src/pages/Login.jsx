import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function Login() {
  const [email, setEmail] = useState('admin@sentinel.ai');
  const [password, setPassword] = useState('Admin123!');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const nv = useNavigate();

  const submit = async () => {
    setErr(''); setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      nv('/app');
    } catch (e) { setErr(e.response?.data?.error || 'Login failed'); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      <div className="ambient" />

      {/* Left — form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
        <div className="glass reveal d1" style={{ width: 400, padding: 40, borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 8, cursor: 'pointer' }} onClick={() => nv('/')}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,var(--accent),var(--accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: '#fff' }}>S</div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 21 }}>SentinelAI</span>
          </div>
          <h2 style={{ fontSize: 27, fontWeight: 700, margin: '24px 0 6px' }}>Welcome back</h2>
          <p className="muted" style={{ fontSize: 15, marginBottom: 28 }}>Sign in to your operations console</p>

          <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()} />
          {err && <p style={{ color: 'var(--red)', fontSize: 14, marginBottom: 14 }}>{err}</p>}
          <button className="btn btn-primary" style={{ width: '100%', marginBottom: 14 }} onClick={submit} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" style={{ flex: 1, fontSize: 13, padding: '12px' }}>Google</button>
            <button className="btn btn-ghost" style={{ flex: 1, fontSize: 13, padding: '12px' }}>Mobile OTP</button>
          </div>
          <p className="muted" style={{ fontSize: 12, marginTop: 20, textAlign: 'center' }}>Demo · admin@sentinel.ai / Admin123!</p>
        </div>
      </div>

      {/* Right — image panel */}
      <div className="reveal d2" style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'none' }} id="login-art">
        <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80" alt="Operations" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(91,141,239,.35),rgba(124,92,255,.45))' }} />
        <div style={{ position: 'absolute', bottom: 50, left: 50, right: 50, color: '#fff' }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Intelligence that never sleeps.</h2>
          <p style={{ fontSize: 17, opacity: .9, lineHeight: 1.6 }}>Autonomous agents monitoring every feed, surfacing only what matters.</p>
        </div>
      </div>

      <style>{`@media(min-width:900px){#login-art{display:block !important}}`}</style>
    </div>
  );
}
