<template>
  <section class="categories">
    <div class="cat-item active">🏠 <span>Cabins</span></div>
    <div class="cat-item">🏊 <span>Pools</span></div>
    <div class="cat-item">🏝️ <span>Islands</span></div>
    <div class="cat-item">🏙️ <span>Cities</span></div>
    <div class="cat-item">🏞️ <span>Parks</span></div>
  </section>
</template>

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
