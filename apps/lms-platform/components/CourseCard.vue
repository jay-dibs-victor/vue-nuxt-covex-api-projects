<template>
  <div class="course-card" @click="$emit('click', course)">
    <div class="thumbnail-wrapper">
      <img :src="course.thumbnail" :alt="course.title" class="thumbnail" />
      <div class="status-badge" :class="course.status">
        {{ formatStatus(course.status) }}
      </div>
    </div>
    
    <div class="content">
      <h3 class="title">{{ course.title }}</h3>
      <div class="instructor">
        <img :src="course.instructor?.avatar" class="avatar" />
        <span>{{ course.instructor?.name }}</span>
      </div>
      
      <div class="progress-section">
        <div class="progress-bar-wrap">
          <div class="progress-bar" :style="{ width: course.progress + '%' }"></div>
        </div>
        <div class="progress-stats">
          <span>{{ course.progress }}% Complete</span>
          <span>{{ course.finishedLessons }}/{{ course.totalLessons }} Lessons</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  course: {
    type: Object,
    required: true
  }
});

defineEmits(['click']);

const formatStatus = (status) => {
  return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
</script>

<style scoped>
.course-card {
  background: white;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #f1f5f9;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  border-color: #3b82f633;
}

.thumbnail-wrapper {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.course-card:hover .thumbnail {
  transform: scale(1.05);
}

.status-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.35rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 700;
  backdrop-filter: blur(8px);
  color: white;
}

.status-badge.active { background: rgba(16, 185, 129, 0.9); }
.status-badge.not-started { background: rgba(100, 116, 139, 0.9); }
.status-badge.in-progress { background: rgba(59, 130, 246, 0.9); }
.status-badge.completed { background: rgba(139, 92, 246, 0.9); }

.content {
  padding: 1.5rem;
}

.title {
  margin: 0 0 1rem 0;
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  color: #0f172a;
  line-height: 1.4;
}

.instructor {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  color: #64748b;
}

.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-bar-wrap {
  height: 6px;
  background: #f1f5f9;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #3b82f6;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
}
</style>
