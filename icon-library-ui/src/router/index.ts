import { createRouter, createWebHistory } from 'vue-router'
import IconLibraryView from '../views/IconLibraryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'iconLibrary',
      component: IconLibraryView,
    },
  ],
})

export default router
