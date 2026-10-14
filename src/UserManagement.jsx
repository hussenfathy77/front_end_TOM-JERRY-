import { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Activity, Baby, Bell, Calendar, CalendarCheck, ChevronDown, ChevronLeft, ChevronRight,
  ClipboardList, CreditCard, Ellipsis, Eye, EyeOff, LayoutGrid, LogOut, Pencil, Search,
  School, SlidersHorizontal, Trash2, UserPlus, Users, X, CircleHelp, RefreshCw, AlertCircle
} from 'lucide-react';
import { Logo } from './Login.jsx';
import api from './api.js';
import './UserManagement.css';

const plannedModules = [
  [School, 'Classes & Staff'], [ClipboardList, 'Admission Requests'], [CalendarCheck, 'Attendance'],
  [Activity, 'Daily Activities'], [CreditCard, 'Fees & Payments'], [Bell, 'Announcements']
];

const emptyForm = { name: '', email: '', role: 'Teacher', password: '', status: 'Active' };

export default function UserManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Add modal
  const [addOpen, setAddOpen] = useState(Boolean(location.state?.openModal));
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [addSubmitting, setAddSubmitting] = useState(false);
  const [newUser, setNewUser] = useState(emptyForm);

  // Edit modal
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: 'Teacher' });
  const [editSubmitting, setEditSubmitting] = useState(false);

  // Delete modal
  const [deleteUser, setDeleteUser] = useState(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  const [activeMenu, setActiveMenu] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await api.getUsers(roleFilter);
      const formatted = (data || []).map(u => {
        const initials = (u.name || '').split(/\s+/).slice(0, 2).map(p => p[0]).join('').toUpperCase() || 'U';
        const role = u.role ? u.role.charAt(0) + u.role.slice(1).toLowerCase() : 'Parent';
        const dateStr = u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Recent';
        return { id: u.id, name: u.name, detail: role === 'Teacher' ? 'Lead Nursery Educator' : 'Parent account', email: u.email, role, status: u.isActive ? 'Active' : 'Inactive', date: dateStr, initials };
      });
      setUsers(formatted);
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, [roleFilter]);

  const filteredUsers = useMemo(() => users.filter(user => {
    const query = search.toLowerCase();
    const matchSearch = user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
    const matchStatus = statusFilter === 'All Statuses' || user.status === statusFilter;
    return matchSearch && matchStatus;
  }), [users, search, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const visibleUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);
  const activeUsers = users.filter(u => u.status === 'Active').length;

  const clearFilters = () => { setSearch(''); setRoleFilter('All Roles'); setStatusFilter('All Statuses'); setPage(1); };

  // --- ADD ---
  const handleAdd = async (e) => {
    e.preventDefault();
    const name = newUser.name.trim();
    const email = newUser.email.trim();
    if (!name || !email || !newUser.password) return;
    if (newUser.password.length < 6) { setPasswordError(true); return; }
    try {
      setAddSubmitting(true);
      await api.createUser({ name, email, password: newUser.password, role: newUser.role });
      setAddOpen(false);
      setNewUser(emptyForm);
      await loadUsers();
    } catch (err) { alert(err.message || 'Error creating user'); }
    finally { setAddSubmitting(false); }
  };

  // --- EDIT ---
  const openEdit = (user) => {
    setEditUser(user);
    setEditForm({ name: user.name, email: user.email, role: user.role });
    setActiveMenu(null);
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editForm.name.trim() || !editForm.email.trim()) return;
    try {
      setEditSubmitting(true);
      await api.updateUser(editUser.id, { name: editForm.name.trim(), email: editForm.email.trim(), role: editForm.role });
      setEditUser(null);
      await loadUsers();
    } catch (err) { alert(err.message || 'Error updating user'); }
    finally { setEditSubmitting(false); }
  };

  // --- DELETE ---
  const openDelete = (user) => { setDeleteUser(user); setActiveMenu(null); };
  const handleDelete = async () => {
    try {
      setDeleteSubmitting(true);
      await api.deleteUser(deleteUser.id);
      setDeleteUser(null);
      await loadUsers();
    } catch (err) { alert(err.message || 'Error deleting user'); }
    finally { setDeleteSubmitting(false); }
  };

  // --- TOGGLE STATUS ---
  const toggleStatus = async (user) => {
    try {
      await api.toggleUserStatus(user.id);
      setActiveMenu(null);
      await loadUsers();
    } catch (err) { alert(err.message || 'Error updating status'); }
  };

  const handleLogout = () => { api.logout(); navigate('/login'); };

  return (
    <div className="um-page">
      <aside className="um-sidebar">
        <div className="um-brand"><Logo small /></div>
        <div className="um-section-title">CORE MODULES</div>
        <Link className="um-nav" to="/dashboard"><LayoutGrid size={15} />Dashboard</Link>
        <Link className="um-nav selected" to="/user-management"><Users size={15} />User Management</Link>
        <Link className="um-nav" to="/children-management"><Baby size={15} />Children Management</Link>
        <div className="um-section-title">PLANNED MODULES</div>
        {plannedModules.map(([Icon, label]) => (
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
            <Link to="/dashboard">Home</Link><span>/</span><span className="um-crumb-current">User Management</span>
          </div>
          <div className="um-header-actions">
            <span className="um-date"><Calendar size={12} />Academic Year 2026/2027</span>
            <button className="um-notification" onClick={loadUsers} title="Refresh" aria-label="Refresh">
              <RefreshCw size={13} className={loading ? 'spin' : ''} />
            </button>
            <button className="um-profile">
              <span className="um-avatar yellow">TJ</span>
              <span><b>Admin</b><small>Connected</small></span>
              <ChevronDown size={12} />
            </button>
          </div>
        </header>

        <main className="um-body">
          <div className="um-title-row">
            <div><h1>User Management</h1><p>Create, edit, and manage teacher and parent accounts.</p></div>
            <button className="um-add-button" onClick={() => setAddOpen(true)}><UserPlus size={14} />Add New User</button>
          </div>

          <section className="um-stats">
            <article className="um-stat">
              <div><small>TOTAL USERS</small><strong>{users.length}</strong><p>Teachers &amp; Parent accounts</p></div>
              <span className="um-stat-icon blue"><Users size={19} /></span>
            </article>
            <article className="um-stat">
              <div><small>ACTIVE USERS</small><strong>{activeUsers}<em>({(activeUsers / Math.max(users.length, 1) * 100).toFixed(1)}%)</em></strong><p>Active status credentials</p></div>
              <span className="um-stat-icon amber"><UserPlus size={19} /></span>
            </article>
            <article className="um-stat">
              <div><small>INACTIVE USERS</small><strong>{users.length - activeUsers}<em>Pending</em></strong><p>Draft / pending onboarding</p></div>
              <span className="um-stat-icon pink"><UserPlus size={19} /></span>
            </article>
          </section>

          <section className="um-filters" aria-label="Filter users">
            <label className="um-search">
              <Search size={14} />
              <input placeholder="Search by name or email..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
            </label>
            <label className="um-select-wrap">
              <SlidersHorizontal className="um-filter-icon" size={12} />
              <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }}>
                <option>All Roles</option><option>Teacher</option><option>Parent</option>
              </select>
              <ChevronDown size={12} />
            </label>
            <label className="um-select-wrap">
              <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
                <option>All Statuses</option><option>Active</option><option>Inactive</option>
              </select>
              <ChevronDown size={12} />
            </label>
            <button className="um-clear" onClick={clearFilters}><X size={12} />Clear Filters</button>
          </section>

          <section className="um-table-card">
            <div className="um-table-scroll">
              <table className="um-table">
                <thead>
                  <tr>
                    <th className="um-user-heading">USER</th>
                    <th>EMAIL ADDRESS</th>
                    <th>ROLE</th>
                    <th>STATUS</th>
                    <th>DATE CREATED</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="um-user-cell">
                          <span className={`um-avatar ${user.role === 'Teacher' ? 'blue' : 'pink'}`}>{user.initials}</span>
                          <span><b>{user.name}</b><small>{user.detail}</small></span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td><span className={`um-role ${user.role.toLowerCase()}`}>{user.role}</span></td>
                      <td><span className={`um-status ${user.status.toLowerCase()}`}><i />{user.status}</span></td>
                      <td>{user.date}</td>
                      <td className="um-action-cell">
                        {/* Inline action buttons */}
                        <div className="um-actions-inline">
                          <button className="um-btn-edit" title="Edit user" onClick={() => openEdit(user)}><Pencil size={13} /></button>
                          <button className="um-btn-delete" title="Delete user" onClick={() => openDelete(user)}><Trash2 size={13} /></button>
                          <button className="um-more" title="More" onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}><Ellipsis size={15} /></button>
                        </div>
                        {activeMenu === user.id && (
                          <div className="um-row-menu">
                            <button onClick={() => toggleStatus(user)}>
                              {user.status === 'Active' ? 'Deactivate user' : 'Activate user'}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {!loading && !visibleUsers.length && <tr><td className="um-no-results" colSpan="6">No users found. Click "Add New User" to create one.</td></tr>}
                  {loading && <tr><td className="um-no-results" colSpan="6">Loading users from backend...</td></tr>}
                </tbody>
              </table>
            </div>
            <div className="um-table-footer">
              <span>Showing <b>{filteredUsers.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filteredUsers.length)}</b> of <b>{filteredUsers.length}</b> users</span>
              <div className="um-pagination">
                <label>Rows per page:
                  <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}>
                    <option value={6}>6 / page</option><option value={10}>10 / page</option><option value={24}>24 / page</option>
                  </select>
                </label>
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft size={14} /></button>
                {Array.from({ length: pageCount }, (_, i) => i + 1).map(n => (
                  <button key={n} className={page === n ? 'current' : ''} onClick={() => setPage(n)}>{n}</button>
                ))}
                <button disabled={page === pageCount} onClick={() => setPage(p => p + 1)}><ChevronRight size={14} /></button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* ========== ADD MODAL ========== */}
      {addOpen && (
        <div className="um-modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setAddOpen(false); }}>
          <form className="um-modal" onSubmit={handleAdd}>
            <div className="um-modal-heading">
              <div className="um-user-modal-title">
                <span><UserPlus size={16} /></span>
                <div><h2>Add New User</h2><p>Create a new teacher or parent account.</p></div>
              </div>
              <button type="button" onClick={() => setAddOpen(false)}><X size={16} /></button>
            </div>
            <label>Full Name <i>*</i><input required value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} placeholder="e.g. Sarah Ahmed" /></label>
            <label>Email Address <i>*</i><input required type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} placeholder="e.g. sarah@example.com" /></label>
            <label>Role <i>*</i>
              <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
                <option value="Teacher">Teacher (Nursery Staff)</option>
                <option value="Parent">Parent / Guardian</option>
              </select>
            </label>
            <label>Temporary Password <i>*</i>
              <span className="um-password-input">
                <input required type={showPassword ? 'text' : 'password'} value={newUser.password} onChange={e => { setNewUser({ ...newUser, password: e.target.value }); setPasswordError(false); }} placeholder="At least 6 characters" />
                <button type="button" onClick={() => setShowPassword(v => !v)}>{showPassword ? <EyeOff size={13} /> : <Eye size={13} />}</button>
              </span>
            </label>
            <p className={`um-password-hint${passwordError ? ' error' : ''}`}><CircleHelp size={11} />Must be at least 6 characters.</p>
            <fieldset className="um-status-field">
              <legend>Account Status</legend>
              <label className={newUser.status === 'Active' ? 'checked' : ''}>
                <input type="radio" name="ns" value="Active" checked={newUser.status === 'Active'} onChange={() => setNewUser({ ...newUser, status: 'Active' })} />
                <span><b>Active</b><small>Immediate portal access</small></span>
              </label>
              <label className={newUser.status === 'Inactive' ? 'checked' : ''}>
                <input type="radio" name="ns" value="Inactive" checked={newUser.status === 'Inactive'} onChange={() => setNewUser({ ...newUser, status: 'Inactive' })} />
                <span><b>Inactive</b><small>Draft / pending approval</small></span>
              </label>
            </fieldset>
            <div className="um-modal-actions">
              <button type="button" onClick={() => setAddOpen(false)}>Cancel</button>
              <button type="submit" disabled={addSubmitting}>{addSubmitting ? 'Creating...' : <><span>✓</span> Create User</>}</button>
            </div>
          </form>
        </div>
      )}

      {/* ========== EDIT MODAL ========== */}
      {editUser && (
        <div className="um-modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setEditUser(null); }}>
          <form className="um-modal" onSubmit={handleEdit}>
            <div className="um-modal-heading">
              <div className="um-user-modal-title">
                <span style={{ background: '#edf4ff', color: '#2b6ad0' }}><Pencil size={16} /></span>
                <div><h2>Edit User</h2><p>Update account details for <b>{editUser.name}</b></p></div>
              </div>
              <button type="button" onClick={() => setEditUser(null)}><X size={16} /></button>
            </div>
            <label>Full Name <i>*</i><input required value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} /></label>
            <label>Email Address <i>*</i><input required type="email" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} /></label>
            <label>Role <i>*</i>
              <select value={editForm.role} onChange={e => setEditForm({ ...editForm, role: e.target.value })}>
                <option value="Teacher">Teacher (Nursery Staff)</option>
                <option value="Parent">Parent / Guardian</option>
              </select>
            </label>
            <div className="um-modal-actions">
              <button type="button" onClick={() => setEditUser(null)}>Cancel</button>
              <button type="submit" disabled={editSubmitting} style={{ background: '#2b6ad0', borderColor: '#2b6ad0' }}>{editSubmitting ? 'Saving...' : <><span>✓</span> Save Changes</>}</button>
            </div>
          </form>
        </div>
      )}

      {/* ========== DELETE CONFIRM MODAL ========== */}
      {deleteUser && (
        <div className="um-modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setDeleteUser(null); }}>
          <div className="um-modal um-delete-modal">
            <div className="um-delete-icon"><Trash2 size={22} /></div>
            <h2>Delete User</h2>
            <p>Are you sure you want to delete <b>{deleteUser.name}</b>? This action cannot be undone.</p>
            <div className="um-modal-actions" style={{ justifyContent: 'center', gap: '12px' }}>
              <button type="button" onClick={() => setDeleteUser(null)}>Cancel</button>
              <button type="button" disabled={deleteSubmitting} className="um-btn-confirm-delete" onClick={handleDelete}>
                {deleteSubmitting ? 'Deleting...' : <><Trash2 size={13} /> Delete User</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
