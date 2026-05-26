import { reactive } from 'vue'

const state = reactive({
  toasts: [],
})

let nextId = 0

const DURATION = {
  success: 4000,
  info: 5000,
  error: 8000,
}

export function useToast() {
  function remove(id) {
    const index = state.toasts.findIndex((toast) => toast.id === id)
    if (index >= 0) state.toasts.splice(index, 1)
  }

  function push(message, type = 'info') {
    const id = ++nextId
    const duration = DURATION[type] ?? DURATION.info

    state.toasts.push({ id, message, type })

    setTimeout(() => remove(id), duration)

    return id
  }

  return {
    toasts: state.toasts,
    success: (message) => push(message, 'success'),
    error: (message) => push(message, 'error'),
    info: (message) => push(message, 'info'),
    remove,
  }
}
