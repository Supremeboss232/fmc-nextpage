// Lightweight auth helper used across public pages
// Exposes `auth` on window with simple helpers for token/user management
(function () {
  const LOCAL_TOKEN_KEY = 'token';
  const LOCAL_USER_KEY = 'user';

  function getToken() {
    return localStorage.getItem(LOCAL_TOKEN_KEY);
  }

  function setToken(token) {
    if (token) localStorage.setItem(LOCAL_TOKEN_KEY, token);
    else localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  function getUser() {
    try { return JSON.parse(localStorage.getItem(LOCAL_USER_KEY)); } catch { return null; }
  }

  function setUser(user) {
    if (user) localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(LOCAL_USER_KEY);
  }

  function logout(redirect = '/login.html') {
    setToken(null);
    setUser(null);
    if (redirect) location.href = redirect;
  }

  function requireAuth(redirect = '/login.html') {
    if (!getToken()) {
      location.href = redirect;
      return false;
    }
    return true;
  }

  async function fetchJson(url, opts = {}) {
    opts.headers = opts.headers || {};
    const token = getToken();
    if (token) opts.headers['Authorization'] = 'Bearer ' + token;
    opts.headers['Content-Type'] = opts.headers['Content-Type'] || 'application/json';
    const res = await fetch(url, opts);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw Object.assign(new Error('Request failed'), { status: res.status, data });
    return data;
  }

  // expose
  window.auth = {
    getToken,
    setToken,
    getUser,
    setUser,
    logout,
    requireAuth,
    fetchJson
  };
})();
