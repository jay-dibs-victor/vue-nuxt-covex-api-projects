<template>
  <section class="hero">
    <div class="hero-image-wrap">
      <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=2000" alt="Lake House" />
      <div class="hero-overlay-content">
        <div class="search-container">
          <div class="search-item">
            <span class="label">Location</span>
            <input type="text" placeholder="Where to?" />
          </div>
          <div class="sep date-guest"></div>
          <div class="search-item date-guest">
            <span class="label">Check in</span>
            <span class="val">Add dates</span>
          </div>
          <div class="sep date-guest"></div>
          <div class="search-item date-guest">
            <span class="label">Check out</span>
            <span class="val">Add dates</span>
          </div>
          <div class="sep date-guest"></div>
          <div class="search-item date-guest">
            <span class="label">Guests</span>
            <span class="val">Add guests</span>
          </div>
          <button class="search-action">🔍</button>
        </div>
        <h2>Discover your next adventure.</h2>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
  text-align: center;
}

@media (max-width: 1024px) {
  .hero {
    padding: 0 2rem;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 0 1.5rem;
  }
  .search-container {
    padding: 0.5rem;
  }
  .date-guest {
    display: none;
  }
  .hero-overlay-content h2 {
    font-size: 2.5rem;
  }
}
</style>
