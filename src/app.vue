<script setup lang="ts">
import { NMessageProvider, NConfigProvider } from "naive-ui"
import { zhCN } from "naive-ui"
</script>

<template>
  <n-config-provider :locale="zhCN">
    <n-message-provider>
      <routerView />
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
