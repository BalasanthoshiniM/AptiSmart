const BASE_URL = '/api';

const getToken = () => localStorage.getItem('aptismart_token');

const headers = (extra = {}) => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  ...extra,
});

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    console.error(`[API Error] Status: ${res.status}, Message: ${data.message}`, data);
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

export const api = {
  // Auth
  register: (body) =>
    fetch(`${BASE_URL}/auth/register`, { method: 'POST', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),

  login: (body) =>
    fetch(`${BASE_URL}/auth/login`, { method: 'POST', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),

  getMe: () =>
    fetch(`${BASE_URL}/auth/me`, { headers: headers() }).then(handleResponse),

  // Quiz
  getTopics: () =>
    fetch(`${BASE_URL}/quiz/topics`, { headers: headers() }).then(handleResponse),

  generateQuiz: (topic, count = 10, difficulty = 2) =>
    fetch(`${BASE_URL}/quiz/generate?topic=${encodeURIComponent(topic)}&count=${count}&difficulty=${difficulty}`, {
      headers: headers(),
    }).then(handleResponse),

  checkAnswer: (body) =>
    fetch(`${BASE_URL}/quiz/check-answer`, { method: 'POST', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),

  // Results
  submitResult: (body) =>
    fetch(`${BASE_URL}/result/submit`, { method: 'POST', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),

  getHistory: (page = 1, limit = 10) =>
    fetch(`${BASE_URL}/result/history?page=${page}&limit=${limit}`, { headers: headers() }).then(handleResponse),

  getResultDetail: (id) =>
    fetch(`${BASE_URL}/result/${id}`, { headers: headers() }).then(handleResponse),

  getStats: () =>
    fetch(`${BASE_URL}/result/stats/summary`, { headers: headers() }).then(handleResponse),
};

export const saveToken = (token) => localStorage.setItem('aptismart_token', token);
export const saveUser  = (user)  => localStorage.setItem('aptismart_user', JSON.stringify(user));
export const getUser   = ()      => { try { return JSON.parse(localStorage.getItem('aptismart_user')); } catch { return null; } };
export const clearAuth = ()      => { localStorage.removeItem('aptismart_token'); localStorage.removeItem('aptismart_user'); };