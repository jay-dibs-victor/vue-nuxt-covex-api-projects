<template>
  <div class="courses-page">
    <header class="page-header">
      <div class="header-content">
        <h1>My Courses</h1>
        <p>Continue where you left off or start a new challenge.</p>
      </div>
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" v-model="searchQuery" placeholder="Search your courses..." />
      </div>
    </header>

    <!-- Categories / Tabs -->
    <div class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
        <span class="count" v-if="getCount(tab.id) > 0">{{ getCount(tab.id) }}</span>
      </button>
    </div>

    <!-- Course Grid -->
    <div v-if="error" class="error-state">
      <p>Failed to load courses. Please try again later.</p>
    </div>
    <div v-else-if="courses === undefined" class="loading-grid">
      <div v-for="i in 6" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="filteredCourses.length === 0" class="empty-state">
      <div class="empty-icon">📚</div>
      <h3>No courses found</h3>
      <p>Try adjusting your search or filters.</p>
    </div>
    <div v-else class="course-grid">
      <CourseCard 
        v-for="course in filteredCourses" 
        :key="course._id" 
        :course="course"
        @click="navigateToCourse"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useConvexQuery } from '~/composables/useConvex';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');
const activeTab = ref('all');

const tabs = [
  { id: 'all', label: 'All Courses' },
  { id: 'active', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
  { id: 'not-started', label: 'Not Started' },
];

const { data: courses, error } = useConvexQuery("courses:getCourses");

const filteredCourses = computed(() => {
  if (!courses.value) return [];
  
  return courses.value.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesTab = activeTab.value === 'all' || course.status === activeTab.value;
    return matchesSearch && matchesTab;
  });
});

const getCount = (tabId) => {
  if (!courses.value) return 0;
  if (tabId === 'all') return courses.value.length;
  return courses.value.filter(c => c.status === tabId).length;
};

const navigateToCourse = (course) => {
  router.push(`/courses/${course._id}`);
};
</script>

<style scoped>
.courses-page {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.5rem;
  gap: 2rem;
}

.header-content h1 {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  color: #0f172a;
}

.header-content p {
  color: #64748b;
  margin: 0;
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
}

.search-box input {
  width: 100%;
  padding: 0.85rem 1.25rem 0.85rem 3rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  background: white;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.search-box input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.tab-btn {
  padding: 0.65rem 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid transparent;
  background: white;
  color: #64748b;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.tab-btn:hover {
  background: #f1f5f9;
}

.tab-btn.active {
  background: #0f172a;
  color: white;
}

.count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.1rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
}

.tab-btn.active .count {
  background: rgba(255, 255, 255, 0.2);
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.skeleton-card {
  height: 350px;
  background: #f1f5f9;
  border-radius: 1.5rem;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  background: white;
  border-radius: 2rem;
  border: 2px dashed #e2e8f0;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.empty-state h3 {
  margin: 0 0 0.5rem 0;
  color: #0f172a;
}

.empty-state p {
  color: #64748b;
  margin: 0;
}

.error-state {
  text-align: center;
  padding: 3rem;
  color: #ef4444;
  background: #fef2f2;
  border-radius: 1.5rem;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .search-box {
    max-width: none;
  }
}
</style>
