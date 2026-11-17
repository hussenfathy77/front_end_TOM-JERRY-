import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart, Shield, Leaf, Sun, Palette, BookOpen,
  Phone, Mail, MapPin, Menu, X, ArrowRight,
  Sparkles, Users, TreePine, Moon, Flower2, Clock, Check,
  User
} from 'lucide-react';
import './LandingPage.css';

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

  return (
    <>
      <nav className={`lp-nav${scrolled ? ' lp-nav--shadow' : ''}`}>
        <div className="lp-nav__inner">
          {/* Logo */}
          <div className="lp-nav__logo">
            <div className="lp-logo-icon">
              <Sparkles size={13} color="#34445c" />
            </div>
            <div className="lp-logo-text">
              <b>Tom &amp; Jerry</b>
              <small>NURSERY MANAGEMENT</small>
            </div>
            <div className="lp-logo-sep" />
            <span className="lp-logo-name">Tom &amp; Jerry Nursery</span>
          </div>

          {/* Nav links */}
          <ul className={`lp-nav__links${open ? ' open' : ''}`}>
            <li><a href="#" className="lp-navlink lp-navlink--active" onClick={() => setOpen(false)}>Home</a></li>
            <li><a href="#about" className="lp-navlink" onClick={() => setOpen(false)}>About Us</a></li>
            <li><a href="#spaces" className="lp-navlink" onClick={() => setOpen(false)}>Our Environment</a></li>
            <li><a href="#contact" className="lp-navlink" onClick={() => setOpen(false)}>Contact</a></li>
          </ul>

          {/* Actions */}
          <div className="lp-nav__actions">
            <button className="lp-nav__login" onClick={() => nav('/parent-login')}>Parent Login</button>
            <button
              className="lp-nav__login"
              style={{ background: '#eaf8ef', color: '#15803d', borderColor: '#c2ebd0' }}
              onClick={() => nav('/teacher-login')}
            >
              Teacher Portal
            </button>
            <button
              className="lp-nav__avatar"
              title="Admin Portal"
              onClick={() => nav('/login')}
              style={{ cursor: 'pointer' }}
            >
              <User size={15} />
            </button>
            <button className="lp-nav__burger" onClick={() => setOpen(!open)}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Announcement bar */}
      <div className="lp-announce">
        <div className="lp-announce__inner">
          <span className="lp-announce__left">
            <span className="lp-ann-dot" />
            Now welcoming admission requests for upcoming toddler and preschool intakes
          </span>
          <span className="lp-announce__right">
            <Clock size={12} />
            Mon – Fri, 7:30 AM – 6:00 PM
            <span className="lp-ann-sep">·</span>
            <MapPin size={12} />
            Meadowville Campus
          </span>
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════
   HERO CARD (right side illustration)
══════════════════════════════════════ */
function HeroCard() {
  const [active, setActive] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % 3), 2400);
    return () => clearInterval(t);
  }, []);

  const blocks = [
    { label: 'A', sub: 'PLAY',    bg: '#b8ddf2', tc: '#1a5a8a' },
    { label: 'B', sub: 'EXPLORE', bg: '#fde68a', tc: '#7a4f00' },
    { label: 'C', sub: 'GROW',    bg: '#f9a8d4', tc: '#8a1a45' },
  ];

  return (
    <div className="lp-hcard">
      {/* Header */}
      <div className="lp-hcard__hdr">
        <div className="lp-hcard__logo-icon"><Sparkles size={11} color="#34445c" /></div>
        <div>
          <b className="lp-hcard__logo-b">Tom &amp; Jerry</b>
          <small className="lp-hcard__logo-sm">NURSERY MANAGEMENT</small>
        </div>
      </div>

      {/* A B C blocks */}
      <div className="lp-hcard__blocks">
        {blocks.map((b, i) => (
          <div
            key={b.label}
            className={`lp-hcard__block${active === i ? ' active' : ''}`}
            style={{ background: b.bg }}
          >
            <span className="lp-hcard__bletter" style={{ color: b.tc }}>{b.label}</span>
            <span className="lp-hcard__bsub" style={{ color: b.tc }}>{b.sub}</span>
          </div>
        ))}
      </div>

      {/* Footer badges */}
      <div className="lp-hcard__foot">
        <div className="lp-hcard__garden">
          <Leaf size={11} color="#16a34a" />
          Safe Garden Grounds
        </div>
        <div className="lp-hcard__secure">
          <div className="lp-hcard__sec-icon"><Shield size={12} color="#2563eb" /></div>
          <div>
            <b>Secure &amp; Nurturing</b>
            <small>Calm daily rhythms</small>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   HERO SECTION
══════════════════════════════════════ */
function Hero() {
  const mini = [
    { l: 'A', bg: '#b8ddf2' },
    { l: 'B', bg: '#fde68a' },
    { l: 'C', bg: '#f9a8d4' },
  ];

  return (
    <section className="lp-hero">
      <div className="lp-hero__inner">

        {/* ── Left ── */}
        <div className="lp-hero__left">
          <div className="lp-hero__badge">
            <Leaf size={13} color="#2c5f3e" />
            Gentle Early Learning &amp; Childcare
          </div>

          <h1 className="lp-hero__title">
            Welcome to <span>Tom &amp; Jerry</span> Nursery
          </h1>

          <p className="lp-hero__desc">
            A happy, caring, and supportive environment where little learners can
            play, explore, and grow with confidence, safety, and joy every single day.
          </p>

          <div className="lp-hero__btns">
            <button className="lp-btn-primary">
              Apply for Admission <ArrowRight size={14} />
            </button>
            <button className="lp-btn-ghost">
              <Check size={13} /> Discover Our Nursery
            </button>
          </div>

          {/* Ratio card */}
          <div className="lp-hero__ratio">
            <div className="lp-hero__mini">
              {mini.map(b => (
                <div key={b.l} className="lp-mini-blk" style={{ background: b.bg }}>{b.l}</div>
              ))}
            </div>
            <div>
              <b className="lp-hero__ratio-title">Caring educator ratio 1:3 &amp; 1:4</b>
              <small className="lp-hero__ratio-sub">Small cohorts, attentive nurturing, and calm daily rhythms</small>
            </div>
          </div>
        </div>

        {/* ── Right ── */}
        <div className="lp-hero__right">
          <HeroCard />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   ABOUT SECTION
══════════════════════════════════════ */
function About() {
  const cards = [
    {
      Icon: Heart, ibg: '#fee2e2', ic: '#e11d48',
      title: 'Warm Care',
      desc: "Every child is greeted with open arms and a reassuring smile. Attentive educators tune into each toddler's emotional tempo and individual comfort.",
      bullet: 'Consistent caregiver bonds',
    },
    {
      Icon: BookOpen, ibg: '#fef3c7', ic: '#d97706',
      title: 'Early Discovery',
      desc: 'Playful exploration is the heart of our curriculum. Through sensory textures, singing, picture books, and tactile construction, learning unfolds naturally.',
      bullet: 'Play-driven curiosity',
    },
    {
      Icon: Users, ibg: '#dbeafe', ic: '#2563eb',
      title: 'Safe Community',
      desc: 'Our campus maintains secure access and wholesome hygiene routines, partnering hand-in-hand with parents to ensure peace of mind every single hour.',
      bullet: 'Protected, family-first environment',
    },
  ];

  return (
    <section className="lp-about" id="about">
      <div className="lp-container">

        {/* Two-col header */}
        <div className="lp-about__hdr">
          <div>
            <div className="lp-badge-green"><Heart size={12} color="#2c5f3e" /> About Our Nursery</div>
            <h2 className="lp-sec-title">A Little Place for Big Dreams</h2>
          </div>
          <p className="lp-about__hdr-desc">
            At Tom &amp; Jerry Nursery, our warm early-learning spaces are purposefully
            created to support curiosity, natural play, gentle social discovery, and
            continuous emotional security.
          </p>
        </div>

        {/* Cards */}
        <div className="lp-about__cards">
          {cards.map(({ Icon, ibg, ic, title, desc, bullet }) => (
            <div className="lp-about__card" key={title}>
              <div className="lp-about__icon" style={{ background: ibg }}>
                <Icon size={20} color={ic} />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="lp-about__bullet">
                <Check size={13} color="#2c5f3e" /> {bullet}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   PRINCIPLES SECTION
══════════════════════════════════════ */
function Principles() {
  const cards = [
    {
      Icon: Leaf, ibg: '#f0fdf4', ic: '#16a34a',
      title: 'Caring Environment',
      desc: 'A nurturing space where every child feels secure, valued, and encouraged by compassionate early educators. We prioritize gentle comfort, unhurried routines, and respectful listening.',
      tags: ['Soft Transitions', 'Gentle Guidance'],
    },
    {
      Icon: BookOpen, ibg: '#eff6ff', ic: '#2563eb',
      title: 'Learning Through Play',
      desc: 'Hands-on sensory activities, story time, and guided play routines that naturally foster curiosity. Toddlers build foundational motor skills, communication, and social empathy effortlessly.',
      tags: ['Sensory Sand & Water', 'Story Circles'],
    },
    {
      Icon: Palette, ibg: '#fdf4ff', ic: '#9333ea',
      title: 'Creativity & Exploration',
      desc: 'Spaces designed for little imaginations to express themselves through art, music, building blocks, and nature discovery. Every tiny idea finds room to bloom and take shape.',
      tags: ['Finger Painting', 'Music & Rhyme'],
    },
  ];

  return (
    <section className="lp-principles">
      <div className="lp-container">
        <div className="lp-principles__hdr">
          <div className="lp-badge-gray">OUR DAILY PRINCIPLES</div>
          <h2 className="lp-sec-title">What Makes Us Special</h2>
          <p className="lp-sec-sub">Carefully balanced routines designed to let little personalities shine and flourish.</p>
        </div>
        <div className="lp-grid3">
          {cards.map(({ Icon, ibg, ic, title, desc, tags }) => (
            <div className="lp-principles__card" key={title}>
              <div className="lp-principles__icon" style={{ background: ibg }}>
                <Icon size={22} color={ic} />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="lp-principles__tags">
                {tags.map(t => <span key={t} className="lp-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   SPACES SECTION
══════════════════════════════════════ */
function Spaces() {
  const spaces = [
    {
      Icon: Sun,     ibg: '#fef9ee', ic: '#d97706',
      watermark: 'pixel_4_4xl_4a_5_5a_5g',
      title: 'Bright Play Studios',
      desc: 'Open, naturally lit spaces filled with child-safe tactile wooden toys, soft carpets, and cozy reading nooks that invite calm, collaborative interaction.',
      feat: 'Non-toxic natural wood materials',
    },
    {
      Icon: Flower2, ibg: '#f0fdf4', ic: '#16a34a',
      watermark: '',
      title: 'Outdoor Garden & Discovery',
      desc: 'Secure green outdoor play spaces for motor skill development, gentle balance beams, herb gardens, and fresh air under supervised care.',
      feat: 'Fenced perimeter & soft turf surfacing',
    },
    {
      Icon: Moon,    ibg: '#fdf4ff', ic: '#9333ea',
      watermark: '',
      title: 'Cozy Rest & Quiet Zones',
      desc: 'Calm, dimmable rooms designed for peaceful afternoon naps, lullabies, gentle transition times, and unhurried re-energizing.',
      feat: 'Individual sleep cots & white noise',
    },
  ];

  return (
    <section className="lp-spaces" id="spaces">
      <div className="lp-container">
        <div className="lp-spaces__hdr">
          <div className="lp-badge-gray">SPACES MADE FOR WONDER</div>
          <h2 className="lp-sec-title">Thoughtfully Designed for Little Explorers</h2>
          <p className="lp-sec-sub">A gentle look into our classrooms, outdoor sensory spaces, and quiet rest corners.</p>
        </div>
        <div className="lp-grid3">
          {spaces.map(({ Icon, ibg, ic, watermark, title, desc, feat }) => (
            <div className="lp-spaces__card" key={title}>
              {/* Image area */}
              <div className="lp-spaces__img" style={{ background: ibg }}>
                <Icon size={46} color={ic} strokeWidth={1.4} />
                {watermark && <span className="lp-spaces__wm">✳{watermark}</span>}
                <div className="lp-spaces__img-row">
                  <BookOpen size={13} color={ic} opacity={0.4} />
                  <Sun size={13} color={ic} opacity={0.4} />
                  <Users size={13} color={ic} opacity={0.4} />
                </div>
              </div>
              {/* Body */}
              <div className="lp-spaces__body">
                <div className="lp-spaces__iwrap" style={{ background: ibg }}>
                  <Icon size={16} color={ic} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="lp-spaces__feat">
                  <span className="lp-spaces__fdot" style={{ background: ic }} />
                  {feat}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   CTA SECTION
══════════════════════════════════════ */
function CTA() {
  return (
    <section className="lp-cta">
      <div className="lp-container">
        <div className="lp-cta__card">
          <div className="lp-cta__heart"><Heart size={22} color="#4a6155" /></div>
          <h2>Ready to Begin Your Child's Journey?</h2>
          <p>
            Take the first step toward joining our nursery community. We welcome families
            with warmth, transparency, and attentive personal care.
          </p>
          <button className="lp-btn-primary lp-cta__btn">
            Apply for Admission <ArrowRight size={15} />
          </button>
          <small className="lp-cta__note">
            Submitting an admission request begins the application process for our upcoming terms.
          </small>
          <div className="lp-cta__badges">
            <span><Shield size={13} /> Registered Care Standard</span>
            <span><TreePine size={13} /> Natural Playgrounds</span>
            <span><Users size={13} /> Open Family Dialogue</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   FOOTER
══════════════════════════════════════ */
function Footer() {
  return (
    <footer className="lp-footer" id="contact">
      <div className="lp-container">
        <div className="lp-footer__inner">
          {/* Brand */}
          <div className="lp-footer__brand">
            <div className="lp-footer__flogo">
              <div className="lp-footer__flogo-ic"><Sparkles size={13} color="#8ab5a0" /></div>
              <div>
                <b>Tom &amp; Jerry</b>
                <small>NURSERY MANAGEMENT</small>
              </div>
              <span>Tom &amp; Jerry Nursery</span>
            </div>
            <p>A serene, warm, and comforting haven where every toddler's curiosity takes flight with gentle care, natural wonder, and joyful early learning.</p>
          </div>

          {/* Quick Nav */}
          <div className="lp-footer__col">
            <h4>QUICK NAVIGATION</h4>
            {['Home', 'About Us', 'Our Environment', 'Contact'].map(l => (
              <a key={l} href="#">{l}</a>
            ))}
          </div>

          {/* Contact */}
          <div className="lp-footer__col">
            <h4>GET IN TOUCH</h4>
            <a href="mailto:admissions@tomjerrynursery.com">
              <Mail size={13} /> admissions@tomjerrynursery.com
            </a>
            <a href="tel:+15552345678">
              <Phone size={13} /> +1 (555) 234-5678
            </a>
            <a href="#">
              <MapPin size={13} /> 124 Blossom Hill Lane, Meadowville
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="lp-footer__bottom">
        <div className="lp-container lp-footer__brow">
          <span>© 2024 Tom &amp; Jerry Nursery. All rights reserved.</span>
          <div>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Care</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════ */
export default function LandingPage() {
  return (
    <div className="lp-root">
      <Navbar />
      <Hero />
      <About />
      <Principles />
      <Spaces />
      <CTA />
      <Footer />
    </div>
  );
}
