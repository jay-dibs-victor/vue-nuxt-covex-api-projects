<template>
  <div class="ecommerce-app">
    <header class="header">
      <div class="logo">VELOCITY ACTIVE</div>
      <nav class="nav">
        <a href="#">MEN</a> | <a href="#">WOMEN</a> | <a href="#">CART (0)</a>
      </nav>
    </header>
    <main class="container layout">
      <aside class="sidebar">
        <h3>Filters</h3>
        <div class="filter-group">
          <h4>Category</h4>
          <label><input type="checkbox" /> Tops</label>
          <label><input type="checkbox" /> Bottoms</label>
        </div>
      </aside>
      <section class="catalog">
        <h3>Catalog</h3>
        <div class="grid">
          <div v-for="i in 4" :key="i" class="card">
            <div class="img-wrap">
              <img :src="`https://images.unsplash.com/photo-${1515886657613 + i}?auto=format&fit=crop&q=80&w=400`" alt="Product" />
            </div>
            <h4>Apex Joggers {{i}}</h4>
            <p>$58.00</p>
            <button class="btn">Add to Cart</button>
          </div>
        </div>
      </section>

    </main>

  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Outfit:wght@800&display=swap');

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.logo {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  letter-spacing: 2px;
}

.nav a {
  text-decoration: none;
  color: #111;
  font-weight: 600;
}

.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 3rem;
  padding: 3rem 0;
}

.sidebar h3 {
  font-size: 0.8rem;
  text-transform: uppercase;
  border-bottom: 2px solid #111;
  padding-bottom: 0.5rem;
}

.filter-group {
  margin-top: 2rem;
}

.filter-group h4 {
  font-size: 0.75rem;
  color: #666;
}

.filter-group label {
  display: block;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.img-wrap {
  aspect-ratio: 4/5;
  background: #f7f7f7;
  overflow: hidden;
}

.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card h4 {
  margin-top: 1rem;
  font-size: 0.9rem;
}

.card p {
  font-weight: bold;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  background: #1e3a8a;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
}
</style>


