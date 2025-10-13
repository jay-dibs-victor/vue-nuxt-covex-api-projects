<template>
  <div v-if="property" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="$emit('close')">✕</button>
      
      <div class="property-layout">
        <div class="main-info">
          <div class="image-gallery">
            <img v-for="(img, i) in property.images" :key="i" :src="img" :alt="property.title" />
          </div>
          
          <div class="details-text">
            <h1>{{ property.title }}</h1>
            <div class="meta">
              <span>{{ property.rating }} ★</span>
              <span>•</span>
              <span>{{ property.reviewsCount }} reviews</span>
              <span>•</span>
              <span>{{ property.location }}</span>
            </div>
            
            <div class="divider"></div>
            
            <div class="description">
              <h3>About this place</h3>
              <p>{{ property.description }}</p>
            </div>
            
            <div class="amenities">
              <h3>What this place offers</h3>
              <ul>
                <li v-for="a in property.amenities" :key="a">{{ a }}</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="sticky-sidebar">
          <BookingWidget :property="property" @success="$emit('booking-success')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BookingWidget from './BookingWidget.vue';
defineProps(['property']);
defineEmits(['close', 'booking-success']);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(8px);
}

.modal-content {
  background: white;
  width: 90%;
  max-width: 1120px;
  height: 90vh;
  border-radius: 1rem;
  padding: 3rem;
  position: relative;
  overflow-y: auto;
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  z-index: 10;
}

.property-layout {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 4rem;
}

.image-gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.image-gallery img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 0.75rem;
}

.details-text h1 {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.meta {
  display: flex;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #222;
}

.divider {
  height: 1px;
  background: #ebebeb;
  margin: 2rem 0;
}

.description h3, .amenities h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.description p {
  line-height: 1.6;
  color: #484848;
}

.amenities ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  list-style: none;
  padding: 0;
}

.amenities li {
  font-size: 1rem;
  color: #222;
}

.sticky-sidebar {
  position: sticky;
  top: 0;
}

@media (max-width: 1024px) {
  .property-layout {
    grid-template-columns: 1fr;
  }
  .sticky-sidebar {
    position: static;
  }
}
</style>
