<template>
  <section class="container mt-16">
    <h2 class="text-3xl font-bold mb-6">Testimonials</h2>
    <div class="card text-center max-w-xl mx-auto relative">
      <img :src="current.photo" class="w-20 h-20 mx-auto rounded-full mb-4 border" />
      <p class="italic">"{{ current.quote }}"</p>
      <h3 class="font-semibold mt-4">{{ current.name }}</h3>
      <span class="text-sm text-gray-500">{{ current.role }}</span>

      <div class="flex justify-between mt-6">
        <button @click="prev" class="btn text-sm">←</button>
        <button @click="next" class="btn text-sm">→</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import testimonials from '../data/testimonials.json'
import { ref, computed } from 'vue'

const index = ref(0)
const current = computed(() => testimonials[index.value])

const next = () => {
  index.value = (index.value + 1) % testimonials.length
}
const prev = () => {
  index.value = (index.value - 1 + testimonials.length) % testimonials.length
}
</script>










