<template>
  <div class="md:hidden p-3 m-3">
    <button class="nav-link" @click="open = true" aria-label="Open Menu">☰</button>

    <div class="drawer" :class="{ open }" v-show="hydrated" role="dialog" aria-modal="true">
    
      <div class="drawer-header">
        <button v-if="stack.length>1" class="nav-link" @click="back">←</button>
        <div class="text-lg font-bold">{{ current().title }}</div>
        <button class="nav-link" @click="open = false">✕</button>
      </div>

      
      <div class="drawer-body">
        <div
          v-for="(level, idx) in stack"
          :key="idx"
          class="level"
          :class="level.anim"
        >
          <div class="flex flex-col gap-2">
            <template v-for="(item, i) in level.items" :key="i">
              
              <router-link
                v-if="!item.children && item.to"
                class="nav-link border"
                :to="item.to"
                @click.native="open=false"
              >
                {{ item.label }}
                <span v-if="item.badge" class="badge">{{ item.badge }}</span>
              </router-link>

              <!-- parent -->
              <button
                v-else
                class="nav-link border flex items-center justify-between"
                @click="forward(item.label, normalizeChildren(item))"
              >
                <span>{{ item.label }}</span>
                <span>›</span>
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

  
    <div class="overlay" :class="{ open }" @click="open=false"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMenuStack } from '../../composables/useMenuStack'

const props = defineProps({ menu: { type: Array, default: () => [] } })

const { stack, openRoot, forward, back, current } = useMenuStack()
const open = ref(false)
const hydrated = ref(false)

const normalizeChildren = (item) => Array.isArray(item.children) ? item.children : []

onMounted(() => {
  openRoot(props.menu, 'Menu')
  hydrated.value = true
})
</script>
