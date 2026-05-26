<template>
  <Teleport to="body">
    <div v-if="state.open" class="confirm-overlay" @click.self="decline">
      <div class="confirm-dialog" role="dialog" aria-modal="true" :aria-labelledby="titleId">
        <h2 :id="titleId" class="confirm-title">{{ state.title }}</h2>
        <p class="confirm-message">{{ state.message }}</p>
        <div class="confirm-actions">
          <button type="button" class="btn btn-cancel" @click="decline">
            {{ state.cancelText }}
          </button>
          <button
            type="button"
            class="btn btn-confirm"
            :class="`btn-confirm--${state.variant}`"
            @click="accept"
          >
            {{ state.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useId } from 'vue'
import { useConfirm } from '@/composables/useConfirm'

const titleId = useId()
const { state, accept, decline } = useConfirm()
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.confirm-dialog {
  width: 100%;
  max-width: 420px;
  padding: 1.5rem;
  border: 2px solid #333;
  border-radius: 16px;
  background: #fff;
  font-family: 'Courier New', Courier, monospace;
}

.confirm-title {
  margin: 0 0 0.75rem;
  font-size: 1.25rem;
}

.confirm-message {
  margin: 0 0 1.5rem;
  line-height: 1.5;
  color: #444;
}

.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  border: 1px solid #333;
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;
}

.btn-cancel {
  background: #fff;
}

.btn-confirm {
  color: #fff;
}

.btn-confirm--danger {
  background: #b94a48;
}

.btn-confirm--primary {
  background: #6b746a;
}
</style>
