<template>
  <div class="user-menu-container">
    <div class="profile-pill" @click="isOpen = !isOpen" v-click-outside="() => isOpen = false">
      <span class="burger">☰</span>
      <div class="user-avatar">
        <img v-if="user" :src="user.avatar" class="avatar-img" />
        <span v-else>👤</span>
      </div>

      <!-- Dropdown Menu -->
      <div v-if="isOpen" class="dropdown-menu">
        <template v-if="!user">
          <button class="menu-item bold" @click="$emit('auth', 'signup')">Sign up</button>
          <button class="menu-item" @click="$emit('auth', 'login')">Log in</button>
        </template>
        <template v-else>
          <div class="user-info-brief">
            <strong>{{ user.name }}</strong>
            <span>{{ user.email }}</span>
          </div>
          <div class="divider"></div>
          <button class="menu-item">Messages</button>
          <NuxtLink to="/trips" class="menu-item" @click="isOpen = false">Trips</NuxtLink>
          <button class="menu-item">Wishlists</button>
          <div class="divider"></div>
          <button class="menu-item" @click="logout">Log out</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['user']);
const emit = defineEmits(['auth', 'logout']);
const isOpen = ref(false);

const logout = () => {
  emit('logout');
  isOpen.value = false;
};

// Simple directive for clicking outside
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};
</script>

<style scoped>
.user-menu-container {
  position: relative;
}

.profile-pill {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid #ddd;
  padding: 0.35rem 0.35rem 0.35rem 0.75rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.profile-pill:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.burger {
  font-size: 1rem;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: #717171;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: 110%;
  right: 0;
  width: 240px;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  z-index: 1001;
}

.menu-item {
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  font-size: 0.9rem;
  color: #222;
  cursor: pointer;
  transition: background 0.2s;
}

.menu-item:hover {
  background: #f7f7f7;
}

.menu-item.bold {
  font-weight: 600;
}

.user-info-brief {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-info-brief span {
  font-size: 0.75rem;
  color: #717171;
}

.divider {
  height: 1px;
  background: #ebebeb;
  margin: 0.5rem 0;
}
</style>
