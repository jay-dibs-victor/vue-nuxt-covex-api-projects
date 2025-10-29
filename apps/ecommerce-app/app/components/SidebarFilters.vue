<template>
  <aside class="sidebar" :class="{ 'is-open': isOpen }">
    <div class="sidebar-header">
      <h3>Filters</h3>
      <button class="reset-btn" @click="resetFilters">Reset All</button>
      <button class="close-btn" @click="isOpen = false">✕</button>
    </div>

    <div class="filter-group">
      <h4>Gender</h4>
      <div class="options">
        <label v-for="g in ['men', 'women']" :key="g" class="checkbox-label">
          <input type="radio" name="gender" :value="g" v-model="filters.gender" />
          <span>{{ g.charAt(0).toUpperCase() + g.slice(1) }}</span>
        </label>
        <label class="checkbox-label">
          <input type="radio" name="gender" value="" v-model="filters.gender" />
          <span>All</span>
        </label>
      </div>
    </div>

    <div class="filter-group">
      <h4>Category</h4>
      <div class="options">
        <label v-for="cat in ['tops', 'bottoms', 'outerwear', 'accessories']" :key="cat" class="checkbox-label">
          <input type="radio" name="category" :value="cat" v-model="filters.category" />
          <span>{{ cat.charAt(0).toUpperCase() + cat.slice(1) }}</span>
        </label>
        <label class="checkbox-label">
          <input type="radio" name="category" value="" v-model="filters.category" />
          <span>All</span>
        </label>
      </div>
    </div>

    <div class="filter-group">
      <h4>Price Range</h4>
      <div class="price-inputs">
        <div class="input-wrap">
          <span>$</span>
          <input type="number" placeholder="Min" v-model.number="filters.minPrice" />
        </div>
        <div class="input-wrap">
          <span>$</span>
          <input type="number" placeholder="Max" v-model.number="filters.maxPrice" />
        </div>
      </div>
    </div>

    <div class="filter-group">
      <h4>Sort By</h4>
      <select v-model="filters.sortBy" class="sort-select">
        <option value="featured">Featured</option>
        <option value="newest">New Arrivals</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>
    </div>
  </aside>

  <button class="filter-toggle" @click="isOpen = true">
    Filters ({{ activeFilterCount }})
  </button>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProducts } from '~/composables/useProducts'

const isOpen = ref(false)
const { filters, resetFilters } = useProducts()

const activeFilterCount = computed(() => {
  let count = 0
  if (filters.value.gender) count++
  if (filters.value.category) count++
  if (filters.value.minPrice !== undefined) count++
  if (filters.value.maxPrice !== undefined) count++
  if (filters.value.sortBy !== 'featured') count++
  return count
})
</script>

<style scoped>
.sidebar {
  padding-right: 1rem;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #111;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
}

.sidebar-header h3 {
  font-size: 0.8rem;
  text-transform: uppercase;
  margin: 0;
}

.reset-btn {
  background: none;
  border: none;
  font-size: 0.7rem;
  color: #666;
  text-decoration: underline;
  cursor: pointer;
}

.filter-group {
  margin-bottom: 2.5rem;
}

.filter-group h4 {
  font-size: 0.75rem;
  color: #111;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: #666;
  cursor: pointer;
}

.checkbox-label input {
  width: 16px;
  height: 16px;
  accent-color: #111;
}

.price-inputs {
  display: flex;
  gap: 0.75rem;
}

.input-wrap {
  position: relative;
  flex: 1;
}

.input-wrap span {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.85rem;
  color: #999;
}

.input-wrap input {
  width: 100%;
  padding: 0.6rem 0.6rem 0.6rem 1.5rem;
  border: 1px solid #eee;
  border-radius: 0.4rem;
  font-size: 0.85rem;
}

.sort-select {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #eee;
  border-radius: 0.4rem;
  font-size: 0.85rem;
  background: white;
}

.close-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
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
    width: 300px;
    height: 100vh;
    background: white;
    padding: 2rem;
    box-shadow: 2px 0 20px rgba(0,0,0,0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 200;
    overflow-y: auto;
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
