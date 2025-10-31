<template>
  <section class="catalog">
    <div class="catalog-header">
      <div class="results-info">
        <h3>SHOP THE COLLECTION</h3>
        <span class="count" v-if="!loading">({{ products?.length || 0 }} Items)</span>
      </div>
      
      <div class="view-options">
        <div class="sort">
          <span>Sort by:</span>
          <select v-model="filters.sortBy" class="minimal-select">
            <option value="featured">Featured</option>
            <option value="newest">New Arrivals</option>
            <option value="price_asc">Price: Low-High</option>
            <option value="price_desc">Price: High-Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="loading" class="grid-loading">
      <div v-for="i in 6" :key="i" class="skeleton-card">
        <div class="skeleton-img"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text short"></div>
      </div>
    </div>

    <div v-else-if="products?.length > 0" class="grid">
      <div v-for="product in products" :key="product._id" class="card">
        <div class="img-wrap" @click="goToProduct(product._id)">
          <img :src="product.images[0]" :alt="product.name" />
          <div class="quick-view">Quick View</div>
          <div v-if="product.isNew" class="new-badge">NEW</div>
        </div>
        
        <div class="product-info">
          <div class="brand-title">VELOCITY ACTIVE</div>
          <h4 @click="goToProduct(product._id)">{{ product.name.toUpperCase() }}</h4>
          
          <div class="meta">
            <div class="price-wrap">
              <span class="price">${{ product.price.toFixed(2) }}</span>
              <span v-if="product.comparePrice" class="compare-price">${{ product.comparePrice.toFixed(2) }}</span>
            </div>
            
            <div class="stars">
              <span v-for="i in 5" :key="i" class="star" :class="{ active: i <= Math.round(product.rating || 0) }">★</span>
            </div>
          </div>

          <div class="colors" v-if="product.colors?.length > 0">
            <span 
              v-for="c in product.colors" 
              :key="c" 
              class="color-dot"
              :style="{ background: c }"
            ></span>
          </div>

          <button class="add-to-cart-btn" @click="handleAddToCart(product)">
            ADD TO CART
            <span class="cart-icon">🛒</span>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>No products found matching your filters.</p>
      <button @click="resetFilters">Clear all filters</button>
    </div>
  </section>
</template>

<script setup>
import { useProducts } from '~/composables/useProducts'
import { useCart } from '~/composables/useCart'
import { useRouter } from 'vue-router'

const { products, loading, filters, resetFilters } = useProducts()
const { addToCart } = useCart()
const router = useRouter()

const handleAddToCart = (product) => {
  addToCart({
    productId: product._id,
    name: product.name,
    price: product.price,
    image: product.images[0],
    size: product.sizes[0], // Default to first size
    color: product.colors[0], // Default to first color
  })
}

const goToProduct = (id) => {
  router.push(`/product/${id}`)
}
</script>

<style scoped>
.catalog {
  flex: 1;
}

.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.results-info {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.results-info h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.5px;
}

.count {
  font-size: 0.85rem;
  color: #999;
}

.minimal-select {
  background: none;
  border: none;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0.2rem;
  margin-left: 0.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 3rem 1.5rem;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
}

.img-wrap {
  aspect-ratio: 4/5;
  background: #f7f7f7;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.card:hover .img-wrap img {
  transform: scale(1.05);
}

.quick-view {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
  transform: translateY(100%);
  transition: transform 0.3s;
}

.card:hover .quick-view {
  transform: translateY(0);
}

.new-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: white;
  padding: 0.25rem 0.6rem;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 1px;
}

.product-info {
  padding-top: 1.25rem;
}

.brand-title {
  font-size: 0.65rem;
  font-weight: 800;
  color: #999;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

h4 {
  font-size: 0.85rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  cursor: pointer;
  letter-spacing: 0.5px;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.price {
  font-weight: 800;
  font-size: 0.95rem;
}

.compare-price {
  color: #999;
  text-decoration: line-through;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.stars {
  display: flex;
  gap: 2px;
  color: #ddd;
  font-size: 0.75rem;
}

.star.active {
  color: #fbbf24;
}

.colors {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.color-dot {
  width: 20px;
  height: 20px;
  border-radius: 2px;
  border: 1px solid rgba(0,0,0,0.1);
}

.add-to-cart-btn {
  width: 100%;
  padding: 0.85rem;
  background: #1e3a8a; /* Dark Blue from mockup */
  color: white;
  border: none;
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 1px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: background 0.2s;
}

.add-to-cart-btn:hover {
  background: #172554;
}

.cart-icon {
  font-size: 1rem;
}

/* Skeletons */
.grid-loading {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 3rem 1.5rem;
}

.skeleton-img {
  aspect-ratio: 4/5;
  background: #eee;
  margin-bottom: 1rem;
}

.skeleton-text {
  height: 1rem;
  background: #eee;
  margin-bottom: 0.5rem;
  width: 100%;
}

.skeleton-text.short {
  width: 60%;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1rem;
  }
  .add-to-cart-btn {
    padding: 0.6rem;
    font-size: 0.65rem;
  }
}
</style>
