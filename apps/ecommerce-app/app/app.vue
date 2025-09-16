<template>
  <div class="ecommerce-app">
    <Navbar />
    <main class="container layout">
      <SidebarFilters />
      <ProductGrid />
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

.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 3rem;
  padding: 3rem 0;
}

@media (max-width: 1024px) {
  .layout {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
    padding: 2rem 0;
  }
  .container {
    padding: 0 1.5rem;
  }
}
</style>


