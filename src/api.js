const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res) {
  if (res.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.message || `Request failed with status ${res.status}`);
  }
  return data;
}

export const api = {
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await handleResponse(res);
    if (data?.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch { return null; }
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  // Users
  async getUsers(role) {
    const query = role && role !== 'All Roles' ? `?role=${role.toUpperCase()}` : '';
    const res = await fetch(`${API_BASE}/admin/users${query}`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  async createUser({ name, email, password, role }) {
    const res = await fetch(`${API_BASE}/admin/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ name, email, password, role: role.toUpperCase() })
    });
    return handleResponse(res);
  },

  async updateUser(id, { name, email, role }) {
    const res = await fetch(`${API_BASE}/admin/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ name, email, role: role?.toUpperCase() })
    });
    return handleResponse(res);
  },

  async toggleUserStatus(id) {
    const res = await fetch(`${API_BASE}/admin/users/${id}/status`, {
      method: 'PATCH',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  async deleteUser(id) {
    const res = await fetch(`${API_BASE}/admin/users/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  // Children
  async getChildren() {
    const res = await fetch(`${API_BASE}/admin/children`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  async createChild({ firstName, lastName, dateOfBirth, gender, parentId }) {
    const res = await fetch(`${API_BASE}/admin/children`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ firstName, lastName, dateOfBirth, gender, parentId })
    });
    return handleResponse(res);
  },

  async updateChild(id, { firstName, lastName, dateOfBirth, gender, parentId }) {
    const res = await fetch(`${API_BASE}/admin/children/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ firstName, lastName, dateOfBirth, gender, parentId })
    });
    return handleResponse(res);
  },

  async deleteChild(id) {
    const res = await fetch(`${API_BASE}/admin/children/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  }
};

export default api;
