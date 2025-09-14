<template>
  <div class="listing-grid">
    <div v-for="prop in listings" :key="prop.id" class="listing-card">
      <div class="img-container">
        <img :src="prop.image" :alt="prop.title" />
        <button class="heart">❤️</button>
        <div class="badge" v-if="prop.badge">{{ prop.badge }}</div>
      </div>
      <div class="listing-details">
        <div class="listing-header">
          <h3>{{ prop.title }}</h3>
          <div class="rating">⭐ {{ prop.rating }}</div>
        </div>
        <p class="details">{{ prop.details }}</p>
        <p class="dates">{{ prop.dates }}</p>
        <p class="price"><strong>${{ prop.price }}</strong> / night</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const listings = ref([
  { id: 1, title: 'Cozy Mountain Retreat', price: 285, rating: 4.91, details: '500 miles away', dates: 'Oct 18-23', image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=600', badge: 'Guest Favorite' },
  { id: 2, title: 'Luxury Oceanfront Villa', price: 750, rating: 4.98, details: '1,200 miles away', dates: 'Nov 12-17', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600', badge: 'Superhost' },
  { id: 3, title: 'Skylight Treehouse', price: 320, rating: 4.85, details: '300 miles away', dates: 'Dec 5-10', image: 'https://images.unsplash.com/photo-1449156001433-469b69843f32?auto=format&fit=crop&q=80&w=600' },
  { id: 4, title: 'Stylish Loft', price: 410, rating: 4.79, details: '10 miles away', dates: 'Oct 25-30', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600' }
])
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

@media (max-width: 768px) {
  .listing-grid {
    padding: 2rem 1.5rem 5rem;
    gap: 1.5rem;
  }
}
</style>
