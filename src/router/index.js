import { createRouter, createWebHistory } from 'vue-router'
// Импортируем твои созданные файлы (убедись, что они созданы в src/views)
import HomeView from '../views/HomeView.vue'
import AddTransactionView from '../views/AddTransactionView.vue'
import AnalyticsView from '../views/AnalyticsView.vue'
import ChatView from '../views/ChatView.vue'
import GoalsView from '../views/GoalsView.vue'
import AuthView from '../views/AuthView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add-expense',
      name: 'add-transaction',
      component: AddTransactionView
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: AnalyticsView
    },
    { 
      path: '/chat', 
      name: 'chat', 
      component: ChatView 
    },
    { 
      path: '/goals', 
      name: 'goals', 
      component: GoalsView 
    },
    { 
      path: '/auth', 
      name: 'auth',
      component: AuthView 
    },
    { 
      path: '/register', 
      name: 'register',
      component: RegisterView 
    },
    { 
      path: '/profile', 
      name: 'profile',
      component: ProfileView
    }
  ]
})

export default router