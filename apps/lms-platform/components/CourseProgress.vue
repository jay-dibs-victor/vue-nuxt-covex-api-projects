<template>
  <div class="card progress-card" v-if="activeCourse">
    <div class="progress-header">
      <h3>Course Progress</h3>
      <span class="percentage">{{ activeCourse.progress }}%</span>
    </div>
    
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: activeCourse.progress + '%' }"></div>
    </div>
    
    <p class="lessons-finished">
      {{ activeCourse.finishedLessons }} of {{ activeCourse.totalLessons }} lessons finished
    </p>
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
.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.percentage {
  font-weight: 700;
  color: #0f172a;
}

.progress-bar-container {
  height: 8px;
  background: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.progress-bar {
  height: 100%;
  background: #14b8a6;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.lessons-finished {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
  text-align: right;
}
</style>
