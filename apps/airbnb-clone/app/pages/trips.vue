<template>
  <div class="trips-page">
    <h1>Trips</h1>
    
    <div v-if="loading" class="loading-state">
      <div v-for="i in 3" :key="i" class="skeleton-trip"></div>
    </div>
    
    <div v-else-if="bookings?.length === 0" class="empty-state">
      <div class="empty-content">
        <h2>No trips booked... yet!</h2>
        <p>Time to dust off your bags and start planning your next adventure.</p>
        <NuxtLink to="/" class="explore-btn">Start searching</NuxtLink>
      </div>
    </div>

    <div v-else class="bookings-list">
      <div v-for="booking in bookings" :key="booking._id" class="booking-card">
        <img :src="booking.property.images[0]" :alt="booking.property.title" class="trip-img" />
        <div class="trip-info">
          <div class="trip-header">
            <h3>{{ booking.property.title }}</h3>
            <span class="status" :class="booking.status">{{ booking.status }}</span>
          </div>
          <p class="location">{{ booking.property.location }}</p>
          <p class="dates">{{ formatDate(booking.startDate) }} - {{ formatDate(booking.endDate) }}</p>
          <p class="price">Total: <strong>${{ booking.totalAmount }}</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useConvexQuery } from '~/composables/useConvex';

const userId = useCookie('airbnb_user_id');
const { data: bookings, loading } = useConvexQuery("bookings:getUserBookings", computed(() => ({
  userId: userId.value
})));

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
</script>

<style scoped>
.trips-page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 5rem;
}

h1 {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  margin-bottom: 2.5rem;
}

.bookings-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.booking-card {
  border: 1px solid #ddd;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.booking-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.trip-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.trip-info {
  padding: 1.25rem;
}

.trip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.trip-info h3 {
  font-size: 1.1rem;
  margin: 0;
}

.status {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.status.confirmed { background: #e6fcf5; color: #0ca678; }
.status.pending { background: #fff9db; color: #f08c00; }

.location {
  color: #717171;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.dates {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 5rem 0;
}

.explore-btn {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid #222;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #222;
  font-weight: 600;
  transition: background 0.2s;
}

.explore-btn:hover {
  background: #f7f7f7;
}

@media (max-width: 768px) {
  .trips-page { padding: 2rem 1.5rem; }
}
</style>
