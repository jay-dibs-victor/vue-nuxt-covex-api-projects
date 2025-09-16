<template>
  <header class="header">
    <div class="logo">VELOCITY ACTIVE</div>
    <button class="mobile-menu-btn">☰</button>
    <nav class="nav">
      <a href="#">MEN</a>
      <span class="sep">|</span>
      <a href="#">WOMEN</a>
      <span class="sep">|</span>
      <a href="#">CART (0)</a>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eee;
}

.logo {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  letter-spacing: 2px;
  font-size: 1.25rem;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav a {
  text-decoration: none;
  color: #111;
  font-weight: 600;
}

.sep {
  color: #ddd;
}

@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }
  .nav {
    display: none;
  }
  .mobile-menu-btn {
    display: block;
  }
}
</style>
