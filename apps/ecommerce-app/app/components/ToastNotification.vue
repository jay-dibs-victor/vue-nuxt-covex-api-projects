<template>
  <TransitionGroup name="toast" tag="div" class="toast-container">
    <div v-for="toast in toasts" :key="toast.id" class="toast" :class="toast.type">
      <div class="toast-content">
        <span class="icon">{{ toast.type === 'success' ? '✓' : '!' }}</span>
        <p>{{ toast.message }}</p>
      </div>
      <button @click="removeToast(toast.id)" class="close">✕</button>
    </div>
  </TransitionGroup>
</template>

<script setup>
import { ref } from 'vue'

const toasts = ref([])
let nextId = 0

const addToast = (message, type = 'success') => {
  const id = nextId++
  toasts.value.push({ id, message, type })
  setTimeout(() => removeToast(id), 5000)
}

const removeToast = (id) => {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

// Expose globally
if (typeof window !== 'undefined') {
  window.$toast = { add: addToast }
}

defineExpose({ add: addToast })
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  pointer-events: none;
}

.toast {
  pointer-events: auto;
  min-width: 300px;
  background: white;
  padding: 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid #111;
}

.toast.success { border-left-color: #10b981; }
.toast.error { border-left-color: #ef4444; }

.toast-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon {
  font-weight: 800;
  font-size: 1.1rem;
}

.toast.success .icon { color: #10b981; }
.toast.error .icon { color: #ef4444; }

p {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #111;
}

.close {
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
}

/* Transitions */
.toast-enter-active, .toast-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.toast-enter-from { opacity: 0; transform: translateX(50px); }
.toast-leave-to { opacity: 0; transform: scale(0.9); }
</style>
