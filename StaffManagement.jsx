import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ChevronDown, GraduationCap, Mail, Pencil, Phone, Plus, RefreshCw, Search, Trash2, UserCog, UserPlus, UserX, Users, X } from 'lucide-react';
import api from './api.js';
import staffService, { STAFF_ROLES, isTeachingRole } from './services/staffService.js';
import classesService from './services/classesService.js';
import AdminLayout from './components/AdminLayout.jsx';
import Modal from './components/Modal.jsx';
import StaffForm from './components/StaffForm.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';
import Pagination from './components/Pagination.jsx';
import Toast, { useToast } from './components/Toast.jsx';
import { PAGE_SIZE, initials, toneFor } from './components/helpers.js';

export default function StaffManagement() {
  const navigate = useNavigate();
  const { toast, showSuccess, showError, dismiss } = useToast();
  const [staff, setStaff] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classesError, setClassesError] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);      // { record: null | staff } -> add / edit
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    if (!api.isAuthenticated()) { navigate('/login'); return; }
    setLoading(true);
    setLoadError('');
    setClassesError('');
    const [stf, cls] = await Promise.allSettled([staffService.getAll(), classesService.getAll()]);
    if (stf.status === 'fulfilled') setStaff(stf.value);
    else { setStaff([]); setLoadError(stf.reason?.message || 'Failed to load staff.'); }
    if (cls.status === 'fulfilled') setClasses(cls.value);
    else { setClasses([]); setClassesError("Couldn't load the classes list."); }
    setLoading(false);
  }, [navigate]);

  useEffect(() => { load(); }, [load]);

  const className = (s) => classes.find(c => c.id === s.classId)?.name || s.className || '';

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return staff.filter(s => {
      if (q && !`${s.name} ${s.email} ${s.phone}`.toLowerCase().includes(q)) return false;
      if (roleFilter !== 'All' && s.staffRole !== roleFilter) return false;
      if (classFilter === 'Assigned' && !s.classId) return false;
      if (classFilter === 'Unassigned' && s.classId) return false;
      if (statusFilter !== 'All' && s.status !== statusFilter) return false;
      return true;
    });
  }, [staff, search, roleFilter, classFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const filtersActive = search || roleFilter !== 'All' || classFilter !== 'All' || statusFilter !== 'All';
  const clearFilters = () => { setSearch(''); setRoleFilter('All'); setClassFilter('All'); setStatusFilter('All'); setPage(1); };

  const stats = useMemo(() => {
    const teachers = staff.filter(s => isTeachingRole(s.staffRole));
    return {
      total: staff.length,
      active: staff.filter(s => s.status === 'Active').length,
      teachers: teachers.length,
      assigned: teachers.filter(s => s.classId).length,
      unassigned: teachers.filter(s => !s.classId).length
    };
  }, [staff]);

  const handleSave = async (values) => {
    setSaving(true);
    try {
      if (modal.record) await staffService.update(modal.record.id, values);
      else await staffService.create(values);
      showSuccess(modal.record ? `${values.name.trim()} was updated.` : `${values.name.trim()} was added to the team.`);
      setModal(null);
      await load();
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await staffService.remove(toDelete.id);
      showSuccess(`${toDelete.name} was removed.`);
      setToDelete(null);
      await load();
    } catch (err) {
      setToDelete(null);
      showError(err.message || 'Failed to delete staff member.');
    } finally { setDeleting(false); }
  };

  const editing = modal?.record || null;

  return (
    <AdminLayout active="staff" crumb="Staff Management" onRefresh={load} loading={loading}>
      <div className="um-title-row">
        <div><h1>Staff Management</h1><p>Manage staff profiles and teacher assignments across classrooms.</p></div>
        <button className="um-add-button" onClick={() => setModal({ record: null })}><Plus size={14} />Add Staff</button>
      </div>

      <section className="um-stats mg-stats">
        <article className="um-stat"><div><small>TOTAL STAFF</small><strong>{stats.total}</strong><p>{stats.active} active</p></div><span className="um-stat-icon blue"><Users size={19} /></span></article>
        <article className="um-stat"><div><small>TEACHERS</small><strong>{stats.teachers}</strong><p>Teaching roles</p></div><span className="um-stat-icon green"><GraduationCap size={19} /></span></article>
        <article className="um-stat"><div><small>ASSIGNED TEACHERS</small><strong>{stats.assigned}</strong><p>Linked to a class</p></div><span className="um-stat-icon amber"><UserCog size={19} /></span></article>
        <article className="um-stat"><div><small>UNASSIGNED</small><strong>{stats.unassigned}</strong><p>Teachers without a class</p></div><span className="um-stat-icon pink"><UserX size={19} /></span></article>
      </section>

      <section className="um-filters mg-filters">
        <label className="um-search"><Search size={14} />
          <input placeholder="Search by name, email or phone..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </label>
        <label className="um-select-wrap"><span>Role:</span>
          <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }}>
            <option value="All">All</option>{STAFF_ROLES.map(r => <option key={r.value} value={r.value}>{r.value}</option>)}
          </select><ChevronDown size={12} />
        </label>
        <label className="um-select-wrap"><span>Class:</span>
          <select value={classFilter} onChange={e => { setClassFilter(e.target.value); setPage(1); }}>
            <option value="All">All</option><option value="Assigned">Assigned</option><option value="Unassigned">Unassigned</option>
          </select><ChevronDown size={12} />
        </label>
        <label className="um-select-wrap"><span>Status:</span>
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
            <option value="All">All</option><option value="Active">Active</option><option value="Inactive">Inactive</option>
          </select><ChevronDown size={12} />
        </label>
        <button className="um-clear" onClick={clearFilters}><X size={12} />Clear Filters</button>
      </section>

      {loadError && (
        <div className="mg-banner" role="alert">
          <AlertTriangle size={16} /><span><b>Couldn't load staff.</b> {loadError}</span>
          <button onClick={load}><RefreshCw size={12} />Retry</button>
        </div>
      )}

      <section className="um-table-card">
        <div className="um-table-scroll">
          <table className="um-table mg-table">
            <thead><tr><th>STAFF MEMBER</th><th>ROLE</th><th>CONTACT</th><th>ASSIGNED CLASS</th><th>STATUS</th><th>ACTIONS</th></tr></thead>
            <tbody>
              {loading && Array.from({ length: 4 }, (_, i) => (
                <tr key={`sk${i}`} className="mg-skeleton-row"><td colSpan="6"><span className="mg-skeleton" /></td></tr>
              ))}
              {!loading && visible.map(s => {
                const cn = className(s);
                return (
                  <tr key={s.id}>
                    <td><div className="um-user-cell">
                      <span className={`um-avatar ${toneFor(s.name)}`}>{initials(s.name)}</span>
                      <span><b>{s.name}</b><small><Mail size={10} style={{ verticalAlign: -1 }} /> {s.email}</small></span>
                    </div></td>
                    <td><span className={`mg-chip ${isTeachingRole(s.staffRole) ? 'role' : 'role-alt'}`}>{s.staffRole || '—'}</span></td>
                    <td>{s.phone ? <span className="mg-phone"><Phone size={12} />{s.phone}</span> : <span className="mg-muted">—</span>}</td>
                    <td>{isTeachingRole(s.staffRole)
                      ? (cn ? <span className="mg-chip ok">{cn}</span> : <span className="mg-chip warn">Unassigned</span>)
                      : <span className="mg-muted">N/A</span>}</td>
                    <td><span className={`um-status ${s.status === 'Active' ? 'active' : 'inactive'}`}><i />{s.status}</span></td>
                    <td className="um-action-cell"><div className="um-actions-inline">
                      <button className="um-btn-edit" title="Edit staff" aria-label={`Edit ${s.name}`} onClick={() => setModal({ record: s })}><Pencil size={13} /></button>
                      <button className="um-btn-delete" title="Delete staff" aria-label={`Delete ${s.name}`} onClick={() => setToDelete(s)}><Trash2 size={13} /></button>
                    </div></td>
                  </tr>
                );
              })}
              {!loading && !visible.length && !loadError && (
                <tr><td className="um-no-results" colSpan="6">
                  <div className="mg-empty"><UserPlus size={26} />
                    {filtersActive
                      ? <><b>No staff match your filters.</b><button className="um-clear" onClick={clearFilters}>Clear filters</button></>
                      : <><b>No staff members yet.</b><span>Add your first teacher or staff member.</span><button className="um-add-button" onClick={() => setModal({ record: null })}><Plus size={14} />Add Staff</button></>}
                  </div>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={safePage} total={filtered.length} noun="staff members" onPage={setPage} />
      </section>

      <Modal open={!!modal} onClose={() => setModal(null)} busy={saving}
        icon={editing ? <Pencil size={17} /> : <UserPlus size={17} />}
        title={editing ? 'Edit Staff Member' : 'Add Staff Member'}
        subtitle={editing ? <>Update profile for <b>{editing.name}</b></> : 'Create a staff profile and optionally assign a class.'}>
        <StaffForm key={editing?.id ?? 'new'} isEdit={!!editing}
          initial={editing || undefined} classes={classes} classesError={classesError}
          otherEmails={staff.filter(s => s.id !== editing?.id).map(s => s.email.trim().toLowerCase())}
          submitting={saving} onSubmit={handleSave} onCancel={() => setModal(null)} />
      </Modal>

      <ConfirmDialog open={!!toDelete} busy={deleting} title="Delete Staff Member" confirmLabel="Delete Staff"
        message={toDelete && <>Are you sure you want to remove <b>{toDelete.name}</b> from the nursery system? This action cannot be undone.</>}
        onConfirm={handleDelete} onCancel={() => setToDelete(null)} />
      <Toast toast={toast} onClose={dismiss} />
    </AdminLayout>
  );
}
