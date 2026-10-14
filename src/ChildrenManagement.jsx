import { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Baby, Bell, Calendar, CalendarDays, ChevronDown, ChevronLeft, ChevronRight,
  ClipboardList, CreditCard, Ellipsis, LayoutGrid, LogOut, Pencil, Plus, Search, School,
  CalendarCheck, Activity, UserPlus, Users, X, AlertTriangle, Clock3, RefreshCw, Trash2
} from 'lucide-react';
import { Logo } from './Login.jsx';
import api from './api.js';
import './UserManagement.css';
import './ChildrenManagement.css';

const navigation = [
  [School, 'Classes & Staff'], [ClipboardList, 'Admission Requests'], [CalendarCheck, 'Attendance'],
  [Activity, 'Daily Activities'], [CreditCard, 'Fees & Payments'], [Bell, 'Announcements']
];

const childFormDefaults = { name: '', birth: '2022-03-14', gender: 'Boy', parentId: '', phone: '', notes: '' };

export default function ChildrenManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const [children, setChildren] = useState([]);
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('All');
  const [page, setPage] = useState(1);

  // Add modal
  const [addOpen, setAddOpen] = useState(Boolean(location.state?.openModal));
  const [newChild, setNewChild] = useState(childFormDefaults);
  const [addSubmitting, setAddSubmitting] = useState(false);

  // Edit modal
  const [editChild, setEditChild] = useState(null);
  const [editForm, setEditForm] = useState(childFormDefaults);
  const [editSubmitting, setEditSubmitting] = useState(false);

  // Delete modal
  const [deleteChild, setDeleteChild] = useState(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  const [activeMenu, setActiveMenu] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [childrenData, parentsData] = await Promise.all([api.getChildren(), api.getUsers('PARENT')]);

      const formattedParents = (parentsData || []).map(p => ({ id: p.id, name: p.name, email: p.email }));
      setParents(formattedParents);
      if (formattedParents.length && !newChild.parentId) {
        setNewChild(c => ({ ...c, parentId: formattedParents[0].id }));
      }

      const formatted = (childrenData || []).map(c => {
        const fullName = `${c.firstName || ''} ${c.lastName || ''}`.trim();
        const initials = fullName.split(/\s+/).slice(0, 2).map(p => p[0]).join('').toUpperCase() || 'CH';
        const birthDate = c.dateOfBirth ? new Date(c.dateOfBirth).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Unknown';
        const birthISO = c.dateOfBirth ? new Date(c.dateOfBirth).toISOString().split('T')[0] : '';
        const dateAdded = c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Recent';
        const genderNorm = c.gender?.toUpperCase() === 'GIRL' ? 'Girl' : 'Boy';
        return {
          id: c.id, firstName: c.firstName, lastName: c.lastName, name: fullName,
          room: 'Toddler Room A', birth: birthDate, birthISO, gender: genderNorm,
          guardian: c.parent?.name || 'Unassigned', parentId: c.parentId,
          email: c.parent?.email || 'N/A', phone: '+1 (555) 234-8901',
          date: dateAdded, initials, tone: genderNorm === 'Girl' ? 'pink' : 'blue'
        };
      });
      setChildren(formatted);
    } catch (err) {
      console.error('Failed to load children:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const filteredChildren = useMemo(() => children.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = `${c.name} ${c.guardian} ${c.email}`.toLowerCase().includes(q);
    return matchSearch && (gender === 'All' || c.gender === gender);
  }), [children, search, gender]);

  const visibleChildren = filteredChildren.slice((page - 1) * 6, page * 6);
  const totalPages = Math.max(1, Math.ceil(filteredChildren.length / 6));

  const clearFilters = () => { setSearch(''); setGender('All'); setPage(1); };

  // --- ADD ---
  const handleAdd = async (e) => {
    e.preventDefault();
    const name = newChild.name.trim();
    if (!name || !newChild.birth || !newChild.parentId) { alert('Please fill all required fields.'); return; }
    const parts = name.split(/\s+/);
    try {
      setAddSubmitting(true);
      await api.createChild({ firstName: parts[0], lastName: parts.slice(1).join(' ') || parts[0], dateOfBirth: new Date(newChild.birth).toISOString(), gender: newChild.gender.toUpperCase(), parentId: newChild.parentId });
      setAddOpen(false);
      setNewChild(childFormDefaults);
      await loadData();
    } catch (err) { alert(err.message || 'Failed to create child'); }
    finally { setAddSubmitting(false); }
  };

  // --- EDIT ---
  const openEdit = (child) => {
    setEditChild(child);
    setEditForm({ name: child.name, birth: child.birthISO, gender: child.gender, parentId: child.parentId, phone: child.phone, notes: '' });
    setActiveMenu(null);
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    const name = editForm.name.trim();
    if (!name || !editForm.birth || !editForm.parentId) { alert('Please fill all required fields.'); return; }
    const parts = name.split(/\s+/);
    try {
      setEditSubmitting(true);
      await api.updateChild(editChild.id, { firstName: parts[0], lastName: parts.slice(1).join(' ') || parts[0], dateOfBirth: new Date(editForm.birth).toISOString(), gender: editForm.gender.toUpperCase(), parentId: editForm.parentId });
      setEditChild(null);
      await loadData();
    } catch (err) { alert(err.message || 'Failed to update child'); }
    finally { setEditSubmitting(false); }
  };

  // --- DELETE ---
  const openDelete = (child) => { setDeleteChild(child); setActiveMenu(null); };
  const handleDelete = async () => {
    try {
      setDeleteSubmitting(true);
      await api.deleteChild(deleteChild.id);
      setDeleteChild(null);
      await loadData();
    } catch (err) { alert(err.message || 'Failed to delete child'); }
    finally { setDeleteSubmitting(false); }
  };

  const handleLogout = () => { api.logout(); navigate('/login'); };

  return (
    <div className="um-page cm-page">
      <aside className="um-sidebar">
        <div className="um-brand"><Logo small /></div>
        <div className="um-section-title">CORE MODULES</div>
        <Link className="um-nav" to="/dashboard"><LayoutGrid size={15} />Dashboard</Link>
        <Link className="um-nav" to="/user-management"><Users size={15} />User Management</Link>
        <Link className="um-nav selected" to="/children-management"><Baby size={15} />Children Management</Link>
        <div className="um-section-title">PLANNED MODULES</div>
        {navigation.map(([Icon, label]) => (
          <a className="um-nav muted" key={label}><Icon size={15} />{label}<span className="um-soon">Soon</span></a>
        ))}
        <div className="um-account">
          <span className="um-avatar admin">AD</span>
          <div><b>Admin</b><small>Administrator</small></div>
          <LogOut size={14} onClick={handleLogout} style={{ cursor: 'pointer', marginLeft: 'auto' }} title="Logout" />
        </div>
      </aside>

      <div className="um-content">
        <header className="um-header">
          <div className="um-breadcrumb">
            <Link to="/dashboard">Home</Link><span>/</span><span className="um-crumb-current">Children Management</span>
          </div>
          <div className="um-header-actions">
            <span className="um-date"><Calendar size={12} />Academic Year 2026/2027</span>
            <button className="um-notification" onClick={loadData} title="Refresh" aria-label="Refresh">
              <RefreshCw size={13} className={loading ? 'spin' : ''} />
            </button>
            <button className="um-profile">
              <span className="um-avatar yellow">TJ</span>
              <span><b>Admin</b><small>Connected</small></span>
              <ChevronDown size={12} />
            </button>
          </div>
        </header>

        <main className="um-body cm-body">
          <div className="um-title-row">
            <div><h1>Children Management</h1><p>Manage, edit, and remove children's profiles and records.</p></div>
            <button className="um-add-button" onClick={() => setAddOpen(true)}><Plus size={14} />Add New Child</button>
          </div>

          <section className="um-stats cm-stats">
            <article className="um-stat">
              <div><small>TOTAL CHILDREN</small><strong>{children.length}</strong><p>Active nursery cohort</p></div>
              <span className="um-stat-icon green"><Baby size={19} /></span>
            </article>
            <article className="um-stat">
              <div><small>RECENTLY ENROLLED</small><strong>{children.length}</strong><p>Enrolled pupils</p></div>
              <span className="um-stat-icon amber"><Clock3 size={19} /></span>
            </article>
            <article className="um-stat">
              <div><small>REGISTERED PARENTS</small><strong>{parents.length}</strong><p>Eligible guardians</p></div>
              <span className="um-stat-icon pink"><AlertTriangle size={18} /></span>
            </article>
          </section>

          <section className="um-filters cm-filters">
            <label className="um-search">
              <Search size={14} />
              <input placeholder="Search by child name or parent..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
            </label>
            <label className="um-select-wrap">
              <span>Gender:</span>
              <select value={gender} onChange={e => { setGender(e.target.value); setPage(1); }}>
                <option value="All">All</option><option value="Boy">Boy</option><option value="Girl">Girl</option>
              </select>
              <ChevronDown size={12} />
            </label>
            <button className="um-clear" onClick={clearFilters}><X size={12} />Clear Filters</button>
          </section>

          <section className="um-table-card cm-table-card">
            <div className="um-table-scroll">
              <table className="um-table cm-table">
                <thead>
                  <tr>
                    <th>CHILD</th><th>DATE OF BIRTH</th><th>GENDER</th>
                    <th>PARENT / GUARDIAN</th><th>CONTACT NUMBER</th><th>DATE ADDED</th><th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleChildren.map((child) => (
                    <tr key={child.id}>
                      <td>
                        <div className="um-user-cell">
                          <span className={`um-avatar ${child.tone}`}>{child.initials}</span>
                          <span><b>{child.name}</b><small>{child.room}</small></span>
                        </div>
                      </td>
                      <td>{child.birth}</td>
                      <td><span className={`cm-gender ${child.gender.toLowerCase()}`}>{child.gender}</span></td>
                      <td><span className="cm-guardian"><b>{child.guardian}</b><small>{child.email}</small></span></td>
                      <td className="cm-phone">{child.phone}</td>
                      <td>{child.date}</td>
                      <td className="um-action-cell">
                        <div className="um-actions-inline">
                          <button className="um-btn-edit" title="Edit child" onClick={() => openEdit(child)}><Pencil size={13} /></button>
                          <button className="um-btn-delete" title="Delete child" onClick={() => openDelete(child)}><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!loading && !visibleChildren.length && <tr><td className="um-no-results" colSpan="7">No children found. Click "Add New Child" to enroll one.</td></tr>}
                  {loading && <tr><td className="um-no-results" colSpan="7">Loading children from database...</td></tr>}
                </tbody>
              </table>
            </div>
            <div className="um-table-footer">
              <span>Showing <b>{filteredChildren.length ? (page - 1) * 6 + 1 : 0}–{Math.min(page * 6, filteredChildren.length)}</b> of <b>{filteredChildren.length}</b> children</span>
              <div className="um-pagination">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft size={14} /></button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button key={n} className={page === n ? 'current' : ''} onClick={() => setPage(n)}>{n}</button>
                ))}
                <button disabled={page === totalPages} onClick={() => setPage(p => Math.min(p + 1, totalPages))}><ChevronRight size={14} /></button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* ========== ADD MODAL ========== */}
      {addOpen && (
        <div className="um-modal-backdrop cm-modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setAddOpen(false); }}>
          <form className="um-modal cm-modal" onSubmit={handleAdd}>
            <div className="um-modal-heading">
              <div className="cm-modal-title"><span><UserPlus size={17} /></span><div><h2>Add New Child</h2><p>Create a child profile in the nursery system.</p></div></div>
              <button type="button" onClick={() => setAddOpen(false)}><X size={17} /></button>
            </div>
            <label>Full Name <i>*</i><input required value={newChild.name} onChange={e => setNewChild({ ...newChild, name: e.target.value })} placeholder="e.g. Leo Vance" /></label>
            <div className="cm-form-row">
              <label>Date of Birth <i>*</i><span className="cm-input-icon"><input required type="date" value={newChild.birth} onChange={e => setNewChild({ ...newChild, birth: e.target.value })} /><CalendarDays size={14} /></span></label>
              <label>Gender <i>*</i><select value={newChild.gender} onChange={e => setNewChild({ ...newChild, gender: e.target.value })}><option value="Boy">Boy (Male)</option><option value="Girl">Girl (Female)</option></select></label>
            </div>
            <label>Parent / Guardian Account <i>*</i>
              {parents.length > 0
                ? <select value={newChild.parentId} onChange={e => setNewChild({ ...newChild, parentId: e.target.value })} required><option value="">-- Select Parent --</option>{parents.map(p => <option key={p.id} value={p.id}>{p.name} ({p.email})</option>)}</select>
                : <p style={{ color: '#d97706', fontSize: '12px', marginTop: '5px' }}>No Parent accounts found. Create one in User Management first.</p>
              }
            </label>
            <label>Contact Number<input value={newChild.phone} onChange={e => setNewChild({ ...newChild, phone: e.target.value })} placeholder="+1 (555) 234-8901" /></label>
            <label>Notes &amp; Allergies <small>(optional)</small><textarea value={newChild.notes} onChange={e => setNewChild({ ...newChild, notes: e.target.value })} placeholder="e.g. Peanut allergy" /></label>
            <div className="um-modal-actions">
              <button type="button" onClick={() => setAddOpen(false)}>Cancel</button>
              <button type="submit" disabled={addSubmitting || !parents.length}>{addSubmitting ? 'Creating...' : <><span>✓</span> Create Child</>}</button>
            </div>
          </form>
        </div>
      )}

      {/* ========== EDIT MODAL ========== */}
      {editChild && (
        <div className="um-modal-backdrop cm-modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setEditChild(null); }}>
          <form className="um-modal cm-modal" onSubmit={handleEdit}>
            <div className="um-modal-heading">
              <div className="cm-modal-title"><span style={{ background: '#edf4ff', color: '#2b6ad0' }}><Pencil size={17} /></span><div><h2>Edit Child</h2><p>Update profile for <b>{editChild.name}</b></p></div></div>
              <button type="button" onClick={() => setEditChild(null)}><X size={17} /></button>
            </div>
            <label>Full Name <i>*</i><input required value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} /></label>
            <div className="cm-form-row">
              <label>Date of Birth <i>*</i><span className="cm-input-icon"><input required type="date" value={editForm.birth} onChange={e => setEditForm({ ...editForm, birth: e.target.value })} /><CalendarDays size={14} /></span></label>
              <label>Gender <i>*</i><select value={editForm.gender} onChange={e => setEditForm({ ...editForm, gender: e.target.value })}><option value="Boy">Boy (Male)</option><option value="Girl">Girl (Female)</option></select></label>
            </div>
            <label>Parent / Guardian Account <i>*</i>
              <select value={editForm.parentId} onChange={e => setEditForm({ ...editForm, parentId: e.target.value })} required>
                <option value="">-- Select Parent --</option>
                {parents.map(p => <option key={p.id} value={p.id}>{p.name} ({p.email})</option>)}
              </select>
            </label>
            <label>Contact Number<input value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} /></label>
            <div className="um-modal-actions">
              <button type="button" onClick={() => setEditChild(null)}>Cancel</button>
              <button type="submit" disabled={editSubmitting} style={{ background: '#2b6ad0', borderColor: '#2b6ad0' }}>{editSubmitting ? 'Saving...' : <><span>✓</span> Save Changes</>}</button>
            </div>
          </form>
        </div>
      )}

      {/* ========== DELETE CONFIRM MODAL ========== */}
      {deleteChild && (
        <div className="um-modal-backdrop cm-modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setDeleteChild(null); }}>
          <div className="um-modal um-delete-modal">
            <div className="um-delete-icon"><Trash2 size={22} /></div>
            <h2>Delete Child</h2>
            <p>Are you sure you want to remove <b>{deleteChild.name}</b> from the nursery system? This action cannot be undone.</p>
            <div className="um-modal-actions" style={{ justifyContent: 'center', gap: '12px' }}>
              <button type="button" onClick={() => setDeleteChild(null)}>Cancel</button>
              <button type="button" disabled={deleteSubmitting} className="um-btn-confirm-delete" onClick={handleDelete}>
                {deleteSubmitting ? 'Deleting...' : <><Trash2 size={13} /> Delete Child</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
