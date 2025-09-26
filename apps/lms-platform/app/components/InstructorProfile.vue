<template>
  <div class="card instructor-card" v-if="instructor">
    <h3>Instructor Profile</h3>
    
    <div class="profile-row">
      <img :src="instructor.avatar" :alt="instructor.name" class="profile-img" />
      <div class="profile-info">
        <h4>{{ instructor.name }}</h4>
        <p>{{ instructor.title }}</p>
      </div>
    </div>
    
    <div class="profile-actions">
      <button class="msg-btn">Send Message</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useConvexQuery } from '~/composables/useConvex';

const { data: courses } = useConvexQuery("courses:getCourses");
const instructor = computed(() => {
  const activeCourse = courses.value?.find(c => c.status === 'active') || courses.value?.[0];
  return activeCourse?.instructor;
});
</script>

<style scoped>
.profile-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.profile-img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-info h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
}

.profile-info p {
  margin: 0.25rem 0 0 0;
  font-size: 0.85rem;
  color: #64748b;
}

.profile-actions {
  display: flex;
}

.msg-btn {
  width: 100%;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  font-weight: 600;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.2s;
}

.msg-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}
</style>
