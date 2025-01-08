<script setup lang="ts">
import { NFlex, NMenu, type MenuOption } from "naive-ui"
import { h } from "vue"
import { RouterLink } from "vue-router"

const props = defineProps<{
  activeKey: string
}>()

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "我发布的",
          },
        },
        { default: () => "我发布的" }
      ),
    key: "我发布的",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "首页",
          },
        },
        { default: () => "我收藏的" }
      ),
    key: "我收藏的",
  },
  {
    label: "联系我们",
    key: "联系我们",
  },
]
</script>

<template>
  <n-flex>
    <n-menu
      v-model:value="props.activeKey"
      :options="menuOptions"
      :indent="15"
      style="width: 160px; background-color: #e3e3e3"
    >
    </n-menu>
  </n-flex>
</template>

<style scoped lang="scss"></style>
