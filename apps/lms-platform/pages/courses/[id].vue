<template>
  <div class="course-player-page" v-if="course">
    <!-- Back to Courses -->
    <NuxtLink to="/courses" class="back-link">
      <span>←</span> Back to My Courses
    </NuxtLink>

    <div class="player-layout">
      <!-- Left side: Player & Content -->
      <div class="main-content">
        <VideoPlayer :course="course" class="player-wrapper" />
        
        <div class="course-info-card">
          <div class="header">
            <h1>{{ course.title }}</h1>
            <div class="meta">
              <div class="instructor">
                <img :src="course.instructor?.avatar" class="avatar" />
                <span>{{ course.instructor?.name }}</span>
              </div>
              <span class="dot">•</span>
              <span>{{ course.totalLessons }} Lessons</span>
            </div>
          </div>
          
          <div class="description">
            <h3>About this course</h3>
            <p>{{ course.description }}</p>
          </div>
        </div>
      </div>

      <!-- Right side: Curriculum Sidebar -->
      <div class="sidebar-content">
        <div class="progress-stats">
          <div class="stats-header">
            <span>Overall Progress</span>
            <span class="percent">{{ course.progress }}%</span>
          </div>
          <div class="bar-wrap">
            <div class="bar" :style="{ width: course.progress + '%' }"></div>
          </div>
        </div>
        
        <CourseModules :course-id="course._id" class="curriculum-card" />
      </div>
    </div>
  </div>
  <div v-else-if="error" class="error-page">
    <h2>Course not found</h2>
    <p>We couldn't find the course you were looking for.</p>
    <NuxtLink to="/courses">Return to My Courses</NuxtLink>
  </div>
  <div v-else class="loading-page">
    <div class="spinner"></div>
    <p>Loading course content...</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useConvexQuery } from '~/composables/useConvex';

const route = useRoute();
const courseId = route.params.id;

const { data: course, error } = useConvexQuery("courses:getById", { id: courseId });
</script>

<style scoped>
.course-player-page {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: #0f172a;
}

.player-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2.5rem;
  align-items: start;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.player-wrapper {
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.course-info-card {
  background: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}

.course-info-card h1 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.85rem;
  margin: 0 0 1rem 0;
  color: #0f172a;
}

.meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #64748b;
  font-size: 0.9rem;
}

.instructor {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.description {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #f1f5f9;
}

.description h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #0f172a;
}

.description p {
  line-height: 1.7;
  color: #475569;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 1.5rem;
}

.progress-stats {
  background: #0f172a;
  padding: 1.5rem;
  border-radius: 1.25rem;
  color: white;
}

.stats-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  font-weight: 500;
  opacity: 0.9;
}

.bar-wrap {
  height: 6px;
  background: rgba(255,255,255,0.1);
  border-radius: 3px;
}

.bar {
  height: 100%;
  background: #14b8a6;
  border-radius: 3px;
}

.curriculum-card {
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}

.loading-page, .error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f1f5f9;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 1200px) {
  .player-layout {
    grid-template-columns: 1fr;
  }
  .sidebar-content {
    position: static;
  }
}
</style>
