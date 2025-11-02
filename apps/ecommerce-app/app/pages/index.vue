<template>
  <div class="page-home">
    <HeroBanner />
    
    <div class="container main-layout">
      <SidebarFilters />
      <ProductGrid />
    </div>

    <!-- Featured Section -->
    <section class="container featured-section">
      <div class="section-header">
        <h2>FEATURED FAVORITES</h2>
        <NuxtLink to="/" class="view-all">SHOP ALL →</NuxtLink>
      </div>
      <div class="featured-grid">
        <!-- Reusing ProductGrid logic in a simpler way could go here if needed -->
      </div>
    </section>
  </div>
</template>

<script setup>
// Home page logic if needed
</script>

<style scoped>
.main-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 4rem;
  padding: 4rem 0;
}

.featured-section {
  padding: 6rem 0;
  border-top: 1px solid #eee;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 2rem;
  margin: 0;
}

.view-all {
  font-weight: 700;
  font-size: 0.9rem;
  color: #111;
  text-decoration: none;
  border-bottom: 2px solid #111;
  padding-bottom: 2px;
}

@media (max-width: 1024px) {
  .main-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
