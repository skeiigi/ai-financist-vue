import { reactive } from 'vue'
import api from './services/api' // Импортируем твой api.js

export const store = reactive({
  isLoggedIn: !!localStorage.getItem('token'), // Проверяем токен при загрузке страницы
  transactions: [
    { id: 1, amount: 500, merchant: 'Демо: Магнит', category: 'Продукты', date: '2026-04-12' },
    { id: 2, amount: 200, merchant: 'Демо: Такси', category: 'Транспорт', date: '2026-04-12' }
  ],
  goals: [],

  // Загрузка данных с бэкенда
  async fetchData() {
    if (!this.isLoggedIn) return; // Если не вошли, остаемся с демо-данными
    
    try {
      const tx = await api.getTransactions();
      const gl = await api.getGoals();
      this.transactions = tx;
      this.goals = gl;
    } catch (err) {
      console.error("Ошибка загрузки данных:", err);
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

  // Очистка при выходе
  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.transactions = []; // Или вернуть демо-данные
    this.goals = [];
  }
})