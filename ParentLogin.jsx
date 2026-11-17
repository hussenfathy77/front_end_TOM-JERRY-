import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Menu, X, User, ArrowRight, ChevronLeft, Lock, Mail, Eye, EyeOff,
  AlertCircle, CheckCircle, Calendar, MessageCircle, Shield, Baby, Headphones,
  Sun, Cloud, Home, LogOut
} from 'lucide-react';
import api from './api.js';
import './ParentRegistration.css';
import './ParentLogin.css';

const SUPPORT_EMAIL = 'admissions@tomjerrynursery.com';
const SUPPORT_PHONE = '+1 (555) 019-8230';

/* ── NAVBAR ── */
function Navbar() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Environment', href: '#env' },
    { label: 'Parent Registration', href: '/parent-registration' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`pr-nav${scrolled ? ' pr-nav--shadow' : ''}`}>
      <div className="pr-nav__inner">
        <a className="pr-nav__logo" onClick={() => nav('/')}>
          <div className="pr-nav__logo-img"><Sparkles size={16} color="#34445c" /></div>
          <div className="pr-nav__brand">
            <b>Tom &amp; Jerry Nursery</b>
            <small>Early Childhood Care</small>
          </div>
        </a>

        <ul className={`pr-nav__links${open ? ' pr-nav__links--open' : ''}`}>
          {links.map(l => (
            <li key={l.label}>
              <a
                className="pr-nav__link"
                href={l.href}
                onClick={(e) => {
                  if (l.href.startsWith('/')) { e.preventDefault(); nav(l.href); }
                  setOpen(false);
                }}
              >{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="pr-nav__actions">
          <button className="pr-nav__login-btn pl-nav__login" onClick={() => nav('/parent-login')}>Parent Login</button>
          <button
            className="pr-nav__login-btn"
            style={{ background: '#eaf8ef', color: '#15803d', borderColor: '#c2ebd0' }}
            onClick={() => nav('/teacher-login')}
          >
            Teacher Portal
          </button>
          <button
            className="pr-nav__avatar"
            title="Admin Portal"
            onClick={() => nav('/login')}
            style={{ cursor: 'pointer' }}
          >
            <User size={16} />
          </button>
        </div>

        <button className="pr-nav__burger" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
}

/* ── LEFT: INFO CARD ── */
function InfoCard() {
  return (
    <div className="pl-info pr-animate pr-animate--d2">
      <div className="pl-info__art">
        <span className="pl-info__sun"><Sun size={16} /></span>
        <span className="pl-info__chip"><Cloud size={11} /> Safe Haven</span>
        <div className="pl-info__blocks">
          <span className="pl-blk pl-blk--a">A</span>
          <span className="pl-blk pl-blk--b">B</span>
          <span className="pl-blk pl-blk--c">C</span>
        </div>
      </div>
      <div className="pl-info__text">
        <small>EARLY YEARS FOUNDATION</small>
        <h3>Joyful discovery in every gentle step</h3>
        <p>
          Our curriculum blends play-led learning, social empathy, and dedicated sensory
          discovery spaces tailored for curious early explorers.
        </p>
      </div>
    </div>
  );
}

/* ── LEFT: FEATURES ── */
function FeatureList() {
  const features = [
    { Icon: CheckCircle, cls: 'green', title: 'Real-Time Admission Tracking',
      desc: 'Follow application review milestones, review visit dates, and access verified family records in seconds.' },
    { Icon: Calendar, cls: 'blue', title: 'Classroom Daily Moments',
      desc: 'Stay updated with gentle nursery routines, outdoor play albums, nutrition summaries, and teacher observations.' },
    { Icon: MessageCircle, cls: 'peach', title: 'Direct Admissions & Pastoral Care',
      desc: 'Direct, encrypted two-way messaging with early-childhood care coordinators and nursery keyworkers.' },
  ];
  return (
    <div className="pr-features pr-animate pr-animate--d3">
      {features.map(({ Icon, cls, title, desc }) => (
        <div className="pr-feature" key={title}>
          <div className={`pr-feature__icon pl-ficon--${cls}`}><Icon size={18} /></div>
          <div className="pr-feature__content"><h4>{title}</h4><p>{desc}</p></div>
        </div>
      ))}
    </div>
  );
}

function Assist() {
  return (
    <div className="pl-assist">
      Need assistance? Contact our Admissions Office at{' '}
      <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or {SUPPORT_PHONE}.
    </div>
  );
}

/* ── RIGHT: LOGIN CARD (default / required error / invalid / success) ── */
function LoginCard() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [invalid, setInvalid] = useState(false);
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const change = (f) => (e) => {
    setForm(p => ({ ...p, [f]: e.target.value }));
    if (errors[f]) setErrors(p => ({ ...p, [f]: '' }));
    if (invalid) setInvalid(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    const x = {};
    if (!form.email.trim()) x.email = 'Please enter your email address.';
    if (!form.password) x.password = 'Please enter your password.';
    setErrors(x);
    setInvalid(false);
    if (Object.keys(x).length) return;

    setLoading(true);
    try {
      const data = await api.login(form.email.trim(), form.password);
      // Role-based redirect if an Admin or Teacher logs in here
      const role = data?.user?.role?.toUpperCase();
      if (role === 'ADMIN' || data?.user?.isAdmin) {
        nav('/dashboard');
        return;
      }
      if (role === 'TEACHER' || role === 'STAFF') {
        nav('/teacher-dashboard');
        return;
      }
      setSuccess(true);
    } catch {
      setInvalid(true);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    api.logout();
    setSuccess(false);
    setForm({ email: '', password: '' });
  };

  if (success) {
    return (
      <div className="pr-form-card pl-card pr-animate pr-animate--d1">
        <div className="pl-ok__icon"><CheckCircle size={26} /><Sparkles size={11} className="pl-ok__spark" /></div>
        <h2 className="pl-title">Login Successful!</h2>
        <p className="pl-sub">Welcome back! You are now logged in to your parent account.</p>

        <div className="pl-ok__box">
          <div className="pl-ok__box-head"><CheckCircle size={13} /> Parent Portal Active</div>
          <p>You can now review active admission requests, update verified family records, and view daily nursery announcements.</p>
          <hr />
          <p><b>Please note:</b> A successful login provides access to your parent profile and does not mean your child's admission has been approved.</p>
        </div>

        <button type="button" className="pr-form__submit" onClick={() => nav('/admission-request')}>
          Continue to Parent Portal <ArrowRight size={16} />
        </button>
        <div className="pl-ok__links">
          <button type="button" onClick={() => nav('/')}><Home size={12} /> Return to Home</button>
          <span>•</span>
          <button type="button" onClick={logout}><LogOut size={12} /> Log Out</button>
        </div>
        <Assist />
      </div>
    );
  }

  const bad = (f) => invalid || errors[f];

  return (
    <div className="pr-form-card pl-card pr-animate pr-animate--d1">
      <div className="pl-lock"><Lock size={20} /></div>
      <h2 className="pl-title">Welcome Back!</h2>
      <p className="pl-sub">Log in to your parent account to continue your child's admission journey.</p>

      <form onSubmit={submit} noValidate>
        {invalid && (
          <div className="pl-alert" role="alert">
            <AlertCircle size={14} />
            <div><b>Invalid email or password</b><p>Please check your credentials and try again.</p></div>
          </div>
        )}

        <div className="pr-form__group">
          <label className="pr-form__label" htmlFor="pl-email">Email Address <span>*</span></label>
          <div className="pr-input-wrap">
            <span className="pr-input-wrap__icon"><Mail size={16} /></span>
            <input
              id="pl-email" type="email" autoComplete="email"
              className={`pr-input${bad('email') ? ' pr-input--error' : ''}`}
              placeholder="e.g., mariam.mansoor@example.com"
              value={form.email} onChange={change('email')}
            />
          </div>
          {errors.email && <div className="pr-form__error"><AlertCircle size={12} /> {errors.email}</div>}
        </div>

        <div className="pr-form__group">
          <label className="pr-form__label" htmlFor="pl-pass">Password <span>*</span></label>
          <div className="pr-input-wrap">
            <span className="pr-input-wrap__icon"><Lock size={16} /></span>
            <input
              id="pl-pass" autoComplete="current-password"
              type={show ? 'text' : 'password'}
              className={`pr-input${bad('password') ? ' pr-input--error' : ''}`}
              placeholder="Enter your password"
              value={form.password} onChange={change('password')}
            />
            <button type="button" className="pr-input-wrap__end" tabIndex={-1}
              aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)}>
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <div className="pr-form__error"><AlertCircle size={12} /> {errors.password}</div>}
        </div>

        <div className="pl-row">
          <label className="pl-check">
            <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember Me
          </label>
          <a href="#" onClick={e => e.preventDefault()}>Forgot Password?</a>
        </div>

        <button type="submit" className="pr-form__submit" disabled={loading}>
          {loading ? 'Logging in...' : <>Log In <ArrowRight size={16} /></>}
        </button>
      </form>

      <div className="pr-form__login-link">
        Don't have an account?
        <a href="/parent-registration" onClick={(e) => { e.preventDefault(); nav('/parent-registration'); }}>Create Account</a>
      </div>

      <div style={{
        marginTop: '16px',
        paddingTop: '14px',
        borderTop: '1px solid #e8f0eb',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        fontSize: '12px',
        textAlign: 'center',
        color: '#64748b'
      }}>
        <div>
          <span>Are you an educator? </span>
          <a
            href="/teacher-login"
            style={{ color: '#2c7a4e', fontWeight: 700, textDecoration: 'none' }}
            onClick={(e) => { e.preventDefault(); nav('/teacher-login'); }}
          >
            Teacher Portal →
          </a>
        </div>
        <div>
          <span>Nursery Administrator? </span>
          <a
            href="/login"
            style={{ color: '#1a5a8a', fontWeight: 700, textDecoration: 'none' }}
            onClick={(e) => { e.preventDefault(); nav('/login'); }}
          >
            Admin Sign In →
          </a>
        </div>
      </div>
      <Assist />
    </div>
  );
}

function TrustBadges() {
  const badges = [
    { Icon: Shield, title: 'Regulated & Licensed', desc: 'Early years quality standards' },
    { Icon: Lock, title: '256-Bit SSL Safeguards', desc: 'Encrypted family records' },
    { Icon: Baby, title: 'Child-First Nursery', desc: 'Low staff-to-child ratios' },
    { Icon: Headphones, title: 'Admissions Desk', desc: 'Friendly phone & visit support' },
  ];
  return (
    <section className="pr-trust">
      <div className="pr-trust__inner">
        {badges.map(({ Icon, title, desc }) => (
          <div className="pr-trust__item" key={title}>
            <div className="pr-trust__icon"><Icon size={22} /></div>
            <h4>{title}</h4><p>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pr-footer">
      <div className="pr-footer__inner">
        <span className="pr-footer__copy">© 2024 Tom &amp; Jerry Nursery. Warm care &amp; mindful learning.</span>
        <div className="pr-footer__links">
          <a href="#">Privacy Policy</a><a href="#">Terms of Service</a>
          <a href="#">Safeguarding Policy</a><a href="#">Support &amp; FAQ</a>
        </div>
      </div>
    </footer>
  );
}

export default function ParentLogin() {
  const nav = useNavigate();
  return (
    <div className="pr-root pl-root">
      <Navbar />
      <section className="pr-hero">
        <div className="pr-hero__inner">
          <div className="pr-left">
            <div className="pr-left__badge pl-badge pr-animate" onClick={() => nav('/')}>
              <ChevronLeft size={12} /> WARM &amp; CARING COMMUNITY
            </div>
            <h1 className="pr-left__title pr-animate pr-animate--d1">Welcome Back to Our Family</h1>
            <p className="pr-left__desc pr-animate pr-animate--d2">
              Access your parent portal to track your child's daily moments, manage admissions
              progress, and stay in touch with our certified nursery educators.
            </p>
            <InfoCard />
            <FeatureList />
            <div className="pr-quote pr-animate pr-animate--d4">
              <span className="pr-quote__mark">❝</span>
              <p className="pr-quote__text">
                "A safe, nurturing haven where every child feels valued, secure, and celebrated every single day."
              </p>
            </div>
          </div>
          <div><LoginCard /></div>
        </div>
      </section>
      <TrustBadges />
      <Footer />
    </div>
  );
}
