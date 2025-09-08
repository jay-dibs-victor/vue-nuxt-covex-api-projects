<template>
  <div class="lms-app">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">LEARNIUM</div>
      <nav class="nav">
        <a href="#" class="active">📊 Dashboard</a>
        <a href="#">📚 My Courses</a>
        <a href="#">📝 Assignments</a>
        <a href="#">📈 Analytics</a>
        <a href="#">⚙️ Settings</a>
      </nav>
      <div class="ai-badge">
        <span class="pulse"></span>
        Claude AI Active
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main">
      <header class="header">
        <div class="search-bar">
          <span>🔍</span>
          <input type="text" placeholder="Search courses, modules..." />
        </div>
        <div class="user-info">
          <div class="user-text">
            <strong>Sarah Davis</strong>
            <span>Data Science Student</span>
          </div>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="User" />
        </div>
      </header>

      <div class="content-wrapper">
        <div class="primary-content">
          <div class="welcome-hero">
            <h1>Welcome back, <span>Sarah!</span></h1>
            <p>Monday, October 28, 2024</p>
          </div>

          <div class="video-section">
            <div class="player">
              <div class="play-overlay">▶</div>
              <img src="https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=1200" alt="Video" />
            </div>
            <div class="player-info">
              <h2>Module 3: Linear Regression</h2>
              <p>Mastering the fundamentals of predictive modeling.</p>
            </div>
          </div>
        </div>

        <aside class="side-panel">
          <section class="panel-section">
            <h3>Course Progress</h3>
            <div class="progress-card">
              <div class="progress-header">
                <strong>Data Science Masterclass</strong>
                <span>68%</span>
              </div>
              <div class="progress-bar"><div class="fill" style="width: 68%"></div></div>
            </div>
          </section>

          <section class="panel-section">
            <h3>Daily Tasks</h3>
            <div class="task-list">
              <div class="task-item done">Study Linear Regression ✓</div>
              <div class="task-item">Complete Assignment</div>
              <div class="task-item">Watch Next Module</div>
            </div>
          </section>

          <section class="panel-section">
            <h3>Modules</h3>
            <div class="module-list">
              <div class="mod-item completed">3.1 Intro</div>
              <div class="mod-item active">3.2 Regression</div>
              <div class="mod-item locked">3.3 Model Building 🔒</div>
            </div>
          </section>
        </aside>
      </div>
    </main>
  </div>
</template>


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

/* Sidebar */
.sidebar {
  width: 260px;
  background: #0f172a;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 0;
  position: sticky;
  top: 0;
  height: 100vh;
}

.logo {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  color: #3b82f6;
  padding: 0 2rem 3rem;
  letter-spacing: -0.02em;
}

.nav {
  flex-grow: 1;
}

.nav a {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.nav a:hover, .nav a.active {
  color: white;
  background: rgba(255, 255, 255, 0.05);
}

.nav a.active {
  border-left: 4px solid #3b82f6;
}

.ai-badge {
  margin: 2rem;
  background: rgba(52, 211, 153, 0.1);
  color: #34d399;
  padding: 0.75rem 1rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pulse {
  width: 8px;
  height: 8px;
  background: #34d399;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(52, 211, 153, 0); }
  100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
}

/* Main */
.main {
  flex-grow: 1;
  padding: 2rem 3rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background: white;
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  width: 400px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.search-bar input {
  border: none;
  outline: none;
  margin-left: 0.75rem;
  width: 100%;
  font-size: 0.9rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-text {
  text-align: right;
}

.user-text strong {
  display: block;
  font-size: 0.95rem;
}

.user-text span {
  font-size: 0.8rem;
  color: #64748b;
}

.user-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Content Layout */
.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 3rem;
}

.welcome-hero h1 {
  font-family: 'Outfit', sans-serif;
  font-size: 2.25rem;
  margin-bottom: 0.5rem;
}

.welcome-hero h1 span {
  color: #3b82f6;
}

.welcome-hero p {
  color: #64748b;
  margin-bottom: 2.5rem;
}

.video-section {
  background: white;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.player {
  position: relative;
  aspect-ratio: 16/9;
  background: #000;
}

.player img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.player-info {
  padding: 2rem;
}

.player-info h2 {
  font-family: 'Outfit', sans-serif;
  margin-bottom: 0.5rem;
}

.player-info p {
  color: #64748b;
}

/* Side Panel */
.panel-section {
  margin-bottom: 2.5rem;
}

.panel-section h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  margin-bottom: 1.25rem;
}

.progress-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.progress-bar {
  height: 8px;
  background: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar .fill {
  height: 100%;
  background: #3b82f6;
  border-radius: 4px;
}

.task-list, .module-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-item, .mod-item {
  background: white;
  padding: 1rem;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
}

.task-item.done {
  color: #94a3b8;
  text-decoration: line-through;
}

.mod-item.completed {
  border-left: 4px solid #34d399;
}

.mod-item.active {
  border-left: 4px solid #3b82f6;
  background: #eff6ff;
  color: #1d4ed8;
}
</style>


