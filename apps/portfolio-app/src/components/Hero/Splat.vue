<template>
  <div class="slime-container">
    <div
      v-for="(blob, i) in blobs"
      :key="i"
      class="slime-blob"
      :style="{
        backgroundColor: blob.color,
        width: blob.size + 'px',
        height: blob.size + 'px',
        top: blob.top + '%',
        left: blob.left + '%',
        animationDelay: blob.delay + 's'
      }"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      palette: ["#40196d", "#f8f8f8", "#f6f6f6"], // Nickelodeon slime colors
      blobs: []
    };
  },
  created() {
    this.generateBlobs(12);
  },
  methods: {
    generateBlobs(count) {
      for (let i = 0; i < count; i++) {
        this.blobs.push({
          color: this.palette[Math.floor(Math.random() * this.palette.length)],
          size: 80 + Math.random() * 120,
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: Math.random() * 5
        });
      }
    }
  }
};
</script>

<style scoped>
.slime-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}
.slime-blob {
  position: absolute;
  clip-path: path(
    "M40,0 C60,10 90,20 80,50 C70,80 40,90 20,80 C0,70 0,30 20,10 Z"
  );
  animation: morph 6s ease-in-out infinite alternate,
             floaty 8s ease-in-out infinite alternate;
  opacity: 0.6;
}

@keyframes morph {
  0% {
    clip-path: path("M40,0 C60,10 90,20 80,50 C70,80 40,90 20,80 C0,70 0,30 20,10 Z");
  }
  50% {
    clip-path: path("M35,5 C65,15 95,25 75,55 C65,85 35,95 15,75 C-5,65 5,25 25,5 Z");
  }
  100% {
    clip-path: path("M40,0 C60,10 90,20 80,50 C70,80 40,90 20,80 C0,70 0,30 20,10 Z");
  }
}

@keyframes floaty {
  0% { transform: translate(0px, 0px) rotate(0deg) scale(1); }
  50% { transform: translate(10px, -15px) rotate(5deg) scale(1.05); }
  100% { transform: translate(-10px, 10px) rotate(-5deg) scale(1); }
}
</style>
