import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutGrid, Users, Baby, School, Inbox, CalendarCheck, Palette, CreditCard,
  Bell, Calendar, UserPlus, Smile, UserCheck, ClipboardList, Heart, Grid2x2,
  Lock, Activity, Building2, ChevronDown, LogOut, ArrowRight, ChevronRight,
  Zap, BarChart3, Cloud, Info
} from 'lucide-react';
import { Logo } from './Login.jsx';
import api from './api.js';

export default function Dashboard({ empty }) {
  const nav = useNavigate();
  const [totalChildren, setTotalChildren] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!api.isAuthenticated()) {
      nav('/login');
      return;
    }

    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const [children, users] = await Promise.all([
          api.getChildren().catch(() => []),
          api.getUsers().catch(() => [])
        ]);
        setTotalChildren(children?.length || 0);
        setTotalUsers(users?.length || 0);
        setActiveUsers(users?.filter(u => u.isActive !== false)?.length || 0);
      } catch (err) {
        console.error('Failed to load metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [nav]);

  const handleLogout = () => {
    api.logout();
    nav('/login');
  };

  const pend = empty ? 0 : 5;
  const planned = [
    [School, 'Classes & Staff'],
    [Inbox, 'Admission Requests', 1],
    [CalendarCheck, 'Attendance'],
    [Palette, 'Daily Activities'],
    [CreditCard, 'Fees & Payments'],
    [Bell, 'Announcements']
  ];

  const stats = [
    ['Total Children', totalChildren, Smile, '#dbeafe', '#2563eb', 'Enrolled across all rooms', '#2563eb'],
    ['Total Users', totalUsers, Users, '#dcfce7', '#16a34a', 'Teachers & Parent accounts', '#16a34a'],
    ['Active Users', activeUsers, UserCheck, '#fef3c7', '#d97706', 'Active status credentials', '#d97706'],
    ['Pending Admissions', pend, ClipboardList, '#fce7f3', '#e11d48', pend ? 'Requires administrative review' : 'No pending reviews', '#e11d48']
  ];

  const acts = [
    [UserPlus, '#dcfce7', '#16a34a', 'Teacher account created: Primary Lead Educator', 'By Admin — System verified', 'Just now'],
    [Baby, '#ffedd5', '#ea580c', 'New child record enrolled into nursery', 'By Admin — Health profile documented', '2 hours ago']
  ];

  const Q = [
    [Users, 'Manage Users', 'Create, view, edit, and manage teacher and parent accounts.', 'Sprint 1 Ready', 'Open Users', '#dbeafe', '#2563eb', '/user-management'],
    [Heart, 'Manage Children', "View and maintain children's enrollment and classroom records.", 'Sprint 3 Ready', 'Open Children', '#dcfce7', '#16a34a', '/children-management'],
    [Inbox, 'Review Admissions', 'Review incoming admission requests and guardian submissions.', 'Planned Module', 'Review', '#fce7f3', '#e11d48', null],
    [Grid2x2, 'Manage Classes', 'Organize room capacities and assign designated teachers.', 'Planned Module', 'Setup', '#ffedd5', '#ea580c', null]
  ];

  return (
    <div className="dash">
      <aside>
        <div className="sb-top"><Logo small /></div>
        <div className="sec-t">CORE MODULES</div>
        <Link className="nav on" to="/dashboard"><LayoutGrid size={15} />Dashboard<i className="dot" /></Link>
        <Link className="nav" to="/user-management"><Users size={15} />User Management</Link>
        <Link className="nav" to="/children-management"><Baby size={15} />Children Management</Link>
        <div className="sec-t">PLANNED MODULES</div>
        {planned.map(([I, t, h]) => (
          <a className="nav mut2" key={t}><I size={15} />{t}<span className={'soon' + (h ? ' h' : '')}>Soon</span></a>
        ))}
        <div className="sb-bot">
          <span className="av">AD</span>
          <div><b>Admin</b><small>Administrator</small></div>
          <LogOut size={14} onClick={handleLogout} style={{ marginLeft: 'auto', cursor: 'pointer' }} title="Logout" />
        </div>
      </aside>

      <div className="mainc">
        <header>
          <div className="mut"><span>Home</span> / <span className="chip b">Dashboard</span></div>
          <div className="hr">
            <span className="pill"><Calendar size={12} /> Academic Year 2026/2027</span>
            <span className="pill"><Bell size={12} color="#d97706" /></span>
            <span className="pill u"><span className="av y">TJ</span><div><b>Admin</b><small>Live Connected</small></div><ChevronDown size={12} /></span>
          </div>
        </header>

        <div className="body">
          <div className="hero">
            <div>
              <h2>Welcome back, Admin! 👋</h2>
              <p>Everything you need to manage your nursery, your team, and your little learners in one serene workspace.</p>
            </div>
            <div className="hbt">
              <Link className="btn sm" to="/user-management" state={{ openModal: true }}><UserPlus size={13} /> + Add New User</Link>
              <Link className="btn w sm" to="/children-management" state={{ openModal: true }}><Smile size={13} color="#d97706" /> + Add Child</Link>
            </div>
          </div>

          <h4 className="sh">
            <BarChart3 size={13} /> OVERVIEW METRICS
            <span>Live database values from localhost:5000</span>
          </h4>
          <div className="g4">
            {stats.map(([t, v, I, bg, c, s, sc]) => (
              <div className="card st" key={t}>
                <span className="ic r" style={{ background: bg }}><I size={15} color={c} /></span>
                <small>{t}</small>
                <div className="big">{loading ? '...' : v}</div>
                <p style={{ color: sc }}>• {s}</p>
              </div>
            ))}
          </div>

          <h4 className="sh"><Zap size={13} color="#d97706" /> QUICK ACTIONS</h4>
          <div className="g4">
            {Q.map(([I, t, d, tag, cta, bg, c, path]) => (
              <div
                className="card qa"
                key={t}
                style={{ cursor: path ? 'pointer' : 'default' }}
                onClick={() => path && nav(path)}
              >
                <span className="ic" style={{ background: bg }}><I size={15} color={c} /></span>
                <b>{t}</b>
                <p>{d}</p>
                <div className="qf">
                  <span className={'tag' + (tag.startsWith('Sprint') ? ' g' : '')}>{tag}</span>
                  <span className="cta">{cta} {tag.startsWith('Sprint') ? <ArrowRight size={11} /> : <Lock size={11} />}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="g2">
            <div className="card ra">
              <div className="rh">
                <div>
                  <b><Activity size={13} /> RECENT ACTIVITY</b>
                  <small>System audit log and activity feed</small>
                </div>
                <span className="chip b">Live Log</span>
              </div>
              {empty ? (
                <div className="empty">
                  <div className="ec"><Cloud size={40} color="#f4c76e" /></div>
                  <b>No Recent Activity Yet</b>
                  <p>New updates and actions will appear here as your nursery activity grows.</p>
                </div>
              ) : (
                acts.map(([I, bg, c, t, s, ago]) => (
                  <div className="act" key={t}>
                    <span className="ic s" style={{ background: bg }}><I size={13} color={c} /></span>
                    <div><b>{t}</b><small>{s}</small></div>
                    <em>{ago}</em>
                  </div>
                ))
              )}
              <div className="rf">
                <small>Audit compliance standard: FERPA &amp; Safeguarding</small>
                <a>View Full Log <ArrowRight size={11} /></a>
              </div>
            </div>

            <div className="card ra">
              <div className="rh"><b><Building2 size={13} /> NURSERY OVERVIEW</b></div>
              <small>Shortcuts to core operational databases</small>
              {[[Baby, 'Children Management', 'Rosters & child health notes', `${totalChildren} Enrolled`, 'Classrooms active: 3', 'View Directory', '#dbeafe', '#2563eb', '#eff6ff', '/children-management'],
                [Users, 'Team Management', 'Staff, teachers & parents', `${totalUsers} Users`, 'Educators & Parents', 'Manage Team', '#dcfce7', '#16a34a', '#f0fdf4', '/user-management'],
                [ClipboardList, pend ? 'Admissions' : 'No Pending Requests', pend ? 'Parent intake applications' : 'There are no admission requests', pend ? '5 Pending' : '0 Pending', pend ? 'Queue status: Open' : 'All caught up', 'View Queue', '#fee2e2', '#e11d48', '#fff1f2', null]
              ].map(([I, t, d, b, f, l, bg, c, cb, path]) => (
                <div className="ov" key={t} style={{ background: cb, cursor: path ? 'pointer' : 'default' }} onClick={() => path && nav(path)}>
                  <div className="ovt">
                    <span className="ic s" style={{ background: bg }}><I size={13} color={c} /></span>
                    <div><b>{t}</b><small>{d}</small></div>
                    <span className="chip" style={{ background: bg, color: c }}>{b}</span>
                  </div>
                  <div className="ovf">
                    <small>{f}</small>
                    <a style={{ color: c }}>{l} <ChevronRight size={10} /></a>
                  </div>
                </div>
              ))}
              <small className="info"><Info size={11} /> Metrics correspond to live registered database IDs in PostgreSQL.</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
