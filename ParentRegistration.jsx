import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Menu, X, User, ArrowRight,
  Shield, CheckCircle, Calendar, MessageCircle,
  Settings, Eye, EyeOff, AlertCircle, Info,
  Leaf, Lock, Phone, Mail, UserCircle,
  Heart, Baby, Headphones
} from 'lucide-react';
import './ParentRegistration.css';

/* ══════════════════════════════════════
   NAVBAR
══════════════════════════════════════ */
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
    { label: 'Parent Registration', href: '/parent-registration', active: true },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`pr-nav${scrolled ? ' pr-nav--shadow' : ''}`}>
      <div className="pr-nav__inner">
        {/* Logo */}
        <a className="pr-nav__logo" onClick={() => nav('/')}>
          <div className="pr-nav__logo-img">
            <Sparkles size={16} color="#34445c" />
          </div>
          <div className="pr-nav__brand">
            <b>Tom &amp; Jerry Nursery</b>
            <small>Early Childhood Care</small>
          </div>
        </a>

        {/* Links */}
        <ul className={`pr-nav__links${open ? ' pr-nav__links--open' : ''}`}>
          {links.map(l => (
            <li key={l.label}>
              <a
                className={`pr-nav__link${l.active ? ' pr-nav__link--active' : ''}`}
                href={l.href}
                onClick={(e) => {
                  if (l.href.startsWith('/')) {
                    e.preventDefault();
                    nav(l.href);
                  }
                  setOpen(false);
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="pr-nav__actions">
          <button className="pr-nav__login-btn" onClick={() => nav('/parent-login')}>Parent Login</button>
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

/* ══════════════════════════════════════
   INFO CARD (left side illustration)
══════════════════════════════════════ */
function InfoCard() {
  const [active, setActive] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % 3), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="pr-info-card pr-animate pr-animate--d2">
      {/* Tags */}
      <div className="pr-info-card__tags">
        <span className="pr-info-tag">
          <Leaf size={12} /> Early Years Foundation
        </span>
        <span className="pr-info-tag pr-info-tag--blue">
          <Shield size={12} /> Safe Havens
        </span>
      </div>

      {/* Gear */}
      <div className="pr-info-card__gear">
        <Settings size={22} />
      </div>

      {/* Content */}
      <h3 className="pr-info-card__heading">Joyful discovery in every gentle step</h3>
      <p className="pr-info-card__sub">
        Calm daily rhythms, organic sensory activities, and nurturing teachers who honor every child's wonder.
      </p>

      {/* ABC Blocks */}
      <div className="pr-info-card__blocks">
        {['A', 'B', 'C'].map((letter, i) => (
          <div
            key={letter}
            className={`pr-abc-block pr-abc-block--${letter.toLowerCase()}`}
            style={{ transform: active === i ? 'translateY(-6px) scale(1.1)' : 'translateY(0)' }}
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   FEATURE LIST
══════════════════════════════════════ */
function FeatureList() {
  const features = [
    {
      Icon: CheckCircle, iconClass: 'pr-feature__icon--green',
      title: 'Direct Admission Tracking & Instant Updates',
      desc: 'Follow intake review milestones, schedule visits, and complete secure parent forms.',
    },
    {
      Icon: Calendar, iconClass: 'pr-feature__icon--blue',
      title: 'Personalized Nursery Visit Scheduling',
      desc: 'Pick morning garden play tours and meet educators at times convenient for you.',
    },
    {
      Icon: MessageCircle, iconClass: 'pr-feature__icon--purple',
      title: 'Direct Pastoral & Admissions Office Dialogue',
      desc: 'Direct two-way messaging with certified early-childhood care coordinators.',
    },
  ];

  return (
    <div className="pr-features pr-animate pr-animate--d3">
      {features.map(({ Icon, iconClass, title, desc }) => (
        <div className="pr-feature" key={title}>
          <div className={`pr-feature__icon ${iconClass}`}>
            <Icon size={18} />
          </div>
          <div className="pr-feature__content">
            <h4>{title}</h4>
            <p>{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════
   REGISTRATION FORM
══════════════════════════════════════ */
function RegistrationForm() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field) => {
    const val = form[field];
    let err = '';
    switch (field) {
      case 'fullName':
        if (!val.trim()) err = 'Please enter your full name.';
        break;
      case 'email':
        if (!val.trim()) err = 'Please enter your email address.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) err = 'Please enter a valid email address.';
        break;
      case 'phone':
        if (!val.trim()) err = 'Please enter your phone number.';
        break;
      case 'password':
        if (!val) err = 'Please enter a password.';
        else if (val.length < 8) err = 'Password must be at least 8 characters.';
        else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(val)) err = 'Must include a letter and a number.';
        break;
      case 'confirmPassword':
        if (!val) err = 'Please confirm your password.';
        else if (val !== form.password) err = 'Passwords do not match.';
        break;
    }
    setErrors(prev => ({ ...prev, [field]: err }));
    return !err;
  };

  const getPasswordStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[a-z]/.test(p) && /[A-Z]/.test(p)) score++;
    if (/\d/.test(p)) score++;
    if (/[^a-zA-Z0-9]/.test(p)) score++;
    return score;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const fields = ['fullName', 'email', 'phone', 'password', 'confirmPassword'];
    let valid = true;
    fields.forEach(f => {
      setTouched(prev => ({ ...prev, [f]: true }));
      if (!validateField(f)) valid = false;
    });
    if (valid) {
      // TODO: Call registration API
      console.log('Registration data:', form);
      nav('/parent-login');
    }
  };

  const shouldShowError = (field) => (touched[field] || submitted) && errors[field];
  const strength = getPasswordStrength();

  return (
    <div className="pr-form-card pr-animate pr-animate--d1">
      {/* Header */}
      <div className="pr-form__header">
        <div className="pr-form__header-icon">
          <UserCircle size={24} />
        </div>
        <h2>Create Your Parent Account</h2>
      </div>
      <p className="pr-form__header-sub">
        Join our nursery community and take the first step toward your child's admission.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="pr-form__group">
          <label className="pr-form__label" htmlFor="pr-fullname">
            Parent/Guardian Full Name <span>*</span>
          </label>
          <div className="pr-input-wrap">
            <span className="pr-input-wrap__icon"><User size={16} /></span>
            <input
              id="pr-fullname"
              className={`pr-input${shouldShowError('fullName') ? ' pr-input--error' : ''}`}
              type="text"
              placeholder="e.g., Mariam Al-Mansoor"
              value={form.fullName}
              onChange={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              autoComplete="name"
            />
            {shouldShowError('fullName') && (
              <span className="pr-input-wrap__end" style={{ color: '#ef4444' }}>
                <AlertCircle size={16} />
              </span>
            )}
          </div>
          {shouldShowError('fullName') && (
            <div className="pr-form__error">
              <AlertCircle size={12} /> {errors.fullName}
            </div>
          )}
        </div>

        {/* Email */}
        <div className="pr-form__group">
          <label className="pr-form__label" htmlFor="pr-email">
            Email Address <span>*</span>
          </label>
          <div className="pr-input-wrap">
            <span className="pr-input-wrap__icon"><Mail size={16} /></span>
            <input
              id="pr-email"
              className={`pr-input${shouldShowError('email') ? ' pr-input--error' : ''}`}
              type="email"
              placeholder="e.g., mariam.mansoor@example.com"
              value={form.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              autoComplete="email"
            />
            {shouldShowError('email') && (
              <span className="pr-input-wrap__end" style={{ color: '#ef4444' }}>
                <AlertCircle size={16} />
              </span>
            )}
          </div>
          {shouldShowError('email') && (
            <div className="pr-form__error">
              <AlertCircle size={12} /> {errors.email}
            </div>
          )}
        </div>

        {/* Phone */}
        <div className="pr-form__group">
          <label className="pr-form__label" htmlFor="pr-phone">
            Phone Number <span>*</span>
          </label>
          <div className="pr-input-wrap">
            <span className="pr-input-wrap__icon"><Phone size={16} /></span>
            <input
              id="pr-phone"
              className={`pr-input${shouldShowError('phone') ? ' pr-input--error' : ''}`}
              type="tel"
              placeholder="+1 (555) 019-8234"
              value={form.phone}
              onChange={handleChange('phone')}
              onBlur={handleBlur('phone')}
              autoComplete="tel"
            />
            {shouldShowError('phone') && (
              <span className="pr-input-wrap__end" style={{ color: '#ef4444' }}>
                <AlertCircle size={16} />
              </span>
            )}
          </div>
          {shouldShowError('phone') && (
            <div className="pr-form__error">
              <AlertCircle size={12} /> {errors.phone}
            </div>
          )}
        </div>

        {/* Password */}
        <div className="pr-form__group">
          <label className="pr-form__label" htmlFor="pr-password">
            Password <span>*</span>
          </label>
          <div className="pr-input-wrap">
            <span className="pr-input-wrap__icon"><Lock size={16} /></span>
            <input
              id="pr-password"
              className={`pr-input${shouldShowError('password') ? ' pr-input--error' : ''}`}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter at least 8 characters"
              value={form.password}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="pr-input-wrap__end"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {shouldShowError('password') && (
            <div className="pr-form__error">
              <AlertCircle size={12} /> {errors.password}
            </div>
          )}
          <div className="pr-form__hint">
            <Info size={11} /> Must be at least 8 characters with a letter &amp; number
          </div>
          {form.password && (
            <div className="pr-strength">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className={`pr-strength__bar${strength >= i ? ` pr-strength__bar--active-${i}` : ''}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="pr-form__group">
          <label className="pr-form__label" htmlFor="pr-confirm">
            Confirm Password <span>*</span>
          </label>
          <div className="pr-input-wrap">
            <span className="pr-input-wrap__icon"><Lock size={16} /></span>
            <input
              id="pr-confirm"
              className={`pr-input${shouldShowError('confirmPassword') ? ' pr-input--error' : ''}`}
              type={showConfirm ? 'text' : 'password'}
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="pr-input-wrap__end"
              onClick={() => setShowConfirm(!showConfirm)}
              tabIndex={-1}
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {shouldShowError('confirmPassword') && (
            <div className="pr-form__error">
              <AlertCircle size={12} /> {errors.confirmPassword}
            </div>
          )}
        </div>

        {/* Terms */}
        <p className="pr-form__terms">
          By creating an account, you agree to Tom &amp; Jerry Nursery's{' '}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>

        {/* Submit */}
        <button type="submit" className="pr-form__submit" id="pr-create-account-btn">
          Create Account <ArrowRight size={16} />
        </button>
      </form>

      {/* Login redirect */}
      <div className="pr-form__login-link">
        Already have an account?
        <a href="/parent-login" onClick={(e) => { e.preventDefault(); nav('/parent-login'); }}>Log In</a>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   TRUST BADGES
══════════════════════════════════════ */
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
            <div className="pr-trust__icon">
              <Icon size={22} />
            </div>
            <h4>{title}</h4>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   FOOTER
══════════════════════════════════════ */
function Footer() {
  return (
    <footer className="pr-footer">
      <div className="pr-footer__inner">
        <span className="pr-footer__copy">
          © 2024 Tom &amp; Jerry Nursery. Warm care &amp; mindful learning.
        </span>
        <div className="pr-footer__links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Safeguarding Policy</a>
          <a href="#">Support &amp; FAQ</a>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════ */
export default function ParentRegistration() {
  return (
    <div className="pr-root">
      <Navbar />

      <section className="pr-hero">
        <div className="pr-hero__inner">
          {/* Left Column */}
          <div className="pr-left">
            <div className="pr-left__badge pr-animate">
              <Sparkles size={12} /> WARM &amp; CARING COMMUNITY
            </div>

            <h1 className="pr-left__title pr-animate pr-animate--d1">
              Welcome to Our Family
            </h1>

            <p className="pr-left__desc pr-animate pr-animate--d2">
              Join our nursery community and take the first step toward your child's
              admission. Create an account to schedule visits, manage admissions, and
              connect with caring early-learning educators.
            </p>

            <InfoCard />
            <FeatureList />

            {/* Quote */}
            <div className="pr-quote pr-animate pr-animate--d4">
              <span className="pr-quote__mark">❝</span>
              <p className="pr-quote__text">
                A safe, nurturing haven where every child feels valued, secure, and celebrated
                every single day.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <RegistrationForm />
          </div>
        </div>
      </section>

      <TrustBadges />
      <Footer />
    </div>
  );
}
