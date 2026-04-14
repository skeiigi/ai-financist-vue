<template>
  <div class="container">
    <div class="card" style="margin-top: 50px;">
      <h1 style="text-align: center; margin-bottom: 20px;">Регистрация</h1>
      
      <div v-if="error" style="color: red; padding: 10px; margin-bottom: 15px; border: 1px solid red; border-radius: 4px; background: #fef2f2;">
        {{ error }}
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="form.email" type="email" class="input-field" placeholder="example@mail.com" :disabled="loading">
      </div>

      <div class="form-group">
        <label>Номер телефона</label>
        <input v-model="form.phone" type="tel" class="input-field" placeholder="+7 (999) 000-00-00" :disabled="loading">
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
        {{ loading ? 'Создание аккаунта...' : 'Создать аккаунт' }}
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

// Все данные в одном объекте
const form = ref({
  phone: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')

const validate = () => {
  if (!form.value.email || !form.value.password || !form.value.phone) {
    error.value = 'Заполните все обязательные поля'
    return false
  }
  
  // Проверка формата телефона
  const phoneRegex = /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
  if (!phoneRegex.test(form.value.phone)) {
    error.value = 'Введите корректный номер телефона'
    return false
  }

  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Пароли не совпадают!'
    return false
  }

  if (form.value.password.length < 6) {
    error.value = 'Пароль должен быть не короче 6 символов'
    return false
  }

  return true
}

const handleRegister = async () => {
  if (!validate()) return

  loading.value = true
  error.value = ''

  try {
    // 1. Отправляем запрос на регистрацию
    // Передаем телефон четвертым аргументом или как часть объекта (зависит от твоего api.js)
    await api.register(form.value.email, form.value.password, form.value.phone)
    
    // 2. Сразу сохраняем телефон локально, чтобы он отобразился в настройках
    window.localStorage.setItem('userPhone', form.value.phone)
    
    // 3. Автоматический вход после регистрации
    await api.login(form.value.email, form.value.password)
    
    // 4. Синхронизируем состояние приложения
    await store.fetchData() 
    store.isLoggedIn = true
    
    // 5. Ура, на главную!
    router.push('/')
  } catch (err) {
    error.value = err.message || 'Ошибка при регистрации. Проверьте данные.'
    console.error('Register error:', err)
  } finally {
    loading.value = false
  }
}
</script>