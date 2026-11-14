// All calls to the backend live here, so components never build URLs or fetch options themselves.
const BASE = '/api/todos';

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export const getTodos = () => request(BASE);

export const addTodo = (title) =>
  request(BASE, { method: 'POST', body: JSON.stringify({ title }) });

export const updateTodo = (id, data) =>
  request(`${BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(data) });

export const deleteTodo = (id) => request(`${BASE}/${id}`, { method: 'DELETE' });
