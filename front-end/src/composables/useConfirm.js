import { reactive } from 'vue'

const state = reactive({
  open: false,
  title: '',
  message: '',
  confirmText: 'Confirmer',
  cancelText: 'Annuler',
  variant: 'danger',
  resolve: null,
})

export function useConfirm() {
  function confirm({
    title = 'Confirmation',
    message = 'Êtes-vous sûr ?',
    confirmText = 'Confirmer',
    cancelText = 'Annuler',
    variant = 'danger',
  } = {}) {
    return new Promise((resolve) => {
      state.open = true
      state.title = title
      state.message = message
      state.confirmText = confirmText
      state.cancelText = cancelText
      state.variant = variant
      state.resolve = resolve
    })
  }

  function answer(value) {
    state.resolve?.(value)
    state.open = false
    state.resolve = null
  }

  return {
    state,
    confirm,
    accept: () => answer(true),
    decline: () => answer(false),
  }
}
