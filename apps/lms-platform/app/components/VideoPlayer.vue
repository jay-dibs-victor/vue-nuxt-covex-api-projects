<template>
  <div class="card player-card" v-if="activeCourse">
    <div class="player-container">
      <div class="video-overlay">
        <button class="play-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>
      <img :src="activeCourse.thumbnail" alt="Course Thumbnail" class="thumbnail" />
      
      <div class="player-controls">
        <div class="module-info">
          <h4>Module 3: Linear Regression & Model Building</h4>
        </div>
        <div class="time-info">18:24 / 45:12</div>
        <div class="actions">
          <button class="action-btn">CC</button>
          <button class="action-btn">⚙️</button>
          <button class="action-btn">⛶</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useConvexQuery } from '~/composables/useConvex';

const { data: courses } = useConvexQuery("courses:getCourses");
const activeCourse = computed(() => {
  return courses.value?.find(c => c.status === 'active') || courses.value?.[0];
});
</script>

<style scoped>
.player-card {
  padding: 0;
  overflow: hidden;
  background: #000;
}

.player-container {
  position: relative;
  aspect-ratio: 16/9;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.play-btn {
  width: 64px;
  height: 64px;
  background: #f97316;
  border: none;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 30px rgba(249, 115, 22, 0.5);
  transition: transform 0.2s;
}

.play-btn:hover {
  transform: scale(1.1);
}

.player-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem 1.5rem;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  z-index: 3;
}

.module-info h4 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
}

.time-info {
  font-size: 0.85rem;
  opacity: 0.8;
}

.actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  opacity: 0.8;
}

.action-btn:hover {
  opacity: 1;
}
</style>
