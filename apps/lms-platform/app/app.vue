<template>
  <div class="lms-container">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo">LEARNIUM</div>
      </div>
      <nav class="sidebar-nav">
        <a href="#" class="nav-item active">Dashboard</a>
        <a href="#" class="nav-item">My Courses</a>
        <a href="#" class="nav-item">Settings</a>
      </nav>
    </aside>
    <main class="main-content">
      <header class="top-bar">
        <div class="welcome">
          <h1>Welcome back, <span>Sarah!</span></h1>
          <p>Oct 28, 2024</p>
        </div>
      </header>
    </main>

  </div>
</template>

<style>
.lms-container { display: flex; min-height: 100vh; font-family: sans-serif; }
.sidebar { width: 260px; background: #0f172a; color: white; padding: 2rem 0; }
.sidebar-header { padding: 0 2rem 2rem; }
.logo { font-weight: bold; font-size: 1.5rem; color: #60a5fa; }
.nav-item { display: block; padding: 1rem 2rem; color: #94a3b8; text-decoration: none; }
.nav-item.active { color: white; background: rgba(255,255,255,0.05); border-left: 4px solid #3b82f6; }
</style>

