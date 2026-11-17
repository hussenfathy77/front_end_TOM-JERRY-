import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Heart,
  BookOpen, CalendarCheck, Users, Shield, AlertCircle, Sparkles
} from 'lucide-react';
import api from './api.js';

export function Logo({ small }) {
  return (
    <div className="logo">
      <div className="logo-ic"><Sparkles size={small ? 16 : 22} color="#34445c" /></div>
      <div><b>Tom &amp; Jerry</b><small>NURSERY MANAGEMENT</small></div>
      <span className="chip g">ADMIN</span>
    </div>
  );
}

function Art() {
  return (
    <svg viewBox="0 0 400 190" width="100%">
      <ellipse cx="200" cy="185" rx="210" ry="40" fill="#dff2e5" />
      <circle cx="200" cy="30" r="17" fill="#ffe8a3" />
      <circle cx="194" cy="28" r="1.5" fill="#7a5b00" />
      <circle cx="206" cy="28" r="1.5" fill="#7a5b00" />
      <path d="M194 35q6 5 12 0" stroke="#7a5b00" fill="none" />
      <rect x="55" y="105" width="8" height="40" fill="#cfa77a" />
      <circle cx="59" cy="95" r="26" fill="#c7e8d0" />
      <rect x="150" y="125" width="28" height="28" rx="5" fill="#b8ddf2" />
      <rect x="180" y="125" width="28" height="28" rx="5" fill="#ffe8a3" />
      <rect x="210" y="125" width="28" height="28" rx="5" fill="#f6d5df" />
      <rect x="165" y="96" width="28" height="28" rx="5" fill="#c7e8d0" />
      <rect x="195" y="96" width="28" height="28" rx="5" fill="#fbdcc0" />
      <g fontSize="15" fontWeight="800" fill="#34445c" textAnchor="middle">
        <text x="164" y="145">A</text>
        <text x="194" y="145">B</text>
        <text x="224" y="145">C</text>
        <text x="179" y="116">1</text>
        <text x="209" y="116" fill="#d97a38">?</text>
      </g>
      <rect x="290" y="150" width="50" height="6" rx="3" fill="#c9a37a" />
      <ellipse cx="315" cy="144" rx="24" ry="6" fill="#b8ddf2" />
      <ellipse cx="315" cy="134" rx="19" ry="6" fill="#c7e8d0" />
      <ellipse cx="315" cy="125" rx="14" ry="5" fill="#ffe8a3" />
      <circle cx="315" cy="114" r="7" fill="#f6d5df" />
      <rect x="350" y="130" width="40" height="22" rx="7" fill="#b8ddf2" />
      <circle cx="361" cy="154" r="6" fill="#34445c" />
      <circle cx="381" cy="154" r="6" fill="#34445c" />
    </svg>
  );
}

export default function Login() {
  const nav = useNavigate();
  const [email, setE] = useState('admin@school.com');
  const [pass, setP] = useState('admin123');
  const [show, setS] = useState(false);
  const [keep, setK] = useState(false);
  const [err, setErr] = useState({});
  const [bad, setBad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const x = {};
    if (!email.trim()) x.email = 'Email is required';
    if (!pass) x.pass = 'Password is required';
    setErr(x);
    if (Object.keys(x).length) {
      setBad(false);
      return;
    }

    setLoading(true);
    setBad(false);
    try {
      const data = await api.login(email.trim(), pass);
      if (data.user?.role !== 'ADMIN') {
        throw new Error('Access denied. Administrator privileges required.');
      }
      nav('/dashboard');
    } catch (error) {
      setBad(true);
      setErrorMsg(error.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="topbar">
        <span className="chip g"><i className="dot" />ADMIN ACCESS PORTAL</span>
        <span className="mut">Connected to Live Backend API</span>
      </div>
      <main>
        <section className="left">
          <Logo />
          <span className="chip y big"><Sparkles size={12} /> NURSERY ADMINISTRATION PORTAL</span>
          <h1>Little Steps, <em>Big Dreams!</em></h1>
          <p className="lead">A happy place to learn, grow, and shine. Empowering educators and directors with serene administrative workflows.</p>
          <div className="card art">
            <div className="tags">
              <span className="chip b"><ShieldCheck size={12} /> FERPA &amp; Early Years Certified</span>
              <span className="chip r"><Heart size={12} /> Child Well-being First</span>
              <span className="chip g"><Lock size={12} /> 256-bit Safeguarded</span>
            </div>
            <Art />
          </div>
          <div className="feats">
            {[[CalendarCheck, 'Attendance', 'Live Sync', '#dbeafe', '#2563eb'],
              [Users, 'Classrooms', 'Staff & Pupils', '#dcfce7', '#16a34a'],
              [Shield, 'Security', 'Admin Only', '#fee2e2', '#e11d48']
            ].map(([I, a, b, bg, c]) => (
              <div className="card feat" key={a}>
                <span className="ic" style={{ background: bg }}><I size={16} color={c} /></span>
                <div><small>{a}</small><b>{b}</b></div>
              </div>
            ))}
          </div>
        </section>

        <form className="card form" onSubmit={submit} noValidate>
          <div className="fh">
            <span className="logo-ic"><BookOpen size={22} color="#34445c" /></span>
            <span className="chip b">ADMIN CONSOLE</span>
          </div>
          <h2>Welcome Back!</h2>
          <p className="mut c">Sign in to manage your nursery.</p>

          {bad && (
            <div className="alert">
              <AlertCircle size={14} />
              <div>
                <b>Authentication Failed</b>
                <p>{errorMsg}</p>
              </div>
            </div>
          )}

          <label>ADMIN EMAIL ADDRESS <i>*</i></label>
          <div className={'inp' + (err.email ? ' er' : '')}>
            <Mail size={14} />
            <input
              type="email"
              value={email}
              onChange={e => setE(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          {err.email && err.email.trim() && <div className="em"><AlertCircle size={12} />{err.email}</div>}

          <label>PASSWORD <i>*</i></label>
          <div className={'inp' + (err.pass ? ' er' : '')}>
            <Lock size={14} />
            <input
              type={show ? 'text' : 'password'}
              value={pass}
              onChange={e => setP(e.target.value)}
              placeholder="Enter your password"
            />
            <button type="button" onClick={() => setS(!show)}>
              {show ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          {err.pass && <div className="em"><AlertCircle size={12} />{err.pass}</div>}

          <div className="row">
            <label className="chk">
              <input type="checkbox" checked={keep} onChange={e => setK(e.target.checked)} />
              Keep admin session active
            </label>
            <span className="chip y">24h Expire</span>
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : <>Sign In <ArrowRight size={14} /></>}
          </button>
          <hr />
          <p className="sec"><ShieldCheck size={12} /> Secure access for authorized administrators only.</p>
          <div className="badges">
            <span>🔒 Encrypted</span>
            <span>📝 Audit-Logged</span>
            <span>🌐 API Connected</span>
          </div>
          <p
            className="demo"
            style={{ cursor: 'pointer', textAlign: 'center' }}
            onClick={() => { setE('admin@school.com'); setP('admin123'); }}
            title="Click to fill credentials"
          >
            Demo Admin: <u>admin@school.com</u> / <u>admin123</u>
          </p>
        </form>
      </main>
      <footer>
        <span>© 2026 Tom &amp; Jerry Nursery Management System — <b className="ok">Backend Service Online</b></span>
        <span className="links">
          <a>Privacy &amp; Child Safeguarding</a>
          <a>Staff Policy Handbook</a>
          <a>Support Helpline</a>
        </span>
      </footer>
    </div>
  );
}
