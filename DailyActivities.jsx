import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, User, LogOut, ChevronRight, RefreshCw,
  ChevronLeft, ChevronRight as ChevronRightIcon, Calendar,
  Utensils, Moon, PenLine, BookOpen, BarChart2, Image,
  Smile, Shield, Info, FileText
} from 'lucide-react';
import './DailyActivities.css';

/* ══════════════════════════════════════
   NAVBAR
══════════════════════════════════════ */
function Navbar() {
  const nav = useNavigate();
  const links = [
    { label: 'Home',             href: '/' },
    { label: 'My Child',         href: '#' },
    { label: 'Attendance',       href: '/parent-attendance' },
    { label: 'Daily Activities', href: '/daily-activities', active: true },
  ];
  return (
    <nav className="da-nav">
      <div className="da-nav__inner">
        <div className="da-nav__logo" onClick={() => nav('/')}>
          <div className="da-nav__logo-img">
            <div className="da-nav__logo-photo" />
          </div>
          <div className="da-nav__brand">
            <b>Tom &amp; Jerry Nursery</b>
            <small>NURSERY MANAGEMENT</small>
          </div>
          <div className="da-nav__logo-sep" />
          <span className="da-nav__logo-name">Tom &amp; Jerry</span>
        </div>
        <ul className="da-nav__links">
          {links.map(l => (
            <li key={l.label}>
              <a
                href={l.href}
                className={`da-nav__link${l.active ? ' da-nav__link--active' : ''}`}
                onClick={e => { if (l.href.startsWith('/')) { e.preventDefault(); nav(l.href); } }}
              >{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="da-nav__right">
          <div className="da-nav__user">
            <div className="da-nav__avatar"><User size={14} /></div>
            <div className="da-nav__userinfo">
              <b>Mariam Mansoor</b>
              <small>Parent Portal</small>
            </div>
          </div>
          <button className="da-nav__logout" onClick={() => nav('/parent-login')}>
            <LogOut size={13} /> Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════
   TOP BAR
══════════════════════════════════════ */
function TopBar() {
  return (
    <div className="da-topbar">
      <div className="da-topbar__inner">
        <div className="da-breadcrumb">
          <span>Home</span><ChevronRight size={12} />
          <span>My Child</span><ChevronRight size={12} />
          <span className="da-bc--active">Attendance</span>
        </div>
        <div className="da-topbar__right">
          <span className="da-status-dot" />
          <span className="da-status-txt">System Active · Real-time Attendance Sync</span>
          <button className="da-refresh-btn"><RefreshCw size={12} /> Refresh Data</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   CHILD CARD
══════════════════════════════════════ */
function ChildCard() {
  return (
    <div className="da-child-card">
      <div className="da-child-card__left">
        <div className="da-child-photo" />
        <div className="da-child-info">
          <div className="da-child-name-row">
            <span className="da-child-name">Adam Ahmed</span>
            <span className="da-badge da-badge--green-dot">● Butterflies Cohort · Enrolled · Active</span>
          </div>
          <div className="da-child-meta">
            <span>🏫 Toddlers Room 2</span>
            <span className="da-sep">·</span>
            <span>🗓 Age: 18 months</span>
            <span className="da-sep">·</span>
            <span>📋 Spring 2027</span>
            <span className="da-sep">·</span>
            <span>Child Profile #TJ-2026-449</span>
          </div>
        </div>
      </div>
      <div className="da-child-card__right">
        <div className="da-keyworkers">
          <div className="da-keyworkers__label">ASSIGNED KEY WORKERS</div>
          <div className="da-keyworkers__row">
            <div>
              <div className="da-keyworkers__name">Ms. Claire Bennett &amp; Sarah Jenkins</div>
            </div>
            <div className="da-keyworkers__avatars">
              <div className="da-kw-avatar da-kw-avatar--cb">CB</div>
              <div className="da-kw-avatar da-kw-avatar--sj">SJ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   PAGE HEADER + DATE NAV
══════════════════════════════════════ */
function PageHeader({ date, onPrev, onNext, onToday }) {
  return (
    <div className="da-page-hdr">
      <div>
        <div className="da-page-label">📅 Real-time Child Diary</div>
        <h1 className="da-page-title">Daily Activities</h1>
        <p className="da-page-desc">
          See how Adam spends his day at Tom &amp; Jerry Nursery. All logs are securely recorded
          in real time by the Butterflies Room care team.
        </p>
      </div>
      <div className="da-date-nav">
        <button className="da-date-nav__arrow" onClick={onPrev}><ChevronLeft size={16} /></button>
        <div className="da-date-nav__date"><Calendar size={14} /> {date}</div>
        <button className="da-date-nav__arrow" onClick={onNext}><ChevronRightIcon size={16} /></button>
        <button className="da-date-nav__today" onClick={onToday}>Today</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   DAY AT A GLANCE BANNER
══════════════════════════════════════ */
function GlanceBanner() {
  return (
    <div className="da-glance">
      <div className="da-glance__left">
        <div className="da-glance__icon-wrap">
          <span className="da-glance__icon">🏃</span>
        </div>
        <div>
          <div className="da-glance__label">DAY AT A GLANCE</div>
          <p className="da-glance__quote">
            "Adam had a wonderful day full of sensory play, autumn leaf discoveries, and joyful outdoor exploration in the garden!"
          </p>
        </div>
      </div>
      <div className="da-glance__right">
        <span className="da-glance__dot" />
        Full Attendance: Checked In 08:15 AM · Pick-up Scheduled 05:00 PM
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   FOOD & MEALS
══════════════════════════════════════ */
function FoodMeals() {
  const meals = [
    { name: 'Breakfast',       time: '08:45 AM', desc: 'Warm oatmeal with banana slices & whole organic milk',          portion: 'All eaten (100%)',   cls: 'green' },
    { name: 'Morning Snack',   time: '10:30 AM', desc: 'Crisp honeycrisp apple slices & whole grain oat crackers',       portion: 'Most eaten (80%)',   cls: 'green' },
    { name: 'Warm Lunch',      time: '12:15 PM', desc: 'Steamed sweet potato mash, grilled chicken strips & baby sweet peas', portion: 'All eaten (100%)', cls: 'green' },
    { name: 'Afternoon Snack', time: '03:15 PM', desc: 'Creamy Greek yogurt topped with gently crushed wild blueberries', portion: 'Finished portion',  cls: 'green' },
  ];
  return (
    <div className="da-section">
      <div className="da-section__head">
        <div className="da-section__title-row">
          <Utensils size={18} className="da-section__icon" />
          <div>
            <div className="da-section__title">Food &amp; Meals</div>
            <div className="da-section__sub">Daily balanced nutrition &amp; hydration tracker</div>
          </div>
        </div>
        <span className="da-badge da-badge--green-check">✓ All 4 Meals Logged</span>
      </div>
      <div className="da-meals-grid">
        {meals.map(m => (
          <div className="da-meal-card" key={m.name}>
            <div className="da-meal-card__top">
              <span className="da-meal-card__dot" />
              <span className="da-meal-card__name">{m.name}</span>
              <span className="da-meal-card__time">{m.time}</span>
            </div>
            <div className="da-meal-card__desc">{m.desc}</div>
            <div className="da-meal-card__foot">
              <span className="da-meal-card__portion-lbl">Portion consumed</span>
              <span className={`da-badge da-badge--${m.cls}-sm`}>✓ {m.portion}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="da-hydration">
        <span className="da-hydration__icon">💧</span>
        <div>
          <div className="da-hydration__title">Hydration &amp; Dietary Wellness</div>
          <p className="da-hydration__text">
            Adam drank 2 full cups (360ml) of filtered nursery water throughout the morning. No signs of allergies or food
            reluctance; he happily requested second helpings of sweet potato.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SLEEP & REST
══════════════════════════════════════ */
function SleepRest() {
  return (
    <div className="da-section">
      <div className="da-section__head">
        <div className="da-section__title-row">
          <Moon size={18} className="da-section__icon" />
          <div>
            <div className="da-section__title">Sleep &amp; Rest</div>
            <div className="da-section__sub">Quiet nursery afternoon cot rest</div>
          </div>
        </div>
        <span className="da-badge da-badge--gray-timer">⏱ Total Nap: 1h 45m</span>
      </div>

      <div className="da-sleep-times">
        <div className="da-sleep-time-item">
          <span className="da-sleep-time-lbl">⏰ Crib Settled:</span>
          <strong>12:45 PM</strong>
        </div>
        <div className="da-sleep-time-item">
          <span className="da-sleep-time-lbl">☀ Wake-up Time:</span>
          <strong>02:30 PM</strong>
        </div>
      </div>

      <div className="da-sleep-bar-wrap">
        <div className="da-sleep-bar">
          <div className="da-sleep-bar__fill" style={{ width: '100%' }} />
        </div>
        <div className="da-sleep-bar-labels">
          <span>Room 2 Cot #04 (Quiet Bay)</span>
          <span>105 Minutes Uninterrupted</span>
        </div>
      </div>

      <div className="da-sleep-notes">
        <div className="da-sleep-note">
          <div className="da-sleep-note__title">🎵 Sleep Atmosphere</div>
          <p>Soft lullaby white noise played. Adam settled down easily within 10 minutes with his soft organic nursery rabbit blanket.</p>
        </div>
        <div className="da-sleep-note">
          <div className="da-sleep-note__title">😊 Wake-up Demeanor</div>
          <p>Woke up naturally at 02:30 PM, cheerful, well-hydrated, and eager to join the afternoon bubble play outdoors.</p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   TEACHER'S NOTES
══════════════════════════════════════ */
function TeacherNotes() {
  const milestones = [
    { label: 'Fine Motor: Pincer Leaf Grasp', cls: 'green' },
    { label: 'Self-Care: Handwashing Routine', cls: 'peach' },
    { label: 'Language: "Leaf", "Yellow"', cls: 'blue' },
  ];
  return (
    <div className="da-section">
      <div className="da-section__head">
        <div className="da-section__title-row">
          <PenLine size={18} className="da-section__icon" />
          <div>
            <div className="da-section__title">Teacher's Notes</div>
            <div className="da-section__sub">Classroom observations &amp; early developmental milestones</div>
          </div>
        </div>
        <span className="da-badge da-badge--green-check"><Shield size={11} /> Verified Educator Log</span>
      </div>

      <div className="da-teacher-meta">
        <div className="da-teacher-avatar">CB</div>
        <div className="da-teacher-info">
          <div className="da-teacher-name">Ms. Claire Bennett</div>
          <div className="da-teacher-role">Butterflies Room 2 Lead Educator · Early Years Foundation Certified</div>
        </div>
        <div className="da-teacher-logged">Logged 03:45 PM</div>
      </div>

      <div className="da-teacher-quote">
        <p>"Adam was wonderfully energetic during our autumn leaf-sorting sensory session today. He excitedly
        identified colors (pointing accurately to red and yellow leaves) and loved outdoor sand play after lunch. He
        also practiced washing his hands independently at our toddler low-sink before afternoon snack!"</p>
        <div className="da-teacher-reminder">
          <span className="da-reminder-icon">🔔</span>
          <span><strong>Parent Reminder:</strong> Please remember to pack an extra pair of warm outdoor socks in Adam's cubby for Monday.</span>
        </div>
      </div>

      <div className="da-milestones">
        <span className="da-milestones__label">Milestones Spotted:</span>
        {milestones.map(m => (
          <span key={m.label} className={`da-milestone da-milestone--${m.cls}`}>{m.label}</span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MOOD & FEELINGS (right col)
══════════════════════════════════════ */
function MoodFeelings() {
  const moods = [
    { emoji: '😊', label: 'Happy',  sub: 'Active Today',   active: true  },
    { emoji: '🙂', label: 'Calm',   sub: 'Midday Rest',    active: false },
    { emoji: '😴', label: 'Tired',  sub: 'Inactive',       active: false },
    { emoji: '😟', label: 'Upset',  sub: 'None Observed',  active: false },
  ];
  return (
    <div className="da-side-card">
      <div className="da-side-card__head">
        <Smile size={18} className="da-section__icon" />
        <div>
          <div className="da-section__title">Mood &amp; Feelings</div>
          <div className="da-section__sub">Social &amp; emotional check-in</div>
        </div>
      </div>
      <div className="da-mood-grid">
        {moods.map(m => (
          <div key={m.label} className={`da-mood-item${m.active ? ' da-mood-item--active' : ''}`}>
            <span className="da-mood-emoji">{m.emoji}</span>
            <span className="da-mood-label">{m.label}</span>
            <span className="da-mood-sub">{m.sub}</span>
          </div>
        ))}
      </div>
      <div className="da-social">
        <div className="da-social__label">SOCIAL ENGAGEMENT</div>
        <p>Shared wooden sensory stacking blocks with Leo and participated enthusiastically in the morning finger-painting song circle.</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   ACTIVITY TIMELINE (right col)
══════════════════════════════════════ */
function ActivityTimeline() {
  const items = [
    { time: '09:30 AM', tag: 'Sensory Play',    tagCls: 'green',  title: 'Sensory Leaf Play & Colors',               desc: 'Explored autumn leaves, dry pinecones, and color sorting bins in the courtyard veranda.' },
    { time: '11:00 AM', tag: 'Literacy Circle', tagCls: 'blue',   title: "Story Circle: 'The Very Hungry Caterpillar'", desc: 'Interactive flannel-board storytelling with educator puppet cues, pointed to apple and butterfly.' },
    { time: '02:45 PM', tag: 'Gross Motor',     tagCls: 'orange', title: 'Outdoor Playground & Bubble Catching',      desc: 'Chased giant soap bubbles across the soft lawn and practiced balance on the rubber stepping stones.' },
  ];
  return (
    <div className="da-side-card">
      <div className="da-side-card__head">
        <BarChart2 size={18} className="da-section__icon" />
        <div>
          <div className="da-section__title">Activity Timeline</div>
          <div className="da-section__sub">Key curriculum sessions</div>
        </div>
      </div>
      <div className="da-timeline">
        {items.map((item, i) => (
          <div className="da-timeline-item" key={i}>
            <div className="da-timeline-dot" />
            <div className="da-timeline-body">
              <div className="da-timeline-top">
                <span className="da-timeline-time">{item.time}</span>
                <span className={`da-timeline-tag da-timeline-tag--${item.tagCls}`}>{item.tag}</span>
              </div>
              <div className="da-timeline-title">{item.title}</div>
              <div className="da-timeline-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   TODAY'S MOMENTS (right col)
══════════════════════════════════════ */
function TodaysMoments() {
  return (
    <div className="da-side-card">
      <div className="da-side-card__head">
        <Image size={18} className="da-section__icon" />
        <div>
          <div className="da-section__title">Today's Moments</div>
          <div className="da-section__sub">2 New Photos</div>
        </div>
        <span className="da-badge da-badge--gray-sm" style={{marginLeft:'auto'}}>2 New Photos</span>
      </div>
      <div className="da-photos">
        <div className="da-photo">
          <div className="da-photo__img da-photo__img--warm" />
          <span className="da-photo__time">09:42 AM</span>
        </div>
        <div className="da-photo">
          <div className="da-photo__img da-photo__img--green" />
          <span className="da-photo__time">02:50 PM</span>
        </div>
      </div>
      <p className="da-photos__caption">Photos taken by verified Room 2 educators for Adam's digital portfolio.</p>
    </div>
  );
}

/* ══════════════════════════════════════
   PAST RECORDS BANNER (full width)
══════════════════════════════════════ */
function PastRecordsBanner() {
  return (
    <div className="da-past-banner">
      <div className="da-past-banner__left">
        <Info size={16} className="da-past-banner__icon" />
        <div>
          <div className="da-past-banner__title">Browsing Past Nursery Records?</div>
          <p>If a selected day has no entries: "No daily activities have been recorded for this day yet. Check-ins and logs appear in real-time as educators record milestones."</p>
        </div>
      </div>
      <button className="da-past-banner__btn"><FileText size={13} /> View Month Summary</button>
    </div>
  );
}

/* ══════════════════════════════════════
   FOOTER
══════════════════════════════════════ */
function Footer() {
  return (
    <footer className="da-footer">
      <div className="da-footer__inner">
        <div>
          <div className="da-footer__copy">© 2024 Tom &amp; Jerry Nursery. Warm care &amp; mindful learning.</div>
          <div className="da-footer__sub">Licensed Early Childhood Development &amp; Daycare Center.</div>
        </div>
        <div className="da-footer__links">
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
export default function DailyActivities() {
  const [date, setDate] = useState('Today, Friday, Oct 24, 2026');

  return (
    <div className="da-root">
      <Navbar />
      <TopBar />

      <main className="da-main">
        <ChildCard />

        <PageHeader
          date={date}
          onPrev={() => {}}
          onNext={() => {}}
          onToday={() => setDate('Today, Friday, Oct 24, 2026')}
        />

        <GlanceBanner />

        {/* Two-column layout */}
        <div className="da-cols">
          {/* Left */}
          <div className="da-col-left">
            <FoodMeals />
            <SleepRest />
            <TeacherNotes />
          </div>
          {/* Right */}
          <div className="da-col-right">
            <MoodFeelings />
            <ActivityTimeline />
            <TodaysMoments />
          </div>
        </div>

        <PastRecordsBanner />
      </main>

      <Footer />
    </div>
  );
}
