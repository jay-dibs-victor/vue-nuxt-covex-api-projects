<template>
  <div class="card status-card">
    <h3>Course Status</h3>
    
    <div class="status-list">
      <div class="status-item orange">
        <div class="icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        </div>
        <span class="label">Assignment</span>
        <span class="badge">2</span>
      </div>

      <div class="status-item teal">
        <div class="icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
        </div>
        <span class="label">Quiz</span>
        <span class="badge">88%</span>
      </div>

      <div class="status-item outline">
        <div class="icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
        </div>
        <span class="label">Reading</span>
        <span class="badge">1</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.status-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.status-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.75rem;
  font-weight: 500;
  transition: all 0.2s;
}

.icon-wrap {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  margin-right: 1rem;
}

.label {
  flex-grow: 1;
  color: #334155;
}

.badge {
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
}

/* Orange Theme (Assignment) */
.status-item.orange {
  background: #fff7ed;
}
.status-item.orange .icon-wrap {
  background: #ffedd5;
  color: #f97316;
}
.status-item.orange .badge {
  background: #f97316;
  color: white;
}

/* Teal Theme (Quiz) */
.status-item.teal {
  background: white;
  border: 1px solid #f1f5f9;
}
.status-item.teal .icon-wrap {
  background: white;
  color: #14b8a6;
  border: 1px solid #f1f5f9;
}
.status-item.teal .badge {
  background: #14b8a6;
  color: white;
}

/* Outline Theme (Reading) */
.status-item.outline {
  background: white;
  border: 1px solid #f1f5f9;
}
.status-item.outline .icon-wrap {
  background: white;
  color: #64748b;
  border: 1px solid #f1f5f9;
}
.status-item.outline .badge {
  background: #f1f5f9;
  color: #64748b;
}
</style>
