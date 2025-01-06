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
            name: "首页",
          },
        },
        { default: () => "我发布的房源" }
      ),
    key: "首页",
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
        { default: () => "首页1" }
      ),
    key: "我发布的",
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
  {{ activeKey }}
  <n-flex>
    <n-menu
      v-model:value="activeKey"
      :options="menuOptions"
      @update:value="handleUpdateValue"
      :indent="15"
      style="width: 130px; background-color: #e3e3e3; text-align: center"
    >
    </n-menu>
  </n-flex>
</template>

<style scoped lang="scss"></style>
