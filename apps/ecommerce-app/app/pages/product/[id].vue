<template>
  <div v-if="product" class="container product-page">
    <div class="product-layout">
      <!-- Image Gallery -->
      <div class="gallery">
        <div class="main-img">
          <img :src="product.images[selectedImgIndex]" :alt="product.name" />
        </div>
        <div class="thumbnails">
          <button 
            v-for="(img, idx) in product.images" 
            :key="idx"
            class="thumb"
            :class="{ active: idx === selectedImgIndex }"
            @click="selectedImgIndex = idx"
          >
            <img :src="img" alt="Thumbnail" />
          </button>
        </div>
      </div>

      <!-- Info -->
      <div class="info">
        <div class="breadcrumb">SHOP / {{ product.category.toUpperCase() }}</div>
        <h1>{{ product.name.toUpperCase() }}</h1>
        
        <div class="rating-row">
          <StarRating :rating="product.rating" :count="product.reviewCount" showCount />
        </div>

        <div class="price-row">
          <span class="price">${{ product.price.toFixed(2) }}</span>
          <span v-if="product.comparePrice" class="compare">${{ product.comparePrice.toFixed(2) }}</span>
        </div>

        <p class="description">{{ product.description }}</p>

        <div class="selectors">
          <!-- Colors -->
          <div class="selector-group">
            <label>COLOR: <span>{{ selectedColor }}</span></label>
            <div class="color-options">
              <button 
                v-for="c in product.colors" 
                :key="c"
                class="color-btn"
                :class="{ active: c === selectedColor }"
                :style="{ background: c }"
                @click="selectedColor = c"
              ></button>
            </div>
          </div>

          <!-- Sizes -->
          <div class="selector-group">
            <label>SIZE: <span>{{ selectedSize }}</span></label>
            <div class="size-options">
              <button 
                v-for="s in product.sizes" 
                :key="s"
                class="size-btn"
                :class="{ active: s === selectedSize }"
                @click="selectedSize = s"
              >
                {{ s }}
              </button>
            </div>
          </div>
        </div>

        <div class="actions">
          <button class="add-btn" @click="handleAddToCart">
            ADD TO CART — ${{ product.price.toFixed(2) }}
          </button>
          <button class="wish-btn">♡</button>
        </div>

        <div class="features">
          <div class="feature">
            <span class="icon">🚚</span>
            <div>
              <strong>Free Shipping</strong>
              <p>On orders over $100</p>
            </div>
          </div>
          <div class="feature">
            <span class="icon">🔄</span>
            <div>
              <strong>Free Returns</strong>
              <p>Within 30 days of purchase</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else-if="loading" class="container loading">
    <p>Loading product details...</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProduct } from '~/composables/useProducts'
import { useCart } from '~/composables/useCart'

const route = useRoute()
const { product, loading } = useProduct(route.params.id)
const { addToCart } = useCart()

const selectedImgIndex = ref(0)
const selectedColor = ref('')
const selectedSize = ref('')

watch(product, (p) => {
  if (p) {
    selectedColor.value = p.colors[0]
    selectedSize.value = p.sizes[0]
  }
}, { immediate: true })

const handleAddToCart = () => {
  addToCart({
    productId: product.value._id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.images[0],
    size: selectedSize.value,
    color: selectedColor.value
  })
  window.$toast?.add(`Added ${product.value.name} to cart!`)
}
</script>

<style scoped>
.product-page {
  padding: 4rem 0;
}

.product-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 5rem;
}

.gallery {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.main-img {
  aspect-ratio: 4/5;
  background: #f7f7f7;
  overflow: hidden;
}

.main-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnails {
  display: flex;
  gap: 1rem;
}

.thumb {
  width: 80px;
  aspect-ratio: 1;
  border: 1px solid #eee;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  background: none;
}

.thumb.active {
  border-color: #111;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  max-width: 500px;
}

.breadcrumb {
  font-size: 0.7rem;
  font-weight: 800;
  color: #999;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

h1 {
  font-family: 'Outfit', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  letter-spacing: -0.5px;
}

.rating-row {
  margin-bottom: 2rem;
}

.price-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.price {
  font-size: 1.75rem;
  font-weight: 800;
}

.compare {
  font-size: 1.25rem;
  color: #999;
  text-decoration: line-through;
}

.description {
  font-size: 1rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 3rem;
}

.selector-group {
  margin-bottom: 2.5rem;
}

.selector-group label {
  display: block;
  font-size: 0.75rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.selector-group label span {
  color: #999;
  font-weight: 400;
  margin-left: 0.5rem;
}

.color-options {
  display: flex;
  gap: 0.75rem;
}

.color-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
}

.color-btn.active {
  border-color: #111;
  box-shadow: 0 0 0 2px white inset;
}

.size-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.size-btn {
  min-width: 60px;
  height: 48px;
  background: white;
  border: 1px solid #eee;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.size-btn:hover {
  border-color: #111;
}

.size-btn.active {
  background: #111;
  color: white;
  border-color: #111;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;
}

.add-btn {
  flex: 1;
  padding: 1.25rem;
  background: #111;
  color: white;
  border: none;
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: background 0.2s;
}

.add-btn:hover {
  background: #333;
}

.wish-btn {
  width: 60px;
  background: white;
  border: 1px solid #eee;
  font-size: 1.5rem;
  cursor: pointer;
}

.features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding-top: 3rem;
  border-top: 1px solid #eee;
}

.feature {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.feature .icon {
  font-size: 1.25rem;
}

.feature strong {
  display: block;
  font-size: 0.85rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
}

.feature p {
  margin: 0;
  font-size: 0.75rem;
  color: #999;
}

@media (max-width: 1024px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .info {
    max-width: 100%;
  }
}
</style>
