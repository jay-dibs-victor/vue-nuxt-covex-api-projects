<script setup lang="ts">
import { ref } from 'vue'

interface Project {
  id: string
  title: string
  description: string
  image: string
  port: number
  tags: string[]
}

const projects = ref<Project[]>([
  {
    id: 'portfolio',
    title: 'Vue Portfolio App',
    description: 'A personal website to show my skills.',
    image: '/assets/portfolio.png',
    port: 5174,
    tags: ['Vue 3', 'Vite', 'Portfolio']
  },
  {
    id: 'lms',
    title: 'Nuxt JS LMS Platform',
    description: 'A school website for learning online.',
    image: '/assets/lms.png',
    port: 3001,
    tags: ['Nuxt 3', 'Convex', 'AI']
  },
  {
    id: 'airbnb',
    title: 'Airbnb Fullstack Clone',
    description: 'A website to book houses for trips.',
    image: '/assets/airbnb.png',
    port: 3002,
    tags: ['Nuxt 3', 'AWS', 'Convex']
  },
  {
    id: 'ecommerce',
    title: 'Enterprise Ecommerce',
    description: 'An online shop to buy clothes.',
    image: '/assets/ecommerce.png',
    port: 3003,
    tags: ['Nuxt 3', 'Unit Testing', 'CI/CD']
  }
])

const launchProject = (project: Project) => {
  // In a real scenario, this would navigate to the sub-project URL/Port
  window.open(`http://localhost:${project.port}`, '_blank')
}
</script>

<template>
  <div class="showcase-app">
    <header class="main-header">
      <div class="container">
        <div class="logo">V-SHOWCASE</div>
        <nav>
          <a href="#projects">Projects</a>
          <a href="https://github.com/jay-dibs-victor" target="_blank" class="github-link">GitHub</a>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="container">
          <h1 class="hero-title">The Vue <span>Product</span> Ecosystem</h1>
          <p class="hero-subtitle">Exploring the boundaries of Vue 3 and Nuxt through high-fidelity, production-grade applications.</p>
        </div>
      </section>

      <section id="projects" class="projects-grid">
        <div class="container">
          <div class="grid">
            <div v-for="project in projects" :key="project.id" class="project-card">
              <div class="card-image">
                <img :src="project.image" :alt="project.title" />
                <div class="card-overlay">
                  <button @click="launchProject(project)" class="btn-launch">Launch Instance</button>
                </div>
              </div>
              <div class="card-content">
                <div class="card-tags">
                  <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
                <h3 class="card-title">{{ project.title }}</h3>
                <p class="card-desc">{{ project.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="main-footer">
      <div class="container">
        <p>&copy; 2025-2026 Jay-Dibs-Victor. All projects are part of the Vue Showcase Ecosystem.</p>
      </div>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Outfit:wght@400;700&display=swap');

:root {
  --bg-color: #050505;
  --card-bg: #111111;
  --text-primary: #ffffff;
  --text-secondary: #999999;
  --accent-color: #3b82f6;
  --accent-gradient: linear-gradient(135deg, #60a5fa 0%, #a855f7 100%);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-primary);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header */
.main-header {
  padding: 1.5rem 0;
  border-bottom: 1px solid #222;
  position: sticky;
  top: 0;
  background: rgba(5, 5, 5, 0.8);
  backdrop-filter: blur(10px);
  z-index: 100;
}

.main-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

nav a {
  color: var(--text-secondary);
  text-decoration: none;
  margin-left: 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  transition: color 0.3s;
}

nav a:hover {
  color: var(--text-primary);
}

/* Hero */
.hero {
  padding: 8rem 0 4rem;
  text-align: center;
}

.hero-title {
  font-family: 'Outfit', sans-serif;
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  letter-spacing: -0.04em;
}

.hero-title span {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
}

/* Grid */
.projects-grid {
  padding: 4rem 0 8rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
}

.project-card {
  background: var(--card-bg);
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid #222;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.project-card:hover {
  transform: translateY(-10px);
  border-color: #444;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

.card-image {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .card-image img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.card-image:hover .card-overlay {
  opacity: 1;
}

.btn-launch {
  padding: 0.75rem 1.5rem;
  background: var(--text-primary);
  color: var(--bg-color);
  border: none;
  border-radius: 2rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-launch:hover {
  transform: scale(1.05);
}

.card-content {
  padding: 1.5rem;
}

.card-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--accent-color);
  background: rgba(59, 130, 246, 0.1);
  padding: 0.25rem 0.6rem;
  border-radius: 0.5rem;
}

.card-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.card-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Footer */
.main-footer {
  padding: 4rem 0;
  border-top: 1px solid #222;
  text-align: center;
}

.main-footer p {
  color: #555;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
}
</style>
