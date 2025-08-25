<template>
 <section class="skills-container">
     <h2 class="text-4xl font-bold text-center mb-12">Frontend + Backend Skills</h2>
    <div class="skills-controls">
      <button 
        :class="['btn-toggle', viewMode === 'list' ? 'active' : '']"
        @click="viewMode = 'list'">
        List View
      </button>
      <button 
        :class="['btn-toggle', viewMode === 'grid' ? 'active' : '']"
        @click="viewMode = 'grid'">
        Grid View
      </button>
    </div>

    <!-- Skills Section -->
    <div v-if="viewMode === 'list'" :key="viewMode" class="skills-list">
      <div v-for="skill in skills" :key="skill.name" class="skill-item">
       <div class="flex flex-row justify-between">
        <div class="skill-header">
          <span class="skill-name pr-6">{{ skill.name }}</span>
          <span class="skill-percent">({{ skill.level }})%</span>
        </div>
        <div class="skill-header">
          <span class="skill-name">{{ skill.experience }}</span>
         
        </div>
        
       </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: skill.level + '%' }"></div>
        </div>
      </div>
    </div>

    <div v-else :key="viewMode" class="skills-grid">
      <div v-for="skill in skills" :key="skill.name" class="skill-card">
        <h3 class="skill-card-title">{{ skill.name }}</h3>
        <div class="progress-bar small">
          <div class="progress-fill" :style="{ width: skill.level + '%' }"></div>
        </div>
        <p class="skill-card-percent">{{ skill.level }}%</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SkillsSection",
  data() {
    return {
      viewMode: "list",
      skills: [
         { name: "React/ Next JS", level: 95, experience:"6 years" },
        { name: "Vue", level: 98 , experience:"3 years"},
        { name: "Angular", level: 80, experience:"5 years" },

        { name: "Nodejs (Express + Nest)", level: 90, experience:"5 years" },
        { name: "Laravel", level: 85 , experience:"8 years"},
        { name: "Python", level: 80, experience:"8 years" },
        { name: "Django", level: 80 , experience:"4 years"},
        { name: "Flask", level: 70 , experience:"1 year"},
      ],
    };
  },
};
</script>

<style scoped>
/* Container */
.skills-container {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: sans-serif;
}

/* Controls */
.skills-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.btn-toggle {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background: #f7f7f7;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.3s;
}
.btn-toggle.active,
.btn-toggle:hover {
  background: rgb(50, 9, 72);
  color: white;
}

/* List View */
.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.skill-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  font-weight: bold;
}
.progress-bar {
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
  height: 10px;
  width: 100%;
}
.progress-fill {
  background: linear-gradient(90deg, #4caf50, #2196f3);
  height: 100%;
  width: 0;
  animation: grow 2s ease-out forwards;
}
@keyframes grow {
  from {
    width: 0;
  }
}

/* Grid View */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
}
.skill-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  background: #fafafa;
  transition: transform 0.3s;
}
.skill-card:hover {
  transform: translateY(-5px);
}
.skill-card-title {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
}
.skill-card-percent {
  margin-top: 0.6rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #444;
}
.progress-bar.small {
  height: 8px;
}
</style>
