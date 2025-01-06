<script setup lang="ts">
import sideBar from "@/component/side-bar.vue"
import Header from "@/component/header.vue"

const props = defineProps<{
  cityAbbr: string
}>()
</script>

<template>
  {{ props.cityAbbr }}
  <!-- 头部区域 -->
  <Header :cityAbbr="props.cityAbbr ?? 'sz'" />
  <sideBar />
  dksfj
</template>

<style scoped lang="scss"></style>
