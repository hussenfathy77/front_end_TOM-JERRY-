import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, CalendarCheck, FileEdit, LogOut,
  Bell, Sun, CheckCircle2, Clock, AlertTriangle, ChevronRight,
  ShieldAlert, Sparkles, Utensils, Moon, Palette,
  ArrowRight, Check, BookOpen, RefreshCw, AlertCircle,
  FileDown, Pin, Megaphone, Shirt, Calendar, Compass, Heart, X, List
} from 'lucide-react';
import './TeacherDashboard.css';

/* ══════════════════════════════════════
   FULL LOG MODAL
══════════════════════════════════════ */
const fullLogEntries = [
  { time: '07:50 AM', type: 'sync',    icon: '🔄', label: 'Portal Sync Active',         desc: 'All classroom feeds connected. Live data streaming.' },
  { time: '08:45 AM', type: 'note',    icon: '📌', label: 'Teacher Note Added',           desc: 'Reminder: Oliver inhaler spacer & Chloe smock on drying rack.' },
  { time: '09:00 AM', type: 'routine', icon: '✅', label: 'Morning Circle Started',        desc: 'KG1 & KG2 — 32 children joined song ritual & sensory play.' },
  { time: '09:12 AM', type: 'alert',   icon: '⚠️', label: 'Allergy Reminder Triggered',   desc: 'Maya T. (KG1) — peanut allergy flag shown to all educators.' },
  { time: '09:35 AM', type: 'attend',  icon: '🕐', label: 'Late Arrival Logged',           desc: 'Theo R. (KG2 Robins) — arrived 09:35. Guardian noted delay.' },
  { time: '10:15 AM', type: 'routine', icon: '✅', label: 'Morning Circle Completed',      desc: 'All 32 present children completed sensory activity block.' },
  { time: '10:20 AM', type: 'snack',   icon: '🥣', label: 'Snack Logged',                  desc: 'Fruit snack served. Trays segregated per allergy plan.' },
  { time: '10:30 AM', type: 'joy',     icon: '😊', label: '14 Joy Logs Shared',            desc: 'Leaf rubbings saved. 14 creative milestones sent to parent portal.' },
  { time: '11:15 AM', type: 'pickup',  icon: '🤝', label: 'Early Pickup Note',             desc: 'Leo D. (KG1) — Grandma pickup confirmed for 12:30 PM.' },
  { time: '11:30 AM', type: 'routine', icon: '🍽️', label: 'Lunch Session Starting',        desc: 'Carrot-sweet potato soup, wholewheat rolls, apple slices. Meal tracker open.' },
];

const typeColors = {
  sync:    { bg: '#e0f2fe', color: '#0369a1' },
  note:    { bg: '#fef3c7', color: '#92400e' },
  routine: { bg: '#dcfce7', color: '#15803d' },
  alert:   { bg: '#fee2e2', color: '#b91c1c' },
  attend:  { bg: '#ffedd5', color: '#c2410c' },
  snack:   { bg: '#f0fdf4', color: '#16a34a' },
  joy:     { bg: '#fdf4ff', color: '#7e22ce' },
  pickup:  { bg: '#f1f5f9', color: '#475569' },
};

function FullLogModal({ onClose }) {
  return (
    <div className="td-fulllog-overlay" onClick={onClose}>
      <div className="td-fulllog-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="td-fulllog-modal__head">
          <div className="td-fulllog-modal__title-wrap">
            <div className="td-fulllog-modal__icon"><List size={18} /></div>
            <div>
              <h2 className="td-fulllog-modal__title">Full Schedule Log</h2>
              <p className="td-fulllog-modal__sub">Friday, October 24, 2026 • Ms. Claire Bennett</p>
            </div>
          </div>
          <button className="td-fulllog-modal__close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Sync Badge */}
        <div className="td-fulllog-sync-bar">
          <span className="td-fulllog-sync-dot" />
          Real-time Schedule sync is active — {fullLogEntries.length} events logged today
        </div>

        {/* Log Entries */}
        <div className="td-fulllog-list">
          {fullLogEntries.map((entry, i) => {
            const c = typeColors[entry.type] || { bg: '#f1f5f9', color: '#475569' };
            return (
              <div className="td-fulllog-item" key={i}>
                <div className="td-fulllog-item__left">
                  <span className="td-fulllog-item__time">{entry.time}</span>
                  <div className="td-fulllog-item__line" />
                </div>
                <div className="td-fulllog-item__body">
                  <span className="td-fulllog-item__badge" style={{ background: c.bg, color: c.color }}>
                    {entry.icon} {entry.label}
                  </span>
                  <p className="td-fulllog-item__desc">{entry.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="td-fulllog-modal__foot">
          <span>End of today's log • Auto-saved to nursery records</span>
          <button className="td-fulllog-export-btn"><FileDown size={13} /> Export PDF</button>
        </div>
      </div>
    </div>
  );
}

export default function TeacherDashboard() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showFullLog, setShowFullLog] = useState(false);

  return (
    <div className="td-layout">
      {showFullLog && <FullLogModal onClose={() => setShowFullLog(false)} />}
      {/* ══════════════════════════════════════
          SIDEBAR
      ══════════════════════════════════════ */}
      <aside className="td-sidebar">
        {/* Brand */}
        <div className="td-sidebar__brand" onClick={() => nav('/')}>
          <div className="td-sidebar__logo-box">
            <Sparkles size={16} color="#2c4a35" />
          </div>
          <div className="td-sidebar__brand-text">
            <b>Tom &amp; Jerry</b>
            <small>NURSERY SCHOOL</small>
          </div>
        </div>

        {/* Portal Pill */}
        <div className="td-sidebar__tag">
          <span className="td-sidebar__tag-dot" /> TEACHER PORTAL
        </div>

        {/* Navigation items */}
        <nav className="td-sidebar__nav">
          <button
            className={`td-nav-btn ${activeTab === 'dashboard' ? 'td-nav-btn--active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          <button
            className="td-nav-btn"
            onClick={() => nav('/teacher-classes')}
          >
            <Users size={18} />
            <span>My Classes</span>
          </button>
          <button
            className={`td-nav-btn ${activeTab === 'attendance' ? 'td-nav-btn--active' : ''}`}
            onClick={() => nav('/teacher-attendance')}
          >
            <CalendarCheck size={18} />
            <span>Attendance</span>
          </button>
          <button
            className={`td-nav-btn ${activeTab === 'activities' ? 'td-nav-btn--active' : ''}`}
            onClick={() => nav('/teacher-activities')}
          >
            <FileEdit size={18} />
            <span>Daily Activities</span>
          </button>
        </nav>

        {/* Sign Out */}
        <div className="td-sidebar__bottom">
          <button className="td-signout-btn" onClick={() => nav('/teacher-login')}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════════
          MAIN CONTENT AREA
      ══════════════════════════════════════ */}
      <div className="td-main-wrap">
        
        {/* Top Navbar */}
        <header className="td-topbar">
          <div className="td-topbar__left">
            <div className="td-badge-term">
              <span className="td-badge-term__logo">
                <Sparkles size={14} color="#2c4a35" />
                <b>Tom &amp; Jerry</b>
              </span>
              <span className="td-badge-term__sep">•</span>
              <span className="td-badge-term__pill">
                <Calendar size={13} color="#2c4a35" />
                Spring Term 2025 • Week 8
              </span>
            </div>
          </div>
          <div className="td-topbar__right">
            <button className="td-topbar__notif-btn" aria-label="Notifications">
              <Bell size={18} />
              <span className="td-notif-dot" />
            </button>
            <div className="td-topbar__user">
              <div className="td-topbar__user-info">
                <b>Ms. Claire Bennett</b>
                <small>Lead Educator • KG1 &amp; KG2</small>
              </div>
              <div className="td-topbar__avatar">CB</div>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="td-content">

          {/* ── TOP WELCOME SECTION ── */}
          <section className="td-welcome-card">
            <div className="td-welcome-card__main">
              <div className="td-date-badge">
                <Sun size={13} color="#b45309" />
                <span>Friday, October 24, 2026 • Sunny 21°C</span>
              </div>
              <h1 className="td-welcome-title">Welcome Back, Ms. Claire!</h1>
              <p className="td-welcome-desc">
                Ready for another wonderful day of curiosity, discovery, and warm smiles?
              </p>

              <div className="td-welcome-stats-row">
                <div className="td-stat-box">
                  <div className="td-stat-box__icon td-stat-box__icon--green">
                    <Users size={16} />
                  </div>
                  <div>
                    <span className="td-stat-box__lbl">ASSIGNED GROUPS</span>
                    <b className="td-stat-box__val">2 Classes Active</b>
                  </div>
                </div>

                <div className="td-stat-box">
                  <div className="td-stat-box__icon td-stat-box__icon--blue">
                    <Heart size={16} />
                  </div>
                  <div>
                    <span className="td-stat-box__lbl">CURRENT CARE</span>
                    <b className="td-stat-box__val">34 Children Today</b>
                  </div>
                </div>

                <div className="td-stat-box">
                  <div className="td-stat-box__icon td-stat-box__icon--peach">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <span className="td-stat-box__lbl">CLASSROOM MOOD</span>
                    <b className="td-stat-box__val">Happy &amp; Energetic</b>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Theme Card */}
            <div className="td-theme-card">
              <div className="td-theme-card__icon-box">
                <Compass size={22} color="#475569" />
              </div>
              <h3 className="td-theme-card__title">Weekly Theme</h3>
              <p className="td-theme-card__quote">
                “Autumn Forest Animals &amp; Hibernation Wonders”
              </p>
              <div className="td-theme-card__footer">
                <span className="td-theme-card__dot" /> Day 5 of Unit
              </div>
            </div>
          </section>

          {/* ── TWO ACTION CARDS ── */}
          <section className="td-actions-grid">
            
            {/* Card 1: Attendance Management */}
            <div className="td-action-card">
              <div className="td-action-card__head">
                <div className="td-action-card__icon td-action-card__icon--green">
                  <CheckCircle2 size={20} />
                </div>
                <span className="td-action-card__badge td-action-card__badge--green">
                  ● 32 / 34 Checked In (94%)
                </span>
              </div>
              <h3 className="td-action-card__title">Attendance Management</h3>
              <p className="td-action-card__desc">
                Log real-time morning sign-ins, mark authorized pickup notes, and verify caregiver hand-offs.
              </p>
              
              <div className="td-action-card__avatars-row">
                <div className="td-avatar-group">
                  <span className="td-avatar td-avatar--pink">LS</span>
                  <span className="td-avatar td-avatar--peach">MA</span>
                  <span className="td-avatar td-avatar--blue">EP</span>
                  <span className="td-avatar td-avatar--gray">+29</span>
                </div>
                <span className="td-action-card__avatars-text">2 pending pickup verifications</span>
              </div>

              <button className="td-btn td-btn--forest" onClick={() => nav('/teacher-attendance')}>
                Manage Attendance →
              </button>
            </div>

            {/* Card 2: Daily Activities */}
            <div className="td-action-card">
              <div className="td-action-card__head">
                <div className="td-action-card__icon td-action-card__icon--peach">
                  <Palette size={20} />
                </div>
                <span className="td-action-card__badge td-action-card__badge--peach">
                  <Clock size={12} /> Nap Time Starts 12:45
                </span>
              </div>
              <h3 className="td-action-card__title">Daily Activities</h3>
              <p className="td-action-card__desc">
                Log nutritious meal intakes, bathroom breaks, joyful sensory milestones, and nap duration logs.
              </p>
              
              <div className="td-action-card__chips-row">
                <span className="td-chip-tag">🥣 Fruit Snack Logged</span>
                <span className="td-chip-tag">🍃 14 Leaf Rubbings Saved</span>
                <span className="td-chip-tag">😊 34 Joy Logs</span>
              </div>

              <button className="td-btn td-btn--taupe" onClick={() => nav('/teacher-activities')}>
                Manage Activities →
              </button>
            </div>

          </section>

          {/* ── ASSIGNED CLASSROOMS (MY CLASSES) ── */}
          <section className="td-classes-section">
            <div className="td-classes-header">
              <div>
                <span className="td-pill-subtitle">Assigned Classrooms</span>
                <h2 className="td-classes-title">My Classes</h2>
                <p className="td-classes-sub">Current assigned classrooms for Academic Year 2026–2027</p>
              </div>
              <div className="td-classes-actions">
                <button className="td-classes-btn" onClick={() => nav('/teacher-attendance')}>
                  <FileDown size={14} />
                  <span>Daily Roll Sheet</span>
                </button>
                <button className="td-classes-btn" onClick={() => nav('/teacher-classes')}>
                  <ShieldAlert size={14} color="#b91c1c" />
                  <span>Allergy Flags (3)</span>
                </button>
              </div>
            </div>

            <div className="td-classes-grid">
              
              {/* Class 1: KG1 – Class A Butterflies */}
              <div className="td-class-card">
                <div className="td-class-card__head">
                  <div className="td-class-card__head-left">
                    <div className="td-class-card__icon td-class-card__icon--butterfly">
                      <span>🦋</span>
                    </div>
                    <div>
                      <div className="td-class-card__title-row">
                        <h3 className="td-class-card__name">KG1 – Class A</h3>
                        <span className="td-badge-class td-badge-class--peach">Butterflies</span>
                      </div>
                      <div className="td-class-card__meta">
                        Room 102 • Early Years • Ages 3–4 yrs
                      </div>
                    </div>
                  </div>
                  <div className="td-class-card__lead">
                    Lead: Ms. Claire Bennett
                  </div>
                </div>

                {/* Classroom Image Banner */}
                <div className="td-class-banner td-class-banner--butterflies">
                  <img
                    src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=700&q=80"
                    alt="Sensory & Phonics Center"
                    className="td-class-banner__img"
                  />
                  <span className="td-class-banner__pill">Sensory &amp; Phonics Center</span>
                </div>

                {/* Attendance Summary */}
                <div className="td-class-att-row">
                  <b>Today's Attendance</b>
                  <span className="td-class-att-val">15 Present / 16 Enrolled</span>
                </div>
                <div className="td-class-att-pills">
                  <span className="td-att-dot td-att-dot--green">● 15 Present</span>
                  <span className="td-att-dot td-att-dot--red">● 1 Absent (Noah K. • Sick Leave)</span>
                  <span className="td-att-dot td-att-dot--gray">0 Late</span>
                </div>

                {/* Special Care Reminders Box */}
                <div className="td-reminders-box td-reminders-box--peach">
                  <div className="td-reminders-box__hdr">
                    <span>SPECIAL CARE REMINDERS</span>
                    <b>2 Active</b>
                  </div>
                  <div className="td-reminders-box__item">
                    <span className="td-reminders-box__ic">⚠️</span>
                    <span>Maya T. (Peanut Allergy)</span>
                  </div>
                  <div className="td-reminders-box__item">
                    <span className="td-reminders-box__ic">🕒</span>
                    <span>Leo D. (Pickup 12:30 by Grandma)</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="td-class-card__footer">
                  <span className="td-class-card__asst">Assistant: Emma Watson</span>
                  <button className="td-class-card__link" onClick={() => nav('/teacher-attendance?class=kg1')}>
                    View Class Roster →
                  </button>
                </div>
              </div>

              {/* Class 2: KG2 – Class B Robins */}
              <div className="td-class-card">
                <div className="td-class-card__head">
                  <div className="td-class-card__head-left">
                    <div className="td-class-card__icon td-class-card__icon--robin">
                      <span>🐦</span>
                    </div>
                    <div>
                      <div className="td-class-card__title-row">
                        <h3 className="td-class-card__name">KG2 – Class B</h3>
                        <span className="td-badge-class td-badge-class--blue">Robins</span>
                      </div>
                      <div className="td-class-card__meta">
                        Room 105 • Foundation Stage • Ages 4–5 yrs
                      </div>
                    </div>
                  </div>
                  <div className="td-class-card__lead">
                    Lead: Ms. Claire Bennett
                  </div>
                </div>

                {/* Classroom Image Banner */}
                <div className="td-class-banner td-class-banner--robins">
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80"
                    alt="Creative Arts & Literacy Center"
                    className="td-class-banner__img"
                  />
                  <span className="td-class-banner__pill">Creative Arts &amp; Literacy Center</span>
                </div>

                {/* Attendance Summary */}
                <div className="td-class-att-row">
                  <b>Today's Attendance</b>
                  <span className="td-class-att-val">17 Present / 18 Enrolled</span>
                </div>
                <div className="td-class-att-pills">
                  <span className="td-att-dot td-att-dot--green">● 17 Present</span>
                  <span className="td-att-dot td-att-dot--orange">● 1 Late Arrival (Theo R. • 09:35)</span>
                  <span className="td-att-dot td-att-dot--gray">0 Absent</span>
                </div>

                {/* Special Care Reminders Box */}
                <div className="td-reminders-box td-reminders-box--blue">
                  <div className="td-reminders-box__hdr">
                    <span>SPECIAL CARE REMINDERS</span>
                    <b>1 Active</b>
                  </div>
                  <div className="td-reminders-box__item">
                    <span className="td-reminders-box__ic">🧴</span>
                    <span>Lucas M. (Eczema ointment after nap)</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="td-class-card__footer">
                  <span className="td-class-card__asst">Assistant: Liam Rodriguez</span>
                  <button className="td-class-card__link" onClick={() => nav('/teacher-attendance?class=kg2')}>
                    View Class Roster →
                  </button>
                </div>
              </div>

            </div>
          </section>

          {/* ── BOTTOM SECTION: ROUTINE TIMELINE & NOTES/NOTICES ── */}
          <section className="td-bottom-grid">
            
            {/* Left: Today's Class Routine */}
            <div className="td-routine-card">
              <div className="td-routine-card__head">
                <div>
                  <h3 className="td-routine-card__title">Today's Class Routine</h3>
                  <p className="td-routine-card__sub">Structured schedule for KG1 Butterflies &amp; KG2 Robins</p>
                </div>
                <span className="td-pill-live">● Live Timeline</span>
              </div>

              <div className="td-routine-timeline">
                
                {/* Step 1 */}
                <div className="td-routine-item">
                  <div className="td-routine-item__marker td-routine-item__marker--done">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <div className="td-routine-item__content td-routine-item__content--done">
                    <div className="td-routine-item__top">
                      <span className="td-routine-time">09:00 AM – 10:15 AM</span>
                      <span className="td-routine-badge td-routine-badge--done">Completed</span>
                    </div>
                    <h4 className="td-routine-item__heading">Morning Circle &amp; Sensory Play</h4>
                    <p className="td-routine-item__desc">
                      Song ritual, weather chart observation, followed by nature leaf texture touch trays. All 32 children participated enthusiastically.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="td-routine-item">
                  <div className="td-routine-item__marker td-routine-item__marker--next">
                    <Utensils size={14} />
                  </div>
                  <div className="td-routine-item__content td-routine-item__content--next">
                    <div className="td-routine-item__top">
                      <span className="td-routine-time">11:30 AM – 12:30 PM</span>
                      <span className="td-routine-badge td-routine-badge--next">Up Next • in 15 mins</span>
                    </div>
                    <h4 className="td-routine-item__heading">Healthy Lunch &amp; Handwashing Routine</h4>
                    <p className="td-routine-item__desc">
                      Warm carrot-sweet potato soup, wholewheat rolls, and fresh apple slices. Assist younger toddlers with spoon grasp practice.
                    </p>
                    <button className="td-btn-meal-tracker" onClick={() => nav('/teacher-activities')}>
                      Open Meal Tracker
                    </button>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="td-routine-item">
                  <div className="td-routine-item__marker td-routine-item__marker--sched">
                    <Moon size={14} />
                  </div>
                  <div className="td-routine-item__content">
                    <div className="td-routine-item__top">
                      <span className="td-routine-time">12:45 PM – 02:15 PM</span>
                      <span className="td-routine-badge td-routine-badge--sched">Scheduled</span>
                    </div>
                    <h4 className="td-routine-item__heading">Quiet Nap &amp; Soft Audio Storytime</h4>
                    <p className="td-routine-item__desc">
                      White noise gentle ocean hums, cozy sleeping cots arranged in Room 102 &amp; Room 105. Dimmed natural lighting.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="td-routine-item">
                  <div className="td-routine-item__marker td-routine-item__marker--sched">
                    <Palette size={14} />
                  </div>
                  <div className="td-routine-item__content">
                    <div className="td-routine-item__top">
                      <span className="td-routine-time">02:30 PM – 03:30 PM</span>
                      <span className="td-routine-badge td-routine-badge--sched">Scheduled</span>
                    </div>
                    <h4 className="td-routine-item__heading">Outdoor Garden &amp; Creative Crafts</h4>
                    <p className="td-routine-item__desc">
                      Gathering autumn pinecones in the fenced sensory garden, followed by leaf stamping artwork on recycled canvas paper.
                    </p>
                  </div>
                </div>

              </div>

              {/* Full Log Footer Bar */}
              <div className="td-routine-footer-bar">
                <span className="td-routine-footer-bar__sync">
                  <span className="td-routine-footer-bar__dot" />
                  Real-time Schedule sync is active
                </span>
                <button
                  className="td-routine-footer-bar__link"
                  onClick={() => setShowFullLog(true)}
                >
                  Full Log →
                </button>
              </div>

            </div>

            {/* Right: Note Pad & Classroom Notices */}
            <div className="td-side-notes-col">
              
              {/* Note Pad */}
              <div className="td-notepad-card">
                <div className="td-notepad-card__head">
                  <div className="td-notepad-card__title-wrap">
                    <Pin size={16} color="#78350f" />
                    <h3 className="td-notepad-card__title">Teacher's Note Pad</h3>
                  </div>
                  <span className="td-badge-private">Private</span>
                </div>

                <div className="td-notepad-box">
                  <p className="td-notepad-quote">
                    “Remember to ask Oliver's mom about his afternoon inhaler spacer during dismissal. Check on Chloe's finger paint smock in KG1 drying rack.”
                  </p>
                  <div className="td-notepad-meta">
                    <span>Written at 08:45 AM</span>
                    <button className="td-notepad-edit">Edit Note</button>
                  </div>
                </div>

                <button className="td-btn-add-note">
                  + Add Quick Scratchpad Note
                </button>
              </div>

              {/* Classroom Notices */}
              <div className="td-notices-card">
                <div className="td-notices-card__head">
                  <h3 className="td-notices-card__title">Classroom Notices</h3>
                  <span className="td-badge-active">Active</span>
                </div>

                <div className="td-notice-item">
                  <Megaphone size={16} color="#15803d" className="td-notice-item__ic" />
                  <div>
                    <h4 className="td-notice-item__title">Botanical Garden Field Trip</h4>
                    <p className="td-notice-item__desc">Next Tuesday. 31/34 permission slips signed.</p>
                  </div>
                </div>

                <div className="td-notice-item">
                  <Shirt size={16} color="#15803d" className="td-notice-item__ic" />
                  <div>
                    <h4 className="td-notice-item__title">Art Smocks Restocked</h4>
                    <p className="td-notice-item__desc">Fresh washed aprons available in Storage Cabinet B.</p>
                  </div>
                </div>

                <button className="td-btn-broadcast">
                  Send Broadcast to Parents
                </button>
              </div>

            </div>

          </section>

        </main>
      </div>
    </div>
  );
}
