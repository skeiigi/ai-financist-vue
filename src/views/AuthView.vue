<template>
  <div class="container">
    <div class="card" style="margin-top: 50px;">
      <h1 style="text-align: center;">Вход</h1>
      <div class="form-group">
        <label>Email или Телефон</label>
        <input type="text" class="input-field" placeholder="example@mail.com">
      </div>
      <div class="form-group">
        <label>Пароль</label>
        <input type="password" class="input-field" placeholder="••••••••">
      </div>
      <button class="btn-primary" @click="login">Войти</button>
      <p style="text-align: center; font-size: 14px; margin-top: 20px;">
        Нет аккаунта? <RouterLink to="/register">Зарегистрироваться</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { store } from '../store'
import { useRouter } from 'vue-router'

const router = useRouter()
const login = () => {
  store.isLoggedIn = true // Имитация входа для MVP
  router.push('/')
}
</script>