<template>
  <div class="container">
    <h2 class="text-3xl font-bold mb-4">Resume</h2>
    <h3 class="text-xl font-semibold mt-6">Education</h3>
    <div v-for="edu in resume.education" :key="edu.school" class="mt-2">
      <strong>{{ edu.school }}</strong> – {{ edu.degree }} ({{ edu.year }})
    </div>

    <h3 class="text-xl font-semibold mt-6">Experience</h3>
    <div v-for="exp in resume.experience" :key="exp.company" class="mt-2">
      <strong>{{ exp.company }}</strong> – {{ exp.role }} ({{ exp.duration }})
    </div>
  </div>


  <section class="container mt-20">
    <h2 class="text-3xl font-bold mb-6">My Resume</h2>

    <!-- Actions -->
    <div class="flex gap-4 mb-6">
      <a href="/resume.pdf" download class="btn">⬇ Download PDF</a>
      <button @click="toggleViewer" class="btn bg-gray-500 hover:bg-gray-600">
        {{ showViewer ? 'Close Preview' : 'Preview Resume' }}
      </button>
    </div>

    <!-- PDF Preview -->
    <div v-if="showViewer" class="w-full h-[80vh] border rounded overflow-hidden">
      <iframe
        src="/resume.pdf"
        class="w-full h-full"
        frameborder="0"
      ></iframe>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import resume from '../data/resume.json'

const showViewer = ref(false)
const toggleViewer = () => {
  showViewer.value = !showViewer.value
}
</script>
