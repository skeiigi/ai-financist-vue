<template>
  <div class="container">
    <div class="card" style="margin-top: 50px;">
      <h1 style="text-align: center; margin-bottom: 20px;">Регистрация</h1>
      
      <div class="form-group">
        <label>Имя</label>
        <input v-model="form.name" type="text" class="input-field" placeholder="Как вас зовут?">
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="form.email" type="email" class="input-field" placeholder="example@mail.com">
      </div>

      <div class="form-group">
        <label>Пароль</label>
        <input v-model="form.password" type="password" class="input-field" placeholder="••••••••">
      </div>

      <div class="form-group">
        <label>Подтвердите пароль</label>
        <input v-model="form.confirmPassword" type="password" class="input-field" placeholder="••••••••">
      </div>

      <button class="btn-primary" @click="handleRegister">Создать аккаунт</button>

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

const router = useRouter()
const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleRegister = () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('Пароли не совпадают!')
    return
  }
  
  // В MVP просто имитируем регистрацию
  store.user.name = form.value.name
  store.user.email = form.value.email
  store.login()
  
  router.push('/')
}
</script>