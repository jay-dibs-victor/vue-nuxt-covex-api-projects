<template>
  <header class="navbar">
    <div class="container flex items-center justify-between">
      <router-link to="/" class="nav-link font-bold text-xl">MyPortfolio</router-link>

      <!-- Desktop horizontal -->
      <DesktopMenu :menu="menu" ref="desk" class="sm:hidden md:flex" />

      <!-- Right actions (desktop) -->
      <div class="invisible md:visible items-center gap-3">
        <router-link to="/contact" class="nav-link border">Contact</router-link>
      </div>

 
      <MobileDrawer :menu="menu" class="lg:hidden" />
    </div>
  </header>
</template>

<script setup>
import "./menu.css"
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import menu from '../../data/nav.json'
import DesktopMenu from './DesktopView.vue'
import MobileDrawer from './MobileDrawer.vue'

const desk = ref(null)
const router = useRouter()

// Close open dropdown when navigating
const off = router?.afterEach(() => {
  if (desk.value?.closeAll) desk.value.closeAll()
})
onBeforeUnmount(() => off && off())
</script>
