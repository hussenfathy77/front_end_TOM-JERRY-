import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Home, ChevronRight, RefreshCw, CheckCircle, CheckCircle2,
  AlertCircle, AlertTriangle, Info, XCircle, Calendar, BookOpen,
  Clock, User, Users, ArrowRight, ArrowLeft, Download, FileText,
  Lock, Mail, Phone, Shield, Star, Menu, X, LogOut,
  Compass, Sun, Archive, Upload, MessageSquare, Layers, FileCheck
} from 'lucide-react';
import './AdmissionStatus.css';

/* ══════════════════════════════════════════════════════════════
   DEMO STATE TOGGLE BAR
══════════════════════════════════════════════════════════════ */
function DemoStateBar({ currentStatus, onStatusChange }) {
  const states = [
    { id: 'review', label: 'Under Review', badge: 'Stage 2' },
    { id: 'info_required', label: 'Info Required', badge: 'Stage 3' },
    { id: 'approved', label: 'Approved', badge: 'Stage 5' },
    { id: 'rejected', label: 'Rejected', badge: 'Final' },
  ];

  return (
    <div className="as-demo-bar">
      <div className="as-demo-bar__inner">
        <div className="as-demo-bar__label">
          <Layers size={14} color="#38bdf8" />
          <span>Interactive Preview Mode:</span>
          <span className="as-demo-bar__badge">Select Status</span>
        </div>
        <div className="as-demo-bar__buttons">
          {states.map((st) => (
            <button
              key={st.id}
              type="button"
              className={`as-demo-btn as-demo-btn--${st.id === 'info_required' ? 'info' : st.id} ${
                currentStatus === st.id ? 'as-demo-btn--active' : ''
              }`}
              onClick={() => onStatusChange(st.id)}
            >
              {currentStatus === st.id && <CheckCircle size={12} />}
              {st.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   NAVBAR (Parent Portal Style)
══════════════════════════════════════════════════════════════ */
function Navbar() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`as-nav ${scrolled ? 'as-nav--scrolled' : ''}`}>
      <div className="as-nav__inner">
        {/* Logo */}
        <a className="as-nav__logo" onClick={() => nav('/')} role="button" tabIndex={0}>
          <div className="as-nav__logo-icon">
            <Sparkles size={20} />
          </div>
          <div className="as-nav__brand">
            <b>Tom &amp; Jerry Nursery</b>
            <small>Early Childhood Care</small>
          </div>
        </a>

        {/* Links */}
        <ul className={`as-nav__links ${open ? 'as-nav__links--open' : ''}`}>
          <li>
            <a
              className="as-nav__link"
              onClick={() => {
                nav('/');
                setOpen(false);
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="as-nav__link"
              onClick={() => {
                nav('/parent-registration');
                setOpen(false);
              }}
            >
              Admission Request
            </a>
          </li>
          <li>
            <a className="as-nav__link as-nav__link--active" onClick={() => setOpen(false)}>
              My Applications
            </a>
          </li>
        </ul>

        {/* Profile & Actions */}
        <div className="as-nav__right">
          <div className="as-nav__profile">
            <div className="as-nav__avatar">MM</div>
            <div className="as-nav__user-info">
              <span className="as-nav__username">Mariam Mansoor</span>
              <span className="as-nav__userrole">Parent Portal</span>
            </div>
          </div>
          <button
            type="button"
            className="as-nav__logout"
            onClick={() => nav('/parent-login')}
            title="Log out of Parent Portal"
          >
            <LogOut size={14} />
            <span>Log Out</span>
          </button>
          <button
            type="button"
            className="as-nav__burger"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════
   SUB-HEADER BAR
══════════════════════════════════════════════════════════════ */
function SubHeaderBar({ onRefresh, isRefreshing, lastSyncTime }) {
  const nav = useNavigate();

  return (
    <div className="as-subbar">
      <div className="as-subbar__inner">
        {/* Breadcrumb */}
        <div className="as-breadcrumb">
          <a
            className="as-breadcrumb__item"
            onClick={() => nav('/')}
            role="button"
            tabIndex={0}
            title="Go to Home"
          >
            <Home size={14} />
            <span>Home</span>
          </a>
          <span className="as-breadcrumb__sep">
            <ChevronRight size={13} />
          </span>
          <span className="as-breadcrumb__item">Admission Status</span>
          <span className="as-breadcrumb__sep">
            <ChevronRight size={13} />
          </span>
          <span className="as-breadcrumb__ref">#TJ-ADM-2026-8492</span>
        </div>

        {/* Right Status */}
        <div className="as-subbar__status">
          <div className="as-live-indicator">
            <span className="as-dot" />
            <span>System Active</span>
          </div>
          <span className="as-subbar__divider">|</span>
          <span>Last Synced {lastSyncTime}</span>
          <span className="as-subbar__divider">|</span>
          <button
            type="button"
            className={`as-refresh-btn ${isRefreshing ? 'as-refresh-btn--spinning' : ''}`}
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw size={13} />
            <span>{isRefreshing ? 'Syncing...' : 'Refresh Status'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   STATUS BANNER
══════════════════════════════════════════════════════════════ */
function StatusBanner({ status }) {
  if (status === 'review') {
    return (
      <div className="as-status-banner as-status-banner--review">
        <div className="as-status-banner__top">
          <span className="as-tag-badge as-tag-badge--yellow">
            <Clock size={12} /> Pending Review
          </span>
          <span className="as-tag-badge as-tag-badge--neutral">
            Queue Priority: Standard Intake
          </span>
        </div>

        <div className="as-status-banner__body">
          <div className="as-status-banner__left">
            <div className="as-status-banner__headline">
              <div className="as-status-banner__icon-wrap">
                <CheckCircle size={24} />
              </div>
              <h2 className="as-status-banner__title">Your Application Is Under Review</h2>
            </div>
            <p className="as-status-banner__desc">
              Your admission request has been submitted successfully and is waiting for our nursery
              team to review cohort availability and developmental alignment.
            </p>
          </div>

          <div className="as-banner-metric">
            <span className="as-banner-metric__label">Estimated Review Time</span>
            <span className="as-banner-metric__val">3-5 Business Days</span>
            <span className="as-banner-metric__progress">Stage 2 of 5</span>
          </div>
        </div>

        <div className="as-status-banner__advisory">
          <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>
            <strong>Important Advisory:</strong> Submission confirmation does not imply final
            admission or enrollment acceptance. You will be notified immediately via registered
            email and this portal upon any status change.
          </span>
        </div>
      </div>
    );
  }

  if (status === 'info_required') {
    return (
      <div className="as-status-banner as-status-banner--info">
        <div className="as-status-banner__top">
          <span className="as-tag-badge as-tag-badge--blue">
            <Info size={12} /> More Information Required
          </span>
          <span className="as-tag-badge as-tag-badge--neutral">
            Queue Priority: Awaiting Parent Reply
          </span>
        </div>

        <div className="as-status-banner__body">
          <div className="as-status-banner__left">
            <div className="as-status-banner__headline">
              <div className="as-status-banner__icon-wrap">
                <Info size={24} />
              </div>
              <h2 className="as-status-banner__title">Additional Information Needed</h2>
            </div>
            <p className="as-status-banner__desc">
              Our nursery team has reviewed your application and needs some additional information
              before continuing the review.
            </p>
          </div>

          <div className="as-banner-metric">
            <span className="as-banner-metric__label">Action Response Time</span>
            <span className="as-banner-metric__val">Within 5 Days</span>
            <span className="as-banner-metric__progress">Stage 3 of 4</span>
          </div>
        </div>

        <div className="as-status-banner__advisory">
          <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>
            <strong>🔴 Action Needed:</strong> Please provide the requested details at your earliest
            convenience so our admissions staff can finalize the review process.
          </span>
        </div>
      </div>
    );
  }

  if (status === 'approved') {
    return (
      <div className="as-status-banner as-status-banner--approved">
        <div className="as-status-banner__top">
          <span className="as-tag-badge as-tag-badge--green">
            <CheckCircle2 size={12} /> Approved
          </span>
          <span className="as-tag-badge as-tag-badge--neutral">Intake Confirmed</span>
        </div>

        <div className="as-status-banner__body">
          <div className="as-status-banner__left">
            <div className="as-status-banner__headline">
              <div className="as-status-banner__icon-wrap">
                <CheckCircle size={28} />
              </div>
              <h2 className="as-status-banner__title">
                Congratulations! Your Application Has Been Approved
              </h2>
            </div>
            <p className="as-status-banner__desc">
              Your child's admission request has been approved by our nursery team. Please review the
              next steps provided by the nursery.
            </p>
          </div>

          <div className="as-banner-metric">
            <span className="as-banner-metric__label">Enrollment Decision</span>
            <span className="as-banner-metric__val">Officially Accepted</span>
            <span className="as-banner-metric__progress">Stage 5 of 5</span>
          </div>
        </div>

        <div className="as-status-banner__advisory">
          <Star size={18} style={{ flexShrink: 0, marginTop: 1, color: '#eab308' }} />
          <span>
            <strong>🌟 Official Welcome Note:</strong> Welcome to the Tom &amp; Jerry Nursery
            family! A formal welcome packet and enrollment schedule have been assigned to Adam Ahmed.
            Our caregivers look forward to creating joyful routines together.
          </span>
        </div>
      </div>
    );
  }

  // rejected
  return (
    <div className="as-status-banner as-status-banner--rejected">
      <div className="as-status-banner__top">
        <span className="as-tag-badge as-tag-badge--red">
          <XCircle size={12} /> Rejected
        </span>
        <span className="as-tag-badge as-tag-badge--neutral">
          Intake: Spring Term (Jan 2027)
        </span>
      </div>

      <div className="as-status-banner__body">
        <div className="as-status-banner__left">
          <div className="as-status-banner__headline">
            <div className="as-status-banner__icon-wrap">
              <XCircle size={24} />
            </div>
            <h2 className="as-status-banner__title">Admission Application Update</h2>
          </div>
          <p className="as-status-banner__desc">
            After reviewing your application, the nursery team was unable to approve the admission
            request at this time.
          </p>
        </div>

        <div className="as-banner-metric">
          <span className="as-banner-metric__label">Decision Dispatched</span>
          <span className="as-banner-metric__val">October 19, 2026</span>
          <span className="as-banner-metric__progress">Stage 3 of 3</span>
        </div>
      </div>

      <div className="as-status-banner__advisory">
        <Info size={18} style={{ flexShrink: 0, marginTop: 1 }} />
        <span>
          <strong>ⓘ Notice Regarding Admissions:</strong> All applications undergo thorough
          evaluation based on licensed capacity and cohort balance. Official decision documentation
          is archived in your parent portal below.
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ADMISSION JOURNEY MILESTONES (TIMELINE)
══════════════════════════════════════════════════════════════ */
function JourneyMilestones({ status }) {
  let steps = [];

  if (status === 'review') {
    steps = [
      {
        title: 'Request Submitted',
        state: 'completed',
        sub: 'Verified Oct 14, 2026',
        icon: <CheckCircle size={18} />,
      },
      {
        title: 'Under Review',
        state: 'active-green',
        sub: 'Evaluation in progress',
        icon: <Clock size={18} />,
      },
      {
        title: 'Decision Made',
        state: 'pending',
        sub: 'Pending outcome',
        icon: <FileCheck size={18} />,
      },
    ];
  } else if (status === 'info_required') {
    steps = [
      {
        title: 'Request Submitted',
        state: 'completed',
        sub: 'Verified Oct 14, 2026',
        icon: <CheckCircle size={18} />,
      },
      {
        title: 'Under Review',
        state: 'completed',
        sub: 'Evaluation completed',
        icon: <CheckCircle size={18} />,
      },
      {
        title: 'Additional Info',
        state: 'active-blue',
        sub: 'Parent response needed',
        icon: <Info size={18} />,
      },
      {
        title: 'Review Resumes',
        state: 'pending',
        sub: 'Pending submissions',
        icon: <RefreshCw size={18} />,
      },
      {
        title: 'Decision Made',
        state: 'pending',
        sub: 'Final placement result',
        icon: <FileCheck size={18} />,
      },
    ];
  } else if (status === 'approved') {
    steps = [
      {
        title: 'Request Submitted',
        state: 'completed',
        sub: 'Verified Oct 14, 2026',
        icon: <CheckCircle size={18} />,
      },
      {
        title: 'Under Review',
        state: 'completed',
        sub: 'Cohort approved',
        icon: <CheckCircle size={18} />,
      },
      {
        title: 'Decision Made',
        state: 'completed',
        badge: 'Approved',
        badgeType: 'green',
        sub: 'Accepted for Jan 2027',
        icon: <CheckCircle2 size={18} />,
      },
    ];
  } else {
    // rejected
    steps = [
      {
        title: 'Request Submitted',
        state: 'completed',
        sub: 'Verified Oct 14, 2026',
        icon: <CheckCircle size={18} />,
      },
      {
        title: 'Under Review',
        state: 'completed',
        sub: 'Evaluated Oct 19, 2026',
        icon: <CheckCircle size={18} />,
      },
      {
        title: 'Decision Made',
        state: 'rejected-node',
        badge: 'Rejected',
        badgeType: 'red',
        sub: 'Capacity limit reached',
        icon: <XCircle size={18} />,
      },
    ];
  }

  return (
    <div className="as-timeline-card">
      <div className="as-timeline-card__header">
        <h3 className="as-timeline-card__title">
          <Compass size={18} color="#16a34a" />
          <span>Admission Journey Milestones</span>
        </h3>
        <span className="as-timeline-card__sub">
          Live stage synchronization with admissions database
        </span>
      </div>

      <div className="as-timeline">
        {steps.map((step, idx) => (
          <div
            key={step.title + idx}
            className={`as-timeline-step as-timeline-step--${step.state}`}
          >
            <div className="as-timeline-node">{step.icon}</div>
            <div className="as-timeline-title">{step.title}</div>
            {step.badge && (
              <span
                className={`as-timeline-badge-inline as-timeline-badge-inline--${step.badgeType}`}
              >
                {step.badge}
              </span>
            )}
            <div className="as-timeline-sub">{step.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   APPLICATION DETAILS CARD (LEFT COLUMN)
══════════════════════════════════════════════════════════════ */
function ApplicationDetailsCard({ status }) {
  let cardTitle = 'Application Details';
  if (status === 'approved') cardTitle = 'Application & Approval Details';
  if (status === 'rejected') cardTitle = 'Decision Details';

  return (
    <div className="as-card">
      <div className="as-card__header">
        <div className="as-card__title-group">
          <h3 className="as-card__title">{cardTitle}</h3>
          <span className="as-card__badge-ref">
            #TJ-ADM-2026-8492
            {status === 'approved' && (
              <span className="as-card__badge-verified">(Verified)</span>
            )}
          </span>
        </div>
      </div>

      <div className="as-details-grid">
        {/* Child */}
        <div className="as-detail-item">
          <div className="as-avatar-initials">AA</div>
          <div className="as-detail-content">
            <span className="as-detail-label">Child</span>
            <span className="as-detail-val">Adam Ahmed</span>
            <span className="as-detail-sub">Age: 16 months</span>
          </div>
        </div>

        {/* Parent / Guardian */}
        <div className="as-detail-item">
          <div className="as-avatar-initials">SA</div>
          <div className="as-detail-content">
            <span className="as-detail-label">Parent / Guardian</span>
            <span className="as-detail-val">Sara Ahmed</span>
            <span className="as-detail-sub">Primary Contact</span>
          </div>
        </div>

        {/* Submission Date */}
        <div className="as-detail-item">
          <div className="as-avatar-icon">
            <Calendar size={18} color="#3b5c45" />
          </div>
          <div className="as-detail-content">
            <span className="as-detail-label">Submission Date</span>
            <span className="as-detail-val">October 14, 2026</span>
            <span className="as-detail-sub">Logged via Parent Portal</span>
          </div>
        </div>

        {/* Target Group */}
        <div className="as-detail-item">
          <div className="as-avatar-icon">
            <BookOpen size={18} color="#0369a1" />
          </div>
          <div className="as-detail-content">
            <span className="as-detail-label">Target Group</span>
            <span className="as-detail-val">Toddlers (15-24 mo)</span>
            <span className="as-detail-sub">Butterflies Cohort Room 2</span>
          </div>
        </div>

        {/* Desired Intake */}
        <div className="as-detail-item">
          <div className="as-avatar-icon">
            <Clock size={18} color="#d97706" />
          </div>
          <div className="as-detail-content">
            <span className="as-detail-label">Desired Intake</span>
            <span className="as-detail-val">Spring Term (Jan 2027)</span>
            <span className="as-detail-sub">Full-day Session Schedule</span>
          </div>
        </div>

        {/* Last Registry Sync */}
        <div className="as-detail-item">
          <div className="as-avatar-icon">
            <RefreshCw size={18} color="#16a34a" />
          </div>
          <div className="as-detail-content">
            <span className="as-detail-label">Last Registry Sync</span>
            <span className="as-detail-val">Today at 09:42 AM</span>
            <span className="as-detail-sub">Auto-mediated with central database</span>
          </div>
        </div>
      </div>

      {/* Extra Row for Approved */}
      {status === 'approved' && (
        <div className="as-approved-row">
          <div className="as-approved-row__left">
            <CheckCircle2 size={22} color="#16a34a" />
            <div>
              <div className="as-approved-row__title">Enrollment Status: Accepted &amp; Logged</div>
              <div className="as-approved-row__sub">
                Room 2 caregiver assignment complete • Welcome packet ready
              </div>
            </div>
          </div>
          <span className="as-approved-row__badge">Provisional Slot Reserved</span>
        </div>
      )}

      {/* Extra Card for Rejected */}
      {status === 'rejected' && (
        <div className="as-rejected-box">
          <div className="as-rejected-box__header">
            <AlertCircle size={18} />
            <span>Cohort Capacity Limit Reached</span>
          </div>
          <p className="as-rejected-box__text">
            Our Toddlers Butterflies Cohort (Room 2) has reached its certified licensed adult-to-child
            capacity ratio (1:4) for the Spring 2027 term. Applications received past the priority
            enrollment threshold are archived with an automatic waitlist preference for subsequent
            terms.
          </p>
        </div>
      )}

      <p className="as-card-privacy-note">
        <Info size={13} />
        <span>Names, dates, and reference codes shown above are demonstration placeholders for privacy.</span>
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   STATUS-SPECIFIC LOWER SECTION (LEFT COLUMN)
══════════════════════════════════════════════════════════════ */
function StatusSpecificSection({ status, onOpenModal }) {
  if (status === 'review') {
    return (
      <div className="as-section-card">
        <h3 className="as-section-card__title">What Happens Next?</h3>
        <p className="as-section-card__desc">
          Our admissions committee carefully evaluates each application to ensure balanced group
          dynamics and exceptional early childhood care.
        </p>

        <div className="as-steps-list">
          <div className="as-step-item">
            <div className="as-step-icon as-step-icon--green">
              <FileCheck size={20} />
            </div>
            <div className="as-step-content">
              <div className="as-step-header">
                <span className="as-step-num">STEP 1</span>
                <span className="as-step-title">Document Verification &amp; Eligibility Check</span>
              </div>
              <p className="as-step-desc">
                Our nursery registrar validates health immunizations, emergency parent contacts, and
                residency credentials against local childcare regulatory guidelines.
              </p>
            </div>
          </div>

          <div className="as-step-item">
            <div className="as-step-icon as-step-icon--blue">
              <Users size={20} />
            </div>
            <div className="as-step-content">
              <div className="as-step-header">
                <span className="as-step-num">STEP 2</span>
                <span className="as-step-title">Age-Group Cohort Space Assessment</span>
              </div>
              <p className="as-step-desc">
                The early years room lead verifies educator ratios and slot openings within the
                Butterflies Toddler group to preserve our warm 1:4 developmental environment.
              </p>
            </div>
          </div>

          <div className="as-step-item">
            <div className="as-step-icon as-step-icon--purple">
              <Sparkles size={20} />
            </div>
            <div className="as-step-content">
              <div className="as-step-header">
                <span className="as-step-num">STEP 3</span>
                <span className="as-step-title">Meet &amp; Greet Invitation</span>
              </div>
              <p className="as-step-desc">
                You will receive an invitation to an informal 30-minute nursery garden tour and key
                educator meeting to discuss dietary routines, naps, and settling-in schedules.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'info_required') {
    return (
      <div className="as-section-card">
        <h3 className="as-section-card__title">Information Requested</h3>
        <p className="as-section-card__desc">
          Please review the admissions team inquiry below and submit the requested clarification or
          updated files.
        </p>

        <div className="as-note-card">
          <span className="as-note-badge">
            <MessageSquare size={12} /> Admissions Team Note
          </span>
          <p className="as-note-quote">
            "Additional immunization record and preferred session schedule timing clarification
            requested."
          </p>
          <ul className="as-note-checklist">
            <li>
              <ChevronRight size={14} color="#ea580c" />
              <span>Updated childhood immunization certificate (MMR &amp; booster updates)</span>
            </li>
            <li>
              <ChevronRight size={14} color="#ea580c" />
              <span>Confirmation of preferred arrival window (7:45 AM vs 8:30 AM drop-off)</span>
            </li>
          </ul>

          <div className="as-alert-box">
            <AlertTriangle size={16} />
            <span>
              <strong>Reminder:</strong> Specific document requirements or questionnaires will be
              specified here by the nursery admissions coordinator.
            </span>
          </div>

          <button
            type="button"
            className="as-btn-primary"
            style={{ marginBottom: 0 }}
            onClick={onOpenModal}
          >
            <Upload size={16} />
            <span>Provide Additional Information Now →</span>
          </button>
        </div>
      </div>
    );
  }

  if (status === 'approved') {
    return (
      <div className="as-section-card">
        <h3 className="as-section-card__title">Next Steps for Enrolled Family</h3>
        <p className="as-section-card__desc">
          To finalize Adam's enrollment for the Spring 2027 term, please complete the onboarding
          milestones below prior to the orientation week.
        </p>

        <div className="as-steps-list">
          <div className="as-step-item">
            <div className="as-step-icon as-step-icon--green">
              <FileText size={20} />
            </div>
            <div className="as-step-content">
              <div className="as-step-header">
                <span className="as-step-num">STEP 1</span>
                <span className="as-step-title">Welcome Packet &amp; Enrollment Pack</span>
              </div>
              <p className="as-step-desc">
                Download and sign the parent handbook, emergency medical authorization, and dietary
                allergy profiles available in your parent downloads section.
              </p>
            </div>
          </div>

          <div className="as-step-item">
            <div className="as-step-icon as-step-icon--blue">
              <Compass size={20} />
            </div>
            <div className="as-step-content">
              <div className="as-step-header">
                <span className="as-step-num">STEP 2</span>
                <span className="as-step-title">Classroom Orientation Visit</span>
              </div>
              <p className="as-step-desc">
                Join our Butterflies Room 2 caregivers for an informal 45-minute orientation visit on
                January 8, 2027 to gently familiarize Adam with play corners and cubbies.
              </p>
            </div>
          </div>

          <div className="as-step-item">
            <div className="as-step-icon as-step-icon--amber">
              <Sun size={20} />
            </div>
            <div className="as-step-content">
              <div className="as-step-header">
                <span className="as-step-num">STEP 3</span>
                <span className="as-step-title">First Day Preparation</span>
              </div>
              <p className="as-step-desc">
                Review our nursery bag packing checklist (labeled comfort toy, 2 spare weather-appropriate
                changes of clothes, indoor grippy socks, and water bottle).
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // rejected
  return (
    <div className="as-section-card">
      <h3 className="as-section-card__title">Admissions Guidance &amp; Next Inquiries</h3>
      <p className="as-section-card__desc">
        We understand that finding the right early childhood setting is an important journey. Here are
        the next available avenues supported by our registry:
      </p>

      <div className="as-steps-list">
        <div className="as-step-item">
          <div className="as-step-icon as-step-icon--blue">
            <Archive size={20} />
          </div>
          <div className="as-step-content">
            <div className="as-step-header">
              <span className="as-step-num">STEP 1</span>
              <span className="as-step-title">Application Record Archive</span>
            </div>
            <p className="as-step-desc">
              Your application credentials and submitted health records will remain securely archived
              in your portal for 12 months with no additional filing fee if reapplying.
            </p>
          </div>
        </div>

        <div className="as-step-item">
          <div className="as-step-icon as-step-icon--green">
            <Calendar size={20} />
          </div>
          <div className="as-step-content">
            <div className="as-step-header">
              <span className="as-step-num">STEP 2</span>
              <span className="as-step-title">Future Cohort Inquiries</span>
            </div>
            <p className="as-step-desc">
              You may request an automatic rollover into the Autumn 2027 preschool transition group
              with expedited priority consideration before public intake opens.
            </p>
          </div>
        </div>

        <div className="as-step-item">
          <div className="as-step-icon as-step-icon--purple">
            <Phone size={20} />
          </div>
          <div className="as-step-content">
            <div className="as-step-header">
              <span className="as-step-num">STEP 3</span>
              <span className="as-step-title">Speak With Admissions</span>
            </div>
            <p className="as-step-desc">
              Book a dedicated 15-minute phone consultation with our admissions director to discuss
              waitlist trends or inquire about companion campuses nearby.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   RIGHT COLUMN (QUICK ACTIONS, SUPPORT, ATMOSPHERE)
══════════════════════════════════════════════════════════════ */
function RightColumn({ status, onOpenModal, onOpenDetailsModal, onDownloadPdf }) {
  const nav = useNavigate();

  // Primary button label & action by state
  let primaryBtnText = 'View Application Details';
  let primaryBtnClass = 'as-btn-primary';
  let primaryBtnAction = onOpenDetailsModal;

  if (status === 'info_required') {
    primaryBtnText = 'Provide Additional Information →';
    primaryBtnAction = onOpenModal;
  } else if (status === 'approved') {
    primaryBtnText = 'View Application Details →';
    primaryBtnAction = onOpenDetailsModal;
  } else if (status === 'rejected') {
    primaryBtnText = 'Back to Parent Portal';
    primaryBtnClass = 'as-btn-primary as-btn-primary--rejected';
    primaryBtnAction = () => nav('/');
  }

  return (
    <div className="as-col-right">
      {/* Quick Actions Card */}
      <div className="as-quick-card">
        <h3 className="as-quick-card__title">
          <span>⚡ Quick Actions</span>
        </h3>

        <button type="button" className={primaryBtnClass} onClick={primaryBtnAction}>
          <span>{primaryBtnText}</span>
        </button>

        <div className="as-action-links">
          {status === 'rejected' ? (
            <a
              className="as-action-link"
              onClick={onOpenDetailsModal}
              role="button"
              tabIndex={0}
            >
              <div className="as-action-link__left">
                <FileText size={15} />
                <span>View Application Details</span>
              </div>
              <ChevronRight size={14} color="#94a3b8" />
            </a>
          ) : (
            <a
              className="as-action-link"
              onClick={() => nav('/')}
              role="button"
              tabIndex={0}
            >
              <div className="as-action-link__left">
                <ArrowLeft size={15} />
                <span>Back to Parent Portal</span>
              </div>
              <ChevronRight size={14} color="#94a3b8" />
            </a>
          )}

          <a
            className="as-action-link"
            onClick={() =>
              onDownloadPdf(
                status === 'approved' ? 'Acceptance-Letter' : status === 'rejected' ? 'Summary-Sheet' : 'Application-Form'
              )
            }
            role="button"
            tabIndex={0}
          >
            <div className="as-action-link__left">
              <Download size={15} />
              <span>
                {status === 'approved'
                  ? 'Acceptance Letter'
                  : status === 'rejected'
                  ? 'Download Summary (PDF)'
                  : 'Download Application (PDF)'}
              </span>
            </div>
            <span className="as-action-badge">240 KB</span>
          </a>
        </div>

        <div className="as-encryption-note">
          <Lock size={14} color="#16a34a" style={{ flexShrink: 0 }} />
          <span>Secured 256-bit encryption for all uploaded family records.</span>
        </div>
      </div>

      {/* Admissions Office Support Card */}
      <div className="as-support-card">
        <div className="as-support-card__header">
          <h4 className="as-support-card__title">📞 Admissions Office Support</h4>
          <span className="as-support-card__sub">Tom &amp; Jerry Admissions Desk</span>
        </div>
        <p className="as-support-card__desc">
          Have questions about this status or need guidance? Our parent relations team is here to
          assist you.
        </p>

        <div className="as-contact-list">
          <a
            href="mailto:admissions@tomjerrynursery.com"
            className="as-contact-item"
            title="Email Nursery Admissions"
          >
            <div className="as-contact-icon">
              <Mail size={16} />
            </div>
            <span>admissions@tomjerrynursery.com</span>
          </a>

          <a href="tel:+15550198230" className="as-contact-item" title="Call Nursery Desk">
            <div className="as-contact-icon">
              <Phone size={16} />
            </div>
            <span>+1 (555) 019-8230</span>
          </a>

          <div className="as-contact-item">
            <div className="as-contact-icon">
              <Clock size={16} />
            </div>
            <span>Mon-Fri, 8:00 AM – 4:00 PM</span>
          </div>
        </div>

        <div className="as-guarantee-badge">
          <Shield size={14} />
          <span>Response guaranteed within 24 working hours</span>
        </div>
      </div>

      {/* Campus Atmosphere Card */}
      <div className="as-atmosphere-card">
        <div className="as-atmosphere-card__top">
          <div className="as-atmosphere-icon">
            <Sparkles size={18} />
          </div>
          <h4 className="as-atmosphere-card__title">Prepared for Growth &amp; Laughter</h4>
        </div>
        <p className="as-atmosphere-card__sub">
          Licensed for 13 staff to toddler ratio (1:4 certified nursery care).
        </p>
        <div className="as-atmosphere-pills">
          <span className="as-atmosphere-pill">🍃 2,000 sq ft Sensory Garden &amp; Sandpit</span>
          <span className="as-atmosphere-pill">🍎 Organic Daily Fresh Midday Dining</span>
          <span className="as-atmosphere-pill">🧸 Reggio Emilia &amp; EYFS Mindful Play</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   INTERACTIVE SUBMIT INFO MODAL
══════════════════════════════════════════════════════════════ */
function InfoSubmissionModal({ isOpen, onClose, onSubmitSuccess }) {
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitSuccess('Information submitted successfully! Our admissions coordinator will review it.');
    onClose();
  };

  return (
    <div className="as-modal-backdrop" onClick={onClose}>
      <div className="as-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="as-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <h3 className="as-modal__title">Provide Requested Information</h3>
        <p className="as-modal__sub">
          Upload supporting immunization documentation or submit clarifying remarks for #TJ-ADM-2026-8492.
        </p>

        <form onSubmit={handleSubmit} className="as-modal__form">
          <div className="as-form-group">
            <label className="as-form-label" htmlFor="as-parent-notes">
              Parent Comments / Clarification Notes
            </label>
            <textarea
              id="as-parent-notes"
              className="as-textarea"
              placeholder="e.g., We have attached the updated booster record and confirm our preferred morning drop-off is 8:15 AM."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            />
          </div>

          <div className="as-form-group">
            <label className="as-form-label">Attach Document (PDF, PNG, JPG)</label>
            <label className="as-file-upload-box">
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFileName(e.target.files[0].name);
                  }
                }}
              />
              <Upload size={24} />
              <p>{fileName ? fileName : 'Click to select or drag document here'}</p>
              <span>Max file size: 10MB per file</span>
            </label>
          </div>

          <div className="as-modal-actions">
            <button type="button" className="as-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="as-btn-submit">
              <Upload size={16} />
              <span>Submit to Admissions</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   APPLICATION DETAILS FULL PREVIEW MODAL
══════════════════════════════════════════════════════════════ */
function DetailsPreviewModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="as-modal-backdrop" onClick={onClose}>
      <div className="as-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="as-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <h3 className="as-modal__title">Application Summary Record</h3>
        <p className="as-modal__sub">
          Official enrollment intake registry record #TJ-ADM-2026-8492
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '13.5px' }}>
          <div style={{ padding: '12px 16px', background: '#f8fafc', borderRadius: 12 }}>
            <strong>Child Full Legal Name:</strong> Adam Ahmed
            <br />
            <span style={{ color: '#64748b' }}>Date of Birth: June 22, 2025 (16 months)</span>
          </div>

          <div style={{ padding: '12px 16px', background: '#f8fafc', borderRadius: 12 }}>
            <strong>Primary Guardian:</strong> Sara Ahmed
            <br />
            <span style={{ color: '#64748b' }}>Phone: +1 (555) 019-8234 • Email: sara.ahmed@example.com</span>
          </div>

          <div style={{ padding: '12px 16px', background: '#f8fafc', borderRadius: 12 }}>
            <strong>Cohort &amp; Schedule:</strong> Butterflies Room 2 (Toddler Full-Day)
            <br />
            <span style={{ color: '#64748b' }}>Anticipated Start: January 11, 2027</span>
          </div>

          <div style={{ padding: '12px 16px', background: '#f8fafc', borderRadius: 12 }}>
            <strong>Emergency Contact:</strong> Tariq Mansoor (Uncle) — Verified
          </div>
        </div>

        <div className="as-modal-actions" style={{ marginTop: 24 }}>
          <button type="button" className="as-btn-primary" onClick={onClose} style={{ marginBottom: 0 }}>
            <span>Close Overview</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="as-footer">
      <div className="as-footer__inner">
        <div className="as-footer__brand">
          <span className="as-footer__copy">
            © 2024 Tom &amp; Jerry Nursery. Warm care &amp; mindful learning.
          </span>
          <span className="as-footer__center-tag">
            Licensed Early Childhood Development &amp; Daycare Centre
          </span>
        </div>

        <div className="as-footer__links">
          <a href="#" className="as-footer__link">
            Privacy Policy
          </a>
          <a href="#" className="as-footer__link">
            Terms of Service
          </a>
          <a href="#" className="as-footer__link">
            Safeguarding Policy
          </a>
          <a href="#" className="as-footer__link">
            Admissions FAQ
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE ROOT
══════════════════════════════════════════════════════════════ */
export default function AdmissionStatus() {
  // 4 states: 'review', 'info_required', 'approved', 'rejected'
  const [status, setStatus] = useState('review');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Just Now');
  const [modalOpen, setModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Handle Refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastSyncTime(`Today at ${time}`);
      showToast('Admission registry synchronized successfully.');
    }, 700);
  };

  // Toast Helper
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg('');
    }, 3800);
  };

  const handleDownloadPdf = (docName) => {
    showToast(`Downloading official ${docName} (#TJ-ADM-2026-8492)...`);
  };

  return (
    <div className="as-root">
      {/* 1. Demo Mode State Toggle Bar at very top */}
      <DemoStateBar currentStatus={status} onStatusChange={(newStatus) => setStatus(newStatus)} />

      {/* 2. Parent Portal Navbar */}
      <Navbar />

      {/* 3. Sub-header bar */}
      <SubHeaderBar
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        lastSyncTime={lastSyncTime}
      />

      {/* 4. Main Body */}
      <main className="as-main">
        <div className="as-container">
          {/* Page Header */}
          <header className="as-page-header">
            <span className="as-page-header__eyebrow">
              ADMISSIONS &amp; INTAKE REGISTRY • 2026-2027 Academic Year
            </span>
            <h1 className="as-page-header__title">Admission Application Status</h1>
            <p className="as-page-header__subtitle">
              Track your child's admission request and stay updated on its progress in real time.
            </p>
          </header>

          {/* Status Banner */}
          <StatusBanner status={status} />

          {/* Admission Journey Milestones (Timeline) */}
          <JourneyMilestones status={status} />

          {/* Two-Column Layout */}
          <div className="as-layout-grid">
            {/* Left Column */}
            <div className="as-col-left">
              <ApplicationDetailsCard status={status} />
              <StatusSpecificSection
                status={status}
                onOpenModal={() => setModalOpen(true)}
              />
            </div>

            {/* Right Column */}
            <RightColumn
              status={status}
              onOpenModal={() => setModalOpen(true)}
              onOpenDetailsModal={() => setDetailsModalOpen(true)}
              onDownloadPdf={handleDownloadPdf}
            />
          </div>
        </div>
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* Interactive Modals & Toast */}
      <InfoSubmissionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitSuccess={(msg) => {
          showToast(msg);
          // Automatically transition to 'review' state to demonstrate completion
          setStatus('review');
        }}
      />

      <DetailsPreviewModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
      />

      {toastMsg && (
        <div className="as-toast">
          <CheckCircle size={18} color="#5dba8a" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
