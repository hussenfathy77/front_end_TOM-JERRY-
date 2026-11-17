import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  LayoutDashboard, Users, CalendarCheck, FileEdit, LogOut,
  Bell, Check, X, Sparkles, Utensils, Moon, Smile,
  BookOpen, Droplets, Shield, Clock, Calendar, ChevronDown
} from 'lucide-react';
import { CLASS_CONFIGS } from './services/attendanceService.js';
import './TeacherActivities.css';

export default function TeacherActivities() {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query parameters (?class=kg1&student=#TJN-2024-041)
  const initialClass = (searchParams.get('class') || 'kg1').toLowerCase();
  const [selectedClassId, setSelectedClassId] = useState(CLASS_CONFIGS[initialClass] ? initialClass : 'kg1');

  const currentClassConfig = CLASS_CONFIGS[selectedClassId] || CLASS_CONFIGS.kg1;
  const classStudents = currentClassConfig.defaultStudents;

  const initialStudentId = searchParams.get('student') || classStudents[0].id;
  const [selectedStudentId, setSelectedStudentId] = useState(initialStudentId);

  // Current active student
  const currentStudent = classStudents.find(s => s.id === selectedStudentId) || classStudents[0];

  const [showSavedToast, setShowSavedToast] = useState(true);

  // Sync state if URL search params change
  useEffect(() => {
    const cid = (searchParams.get('class') || 'kg1').toLowerCase();
    if (CLASS_CONFIGS[cid]) {
      setSelectedClassId(cid);
      const conf = CLASS_CONFIGS[cid];
      const sid = searchParams.get('student');
      const found = conf.defaultStudents.find(s => s.id === sid);
      setSelectedStudentId(found ? found.id : conf.defaultStudents[0].id);
    }
  }, [searchParams]);

  const handleClassSelect = (cid) => {
    setSelectedClassId(cid);
    const newConf = CLASS_CONFIGS[cid] || CLASS_CONFIGS.kg1;
    const firstStudent = newConf.defaultStudents[0];
    setSelectedStudentId(firstStudent.id);
    setSearchParams({ class: cid, student: firstStudent.id });
  };

  const handleStudentSelect = (sid) => {
    setSelectedStudentId(sid);
    setSearchParams({ class: selectedClassId, student: sid });
  };

  // Portions state (matching Image 3: Breakfast is 'Most', Lunch is 'All', Snack is 'All')
  const [breakfastPortion, setBreakfastPortion] = useState('Most');
  const [lunchPortion, setLunchPortion] = useState('All');
  const [snackPortion, setSnackPortion] = useState('All');
  const [selectedMood, setSelectedMood] = useState('Happy');
  const [napStatus, setNapStatus] = useState('Took Nap');

  // Behavioral tags
  const [tags, setTags] = useState([
    { id: 1, label: 'Eager to share', active: true },
    { id: 2, label: 'Comfortable with peers', active: true },
    { id: 3, label: 'Enjoyed circle time', active: true },
    { id: 4, label: 'Creative in free play', active: false },
    { id: 5, label: 'Followed instructions', active: false },
  ]);

  const toggleTag = (id) => {
    setTags(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t));
  };

  const handleSave = () => {
    setShowSavedToast(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="tac-layout">
      {/* ══════════════════════════════════════
          SIDEBAR
      ══════════════════════════════════════ */}
      <aside className="tac-sidebar">
        <div className="tac-sidebar__brand" onClick={() => nav('/')}>
          <div className="tac-sidebar__logo-box">
            <Sparkles size={16} color="#2c4a35" />
          </div>
          <div className="tac-sidebar__brand-text">
            <b>Tom &amp; Jerry</b>
            <small>NURSERY SCHOOL</small>
          </div>
        </div>

        <div className="tac-sidebar__tag">
          <span className="tac-sidebar__tag-dot" /> TEACHER PORTAL
        </div>

        <nav className="tac-sidebar__nav">
          <button className="tac-nav-btn" onClick={() => nav('/teacher-dashboard')}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          <button className="tac-nav-btn" onClick={() => nav('/teacher-classes')}>
            <Users size={18} />
            <span>My Classes</span>
          </button>
          <button className="tac-nav-btn" onClick={() => nav('/teacher-attendance')}>
            <CalendarCheck size={18} />
            <span>Attendance</span>
          </button>
          <button className="tac-nav-btn tac-nav-btn--active">
            <FileEdit size={18} />
            <span>Daily Activities</span>
          </button>
        </nav>

        <div className="tac-sidebar__bottom">
          <button className="tac-signout-btn" onClick={() => nav('/teacher-login')}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════════
          MAIN AREA
      ══════════════════════════════════════ */}
      <div className="tac-main-wrap">
        
        {/* Top Navbar */}
        <header className="tac-topbar">
          <div className="tac-topbar__left">
            <div className="tac-badge-term">
              <span className="tac-badge-term__logo">Tom &amp; Jerry</span>
              <span className="tac-badge-term__sep">·</span>
              <span>📅 Spring Term 2025 • Week 8</span>
            </div>
          </div>
          <div className="tac-topbar__right">
            <button className="tac-topbar__notif-btn" aria-label="Notifications">
              <Bell size={18} />
              <span className="tac-notif-dot" />
            </button>
            <div className="tac-topbar__user">
              <div className="tac-topbar__user-info">
                <b>Ms. Claire Bennett</b>
                <small>Lead Educator • KG1 &amp; KG2</small>
              </div>
              <div className="tac-topbar__avatar">CB</div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="tac-content">
          
          {/* Success Notification Banner */}
          {showSavedToast && (
            <div className="tac-banner tac-banner--success">
              <div className="tac-banner__left">
                <div className="tac-banner__circle-check">
                  <Check size={13} color="#fff" strokeWidth={3} />
                </div>
                <span>
                  Daily activities saved successfully. Update is now synchronized with the Parent Portal for {currentStudent.name}.
                </span>
              </div>
              <button
                className="tac-banner__close"
                onClick={() => setShowSavedToast(false)}
                aria-label="Dismiss alert"
              >
                <X size={15} />
              </button>
            </div>
          )}

          {/* Page Header */}
          <div className="tac-page-hdr">
            <div>
              <span className="tac-room-pill">
                ● {currentClassConfig.room} • {currentClassConfig.name}
              </span>
              <h1 className="tac-title">Daily Activities Management</h1>
              <p className="tac-sub">Record each child's daily activities and share real-time updates with parents.</p>
            </div>

            <div className="tac-session-badge">
              <div className="tac-session-badge__icon">
                📅
              </div>
              <div>
                <span className="tac-session-badge__lbl">SESSION TIME</span>
                <b className="tac-session-badge__val">Friday, Oct 24, 2026 • Morning</b>
              </div>
            </div>
          </div>

          {/* Assigned Selection Card */}
          <div className="tac-selection-card">
            <div className="tac-selection-col">
              <label className="tac-sel-lbl">Assigned Classroom</label>
              <select
                className="tac-sel"
                value={selectedClassId}
                onChange={(e) => handleClassSelect(e.target.value)}
              >
                <option value="kg1">KG1 – Class A (Butterflies)</option>
                <option value="kg2">KG2 – Class B (Robins)</option>
              </select>
            </div>
            <div className="tac-selection-col">
              <label className="tac-sel-lbl">Select Student</label>
              <select
                className="tac-sel"
                value={selectedStudentId}
                onChange={(e) => handleStudentSelect(e.target.value)}
              >
                {classStudents.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.id})
                  </option>
                ))}
              </select>
            </div>
            <div className="tac-selection-col">
              <label className="tac-sel-lbl">Activity Date</label>
              <div className="tac-date-input-wrap">
                <input
                  type="text"
                  readOnly
                  value="Oct 24, 2026 (Today)"
                  className="tac-sel tac-sel--date"
                />
                <Calendar size={15} className="tac-date-ic" />
              </div>
            </div>
          </div>

          {/* Selected Student Profile Banner */}
          <div className="tac-student-card">
            <div className="tac-student-card__left">
              <img
                src={currentStudent.avatar || 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=150&q=80'}
                alt={currentStudent.name}
                className="tac-student-avatar"
              />
              <div className="tac-student-info">
                <div className="tac-student-name-row">
                  <b className="tac-student-name">{currentStudent.name}</b>
                  <span className="tac-student-meta-inline">{currentStudent.age} • {currentStudent.gender}</span>
                  <span className={`tac-badge ${currentStudent.status === 'Absent' ? 'tac-badge--red' : currentStudent.status === 'Late' ? 'tac-badge--orange' : 'tac-badge--green'}`}>
                    ● {currentStudent.status} ({currentStudent.time})
                  </span>
                  <span className="tac-badge tac-badge--peach">
                    🛡 Allergy: {currentStudent.alerts || 'Peanut Safe Tray'}
                  </span>
                  <span className="tac-badge tac-badge--mint">
                    👥 Pickup: {currentStudent.guardian || 'Authorized Family ID'}
                  </span>
                </div>
                <div className="tac-student-enrolled">
                  Enrolled: {currentClassConfig.code} ({currentClassConfig.name})
                </div>
              </div>
            </div>
          </div>

          {/* Sticky/Embedded Action Save Bar */}
          <div className="tac-save-action-bar">
            <div className="tac-save-action-bar__left">
              <Shield size={16} color="#15803d" />
              <span>
                Saved daily activities can be viewed immediately by {currentStudent.name.split(' ')[0]}'s guardians in the <strong>Tom &amp; Jerry Parent Daily Activities Portal</strong>.
              </span>
            </div>
            <div className="tac-save-action-bar__right">
              <button className="tac-btn-cancel" onClick={() => nav('/teacher-classes')}>
                Cancel
              </button>
              <button className="tac-btn-save" onClick={handleSave}>
                <Check size={14} /> Save Activities
              </button>
            </div>
          </div>

          {/* Two-Column Grid */}
          <div className="tac-grid">
            
            {/* ══════════════════════════════════════
                LEFT COLUMN
            ══════════════════════════════════════ */}
            <div className="tac-col">
              
              {/* Food & Nutrition Card */}
              <div className="tac-card">
                <div className="tac-card__head">
                  <div className="tac-card__title-group">
                    <div className="tac-card__icon tac-card__icon--peach">
                      <Utensils size={18} />
                    </div>
                    <div>
                      <h3 className="tac-card__title">Food &amp; Nutrition</h3>
                      <p className="tac-card__sub">Track meal portions, fluid intake, and appetite</p>
                    </div>
                  </div>
                  <span className="tac-badge-hdr tac-badge-hdr--mint">Dietary: Normal</span>
                </div>

                {/* Breakfast */}
                <div className="tac-meal-block">
                  <div className="tac-meal-top">
                    <b className="tac-meal-title">Breakfast (08:45 AM)</b>
                    <span className="tac-meal-sub">Oatmeal with sliced strawberries &amp; milk</span>
                  </div>
                  <div className="tac-portion-row">
                    <div className="tac-portion-btns">
                      {['All', 'Most', 'Half', 'Little', 'None'].map(p => (
                        <button
                          key={p}
                          type="button"
                          className={`tac-portion-btn ${breakfastPortion === p ? 'tac-portion-btn--active' : ''}`}
                          onClick={() => setBreakfastPortion(p)}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lunch */}
                <div className="tac-meal-block">
                  <div className="tac-meal-top">
                    <b className="tac-meal-title">Lunch (11:30 AM)</b>
                    <span className="tac-meal-sub">Warm sweet potato soup &amp; wholewheat roll</span>
                  </div>
                  <div className="tac-portion-row">
                    <div className="tac-portion-btns">
                      {['All', 'Most', 'Half', 'Little', 'None'].map(p => (
                        <button
                          key={p}
                          type="button"
                          className={`tac-portion-btn ${lunchPortion === p ? 'tac-portion-btn--active' : ''}`}
                          onClick={() => setLunchPortion(p)}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Afternoon Snack */}
                <div className="tac-meal-block">
                  <div className="tac-meal-top">
                    <b className="tac-meal-title">Afternoon Snack (02:45 PM)</b>
                    <span className="tac-meal-sub">Sliced apples &amp; oat crackers (peanut-free)</span>
                  </div>
                  <div className="tac-portion-row">
                    <div className="tac-portion-btns">
                      {['All', 'Most', 'Half', 'Little', 'None'].map(p => (
                        <button
                          key={p}
                          type="button"
                          className={`tac-portion-btn ${snackPortion === p ? 'tac-portion-btn--active' : ''}`}
                          onClick={() => setSnackPortion(p)}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Fluid & Hydration */}
                <div className="tac-hydration-box">
                  <div className="tac-hydration-left">
                    <Droplets size={18} color="#2563eb" />
                    <div>
                      <b className="tac-hydration-title">Fluid &amp; Hydration</b>
                      <p className="tac-hydration-sub">Goal: 4 cups today</p>
                    </div>
                  </div>
                  <div className="tac-hydration-right">
                    <div className="tac-drops">
                      <span>💧</span>
                      <span>💧</span>
                      <span>💧</span>
                      <span>💧</span>
                    </div>
                    <span className="tac-hydration-count">4 / 4 Cups</span>
                  </div>
                </div>

                {/* Dietary Notes */}
                <div className="tac-sub-section">
                  <h4 className="tac-sub-heading">Dietary Notes &amp; Observations</h4>
                  <div className="tac-note-display">
                    Drank plenty of water; asked for seconds of crisp apple slices. Finished entire lunch bowl.
                  </div>
                </div>

              </div>

              {/* Sleep & Rest Routine Card */}
              <div className="tac-card">
                <div className="tac-card__head">
                  <div className="tac-card__title-group">
                    <div className="tac-card__icon tac-card__icon--blue">
                      <Moon size={18} />
                    </div>
                    <div>
                      <h3 className="tac-card__title">Sleep &amp; Rest Routine</h3>
                      <p className="tac-card__sub">Afternoon quiet cot time in {currentClassConfig.room}</p>
                    </div>
                  </div>
                  <span className="tac-badge-hdr tac-badge-hdr--mint">Cot #12</span>
                </div>

                {/* Nap Status Toggle */}
                <div className="tac-nap-toggle-grid">
                  {[
                    { label: 'Took Nap', icon: '🛏' },
                    { label: 'Rested Quietly', icon: '🧘' },
                    { label: 'Did Not Sleep', icon: '⚙' },
                  ].map(n => (
                    <button
                      key={n.label}
                      type="button"
                      className={`tac-nap-btn ${napStatus === n.label ? 'tac-nap-btn--active' : ''}`}
                      onClick={() => setNapStatus(n.label)}
                    >
                      <span className="tac-nap-btn-ic">{n.icon}</span>
                      <span>{n.label}</span>
                    </button>
                  ))}
                </div>

                {/* Times Row */}
                <div className="tac-nap-times-grid">
                  <div className="tac-time-box">
                    <span className="tac-time-box__lbl">Nap Start Time</span>
                    <div className="tac-time-box__val">12:45 PM</div>
                  </div>
                  <div className="tac-time-box">
                    <span className="tac-time-box__lbl">Nap End Time</span>
                    <div className="tac-time-box__val">02:15 PM</div>
                  </div>
                  <div className="tac-time-box">
                    <span className="tac-time-box__lbl">Calculated Duration</span>
                    <div className="tac-time-box__badge">1 hr 30 mins</div>
                  </div>
                </div>

                {/* Rest Observations */}
                <div className="tac-sub-section">
                  <h4 className="tac-sub-heading">Rest Observations</h4>
                  <div className="tac-note-display">
                    Fell asleep gently after soft storytime hums. Woke up cheerful and refreshed.
                  </div>
                </div>
              </div>

            </div>

            {/* ══════════════════════════════════════
                RIGHT COLUMN
            ══════════════════════════════════════ */}
            <div className="tac-col">
              
              {/* Mood & Wellbeing Card */}
              <div className="tac-card">
                <div className="tac-card__head">
                  <div className="tac-card__title-group">
                    <div className="tac-card__icon tac-card__icon--peach">
                      <Smile size={18} />
                    </div>
                    <div>
                      <h3 className="tac-card__title">Mood &amp; Wellbeing</h3>
                      <p className="tac-card__sub">Child's overall disposition throughout the nursery session</p>
                    </div>
                  </div>
                  <span className="tac-badge-hdr tac-badge-hdr--mint">Overall: Excellent</span>
                </div>

                {/* 4 Moods Grid */}
                <div className="tac-moods-grid">
                  {[
                    { label: 'Happy', icon: '😊', sub: 'Cheerful & Smiling' },
                    { label: 'Calm', icon: '🙂', sub: 'Quiet & Content' },
                    { label: 'Tired', icon: '🌙', sub: 'Low Energy' },
                    { label: 'Upset', icon: '😟', sub: 'Needed Comfort' },
                  ].map(m => (
                    <div
                      key={m.label}
                      className={`tac-mood-box ${selectedMood === m.label ? 'tac-mood-box--active' : ''}`}
                      onClick={() => setSelectedMood(m.label)}
                    >
                      {selectedMood === m.label && (
                        <div className="tac-mood-check">
                          <Check size={11} strokeWidth={3} />
                        </div>
                      )}
                      <div className="tac-mood-emoji">{m.icon}</div>
                      <b className="tac-mood-title">{m.label}</b>
                      <small className="tac-mood-desc">{m.sub}</small>
                    </div>
                  ))}
                </div>

                {/* Behavioral Highlights */}
                <div className="tac-sub-section">
                  <h4 className="tac-sub-heading">Behavioral Highlights &amp; Social Milestones</h4>
                  <div className="tac-tags-wrap">
                    {tags.map(t => (
                      <button
                        key={t.id}
                        type="button"
                        className={`tac-tag-btn ${t.active ? 'tac-tag-btn--active' : ''}`}
                        onClick={() => toggleTag(t.id)}
                      >
                        {t.active ? `✓ ${t.label}` : `+ ${t.label}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Learning & Developmental Notes */}
              <div className="tac-card">
                <div className="tac-card__head">
                  <div className="tac-card__title-group">
                    <div className="tac-card__icon tac-card__icon--blue">
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <h3 className="tac-card__title">Learning &amp; Developmental Notes</h3>
                      <p className="tac-card__sub">Milestones and classroom engagement</p>
                    </div>
                  </div>
                  <span className="tac-badge-hdr tac-badge-hdr--mint">Synced: Parent Portal</span>
                </div>

                {/* Curriculum & Learning Activities */}
                <div className="tac-sub-section">
                  <div className="tac-sub-hdr-row">
                    <h4 className="tac-sub-heading">Curriculum &amp; Learning Activities</h4>
                    <span className="tac-tag-category">Montessori Sensory</span>
                  </div>
                  <div className="tac-note-display">
                    Practiced recognizing letters A, B, and C with textured sandpaper cards. Counted 5 wooden acorn blocks independently during math playtime.
                  </div>
                </div>

                {/* Classroom & Outdoor Participation */}
                <div className="tac-sub-section">
                  <div className="tac-sub-hdr-row">
                    <h4 className="tac-sub-heading">Classroom &amp; Outdoor Participation</h4>
                    <span className="tac-tag-category">Art &amp; Nature</span>
                  </div>
                  <div className="tac-note-display">
                    Participated enthusiastically in group coloring and outdoor autumn leaf rubbing activity with classmates in the garden play yard.
                  </div>
                </div>

                {/* Lead Teacher's Observation */}
                <div className="tac-sub-section">
                  <div className="tac-sub-hdr-row">
                    <h4 className="tac-sub-heading">Lead Teacher's Observation</h4>
                    <span className="tac-tag-category">Ms. Claire Bennett</span>
                  </div>
                  <div className="tac-note-display">
                    {currentStudent.name.split(' ')[0]} showed great empathy today by helping Leo share sensory clay. Attentive during circle time story and smiled brightly during cleanup song.
                  </div>
                </div>

              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
