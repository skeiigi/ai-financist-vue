<script setup>
import { onMounted } from 'vue'
import { store } from './store'

onMounted(() => {
  store.fetchData();
})
</script>

<template>
  <div class="app-wrapper">
    <RouterView />

    <nav class="mobile-nav">
      <RouterLink to="/" class="nav-item">
        <span class="nav-icon">🏠</span>
        <span>ДОМ</span>
      </RouterLink>
      <RouterLink to="/analytics" class="nav-item">
        <span class="nav-icon">📊</span>
        <span>АНАЛИТИКА</span>
      </RouterLink>
      <RouterLink to="/goals" class="nav-item">
        <span class="nav-icon">🎯</span>
        <span>ЦЕЛИ</span>
      </RouterLink>
    </nav>
  </div>
</template>