<script setup lang="ts">
import sideBar from "@/component/side-bar.vue"
import Header from "@/component/header.vue"
import useCityStore from "@/store/city"
import { NFlex, useMessage, NRadio, NRadioGroup } from "naive-ui"
import { reactive } from "vue"
import { useRouter } from "vue-router"
import type { SelectOption } from "naive-ui"

const router = useRouter()
const message = useMessage()
const cityStore = useCityStore()

//筛选条件的类型
type filterOptionResult = {
  type: SelectOption[] //房源还是求租
}

//已选条件的类型
type selectedOptionResult = {
  type: string //房源还是求租
}

//筛选条件的值
const filterOption = reactive<filterOptionResult>({
  type: [
    { label: "房源信息", value: "for-rent" },
    { label: "求租信息", value: "seek-house" },
  ],
})

//已选条件的值
const selectedOption = reactive<selectedOptionResult>({
  type: "for-rent",
})
</script>

<template>
  <!-- 头部区域 -->
  <Header />

  <!-- 内容区 -->
  <n-flex
    :size="[20, 20]"
    style="
      width: 1280px;
      margin: 0 auto;
      padding-top: 20px;
      border: 1px solid #ccc;
    "
  >
    <!-- 左侧的侧边栏 -->
    <sideBar />
    <!-- 右侧的内容 -->
    <n-flex vertical>
      <!-- 筛选条件 -->
      <n-flex>
        类型：<n-radio-group>
          <n-radio v-for="item in filterOption.type">{{ item.label }}</n-radio>
        </n-radio-group>
      </n-flex>
      <!-- 数据表格 -->
      <n-flex> 2</n-flex>
    </n-flex>
  </n-flex>
</template>

<style scoped lang="scss"></style>
