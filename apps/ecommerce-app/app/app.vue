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
        <div class="grid">Product Cards here</div>
      </section>
    </main>

  </div>
</template>

<style>
.header { display: flex; justify-content: space-between; padding: 1.5rem; border-bottom: 1px solid #eee; }
.logo { font-weight: 800; letter-spacing: 2px; }
.nav a { text-decoration: none; color: #111; font-weight: 600; }
</style>

