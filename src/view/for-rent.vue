<script setup lang="ts">
import login from "@/component/login.vue"
import { ref } from "vue"
import Filter from "@/component/filter.vue"

const loginRef = ref()
function showLoginModal() {
  loginRef.value.openModal()
}
</script>

<template>
    <Filter/>
    <button @click="showLoginModal">测试</button>
    <div>for-rent.vue</div>
    <login ref="loginRef" />
</template>

<style scoped lang="scss"></style>
