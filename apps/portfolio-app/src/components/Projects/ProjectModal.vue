<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="emitClose">
    <div class="modal-content">
      <!-- Close button -->
      <button class="modal-close" @click="emitClose">✕</button>

      <!-- Project detail -->
      <div v-if="project" class="modal-body">
 
         <img  v-if="project.image" :src="project.image" :alt="project.title" class=" project-image w-full h-full object-cover img-placeholder" />

        <h2 class="project-title">{{ project.title }}</h2>
        <p class="project-description">{{ project?.desc }}</p>

        <div v-if="project.tags?.length" class="tech-stack">
          <h3>Technologies</h3>
          <ul>
            <li  v-for="(tech, i) in project.tags" :key="i">{{ tech }}</li>
          </ul>
        </div>

        <div class="project-actions">
          <button class="btn-primary">View Full Project</button>
          <button class="btn-secondary" @click="emitClose">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  project: { type: Object, default: null },
  isOpen: { type: Boolean, default: false }
});

const emit = defineEmits(["close"]);

const emitClose = () => {
  emit("close");
};
</script>

<style scoped>
/* Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

/* Modal Box */
.modal-content {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  position: relative;
  animation: slideDown 0.3s ease-out;
}

/* Close Button */
.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Body */
.project-image {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 1rem;
}
.project-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
}
.project-description {
  font-size: 1rem;
  color: #444;
  margin-bottom: 1rem;
}
.tech-stack {
  margin-bottom: 1rem;
}
.tech-stack ul {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.tech-stack li {
  background: #f1f1f1;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  font-size: 0.9rem;
}

/* Buttons */
.project-actions {
  display: flex;
  gap: 1rem;
}
.btn-primary {
  background: #2196f3;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
}
.btn-primary:hover {
  background: #1976d2;
}
.btn-secondary {
  background: #eee;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
}
.btn-secondary:hover {
  background: #ddd;
}

/* Animation */
@keyframes slideDown {
  from { transform: translateY(-20px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
</style>