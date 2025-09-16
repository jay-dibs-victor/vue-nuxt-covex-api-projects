<template>
  <section class="catalog">
    <div class="catalog-header">
      <h3>New Arrivals</h3>
      <div class="sort">Sort by: <strong>Featured</strong></div>
    </div>
    <div class="grid">
      <div v-for="product in products" :key="product.id" class="card">
        <div class="img-wrap">
          <img :src="product.image" :alt="product.name" />
          <div class="quick-add">
            <button>Quick Add</button>
          </div>
        </div>
        <div class="product-info">
          <h4>{{ product.name }}</h4>
          <p>${{ product.price.toFixed(2) }}</p>
        </div>
        <div class="colors">
          <span v-for="c in product.colors" :key="c" :style="{ background: c }"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([
  { id: 1, name: 'Apex Tech Joggers', price: 88.00, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600', colors: ['#111', '#555', '#ccc'] },
  { id: 2, name: 'Velocity Performance Tee', price: 45.00, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600', colors: ['#fff', '#111'] },
  { id: 3, name: 'Aero Windbreaker', price: 120.00, image: 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&q=80&w=600', colors: ['#e5e7eb', '#3b82f6'] },
  { id: 4, name: 'Strider Running Shorts', price: 55.00, image: 'https://images.unsplash.com/photo-1517070208541-6d8fec9b8178?auto=format&fit=crop&q=80&w=600', colors: ['#111'] },
  { id: 5, name: 'Elevate Training Hoodie', price: 95.00, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600', colors: ['#9ca3af', '#111'] },
  { id: 6, name: 'Core Compression Tights', price: 75.00, image: 'https://images.unsplash.com/photo-1533681473413-58564eb07604?auto=format&fit=crop&q=80&w=600', colors: ['#111'] }
])
</script>

<style scoped>
.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.catalog-header h3 {
  font-size: 1.5rem;
  font-family: 'Outfit', sans-serif;
  margin: 0;
}

.sort {
  font-size: 0.85rem;
  color: #666;
}

.sort strong {
  color: #111;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem 2rem;
}

.card {
  cursor: pointer;
  group: hover;
}

.img-wrap {
  aspect-ratio: 4/5;
  background: #f7f7f7;
  overflow: hidden;
  position: relative;
  border-radius: 0.5rem;
}

.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card:hover .img-wrap img {
  transform: scale(1.05);
}

.quick-add {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.card:hover .quick-add {
  transform: translateY(0);
}

.quick-add button {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border: none;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: background 0.2s;
}

.quick-add button:hover {
  background: white;
}

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 1rem;
}

.product-info h4 {
  font-size: 0.95rem;
  margin: 0;
  font-weight: 600;
  color: #111;
}

.product-info p {
  font-weight: 600;
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

.colors {
  display: flex;
  gap: 0.4rem;
  margin-top: 0.5rem;
}

.colors span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #ddd;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem 1rem;
  }
  .quick-add {
    display: none; /* Hide on mobile to simplify */
  }
}
</style>
