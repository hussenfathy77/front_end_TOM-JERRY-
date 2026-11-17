import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, CalendarCheck, FileEdit, LogOut,
  Bell, Calendar, Search, FileDown, ShieldAlert,
  Sparkles, Check, Clock, Utensils, Moon, Palette,
  Pin, Megaphone, Shirt, X, Eye, GraduationCap, ArrowDownToLine
} from 'lucide-react';
import './TeacherClasses.css';

const KG1_STUDENTS = [
  { id: '#TJN-2024-041', name: 'Maya Torres', age: '4 yrs 3 mo', gender: 'Female', status: 'Present', time: '08:15 AM', guardian: 'Sofia Torres (Mother)', alert: 'Peanut Allergy Alert', alertType: 'allergy' },
  { id: '#TJN-2024-055', name: 'Leo Davies', age: '4 yrs 1 mo', gender: 'Male', status: 'Present', time: '08:22 AM', guardian: 'Elena Davies (Grandma)', alert: 'Inhaler on file (Room 102)', alertType: 'med' },
  { id: '#TJN-2024-088', name: 'Noah Klein', age: '4 yrs 0 mo', gender: 'Male', status: 'Absent', time: '07:45 AM (Notified)', guardian: 'Marcus Klein (Father)', alert: 'Doctor note verified: Mild fever', alertType: 'doctor' },
  { id: '#TJN-2024-092', name: 'Theo Robinson', age: '4 yrs 4 mo', gender: 'Male', status: 'Late', time: '09:35 AM', guardian: 'Mark Robinson (Father)', alert: 'Dentist appointment: Arrived 09:35', alertType: 'late' },
  { id: '#TJN-2024-019', name: 'Chloe Bennett-Smith', age: '3 yrs 11 mo', gender: 'Female', status: 'Present', time: '08:10 AM', guardian: 'Rachel Bennett (Mother)', alert: 'Dairy intolerance (oat milk only)', alertType: 'dietary' },
  { id: '#TJN-2024-067', name: 'Oliver Wang', age: '4 yrs 2 mo', gender: 'Male', status: 'Present', time: '08:28 AM', guardian: 'David Wang (Father)', alert: 'Carpool with Sophia Chen', alertType: 'note' },
  { id: '#TJN-2024-073', name: 'Lucas Miller', age: '4 yrs 5 mo', gender: 'Male', status: 'Present', time: '08:05 AM', guardian: 'Sarah Miller (Aunt)', alert: 'After-school craft club (until 4:30 PM)', alertType: 'activity' },
  { id: '#TJN-2024-104', name: 'Sophia Chen', age: '4 yrs 2 mo', gender: 'Female', status: 'Present', time: '08:26 AM', guardian: 'David Chen (Father)', alert: 'Authorized pickup: Father (David)', alertType: 'note' },
  { id: '#TJN-2024-112', name: 'Amelia Foster', age: '3 yrs 10 mo', gender: 'Female', status: 'Present', time: '08:18 AM', guardian: 'Grace Foster (Mother)', alert: 'Afternoon nap preferred at 1 PM', alertType: 'note' },
  { id: '#TJN-2024-118', name: 'Benjamin Park', age: '4 yrs 1 mo', gender: 'Male', status: 'Present', time: '08:30 AM', guardian: 'Jin Park (Father)', alert: 'Speech therapy session at 2 PM', alertType: 'note' },
  { id: '#TJN-2024-125', name: 'Charlotte Hughes', age: '4 yrs 0 mo', gender: 'Female', status: 'Present', time: '08:20 AM', guardian: 'Claire Hughes (Mother)', alert: 'New glasses — monitor during crafts', alertType: 'note' },
  { id: '#TJN-2024-131', name: 'Daniel Brooks', age: '4 yrs 3 mo', gender: 'Male', status: 'Present', time: '08:12 AM', guardian: 'Robert Brooks (Father)', alert: 'Pickup by uncle (ID verified)', alertType: 'note' },
  { id: '#TJN-2024-139', name: 'Ella Morrison', age: '3 yrs 9 mo', gender: 'Female', status: 'Present', time: '08:25 AM', guardian: 'Laura Morrison (Mother)', alert: 'Sunscreen reapply at outdoor play', alertType: 'note' },
  { id: '#TJN-2024-145', name: 'Freddie Cooper', age: '4 yrs 2 mo', gender: 'Male', status: 'Present', time: '08:35 AM', guardian: 'James Cooper (Father)', alert: 'Lactose free milk at snack time', alertType: 'dietary' },
  { id: '#TJN-2024-152', name: 'Grace Sullivan', age: '4 yrs 4 mo', gender: 'Female', status: 'Present', time: '08:08 AM', guardian: 'Hannah Sullivan (Mother)', alert: 'Early pickup at 2:30 PM (dentist)', alertType: 'note' },
  { id: '#TJN-2024-160', name: 'Henry Adams', age: '4 yrs 1 mo', gender: 'Male', status: 'Present', time: '08:40 AM', guardian: 'Thomas Adams (Father)', alert: 'Birthday treat to share with class', alertType: 'note' },
];

const KG2_STUDENTS = [
  { id: '#TJN-2024-201', name: 'Aiden Taylor', age: '4 yrs 8 mo', gender: 'Male', status: 'Present', time: '08:10 AM', guardian: 'Emily Taylor (Mother)', alert: 'Asthma spacer kept in cubby #4', alertType: 'med' },
  { id: '#TJN-2024-202', name: 'Bella Martinez', age: '4 yrs 11 mo', gender: 'Female', status: 'Present', time: '08:15 AM', guardian: 'Carlos Martinez (Father)', alert: 'Egg allergy — strict monitor', alertType: 'allergy' },
  { id: '#TJN-2024-203', name: 'Caleb Wilson', age: '5 yrs 0 mo', gender: 'Male', status: 'Present', time: '08:22 AM', guardian: 'Amanda Wilson (Mother)', alert: 'Pickup: Grandfather John', alertType: 'note' },
  { id: '#TJN-2024-204', name: 'Daisy Evans', age: '4 yrs 9 mo', gender: 'Female', status: 'Present', time: '08:18 AM', guardian: 'Paul Evans (Father)', alert: 'Full day session & after-care', alertType: 'activity' },
  { id: '#TJN-2024-205', name: 'Ethan Wright', age: '5 yrs 1 mo', gender: 'Male', status: 'Late', time: '09:30 AM', guardian: 'Jessica Wright (Mother)', alert: 'Traffic delay reported', alertType: 'late' },
  { id: '#TJN-2024-206', name: 'Fiona Scott', age: '4 yrs 10 mo', gender: 'Female', status: 'Present', time: '08:05 AM', guardian: 'Liam Scott (Father)', alert: 'Gluten-sensitive diet', alertType: 'dietary' },
  { id: '#TJN-2024-207', name: 'George Harris', age: '5 yrs 0 mo', gender: 'Male', status: 'Present', time: '08:25 AM', guardian: 'Sophie Harris (Mother)', alert: 'Handwashing helper duty', alertType: 'note' },
  { id: '#TJN-2024-208', name: 'Harper Clark', age: '4 yrs 7 mo', gender: 'Female', status: 'Present', time: '08:12 AM', guardian: 'Benjamin Clark (Father)', alert: 'Montessori sensory enthusiast', alertType: 'note' },
  { id: '#TJN-2024-209', name: 'Isaac Lewis', age: '5 yrs 1 mo', gender: 'Male', status: 'Present', time: '08:35 AM', guardian: 'Megan Lewis (Mother)', alert: 'Authorized pickup: Babysitter Anna', alertType: 'note' },
  { id: '#TJN-2024-210', name: 'Jasmine Walker', age: '4 yrs 8 mo', gender: 'Female', status: 'Present', time: '08:20 AM', guardian: 'David Walker (Father)', alert: 'Loves building soft blocks', alertType: 'note' },
  { id: '#TJN-2024-211', name: 'Kai Robinson', age: '4 yrs 11 mo', gender: 'Male', status: 'Present', time: '08:28 AM', guardian: 'Rachel Robinson (Mother)', alert: 'Brother in KG1 Class A', alertType: 'note' },
  { id: '#TJN-2024-212', name: 'Lily Young', age: '5 yrs 0 mo', gender: 'Female', status: 'Present', time: '08:08 AM', guardian: 'William Young (Father)', alert: 'Quiet nap sleeper', alertType: 'note' },
  { id: '#TJN-2024-213', name: 'Mason Allen', age: '4 yrs 9 mo', gender: 'Male', status: 'Present', time: '08:14 AM', guardian: 'Victoria Allen (Mother)', alert: 'Sensory clay apron required', alertType: 'note' },
  { id: '#TJN-2024-214', name: 'Nora King', age: '4 yrs 10 mo', gender: 'Female', status: 'Present', time: '08:30 AM', guardian: 'Charles King (Father)', alert: 'Doctor clearance for physical play', alertType: 'doctor' },
  { id: '#TJN-2024-215', name: 'Owen Baker', age: '5 yrs 1 mo', gender: 'Male', status: 'Present', time: '08:16 AM', guardian: 'Rebecca Baker (Mother)', alert: 'Pickup at 3:30 PM sharp', alertType: 'note' },
  { id: '#TJN-2024-216', name: 'Penelope Green', age: '4 yrs 8 mo', gender: 'Female', status: 'Present', time: '08:24 AM', guardian: 'Matthew Green (Father)', alert: 'Sun hat in cubby #15', alertType: 'note' },
  { id: '#TJN-2024-217', name: 'Quinn Hall', age: '4 yrs 11 mo', gender: 'Male', status: 'Present', time: '08:19 AM', guardian: 'Alice Hall (Mother)', alert: 'Loves phonics sing-along', alertType: 'note' },
  { id: '#TJN-2024-218', name: 'Ruby Campbell', age: '5 yrs 0 mo', gender: 'Female', status: 'Present', time: '08:26 AM', guardian: 'Daniel Campbell (Father)', alert: 'Nut-free snack container', alertType: 'allergy' },
];

export default function TeacherClasses() {
  const nav = useNavigate();
  const [activeRosterModal, setActiveRosterModal] = useState(null); // 'kg1' | 'kg2' | null
  const [rosterSearch, setRosterSearch] = useState('');
  const [showAllergyModal, setShowAllergyModal] = useState(false);

  const modalStudents = activeRosterModal === 'kg1' ? KG1_STUDENTS : KG2_STUDENTS;
  const filteredModalStudents = modalStudents.filter(s =>
    s.name.toLowerCase().includes(rosterSearch.toLowerCase()) ||
    s.id.toLowerCase().includes(rosterSearch.toLowerCase()) ||
    s.guardian.toLowerCase().includes(rosterSearch.toLowerCase())
  );

  return (
    <div className="tc-layout">
      {/* ══════════════════════════════════════
          SIDEBAR
      ══════════════════════════════════════ */}
      <aside className="tc-sidebar">
        <div className="tc-sidebar__brand" onClick={() => nav('/')}>
          <div className="tc-sidebar__logo-box">
            <Sparkles size={16} color="#2c4a35" />
          </div>
          <div className="tc-sidebar__brand-text">
            <b>Tom &amp; Jerry</b>
            <small>NURSERY SCHOOL</small>
          </div>
        </div>

        <div className="tc-sidebar__tag">
          <span className="tc-sidebar__tag-dot" /> TEACHER PORTAL
        </div>

        <nav className="tc-sidebar__nav">
          <button className="tc-nav-btn" onClick={() => nav('/teacher-dashboard')}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          <button className="tc-nav-btn tc-nav-btn--active">
            <Users size={18} />
            <span>My Classes</span>
          </button>
          <button className="tc-nav-btn" onClick={() => nav('/teacher-attendance')}>
            <CalendarCheck size={18} />
            <span>Attendance</span>
          </button>
          <button className="tc-nav-btn" onClick={() => nav('/teacher-activities')}>
            <FileEdit size={18} />
            <span>Daily Activities</span>
          </button>
        </nav>

        <div className="tc-sidebar__bottom">
          <button className="tc-signout-btn" onClick={() => nav('/teacher-login')}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════════
          MAIN AREA
      ══════════════════════════════════════ */}
      <div className="tc-main-wrap">
        
        {/* Top Navbar */}
        <header className="tc-topbar">
          <div className="tc-topbar__left">
            <div className="tc-badge-term">
              <span className="tc-badge-term__logo">
                <Sparkles size={14} color="#2c4a35" />
                <b>Tom &amp; Jerry</b>
              </span>
              <span className="tc-badge-term__sep">•</span>
              <span className="tc-badge-term__pill">
                <Calendar size={13} color="#2c4a35" />
                Spring Term 2025 • Week 8
              </span>
            </div>
          </div>
          <div className="tc-topbar__right">
            <button className="tc-topbar__notif-btn" aria-label="Notifications">
              <Bell size={18} />
              <span className="tc-notif-dot" />
            </button>
            <div className="tc-topbar__user">
              <div className="tc-topbar__user-info">
                <b>Ms. Claire Bennett</b>
                <small>Lead Educator • KG1 &amp; KG2</small>
              </div>
              <div className="tc-topbar__avatar">CB</div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="tc-content">
          
          {/* ── SECTION HEADER ── */}
          <div className="tc-page-hdr">
            <div>
              <span className="tc-badge-section">
                <GraduationCap size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> Assigned Classrooms
              </span>
              <h1 className="tc-title">My Classes</h1>
              <p className="tc-sub">
                Current assigned classrooms for Academic Year 2026–2027
              </p>
            </div>

            <div className="tc-hdr-actions">
              <button className="tc-btn-action" onClick={() => nav('/teacher-attendance')}>
                <ArrowDownToLine size={14} />
                <span>Daily Roll Sheet</span>
              </button>
              <button className="tc-btn-action" onClick={() => setShowAllergyModal(true)}>
                <ShieldAlert size={14} color="#b91c1c" />
                <span>Allergy Flags (3)</span>
              </button>
            </div>
          </div>

          {/* ── 2 CLASS CARDS (GRID) ── */}
          <div className="tc-classes-grid">
            
            {/* CLASS 1: KG1 – Class A Butterflies */}
            <div className="tc-class-card">
              <div className="tc-class-card__head">
                <div className="tc-class-card__head-left">
                  <div className="tc-class-card__avatar tc-avatar--peach">
                    <span>🦋</span>
                  </div>
                  <div>
                    <div className="tc-class-card__title-row">
                      <h3 className="tc-class-card__name">KG1 – Class A</h3>
                      <span className="tc-badge-class tc-badge--peach">Butterflies</span>
                    </div>
                    <div className="tc-class-card__meta">
                      Room 102 • Early Years • Ages 3–4 yrs
                    </div>
                  </div>
                </div>
                <div className="tc-lead-pill">
                  Lead: Ms. Claire Bennett
                </div>
              </div>

              {/* Banner Photo */}
              <div className="tc-class-banner">
                <img
                  src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=700&q=80"
                  alt="Sensory & Phonics Center"
                  className="tc-class-banner__img"
                />
                <span className="tc-class-banner__pill">Sensory &amp; Phonics Center</span>
              </div>

              {/* Attendance */}
              <div className="tc-att-block">
                <div className="tc-att-row">
                  <b>Today's Attendance</b>
                  <span className="tc-att-val">15 Present / 16 Enrolled</span>
                </div>
                {/* Progress bar */}
                <div className="tc-att-bar">
                  <div className="tc-att-bar__seg tc-att-bar__seg--green" style={{ width: '93.75%' }} />
                  <div className="tc-att-bar__seg tc-att-bar__seg--red" style={{ width: '6.25%' }} />
                </div>
                {/* Pills */}
                <div className="tc-att-pills">
                  <span className="tc-att-pill tc-att-pill--green">● 15 Present</span>
                  <span className="tc-att-pill tc-att-pill--red">● 1 Absent (Noah K. • Sick Leave)</span>
                  <span className="tc-att-pill tc-att-pill--gray">● 0 Late</span>
                </div>
              </div>

              {/* Special Care Reminders Box */}
              <div className="tc-reminders-box">
                <div className="tc-reminders-box__hdr">
                  <span>SPECIAL CARE REMINDERS</span>
                  <b>2 Active</b>
                </div>
                <div className="tc-reminders-box__item">
                  <span className="tc-reminders-box__ic">⚠️</span>
                  <span>Maya T. (Peanut Allergy)</span>
                </div>
                <div className="tc-reminders-box__item">
                  <span className="tc-reminders-box__ic">🕒</span>
                  <span>Leo D. (Pickup 12:30 by Grandma)</span>
                </div>
              </div>

              {/* Footer */}
              <div className="tc-class-card__foot">
                <span className="tc-asst-text">Assistant: Emma Watson</span>
                <button
                  className="tc-roster-link"
                  onClick={() => nav('/teacher-attendance?class=kg1')}
                >
                  View Class Roster →
                </button>
              </div>
            </div>

            {/* CLASS 2: KG2 – Class B Robins */}
            <div className="tc-class-card">
              <div className="tc-class-card__head">
                <div className="tc-class-card__head-left">
                  <div className="tc-class-card__avatar tc-avatar--blue">
                    <span>🐦</span>
                  </div>
                  <div>
                    <div className="tc-class-card__title-row">
                      <h3 className="tc-class-card__name">KG2 – Class B</h3>
                      <span className="tc-badge-class tc-badge--blue">Robins</span>
                    </div>
                    <div className="tc-class-card__meta">
                      Room 105 • Foundation Stage • Ages 4–5 yrs
                    </div>
                  </div>
                </div>
                <div className="tc-lead-pill">
                  Lead: Ms. Claire Bennett
                </div>
              </div>

              {/* Banner Photo */}
              <div className="tc-class-banner">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80"
                  alt="Creative Arts & Literacy Center"
                  className="tc-class-banner__img"
                />
                <span className="tc-class-banner__pill">Creative Arts &amp; Literacy Center</span>
              </div>

              {/* Attendance */}
              <div className="tc-att-block">
                <div className="tc-att-row">
                  <b>Today's Attendance</b>
                  <span className="tc-att-val">17 Present / 18 Enrolled</span>
                </div>
                {/* Progress bar */}
                <div className="tc-att-bar">
                  <div className="tc-att-bar__seg tc-att-bar__seg--green" style={{ width: '94.44%' }} />
                  <div className="tc-att-bar__seg tc-att-bar__seg--orange" style={{ width: '5.56%' }} />
                </div>
                {/* Pills */}
                <div className="tc-att-pills">
                  <span className="tc-att-pill tc-att-pill--green">● 17 Present</span>
                  <span className="tc-att-pill tc-att-pill--orange">● 1 Late Arrival (Theo R. • 09:35)</span>
                  <span className="tc-att-pill tc-att-pill--gray">● 0 Absent</span>
                </div>
              </div>

              {/* Special Care Reminders Box */}
              <div className="tc-reminders-box">
                <div className="tc-reminders-box__hdr">
                  <span>SPECIAL CARE REMINDERS</span>
                  <b>1 Active</b>
                </div>
                <div className="tc-reminders-box__item">
                  <span className="tc-reminders-box__ic">🧴</span>
                  <span>Lucas M. (Eczema ointment after nap)</span>
                </div>
              </div>

              {/* Footer */}
              <div className="tc-class-card__foot">
                <span className="tc-asst-text">Assistant: Liam Rodriguez</span>
                <button
                  className="tc-roster-link"
                  onClick={() => nav('/teacher-attendance?class=kg2')}
                >
                  View Class Roster →
                </button>
              </div>
            </div>

          </div>

          {/* ── LOWER SECTION: ROUTINE & NOTES (2 COLUMNS) ── */}
          <div className="tc-lower-layout">
            
            {/* LEFT: TODAY'S CLASS ROUTINE */}
            <div className="tc-routine-card">
              <div className="tc-routine-card__head">
                <div>
                  <h3 className="tc-routine-card__title">Today's Class Routine</h3>
                  <p className="tc-routine-card__sub">Structured schedule for KG1 Butterflies &amp; KG2 Robins</p>
                </div>
                <span className="tc-live-badge">
                  <span className="tc-live-dot" /> Live Timeline
                </span>
              </div>

              <div className="tc-timeline">
                
                {/* Step 1: Morning Circle */}
                <div className="tc-timeline-item">
                  <div className="tc-timeline-marker tc-marker--done">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <div className="tc-timeline-content">
                    <div className="tc-timeline-top">
                      <span className="tc-timeline-time">09:00 AM – 10:15 AM</span>
                      <span className="tc-status-pill tc-status-pill--done">Completed</span>
                    </div>
                    <h4 className="tc-timeline-heading">Morning Circle &amp; Sensory Play</h4>
                    <p className="tc-timeline-desc">
                      Song ritual, weather chart observation, followed by nature leaf texture touch trays. All 32 children participated enthusiastically.
                    </p>
                  </div>
                </div>

                {/* Step 2: Healthy Lunch (Up Next) */}
                <div className="tc-timeline-item tc-timeline-item--active">
                  <div className="tc-timeline-marker tc-marker--active">
                    <Utensils size={14} />
                  </div>
                  <div className="tc-timeline-content">
                    <div className="tc-timeline-top">
                      <span className="tc-timeline-time">11:30 AM – 12:30 PM</span>
                      <span className="tc-status-pill tc-status-pill--next">Up Next • in 15 mins</span>
                    </div>
                    <h4 className="tc-timeline-heading">Healthy Lunch &amp; Handwashing Routine</h4>
                    <p className="tc-timeline-desc">
                      Warm carrot-sweet potato soup, wholewheat rolls, and fresh apple slices. Assist younger toddlers with spoon grasp practice.
                    </p>
                    <button className="tc-btn-meal" onClick={() => nav('/teacher-activities')}>
                      Open Meal Tracker
                    </button>
                  </div>
                </div>

                {/* Step 3: Quiet Nap */}
                <div className="tc-timeline-item">
                  <div className="tc-timeline-marker tc-marker--sched">
                    <Moon size={14} />
                  </div>
                  <div className="tc-timeline-content">
                    <div className="tc-timeline-top">
                      <span className="tc-timeline-time">12:45 PM – 02:15 PM</span>
                      <span className="tc-status-pill tc-status-pill--sched">Scheduled</span>
                    </div>
                    <h4 className="tc-timeline-heading">Quiet Nap &amp; Soft Audio Storytime</h4>
                    <p className="tc-timeline-desc">
                      White noise gentle ocean hums, cozy sleeping cots arranged in Room 102 &amp; Room 105. Dimmed natural lighting.
                    </p>
                  </div>
                </div>

                {/* Step 4: Outdoor Garden */}
                <div className="tc-timeline-item">
                  <div className="tc-timeline-marker tc-marker--sched">
                    <Palette size={14} />
                  </div>
                  <div className="tc-timeline-content">
                    <div className="tc-timeline-top">
                      <span className="tc-timeline-time">02:30 PM – 03:30 PM</span>
                      <span className="tc-status-pill tc-status-pill--sched">Scheduled</span>
                    </div>
                    <h4 className="tc-timeline-heading">Outdoor Garden &amp; Creative Crafts</h4>
                    <p className="tc-timeline-desc">
                      Gathering autumn pinecones in the fenced sensory garden, followed by leaf stamping artwork on recycled canvas paper.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT: NOTEPAD & NOTICES */}
            <div className="tc-side-col">
              
              {/* Teacher's Note Pad */}
              <div className="tc-side-card">
                <div className="tc-side-card__head">
                  <div className="tc-side-card__title-row">
                    <Pin size={16} color="#78350f" />
                    <h3 className="tc-side-card__title">Teacher's Note Pad</h3>
                  </div>
                  <span className="tc-badge-private">Private</span>
                </div>

                <div className="tc-notepad-box">
                  <p className="tc-notepad-quote">
                    “Remember to ask Oliver's mom about his afternoon inhaler spacer during dismissal. Check on Chloe's finger paint smock in KG1 drying rack.”
                  </p>
                  <div className="tc-notepad-meta">
                    <span>Written at 08:45 AM</span>
                    <button className="tc-notepad-edit">Edit Note</button>
                  </div>
                </div>

                <button className="tc-btn-notepad">
                  + Add Quick Scratchpad Note
                </button>
              </div>

              {/* Classroom Notices */}
              <div className="tc-side-card">
                <div className="tc-side-card__head">
                  <h3 className="tc-side-card__title">Classroom Notices</h3>
                  <span className="tc-badge-active">Active</span>
                </div>

                <div className="tc-notice-item">
                  <Megaphone size={16} color="#15803d" className="tc-notice-ic" />
                  <div>
                    <h4 className="tc-notice-title">Botanical Garden Field Trip</h4>
                    <p className="tc-notice-desc">Next Tuesday. 31/34 permission slips signed.</p>
                  </div>
                </div>

                <div className="tc-notice-item">
                  <Shirt size={16} color="#15803d" className="tc-notice-ic" />
                  <div>
                    <h4 className="tc-notice-title">Art Smocks Restocked</h4>
                    <p className="tc-notice-desc">Fresh washed aprons available in Storage Cabinet B.</p>
                  </div>
                </div>

                <button className="tc-btn-broadcast">
                  Send Broadcast to Parents
                </button>
              </div>

            </div>

          </div>

        </main>
      </div>

      {/* ══════════════════════════════════════
          ROSTER MODAL (POPUP)
      ══════════════════════════════════════ */}
      {activeRosterModal && (
        <div className="tc-modal-overlay" onClick={() => setActiveRosterModal(null)}>
          <div className="tc-modal" onClick={e => e.stopPropagation()}>
            <div className="tc-modal__head">
              <div className="tc-modal__head-left">
                <span className="tc-modal__badge">
                  {activeRosterModal === 'kg1' ? '🦋 KG1 – Class A (Butterflies)' : '🐦 KG2 – Class B (Robins)'}
                </span>
                <h2 className="tc-modal__title">
                  Class Roster ({modalStudents.length} Registered Pupils)
                </h2>
                <p className="tc-modal__sub">
                  Academic Year 2026–2027 • Lead: Ms. Claire Bennett
                </p>
              </div>
              <button className="tc-modal__close" onClick={() => setActiveRosterModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="tc-modal__search-wrap">
              <Search size={15} className="tc-modal__search-ic" />
              <input
                type="text"
                className="tc-modal__search-input"
                placeholder="Search pupil name, ID, or guardian..."
                value={rosterSearch}
                onChange={e => setRosterSearch(e.target.value)}
              />
              <span className="tc-modal__count">Showing {filteredModalStudents.length} of {modalStudents.length}</span>
            </div>

            <div className="tc-modal__table-wrap">
              <table className="tc-modal__table">
                <thead>
                  <tr>
                    <th>CHILD PROFILE</th>
                    <th>ENROLLMENT ID</th>
                    <th>TODAY'S STATUS</th>
                    <th>PRIMARY GUARDIAN</th>
                    <th>ALERTS &amp; NOTES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredModalStudents.map(student => (
                    <tr key={student.id}>
                      <td>
                        <div className="tc-modal-pupil">
                          <div className="tc-modal-avatar">
                            {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <b className="tc-modal-pupil__name">{student.name}</b>
                            <span className="tc-modal-pupil__meta">{student.age} • {student.gender}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="tc-modal-id">{student.id}</span>
                      </td>
                      <td>
                        <span className={`tc-modal-status tc-modal-status--${student.status.toLowerCase()}`}>
                          ● {student.status} ({student.time})
                        </span>
                      </td>
                      <td>
                        <span className="tc-modal-guardian">{student.guardian}</span>
                      </td>
                      <td>
                        <span className={`tc-modal-alert tc-modal-alert--${student.alertType}`}>
                          {student.alert}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="tc-modal__foot">
              <span>All records synced with the Nursery Management Database</span>
              <div className="tc-modal__foot-actions">
                <button className="tc-btn-modal-close" onClick={() => setActiveRosterModal(null)}>
                  Close
                </button>
                <button
                  className="tc-btn-modal-att"
                  onClick={() => { setActiveRosterModal(null); nav('/teacher-attendance'); }}
                >
                  Open in Attendance Sheet →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          ALLERGY FLAGS MODAL
      ══════════════════════════════════════ */}
      {showAllergyModal && (
        <div className="tc-modal-overlay" onClick={() => setShowAllergyModal(false)}>
          <div className="tc-modal" style={{ maxWidth: 640 }} onClick={e => e.stopPropagation()}>
            <div className="tc-modal__head">
              <div className="tc-modal__head-left">
                <span className="tc-modal__badge" style={{ background: '#fee2e2', color: '#b91c1c' }}>
                  ⚠️ Medical &amp; Allergy Flags
                </span>
                <h2 className="tc-modal__title">Active Classroom Care Alerts (3)</h2>
                <p className="tc-modal__sub">Assigned Classes: Room 102 &amp; Room 105</p>
              </div>
              <button className="tc-modal__close" onClick={() => setShowAllergyModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: '#fff5f5', border: '1px solid #fed7d7', borderRadius: 10, padding: 14 }}>
                <b style={{ color: '#c53030', display: 'block', marginBottom: 2 }}>🥣 Maya Torres (#TJN-2024-041) • KG1 Butterflies</b>
                <span style={{ fontSize: 12, color: '#4a5568' }}>Mild Peanut Allergy. Snack trays strictly segregated. Epipen stored in Room 102 First Aid Cabinet.</span>
              </div>
              <div style={{ background: '#fffaf0', border: '1px solid #feebc8', borderRadius: 10, padding: 14 }}>
                <b style={{ color: '#c05621', display: 'block', marginBottom: 2 }}>💨 Leo Davies (#TJN-2024-055) • KG1 Butterflies</b>
                <span style={{ fontSize: 12, color: '#4a5568' }}>Mild Asthma. Inhaler with spacer on file. Early pickup at 12:30 PM confirmed with Grandma Elena.</span>
              </div>
              <div style={{ background: '#f0fff4', border: '1px solid #c6f6d5', borderRadius: 10, padding: 14 }}>
                <b style={{ color: '#276749', display: 'block', marginBottom: 2 }}>🧴 Lucas Miller (#TJN-2024-073) • KG2 Robins</b>
                <span style={{ fontSize: 12, color: '#4a5568' }}>Sensitive Skin &amp; Eczema. Apply moisturizer cream post-nap before afternoon outdoor play.</span>
              </div>
            </div>
            <div className="tc-modal__foot">
              <span>All staff in Room 102 &amp; 105 notified</span>
              <button className="tc-btn-modal-close" onClick={() => setShowAllergyModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
