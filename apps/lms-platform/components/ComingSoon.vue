<template>
  <div class="coming-soon">
    <div class="content">
      <div class="icon-pulse">
        <span class="icon">{{ icon }}</span>
      </div>
      <h1>{{ title }} Coming Soon</h1>
      <p>We're working hard to bring you the best learning experience. This feature will be available shortly.</p>
      <NuxtLink to="/" class="back-home">Back to Dashboard</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '🚀'
  }
});
</script>

<style scoped>
.coming-soon {
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.content {
  max-width: 500px;
}

.icon-pulse {
  width: 80px;
  height: 80px;
  background: #eff6ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  position: relative;
}

.icon-pulse::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid #3b82f6;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.5); opacity: 0; }
}

.icon {
  font-size: 2.5rem;
}

h1 {
  font-family: 'Outfit', sans-serif;
  font-size: 2.5rem;
  color: #0f172a;
  margin-bottom: 1rem;
}

p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.back-home {
  display: inline-block;
  background: #3b82f6;
  color: white;
  padding: 0.85rem 2rem;
  border-radius: 1rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.back-home:hover {
  transform: translateY(-2px);
  background: #2563eb;
  box-shadow: 0 6px 15px rgba(59, 130, 246, 0.3);
}
</style>
