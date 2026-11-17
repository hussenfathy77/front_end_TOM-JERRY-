import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Lock, User, Eye, EyeOff, Shield, Calendar,
  FileText, Home, AlertCircle, Check, Sparkles
} from 'lucide-react';
import './TeacherLogin.css';

export default function TeacherLogin() {
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Validation & Error states
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    setAuthError(false);

    if (!username.trim()) {
      newErrors.username = 'Please enter your username.';
    }
    if (!password) {
      newErrors.password = 'Please enter your password.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);
    // Demo validation: if credentials match demo or error state test
    setTimeout(() => {
      setLoading(false);
      if (username === 'teacher_claire' && password === '123456') {
        // Success -> go to Teacher Dashboard
        nav('/teacher-dashboard');
      } else {
        // Show invalid error banner as shown in Figma screenshot 3
        setAuthError(true);
      }
    }, 400);
  };

  return (
    <div className="tl-root">
      {/* ── TOP HEADER BAR ── */}
      <header className="tl-header">
        <div className="tl-header__inner">
          <div className="tl-header__left">
            <span className="tl-header__icon">🗂</span>
            <span className="tl-header__ws">TEACHER WORKSPACE</span>
            <span className="tl-header__sep">·</span>
            <span className="tl-header__desc">Daily Attendance &amp; Classroom Management</span>
          </div>
          <div className="tl-header__right">
            <span className="tl-header__badge">
              <span className="tl-header__dot" /> TEACHER ACCESS PORTAL
            </span>
            <span className="tl-header__version">v2.4 Classroom Edition</span>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="tl-main">
        <div className="tl-container">
          
          {/* ── LEFT COLUMN: BRANDING & FEATURES ── */}
          <div className="tl-left">
            {/* Logo box */}
            <div className="tl-brand">
              <div className="tl-brand__icon">
                <Home size={18} color="#2c4a35" />
              </div>
              <div className="tl-brand__text">
                <div className="tl-brand__title-row">
                  <span className="tl-brand__title">Tom &amp; Jerry</span>
                  <span className="tl-brand__tag">TEACHER</span>
                </div>
                <div className="tl-brand__sub">NURSERY MANAGEMENT SYSTEM</div>
              </div>
            </div>

            {/* Portal Badge */}
            <div className="tl-badge-portal">
              <Sparkles size={13} />
              <span>TEACHER &amp; CLASSROOM PORTAL</span>
            </div>

            {/* Main Headline */}
            <h1 className="tl-headline">
              Guiding Little Minds, Every<br />
              <span className="tl-headline--accent">Day!</span>
            </h1>

            {/* Intro paragraph */}
            <p className="tl-intro">
              A welcoming space for educators and classroom caregivers. Empowering
              teachers with joyful daily logs, instant attendance, and toddler milestones.
            </p>

            {/* Feature Pills */}
            <div className="tl-pills">
              <span className="tl-pill tl-pill--blue">
                <Check size={12} /> Child Safeguarding First
              </span>
              <span className="tl-pill tl-pill--peach">
                🌱 Early Years Foundation Stage
              </span>
              <span className="tl-pill tl-pill--green">
                🔒 Secure Staff Access
              </span>
            </div>

            {/* Illustration Box */}
            <div className="tl-scene">
              <div className="tl-scene__sky">
                {/* Sun */}
                <div className="tl-scene__sun">
                  <div className="tl-scene__sun-face">
                    <span className="tl-sun-eye" />
                    <span className="tl-sun-eye" />
                    <span className="tl-sun-mouth" />
                  </div>
                </div>
                {/* Soft clouds */}
                <div className="tl-scene__cloud tl-scene__cloud--1" />
              </div>

              {/* Ground & toys */}
              <div className="tl-scene__ground">
                {/* Tree */}
                <div className="tl-scene__tree">
                  <div className="tl-scene__tree-top">
                    <span className="tl-tree-dot dot-1" />
                    <span className="tl-tree-dot dot-2" />
                    <span className="tl-tree-dot dot-3" />
                  </div>
                  <div className="tl-scene__tree-trunk" />
                </div>

                {/* Wooden Toy Blocks */}
                <div className="tl-scene__blocks">
                  <div className="tl-block-row tl-block-row--top">
                    <span className="tl-block tl-block--1">1</span>
                    <span className="tl-block tl-block--star">★</span>
                  </div>
                  <div className="tl-block-row tl-block-row--bottom">
                    <span className="tl-block tl-block--a">A</span>
                    <span className="tl-block tl-block--b">B</span>
                    <span className="tl-block tl-block--c">C</span>
                  </div>
                </div>

                {/* Stacker and Toy Car */}
                <div className="tl-scene__toys">
                  <div className="tl-stacker">
                    <span className="stk stk-1" />
                    <span className="stk stk-2" />
                    <span className="stk stk-3" />
                    <span className="stk stk-4" />
                  </div>
                  <div className="tl-toy-car">
                    <div className="tl-car-body" />
                    <div className="tl-car-wheel w-1" />
                    <div className="tl-car-wheel w-2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 3 Quick-link Cards */}
            <div className="tl-cards-grid">
              <div className="tl-quick-card">
                <div className="tl-quick-card__icon tl-qc-icon--blue">
                  <Calendar size={16} />
                </div>
                <div className="tl-quick-card__info">
                  <div className="tl-quick-card__lbl">ATTENDANCE</div>
                  <div className="tl-quick-card__title">Instant Roster Check-in</div>
                </div>
              </div>

              <div className="tl-quick-card">
                <div className="tl-quick-card__icon tl-qc-icon--peach">
                  <FileText size={16} />
                </div>
                <div className="tl-quick-card__info">
                  <div className="tl-quick-card__lbl">DAILY ACTIVITIES</div>
                  <div className="tl-quick-card__title">Food, Naps &amp; Milestones</div>
                </div>
              </div>

              <div className="tl-quick-card">
                <div className="tl-quick-card__icon tl-qc-icon--green">
                  <Home size={16} />
                </div>
                <div className="tl-quick-card__info">
                  <div className="tl-quick-card__lbl">CLASSROOMS</div>
                  <div className="tl-quick-card__title">Room 1 &amp; 2 Consoles</div>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: LOGIN FORM CARD ── */}
          <div className="tl-right">
            <div className="tl-login-card">
              
              {/* Header Icon */}
              <div className="tl-login-icon-wrap">
                <div className="tl-login-icon">
                  <BookOpen size={24} color="#78590c" />
                </div>
                <span className="tl-login-dot" />
              </div>

              {/* Sub-badge */}
              <div className="tl-login-badge">TEACHER PORTAL</div>

              {/* Title & Sub */}
              <h2 className="tl-login-title">Welcome Back!</h2>
              <p className="tl-login-subtitle">Welcome back! Please sign in to continue.</p>

              {/* Invalid credentials Alert Banner (Screenshot 3) */}
              {authError && (
                <div className="tl-alert-banner">
                  <AlertCircle size={15} />
                  <span>Invalid username or password. Please try again.</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate>
                {/* Username Input */}
                <div className="tl-form-group">
                  <label className="tl-label">
                    USERNAME <span className="tl-req">*</span>
                  </label>
                  <div className={`tl-input-box ${errors.username ? 'tl-input-box--error' : ''}`}>
                    <User size={16} className="tl-input-icon" />
                    <input
                      type="text"
                      className="tl-input"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (errors.username) setErrors(prev => ({ ...prev, username: '' }));
                        if (authError) setAuthError(false);
                      }}
                    />
                  </div>
                  {errors.username && (
                    <div className="tl-error-msg">
                      <AlertCircle size={12} /> {errors.username}
                    </div>
                  )}
                </div>

                {/* Password Input */}
                <div className="tl-form-group">
                  <label className="tl-label">
                    PASSWORD <span className="tl-req">*</span>
                  </label>
                  <div className={`tl-input-box ${errors.password || authError ? 'tl-input-box--error' : ''}`}>
                    <Lock size={16} className="tl-input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="tl-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                        if (authError) setAuthError(false);
                      }}
                    />
                    <button
                      type="button"
                      className="tl-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="tl-error-msg">
                      <AlertCircle size={12} /> {errors.password}
                    </div>
                  )}
                </div>

                {/* Remember Me */}
                <div className="tl-remember">
                  <label className="tl-check-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="tl-checkbox"
                    />
                    <span>Remember me on this classroom device</span>
                  </label>
                </div>

                {/* Login Button */}
                <button type="submit" className="tl-submit-btn" disabled={loading}>
                  {loading ? 'Signing In...' : 'Login →'}
                </button>
              </form>

              {/* Admin Note Box */}
              <div className="tl-note-box">
                <p>
                  Your account is provided by the nursery administrator. Contact your
                  center director if you need credential assistance.
                </p>
              </div>

              {/* Footer Trust Badges */}
              <div className="tl-trust">
                <div className="tl-trust__item">
                  <Check size={13} color="#16a34a" />
                  <span>Secure access for authorized teachers only.</span>
                </div>
                <div className="tl-trust__tags">
                  <span>🔐 Encrypted</span>
                  <span className="tl-trust__sep">•</span>
                  <span>📋 Audit-Logged</span>
                  <span className="tl-trust__sep">•</span>
                  <span>🔒 TLS 1.3</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* ── BOTTOM FOOTER ── */}
      <footer className="tl-footer">
        <div className="tl-footer__inner">
          <div className="tl-footer__left">
            <span>© 2026 Tom &amp; Jerry Nursery Management System</span>
            <span className="tl-footer__sep">•</span>
            <span className="tl-footer__status">
              <span className="tl-footer__status-dot" /> All Internal Services Online
            </span>
          </div>
          <div className="tl-footer__links">
            <a href="#">Privacy &amp; Child Safeguarding</a>
            <span className="tl-footer__sep">•</span>
            <a href="#">Staff Policy Handbook</a>
            <span className="tl-footer__sep">•</span>
            <a href="#">Teacher Support Helpline</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
