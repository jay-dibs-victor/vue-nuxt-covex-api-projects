<template>
  <aside class="sidebar" :class="{ 'is-open': isOpen }">
    <div class="sidebar-header">
      <div class="refine-title">REFINE BY</div>
      <button v-if="activeFilterCount > 0" class="reset-btn" @click="resetFilters">CLEAR ALL</button>
      <button class="close-btn" @click="isOpen = false">✕</button>
    </div>

    <!-- Category -->
    <div class="filter-group">
      <div class="group-header" @click="toggleGroup('category')">
        <h4>CATEGORY</h4>
        <span class="chevron" :class="{ up: groups.category }">▼</span>
      </div>
      <div v-show="groups.category" class="options">
        <label v-for="cat in ['Leggings', 'Tops', 'Jackets', 'Shorts']" :key="cat" class="checkbox-label">
          <input 
            type="checkbox" 
            :value="cat.toLowerCase()" 
            :checked="filters.category === cat.toLowerCase()"
            @change="setCategory(filters.category === cat.toLowerCase() ? '' : cat.toLowerCase())" 
          />
          <span>{{ cat }}</span>
        </label>
      </div>
    </div>

    <!-- Size -->
    <div class="filter-group">
      <div class="group-header" @click="toggleGroup('size')">
        <h4>SIZE</h4>
        <span class="chevron" :class="{ up: groups.size }">▼</span>
      </div>
      <div v-show="groups.size" class="options">
        <label v-for="s in ['S', 'M', 'L', 'XL']" :key="s" class="checkbox-label">
          <input type="checkbox" :value="s" :checked="filters.sizes.includes(s)" @change="toggleSize(s)" />
          <span>{{ s }}</span>
        </label>
      </div>
    </div>

    <!-- Color -->
    <div class="filter-group">
      <div class="group-header" @click="toggleGroup('color')">
        <h4>COLOR</h4>
        <span class="chevron" :class="{ up: groups.color }">▼</span>
      </div>
      <div v-show="groups.color" class="options">
        <label v-for="c in colors" :key="c.name" class="checkbox-label">
          <input type="checkbox" :value="c.name" :checked="filters.colors.includes(c.name)" @change="toggleColor(c.name)" />
          <span class="color-swatch" :style="{ background: c.hex }"></span>
          <span>{{ c.name }}</span>
        </label>
      </div>
    </div>

    <!-- Price Range -->
    <div class="filter-group">
      <div class="group-header" @click="toggleGroup('price')">
        <h4>PRICE RANGE</h4>
        <span class="chevron" :class="{ up: groups.price }">▼</span>
      </div>
      <div v-show="groups.price" class="options">
        <p class="price-display">
          ${{ filters.minPrice || 40 }} - ${{ filters.maxPrice || 120 }}+
        </p>
        <div class="price-slider-mock">
          <input 
            type="range" 
            min="0" 
            max="200" 
            step="10" 
            v-model.number="filters.maxPrice"
            class="range-input"
          />
        </div>
      </div>
    </div>

    <!-- Rating -->
    <div class="filter-group">
      <div class="group-header" @click="toggleGroup('rating')">
        <h4>RATING</h4>
        <span class="chevron" :class="{ up: groups.rating }">▼</span>
      </div>
      <div v-show="groups.rating" class="options">
        <label v-for="r in [5, 4, 3]" :key="r" class="checkbox-label rating-label" @click="setMinRating(r)">
          <div class="stars">
            <span v-for="i in 5" :key="i" class="star" :class="{ active: i <= r }">★</span>
          </div>
          <span class="rating-text">& up</span>
        </label>
      </div>
    </div>
  </aside>

  <button class="filter-toggle" @click="isOpen = true">
    REFINE ({{ activeFilterCount }})
  </button>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useProducts } from '~/composables/useProducts'

const isOpen = ref(false)
const { filters, setCategory, toggleSize, toggleColor, setMinRating, resetFilters } = useProducts()

const groups = reactive({
  category: true,
  size: true,
  color: true,
  price: true,
  rating: true
})

const toggleGroup = (group) => {
  groups[group] = !groups[group]
}

const colors = [
  { name: 'Black', hex: '#111' },
  { name: 'Navy', hex: '#1e3a8a' },
  { name: 'Sage', hex: '#84a59d' },
  { name: 'Slate', hex: '#4b5563' }
]

const activeFilterCount = computed(() => {
  let count = 0
  if (filters.value.category) count++
  if (filters.value.sizes.length > 0) count++
  if (filters.value.colors.length > 0) count++
  if (filters.value.minPrice !== undefined || filters.value.maxPrice !== undefined) count++
  if (filters.value.minRating !== undefined) count++
  return count
})
</script>

<style scoped>
.sidebar {
  padding-right: 1.5rem;
  border-right: 1px solid #eee;
  height: fit-content;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.refine-title {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.reset-btn {
  background: none;
  border: none;
  font-size: 0.7rem;
  font-weight: 600;
  color: #111;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
}

.filter-group {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #f9f9f9;
  padding-bottom: 1rem;
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1rem;
}

.group-header h4 {
  font-size: 0.75rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: 0.5px;
}

.chevron {
  font-size: 0.6rem;
  transition: transform 0.3s;
  color: #999;
}

.chevron.up {
  transform: rotate(180deg);
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.85rem;
  color: #444;
  cursor: pointer;
}

.checkbox-label input {
  width: 18px;
  height: 18px;
  border: 1px solid #ddd;
  border-radius: 2px;
  accent-color: #111;
  cursor: pointer;
}

.color-swatch {
  width: 14px;
  height: 14px;
  border-radius: 2px;
  border: 1px solid rgba(0,0,0,0.1);
}

.price-display {
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.range-input {
  width: 100%;
  accent-color: #111;
}

.stars {
  display: flex;
  gap: 2px;
  color: #ddd;
}

.star.active {
  color: #fbbf24;
}

.rating-label {
  transition: opacity 0.2s;
}

.rating-label:hover {
  opacity: 0.7;
}

.rating-text {
  font-size: 0.75rem;
  color: #999;
}

.close-btn {
  display: none;
}

.filter-toggle {
  display: none;
  background: #111;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0;
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  font-weight: 800;
  font-size: 0.8rem;
  letter-spacing: 2px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

@media (max-width: 1024px) {
  .sidebar {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 320px;
    height: 100vh;
    background: white;
    padding: 2rem;
    z-index: 200;
    overflow-y: auto;
    border-right: none;
  }
  .sidebar.is-open {
    display: block;
  }
  .close-btn {
    display: block;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }
  .filter-toggle {
    display: block;
  }
}
</style>
