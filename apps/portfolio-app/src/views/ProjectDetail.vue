
<template>
  <div class="container" v-if="project">
    <h1 class="text-4xl font-bold mb-4">{{ project.title }}</h1>
    <p class="mb-6">{{ project.details }}</p>
    <div class="grid grid-cols-2 gap-4">
      <img v-for="img in project.gallery" :key="img" :src="img" class="rounded" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import projects from '../data/projects.json'

const route = useRoute()
const project = ref(null)

onMounted(() => {
  project.value = projects.find(p => p.id === route.params.id)
})
</script>
