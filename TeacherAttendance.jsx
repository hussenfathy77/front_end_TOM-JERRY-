import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  LayoutDashboard, Users, CalendarCheck, FileEdit, LogOut,
  Bell, Check, X, Search, RotateCcw,
  Clock, CheckCircle2, Printer, Sparkles,
  Calendar, CheckSquare, ShieldCheck, ChevronDown
} from 'lucide-react';
import attendanceService, { CLASS_CONFIGS } from './services/attendanceService.js';
import './TeacherAttendance.css';

const PER_PAGE = 8;

export default function TeacherAttendance() {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read class from URL query: ?class=kg1 or ?class=kg2
  const classParam = (searchParams.get('class') || 'kg1').toLowerCase();
  const activeClassConfig = CLASS_CONFIGS[classParam] || CLASS_CONFIGS.kg1;

  const [selectedClassId, setSelectedClassId] = useState(activeClassConfig.id);
  const [selectedDate, setSelectedDate] = useState('Oct 24, 2026 (Today)');
  const [roster, setRoster] = useState(activeClassConfig.defaultStudents);
  const [search, setSearch] = useState('');
  const [showSavedToast, setShowSavedToast] = useState(true);
  const [page, setPage] = useState(1);
  const [saving, setSaving] = useState(false);
  const [savedCount, setSavedCount] = useState(activeClassConfig.capacity);

  // Sync state when URL query parameter changes
  useEffect(() => {
    const config = CLASS_CONFIGS[classParam] || CLASS_CONFIGS.kg1;
    setSelectedClassId(config.id);
    setPage(1);
    setSearch('');
    // Load attendance from service layer
    attendanceService.getAttendance(config.id, selectedDate).then(data => {
      setRoster(data.students);
      setSavedCount(data.students.length);
    });
  }, [classParam, selectedDate]);

  // Dropdown class change handler
  const handleClassChange = (newClassId) => {
    setSearchParams({ class: newClassId });
  };

  const setStatus = (id, newStatus) => {
    setRoster(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: newStatus,
          time: newStatus === 'Absent' ? '--' : (s.time === '--' ? '08:45 AM' : s.time)
        };
      }
      return s;
    }));
  };

  const markAllPresent = () => {
    setRoster(prev => prev.map(s => ({
      ...s,
      status: 'Present',
      time: s.time === '--' ? '08:45 AM' : s.time
    })));
  };

  const handleReset = () => {
    setSearch('');
    setPage(1);
    const config = CLASS_CONFIGS[selectedClassId] || CLASS_CONFIGS.kg1;
    setRoster(config.defaultStudents);
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    const result = await attendanceService.saveAttendance(selectedClassId, selectedDate, roster);
    setSaving(false);
    setSavedCount(result.count || roster.length);
    setShowSavedToast(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filtered = roster.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const presentCount = roster.filter(s => s.status === 'Present').length;
  const absentCount = roster.filter(s => s.status === 'Absent').length;
  const lateCount = roster.filter(s => s.status === 'Late').length;
  const enrolledCount = activeClassConfig.capacity;
  const presentPercent = ((presentCount / enrolledCount) * 100).toFixed(1);

  const noteColor = (type) => {
    switch (type) {
      case 'food':    return { bg: '#fdf3e7', color: '#92400e', border: '#f9d9a0', icon: '🍽️' };
      case 'med':     return { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe', icon: '💊' };
      case 'doctor':  return { bg: '#c0392b', color: '#ffffff', border: '#c0392b', icon: '🚨' };
      case 'skin':    return { bg: '#fdf4ff', color: '#7c3aed', border: '#e9d5ff', icon: '🧴' };
      case 'cubby':   return { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0', icon: '📦' };
      case 'check':   return { bg: '#f1f5f9', color: '#475569', border: '#cbd5e1', icon: '☑️' };
      case 'olive':   return { bg: '#6b7c5e', color: '#ffffff', border: '#6b7c5e', icon: '🏷️' };
      case 'alert':   return { bg: '#f8d7d7', color: '#9b2c2c', border: '#f0b0b0', icon: '⚠️' };
      default:        return { bg: '#f1f5f9', color: '#475569', border: '#cbd5e1', icon: '📝' };
    }
  };

  return (
    <div className="ta-layout">
      {/* ══════════════════════════════════════
          SIDEBAR
      ══════════════════════════════════════ */}
      <aside className="ta-sidebar">
        <div className="ta-sidebar__brand" onClick={() => nav('/')}>
          <div className="ta-sidebar__logo-box">
            <Sparkles size={16} color="#2c4a35" />
          </div>
          <div className="ta-sidebar__brand-text">
            <b>Tom &amp; Jerry</b>
            <small>NURSERY SCHOOL</small>
          </div>
        </div>

        <div className="ta-sidebar__tag">
          <span className="ta-sidebar__tag-dot" /> TEACHER PORTAL
        </div>

        <nav className="ta-sidebar__nav">
          <button className="ta-nav-btn" onClick={() => nav('/teacher-dashboard')}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          <button className="ta-nav-btn" onClick={() => nav('/teacher-classes')}>
            <Users size={18} />
            <span>My Classes</span>
          </button>
          <button className="ta-nav-btn ta-nav-btn--active">
            <CalendarCheck size={18} />
            <span>Attendance</span>
          </button>
          <button className="ta-nav-btn" onClick={() => nav('/teacher-activities')}>
            <FileEdit size={18} />
            <span>Daily Activities</span>
          </button>
        </nav>

        <div className="ta-sidebar__bottom">
          <button className="ta-signout-btn" onClick={() => nav('/teacher-login')}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════════
          MAIN AREA
      ══════════════════════════════════════ */}
      <div className="ta-main-wrap">
        
        {/* Top Navbar */}
        <header className="ta-topbar">
          <div className="ta-topbar__left">
            <div className="ta-badge-term">
              <span className="ta-badge-term__logo">
                <Sparkles size={14} color="#2c4a35" />
                <b>Tom &amp; Jerry</b>
              </span>
              <span className="ta-badge-term__sep">•</span>
              <span className="ta-badge-term__pill">
                <Calendar size={13} color="#2c4a35" />
                Spring Term 2025 • Week 8
              </span>
            </div>
          </div>
          <div className="ta-topbar__right">
            <button className="ta-topbar__notif-btn" aria-label="Notifications">
              <Bell size={18} />
              <span className="ta-notif-dot" />
            </button>
            <div className="ta-topbar__user">
              <div className="ta-topbar__user-info">
                <b>Ms. Claire Bennett</b>
                <small>Lead Educator • KG1 &amp; KG2</small>
              </div>
              <div className="ta-topbar__avatar">CB</div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="ta-content">
          
          {/* ── ALERT BANNERS ── */}
          {showSavedToast && (
            <div className="ta-banner ta-banner--success">
              <div className="ta-banner__left">
                <div className="ta-banner__circle-check">
                  <Check size={12} color="#fff" strokeWidth={3} />
                </div>
                <span>Attendance saved successfully. {savedCount} automated parent notifications queued.</span>
              </div>
              <button
                className="ta-banner__close"
                onClick={() => setShowSavedToast(false)}
                aria-label="Dismiss alert"
              >
                <X size={15} />
              </button>
            </div>
          )}

          <div className="ta-banner ta-banner--warning">
            <div className="ta-banner__left">
              <span className="ta-banner__warn-triangle">▲</span>
              <span className="ta-banner__warn-text">
                Notice: Attendance has already been finalized today for this cohort.
                Submitting adjustments will generate an auditable revision stamp.
              </span>
            </div>
            <button className="ta-btn-audit">View Audit Log</button>
          </div>

          {/* ── HEADER ── */}
          <div className="ta-page-hdr">
            <div>
              <div className="ta-breadcrumb">
                <Calendar size={14} className="ta-breadcrumb__ic" />
                <span className="ta-breadcrumb__date">Friday, October 24, 2026</span>
                <span className="ta-breadcrumb__sep">•</span>
                <span className="ta-breadcrumb__pill">Morning Session</span>
              </div>
              <h1 className="ta-title">Daily Attendance</h1>
              <p className="ta-sub">Record and manage attendance for your assigned class.</p>
            </div>

            <div className="ta-active-classroom-box">
              <div className="ta-active-classroom-box__icon">
                🌿
              </div>
              <div>
                <span className="ta-active-classroom-box__lbl">ACTIVE CLASSROOM</span>
                <b className="ta-active-classroom-box__val">
                  {activeClassConfig.name} • {activeClassConfig.room}
                </b>
              </div>
            </div>
          </div>

          {/* ── 4 STATS CARDS ── */}
          <div className="ta-stats-row">
            
            {/* Enrolled Cohort */}
            <div className="ta-stat-card">
              <div className="ta-stat-card__top">
                <div>
                  <span className="ta-stat-card__lbl">ENROLLED COHORT</span>
                  <div className="ta-stat-card__num-row">
                    <span className="ta-stat-card__num">{enrolledCount}</span>
                    <span className="ta-stat-card__unit">Children</span>
                  </div>
                </div>
                <div className="ta-stat-card__icon ta-stat-card__icon--blue">
                  <Users size={18} />
                </div>
              </div>
              <div className="ta-stat-card__footer">
                100% capacity filled
              </div>
            </div>

            {/* Present */}
            <div className="ta-stat-card">
              <div className="ta-stat-card__top">
                <div>
                  <span className="ta-stat-card__lbl">PRESENT</span>
                  <div className="ta-stat-card__num-row">
                    <span className="ta-stat-card__num">{presentCount}</span>
                    <span className="ta-stat-card__badge ta-stat-card__badge--green">{presentPercent}%</span>
                  </div>
                </div>
                <div className="ta-stat-card__icon ta-stat-card__icon--green">
                  <CheckCircle2 size={18} />
                </div>
              </div>
              <div className="ta-stat-card__footer">
                Checked into classrooms
              </div>
            </div>

            {/* Absent */}
            <div className="ta-stat-card">
              <div className="ta-stat-card__top">
                <div>
                  <span className="ta-stat-card__lbl">ABSENT</span>
                  <div className="ta-stat-card__num-row">
                    <span className="ta-stat-card__num">{absentCount}</span>
                    <span className="ta-stat-card__badge ta-stat-card__badge--red">
                      {absentCount > 0 ? 'Excused' : '0 Absent'}
                    </span>
                  </div>
                </div>
                <div className="ta-stat-card__icon ta-stat-card__icon--red">
                  <X size={18} />
                </div>
              </div>
              <div className="ta-stat-card__footer">
                {absentCount > 0 ? 'Noah Klein (Illness)' : 'No absent pupils today'}
              </div>
            </div>

            {/* Late */}
            <div className="ta-stat-card">
              <div className="ta-stat-card__top">
                <div>
                  <span className="ta-stat-card__lbl">LATE CHECK-IN</span>
                  <div className="ta-stat-card__num-row">
                    <span className="ta-stat-card__num">{lateCount}</span>
                    <span className="ta-stat-card__badge ta-stat-card__badge--orange">
                      {lateCount > 0 ? '09:35 AM' : '0 Late'}
                    </span>
                  </div>
                </div>
                <div className="ta-stat-card__icon ta-stat-card__icon--orange">
                  <Clock size={18} />
                </div>
              </div>
              <div className="ta-stat-card__footer">
                {lateCount > 0 ? (selectedClassId === 'kg1' ? 'Theo Robinson' : 'Ethan Wright (Traffic)') : 'All arrived on time'}
              </div>
            </div>

          </div>

          {/* ── FILTERS / CONTROLS ROW ── */}
          <div className="ta-controls-bar">
            
            {/* CLASS ASSIGNED */}
            <div className="ta-control-group">
              <label className="ta-control-label">CLASS ASSIGNED</label>
              <div className="ta-select-wrapper">
                <select
                  className="ta-control-select"
                  value={selectedClassId}
                  onChange={(e) => handleClassChange(e.target.value)}
                >
                  <option value="kg1">KG1 – Class A (Butterflies) – 16 Children</option>
                  <option value="kg2">KG2 – Class B (Robins) – 18 Children</option>
                </select>
                <ChevronDown size={13} className="ta-select-chevron" />
              </div>
            </div>

            {/* ATTENDANCE DATE */}
            <div className="ta-control-group">
              <label className="ta-control-label">ATTENDANCE DATE</label>
              <div className="ta-control-pill">
                <Calendar size={13} />
                <span>{selectedDate}</span>
                <ChevronDown size={13} />
              </div>
            </div>

            {/* QUICK SEARCH */}
            <div className="ta-control-group ta-control-group--grow">
              <label className="ta-control-label">QUICK SEARCH</label>
              <div className="ta-search-input-wrap">
                <Search size={14} className="ta-search-ic" />
                <input
                  type="text"
                  className="ta-search-input"
                  placeholder="Search child name or ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <button className="ta-btn-clear" onClick={handleReset}>
              <RotateCcw size={13} />
              <span>Clear</span>
            </button>

          </div>

          {/* ── CLASS ROSTER TABLE CARD ── */}
          <div className="ta-table-card">
            
            {/* Table Header */}
            <div className="ta-table-head-bar">
              <div className="ta-table-head-left">
                <h3 className="ta-table-title">Class Roster ({enrolledCount})</h3>
                <span className="ta-pill-session">Morning Sign-In</span>
              </div>
              <div className="ta-table-head-right">
                <button className="ta-btn-mark-all" onClick={markAllPresent}>
                  <CheckSquare size={14} />
                  <span>Mark All Present</span>
                </button>
                <button className="ta-btn-roster-action" onClick={() => window.print()}>
                  <Printer size={14} />
                  <span>Print Sheet</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="ta-table-wrap">
              <table className="ta-table">
                <thead>
                  <tr>
                    <th style={{ width: '18%' }}>CHILD NAME &amp; PHOTO</th>
                    <th style={{ width: '11%' }}>CHILD ID</th>
                    <th style={{ width: '20%' }}>ATTENDANCE STATUS</th>
                    <th style={{ width: '12%' }}>ARRIVAL / TIME</th>
                    <th style={{ width: '20%' }}>GUARDIAN / PICKUP NOTE</th>
                    <th style={{ width: '19%' }}>NOTES / SPECIAL CARE</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map(child => {
                    const isPres = child.status === 'Present';
                    const isAbs = child.status === 'Absent';
                    const isLate = child.status === 'Late';
                    const nc = noteColor(child.noteType);

                    return (
                      <tr key={child.id} className={isAbs ? 'ta-row--absent' : isLate ? 'ta-row--late' : child.lateArrival ? 'ta-row--late' : ''}>
                        
                        {/* Col 1: Child Name & Photo */}
                        <td>
                          <div className="ta-child-cell">
                            {child.avatar ? (
                              <img src={child.avatar} alt={child.name} className="ta-child-avatar" />
                            ) : (
                              <div className="ta-child-initial" style={{ 
                                background: isAbs ? '#fee2e2' : isLate ? '#ffedd5' : '#dcfce7',
                                color: isAbs ? '#b91c1c' : isLate ? '#c2410c' : '#166534'
                              }}>
                                {child.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </div>
                            )}
                            <div>
                              <b className="ta-child-name">{child.name}</b>
                              <span className="ta-child-age">Age: {child.age}</span>
                            </div>
                          </div>
                        </td>

                        {/* Col 2: Child ID */}
                        <td>
                          <span className="ta-child-id">{child.id}</span>
                        </td>

                        {/* Col 3: Attendance Status (Segmented Pill) */}
                        <td>
                          <div className="ta-status-segmented">
                            <button
                              type="button"
                              className={`ta-seg-btn ${isPres ? 'ta-seg-btn--present' : ''}`}
                              onClick={() => setStatus(child.id, 'Present')}
                            >
                              Present
                            </button>
                            <button
                              type="button"
                              className={`ta-seg-btn ${isAbs ? 'ta-seg-btn--absent' : ''}`}
                              onClick={() => setStatus(child.id, 'Absent')}
                            >
                              Absent
                            </button>
                            <button
                              type="button"
                              className={`ta-seg-btn ${isLate ? 'ta-seg-btn--late' : ''}`}
                              onClick={() => setStatus(child.id, 'Late')}
                            >
                              Late
                            </button>
                          </div>
                        </td>

                        {/* Col 4: Arrival / Time */}
                        <td>
                          <div className="ta-time-cell">
                            {child.time !== '--' ? (
                              <div className={`ta-time-box${child.lateArrival ? ' ta-time-box--late' : ''}`}>
                                <Clock size={13} className={`ta-time-clock-ic${child.lateArrival ? ' ta-time-clock-ic--late' : ''}`} />
                                <span className={`ta-time-val${child.lateArrival ? ' ta-time-val--late' : ''}`}>{child.time}</span>
                              </div>
                            ) : (
                              <span className="ta-time-dash">--</span>
                            )}
                          </div>
                        </td>

                        {/* Col 5: Guardian / Pickup Note */}
                        <td>
                          <div className="ta-guardian-cell">
                            <span className={`ta-guardian-name${child.guardianAlert ? ' ta-guardian-name--alert' : ''}`}>
                              {child.guardian}
                            </span>
                            <span className="ta-guardian-note">{child.guardianNote}</span>
                          </div>
                        </td>

                        {/* Col 6: Notes / Special Care */}
                        <td>
                          <div className="ta-note-cell">
                            <span
                              className="ta-note-badge"
                              style={{ background: nc.bg, color: nc.color, borderColor: nc.border }}
                            >
                              <span className="ta-note-icon">{nc.icon}</span>
                              {child.note}
                            </span>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Save Bar */}
            <div className="ta-save-bar">
              <div className="ta-save-bar__left">
                <div className="ta-save-bar__icon-box">
                  <ShieldCheck size={18} color="#15803d" />
                </div>
                <span className="ta-save-bar__main-text">
                  Attendance will be recorded for <b>{activeClassConfig.shortName}</b> for Friday, October 24, 2026.
                  Records sync directly with the Parent Portal.
                </span>
              </div>
              <div className="ta-save-bar__right">
                <button className="ta-btn-cancel" onClick={() => nav('/teacher-classes')}>
                  Cancel
                </button>
                <button
                  className="ta-btn-save"
                  disabled={saving}
                  onClick={handleSaveAttendance}
                >
                  <Check size={16} strokeWidth={2.5} />
                  <span>{saving ? 'Saving...' : 'Save Attendance'}</span>
                </button>
              </div>
            </div>

            {/* Pagination */}
            <div className="ta-pagination">
              <span className="ta-pagination__info">
                Showing {Math.min(paged.length, PER_PAGE)} of {filtered.length} children
              </span>
              <div className="ta-pagination__controls">
                <button
                  className="ta-pagination__btn"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span className="ta-pagination__page">
                  Page {page} of {totalPages}
                </span>
                <button
                  className="ta-pagination__btn"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
