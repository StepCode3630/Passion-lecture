export function getErrorMessage(error, fallback = 'Une erreur est survenue.') {
  if (!error) return fallback
  if (typeof error === 'string') return error
  if (error instanceof Error && error.message) return error.message
  return fallback
}

export function applyFieldErrors(errorsRef, error) {
  if (!errorsRef?.value || !error?.fieldErrors) return
  Object.assign(errorsRef.value, error.fieldErrors)
}

export function handleApiError(error, { toast, errors, fallback, silent = false } = {}) {
  applyFieldErrors(errors, error)
  if (toast && !silent) {
    toast.error(getErrorMessage(error, fallback))
  }
}
