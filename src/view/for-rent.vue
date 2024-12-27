<script setup lang="ts">
import login from '@/component/login.vue'
import { ref } from 'vue'


const loginRef = ref()
function showLoginModal() {
  loginRef.value.openModal()
}
</script>

<template>
  <div>
    <button @click="showLoginModal">测试</button>
    <div>for-rent.vue</div>
    <login ref="loginRef"/>

  </div>


</template>

<style scoped lang="scss">
</style>
