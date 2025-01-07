<script setup lang="ts">
import { NFlex, NMenu, type MenuOption } from "naive-ui"
import { h, ref } from "vue"
import { RouterLink } from "vue-router"

const activeKey = ref("skdfjksdfjksdfj")

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "我的发布",
          },
        },
        { default: () => "我的发布" }
      ),
    key: "我的发布",
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
        { default: () => "我的收藏" }
      ),
    key: "我的收藏",
  },
  {
    label: "联系我们",
    key: "联系我们",
  },
]

function handleUpdateValue(key: any, item: any) {
  console.log(key, item)
}
</script>

<template>
  <n-flex>
    <n-menu
      v-model:value="activeKey"
      :options="menuOptions"
      @update:value="handleUpdateValue"
      :indent="15"
      style="width: 160px; background-color: #e3e3e3;"
    >
    </n-menu>
  </n-flex>
</template>

<style scoped lang="scss"></style>
