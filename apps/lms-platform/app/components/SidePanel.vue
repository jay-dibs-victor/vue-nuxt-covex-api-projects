<script setup>
const { data: courses } = useConvexQuery("courses:getCourses");
const { data: tasks } = useConvexQuery("tasks:getTasks");
const toggleTask = useConvexMutation("tasks:toggleTask");

const handleTaskClick = async (task) => {
  await toggleTask({ taskId: task._id, completed: !task.completed });
};
</script>

<template>
  <aside class="side-panel">
    <section class="panel-section" v-if="courses && courses.length > 0">
      <h3>Course Progress</h3>
      <div class="progress-card">
        <div class="progress-header">
          <strong>{{ courses[0].title }}</strong>
          <span>{{ courses[0].progress }}%</span>
        </div>
        <div class="progress-bar">
          <div class="fill" :style="{ width: courses[0].progress + '%' }"></div>
        </div>
      </div>
    </section>

    <section class="panel-section" v-if="tasks">
      <h3>Daily Tasks</h3>
      <div class="task-list">
        <div 
          v-for="task in tasks" 
          :key="task._id" 
          class="task-item" 
          :class="{ done: task.completed }"
          @click="handleTaskClick(task)"
          style="cursor: pointer; transition: all 0.2s;"
        >
          {{ task.title }} <span v-if="task.completed">✓</span>
        </div>
      </div>
    </section>

    <section class="panel-section">
      <h3>Modules</h3>
      <div class="module-list">
        <div class="mod-item completed">3.1 Intro</div>
        <div class="mod-item active">3.2 Regression</div>
        <div class="mod-item locked">3.3 Model Building 🔒</div>
      </div>
    </section>
  </aside>
</template>

<style scoped>
.side-panel {
  display: flex;
  flex-direction: column;
}

.panel-section {
  margin-bottom: 2.5rem;
}

.panel-section h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  margin-bottom: 1.25rem;
}

.progress-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.progress-bar {
  height: 8px;
  background: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar .fill {
  height: 100%;
  background: #3b82f6;
  border-radius: 4px;
}

.task-list, .module-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-item, .mod-item {
  background: white;
  padding: 1rem;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
}

.task-item.done {
  color: #94a3b8;
  text-decoration: line-through;
}

.mod-item.completed {
  border-left: 4px solid #34d399;
}

.mod-item.active {
  border-left: 4px solid #3b82f6;
  background: #eff6ff;
  color: #1d4ed8;
}
</style>
