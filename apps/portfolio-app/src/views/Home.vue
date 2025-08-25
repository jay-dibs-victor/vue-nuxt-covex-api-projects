
<template>
<Header/>
  <HeroSection />
  <SkillsSectionGrid />
   <SlideShow/>
  <ProjectSection/>
    <Certificates/>
  <TestimonialSection/>

  <ResumeSection class="mt-12" />

  <Footer/>
  <ChatMe/>
</template>

<script setup>
import Header from "../components/Header/index.vue"

import HeroSection from '../components/Hero/index.vue'
import ProjectSection from '../components/Projects/index.vue'
import ResumeSection from '../components/ResumeSection.vue'
import TestimonialSection from "../components/TestimonialSection.vue"
import SlideShow from "../components/SlideShow.vue"
import SkillsSectionGrid from '../components/SkillSectionGrid.vue'
import SkillsSection from '../components/SkillsSection.vue'
import Certificates from '../components/Certificates.vue'
import ChatMe from '../components/ChatMe.vue'
import Footer from "../components/Footer.vue"
import { ref, computed } from 'vue'

const activeTag = ref('All')

// Create tag list dynamically
const allTags = computed(() => {
  const tags = new Set(['All'])
  projects.forEach(p => p.tech.forEach(t => tags.add(t)))
  return Array.from(tags)
})

const filteredProjects = computed(() => {
  if (activeTag.value === 'All') return projects
  return projects.filter(p => p.tech.includes(activeTag.value))
})

</script>


















































