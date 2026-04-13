<template>
  <div class="container">
    <h1>Настройки профиля</h1>
    
    <div class="card">
      <div class="form-group">
        <label>Номер телефона</label>
        <input type="text" class="input-field" value="+7 (999) 000-00-00">
      </div>
      <div class="form-group">
        <label>Электронная почта</label>
        <input type="email" class="input-field" value="artem@example.com">
      </div>
      <button class="btn-primary" style="background: #10b981;">Сохранить изменения</button>
    </div>

    <div class="card" style="border: 1px solid #fee2e2;">
      <button @click="logout" class="btn-primary" style="background: #6b7280; margin-bottom: 10px;">Выйти из аккаунта</button>
      <button @click="deleteAccount" class="btn-primary" style="background: #ef4444;">Удалить аккаунт</button>
    </div>
  </div>
</template>

<script setup>
import { store } from '../store'
import { useRouter } from 'vue-router'

const router = useRouter()
const logout = () => {
  store.isLoggedIn = false
  router.push('/')
}
const deleteAccount = () => {
  if (confirm('Вы уверены? Все данные будут удалены.')) {
    logout()
  }
}
</script>