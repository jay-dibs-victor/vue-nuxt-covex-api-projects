<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">StaySphere</div>
      <button class="mobile-menu-btn">☰</button>
      <nav class="nav-links">
        <a href="#" class="active">Places to stay</a>
        <a href="#">Experiences</a>
        <a href="#">Online Experiences</a>
      </nav>
      <div class="user-menu">
        <a href="#" class="host-link">Become a Host</a>
        <button class="globe">🌐</button>
        <div class="profile-pill">
          <span>☰</span>
          <div class="user-avatar">👤</div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  border-bottom: 1px solid #ebebeb;
  padding: 1rem 0;
  background: white;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  color: #ff385c;
  font-size: 1.5rem;
  letter-spacing: -0.04em;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #222;
  font-weight: 500;
  font-size: 0.95rem;
}

.nav-links a.active {
  border-bottom: 2px solid #222;
  padding-bottom: 0.5rem;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.host-link {
  text-decoration: none;
  color: #222;
  font-weight: 600;
  font-size: 0.9rem;
}

.profile-pill {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid #ddd;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.profile-pill:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.globe {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

@media (max-width: 1024px) {
  .header-container {
    padding: 0 2rem;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 1.5rem;
  }
  .nav-links {
    display: none;
  }
  .user-menu {
    display: none;
  }
  .mobile-menu-btn {
    display: block;
  }
}
</style>
