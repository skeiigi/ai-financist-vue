import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Импорт роутера из папки src/router
import './assets/main.css'   // Импорт стилей Tailwind

const app = createApp(App)

// ПОРЯДОК ВАЖЕН: сначала подключаем роутер, потом монтируем приложение
app.use(router)

app.mount('#app')