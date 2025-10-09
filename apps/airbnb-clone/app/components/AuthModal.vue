<template>
  <div v-if="modelValue" class="modal-overlay" @click="$emit('update:modelValue', null)">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="$emit('update:modelValue', null)">✕</button>
      <h2>{{ modelValue === 'signup' ? 'Welcome to StaySphere' : 'Log in' }}</h2>
      
      <form @submit.prevent="handleAuth" class="auth-form">
        <div class="form-group" v-if="modelValue === 'signup'">
          <input type="text" v-model="form.name" placeholder="Full Name" required />
        </div>
        <div class="form-group">
          <input type="email" v-model="form.email" placeholder="Email" required />
        </div>
        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? 'Processing...' : (modelValue === 'signup' ? 'Continue' : 'Log in') }}
        </button>
      </form>
      
      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useConvexMutation } from '~/composables/useConvex';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'success']);

const loading = ref(false);
const error = ref(null);
const form = reactive({ name: '', email: '' });

const signupMutation = useConvexMutation("auth:signup");
const loginQuery = async (email) => {
  const convex = getConvexClient();
  return await convex.query("auth:login", { email });
};

const handleAuth = async () => {
  loading.value = true;
  error.value = null;
  try {
    let userData;
    if (props.modelValue === 'signup') {
      const id = await signupMutation(form);
      userData = { _id: id };
    } else {
      userData = await loginQuery(form.email);
    }
    emit('success', userData);
    emit('update:modelValue', null);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  width: 100%;
  max-width: 568px;
  border-radius: 0.75rem;
  padding: 2.5rem;
  position: relative;
  box-shadow: 0 8px 28px rgba(0,0,0,0.28);
}

.close-btn {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

h2 {
  text-align: center;
  font-family: 'Outfit', sans-serif;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #b0b0b0;
  border-radius: 0.5rem;
  font-size: 1rem;
  box-sizing: border-box;
}

.submit-btn {
  background: #ff385c;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.submit-btn:hover { opacity: 0.9; }
.submit-btn:disabled { background: #ddd; cursor: not-allowed; }

.error-msg {
  color: #c13511;
  font-size: 0.85rem;
  margin-top: 1rem;
  text-align: center;
}
</style>
