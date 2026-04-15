import { reactive } from 'vue'
import api from './services/api' // Импортируем твой api.js

export const store = reactive({
  isLoggedIn: !!localStorage.getItem('token'), // Проверяем токен при загрузке страницы
  transactions: [],
  goals: [],
  
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

    this.isLoggedIn = false;
    this.transactions = [];
    this.goals = [];
  }
})