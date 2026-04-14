<template>
  <div class="container">
    <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
      <div>
        <h1 style="margin: 0; font-size: 16px; color: #6b7280; font-weight: normal;">Привет, {{ userName }}!</h1>
        <p style="margin: 0; font-size: 20px; font-weight: bold;">Рад тебя видеть 👋</p>
      </div>
      <button @click="handleSettingsClick" class="settings-btn">
    ⚙️
  </button>
    </header>

    <div class="card" style="background: white; border-left: 5px solid #2563eb;">
      <h2 style="margin: 0; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Доступно на сегодня</h2>
      <p style="margin: 10px 0 0 0; font-size: 42px; font-weight: 900; color: #1f2937;">1 250 ₽</p>
      <div style="margin-top: 15px; height: 6px; background: #f3f4f6; border-radius: 3px; overflow: hidden;">
        <div style="width: 65%; height: 100%; background: #2563eb;"></div>
      </div>
      <p style="margin: 8px 0 0 0; font-size: 12px; color: #9ca3af;">Использовано 650 ₽ из лимита 1 900 ₽</p>
    </div>

    <button @click="$router.push('/add-expense')" 
            class="btn-primary" 
            style="margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 10px;">
      <span>➕</span> Зафиксировать расход
    </button>

    <RouterLink to="/chat" style="text-decoration: none; color: inherit;">
      <div class="card" style="background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; border: none; display: flex; align-items: center; gap: 15px; transition: transform 0.2s active;">
        <div style="font-size: 28px; background: rgba(255,255,255,0.2); width: 55px; height: 55px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          🤖
        </div>
        <div style="flex-grow: 1;">
          <h3 style="margin: 0; font-size: 16px; font-weight: bold;">Спросить ассистента</h3>
          <p style="margin: 2px 0 0 0; font-size: 13px; opacity: 0.85;">Анализ трат и советы</p>
        </div>
        <span style="font-size: 20px;">→</span>
      </div>
    </RouterLink>

    <div class="card" style="padding: 15px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: bold; font-size: 15px;">Месячный бюджет</span>
        <span style="color: #2563eb; font-weight: bold;">Осталось 12 450 ₽</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { store } from '../store'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()

const userName = ref('Друг')

onMounted(() => {
  const savedName = localStorage.getItem('userName')
  if (savedName) {
    userName.value = savedName
  }
})

const handleSettingsClick = () => {
  if (store.isLoggedIn) {
    router.push('/profile')
  } else {
    router.push('/auth')
  }
}
</script>

<style>
/* Добавим эффект нажатия на карточки */
.card:active {
  transform: scale(0.98);
}
</style>