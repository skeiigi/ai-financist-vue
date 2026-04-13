<template>
  <div class="container">
    <h1>Новый расход</h1>
    <div class="card">
      <div class="form-group">
        <label>Сумма</label>
        <input 
          v-model.number="expense.amount" 
          type="number" 
          class="input-field" 
          placeholder="0.00"
        >
      </div>
      <div class="form-group">
        <label>Место покупки</label>
        <input 
          v-model="expense.merchant" 
          type="text" 
          class="input-field" 
          placeholder="Название магазина"
        >
      </div>
      <div class="form-group">
        <label>Категория</label>
        <select v-model="expense.category" class="input-field">
          <option>Продукты</option>
          <option>Транспорт</option>
          <option>Развлечения</option>
        </select>
      </div>
      <button @click="save" class="btn-primary" style="margin-top: 10px;">
        Сохранить расход
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { store } from '../store' 
import { useRouter } from 'vue-router'

const router = useRouter()

const expense = ref({
  amount: '',
  category: 'Продукты',
  merchant: ''
})

const save = () => {
  if (!expense.value.amount || expense.value.amount <= 0) {
    return alert('Введите корректную сумму!');
  }
  
  // Передаем копию данных в стор
  store.addExpense({ ...expense.value });
  
  // Переходим в аналитику
  router.push('/analytics');
}
</script>