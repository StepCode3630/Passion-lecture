<template>
  <div v-if="message" class="banner" :class="`banner--${variant}`" role="status">
    <p class="banner-message">{{ message }}</p>
    <button
      v-if="actionLabel"
      type="button"
      class="banner-action"
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </button>
    <button
      v-if="dismissible"
      type="button"
      class="banner-close"
      aria-label="Fermer"
      @click="$emit('close')"
    >
      ×
    </button>
  </div>
</template>

<script setup>
defineProps({
  message: { type: String, default: '' },
  variant: {
    type: String,
    default: 'error',
    validator: (v) => ['error', 'info', 'success'].includes(v),
  },
  dismissible: { type: Boolean, default: true },
  actionLabel: { type: String, default: '' },
})

defineEmits(['close', 'action'])
</script>

<style scoped>
.banner {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  border: 1px solid;
  font-family: 'Courier New', Courier, monospace;
}

.banner--error {
  background: #fdf0ef;
  border-color: #b94a48;
  color: #7a2e2c;
}

.banner--info {
  background: #f0f6f9;
  border-color: #5a7d8c;
  color: #3d5a66;
}

.banner--success {
  background: #eef8f0;
  border-color: #3d7a4a;
  color: #2d5c38;
}

.banner-message {
  flex: 1;
  margin: 0;
  line-height: 1.4;
}

.banner-action,
.banner-close {
  flex-shrink: 0;
  border: 1px solid currentColor;
  background: transparent;
  border-radius: 8px;
  padding: 0.35rem 0.75rem;
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;
  color: inherit;
}

.banner-close {
  padding: 0.2rem 0.55rem;
  font-size: 1.1rem;
  line-height: 1;
}
</style>
