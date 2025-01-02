<script setup lang="ts">
import { NImage } from "naive-ui"
import logo from "@/asset/logo.jpg"
import { NFlex, NButton, NSelect, NDropdown } from "naive-ui"
import login from "@/component/login.vue"
import { reactive, ref } from "vue"
import administrativeDivisionApi from "@/api/administrative-division"
import useUserStore from "@/store/user"

const loginRef = ref()

function showLoginModal() {
  loginRef.value.openModal()
}

//筛选条件的值
const filterCondition = reactive({
  level2AdminDiv: undefined,
})

//已选条件的值
const selectedCondition = reactive({
  level2AdminDiv: undefined,
})

async function getFilterCondition() {
  const res1 = await administrativeDivisionApi.getList({ parent_code: 33 })
  if (res1) {
    filterCondition.level2AdminDiv = res1.data.list.map((item: any) => {
      return {
        label: item.name,
        value: item.code,
      }
    })
  }
}

getFilterCondition()

const userStore = useUserStore()

const dropdownOptions = [
  {
    label: "发布出租信息",
    key: "for-rent",
  },
  {
    label: "发布找房信息",
    key: "seek-house",
  },
  {
    label: "我的收藏",
    key: "favorite",
  },
  {
    label: "已发布的",
    key: "published",
  },
  {
    label: "退出",
    key: "logout",
  },
]

function handleSelect(key: string) {
  switch (key) {
    case "for-rent":
      break
    case "seek-house":
      break
    case "favorite":
      break
    case "published":
      break
    case "logout":
      userStore.clearAccessToken()
      break
  }
}
</script>

<template>
  <!-- 内容区域 -->
  <n-flex justify="space-between" style="width: 1280px">
    <!-- 左侧 -->
    <n-flex justify="center">
      <n-image :src="logo" height="40" />
    </n-flex>

    <!-- 中间 -->
    <n-flex style="margin-left: -240px">
      <span style="margin: auto">北京</span>
      <n-select
        v-model:value="selectedCondition.level2AdminDiv"
        :options="filterCondition.level2AdminDiv"
        placeholder="其他城市"
        style="width: 100px; margin: auto"
      >
      </n-select>
      <!-- 占位用的，让n-select靠左显示 -->
      <div style="width: 460px"></div>
    </n-flex>

    <!-- 右侧 -->
    <n-flex style="margin-right: 10px">
      <n-button
        v-if="!userStore.accessToken"
        quaternary
        @click="showLoginModal"
        style="margin: auto"
      >
        登录/注册
      </n-button>

      <n-dropdown
        v-else
        trigger="hover"
        :options="dropdownOptions"
        :show-arrow="true"
        placement="bottom-end"
        @select="handleSelect"
        style="text-align: center"
      >
        <n-button quaternary style="margin: auto">我的</n-button>
      </n-dropdown>
    </n-flex>
  </n-flex>

  <!-- 登录模态框 -->
  <login ref="loginRef" />
</template>

<style scoped lang="scss"></style>
