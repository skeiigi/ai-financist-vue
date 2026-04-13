import { reactive } from 'vue'

export const store = reactive({
  isLoggedIn: true, // поставим true для тестов
  transactions: [
    { id: 1, amount: 500, merchant: 'Магнит', category: 'Продукты', date: '2026-04-12' },
    { id: 2, amount: 200, merchant: 'Такси', category: 'Транспорт', date: '2026-04-12' }
  ],
  goals: [
    { id: 1, title: 'Отпуск', target: 300000, current: 210000 },
    { id: 2, title: 'Автомобиль', target: 70000000, current: 15000000 }
  ],

  // Метод добавления
  addExpense(payload) {
    this.transactions.unshift({
      id: Date.now(),
      amount: Number(payload.amount), // принудительно число
      merchant: payload.merchant || 'Без названия',
      category: payload.category,
      date: new Date().toLocaleDateString('ru-RU')
    });
    console.log('Данные в store обновлены:', this.transactions);
  },

  addGoal(goal) {
    this.goals.push({
      id: Date.now(),
      title: goal.title,
      target: Number(goal.target),
      current: 0 // Новая цель всегда начинается с нуля
    });
  }
})