import React from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  ['Multi-Agent Reasoning', 'Four autonomous agents — Watcher, Investigator, Analyst, Responder — collaborate to understand events, not just detect them.', '◉'],
  ['Real-Time Vision', 'YOLOv8 + DeepSORT detect and track objects across every feed at 30fps, flagging risk the moment it happens.', '▦'],
  ['Citation-Grounded RAG', 'Every alert is backed by retrieved policy and past-incident evidence — no hallucinated claims.', '⌖'],
  ['Predictive Analytics', 'Forecast risk windows and incident likelihood before they occur, from your own operational data.', '▤'],
  ['Human-in-the-Loop', 'Agents draft and route; your team approves. Every decision is logged in an immutable audit trail.', '✓'],
  ['Built to Scale', 'Distributed, queue-driven, cloud-native architecture designed for millions of events.', '⚡'],
];

const stats = [
  ['98%', 'Detection accuracy'],
  ['1.4s', 'Avg agent decision'],
  ['41%', 'Fewer false alarms'],
  ['1M+', 'Events / day ready'],
];

export default function Landing() {
  const nv = useNavigate();
  return (
    <div>
      <div className="ambient" />

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 6vw', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: 'linear-gradient(135deg,var(--accent),var(--accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: '#fff' }}>S</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19 }}>SentinelAI</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="#features" className="muted" style={{ fontSize: 15, display: 'none' }}>Features</a>
          <button className="btn btn-ghost" style={{ padding: '10px 20px', fontSize: 14 }} onClick={() => nv('/login')}>Sign in</button>
          <button className="btn btn-primary" style={{ padding: '10px 22px', fontSize: 14 }} onClick={() => nv('/login')}>Get started</button>
        </div>
      </nav>

      {/* Hero */}
      <header style={{ textAlign: 'center', padding: '90px 6vw 60px', maxWidth: 980, margin: '0 auto' }}>
        <div className="reveal d1 glass" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 30, fontSize: 13, marginBottom: 30 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)' }} />
          Agentic visual intelligence · live now
        </div>
        <h1 className="reveal d2" style={{ fontSize: 'clamp(40px,7vw,76px)', fontWeight: 800, marginBottom: 24 }}>
          Your cameras can see.<br /><span className="grad">Now they can think.</span>
        </h1>
        <p className="reveal d3 muted" style={{ fontSize: 'clamp(17px,2.2vw,21px)', lineHeight: 1.6, maxWidth: 640, margin: '0 auto 38px' }}>
          SentinelAI deploys a team of autonomous AI agents that watch your video feeds, reason about what's happening, and surface real risk with evidence — so your team acts on what matters.
        </p>
        <div className="reveal d4" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => nv('/login')}>Launch the console →</button>
          <button className="btn btn-ghost" onClick={() => nv('/login')}>Watch demo</button>
        </div>
      </header>

      {/* Hero image / dashboard preview */}
      <div className="reveal d5" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 6vw 80px' }}>
        <div className="glass" style={{ borderRadius: 'var(--radius-lg)', padding: 14, boxShadow: '0 40px 120px rgba(91,141,239,.25)' }}>
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80" alt="Operations dashboard" style={{ width: '100%', borderRadius: 14, display: 'block' }} />
        </div>
      </div>

      {/* Stats */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 6vw 90px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 18 }}>
        {stats.map(([v, l], i) => (
          <div key={l} className={`glass reveal d${i + 1}`} style={{ padding: '26px 20px', textAlign: 'center', borderRadius: 'var(--radius)' }}>
            <div className="grad" style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 800 }}>{v}</div>
            <div className="muted" style={{ fontSize: 14, marginTop: 6 }}>{l}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section id="features" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 6vw 90px' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h2 style={{ fontSize: 'clamp(30px,4.5vw,46px)', fontWeight: 800, marginBottom: 16 }}>Built like a <span className="grad">real product</span></h2>
          <p className="muted" style={{ fontSize: 18, maxWidth: 560, margin: '0 auto' }}>Every capability serious operations teams need — engineered, not faked.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 18 }}>
          {features.map(([t, d, ic], i) => (
            <div key={t} className="glass" style={{ padding: 26, borderRadius: 'var(--radius)', transition: '.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: 'linear-gradient(135deg,rgba(91,141,239,.2),rgba(124,92,255,.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 18 }}>{ic}</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>{t}</h3>
              <p className="muted" style={{ fontSize: 15, lineHeight: 1.6 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 900, margin: '0 auto 90px', padding: '0 6vw' }}>
        <div className="glass" style={{ borderRadius: 'var(--radius-lg)', padding: 'clamp(40px,6vw,70px)', textAlign: 'center', background: 'linear-gradient(135deg,rgba(91,141,239,.12),rgba(124,92,255,.12))', border: '1px solid var(--border2)' }}>
          <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, marginBottom: 18 }}>See it for yourself</h2>
          <p className="muted" style={{ fontSize: 18, marginBottom: 32 }}>Sign in to the live operations console and run the agent pipeline.</p>
          <button className="btn btn-primary" style={{ fontSize: 16, padding: '15px 34px' }} onClick={() => nv('/login')}>Enter the console →</button>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '30px', borderTop: '1px solid var(--border)' }}>
        <span className="muted" style={{ fontSize: 14 }}>© 2026 SentinelAI · Agentic Visual Intelligence</span>
      </footer>
    </div>
  );
}
