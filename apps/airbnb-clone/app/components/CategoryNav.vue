<template>
  <section class="categories">
    <div 
      v-for="cat in categories" 
      :key="cat.name"
      class="cat-item"
      :class="{ active: activeCategory === cat.name }"
      @click="activeCategory = cat.name"
    >
      <span class="icon">{{ cat.icon }}</span>
      <span class="label">{{ cat.name }}</span>
    </div>
  </section>
</template>

<script setup>
const activeCategory = useState('activeCategory', () => 'All');

const categories = [
  { name: 'All', icon: '🌍' },
  { name: 'Beachfront', icon: '🏖️' },
  { name: 'Cabins', icon: '🏠' },
  { name: 'Amazing pools', icon: '🏊' },
  { name: 'Treehouses', icon: '🌳' },
  { name: 'Desert', icon: '🌵' },
  { name: 'Mansion', icon: '🏰' },
];
</script>

<style scoped>
.categories {
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding: 2.5rem 5rem;
  border-bottom: 1px solid #f7f7f7;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
}

.categories::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.cat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #717171;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s, color 0.2s;
  flex-shrink: 0;
}

.cat-item:hover, .cat-item.active {
  opacity: 1;
  color: #222;
}

.cat-item.active {
  border-bottom: 2px solid #222;
  padding-bottom: 0.75rem;
}

.cat-item span {
  font-size: 2rem;
}

@media (max-width: 768px) {
  .categories {
    padding: 1.5rem;
    gap: 2rem;
    justify-content: flex-start;
  }
}
</style>
