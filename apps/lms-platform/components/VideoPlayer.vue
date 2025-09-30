<template>
  <div class="card player-card" v-if="activeCourse">
    <div class="player-container">
      <iframe 
        v-if="videoUrl"
        :src="videoUrl" 
        class="main-video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen
      ></iframe>
      
      <div class="video-overlay" v-if="!isPlaying" @click="startVideo">
        <button class="play-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useConvexQuery } from '~/composables/useConvex';

const props = defineProps({
  course: {
    type: Object,
    default: null
  }
});

const { data: courses } = useConvexQuery("courses:getCourses");
const activeCourse = computed(() => {
  if (props.course) return props.course;
  return courses.value?.find(c => c.status === 'active') || courses.value?.[0];
});

const isPlaying = ref(false);

// YouTube embed URL with autoplay parameter
const videoUrl = computed(() => {
  const baseUrl = "https://www.youtube.com/embed/ScMzIvxBSi4";
  return isPlaying.value ? `${baseUrl}?autoplay=1` : baseUrl;
});

const startVideo = () => {
  isPlaying.value = true;
};
</script>

<style scoped>
.player-card {
  padding: 0;
  overflow: hidden;
  background: #000;
}

.player-container {
  position: relative;
  aspect-ratio: 16/9;
}

.main-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: rgba(0,0,0,0.3);
  cursor: pointer;
}

.play-btn {
  width: 64px;
  height: 64px;
  background: #f97316;
  border: none;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 30px rgba(249, 115, 22, 0.5);
  transition: transform 0.2s;
}

.play-btn:hover {
  transform: scale(1.1);
}
</style>
