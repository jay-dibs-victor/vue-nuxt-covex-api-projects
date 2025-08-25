<template>
  <div class="md:flex invisible md:visible  items-center gap-2 relative ">
    <!-- top-level triggers -->
    <ul
      v-for="(item, i) in menu"
      :key="i"
      class="relative p-3 mb-2"
      @mouseenter="onHover(item, $event)"
    >
      <li
        class="nav-link font-medium"
        @click="onClick(item, $event)"
        :aria-expanded="isOpen && root === item ? 'true':'false'"
      >
        {{ item.label }}
        <span v-if="item.badge" class="badge">{{ item.badge }}</span>
      </li>
    </ul>

  
    <div class="overlay" :class="{ open: isOpen }" @click="closeAll"></div>

  
    <div
      v-if="isOpen"
      class="dropdown-wrap open"
      :style="bubbleStyle"
      @mouseenter="hoveringPanel = true"
      @mouseleave="hoveringPanel = false"
    >
      <div class="dropdown">
        <div class="tooltip-edge"></div>

      
        <div class="flex items-center justify-between mb-2">
          <div class="text-sm font-medium">{{ current().title }}</div>
          <div class="flex items-center gap-2">
            <button v-if="stack.length>1" class="nav-link" @click="back">← Back</button>
            <button class="nav-link" @click="closeAll">✕</button>
          </div>
        </div>

        <!-- content panel (redraws forward/back) -->
        <div class="panel">
          <div
            v-for="(level, li) in stack"
            :key="li"
            class="level"
            :class="level.anim"
          >
            <div class="flex flex-col gap-2">
              <!-- render items; leaves navigate away; parents redraw -->
              <template v-for="(child, ci) in level.items" :key="ci">
                <router-link
                  v-if="!child.children && child.to"
                  class="nav-link border"
                  :to="child.to"
                  @click.native="closeAll"
                >
                  {{ child.label }}
                </router-link>

                <button
                  v-else
                  class="nav-link border flex items-center justify-between"
                  @click="forward(child.label, normalizeChildren(child))"
                >
                  <span>{{ child.label }}</span>
                  <span>›</span>
                </button>
              </template>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useMenuStack } from '../../composables/useMenuStack'

const props = defineProps({ menu: { type: Array, default: () => [] } })

const isOpen = ref(false)
const hoveringPanel = ref(false)
const root = ref(null)
const bubbleStyle = ref({ left: '0px' })

const { stack, openRoot, forward, back, current } = useMenuStack()

// normalize children (supports {children}, or columns-style arrays if you add them later)
const normalizeChildren = (item) => {
  if (Array.isArray(item.children)) return item.children
  return []
}

const openFor = (item, triggerEl) => {
  root.value = item
  openRoot(normalizeChildren(item), item.label)
  isOpen.value = true
  // position bubble under trigger
  const rect = triggerEl.getBoundingClientRect()
  bubbleStyle.value = { left: rect.left + 'px',  }
}

const onHover = (item, evt) => {
  if (!item.children) return
  openFor(item, evt.currentTarget)
}

const onClick = (item, evt) => {
  if (item.children) {
    openFor(item, evt.currentTarget)
  } else if (item.to) {
    // plain link; let router-link handle in parent shell
  }
}

const closeAll = () => {
  isOpen.value = false
  root.value = null
}

const onEsc = (e) => { if (e.key === 'Escape') closeAll() }
window.addEventListener('keydown', onEsc)
onBeforeUnmount(() => window.removeEventListener('keydown', onEsc))

defineExpose({ closeAll })
</script>
