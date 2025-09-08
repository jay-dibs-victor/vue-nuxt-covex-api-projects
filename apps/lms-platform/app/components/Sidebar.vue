<template>
  <aside class="sidebar" :class="{ 'is-open': isOpen }">
    <div class="logo">LEARNIUM</div>
    <button class="mobile-close" @click="isOpen = false">✕</button>
    <nav class="nav">
      <a href="#" class="active">📊 Dashboard</a>
      <a href="#">📚 My Courses</a>
      <a href="#">📝 Assignments</a>
      <a href="#">📈 Analytics</a>
      <a href="#">⚙️ Settings</a>
    </nav>
    <div class="ai-badge">
      <span class="pulse"></span>
      Claude AI Active
    </div>
  </aside>
  <button class="mobile-toggle" @click="isOpen = true">☰</button>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: #0f172a;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 0;
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 50;
  transition: transform 0.3s ease;
}

.logo {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  color: #3b82f6;
  padding: 0 2rem 3rem;
  letter-spacing: -0.02em;
}

.nav {
  flex-grow: 1;
}

.nav a {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.nav a:hover, .nav a.active {
  color: white;
  background: rgba(255, 255, 255, 0.05);
}

.nav a.active {
  border-left: 4px solid #3b82f6;
}

.ai-badge {
  margin: 2rem;
  background: rgba(52, 211, 153, 0.1);
  color: #34d399;
  padding: 0.75rem 1rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pulse {
  width: 8px;
  height: 8px;
  background: #34d399;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(52, 211, 153, 0); }
  100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
}

.mobile-close {
  display: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.mobile-toggle {
  display: none;
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  font-size: 1.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  z-index: 40;
  cursor: pointer;
}

@media (max-width: 1024px) {
  .sidebar {
    position: fixed;
    transform: translateX(-100%);
  }
  .sidebar.is-open {
    transform: translateX(0);
  }
  .mobile-close, .mobile-toggle {
    display: block;
  }
}
</style>
