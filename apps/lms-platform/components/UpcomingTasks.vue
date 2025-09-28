<template>
  <div class="card tasks-card">
    <div class="header-row">
      <h3>Upcoming Tasks</h3>
      <button class="more-btn">•••</button>
    </div>
    
    <div v-if="error" class="error-state">
      <p>Failed to load tasks</p>
    </div>
    <div v-else-if="tasks === undefined" class="loading">
      Loading tasks...
    </div>
    <div v-else-if="tasks.length === 0" class="empty-state">
      No upcoming tasks
    </div>
    <div v-else class="task-list">
      <div v-for="task in tasks" :key="task._id" class="task-item">
        <div class="task-icon" :class="task.type">
          <svg v-if="task.type === 'assignment'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
        </div>
        <div class="task-info">
          <h4>{{ task.title }}</h4>
          <p>{{ task.subtitle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useConvexQuery } from '~/composables/useConvex';
const { data: tasks, error } = useConvexQuery("tasks:getTasks");
</script>

<style scoped>
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.more-btn {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 1.25rem;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.task-icon {
  width: 36px;
  height: 36px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-icon.assignment {
  background: #eff6ff;
  color: #3b82f6;
}

.task-icon.quiz {
  background: #fff7ed;
  color: #f97316;
}

.task-info h4 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #0f172a;
}

.task-info p {
  margin: 0.15rem 0 0 0;
  font-size: 0.8rem;
  color: #64748b;
}

.loading {
  font-size: 0.85rem;
  color: #64748b;
  text-align: center;
}
</style>
