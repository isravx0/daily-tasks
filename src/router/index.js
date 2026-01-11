import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: Tabs,
    children: [
      {
        path: 'tasks',
        component: () => import('@/views/Tasks.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/Settings.vue')
      },
      {
        path: 'habits',
        component: () => import('@/views/Habits.vue')
      },
      {
        path: '/dashboard',
        component: () => import('@/views/Dashboard.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
