<template>
  <div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
      <h1 style="margin: 0;">Мои цели</h1>
      <button 
        @click="showForm = !showForm" 
        class="btn-primary" 
        style="width: auto; padding: 10px 15px; border-radius: 10px;"
        :disabled="loading"
      >
        {{ showForm ? '×' : '+' }}
      </button>
    </div>

    <div v-if="showForm" class="card" style="padding: 20px; margin-bottom: 20px; border: 1px solid #2563eb;">
      <h3 style="margin-top: 0; margin-bottom: 15px;">Новая цель</h3>
      <div class="form-group">
        <label>Название</label>
        <input v-model="newGoal.title" type="text" class="input-field" placeholder="Например: Новый iPhone" :disabled="loading">
      </div>
      <div class="form-group">
        <label>Целевая сумма (₽)</label>
        <input v-model.number="newGoal.target" type="number" class="input-field" placeholder="0.00" :disabled="loading">
      </div>
      <button @click="addNewGoal" class="btn-primary" style="margin-top: 10px;" :disabled="loading">
        {{ loading ? 'Сохранение...' : 'Создать цель' }}
      </button>
    </div>

    <div v-for="goal in store.goals" :key="goal.id" class="card" style="padding: 20px; margin-bottom: 15px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: bold;">
        <span>{{ goal?.title || goal?.Title || 'Без названия' }}</span>
        <span>
          {{ (goal?.currentAmount || goal?.CurrentAmount || 0).toLocaleString() }} / 
          {{ (goal?.targetAmount || goal?.TargetAmount || 0).toLocaleString() }} ₽
        </span>
      </div>
      
      <div style="height: 45px; background: #f3f4f6; border: 2px solid #e5e7eb; border-radius: 12px; overflow: hidden; position: relative;">
        <div :style="{ 
          /* Защита от деления на ноль и undefined */
          width: (goal?.targetAmount || goal?.TargetAmount) 
            ? Math.min(((goal?.currentAmount || goal?.CurrentAmount || 0) / (goal?.targetAmount || goal?.TargetAmount) * 100), 100) + '%' 
            : '0%', 
          background: '#2563eb', 
          height: '100%',
          transition: 'width 0.5s ease'
        }"></div>
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 500; color: #1f2937;">
          {{ (goal?.targetAmount || goal?.TargetAmount) 
            ? Math.round((goal?.currentAmount || goal?.CurrentAmount || 0) / (goal?.targetAmount || goal?.TargetAmount) * 100) 
            : 0 }}% накоплено
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { store } from '../store'

const showForm = ref(false)
const loading = ref(false)

const newGoal = reactive({
  title: '',
  target: ''
})

const addNewGoal = async () => {
  if (!newGoal.title || !newGoal.target) {
    return alert('Заполните все поля')
  }

  try {
    loading.value = true
    // ВАЖНО: вызываем асинхронный метод стора
    await store.addGoal({ 
      title: newGoal.title, 
      target: newGoal.target 
    })

    // Очищаем форму только при успехе
    newGoal.title = ''
    newGoal.target = ''
    showForm.value = false
  } catch (err) {
    console.error(err)
    alert('Не удалось создать цель. Проверьте соединение с сервером.')
  } finally {
    loading.value = false
  }
}
</script>