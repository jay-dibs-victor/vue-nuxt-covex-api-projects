<template>
  <div class="card active-courses">
    <div class="header-row">
      <h3>Active Courses</h3>
      <button class="view-all">View all</button>
    </div>
    
    <div v-if="error" class="error-state">
      <p>Failed to load courses</p>
      <small>{{ error.message }}</small>
    </div>
    <div v-else-if="courses === undefined" class="loading">
      Loading courses...
    </div>
    <div v-else-if="courses.length === 0" class="empty-state">
      No active courses found.
    </div>
    <div v-else class="course-list">
      <div 
        v-for="course in courses" 
        :key="course._id" 
        class="course-item"
        :class="{ active: course.status === 'active' }"
      >
        <div class="course-icon">
          <span v-if="course.title.includes('Data')">📊</span>
          <span v-else-if="course.title.includes('Project')">💼</span>
          <span v-else>📚</span>
        </div>
        <div class="course-info">
          <h4>{{ course.title }}</h4>
          <p>{{ course.instructor?.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useConvexQuery } from '~/composables/useConvex';
const { data: courses, error } = useConvexQuery("courses:getCourses");
</script>

<style scoped>
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.view-all {
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.course-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.course-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.course-item:hover {
  background: #f8fafc;
}

.course-item.active {
  background: #0f172a;
  color: white;
}

.course-icon {
  width: 40px;
  height: 40px;
  background: #f1f5f9;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.course-item.active .course-icon {
  background: rgba(255, 255, 255, 0.1);
}

.course-info h4 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
}

.course-info p {
  margin: 0.25rem 0 0 0;
  font-size: 0.8rem;
  color: #64748b;
}

.course-item.active .course-info p {
  color: #94a3b8;
}

.loading, .empty-state {
  color: #64748b;
  font-size: 0.9rem;
  text-align: center;
  padding: 1.5rem;
}

.error-state {
  color: #ef4444;
  text-align: center;
  padding: 1rem;
}

.error-state small {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #94a3b8;
}
</style>
