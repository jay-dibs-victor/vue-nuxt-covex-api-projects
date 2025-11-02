<template>
  <div class="stars">
    <span 
      v-for="i in 5" 
      :key="i" 
      class="star" 
      :class="{ 
        active: i <= Math.floor(rating),
        half: i === Math.ceil(rating) && rating % 1 !== 0 
      }"
    >
      ★
    </span>
    <span v-if="showCount && count !== undefined" class="count">({{ count }})</span>
  </div>
</template>

<script setup>
defineProps({
  rating: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
  showCount: { type: Boolean, default: false }
})
</script>

<style scoped>
.stars {
  display: flex;
  align-items: center;
  gap: 2px;
  color: #ddd;
  font-size: 0.9rem;
}

.star.active {
  color: #fbbf24;
}

.star.half {
  position: relative;
  color: #ddd;
}

.star.half::after {
  content: '★';
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  overflow: hidden;
  color: #fbbf24;
}

.count {
  margin-left: 0.5rem;
  font-size: 0.75rem;
  color: #999;
  font-weight: 600;
}
</style>
