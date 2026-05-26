import { API_BASE, getAuthHeaders, parseResponse } from './apiClient.js'

export async function getComments(bookId) {
  const response = await fetch(`${API_BASE}/books/${bookId}/comments`)
  const data = await parseResponse(response)

  return Array.isArray(data) ? data : (data.data ?? [])
}

export async function addComment(bookId, comment) {
  const response = await fetch(`${API_BASE}/books/${bookId}/comments`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(comment),
  })

  return await parseResponse(response)
}
