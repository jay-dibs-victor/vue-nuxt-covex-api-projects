<template>
  <section style="background: #e6e6e6" class="relative w-full min-h flex items- bg-black overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white">
   
     <!-- Particles as divs -->
     <SlimeIntro/>

    <div class="container mx-auto px-6 relative z-10 grid grid-cols-2 md:grid-cols-2 gap-8 items-center">
      
      <!-- Left Text Column -->
      <div class="space-y-6">
        <h1 class="text-4xl md:text-4xl font-bold leading-tight">
          Hi I"m  <span class="text-primary">Victor Juwa.</span> A Frontend Developer
        </h1>
          <h1 class="text-2xl md:text-2xl font-bold leading-tight">
          <span class="text-primary">{{ displayText }}</span><span class="caret">|</span>
        </h1>

        <p class="text-lg text-gray-300 max-w-md">
         <span class="">Crafting high-quality web experiences with animations, responsiveness, and pixel-perfect designs is my niche</span><span class="caret">|</span>
        </p>
        <button class="btn-primary px-6 py-3">My Info</button>
      </div>

      <!-- Right Animated Placeholders -->
      <div class="relative  h-[400px] md:h-[500px]">
        <img src="/1752013400462.jpg" class="img-placeholder floating-1 absolute top-10 left-12 w-32 md:w-48 h-40 md:h-56"/>
        <div class="img-placeholder floating-2 absolute bottom-20 right-12 w-40 md:w-56 h-48 md:h-64"></div>
        <div class="img-placeholder floating-3 absolute top-1/2 left-1/3 w-36 md:w-52 h-44 md:h-60"></div>
      </div>

    </div>
  </section>
</template>

<script setup>
import "./hero.css"
import { onMounted, ref } from "vue";
import SlimeIntro from "./Splat.vue"
const particlesCanvas = ref(null);


/* Typing Animation */
const texts = [
  "I am keen on user eccentricity during product delivery",
  "Building aesthetic design using up-to date frontend technologies",
  " Crafting high-quality web experiences with animations, responsiveness, and pixel-perfect designs is my niche.",
  "Vue.js is my playground 🎯",
   "React  is my go to mvp frontend library 🎯",
   "I also build with Angular & Next js Frameworks",
   "For backend technologies still in my learning phase; ",
   "I also thrive in Node js/Express framework as well as Php /Laravel"
]

const displayText = ref("")
let textIndex = 0
let charIndex = 0
let isDeleting = false
const typingSpeed = 80
const deletingSpeed = 50
const pauseTime = 1500

const typeLoop = () => {
  const currentText = texts[textIndex]
  if (!isDeleting) {
    displayText.value = currentText.substring(0, charIndex + 1)
    charIndex++
    if (charIndex === currentText.length) {
      isDeleting = true
      return setTimeout(typeLoop, pauseTime)
    }
  } else {
    displayText.value = currentText.substring(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
    }
  }
  setTimeout(typeLoop, isDeleting ? deletingSpeed : typingSpeed)
}




// Randomized particle style for position and animation speed
const particlesCount = 15;

function particleStyle(n) {
  const size = Math.random() * 40 + 40; // 40px - 80px
  const top = Math.random() * 100;
  const left = Math.random() * 100;
  const duration = Math.random() * 6 + 6; // 6s - 12s
  const delay = Math.random() * 5; // stagger start
  const colors = ["#ff6b00", "#ff9f1c", "#39ff14"];
  return {
    width: `${size}px`,
    height: `${size}px`,
    top: `${top}%`,
    left: `${left}%`,
    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
    animation: `blobFloat ${duration}s ease-in-out ${delay}s infinite`,
  };
}
onMounted(() => {
  typeLoop()
  
})
</script>
