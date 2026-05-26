import { API_BASE, getAuthHeaders, parseResponse } from './apiClient.js'

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
