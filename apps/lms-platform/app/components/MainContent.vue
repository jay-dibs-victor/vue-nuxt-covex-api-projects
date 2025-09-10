<template>
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
</template>

<style scoped>
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

@media (max-width: 768px) {
  .welcome-hero h1 {
    font-size: 1.75rem;
  }
  .player-info {
    padding: 1.25rem;
  }
  .player-info h2 {
    font-size: 1.2rem;
  }
}
</style>
