<template>
  <div class="card activity-card">
    <h3>Recent Activity</h3>
    
    <div v-if="activities && activities.length > 0" class="activity-list">
      <div v-for="activity in activities" :key="activity._id" class="activity-item">
        <div class="activity-dot" :class="activity.type"></div>
        <div class="activity-info">
          <h4>{{ activity.title }}</h4>
          <p>{{ activity.subtitle }}</p>
        </div>
      </div>
    </div>
    <div v-else class="loading">No recent activity</div>
  </div>
</template>

<script setup>
import { useConvexQuery } from '~/composables/useConvex';
const { data: activities } = useConvexQuery("activities:getActivities");
</script>

<style scoped>
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
}

.activity-list::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 5px;
  bottom: 5px;
  width: 2px;
  background: #f1f5f9;
  z-index: 0;
}

.activity-item {
  display: flex;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.activity-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  margin-top: 4px;
}

.activity-dot.success { background: #14b8a6; box-shadow: 0 0 0 4px #f0fdfa; }
.activity-dot.info { background: #3b82f6; box-shadow: 0 0 0 4px #eff6ff; }
.activity-dot.warning { background: #f97316; box-shadow: 0 0 0 4px #fff7ed; }

.activity-info h4 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #0f172a;
}

.activity-info p {
  margin: 0.15rem 0 0 0;
  font-size: 0.75rem;
  color: #94a3b8;
}

.loading {
  font-size: 0.85rem;
  color: #64748b;
  text-align: center;
}
</style>
