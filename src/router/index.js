import { createRouter, createWebHistory } from 'vue-router'
import ricky from '../views/apiRickComponente.vue'
const router = createRouter({
  history: createWebHistory('#'),
  routes: [
    {
      path: '/api',
      component: ricky
    }
  ]
})

export default router
