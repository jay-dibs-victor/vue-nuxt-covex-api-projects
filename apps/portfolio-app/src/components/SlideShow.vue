<template>
  <section class="bg-light p-6">
    <div class="max-w-6xl mx-auto">
       <h2 class="text-4xl font-bold">Frontend UI's</h2>
      <!-- Carousel Container -->
      <div class="relative overflow-hidden">
        
        <!-- Slides -->
        <div
          class="flex transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${currentIndex * slideWidth}%)` }"
        >
          <div
            v-for="(project, index) in projects"
            :key="project.id"
            class="min-w-33 md:min-w-25 p-4"

           
          >
            <div class="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden min-w-33 md:min-w-25 "
            >
             <div v-if="!project.image.includes('https')" class="img-placeholder" ></div>
              <img v-if="project.image" :src="project.image" :alt="project.title" class="w-full h-48 object-cover" />
              <div class="p-4">
                <h3 class="font-bold text-lg mb-1">{{ project.title }}</h3>
                <p class="text-sm text-gray-500">{{ project.category }}</p>
                <button
                  @click="viewProject(project)"
                  class="mt-3 bg-primary text-white px-3 py-2 rounded hover:bg-primary-dark"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Prev / Next Buttons -->
        <button
          @click="prevSlide"
          class="absolute p-3 top-1/2 -translate-y-1/2 left-2 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary hover:text-white"
        >
          ‹
        </button>
        <button
          @click="nextSlide"
          class="absolute p-3 top-1/2 -translate-y-1/2 right-2 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary hover:text-white"
        >
          ›
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import projectsData from "../data/samples.json";

export default {
  name: "ProjectCarousel",
  data() {
    return {
      projects: projectsData.slice(0, 20),
      currentIndex: 0,
      autoPlayInterval: null,
      slideWidth: 100, // % of viewport for 1 slide
    };
  },
  mounted() {
    this.updateSlideWidth();
    window.addEventListener("resize", this.updateSlideWidth);
    this.startAutoPlay();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateSlideWidth);
    this.stopAutoPlay();
  },
  methods: {
    updateSlideWidth() {
      if (window.innerWidth >= 1024) {
        this.slideWidth = 25; // 4 slides per view
      } else if (window.innerWidth >= 768) {
        this.slideWidth = 33.333; // 3 slides per view
      } else {
        this.slideWidth = 80; // 1.25 slides per view
      }
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.projects.length;
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.projects.length) % this.projects.length;
    },
    startAutoPlay() {
      this.autoPlayInterval = setInterval(this.nextSlide, 10000);

    },
    stopAutoPlay() {
      clearInterval(this.autoPlayInterval);
    },
    viewProject(project) {
      window.open(project.url, "_blank");
    },
  },
};
</script>


<style scoped>
.bg-light { background-color: #f9fafb; }
.bg-primary { background-color:rgb(50, 9, 72); }
.bg-primary-dark { background-color: rgb(56, 9, 72); }
.text-white { color: #fff; }
.text-gray-500 { color: #6b7280; }
.shadow-lg { box-shadow: 0 10px 15px rgba(0,0,0,0.1); }
.hover\:shadow-xl:hover { box-shadow: 0 20px 25px rgba(0,0,0,0.15); }
.rounded-lg { border-radius: 0.5rem; }
.transition { transition: all 0.3s ease; }
.p-4 { padding: 1rem; }
.max-w-6xl { max-width: 72rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.relative{position: relative}
.overflow-hidden{overflow: hidden}

.min-w-80{
 width:350px
} 
.min-w-33{
   width: 300px;
} 
@media (min-width: 780px) {
 .md\:min-w-33{
   width: 33%
} 
}


.img-placeholder {
  background: linear-gradient(135deg, #4b5563, #6b7280); /* Gray gradient */
  border-radius: 0.5rem;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  position: relative;
  

  width:100%;
  height: 200px
}



</style>

