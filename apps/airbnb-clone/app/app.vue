<template>
  <div class="airbnb-app">
    <header class="header">
      <div class="header-container">
        <div class="logo">StaySphere</div>
        <nav class="nav-links">
          <a href="#" class="active">Places to stay</a>
          <a href="#">Experiences</a>
          <a href="#">Online Experiences</a>
        </nav>
        <div class="user-menu">
          <a href="#" class="host-link">Become a Host</a>
          <button class="globe">🌐</button>
          <div class="profile-pill">
            <span>☰</span>
            <div class="user-avatar">👤</div>
          </div>
        </div>
      </div>
    </header>
    
    <main class="main">
      <section class="hero">
        <div class="hero-image-wrap">
          <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=2000" alt="Lake House" />
          <div class="hero-overlay-content">
            <div class="search-container">
              <div class="search-item">
                <span class="label">Location</span>
                <input type="text" placeholder="Where to?" />
              </div>
              <div class="sep"></div>
              <div class="search-item">
                <span class="label">Check in</span>
                <span class="val">Add dates</span>
              </div>
              <div class="sep"></div>
              <div class="search-item">
                <span class="label">Check out</span>
                <span class="val">Add dates</span>
              </div>
              <div class="sep"></div>
              <div class="search-item">
                <span class="label">Guests</span>
                <span class="val">Add guests</span>
              </div>
              <button class="search-action">🔍</button>
            </div>
            <h2>Discover your next adventure.</h2>
          </div>
        </div>
      </section>

      <section class="categories">
        <div class="cat-item active">🏠 <span>Cabins</span></div>
        <div class="cat-item">🏊 <span>Pools</span></div>
        <div class="cat-item">🏝️ <span>Islands</span></div>
        <div class="cat-item">🏙️ <span>Cities</span></div>
        <div class="cat-item">🏞️ <span>Parks</span></div>
      </section>

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
    </main>
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@700;800&display=swap');

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  color: #222;
  background: white;
}

.header {
  border-bottom: 1px solid #ebebeb;
  padding: 1rem 0;
  background: white;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  color: #ff385c;
  font-size: 1.5rem;
  letter-spacing: -0.04em;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #222;
  font-weight: 500;
  font-size: 0.95rem;
}

.nav-links a.active {
  border-bottom: 2px solid #222;
  padding-bottom: 0.5rem;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.host-link {
  text-decoration: none;
  color: #222;
  font-weight: 600;
  font-size: 0.9rem;
}

.profile-pill {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid #ddd;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.profile-pill:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero {
  padding: 0 5rem;
  margin-top: 2rem;
}

.hero-image-wrap {
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  height: 550px;
}

.hero-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
}

.search-container {
  background: white;
  border-radius: 3rem;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem 0.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 850px;
}

.search-item {
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  flex: 1;
}

.search-item .label {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #222;
}

.search-item input {
  border: none;
  outline: none;
  font-size: 0.85rem;
  margin-top: 0.2rem;
}

.search-item .val {
  font-size: 0.85rem;
  color: #717171;
  margin-top: 0.2rem;
}

.sep {
  width: 1px;
  height: 32px;
  background: #ebebeb;
}

.search-action {
  background: #ff385c;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.search-action:hover {
  transform: scale(1.05);
}

.hero-overlay-content h2 {
  font-family: 'Outfit', sans-serif;
  color: white;
  font-size: 3.5rem;
  font-weight: 800;
  margin-top: auto;
  margin-bottom: 5rem;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.04em;
}

.categories {
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding: 2.5rem 5rem;
  border-bottom: 1px solid #f7f7f7;
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
}
</style>
