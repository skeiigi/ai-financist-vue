<script setup>
import { computed } from 'vue'
import { store } from '../store' // Импортируем наше хранилище

// 1. Вычисляем данные для графиков на основе store.transactions
const chartData = computed(() => {
  const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  // Создаем структуру для последних 7 дней
  const lastDays = days.map(label => ({ label, amount: 0 }));

  store.transactions.forEach(t => {
    // Здесь простая логика для примера: ищем совпадение по дню недели
    // В реальном проекте лучше группировать по датам
    const date = new Date(); // Предположим, это текущая неделя
    const dayLabel = days[new Date().getDay()]; 
    const dayData = lastDays.find(d => d.label === dayLabel);
    if (dayData) dayData.amount += t.amount;
  });

  return lastDays;
});

// 2. Вычисляем категории на основе store.transactions
const categories = computed(() => {
  const cats = {
    'Продукты': { amount: 0, color: '#2563eb', icon: '🛒' },
    'Транспорт': { amount: 0, color: '#fbbf24', icon: '🚕' },
    'Развлечения': { amount: 0, color: '#34d399', icon: '🎭' }
  };

  let total = 0;
  store.transactions.forEach(t => {
    if (cats[t.category]) {
      cats[t.category].amount += t.amount;
      total += t.amount;
    }
  });

  return Object.keys(cats).map(name => ({
    name,
    ...cats[name],
    percent: total > 0 ? (cats[name].amount / total) * 100 : 0
  }));
});

// Находим максимальную сумму для масштабирования графиков
const maxAmount = computed(() => {
  const amounts = chartData.value.map(d => d.amount);
  return Math.max(...amounts, 1000); // Минимум 1000 для красоты
});

// Стили фильтров (можно оставить без изменений)
const activeFilterStyle = { /* ... твой код ... */ }
const inactiveFilterStyle = { /* ... твой код ... */ }
</script>

<template>
  <div class="container">
    <div class="card" style="padding: 20px;">
      <h3 style="margin: 0 0 20px 0; font-size: 16px; color: #6b7280;">Траты за неделю (₽)</h3>
      <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 150px; padding-bottom: 20px; border-bottom: 1px solid #f3f4f6;">
        <div v-for="(day, index) in chartData" :key="index" 
             style="display: flex; flex-direction: column; align-items: center; width: 12%;">
          <div :style="{ 
            height: (day.amount / maxAmount * 120) + 'px', 
            width: '100%', 
            background: day.amount > 2000 ? '#ef4444' : '#2563eb', 
            borderRadius: '4px',
            transition: 'height 0.3s ease' 
          }"></div>
          <span style="font-size: 10px; color: #9ca3af; margin-top: 8px;">{{ day.label }}</span>
        </div>
      </div>
    </div>

    <h3 style="margin: 25px 0 15px 5px; font-size: 18px;">По категориям</h3>
    <div class="card" style="padding: 0;">
      <div v-for="cat in categories" :key="cat.name" 
           style="padding: 15px; border-bottom: 1px solid #f3f4f6; display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; justify-content: space-between; font-size: 14px;">
          <span style="font-weight: bold;">{{ cat.icon }} {{ cat.name }}</span>
          <span style="color: #6b7280;">{{ cat.amount }} ₽</span>
        </div>
        <div style="height: 8px; background: #f3f4f6; border-radius: 4px; overflow: hidden;">
          <div :style="{ width: cat.percent + '%', background: cat.color, height: '100%', transition: 'width 0.5s ease' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>