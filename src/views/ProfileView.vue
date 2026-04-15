<template>
  <div class="container">
    <h1>Настройки профиля</h1>
    
    <div class="card">
      <div class="form-group">
        <label>Номер телефона</label>
        <input v-model="form.phoneNumber" type="text" class="input-field" placeholder="+7 (999) 000-00-00">
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
import { reactive, onMounted, watch } from 'vue'
import { store } from '../store'
import { useRouter } from 'vue-router'
import api from '../services/api' // Не забудь импортировать api

const router = useRouter()

const form = reactive({
  phoneNumber: '', // Согласуем название с шаблоном
  email: ''
})

// Функция для заполнения полей
const fillForm = () => {
  form.phoneNumber = store.user?.phoneNumber || ''
  form.email = store.user?.email || ''
}

onMounted(fillForm)
// Следим за изменениями в сторе (на случай, если данные подгрузились чуть позже)
watch(() => store.user, fillForm)

const saveChanges = async () => {
  try {
    await api.updateProfile(form.email, form.phoneNumber)
    alert('Профиль успешно обновлен')
    // Обновляем данные в приложении, чтобы изменения сразу везде отобразились
    await store.fetchData()
  } catch (err) {
    alert('Ошибка при обновлении: ' + err.message)
  }
}

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

const deleteAccount = () => {
  if (confirm('Вы уверены? Это действие необратимо.')) {
    // Здесь будет вызов удаления на бэкенде
    logout()
  }
}
</script>