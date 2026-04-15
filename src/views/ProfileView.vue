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
import api from '../services/api' 

const router = useRouter()

const form = reactive({
  phoneNumber: '',
  email: ''
})

// Функция для заполнения полей из стора
const fillForm = () => {
  // Проверяем оба варианта написания (с большой и маленькой буквы)
  form.email = store.user?.email || store.user?.Email || ''
  form.phoneNumber = store.user?.phoneNumber || store.user?.PhoneNumber || ''
}

// Вызываем при загрузке
onMounted(async () => {
  if (!store.user) {
    await store.fetchData() // На всякий случай обновляем данные
  }
  fillForm()
})

// Следим, когда данные загрузятся из сети
watch(() => store.user, () => {
  fillForm()
}, { deep: true })

const saveChanges = async () => {
  try {
    // Теперь функция в api.js точно есть
    await api.updateProfile(form.email, form.phoneNumber)
    alert('Профиль успешно обновлен')
    await store.fetchData() // Перезагружаем данные в стор
  } catch (err) {
    alert('Ошибка: ' + err.message)
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