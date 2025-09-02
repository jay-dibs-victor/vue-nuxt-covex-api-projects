<template>
  <div class="lms-container">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo">LEARNIUM</div>
      </div>
      <nav class="sidebar-nav">
        <a href="#" class="nav-item active">📊 Dashboard</a>
        <a href="#" class="nav-item">📚 My Courses</a>
        <a href="#" class="nav-item">⚙️ Settings</a>
      </nav>
      <div class="sidebar-footer">
        <div class="ai-status">Claude AI Active</div>
      </div>
    </aside>

    <main class="main-content">
      <header class="top-bar">
        <div class="welcome">
          <h1>Welcome back, <span>Sarah!</span></h1>
          <p>Oct 28, 2024</p>
        </div>
      </header>

      <div class="dashboard-grid">
        <section class="course-card">
          <div class="card-header">
            <h2>Data Science Masterclass</h2>
            <div class="progress-info">68% Progress</div>
          </div>
          <div class="video-mock">
            <div class="play-btn">▶</div>
            <span>Module 3: Linear Regression</span>
          </div>
        </section>

        <section class="modules">
          <h3>Course Modules</h3>
          <div class="module-item completed">3.1 Intro ✓</div>
          <div class="module-item active">3.2 Regression ▶</div>
          <div class="module-item locked">3.3 Advanced Stats 🔒</div>
        </section>
      </div>
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Outfit:wght@700;800&display=swap');

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
}

.lms-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background: #0f172a;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
}

.sidebar-header {
  padding: 0 2rem 3rem;
}

.logo {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  color: #60a5fa;
}

.sidebar-nav {
  flex-grow: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
}

.nav-item.active {
  color: white;
  background: rgba(255, 255, 255, 0.05);
  border-left: 4px solid #3b82f6;
}

.sidebar-footer {
  padding: 2rem;
}

.ai-status {
  color: #34d399;
  font-size: 0.8rem;
  background: rgba(52, 211, 153, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
}

.main-content {
  flex-grow: 1;
  padding: 3rem;
}

.welcome h1 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.75rem;
}

.welcome h1 span {
  color: #3b82f6;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  margin-top: 3rem;
}

.course-card {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.video-mock {
  background: #000;
  border-radius: 1rem;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  margin-top: 1.5rem;
  background-image: url('https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=800');
  background-size: cover;
}

.play-btn {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
}

.module-item {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
}

.module-item.active {
  border: 2px solid #3b82f6;
}
</style>

