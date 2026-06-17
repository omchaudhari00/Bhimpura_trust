const API_BASE = "";

function getToken() {
  return localStorage.getItem("admin_token");
}

export function setToken(token) {
  if (token) localStorage.setItem("admin_token", token);
  else localStorage.removeItem("admin_token");
}

export function isAdminLoggedIn() {
  return Boolean(getToken());
}

async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let detail = "Request failed.";
    try {
      const data = await response.json();
      detail = data.detail || JSON.stringify(data);
    } catch {
      detail = response.statusText;
    }
    throw new Error(detail);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const api = {
  login: (email, password) =>
    request("/api/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }),

  getDonors: () => request("/api/donors/"),

  addDonor: (formData) =>
    request("/api/donors/", {
      method: "POST",
      body: formData,
    }),

  getEventPhotos: () => request("/api/event-photos/"),

  addEventPhoto: (formData) =>
    request("/api/event-photos/", {
      method: "POST",
      body: formData,
    }),

  deleteEventPhoto: (id) =>
    request(`/api/event-photos/${id}/`, {
      method: "DELETE",
    }),

  trackHomepage: () => request("/api/analytics/track/"),

  getHomepageVisits: () => request("/api/analytics/homepage-visits/"),

  updateDonor: (id, formData) =>
    request(`/api/donors/${id}/`, {
      method: "PUT",
      body: formData,
    }),

  deleteDonor: (id) =>
    request(`/api/donors/${id}/`, {
      method: "DELETE",
    }),
};
