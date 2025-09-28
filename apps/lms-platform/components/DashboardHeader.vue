<template>
  <header class="dashboard-header">
    <div class="welcome">
      <h1>Welcome back, <span>Sarah Jenkins!</span></h1>
      <p>{{ currentDate }}</p>
    </div>
    <div class="header-actions">
      <button class="icon-btn">✉️</button>
      <button class="icon-btn">🔔</button>
      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" class="avatar" />
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});
</script>

<style scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.welcome h1 {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: #0f172a;
}

.welcome h1 span {
  color: #3b82f6;
}

.welcome p {
  margin: 0;
  color: #64748b;
  font-weight: 500;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-btn {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: #64748b;
}

.icon-btn:hover {
  background: #f8fafc;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
