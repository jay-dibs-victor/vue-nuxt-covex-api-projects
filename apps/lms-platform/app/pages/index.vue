<template>
  <div class="dashboard">
    <!-- Header -->
    <DashboardHeader />

    <!-- 3 Columns Content Grid -->
    <div class="dashboard-grid">
      <!-- Left Column: Course Status & Active Courses -->
      <div class="col-left">
        <CourseStatus />
        <ActiveCourses />
      </div>

      <!-- Middle Column: Progress, Player, Modules -->
      <div class="col-middle">
        <div class="card progress-card">
           <!-- Real data here -->
        </div>
        <div class="card player-card">
           <!-- Player here -->
        </div>
      </div>

      <!-- Right Column: Tasks, Activity, Instructor -->
      <div class="col-right">
        <!-- Real data here -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useConvexQuery } from '~/composables/useConvex';
// const { data: courses } = useConvexQuery("courses:getCourses");
// We will build out the components bit by bit
</script>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  gap: 2rem;
}

.col-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.col-middle {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.col-right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card {
  background: white;
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.card h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
  color: #0f172a;
}
</style>
