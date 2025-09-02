<template>
  <div class="airbnb-app">
    <header class="header">
      <div class="logo">StaySphere</div>
      <div class="search-bar">Where to? | Dates | Guests</div>
      <div class="user-pill">☰ 👤</div>
    </header>
    
    <main class="container">
      <section class="hero">
        <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1200" alt="Hero" />
        <div class="hero-text">Discover your next adventure.</div>
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Outfit:wght@700&display=swap');

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  border-bottom: 1px solid #ddd;
}

.logo {
  color: #ff385c;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
}

.search-bar {
  border: 1px solid #ddd;
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
  font-weight: 600;
}

.hero {
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  margin: 2rem 0;
  height: 350px;
}

.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 4rem;
  transform: translateY(-50%);
  color: white;
  font-family: 'Outfit', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  max-width: 400px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.img-wrap {
  aspect-ratio: 1;
  border-radius: 1rem;
  overflow: hidden;
}

.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  margin-top: 0.75rem;
}

.info .top {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
}

.info p {
  margin: 0.25rem 0;
  color: #717171;
  font-size: 0.9rem;
}
</style>



