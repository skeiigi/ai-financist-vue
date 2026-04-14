<template>
  <div class="container">
    <h1>Новый расход</h1>
    <div class="card">
      <div v-if="error" style="color: red; padding: 10px; margin-bottom: 15px; border: 1px solid red; border-radius: 4px;">
        {{ error }}
      </div>

      <div class="form-group">
        <label>Сумма</label>
        <input 
          v-model.number="expense.amount" 
          type="number" 
          class="input-field" 
          placeholder="0.00"
          :disabled="loading"
        >
      </div>
      <div class="form-group">
        <label>Место покупки</label>
        <input 
          v-model="expense.merchant" 
          type="text" 
          class="input-field" 
          placeholder="Название магазина"
          :disabled="loading"
        >
      </div>
      <div class="form-group">
        <label>Категория</label>
        <select v-model="expense.category" class="input-field" :disabled="loading">
          <option>Продукты</option>
          <option>Транспорт</option>
          <option>Развлечения</option>
        </select>
      </div>
      <button @click="save" class="btn-primary" style="margin-top: 10px;" :disabled="loading">
        {{ loading ? 'Сохранение...' : 'Сохранить расход' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { store } from '../store' 
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const loading = ref(false)
const error = ref('')

const expense = ref({
  amount: '',
  category: 'Продукты',
  merchant: ''
})

const save = async () => {
  if (!expense.value.amount || expense.value.amount <= 0) {
    error.value = 'Введите корректную сумму!'
    return
  }
  
  loading.value = true
  error.value = ''

  try {
    // Сохраняем на бэкенде
    await api.addTransaction({
      amount: Number(expense.value.amount),
      merchant: expense.value.merchant || 'Без названия',
      category: expense.value.category,
      date: new Date().toISOString()
    })

    // Также добавляем локально для немедленного отображения
    store.addExpense({ ...expense.value })
    
    // Переходим в аналитику
    router.push('/analytics')
  } catch (err) {
    error.value = err.message || 'Ошибка при сохранении расхода'
    console.error('Save transaction error:', err)
  } finally {
    loading.value = false
  }
}
</script>