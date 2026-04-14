<template>
  <div class="container">
    <div class="card" style="margin-top: 50px;">
      <h1 style="text-align: center; margin-bottom: 20px;">Регистрация</h1>
      
      <div v-if="error" style="color: red; padding: 10px; margin-bottom: 15px; border: 1px solid red; border-radius: 4px;">
        {{ error }}
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="form.email" type="email" class="input-field" placeholder="example@mail.com" :disabled="loading">
      </div>

      <div class="form-group">
        <label>Как вас зовут?</label>
        <input v-model="firstName" type="text" class="input-field" placeholder="Введите имя">
      </div>

      <div class="form-group">
        <label>Пароль</label>
        <input v-model="form.password" type="password" class="input-field" placeholder="••••••••" :disabled="loading">
      </div>

      <div class="form-group">
        <label>Подтвердите пароль</label>
        <input v-model="form.confirmPassword" type="password" class="input-field" placeholder="••••••••" :disabled="loading">
      </div>

      <button class="btn-primary" @click="handleRegister" :disabled="loading">
        {{ loading ? 'Загрузка...' : 'Создать аккаунт' }}
      </button>

      <p style="text-align: center; font-size: 14px; margin-top: 20px;">
        Уже есть аккаунт? <RouterLink to="/auth">Войти</RouterLink>
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
const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const loading = ref(false)
const error = ref('')
const name = ref('')

const handleRegister = async () => {
  if (!form.value.email || !form.value.password || !form.value.confirmPassword) {
    error.value = 'Заполните все поля'
    return
  }

  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Пароли не совпадают!'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await api.register(form.value.email, form.value.password, name.value)
    
    // После успешной регистрации - автоматический вход
    await api.login(form.value.email, form.value.password)
    
    store.isLoggedIn = true
    store.user = response.user
    
    router.push('/')
  } catch (err) {
    error.value = err.message || 'Ошибка при регистрации. Попробуйте еще раз'
    console.error('Register error:', err)
  } finally {
    loading.value = false
  }
}
</script>