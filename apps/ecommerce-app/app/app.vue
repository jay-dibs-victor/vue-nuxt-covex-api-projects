<template>
  <div class="ecommerce-app">
    <Navbar />
    
    <main>
      <NuxtPage />
    </main>

    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-brand">
          <div class="logo">VELOCITY ACTIVE</div>
          <p>ENGINEERED FOR THE MODERN ATHLETE.</p>
        </div>
        <div class="footer-links">
          <div class="link-group">
            <h5>SHOP</h5>
            <a href="#">Men</a>
            <a href="#">Women</a>
            <a href="#">New Arrivals</a>
          </div>
          <div class="link-group">
            <h5>HELP</h5>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom container">
        <p>© 2025 VELOCITY ACTIVE. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>

    <!-- Global Components -->
    <CartDrawer />
    <AuthModal />
    <ToastNotification ref="toastRef" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const toastRef = ref(null)

onMounted(() => {
  // Initialize global toast
  if (typeof window !== 'undefined') {
    window.$toast = toastRef.value
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@800&display=swap');

:root {
  --font-main: 'Inter', sans-serif;
  --font-display: 'Outfit', sans-serif;
}

body {
  margin: 0;
  font-family: var(--font-main);
  color: #111;
  background: white;
  -webkit-font-smoothing: antialiased;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

button, input, select {
  font-family: inherit;
}

.footer {
  background: #f9f9f9;
  padding: 6rem 0 2rem 0;
  border-top: 1px solid #eee;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;
}

.footer-brand .logo {
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: 2px;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.footer-brand p {
  font-size: 0.8rem;
  font-weight: 700;
  color: #999;
}

.footer-links {
  display: flex;
  gap: 4rem;
}

.link-group h5 {
  font-size: 0.75rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
}

.link-group a {
  display: block;
  text-decoration: none;
  color: #666;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid #eee;
  font-size: 0.7rem;
  font-weight: 700;
  color: #999;
  text-align: center;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 3rem;
  }
}
</style>
