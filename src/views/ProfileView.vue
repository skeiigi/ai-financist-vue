<template>
  <div class="container">
    <h1>Настройки профиля</h1>
    
    <div class="card">
      <div class="form-group">
        <label>Номер телефона</label>
        <input v-model="form.phone" type="text" class="input-field" placeholder="+7 (999) 000-00-00">
      </div>
      
      <div class="form-group">
        <label>Электронная почта</label>
        <input v-model="form.email" type="email" class="input-field" placeholder="example@mail.com">
      </div>
      
      <button @click="saveChanges" class="btn-primary" style="background: #10b981;">
        Сохранить изменения
      </button>
    </div>

    <div class="card" style="border: 1px solid #fee2e2; margin-top: 20px;">
      <button @click="logout" class="btn-primary" style="background: #6b7280; margin-bottom: 10px;">
        Выйти из аккаунта
      </button>
      <button @click="deleteAccount" class="btn-primary" style="background: #ef4444;">
        Удалить аккаунт
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue' // Добавь reactive и onMounted
import { store } from '../store'
import { useRouter } from 'vue-router'

const router = useRouter()

// Локальная форма для редактирования
const form = reactive({
  phone: '',
  email: ''
})

// Заполняем форму, когда данные пользователя загрузятся
onMounted(() => {
  form.phone = store.user?.phone || ''
  form.email = store.user?.email || ''
})

const logout = () => {
  // Полная очистка
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('userName')
  store.isLoggedIn = false
  store.user = null
  store.transactions = []
  store.goals = []
  
  router.push('/login') // Перенаправляем именно на логин
}

const saveChanges = async () => {
  // Тут будет вызов api.updateProfile(form)
  alert('Изменения сохранены (временно только в консоли)')
  console.log('Новые данные:', form)
}

const deleteAccount = () => {
  if (confirm('Вы уверены? Это действие необратимо.')) {
    // Здесь будет вызов удаления на бэкенде
    logout()
  }
}
</script>