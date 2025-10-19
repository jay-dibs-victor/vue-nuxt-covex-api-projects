<template>
  <div class="category-nav-wrapper">
    <div class="nav-container">
      <button 
        v-if="showLeftArrow" 
        class="scroll-btn left" 
        @click="scroll('left')"
      >
        <Icon name="lucide:chevron-left" />
      </button>

      <div class="categories-scroll" ref="scrollContainer" @scroll="handleScroll">
        <div 
          v-for="cat in categories" 
          :key="cat.label" 
          class="cat-item" 
          :class="{ active: activeCategory === cat.label }"
          @click="activeCategory = cat.label"
        >
          <div class="icon-wrap">
            <Icon :name="cat.icon" size="24" />
          </div>
          <span class="label">{{ cat.label }}</span>
        </div>
      </div>

      <button 
        v-if="showRightArrow" 
        class="scroll-btn right" 
        @click="scroll('right')"
      >
        <Icon name="lucide:chevron-right" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const activeCategory = useState('activeCategory', () => 'All');
const scrollContainer = ref(null);
const showLeftArrow = ref(false);
const showRightArrow = ref(true);

const categories = [
  { label: 'All', icon: 'lucide:globe' },
  { label: 'Beachfront', icon: 'lucide:umbrella' },
  { label: 'Cabins', icon: 'lucide:home' },
  { label: 'Amazing pools', icon: 'lucide:waves' },
  { label: 'Treehouses', icon: 'lucide:trees' },
  { label: 'Desert', icon: 'lucide:sun' },
  { label: 'Mansion', icon: 'lucide:building' },
  { label: 'Vineyards', icon: 'lucide:grape' },
  { label: 'Countryside', icon: 'lucide:mountain' },
  { label: 'Islands', icon: 'lucide:palmtree' },
  { label: 'Ski-in/out', icon: 'lucide:snowflake' },
  { label: 'Luxe', icon: 'lucide:diamond' },
];

const handleScroll = () => {
  if (!scrollContainer.value) return;
  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
  showLeftArrow.value = scrollLeft > 0;
  showRightArrow.value = scrollLeft < scrollWidth - clientWidth - 5;
};

const scroll = (direction) => {
  if (!scrollContainer.value) return;
  const amount = 400;
  scrollContainer.value.scrollBy({
    left: direction === 'left' ? -amount : amount,
    behavior: 'smooth'
  });
};

onMounted(() => {
  handleScroll();
});
</script>

<style scoped>
.category-nav-wrapper {
  position: sticky;
  top: 80px;
  background: white;
  z-index: 100;
  padding: 1.25rem 0;
  border-bottom: 1px solid #ebebeb;
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  display: flex;
  align-items: center;
}

.categories-scroll {
  display: flex;
  gap: 2.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
  padding-bottom: 4px;
}

.categories-scroll::-webkit-scrollbar {
  display: none;
}

.cat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.2s;
  min-width: fit-content;
  border-bottom: 2px solid transparent;
  padding-bottom: 0.75rem;
}

.cat-item:hover {
  opacity: 1;
  border-bottom-color: #ddd;
}

.cat-item.active {
  opacity: 1;
  border-bottom-color: #222;
}

.icon-wrap {
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.label {
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.scroll-btn {
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.scroll-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.scroll-btn.left {
  left: 10px;
}

.scroll-btn.right {
  right: 10px;
}

@media (min-width: 1024px) {
  .nav-container {
    padding: 0 60px;
  }
  .scroll-btn.left { left: 20px; }
  .scroll-btn.right { right: 20px; }
}
</style>
