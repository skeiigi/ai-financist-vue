import { reactive } from 'vue'
import api from './services/api' // Импортируем твой api.js

export const store = reactive({
  isLoggedIn: !!localStorage.getItem('token'), // Проверяем токен при загрузке страницы
  transactions: [
    { id: 1, amount: 500, merchant: 'Демо: Магнит', category: 'Продукты', date: '2026-04-12' },
    { id: 2, amount: 200, merchant: 'Демо: Такси', category: 'Транспорт', date: '2026-04-12' }
  ],
  goals: [
    { id: 1, title: 'Демо: Новый телефон', TargetAmount: 30000, CurrentAmount: 5000 },
    { id: 2, title: 'Демо: Путешествие', TargetAmount: 100000, CurrentAmount: 20000 }
  ],
  
  async fetchData() {
    if (!window.localStorage.getItem('token')) return;
    
    try {
      const [tx, gl, user] = await Promise.all([
        api.getTransactions(),
        api.getGoals(),
        api.getUserInfo()
      ]);
      
      // ВАЖНО: полностью заменяем массивы данными из БД
      this.transactions = tx; 
      this.goals = gl;
      this.user = user;
      this.isLoggedIn = true;
      console.log('Данные успешно синхронизированы с БД');
    } catch (err) {
      console.error("Ошибка синхронизации:", err);
      this.logout();
    }
  },

  async addExpense(payload) {
    if (!this.isLoggedIn) {
      // Логика для демо-режима: просто добавляем в локальный массив
      this.transactions.unshift({
        id: Date.now(),
        amount: Number(payload.amount),
        merchant: payload.merchant || 'Демо запись',
        category: payload.category,
        date: new Date().toLocaleDateString('ru-RU')
      });
      return;
    }

    // Логика для реального режима
    try {
      const newTx = await api.addTransaction(payload);
      this.transactions.unshift(newTx);
    } catch (err) {
      alert("Не удалось сохранить расход на сервере");
    }
  },

  // Внутри store.js
  async addGoal(payload) {
    if (!this.isLoggedIn) {
      // Демо-режим: просто пушим в массив
      this.goals.push({
        id: Date.now(),
        ...payload,
        current: 0
      });
      return;
    }

    try {
      const newGoal = await api.addGoal(payload);
      this.goals.push(newGoal);
      console.log('Цель успешно сохранена в БД');
    } catch (err) {
      alert("Не удалось сохранить цель на сервере");
    }
  },

  // Очистка при выходе
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');

    this.isLoggedIn = false;
    this.transactions = [
      { id: 1, amount: 500, merchant: 'Демо: Магнит', category: 'Продукты', date: '2026-04-12' },
      { id: 2, amount: 200, merchant: 'Демо: Такси', category: 'Транспорт', date: '2026-04-11' }
    ];
    this.goals = [
      { id: 1, title: 'Демо: Новый телефон', TargetAmount: 30000, CurrentAmount: 5000 },
      { id: 2, title: 'Демо: Путешествие', TargetAmount: 100000, CurrentAmount: 20000 }
    ];
  }
})