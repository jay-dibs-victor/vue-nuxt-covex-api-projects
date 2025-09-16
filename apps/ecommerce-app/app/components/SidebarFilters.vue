<template>
  <aside class="sidebar" :class="{ 'is-open': isOpen }">
    <button class="close-btn" @click="isOpen = false">✕</button>
    <h3>Filters</h3>
    <div class="filter-group">
      <h4>Category</h4>
      <label><input type="checkbox" /> Tops</label>
      <label><input type="checkbox" /> Bottoms</label>
    </div>
  </aside>
  <button class="filter-toggle" @click="isOpen = true">Filters</button>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<style scoped>
.sidebar {
  display: block;
}

.sidebar h3 {
  font-size: 0.8rem;
  text-transform: uppercase;
  border-bottom: 2px solid #111;
  padding-bottom: 0.5rem;
}

.filter-group {
  margin-top: 2rem;
}

.filter-group h4 {
  font-size: 0.75rem;
  color: #666;
}

.filter-group label {
  display: block;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.close-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.filter-toggle {
  display: none;
  background: #111;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    background: white;
    padding: 2rem;
    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 100;
  }
  .sidebar.is-open {
    transform: translateX(0);
  }
  .close-btn {
    display: block;
  }
  .filter-toggle {
    display: block;
  }
}
</style>
