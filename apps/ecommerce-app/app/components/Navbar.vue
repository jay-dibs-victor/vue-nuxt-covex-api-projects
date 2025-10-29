<template>
  <header class="header">
    <NuxtLink to="/" class="logo">VELOCITY ACTIVE</NuxtLink>
    
    <div class="nav-links">
      <button 
        v-for="cat in ['men', 'women', 'tops', 'bottoms']" 
        :key="cat"
        @click="updateCategory(cat)"
        class="nav-link"
        :class="{ active: filters.category === cat || filters.gender === cat }"
      >
        {{ cat.toUpperCase() }}
      </button>
    </div>

    <div class="actions">
      <div v-if="isLoggedIn" class="user-menu">
        <NuxtLink to="/account" class="icon-link">ACCOUNT</NuxtLink>
        <button @click="logout" class="icon-link text-btn">LOGOUT</button>
      </div>
      <button v-else @click="openAuth" class="icon-link text-btn">LOGIN</button>
      
      <button @click="openCart" class="cart-btn">
        CART
        <span v-if="itemCount > 0" class="badge">{{ itemCount }}</span>
      </button>
      <button class="mobile-menu-btn">☰</button>
    </div>
  </header>
</template>

<script setup>
import { useCart } from '~/composables/useCart'
import { useAuth } from '~/composables/useAuth'
import { useProducts } from '~/composables/useProducts'

const { itemCount, openCart } = useCart()
const { isLoggedIn, openAuth, logout } = useAuth()
const { filters, setCategory, setGender, resetFilters } = useProducts()

const updateCategory = (cat) => {
  resetFilters()
  if (cat === 'men' || cat === 'women') {
    setGender(cat)
  } else {
    setCategory(cat)
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eee;
  background: white;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  letter-spacing: 2px;
  font-size: 1.25rem;
  text-decoration: none;
  color: #111;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  background: none;
  border: none;
  font-size: 0.85rem;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.nav-link:hover, .nav-link.active {
  color: #111;
  border-bottom-color: #111;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-menu {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.icon-link {
  text-decoration: none;
  color: #111;
  font-weight: 600;
  font-size: 0.85rem;
}

.text-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.cart-btn {
  background: #111;
  color: white;
  border: none;
  padding: 0.6rem 1.25rem;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s;
}

.cart-btn:hover {
  background: #333;
}

.badge {
  background: white;
  color: #111;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 9px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  .mobile-menu-btn {
    display: block;
  }
  .user-menu {
    display: none;
  }
}
</style>
