<template>
  <div class="lms-layout">
    <Sidebar />
    <div class="page-content">
      <slot />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap');

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  color: #0f172a;
  background: #f8fafc;
}

* {
  box-sizing: border-box;
}

.lms-layout {
  display: flex;
  min-height: 100vh;
}

.page-content {
  flex-grow: 1;
  padding: 2.5rem 3rem;
  height: 100vh;
  overflow-y: auto;
}

@media (max-width: 1024px) {
  .page-content {
    padding: 1.5rem;
  }
}
</style>
