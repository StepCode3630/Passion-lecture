export const API_BASE = 'http://localhost:3333'
///Message UX pour aider l'user

export class ApiError extends Error {
  constructor(message, { status, errors = [] } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
    this.fieldErrors = buildFieldErrors(errors)
  }
}

function buildFieldErrors(errors) {
  const map = {}
  for (const entry of errors) {
    if (!entry?.field) continue
    const key = entry.field.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    if (!map[key]) map[key] = entry.message
  }
  return map
}

function defaultMessage(status) {
  if (status === 401) return 'Session expirée. Veuillez vous reconnecter.'
  if (status === 403) return "Vous n'avez pas les droits pour effectuer cette action."
  if (status === 404) return 'Élément introuvable.'
  if (status === 422) return 'Certaines informations sont invalides.'
  if (status >= 500) return 'Le serveur est indisponible. Réessayez dans un instant.'
  return 'Une erreur est survenue.'
}

export function createApiError(data, status) {
  const errors = Array.isArray(data?.errors) ? data.errors : []
  let message = defaultMessage(status)

  if (errors.length > 0) {
    message = errors.map((e) => e.message).join(' ')
  } else if (typeof data?.message === 'string') {
    message = data.message
  }

  return new ApiError(message, { status, errors })
}

export function getAuthHeaders() {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function parseResponse(response) {
  if (response.status === 204) return null

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw createApiError(data, response.status)
  }

  return data
}
