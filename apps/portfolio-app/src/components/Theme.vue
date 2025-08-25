<template>
  <button class="btn fixed top-4 right-4" @click="toggleTheme">
    {{ theme === 'dark' ? 'Light' : ' Dark' }}
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const theme = ref('light')

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', theme.value)
  localStorage.setItem('theme', theme.value)
}

onMounted(() => {
  const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  theme.value = saved
  document.documentElement.setAttribute('data-theme', theme.value)
})
</script>

