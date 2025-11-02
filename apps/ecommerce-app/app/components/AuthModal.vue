<template>
  <Transition name="fade">
    <div v-if="isAuthOpen" class="overlay" @click="closeAuth">
      <div class="modal" @click.stop>
        <button class="close-btn" @click="closeAuth">✕</button>
        
        <div class="auth-box">
          <div class="tabs">
            <button :class="{ active: mode === 'login' }" @click="mode = 'login'">LOGIN</button>
            <button :class="{ active: mode === 'register' }" @click="mode = 'register'">REGISTER</button>
          </div>

          <div v-if="mode === 'login'" class="form-content">
            <h3>WELCOME BACK</h3>
            <p>Log in to access your orders and account settings.</p>
            
            <form @submit.prevent="handleLogin">
              <div class="input-group">
                <label>EMAIL ADDRESS</label>
                <input v-model="email" type="email" required placeholder="name@example.com" />
              </div>
              <div class="input-group">
                <label>PASSWORD</label>
                <input v-model="password" type="password" required placeholder="••••••••" />
              </div>
              
              <div v-if="authError" class="error-msg">{{ authError }}</div>
              
              <button type="submit" class="submit-btn" :disabled="authLoading">
                {{ authLoading ? 'LOGGING IN...' : 'LOG IN' }}
              </button>
            </form>
          </div>

          <div v-else class="form-content">
            <h3>CREATE ACCOUNT</h3>
            <p>Join Velocity Active for exclusive drops and faster checkout.</p>
            
            <form @submit.prevent="handleRegister">
              <div class="input-group">
                <label>FULL NAME</label>
                <input v-model="name" type="text" required placeholder="John Doe" />
              </div>
              <div class="input-group">
                <label>EMAIL ADDRESS</label>
                <input v-model="email" type="email" required placeholder="name@example.com" />
              </div>
              <div class="input-group">
                <label>PASSWORD</label>
                <input v-model="password" type="password" required placeholder="Min. 8 characters" />
              </div>
              
              <div v-if="authError" class="error-msg">{{ authError }}</div>
              
              <button type="submit" class="submit-btn" :disabled="authLoading">
                {{ authLoading ? 'CREATING ACCOUNT...' : 'REGISTER' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { isAuthOpen, closeAuth, login, register, authError, authLoading } = useAuth()

const mode = ref('login')
const email = ref('')
const password = ref('')
const name = ref('')

const handleLogin = async () => {
  await login(email.value, password.value)
}

const handleRegister = async () => {
  await register(email.value, name.value, password.value)
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(8px);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal {
  background: white;
  width: 100%;
  max-width: 500px;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #999;
  z-index: 10;
}

.auth-box {
  display: flex;
  flex-direction: column;
}

.tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid #eee;
}

.tabs button {
  padding: 1.5rem;
  background: none;
  border: none;
  font-weight: 800;
  font-size: 0.8rem;
  letter-spacing: 2px;
  cursor: pointer;
  color: #999;
  transition: all 0.3s;
}

.tabs button.active {
  color: #111;
  background: white;
  position: relative;
}

.tabs button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: #111;
}

.form-content {
  padding: 3rem;
}

h3 {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.5px;
}

p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  font-size: 0.7rem;
  font-weight: 800;
  color: #111;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.input-group input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  transition: border-color 0.2s;
}

.input-group input:focus {
  outline: none;
  border-color: #111;
}

.error-msg {
  color: #ef4444;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding: 0.75rem;
  background: #fef2f2;
  border-radius: 0.5rem;
}

.submit-btn {
  width: 100%;
  padding: 1.25rem;
  background: #111;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover {
  background: #333;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
