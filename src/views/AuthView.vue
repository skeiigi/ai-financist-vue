<template>
  <div class="container">
    <div class="card" style="margin-top: 50px;">
      <h1 style="text-align: center;">Вход</h1>
      
      <div v-if="error" style="color: red; padding: 10px; margin-bottom: 15px; border: 1px solid red; border-radius: 4px;">
        {{ error }}
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" class="input-field" placeholder="example@mail.com" :disabled="loading">
      </div>
      <div class="form-group">
        <label>Пароль</label>
        <input v-model="password" type="password" class="input-field" placeholder="••••••••" :disabled="loading">
      </div>
      <button class="btn-primary" @click="login" :disabled="loading">
        {{ loading ? 'Загрузка...' : 'Войти' }}
      </button>
      <p style="text-align: center; font-size: 14px; margin-top: 20px;">
        Нет аккаунта? <RouterLink to="/register">Зарегистрироваться</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { store } from '../store'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const login = async () => {
  if (!email.value || !password.value) {
    error.value = 'Заполните все поля'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await api.login(email.value, password.value)
    
    // Сохраняем данные пользователя
    store.isLoggedIn = true
    store.user = response.user
    
    router.push('/')
  } catch (err) {
    error.value = err.message || 'Ошибка при входе. Попробуйте еще раз'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}
</script>