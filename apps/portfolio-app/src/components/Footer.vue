<template>
  <footer class="footer-premium">
    <div class="footer-container">
      <!-- Top Section: Brand & Description -->
      <div class="footer-top">
        <div class="footer-brand">
          <h2 class="footer-logo">V-Portfolio</h2>
          <p class="footer-tagline">Crafting digital experiences with precision and passion. Continuing the journey from 2025.</p>
        </div>
        <div class="footer-socials">
          <a href="#" class="social-icon"><span>GH</span></a>
          <a href="#" class="social-icon"><span>LI</span></a>
          <a href="#" class="social-icon"><span>TW</span></a>
        </div>
      </div>

      <!-- Middle Section: Project Links Grid -->
      <div class="footer-grid">
        <div v-for="(chunk, colIndex) in projectChunks" :key="colIndex" class="footer-col">
          <h3 class="footer-heading">Showcase {{ colIndex + 1 }}</h3>
          <ul class="footer-links">
            <li v-for="project in chunk" :key="project.id">
              <router-link :to="`/projects/${project.id}`" class="footer-link">
                {{ project.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="footer-bottom">
        <p class="copyright">© {{ new Date().getFullYear() }} Jay-Dibs-Victor. Built with Vue 3 & Nuxt. All Rights Reserved.</p>
        <div class="footer-meta">
          <span class="meta-item">Privacy Policy</span>
          <span class="meta-item">Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import projectsData from "../data/projects.json";

export default {
  name: "MegaFooter",
  data() {
    return {
      projects: projectsData.slice(0, 18) // first 18 projects for 6 cols of 3
    };
  },
  computed: {
    projectChunks() {
      const chunkSize = 3;
      const chunks = [];
      for (let i = 0; i < this.projects.length; i += chunkSize) {
        chunks.push(this.projects.slice(i, i + chunkSize));
      }
      return chunks;
    }
  }
};
</script>

<style scoped>
.footer-premium {
  background: #0a0a0a;
  color: #e2e8f0;
  padding: 4rem 0 2rem;
  font-family: 'Inter', sans-serif;
  border-top: 1px solid #1e293b;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-brand {
  max-width: 400px;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(to right, #60a5fa, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.footer-tagline {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.5;
}

.footer-socials {
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1e293b;
  border-radius: 50%;
  color: white;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: bold;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: #3b82f6;
  transform: translateY(-3px);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  border-top: 1px solid #1e293b;
  padding-top: 3rem;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

.footer-heading {
  font-size: 0.9rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.85rem;
  display: block;
  margin-bottom: 0.75rem;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #60a5fa;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #1e293b;
  padding-top: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  font-size: 0.8rem;
  color: #64748b;
}

.footer-meta {
  display: flex;
  gap: 1.5rem;
}

.meta-item {
  font-size: 0.8rem;
  color: #64748b;
  cursor: pointer;
}

.meta-item:hover {
  color: #94a3b8;
}
</style>

