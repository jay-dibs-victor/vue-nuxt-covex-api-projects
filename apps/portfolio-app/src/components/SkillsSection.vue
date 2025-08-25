<template>
<div style="background:#fafafa" class="mb-12 px-4 mx-4 p-8">
  <section class="container py-16" >
    <h2 class="text-4xl font-bold text-center mb-12">Frontend + Backend Skills</h2>
    <div class="grid gap-8  grid-cols-1  md:grid-cols-3">
      <div
        v-for="(skill, index) in skills"
        :key="skill.name"
        ref="skillRefs"
        class="bg-white rounded-lg shadow-md p-6 flex flex-col items-center opacity-0 translate-y-6 transition-all duration-700 ease-out"
        :class="{ 'opacity-100 translate-y-0': skill.visible }"
      >
        <!-- Circular Progress -->
        <div class="relative w-32 h-32 mb-4">
          <svg class="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="#eafa8a"
              stroke-width="12"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="#e6e6e6"
              stroke-width="12"
              fill="transparent"
              stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="circumference - (circumference * skill.current) / 100"
            />
          </svg>
          <span class="absolute inset-0 flex items-center justify-center text-xl font-bold">
            {{ Math.floor(skill.current) }}%
          </span>
        </div>
        <!-- Skill Name -->
        <h3 class="text-lg font-semibold text-primary">{{ skill.name }}</h3>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import  skillsData  from '../data/skills.json'

const circumference = 2 * Math.PI * 58
const skills = ref(skillsData.map(s => ({ ...s, current: 0, visible: false })))
const skillRefs = ref([])

const animateSkill = (index) => {
  let start = 0
  const end = skills.value[index].level
  const duration = 1500
  const increment = end / (duration / 16)

  const animate = () => {
    start += increment
    if (start >= end) {
      start = end
    } else {
      requestAnimationFrame(animate)
    }
    skills.value[index].current = start
  }

  requestAnimationFrame(animate)
}

onMounted(async () => {
  await nextTick()

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = skillRefs.value.indexOf(entry.target)
          if (index !== -1 && !skills.value[index].visible) {
            skills.value[index].visible = true
            animateSkill(index)
          }
        }
      })
    },
    { threshold: 0.3 }
  )

  skillRefs.value.forEach((el) => {
    if (el) observer.observe(el)
  })
})
</script>


<style>

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.bg-white { background: white; }
.rounded-lg { border-radius: 0.75rem; }
.shadow-md { box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.p-6 { padding: 1.5rem; }
.mb-4 { margin-bottom: 1rem; }
.text-center { text-align: center; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-3xl { font-size: 1.875rem; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.grid { display: grid; }
.gap-8 { gap: 2rem; }
.md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.transition-all { transition: all 0.3s ease; }
.duration-500 { transition-duration: 0.5s; }
.ease-out { transition-timing-function: ease-out; }

.opacity-0 { opacity: 0; }
.opacity-100 { opacity: 1; }
.translate-y-6 { transform: translateY(1.5rem); }
.translate-y-0 { transform: translateY(0); }
.transition-all { transition: all 0.3s ease; }
.duration-700 { transition-duration: 0.7s; }
.ease-out { transition-timing-function: ease-out; }

</style>