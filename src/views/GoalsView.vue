<template>
  <div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
      <h1 style="margin: 0;">Мои цели</h1>
      <button 
        @click="showForm = !showForm" 
        class="btn-primary" 
        style="width: auto; padding: 10px 15px; border-radius: 10px;"
      >
        {{ showForm ? '×' : '+' }}
      </button>
    </div>

    <div v-if="showForm" class="card" style="padding: 20px; margin-bottom: 20px; border: 1px solid #2563eb;">
      <h3 style="margin-top: 0; margin-bottom: 15px;">Новая цель</h3>
      <div class="form-group">
        <label>Название</label>
        <input v-model="newGoal.title" type="text" class="input-field" placeholder="Например: Новый iPhone">
      </div>
      <div class="form-group">
        <label>Целевая сумма (₽)</label>
        <input v-model.number="newGoal.target" type="number" class="input-field" placeholder="0.00">
      </div>
      <button @click="addNewGoal" class="btn-primary" style="margin-top: 10px;">Создать цель</button>
    </div>

    <div v-for="goal in store.goals" :key="goal.id" class="card" style="padding: 20px; margin-bottom: 15px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: bold;">
        <span>{{ goal.title }}</span>
        <span>{{ goal.current.toLocaleString() }} / {{ goal.target.toLocaleString() }} ₽</span>
      </div>
      
      <div style="height: 45px; background: #f3f4f6; border: 2px solid #e5e7eb; border-radius: 12px; overflow: hidden; position: relative;">
        <div :style="{ 
          width: Math.min((goal.current / goal.target * 100), 100) + '%', 
          background: '#2563eb', 
          height: '100%',
          transition: 'width 0.5s ease'
        }"></div>
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 500; color: #1f2937;">
          {{ Math.round(goal.current / goal.target * 100) }}% накоплено
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { store } from '../store';

const title = ref('');
const target = ref('');

const saveGoal = async () => {
  await store.addGoal({
    title: title.value,
    target: target.value
  });
  // Очищаем поля после добавления
  title.value = '';
  target.value = '';
};
</script>