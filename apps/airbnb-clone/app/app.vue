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
        <div class="hero-image">
          <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=2000" alt="Lake Cabin" />
          <div class="hero-search-overlay">
            <div class="search-box">
              <div class="search-field">
                <span class="label">Location</span>
                <input type="text" placeholder="Where to?" />
              </div>
              <div class="divider"></div>
              <div class="search-field">
                <span class="label">Check-in</span>
                <span class="val">Add dates</span>
              </div>
              <div class="divider"></div>
              <div class="search-field">
                <span class="label">Check-out</span>
                <span class="val">Add dates</span>
              </div>
              <div class="divider"></div>
              <div class="search-field">
                <span class="label">Guests</span>
                <span class="val">Add guests</span>
              </div>
              <button class="search-btn">🔍</button>
            </div>
          </div>
        </div>
        <div class="hero-title-container">
          <h2>Discover your next adventure.</h2>
        </div>
      </section>


      <div class="grid">
        <div v-for="i in 4" :key="i" class="card">
          <div class="img-wrap">
            <img :src="`https://images.unsplash.com/photo-${1518780664697 + i}?auto=format&fit=crop&q=80&w=400`" alt="Property" />
          </div>
          <div class="info">
            <div class="top"><strong>Mountain Cabin {{i}}</strong> <span>⭐ 4.9</span></div>
            <p>500 miles away</p>
            <p><strong>$285</strong> / night</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@700;800&display=swap');

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  color: #222;
}

.header {
  border-bottom: 1px solid #ebebeb;
  padding: 1rem 0;
  background: white;
  position: sticky;
  top: 0;
  z-index: 100;
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
}

.hero {
  position: relative;
  padding: 0 5rem;
  margin-top: 2rem;
}

.hero-image {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  height: 500px;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-search-overlay {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
}

.search-box {
  background: white;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem 0.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  width: 80%;
  max-width: 850px;
}

.search-field {
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  flex: 1;
}

.search-field .label {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

.search-field input {
  border: none;
  outline: none;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.search-field .val {
  font-size: 0.9rem;
  color: #717171;
  margin-top: 0.25rem;
}

.divider {
  width: 1px;
  height: 32px;
  background: #ebebeb;
}

.search-btn {
  background: #ff385c;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}

.hero-title-container {
  margin-top: 2rem;
}

.hero-title-container h2 {
  font-family: 'Outfit', sans-serif;
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
  padding: 4rem 5rem;
}

.card {
  cursor: pointer;
}

.img-wrap {
  aspect-ratio: 1;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info .top {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1rem;
}

.info p {
  margin: 0.25rem 0;
  color: #717171;
  font-size: 0.95rem;
}
</style>
