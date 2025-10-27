<template>
  <section class="hero">
    <div class="hero-content">
      <span class="badge">New Season Drop</span>
      <h1>UNLEASH YOUR <br /><span class="accent">VELOCITY</span></h1>
      <p>High-performance activewear engineered for the modern athlete. Push your limits with our latest drop.</p>
      <div class="actions">
        <button class="primary" @click="scrollToProducts">Shop Collection</button>
        <button class="secondary">View Lookbook</button>
      </div>
    </div>
    <div class="hero-visual">
      <div class="gradient-bg"></div>
      <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200" alt="Athlete training" />
    </div>
  </section>
</template>

<script setup>
const scrollToProducts = () => {
  const el = document.querySelector('.catalog');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 80vh;
  align-items: center;
  gap: 4rem;
  padding: 4rem 0;
}

.hero-content {
  max-width: 600px;
}

.badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

h1 {
  font-family: 'Outfit', sans-serif;
  font-size: 5rem;
  line-height: 0.9;
  font-weight: 800;
  margin: 0 0 2rem 0;
  letter-spacing: -2px;
}

.accent {
  background: linear-gradient(90deg, #111, #666);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  font-size: 1.125rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 3rem;
}

.actions {
  display: flex;
  gap: 1.5rem;
}

button {
  padding: 1.25rem 2.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary {
  background: #111;
  color: white;
  border: none;
}

.primary:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.secondary {
  background: transparent;
  color: #111;
  border: 2px solid #111;
}

.secondary:hover {
  background: #111;
  color: white;
}

.hero-visual {
  position: relative;
  height: 100%;
  border-radius: 1.5rem;
  overflow: hidden;
}

.gradient-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top right, rgba(0,0,0,0.05), transparent);
  z-index: 1;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 1024px) {
  h1 { font-size: 4rem; }
  .hero { gap: 2rem; }
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 2rem 0;
  }
  .hero-content {
    margin: 0 auto;
  }
  h1 { font-size: 3.5rem; }
  .actions { justify-content: center; }
  .hero-visual { height: 400px; order: -1; }
}
</style>
