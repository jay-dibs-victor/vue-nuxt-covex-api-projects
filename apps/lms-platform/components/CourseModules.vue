<template>
  <div class="card modules-card">
    <h3>Course Curriculum</h3>
    
    <div v-if="modules === undefined" class="loading">Loading curriculum...</div>
    <div v-else-if="modules.length === 0" class="empty">No modules available yet.</div>
    <div v-else class="module-group">
      <div 
        v-for="module in modules" 
        :key="module._id" 
        class="module-item"
      >
        <div class="module-header" @click="toggleModule(module._id)">
          <span class="module-title">{{ module.title }}</span>
          <span class="icon">{{ expandedModules.has(module._id) ? '▾' : '▸' }}</span>
        </div>
        
        <div v-if="expandedModules.has(module._id)" class="units-list">
          <ModuleUnits :module-id="module._id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useConvexQuery } from '~/composables/useConvex';

const props = defineProps({
  courseId: {
    type: String,
    required: true
  }
});

const { data: modules } = useConvexQuery("courseModules:getByCourseId", { courseId: props.courseId });
const expandedModules = ref(new Set());

const toggleModule = (id) => {
  if (expandedModules.value.has(id)) {
    expandedModules.value.delete(id);
  } else {
    expandedModules.value.add(id);
  }
};
</script>

<style scoped>
.module-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}

.module-header.active {
  background: #f0fdfa;
  color: #0d9488;
}

.module-header.current {
  background: #eff6ff;
  color: #2563eb;
  border: 1px solid #dbeafe;
}

.module-header.locked {
  background: #f8fafc;
  color: #94a3b8;
  opacity: 0.7;
}

.icon.check {
  background: #14b8a6;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

.icon.chevron {
  font-size: 1.25rem;
}

.icon.lock {
  font-size: 0.9rem;
}
</style>
