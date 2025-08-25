<template>
  <section class="max-w-2xl mx-auto py-10 container">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Certificates</h2>

    <div
      v-for="(cert, index) in certificates"
      :key="index"
      class="border-b border-gray-200"
    >
      <!-- Accordion Header -->
      <button
        @click="toggle(index)"
        class="w-full flex justify-between items-center py-4 text-left focus:outline-none bg-white m-4 p-4"
      >
        <span class="text-lg font-medium text-gray-700">
          {{ cert.title }}
        </span>
        <span
          class="transform transition-transform duration-300"
          :class="{ 'rotate-180': activeIndex === index }"
        >
          ▼
        </span>
      </button>

      <!-- Accordion Content -->
      <transition name="accordion">
        <div v-if="activeIndex === index" class="pb-4 pl-2 text-md text-gray-600 ml-8">
          <p><strong>Issuer:</strong> {{ cert.issuer }}</p>
          <p><strong>Year:</strong> {{ cert.year }}</p>
          <p class="mt-2">{{ cert.description }}</p>

          <a
            :href="cert.link"
            target="_blank"
            class="inline-block mt-3 text-blue-600 hover:underline"
          >
            View Certificate
          </a>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const activeIndex = ref(null);

const certificates = ref([
  {
    title: "Frontend Development Certificate",
    issuer: "FreeCodeCamp",
    year: "2023",
    description:
      "Completed a comprehensive course on frontend development including HTML, CSS, JavaScript, and React.",
    link: "https://example.com/frontend-cert",
  },
  {
    title: "Backend Development Certificate",
    issuer: "Coursera",
    year: "2022",
    description:
      "Learned backend fundamentals including Node.js, Express, MongoDB, and API design.",
    link: "https://example.com/backend-cert",
  },
  {
    title: "Cloud Fundamentals",
    issuer: "AWS Academy",
    year: "2021",
    description:
      "Introduction to cloud computing concepts, AWS services, and basic architecture.",
    link: "https://example.com/aws-cert",
  },
]);

function toggle(index) {
  activeIndex.value = activeIndex.value === index ? null : index;
}
</script>

<style>

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
