<template>
  <section class="container py-12">
    <div class="">
      <!-- LEFT COLUMN: Tag rail + view switcher -->
      <div class="flex sm:flex-row flex-col  grid gap-8 grid-cols-2 sm:grid-cols-1">
        <h2 class="text-4xl font-bold">Projects</h2>

        <!-- Horizontal tag scroller -->
        <div class="relative   md:inline-block invisible md:visible ">
          <!-- Left arrow -->
          <button class="circle-btn left" @click="scrollTags(-1)" aria-label="Scroll tags left">‹</button>

          <div ref="tagRail" class="tag-rail no-scrollbar">
            <button
              v-for="t in tags"
              :key="t"
              class="tag bg-white"
              :class="t === activeTag ? 'tag--active' : ''"
              @click="setTag(t)"
            >
              {{ t }}
            </button>
          </div>

          <!-- Right arrow -->
          <button class="circle-btn right" @click="scrollTags(1)" aria-label="Scroll tags right">›</button>
        </div>


        

       
      </div>


       <!-- View switcher -->
        <div class="flex justify-end items-center gap-2 mb-8">
          <span class="text-sm text-gray-600">View:</span>
          <button
            class="icon-btn"
            :class="{ 'icon-btn--active': view === 'grid' }"
            @click="view = 'grid'"
            aria-label="Grid view"
            title="Grid view"
          >
            <!-- grid icon -->
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M3 3h8v8H3V3Zm10 0h8v8h-8V3ZM3 13h8v8H3v-8Zm10 0h8v8h-8v-8Z"/>
            </svg>
          </button>
          <button
            class="icon-btn"
            :class="{ 'icon-btn--active': view === 'list' }"
            @click="view = 'list'"
            aria-label="List view"
            title="List view"
          >
            <!-- list icon -->
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z"/>
            </svg>
          </button>
        </div>

      <div>
        <div
          :class="view === 'grid' ? 'cards-grid' : 'cards-list'"
          class="gap-5"
        >
          <ProjectCard
            v-for="p in filtered"
            :key="p.id"
            :project="p"
            :view="view"
            @preview="openPreview"
          />
        </div>
      </div>
     
    </div>


    <!-- Modal -->
    <ProjectModal :isOpen="modalOpen" :project="activeProject" @close="modalOpen = false" />
    
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProjectCard from './ProjectCard.vue'
import ProjectModal from './ProjectModal.vue'
import projects from '../../data/projects.json'

const tagRail = ref(null)
const view = ref('grid') // 'grid' | 'list'
const activeTag = ref('All')

const tags = computed(() => {
  const set = new Set(['All'])
  projects.forEach(p => p.tags.forEach(t => set.add(t)))
  return Array.from(set)
})
const filtered = computed(() => {
  if (activeTag.value === 'All') return projects
  return projects.filter(p => p.tags.includes(activeTag.value))
})
const setTag = (t) => { activeTag.value = t }

const scrollTags = (dir) => {
  const rail = tagRail.value
  if (!rail) return
  const delta = Math.round(rail.clientWidth * 0.7) * (dir > 0 ? 1 : -1)
  rail.scrollBy({ left: delta, behavior: 'smooth' })
}

// Modal
const modalOpen = ref(false)
const activeProject = ref(null)
const openPreview = (p) => {
  activeProject.value = p
  modalOpen.value = true
}

onMounted(() => {
  // optional: snap to start
  tagRail.value?.scrollTo({ left: 0, behavior: 'instant' })
})
</script>

<style scoped>
/* container helper (tailwind-like) */
.container{max-width:1200px;margin:0 auto;padding:0 1rem}

/* tag rail */
.tag-rail{
  display:flex;gap:.5rem;overflow-x:auto;
  scroll-behavior:smooth;padding:.25rem .5rem;
  border:1px solid rgba(0,0,0,.08);
  border-radius:9999px;background:#fff;
  overflow-x:hidden
}
.tag{
  white-space:nowrap;
  padding:.45rem .8rem;border-radius:9999px;
  background:#f3f4f6;color:#40196d;font-weight:600;font-size:.85rem;transition:background .15s
}
.tag:hover{background:#e5e7eb}
.tag--active{background:#111;color:#40196d}

/* hide scrollbar (webkit + firefox) */
.no-scrollbar{scrollbar-width:none; }
.no-scrollbar::-webkit-scrollbar{display:none}

/* arrow buttons */
.circle-btn{
  position:absolute;top:10%;transform:translateY(-10%);
  width:36px;height:36px;border-radius:9999px;background:#40196d;color:#fff;display:flex;align-items:center;justify-content:center;
  z-index:5;box-shadow:0 6px 14px rgba(0,0,0,.2)
}
.circle-btn.left{left:-.75rem}
.circle-btn.right{right:-.75rem}

/* view switcher */
.icon-btn{width:36px;height:36px;border-radius:.6rem;display:flex;align-items:center;justify-content:center;background:#f3f4f6;color:#111}
.icon-btn--active{background:#111;color:#fff}

/* card layouts */
.cards-grid{display:grid;grid-template-columns:repeat(1,minmax(0,1fr))}
@media(min-width:640px){.cards-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(min-width:1024px){.cards-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
.cards-list{display:flex;flex-direction:column}
.border{border:1px solid rgba(0,0,0,.08)}
.rounded-lg{border-radius:.75rem}
.bg-white{background:#fff}
.hover\:shadow:hover{box-shadow:0 10px 26px rgba(0,0,0,.12)}
.transition{transition:all .2s ease}
.text-2xl{font-size:1.5rem}
.font-bold{font-weight:700}
.text-gray-600{color:#4b5563}
.text-gray-700{color:#374151}
.p-4{padding:1rem}
.gap-5{gap:1.25rem}
.py-12{padding-top:3rem;padding-bottom:3rem}
</style>