import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  User,
  Mail,
  Phone,
  Heart,
  Calendar,
  BookOpen,
  FileText,
  AlertCircle,
  Info,
  Save,
  ArrowRight,
  LogOut,
  Menu,
  X,
  Check,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronDown,
  ShieldCheck,
  Building2
} from 'lucide-react';
import AdmissionSuccess from './AdmissionSuccess.jsx';
import './AdmissionRequest.css';

export default function AdmissionRequest() {
  const navigate = useNavigate();

  // Scroll state for sticky navbar shadow
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form state - Parent fields pre-filled for authenticated parent
  const [form, setForm] = useState({
    parentFullName: 'Mariam Mansoor',
    parentEmail: 'mariam.mansoor@example.com',
    parentPhone: '+1 (555) 234-5679',
    relationship: '',
    childFullName: '',
    dob: '',
    gender: '',
    classGroup: '',
    startTerm: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const [submitted, setSubmitted] = useState(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toast timer cleanup
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));

    // Clear error on change if already touched
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }

    // Date of birth: validate as soon as a full date is entered
    if (field === 'dob' && value) {
      setTouched((prev) => ({ ...prev, dob: true }));
      validateField('dob', value);
    }
  };

  const handleGenderSelect = (gender) => {
    setForm((prev) => ({ ...prev, gender }));
    if (errors.gender) {
      setErrors((prev) => ({ ...prev, gender: '' }));
    }
    setTouched((prev) => ({ ...prev, gender: true }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, form[field]);
  };

  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'parentFullName':
        if (!value.trim()) error = 'Parent full name is required.';
        break;
      case 'parentEmail':
        if (!value.trim()) {
          error = 'Parent email address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address.';
        }
        break;
      case 'parentPhone':
        if (!value.trim()) error = 'Parent phone number is required.';
        break;
      case 'relationship':
        if (!value) error = 'Please select your relationship to the child.';
        break;
      case 'childFullName':
        if (!value.trim()) error = "Please enter your child's full name.";
        break;
      case 'dob': {
        if (!value) {
          error = "Please select your child's date of birth.";
        } else {
          const d = new Date(`${value}T00:00:00`);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (d > today) {
            error = 'Date of birth cannot be in the future.';
          } else {
            const youngest = new Date(today);
            youngest.setMonth(youngest.getMonth() - 6);
            const oldest = new Date(today);
            oldest.setFullYear(oldest.getFullYear() - 4);
            if (d > youngest || d < oldest) error = 'Child must be between 6 months and 4 years old.';
          }
        }
        break;
      }
      case 'gender':
        if (!value) error = 'Please select the child gender.';
        break;
      case 'classGroup':
        if (!value) error = 'Please select an educational age group.';
        break;
      case 'startTerm':
        if (!value) error = 'Please select a desired start term.';
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateAll = () => {
    const fieldsToValidate = [
      'parentFullName',
      'parentEmail',
      'parentPhone',
      'relationship',
      'childFullName',
      'dob',
      'gender',
      'classGroup',
      'startTerm'
    ];

    let isValid = true;
    const newErrors = {};
    const newTouched = {};

    fieldsToValidate.forEach((f) => {
      newTouched[f] = true;
      const valid = validateField(f, form[f]);
      if (!valid) {
        isValid = false;
        newErrors[f] = errors[f] || 'This field is required.';
      }
    });

    setTouched((prev) => ({ ...prev, ...newTouched }));
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAll()) {
      setToastMessage({
        text: 'Please fill in all required fields marked with *',
        type: 'error'
      });
      // Scroll to first invalid field
      const firstErrorElement = document.querySelector('.ar-input--error, .ar-select--error');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorElement.focus();
      }
      return;
    }

    const now = new Date();
    setSubmitted({
      ...form,
      submittedAt: now.toISOString(),
      reference: `TJ-ADM-${now.getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDraft = () => {
    console.log('Draft Saved:', form);
    setToastMessage({
      text: 'Draft saved successfully! You can resume your application anytime.',
      type: 'success'
    });
  };

  const handleCancel = () => {
    navigate('/');
  };

  const isErrorVisible = (field) => touched[field] && !!errors[field];

  return (
    <div className="ar-root">
      {/* ══════════════════════════════════════════════════════════════════
          NAVBAR (Parent Portal Style)
          ══════════════════════════════════════════════════════════════════ */}
      <nav className={`ar-nav ${scrolled ? 'ar-nav--scrolled' : ''}`}>
        <div className="ar-nav__inner">
          {/* Left: Logo */}
          <div className="ar-nav__logo" onClick={() => navigate('/')}>
            <div className="ar-nav__logo-icon">
              <Sparkles size={18} />
            </div>
            <div className="ar-nav__brand">
              <b>Tom &amp; Jerry Nursery</b>
              <small>Early Childhood Care</small>
            </div>
          </div>

          {/* Center Links */}
          <ul className="ar-nav__links">
            <li>
              <button
                type="button"
                className="ar-nav__link"
                onClick={() => navigate('/')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                className="ar-nav__link ar-nav__link--active"
              >
                Admission Request
              </button>
            </li>
            <li>
              <button
                type="button"
                className="ar-nav__link"
                onClick={() => navigate('/admission-status')}
              >
                My Applications
              </button>
            </li>
          </ul>

          {/* Right: User Avatar + Subtitle + Logout */}
          <div className="ar-nav__right">
            <div className="ar-user-profile">
              <div className="ar-user-avatar">
                <span>MM</span>
              </div>
              <div className="ar-user-meta">
                <span className="ar-user-name">Mariam Mansoor</span>
                <span className="ar-user-role">Parent Portal</span>
              </div>
            </div>

            <button
              type="button"
              className="ar-logout-btn"
              onClick={() => navigate('/parent-login')}
              title="Log Out"
            >
              <LogOut size={14} />
              <span>Log Out</span>
            </button>

            <button
              type="button"
              className="ar-nav__burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="ar-nav__mobile-menu">
            <button
              type="button"
              className="ar-nav__link"
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }}
            >
              Home
            </button>
            <button
              type="button"
              className="ar-nav__link ar-nav__link--active"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admission Request
            </button>
            <button
              type="button"
              className="ar-nav__link"
              onClick={() => {
                navigate('/admission-status');
                setMobileMenuOpen(false);
              }}
            >
              My Applications
            </button>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════════════════════════════
          BREADCRUMB
          ══════════════════════════════════════════════════════════════════ */}
      <div className="ar-breadcrumb-bar">
        <div className="ar-container">
          <div className="ar-breadcrumb">
            <Link to="/">🏠 Home</Link>
            <span className="ar-breadcrumb__sep">&gt;</span>
            {submitted ? (
              <>
                <Link to="/admission-request" onClick={() => setSubmitted(null)}>Admission Request</Link>
                <span className="ar-breadcrumb__sep">&gt;</span>
                <span className="ar-breadcrumb__current">Confirmation</span>
                <span className="ar-received-badge">RECEIVED &amp; LOGGED</span>
              </>
            ) : (
              <span className="ar-breadcrumb__current">Admission Request</span>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════════════════════════════════════ */}
      {submitted && (
        <AdmissionSuccess
          data={submitted}
          onStatus={() => navigate('/admission-status')}
          onPortal={() => navigate('/')}
        />
      )}

      {!submitted && (
      <main className="ar-main">
        <div className="ar-container">
          {/* Page Header */}
          <header className="ar-header">
            <div className="ar-header__content">
              <h1 className="ar-header__title">Apply for Admission</h1>
              <p className="ar-header__sub">
                Complete the form below to submit an admission request for your child at Tom &amp; Jerry Nursery.
              </p>
            </div>

            <div className="ar-verified-badge">
              <CheckCircle2 size={16} className="ar-verified-badge__icon" />
              <span>✓ Verified Parent Session</span>
            </div>
          </header>

          {/* Horizontal Step Indicator */}
          <div className="ar-step-card">
            <div className="ar-steps">
              {/* Step 1: Completed */}
              <div className="ar-step ar-step--completed">
                <div className="ar-step__circle">
                  <Check size={20} />
                </div>
                <div className="ar-step__info">
                  <span className="ar-step__tag">STEP 1</span>
                  <span className="ar-step__title">Parent &amp; Guardian Info</span>
                  <span className="ar-step__sub">Verified Account Details</span>
                </div>
              </div>

              {/* Line Connector */}
              <div className="ar-step-divider" />

              {/* Step 2: Current */}
              <div className="ar-step ar-step--active">
                <div className="ar-step__circle">
                  <span>2</span>
                </div>
                <div className="ar-step__info">
                  <span className="ar-step__tag">
                    STEP 2 <span className="ar-step__current-pill">&gt; CURRENT</span>
                  </span>
                  <span className="ar-step__title">Child Details &amp; Placement</span>
                  <span className="ar-step__sub">Intake Registration</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="ar-form">
            {/* ══════════════════════════════════════════════════════════
                FORM SECTION 1: Parent / Guardian Information
                ══════════════════════════════════════════════════════════ */}
            <section className="ar-card">
              <div className="ar-card__header">
                <div className="ar-card__header-left">
                  <div className="ar-card__icon">
                    <User size={20} />
                  </div>
                  <h2 className="ar-card__title">Parent / Guardian Information</h2>
                </div>
                <div className="ar-card__note">
                  <ShieldCheck size={16} color="#16a34a" />
                  <span>Account verified details for communications</span>
                </div>
              </div>

              <div className="ar-grid">
                {/* Full Name */}
                <div className="ar-field">
                  <div className="ar-label-row">
                    <label className="ar-label" htmlFor="ar-parent-fullname">
                      Full Name <span className="ar-req">*</span>
                    </label>
                    <span className="ar-tag-synced">
                      <Check size={11} /> Profile synced
                    </span>
                  </div>
                  <div className="ar-input-wrap">
                    <span className="ar-input-icon">
                      <User size={16} />
                    </span>
                    <input
                      id="ar-parent-fullname"
                      type="text"
                      className={`ar-input ${isErrorVisible('parentFullName') ? 'ar-input--error' : ''}`}
                      value={form.parentFullName}
                      onChange={handleChange('parentFullName')}
                      onBlur={handleBlur('parentFullName')}
                      placeholder="Mariam Mansoor"
                    />
                  </div>
                  {isErrorVisible('parentFullName') && (
                    <div className="ar-error">
                      <AlertCircle size={13} /> {errors.parentFullName}
                    </div>
                  )}
                </div>

                {/* Email Address */}
                <div className="ar-field">
                  <div className="ar-label-row">
                    <label className="ar-label" htmlFor="ar-parent-email">
                      Email Address <span className="ar-req">*</span>
                    </label>
                    <span className="ar-tag-account">
                      <Mail size={11} /> Account Email
                    </span>
                  </div>
                  <div className="ar-input-wrap">
                    <span className="ar-input-icon">
                      <Mail size={16} />
                    </span>
                    <input
                      id="ar-parent-email"
                      type="email"
                      className={`ar-input ${isErrorVisible('parentEmail') ? 'ar-input--error' : ''}`}
                      value={form.parentEmail}
                      onChange={handleChange('parentEmail')}
                      onBlur={handleBlur('parentEmail')}
                      placeholder="mariam.mansoor@example.com"
                    />
                  </div>
                  {isErrorVisible('parentEmail') && (
                    <div className="ar-error">
                      <AlertCircle size={13} /> {errors.parentEmail}
                    </div>
                  )}
                </div>

                {/* Phone Number */}
                <div className="ar-field">
                  <div className="ar-label-row">
                    <label className="ar-label" htmlFor="ar-parent-phone">
                      Phone Number <span className="ar-req">*</span>
                    </label>
                  </div>
                  <div className="ar-input-wrap">
                    <span className="ar-input-icon">
                      <Phone size={16} />
                    </span>
                    <input
                      id="ar-parent-phone"
                      type="tel"
                      className={`ar-input ${isErrorVisible('parentPhone') ? 'ar-input--error' : ''}`}
                      value={form.parentPhone}
                      onChange={handleChange('parentPhone')}
                      onBlur={handleBlur('parentPhone')}
                      placeholder="+1 (555) 234-5679"
                    />
                  </div>
                  {isErrorVisible('parentPhone') && (
                    <div className="ar-error">
                      <AlertCircle size={13} /> {errors.parentPhone}
                    </div>
                  )}
                </div>

                {/* Relationship to Child */}
                <div className="ar-field">
                  <div className="ar-label-row">
                    <label className="ar-label" htmlFor="ar-parent-relationship">
                      Relationship to Child <span className="ar-req">*</span>
                    </label>
                  </div>
                  <div className="ar-input-wrap">
                    <span className="ar-input-icon">
                      <Heart size={16} />
                    </span>
                    <select
                      id="ar-parent-relationship"
                      className={`ar-select ${isErrorVisible('relationship') ? 'ar-select--error' : ''}`}
                      value={form.relationship}
                      onChange={handleChange('relationship')}
                      onBlur={handleBlur('relationship')}
                    >
                      <option value="">Select relationship...</option>
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Guardian">Guardian</option>
                      <option value="Other">Other</option>
                    </select>
                    <span className="ar-input-icon--right">
                      <ChevronDown size={16} />
                    </span>
                  </div>
                  {isErrorVisible('relationship') && (
                    <div className="ar-error">
                      <AlertCircle size={13} /> {errors.relationship}
                    </div>
                  )}
                </div>
              </div>

              {/* Note at bottom of section 1 */}
              <div className="ar-info-box">
                <Info size={16} className="ar-info-box__icon" />
                <span>
                  No new credentials required. This application will be linked directly to your active parent portal.
                </span>
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                FORM SECTION 2: Child Information
                ══════════════════════════════════════════════════════════ */}
            <section className="ar-card">
              <div className="ar-card__header">
                <div className="ar-card__header-left">
                  <div className="ar-card__icon">
                    <span>2</span>
                  </div>
                  <h2 className="ar-card__title">Child Information</h2>
                </div>
                <div className="ar-card__note">
                  <span>Legal details as they appear on official records</span>
                </div>
              </div>

              <div className="ar-grid">
                {/* Child Full Legal Name */}
                <div className="ar-field ar-field--full">
                  <div className="ar-label-row">
                    <label className="ar-label" htmlFor="ar-child-fullname">
                      Child's Full Legal Name <span className="ar-req">*</span>
                    </label>
                  </div>
                  <div className="ar-input-wrap">
                    <span className="ar-input-icon">
                      <User size={16} />
                    </span>
                    <input
                      id="ar-child-fullname"
                      type="text"
                      className={`ar-input ${isErrorVisible('childFullName') ? 'ar-input--error' : ''}`}
                      placeholder="e.g., Liam Mansoor"
                      value={form.childFullName}
                      onChange={handleChange('childFullName')}
                      onBlur={handleBlur('childFullName')}
                    />
                  </div>
                  {isErrorVisible('childFullName') && (
                    <div className="ar-error">
                      <AlertCircle size={13} /> {errors.childFullName}
                    </div>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="ar-field">
                  <div className="ar-label-row">
                    <label className="ar-label" htmlFor="ar-child-dob">
                      Date of Birth <span className="ar-req">*</span>
                    </label>
                  </div>
                  <div className="ar-input-wrap">
                    <span className="ar-input-icon">
                      <Calendar size={16} />
                    </span>
                    <input
                      id="ar-child-dob"
                      type="date"
                      className={`ar-input ${isErrorVisible('dob') ? 'ar-input--error' : ''}`}
                      placeholder="mm/dd/yyyy"
                      value={form.dob}
                      onChange={handleChange('dob')}
                      onBlur={handleBlur('dob')}
                    />
                  </div>
                  <div className="ar-hint">
                    <Info size={12} /> Must be between 6 months and 4 years old
                  </div>
                  {isErrorVisible('dob') && (
                    <div className="ar-error">
                      <AlertCircle size={13} /> {errors.dob}
                    </div>
                  )}
                </div>

                {/* Gender */}
                <div className="ar-field">
                  <div className="ar-label-row">
                    <label className="ar-label">
                      Gender <span className="ar-req">*</span>
                    </label>
                  </div>
                  <div className="ar-pills">
                    <label
                      className={`ar-pill-label ${form.gender === 'Female' ? 'ar-pill-label--active' : ''}`}
                      onClick={() => handleGenderSelect('Female')}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={form.gender === 'Female'}
                        onChange={() => {}}
                      />
                      <span className="ar-pill-dot" />
                      <span>Female</span>
                    </label>
                    <label
                      className={`ar-pill-label ${form.gender === 'Male' ? 'ar-pill-label--active' : ''}`}
                      onClick={() => handleGenderSelect('Male')}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={form.gender === 'Male'}
                        onChange={() => {}}
                      />
                      <span className="ar-pill-dot" />
                      <span>Male</span>
                    </label>
                  </div>
                  {isErrorVisible('gender') && (
                    <div className="ar-error">
                      <AlertCircle size={13} /> {errors.gender}
                    </div>
                  )}
                </div>

                {/* Requested Class / Age Group */}
                <div className="ar-field">
                  <div className="ar-label-row">
                    <label className="ar-label" htmlFor="ar-class-group">
                      Requested Class / Age Group <span className="ar-req">*</span>
                    </label>
                  </div>
                  <div className="ar-input-wrap">
                    <span className="ar-input-icon">
                      <BookOpen size={16} />
                    </span>
                    <select
                      id="ar-class-group"
                      className={`ar-select ${isErrorVisible('classGroup') ? 'ar-select--error' : ''}`}
                      value={form.classGroup}
                      onChange={handleChange('classGroup')}
                      onBlur={handleBlur('classGroup')}
                    >
                      <option value="">Select educational grouping...</option>
                      <option value="Infants (6-14 months)">Infants (6–14 months)</option>
                      <option value="Toddlers (15-24 months)">Toddlers (15–24 months)</option>
                      <option value="Pre-Nursery (2-3 years)">Pre-Nursery (2–3 years)</option>
                      <option value="Nursery (3-4 years)">Nursery (3–4 years)</option>
                    </select>
                    <span className="ar-input-icon--right">
                      <ChevronDown size={16} />
                    </span>
                  </div>
                  {isErrorVisible('classGroup') && (
                    <div className="ar-error">
                      <AlertCircle size={13} /> {errors.classGroup}
                    </div>
                  )}
                </div>

                {/* Desired Start Term */}
                <div className="ar-field">
                  <div className="ar-label-row">
                    <label className="ar-label" htmlFor="ar-start-term">
                      Desired Start Term <span className="ar-req">*</span>
                    </label>
                  </div>
                  <div className="ar-input-wrap">
                    <span className="ar-input-icon">
                      <Calendar size={16} />
                    </span>
                    <select
                      id="ar-start-term"
                      className={`ar-select ${isErrorVisible('startTerm') ? 'ar-select--error' : ''}`}
                      value={form.startTerm}
                      onChange={handleChange('startTerm')}
                      onBlur={handleBlur('startTerm')}
                    >
                      <option value="">Select upcoming academic term...</option>
                      <option value="Spring Term (January 2027)">Spring Term (January 2027)</option>
                      <option value="Summer Term (April 2027)">Summer Term (April 2027)</option>
                      <option value="Autumn Term (September 2027)">Autumn Term (September 2027)</option>
                    </select>
                    <span className="ar-input-icon--right">
                      <ChevronDown size={16} />
                    </span>
                  </div>
                  {isErrorVisible('startTerm') && (
                    <div className="ar-error">
                      <AlertCircle size={13} /> {errors.startTerm}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                FORM SECTION 3: Additional Information & Notes (Optional)
                ══════════════════════════════════════════════════════════ */}
            <section className="ar-card">
              <div className="ar-card__header">
                <div className="ar-card__header-left">
                  <div className="ar-card__icon ar-card__icon--notes">
                    <FileText size={20} />
                  </div>
                  <h2 className="ar-card__title">Additional Information &amp; Notes (Optional)</h2>
                </div>
              </div>

              <p className="ar-card__desc">
                Share any routines, dietary preferences, or scheduling notes our admissions team should keep in mind during application review.
              </p>

              <div className="ar-field ar-field--full">
                <textarea
                  className="ar-textarea"
                  placeholder="Tell us about your child's favorite calming routines, allergies, or any scheduling questions..."
                  value={form.additionalNotes}
                  onChange={handleChange('additionalNotes')}
                />
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                FORM SECTION 4: Admissions Office Inquiries & Guidance
                ══════════════════════════════════════════════════════════ */}
            <section className="ar-card ar-card--admissions">
              <div className="ar-card__header">
                <div className="ar-card__header-left">
                  <div className="ar-card__icon ar-card__icon--red">
                    <Phone size={20} />
                  </div>
                  <h2 className="ar-card__title">Admissions Office Inquiries &amp; Guidance</h2>
                </div>
              </div>

              {/* Contact info badges */}
              <div className="ar-contact-badges">
                <div className="ar-contact-badge">
                  <Mail size={15} className="ar-contact-badge__icon" />
                  <span>Email: <strong>admissions@tomjerrynursery.com</strong></span>
                </div>
                <div className="ar-contact-badge">
                  <Phone size={15} className="ar-contact-badge__icon" />
                  <span>Phone: <strong>+1 (555) 019-8230</strong></span>
                </div>
                <div className="ar-contact-badge">
                  <Clock size={15} className="ar-contact-badge__icon" />
                  <span>Hours: <strong>Mon-Fri 8:00 AM - 4:00 PM</strong></span>
                </div>
              </div>

              {/* Notice */}
              <div className="ar-notice-box">
                <AlertTriangle size={18} className="ar-notice-box__icon" />
                <span>
                  <strong>Notice:</strong> Submitting this form records your admission request for review. It does not guarantee immediate placement or imply final enrollment.
                </span>
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                ACTION BAR
                ══════════════════════════════════════════════════════════ */}
            <div className="ar-actions">
              <div className="ar-actions__left">
                <button
                  type="button"
                  className="ar-btn ar-btn--ghost"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>

              <div className="ar-actions__right">
                <button
                  type="button"
                  className="ar-btn ar-btn--outline"
                  onClick={handleSaveDraft}
                >
                  <Save size={16} />
                  <span>Save Draft</span>
                </button>

                <button
                  type="submit"
                  className="ar-btn ar-btn--primary"
                >
                  <span>Submit Admission Request</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TOAST NOTIFICATION
          ══════════════════════════════════════════════════════════════════ */}
      {toastMessage && (
        <div className={`ar-toast ${toastMessage.type === 'error' ? 'ar-toast--error' : 'ar-toast--success'}`} role="alert">
          <div className="ar-toast__icon">
            {toastMessage.type === 'error' ? <AlertCircle size={16} /> : <Check size={16} />}
          </div>
          <div className="ar-toast__text">{toastMessage.text}</div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER (Matching Parent Registration Footer)
          ══════════════════════════════════════════════════════════════════ */}
      <footer className="ar-footer">
        <div className="ar-footer__inner">
          <span className="ar-footer__copy">
            &copy; 2024 Tom &amp; Jerry Nursery. Warm care &amp; mindful learning.
          </span>
          <div className="ar-footer__links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#safeguarding">Safeguarding Policy</a>
            <a href="#support">Support &amp; FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
