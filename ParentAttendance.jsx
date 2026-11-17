import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Home, User, LogOut, RefreshCw, Download,
  RotateCcw, Calendar, Phone, Mail, Shield, ChevronRight
} from 'lucide-react';
import './ParentAttendance.css';

/* ══════════════════════════════════════
   NAVBAR
══════════════════════════════════════ */
function Navbar() {
  const nav = useNavigate();
  const links = [
    { label: 'Home',             href: '/' },
    { label: 'My Child',         href: '#' },
    { label: 'Attendance',       href: '/parent-attendance', active: true },
    { label: 'Daily Activities', href: '#' },
  ];

  return (
    <nav className="pa-nav">
      <div className="pa-nav__inner">
        {/* Logo */}
        <div className="pa-nav__logo" onClick={() => nav('/')}>
          <div className="pa-nav__logo-ic"><Sparkles size={14} color="#34445c" /></div>
          <div className="pa-nav__brand">
            <b>Tom &amp; Jerry Nursery</b>
            <small>Early Childhood Care</small>
          </div>
        </div>

        {/* Links */}
        <ul className="pa-nav__links">
          {links.map(l => (
            <li key={l.label}>
              <a
                href={l.href}
                className={`pa-nav__link${l.active ? ' pa-nav__link--active' : ''}`}
                onClick={e => { if (l.href.startsWith('/') && !l.active) { e.preventDefault(); nav(l.href); } }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* User */}
        <div className="pa-nav__right">
          <div className="pa-nav__user">
            <div className="pa-nav__avatar"><User size={14} /></div>
            <div className="pa-nav__userinfo">
              <b>Mariam Mansoor</b>
              <small>Parent Portal</small>
            </div>
          </div>
          <button className="pa-nav__logout" onClick={() => nav('/parent-login')}>
            <LogOut size={13} /> Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════
   BREADCRUMB + STATUS BAR
══════════════════════════════════════ */
function TopBar() {
  return (
    <div className="pa-topbar">
      <div className="pa-topbar__inner">
        <div className="pa-breadcrumb">
          <span>Home</span><ChevronRight size={12} /><span>My Child</span><ChevronRight size={12} /><span className="pa-breadcrumb--active">Attendance</span>
        </div>
        <div className="pa-topbar__status">
          <span className="pa-status-dot" />
          <span>System Active · Real-time Attendance Sync</span>
          <button className="pa-refresh-btn"><RefreshCw size={12} /> Refresh Data</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   CHILD INFO CARD
══════════════════════════════════════ */
function ChildCard() {
  return (
    <div className="pa-child-card">
      <div className="pa-child-card__left">
        <div className="pa-child-avatar" />
        <div className="pa-child-info">
          <div className="pa-child-name-row">
            <span className="pa-child-name">Adam Ahmed</span>
            <span className="pa-badge pa-badge--blue">Butterflies Cohort</span>
            <span className="pa-badge pa-badge--green">Enrolled · Active</span>
          </div>
          <div className="pa-child-meta">
            <span>🏫 Toddlers Room 2</span>
            <span className="pa-dot-sep">•</span>
            <span>Age: 18 months</span>
            <span className="pa-dot-sep">•</span>
          </div>
          <div className="pa-child-term">📋 Term: Spring 2027</div>
        </div>
      </div>
      <div className="pa-child-card__right">
        <span className="pa-child-profile"><Shield size={12} /> Child Profile #TJ-2026-449</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   DONUT CHART (SVG)
══════════════════════════════════════ */
function DonutChart({ pct, color }) {
  const r = 28, cx = 32, cy = 32;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e8f0eb" strokeWidth="7" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="7"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={circ / 4}
        strokeLinecap="round" />
    </svg>
  );
}

/* ══════════════════════════════════════
   STATS SECTION
══════════════════════════════════════ */
function Stats() {
  return (
    <div className="pa-stats">
      {/* Scheduled Days */}
      <div className="pa-stat-card">
        <div className="pa-stat-card__top">
          <div className="pa-stat-card__label">
            <Calendar size={13} /> Scheduled Nursery Days
          </div>
          <span className="pa-badge pa-badge--gray">Cycle 10</span>
        </div>
        <div className="pa-stat-card__body">
          <div>
            <div className="pa-stat-num">22 <span>Days</span></div>
            <div className="pa-stat-sub">Scheduled nursery days this month</div>
          </div>
          <DonutChart pct={100} color="#3b82f6" />
        </div>
      </div>

      {/* Total Attended */}
      <div className="pa-stat-card">
        <div className="pa-stat-card__top">
          <div className="pa-stat-card__label">✓ Total Attended</div>
          <span className="pa-badge pa-badge--green-soft">86.4% Rate</span>
        </div>
        <div className="pa-stat-card__body">
          <div>
            <div className="pa-stat-num">19 <span>Days</span></div>
            <div className="pa-stat-sub">↗ Consistent morning arrivals recorded</div>
          </div>
          <DonutChart pct={86.4} color="#16a34a" />
        </div>
      </div>

      {/* Absences & Late */}
      <div className="pa-stat-card">
        <div className="pa-stat-card__top">
          <div className="pa-stat-card__label">⚠ Absences &amp; Late</div>
          <div className="pa-stat-badges">
            <span className="pa-badge pa-badge--orange">1 Late</span>
            <span className="pa-badge pa-badge--red">2 Absent</span>
          </div>
        </div>
        <div className="pa-stat-card__body">
          <div>
            <div className="pa-stat-num">2 <span>Days</span></div>
            <div className="pa-stat-sub">(1 excused, 1 illness)</div>
            <div className="pa-stat-sub">All notices confirmed with front desk</div>
          </div>
          <DonutChart pct={13.6} color="#f87171" />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   FILTER BAR
══════════════════════════════════════ */
function FilterBar({ month, year, setMonth, setYear, onReset }) {
  const months = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];
  return (
    <div className="pa-filter">
      <div className="pa-filter__left">
        <span className="pa-filter__label">🔍 Filter Log:</span>
        <select className="pa-select" value={month} onChange={e => setMonth(e.target.value)}>
          {months.map(m => <option key={m}>{m}</option>)}
        </select>
        <select className="pa-select" value={year} onChange={e => setYear(e.target.value)}>
          {['2024','2025','2026','2027'].map(y => <option key={y}>{y}</option>)}
        </select>
        <button className="pa-reset-btn" onClick={onReset}><RotateCcw size={12} /> Reset View</button>
      </div>
      <button className="pa-download-btn"><Download size={13} /> Download Monthly Attendance Log (PDF)</button>
    </div>
  );
}

/* ══════════════════════════════════════
   ATTENDANCE TABLE
══════════════════════════════════════ */
const RECORDS = [
  { date: 'Oct 24, 2026', day: 'Friday',    checkIn: '08:15 AM', checkOut: '03:30 PM', status: 'Present' },
  { date: 'Oct 23, 2026', day: 'Thursday',  checkIn: '08:20 AM', checkOut: '03:25 PM', status: 'Present' },
  { date: 'Oct 22, 2026', day: 'Wednesday', checkIn: '09:15 AM', checkOut: '03:30 PM', status: 'Late'    },
  { date: 'Oct 21, 2026', day: 'Tuesday',   checkIn: '—',        checkOut: '—',         status: 'Absent'  },
  { date: 'Oct 20, 2026', day: 'Monday',    checkIn: '08:10 AM', checkOut: '03:35 PM', status: 'Present' },
  { date: 'Oct 17, 2026', day: 'Friday',    checkIn: '08:18 AM', checkOut: '03:30 PM', status: 'Present' },
  { date: 'Oct 16, 2026', day: 'Thursday',  checkIn: '08:12 AM', checkOut: '03:20 PM', status: 'Present' },
  { date: 'Oct 15, 2026', day: 'Wednesday', checkIn: '—',        checkOut: '—',         status: 'Absent'  },
];

function StatusBadge({ s }) {
  const cls = s === 'Present' ? 'present' : s === 'Late' ? 'late' : 'absent';
  return <span className={`pa-status pa-status--${cls}`}>• {s}</span>;
}

function AttendanceTable() {
  return (
    <div className="pa-table-wrap">
      <div className="pa-table-head">
        <div>
          <div className="pa-table-title">Attendance History</div>
          <div className="pa-table-sub">Showing 22 records for October 2026 · Read-only parental log</div>
        </div>
        <span className="pa-badge pa-badge--outline">📋 Official Care Record</span>
      </div>
      <table className="pa-table">
        <thead>
          <tr>
            <th>DATE</th><th>DAY</th><th>CHECK-IN</th><th>CHECK-OUT</th><th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {RECORDS.map((r, i) => (
            <tr key={i}>
              <td>{r.date}</td>
              <td>{r.day}</td>
              <td className="pa-time">{r.checkIn}</td>
              <td className="pa-time">{r.checkOut}</td>
              <td><StatusBadge s={r.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pa-table-foot">
        <span>Official records are certified daily by Toddlers Room 2 lead educators.</span>
        <span>Showing top 8 entries of 22</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MINI CALENDAR
══════════════════════════════════════ */
const CAL_DAYS = [
  { d: 1,  s: null },     { d: 2,  s: 'present' }, { d: 3,  s: null },
  { d: 4,  s: null },     { d: 5,  s: 'present' }, { d: 6,  s: 'present' }, { d: 7,  s: 'present' },
  { d: 8,  s: 'present' },{ d: 9,  s: 'present' }, { d: 10, s: null },
  { d: 11, s: null },     { d: 12, s: 'present' }, { d: 13, s: 'present' }, { d: 14, s: 'present' },
  { d: 15, s: 'absent' }, { d: 16, s: 'present' }, { d: 17, s: null },
  { d: 18, s: null },     { d: 19, s: 'present' }, { d: 20, s: 'present' }, { d: 21, s: 'absent' },
  { d: 22, s: 'late' },   { d: 23, s: 'present' }, { d: 24, s: null },
  { d: 25, s: null },     { d: 26, s: 'present' }, { d: 27, s: 'present' }, { d: 28, s: 'present' },
  { d: 29, s: 'present' },{ d: 30, s: 'present' }, { d: 31, s: null },
];

function MiniCalendar() {
  const dow = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  // Oct 2026 starts on Thursday (index 4)
  const offset = 4;
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  CAL_DAYS.forEach(d => cells.push(d));

  return (
    <div className="pa-cal">
      <div className="pa-cal__head">
        <span className="pa-cal__title">October 2026</span>
        <span className="pa-cal__room">Toddlers Room 2</span>
      </div>
      <div className="pa-cal__grid">
        {dow.map(d => <div key={d} className="pa-cal__dow">{d}</div>)}
        {cells.map((c, i) => (
          <div key={i} className={`pa-cal__cell${c ? ' pa-cal__cell--day' : ''}`}>
            {c && (
              <>
                <span>{c.d}</span>
                {c.s && <span className={`pa-cal__dot pa-cal__dot--${c.s}`} />}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="pa-cal__legend">
        <span><span className="pa-cal__dot pa-cal__dot--present" /> Present</span>
        <span><span className="pa-cal__dot pa-cal__dot--late" /> Late</span>
        <span><span className="pa-cal__dot pa-cal__dot--absent" /> Absent</span>
        <span><span className="pa-cal__dot pa-cal__dot--off" /> Weekend / Off</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   ABSENCE NOTICE
══════════════════════════════════════ */
function AbsenceNotice() {
  return (
    <div className="pa-notice">
      <div className="pa-notice__title">🔔 Attendance &amp; Absence Notice</div>
      <p className="pa-notice__text">
        Please notify the nursery before <strong>8:30 AM</strong> if your child will be absent
        or arriving late. This helps our kitchen and educators prepare meals and activities.
      </p>
      <div className="pa-notice__box">
        <div className="pa-notice__box-head">EARLY YEARS RECEPTION DESK</div>
        <div className="pa-notice__contact"><Phone size={12} /> +1 (555) 019-8230</div>
        <div className="pa-notice__contact"><Mail size={12} /> admissions@tomjerrynursery.com</div>
      </div>
      <div className="pa-notice__perm"><Shield size={11} /> Parent portal permissions: Strictly verified view-only mode</div>
    </div>
  );
}

/* ══════════════════════════════════════
   UPCOMING LOGS
══════════════════════════════════════ */
function UpcomingLogs() {
  return (
    <div className="pa-upcoming">
      <div className="pa-upcoming__icon"><Calendar size={28} color="#94a3b8" /></div>
      <div className="pa-upcoming__title">Upcoming Days &amp; Future Logs</div>
      <p className="pa-upcoming__desc">
        When new daily check-ins are recorded by classroom educators each morning,
        they will appear here automatically in real time.
      </p>
      <div className="pa-upcoming__note">
        🕐 Logs are retained for 3 years per national early education compliance standards.
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   FOOTER
══════════════════════════════════════ */
function Footer() {
  return (
    <footer className="pa-footer">
      <div className="pa-footer__inner">
        <div>
          <div className="pa-footer__copy">© 2024 Tom &amp; Jerry Nursery. Warm care &amp; mindful learning.</div>
          <div className="pa-footer__sub">Licensed Early Childhood Development &amp; Daycare Center.</div>
        </div>
        <div className="pa-footer__links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Attendance Policy</a>
          <a href="#">Parent FAQ</a>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════ */
export default function ParentAttendance() {
  const [month, setMonth] = useState('October');
  const [year, setYear]   = useState('2026');
  const reset = () => { setMonth('October'); setYear('2026'); };

  return (
    <div className="pa-root">
      <Navbar />
      <TopBar />

      <main className="pa-main">
        <ChildCard />

        {/* Page header */}
        <div className="pa-page-hdr">
          <div>
            <div className="pa-page-label">EARLY YEARS ATTENDANCE &amp; ATTENDANCE LOG</div>
            <h1 className="pa-page-title">Attendance Overview</h1>
            <p className="pa-page-desc">Keep track of your child's attendance and daily presence at nursery.</p>
          </div>
          <span className="pa-badge pa-badge--outline-green">Child: Adam Ahmed (Butterflies Cohort)</span>
        </div>

        <Stats />

        <FilterBar month={month} year={year} setMonth={setMonth} setYear={setYear} onReset={reset} />

        {/* Two-col: table + calendar */}
        <div className="pa-cols">
          <AttendanceTable />
          <div className="pa-col-right">
            <MiniCalendar />
            <AbsenceNotice />
          </div>
        </div>

        <UpcomingLogs />
      </main>

      <Footer />
    </div>
  );
}
