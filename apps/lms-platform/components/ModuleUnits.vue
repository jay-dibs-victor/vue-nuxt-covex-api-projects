<template>
  <div class="units">
    <div v-if="units === undefined" class="loading-units">...</div>
    <div v-else class="unit-items">
      <div 
        v-for="unit in units" 
        :key="unit._id" 
        class="unit-item"
        :class="unit.status"
      >
        <div class="unit-type-icon">
          <span v-if="unit.type === 'video'">🎬</span>
          <span v-else-if="unit.type === 'quiz'">📝</span>
          <span v-else-if="unit.type === 'resource'">📂</span>
          <span v-else>📄</span>
        </div>
        <div class="unit-info">
          <span class="unit-title">{{ unit.title }}</span>
          <span class="unit-duration" v-if="unit.duration">{{ unit.duration }}</span>
        </div>
        <div class="unit-status-icon">
          <span v-if="unit.status === 'completed'" class="check">✓</span>
          <span v-else-if="unit.status === 'locked'" class="lock">🔒</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useConvexQuery } from '~/composables/useConvex';

const props = defineProps({
  moduleId: {
    type: String,
    required: true
  }
});

const { data: units } = useConvexQuery("courseUnits:getByModuleId", { moduleId: props.moduleId });
</script>

<style scoped>
.unit-items {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem 0 0.5rem 1rem;
}

.unit-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  color: #64748b;
  cursor: pointer;
  transition: background 0.2s;
}

.unit-item:hover {
  background: #f1f5f9;
}

.unit-item.completed {
  color: #0d9488;
}

.unit-item.locked {
  opacity: 0.5;
  cursor: not-allowed;
}

.unit-type-icon {
  font-size: 1rem;
}

.unit-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.unit-duration {
  font-size: 0.75rem;
  opacity: 0.7;
}

.check {
  color: #14b8a6;
  font-weight: bold;
}

.lock {
  font-size: 0.75rem;
}

.loading-units {
  padding: 0.5rem;
  font-size: 0.8rem;
  color: #94a3b8;
}
</style>
