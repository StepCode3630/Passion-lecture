const API_BASE = 'http://localhost:3333'

function getAuthHeaders() {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function parseResponse(response) {
  if (response.status === 204) return null

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      const message = data.errors.map((e) => e.message).join('\n')
      throw new Error(message)
    }
    const message = data.message || 'Erreur serveur'
    throw new Error(message)
  }

  return data
}

export async function getAllBooks(params = {}) {
  const queryParams = { limit: 100, ...params }
  const query = new URLSearchParams(queryParams).toString()
  const response = await fetch(`${API_BASE}/books?${query}`)
  const data = await parseResponse(response)

  return Array.isArray(data) ? data : (data.data ?? [])
}

export async function getBookById(id) {
  const response = await fetch(`${API_BASE}/books/${id}`)
  return await parseResponse(response)
}

export async function createAuthor(firstName, lastName) {
  const response = await fetch(`${API_BASE}/authors`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ firstName, lastName }),
  })

  return await parseResponse(response)
}

export async function createBook(bookData) {
  const response = await fetch(`${API_BASE}/books`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(bookData),
  })

  return await parseResponse(response)
}

export async function updateBook(id, bookData) {
  const response = await fetch(`${API_BASE}/books/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(bookData),
  })

  return await parseResponse(response)
}

export async function deleteBook(id) {
  const response = await fetch(`${API_BASE}/books/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })

  await parseResponse(response)
}

export async function getAllCategories() {
  const response = await fetch(`${API_BASE}/categories?limit=100`)
  const data = await parseResponse(response)

  return Array.isArray(data) ? data : (data.data ?? [])
}
