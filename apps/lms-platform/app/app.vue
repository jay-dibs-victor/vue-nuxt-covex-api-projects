<template>
  <div class="lms-app">
    <Sidebar ref="sidebarRef" />
    <main class="main">
      <TopBar @open-sidebar="openSidebar" />
      <div class="content-wrapper">
        <MainContent />
        <SidePanel />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sidebarRef = ref(null)

const openSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.isOpen = true
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@700;800&display=swap');

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  background: #f8fafc;
}

.lms-app {
  display: flex;
  min-height: 100vh;
}

.main {
  flex-grow: 1;
  padding: 2rem 3rem;
  width: 100%;
  box-sizing: border-box;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 3rem;
}

@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .main {
    padding: 1.5rem;
  }
}
</style>



