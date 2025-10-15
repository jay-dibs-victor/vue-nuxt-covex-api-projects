<template>
  <div class="listing-grid-container">
    <div class="listing-grid" v-if="listings?.length">
      <div v-for="prop in listings" :key="prop._id" class="listing-card" @click="selectedProperty = prop">
        <div class="img-container">
          <img :src="prop.images[0]" :alt="prop.title" />
          <button class="heart" @click.stop>❤️</button>
          <div class="badge" v-if="prop.rating > 4.9">Guest Favorite</div>
        </div>
        <div class="listing-details">
          <div class="listing-header">
            <h3>{{ prop.title }}</h3>
            <div class="rating">⭐ {{ prop.rating }}</div>
          </div>
          <p class="details">{{ prop.location }}</p>
          <p class="dates">Available now</p>
          <p class="price"><strong>${{ prop.price }}</strong> / night</p>
        </div>
      </div>
    </div>
    
    <div v-else-if="error" class="error-state">
      <p>Failed to load listings. Please try again later.</p>
    </div>
    
    <div v-else class="skeleton-grid">
      <div v-for="i in 8" :key="i" class="skeleton-card">
        <div class="skeleton-img"></div>
        <div class="skeleton-line title"></div>
        <div class="skeleton-line subtitle"></div>
        <div class="skeleton-line price"></div>
      </div>
    </div>

    <!-- Details Modal -->
    <PropertyDetailsModal 
      v-if="selectedProperty" 
      :property="selectedProperty" 
      @close="selectedProperty = null"
      @booking-success="selectedProperty = null"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useConvexQuery } from '~/composables/useConvex';
import PropertyDetailsModal from './PropertyDetailsModal.vue';

const selectedProperty = ref(null);
const activeCategory = useState('activeCategory');
const { data: listings, error } = useConvexQuery(
  "properties:getProperties", 
  computed(() => ({ category: activeCategory.value }))
);
</script>

<style scoped>
.listing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 5rem 5rem;
}

.listing-card {
  cursor: pointer;
}

.img-container {
  position: relative;
  aspect-ratio: 1;
  border-radius: 0.75rem;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.listing-card:hover .img-container img {
  transform: scale(1.05);
}

.heart {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.listing-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.2rem;
}

.listing-header h3 {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0;
}

.rating {
  font-size: 0.9rem;
}

.details, .dates {
  font-size: 0.9rem;
  color: #717171;
  margin: 0.1rem 0;
}

.price {
  margin-top: 0.4rem;
  font-size: 0.95rem;
  margin-bottom: 0;
}

.error-state {
  text-align: center;
  padding: 5rem;
  color: #717171;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 5rem 5rem;
}

.skeleton-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skeleton-img {
  aspect-ratio: 1;
  background: #f1f5f9;
  border-radius: 0.75rem;
  animation: pulse 1.5s infinite;
}

.skeleton-line {
  height: 12px;
  background: #f1f5f9;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

.skeleton-line.title { width: 70%; }
.skeleton-line.subtitle { width: 40%; }
.skeleton-line.price { width: 30%; margin-top: 0.5rem; }

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

@media (max-width: 768px) {
  .listing-grid {
    padding: 2rem 1.5rem 5rem;
    gap: 1.5rem;
  }
}
</style>
