// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProjectDetail from '../views/ProjectDetail.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/projects/:id', component: ProjectDetail },
]

export default createRouter({
  history: createWebHistory(),
  routes
})







