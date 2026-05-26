import { API_BASE, getAuthHeaders, parseResponse } from './apiClient.js'

export async function register(fullName, email, password) {
  const response = await fetch(`${API_BASE}/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, password }),
  })

  return await parseResponse(response)
}

export async function login(email, password) {
  const response = await fetch(`${API_BASE}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  return await parseResponse(response)
}

export async function logout() {
  const response = await fetch(`${API_BASE}/user/logout`, {
    method: 'POST',
    headers: getAuthHeaders(),
  })

  await parseResponse(response)
}
