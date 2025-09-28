<template>
  <aside class="sidebar">
    <div class="logo-area">
      <div class="logo-box">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
      </div>
      <span class="logo-text">LEARNIUM</span>
    </div>

    <nav class="nav-menu">
      <NuxtLink to="/" class="nav-item active">
        <span class="nav-icon">🏠</span> Dashboard
      </NuxtLink>
      <NuxtLink to="/courses" class="nav-item">
        <span class="nav-icon">📚</span> My Courses
      </NuxtLink>
      <NuxtLink to="/calendar" class="nav-item">
        <span class="nav-icon">📅</span> Calendar
      </NuxtLink>
      <NuxtLink to="/grades" class="nav-item">
        <span class="nav-icon">📊</span> Grades
      </NuxtLink>
      <NuxtLink to="/messages" class="nav-item">
        <span class="nav-icon">✉️</span> Messages
      </NuxtLink>
      <NuxtLink to="/settings" class="nav-item">
        <span class="nav-icon">⚙️</span> Settings
      </NuxtLink>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  background: #0f172a;
  color: #94a3b8;
  height: 100vh;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
  padding-left: 0.5rem;
}

.logo-box {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.logo-text {
  color: white;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: -0.01em;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 0.75rem;
  text-decoration: none;
  color: #94a3b8;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.nav-item:hover {
  color: white;
  background: rgba(255, 255, 255, 0.05);
}

.nav-item.active {
  background: #3b82f6;
  color: white;
}

.nav-icon {
  font-size: 1.2rem;
}
</style>
