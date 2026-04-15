<script setup>
import { computed } from 'vue'
import { store } from '../store'

// 1. Группировка трат по реальным датам (последние 7 дней)
const chartData = computed(() => {
  const daysLabels = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const result = [];
  
  // Создаем массив последних 7 дней (от 6 дней назад до сегодня)
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0); // Обнуляем время для точного сравнения
    
    result.push({
      dateObj: d,
      label: daysLabels[d.getDay()],
      amount: 0
    });
  }

  // Распределяем транзакции по созданным дням
  store.transactions.forEach(t => {
    // Важно: на бэкенде поле может называться Date, date или createdAt
    const tDate = new Date(t.date || t.createdAt);
    tDate.setHours(0, 0, 0, 0);

    const dayData = result.find(d => d.dateObj.getTime() === tDate.getTime());
    if (dayData) {
      dayData.amount += t.amount;
    }
  });

  return result;
});

// 2. Улучшенный расчет категорий (динамический)
const categories = computed(() => {
  // Названия должны совпадать с теми, что ты выбираешь при добавлении
  const config = {
    'Продукты': { color: '#2563eb', icon: '🛒' },
    'Транспорт': { color: '#fbbf24', icon: '🚕' },
    'Развлечения': { color: '#34d399', icon: '🎭' },
    'Здоровье': { color: '#ef4444', icon: '💊' },
    'Другое': { color: '#6b7280', icon: '📦' }
  };

  const stats = {};
  let total = 0;

  store.transactions.forEach(t => {
    const catName = t.category || 'Другое';
    if (!stats[catName]) {
      stats[catName] = { 
        amount: 0, 
        color: config[catName]?.color || '#9ca3af', 
        icon: config[catName]?.icon || '💰' 
      };
    }
    stats[catName].amount += t.amount;
    total += t.amount;
  });

  return Object.keys(stats).map(name => ({
    name,
    ...stats[name],
    percent: total > 0 ? (stats[name].amount / total) * 100 : 0
  })).sort((a, b) => b.amount - a.amount); // Самые дорогие категории сверху
});

const maxAmount = computed(() => {
  const amounts = chartData.value.map(d => d.amount);
  const max = Math.max(...amounts);
  return max > 0 ? max : 1000;
});
</script>

<template>
  <div class="container" style="padding-bottom: 80px;">
    <div class="card" style="padding: 20px;">
      <h3 style="margin: 0 0 5px 0; font-size: 16px; color: #111827;">Траты за неделю</h3>
      <p style="font-size: 12px; color: #6b7280; margin-bottom: 25px;">Динамика расходов по дням</p>
      
      <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 160px; padding-bottom: 10px; border-bottom: 1px solid #f3f4f6;">
        <div v-for="(day, index) in chartData" :key="index" 
             style="display: flex; flex-direction: column; align-items: center; width: 12%;">
          
          <span v-if="day.amount > 0" style="font-size: 9px; font-weight: bold; margin-bottom: 4px;">{{ day.amount }}</span>
          
          <div :style="{ 
            height: (day.amount / maxAmount * 120) + 'px', 
            width: '100%', 
            background: day.amount === maxAmount && day.amount > 0 ? '#10b981' : '#3b82f6', 
            borderRadius: '4px 4px 2px 2px',
            transition: 'height 0.5s ease-out' 
          }"></div>
          
          <span style="font-size: 11px; color: #9ca3af; margin-top: 8px; font-weight: 500;">{{ day.label }}</span>
        </div>
      </div>
    </div>

    <h3 style="margin: 25px 0 15px 5px; font-size: 18px; font-weight: bold;">Распределение по категориям</h3>
    
    <div v-if="categories.length === 0" class="card" style="padding: 30px; text-align: center; color: #9ca3af;">
      Здесь пока нет данных. Добавьте свою первую трату!
    </div>

    <div v-else class="card" style="padding: 0; overflow: hidden;">
      <div v-for="cat in categories" :key="cat.name" 
           style="padding: 16px; border-bottom: 1px solid #f3f4f6; display: flex; flex-direction: column; gap: 10px;">
        
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 20px;">{{ cat.icon }}</span>
            <span style="font-weight: 600; font-size: 15px;">{{ cat.name }}</span>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: bold; font-size: 15px;">{{ cat.amount.toLocaleString() }} ₽</div>
            <div style="font-size: 11px; color: #9ca3af;">{{ cat.percent.toFixed(1) }}%</div>
          </div>
        </div>

        <div style="height: 6px; background: #f3f4f6; border-radius: 10px; overflow: hidden;">
          <div :style="{ 
            width: cat.percent + '%', 
            background: cat.color, 
            height: '100%', 
            transition: 'width 0.8s cubic-bezier(0.1, 0.7, 1.0, 0.1)' 
          }"></div>
        </div>
      </div>
    </div>
  </div>
</template>