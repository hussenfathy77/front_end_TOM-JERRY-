import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ChevronDown, DoorOpen, GraduationCap, Pencil, Plus, RefreshCw, School, Search, Trash2, UserX, Users, X } from 'lucide-react';
import api from './api.js';
import classesService from './services/classesService.js';
import AdminLayout from './components/AdminLayout.jsx';
import Modal from './components/Modal.jsx';
import ClassForm from './components/ClassForm.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';
import Pagination from './components/Pagination.jsx';
import Toast, { useToast } from './components/Toast.jsx';
import { PAGE_SIZE, initials, toneFor } from './components/helpers.js';

export default function ClassesManagement() {
  const navigate = useNavigate();
  const { toast, showSuccess, showError, dismiss } = useToast();
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [search, setSearch] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);      // { record: null | class }  -> add / edit
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    if (!api.isAuthenticated()) { navigate('/login'); return; }
    setLoading(true);
    setLoadError('');
    const [cls, tch] = await Promise.allSettled([classesService.getAll(), api.getUsers('TEACHER')]);
    if (cls.status === 'fulfilled') setClasses(cls.value);
    else { setClasses([]); setLoadError(cls.reason?.message || 'Failed to load classes.'); }
    if (tch.status === 'fulfilled') setTeachers((tch.value || []).map(t => ({ id: t.id, name: t.name })));
    setLoading(false);
  }, [navigate]);

  useEffect(() => { load(); }, [load]);

  const teacherName = (c) => teachers.find(t => t.id === c.teacherId)?.name || c.teacherName || '';

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return classes.filter(c => {
      const hay = `${c.name} ${c.room} ${c.ageGroup} ${teacherName(c)}`.toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (teacherFilter === 'Assigned' && !c.teacherId) return false;
      if (teacherFilter === 'Unassigned' && c.teacherId) return false;
      if (statusFilter !== 'All' && c.status !== statusFilter) return false;
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classes, teachers, search, teacherFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const filtersActive = search || teacherFilter !== 'All' || statusFilter !== 'All';
  const clearFilters = () => { setSearch(''); setTeacherFilter('All'); setStatusFilter('All'); setPage(1); };

  const stats = useMemo(() => {
    const assigned = new Set(classes.filter(c => c.teacherId).map(c => c.teacherId)).size;
    return {
      total: classes.length,
      active: classes.filter(c => c.status === 'Active').length,
      assigned,
      unassigned: classes.filter(c => !c.teacherId).length,
      enrolled: classes.reduce((s, c) => s + c.enrolled, 0),
      capacity: classes.reduce((s, c) => s + c.capacity, 0)
    };
  }, [classes]);

  const handleSave = async (values) => {
    setSaving(true);
    try {
      if (modal.record) await classesService.update(modal.record.id, values);
      else await classesService.create(values);
      showSuccess(modal.record ? `"${values.name.trim()}" was updated.` : `"${values.name.trim()}" was created.`);
      setModal(null);
      await load();
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await classesService.remove(toDelete.id);
      showSuccess(`"${toDelete.name}" was deleted.`);
      setToDelete(null);
      await load();
    } catch (err) {
      setToDelete(null);
      showError(err.message || 'Failed to delete class.');
    } finally { setDeleting(false); }
  };

  const editing = modal?.record || null;

  return (
    <AdminLayout active="classes" crumb="Classes Management" onRefresh={load} loading={loading}>
      <div className="um-title-row">
        <div><h1>Class Management</h1><p>Manage nursery classes, classroom capacities, and lead educator assignments.</p></div>
        <button className="um-add-button" onClick={() => setModal({ record: null })}><Plus size={14} />Add Class</button>
      </div>

      <section className="um-stats mg-stats">
        <article className="um-stat"><div><small>TOTAL CLASSES</small><strong>{stats.total}</strong><p>{stats.active} active</p></div><span className="um-stat-icon blue"><School size={19} /></span></article>
        <article className="um-stat"><div><small>ASSIGNED TEACHERS</small><strong>{stats.assigned}</strong><p>Lead educators in classes</p></div><span className="um-stat-icon green"><GraduationCap size={19} /></span></article>
        <article className="um-stat"><div><small>WITHOUT A TEACHER</small><strong>{stats.unassigned}</strong><p>Pending staff assignment</p></div><span className="um-stat-icon pink"><UserX size={19} /></span></article>
        <article className="um-stat"><div><small>TOTAL CHILDREN</small><strong>{stats.enrolled}</strong><p>Capacity: {stats.capacity} seats</p></div><span className="um-stat-icon amber"><Users size={19} /></span></article>
      </section>

      <section className="um-filters mg-filters">
        <label className="um-search"><Search size={14} />
          <input placeholder="Search by class, room, age group or teacher..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </label>
        <label className="um-select-wrap"><span>Teacher:</span>
          <select value={teacherFilter} onChange={e => { setTeacherFilter(e.target.value); setPage(1); }}>
            <option value="All">All</option><option value="Assigned">Assigned</option><option value="Unassigned">Unassigned</option>
          </select><ChevronDown size={12} />
        </label>
        <label className="um-select-wrap"><span>Status:</span>
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
            <option value="All">All</option><option value="Active">Active</option><option value="Draft">Draft</option>
          </select><ChevronDown size={12} />
        </label>
        <button className="um-clear" onClick={clearFilters}><X size={12} />Clear Filters</button>
      </section>

      {loadError && (
        <div className="mg-banner" role="alert">
          <AlertTriangle size={16} /><span><b>Couldn't load classes.</b> {loadError}</span>
          <button onClick={load}><RefreshCw size={12} />Retry</button>
        </div>
      )}

      <section className="um-table-card">
        <div className="um-table-scroll">
          <table className="um-table mg-table">
            <thead><tr><th>CLASSROOM NAME</th><th>LEAD EDUCATOR</th><th>ENROLLED</th><th>CAPACITY</th><th>AVAILABILITY</th><th>STATUS</th><th>ACTIONS</th></tr></thead>
            <tbody>
              {loading && Array.from({ length: 4 }, (_, i) => (
                <tr key={`sk${i}`} className="mg-skeleton-row"><td colSpan="7"><span className="mg-skeleton" /></td></tr>
              ))}
              {!loading && visible.map(c => {
                const left = Math.max(0, c.capacity - c.enrolled);
                const name = teacherName(c);
                return (
                  <tr key={c.id}>
                    <td><div className="um-user-cell">
                      <span className={`um-avatar ${toneFor(c.name)}`}>{initials(c.name)}</span>
                      <span><b>{c.name}</b><small>{[c.ageGroup, c.room].filter(Boolean).join(' • ')}</small></span>
                    </div></td>
                    <td>{name ? <span className="mg-person"><span className={`um-avatar ${toneFor(name)}`}>{initials(name)}</span>{name}</span> : <span className="mg-chip warn">Unassigned</span>}</td>
                    <td>{c.enrolled} children</td>
                    <td>{c.capacity} seats</td>
                    <td><span className={`mg-chip ${left === 0 ? 'full' : 'ok'}`}>{left === 0 ? 'Full' : `${left} seats left`}</span></td>
                    <td><span className={`um-status ${c.status === 'Active' ? 'active' : 'inactive'}`}><i />{c.status}</span></td>
                    <td className="um-action-cell"><div className="um-actions-inline">
                      <button className="um-btn-edit" title="Edit class" aria-label={`Edit ${c.name}`} onClick={() => setModal({ record: c })}><Pencil size={13} /></button>
                      <button className="um-btn-delete" title="Delete class" aria-label={`Delete ${c.name}`} onClick={() => setToDelete(c)}><Trash2 size={13} /></button>
                    </div></td>
                  </tr>
                );
              })}
              {!loading && !visible.length && !loadError && (
                <tr><td className="um-no-results" colSpan="7">
                  <div className="mg-empty"><DoorOpen size={26} />
                    {filtersActive
                      ? <><b>No classes match your filters.</b><button className="um-clear" onClick={clearFilters}>Clear filters</button></>
                      : <><b>No classes yet.</b><span>Create your first class to start assigning teachers and children.</span><button className="um-add-button" onClick={() => setModal({ record: null })}><Plus size={14} />Add Class</button></>}
                  </div>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={safePage} total={filtered.length} noun="classes" onPage={setPage} />
      </section>

      <Modal open={!!modal} onClose={() => setModal(null)} busy={saving}
        icon={editing ? <Pencil size={17} /> : <School size={17} />}
        title={editing ? 'Edit Class' : 'Add New Class'}
        subtitle={editing ? <>Update details for <b>{editing.name}</b></> : 'Create a classroom in the nursery system.'}>
        <ClassForm key={editing?.id ?? 'new'} isEdit={!!editing}
          initial={editing || undefined} teachers={teachers} enrolled={editing?.enrolled || 0}
          otherNames={classes.filter(c => c.id !== editing?.id).map(c => c.name.trim().toLowerCase())}
          submitting={saving} onSubmit={handleSave} onCancel={() => setModal(null)} />
      </Modal>

      <ConfirmDialog open={!!toDelete} busy={deleting} title="Delete Class" confirmLabel="Delete Class"
        message={toDelete && <>Are you sure you want to delete <b>{toDelete.name}</b>?{toDelete.enrolled > 0 && <> It currently has <b>{toDelete.enrolled}</b> enrolled children.</>} This action cannot be undone.</>}
        onConfirm={handleDelete} onCancel={() => setToDelete(null)} />
      <Toast toast={toast} onClose={dismiss} />
    </AdminLayout>
  );
}
