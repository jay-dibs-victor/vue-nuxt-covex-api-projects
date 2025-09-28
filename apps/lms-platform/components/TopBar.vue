<template>
  <header class="header">
    <button class="mobile-menu-btn" @click="$emit('open-sidebar')">☰</button>
    <div class="search-bar">
      <span>🔍</span>
      <input type="text" placeholder="Search courses, modules..." />
    </div>
    <div class="user-info">
      <div class="user-text">
        <strong>Sarah Davis</strong>
        <span>Data Science Student</span>
      </div>
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="User" />
    </div>
  </header>
</template>

<script setup>
defineEmits(['open-sidebar'])
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  gap: 1rem;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.search-bar {
  display: flex;
  align-items: center;
  background: white;
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  width: 400px;
  max-width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.search-bar input {
  border: none;
  outline: none;
  margin-left: 0.75rem;
  width: 100%;
  font-size: 0.9rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

.user-text {
  text-align: right;
}

.user-text strong {
  display: block;
  font-size: 0.95rem;
}

.user-text span {
  font-size: 0.8rem;
  color: #64748b;
}

.user-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .search-bar {
    display: none;
  }
  .mobile-menu-btn {
    display: block;
  }
  .header {
    margin-bottom: 1.5rem;
  }
  .user-text {
    display: none;
  }
}
</style>
