<template>
  <footer class="text-lg" style="background: #fff">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Footer Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div
          v-for="(chunk, colIndex) in projectChunks"
          :key="colIndex"
        >
          <h3 class="font-bold text-lg mb-4">Projects {{ colIndex + 1 }}</h3>
          <ul class="space-y-2">
            <li v-for="project in chunk" :key="project.id" 
            style="color:#000">
              <router-link
                :to="`/projects/${project.id}`"
                class="hover:underline text-black"
              >
                {{ project.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="mt-8 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
        © {{ new Date().getFullYear() }} My Portfolio. All Rights Reserved.
      </div>

    </div>
  </footer>
</template>

<script>
import projectsData from "../data/projects.json";

export default {
  name: "MegaFooter",
  data() {
    return {
      projects: projectsData.slice(0, 20) // first 20 projects
    };
  },
  computed: {
    projectChunks() {
      // Split into 6 columns
      const chunkSize = Math.ceil(this.projects.length / 6);
      const chunks = [];
      for (let i = 0; i < this.projects.length; i += chunkSize) {
        chunks.push(this.projects.slice(i, i + chunkSize));
      }
      return chunks;
    }
  }
};
</script>
