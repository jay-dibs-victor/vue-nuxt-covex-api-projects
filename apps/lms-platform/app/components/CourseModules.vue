<template>
  <div class="card modules-card">
    <h3>Course Modules</h3>
    
    <div class="module-group">
      <div class="module-header active">
        <span>3.1 Introduction</span>
        <span class="icon check">✓</span>
      </div>
      <div class="module-header active">
        <span>3.2 Key Concepts</span>
        <span class="icon check">✓</span>
      </div>
      <div class="module-header current">
        <span>3.3 Linear Regression</span>
        <span class="icon chevron">›</span>
      </div>
      <div class="module-header locked">
        <span>3.4 Model Building</span>
        <span class="icon lock">🔒</span>
      </div>
      <div class="module-header locked">
        <span>3.5 Hands-on Lab</span>
        <span class="icon lock">🔒</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.module-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}

.module-header.active {
  background: #f0fdfa;
  color: #0d9488;
}

.module-header.current {
  background: #eff6ff;
  color: #2563eb;
  border: 1px solid #dbeafe;
}

.module-header.locked {
  background: #f8fafc;
  color: #94a3b8;
  opacity: 0.7;
}

.icon.check {
  background: #14b8a6;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

.icon.chevron {
  font-size: 1.25rem;
}

.icon.lock {
  font-size: 0.9rem;
}
</style>
