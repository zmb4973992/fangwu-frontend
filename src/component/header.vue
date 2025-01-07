<script setup lang="ts">
import { NImage, useMessage } from "naive-ui"
import logo from "@/asset/logo.jpg"
import { NFlex, NButton, NDropdown, NPopover } from "naive-ui"
import login from "@/component/login.vue"
import {  ref } from "vue"
import useUserStore from "@/store/user"
import { useRouter } from "vue-router"
import useCityStore from "@/store/city"

const loginRef = ref()
const message = useMessage()
const cityStore = useCityStore()

function showLoginModal() {
  loginRef.value.openModal()
}

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

const router = useRouter()

function handleSelect(key: string) {
  switch (key) {
    case "for-rent":
      router.push({ name: "发布房源" })
      break
    case "seek-house":
      break
    case "favorite":
      break
    case "published":
      break
    case "logout":
      userStore.clearAccessToken()
      message.success("成功退出")
      router.push({ name: "首页" })
      break
  }
}

function selectCity(cityName: string) {
  cityStore.setCity(cityName)
  router.push({ name: "房源列表" })
}
</script>

<template>
  <!-- 内容区域 -->
  <n-flex
    justify="space-between"
    style="width: 100%; min-width: 1280px; border-bottom: 2px solid #62c76d"
  >
    <!-- 左侧+中间 -->
    <n-flex>
      <!-- 左侧 -->
      <n-flex justify="center">
        <n-image
          :src="logo"
          height="40"
          preview-disabled
          @click="router.push({ name: '房源列表' })"
          style="cursor: pointer"
        />
      </n-flex>

      <!-- 中间 -->
      <n-flex>
        <n-popover trigger="hover" placement="bottom-start">
          <template #trigger>
            <n-button quaternary style="margin: auto 0">
              {{ cityStore.name }}
              <svg
                t="1736139676973"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="9898"
                width="18"
                height="15"
                style="margin-left: 6px"
              >
                <path
                  d="M511.609097 961.619254M511.906879 662.759609 511.906879 662.759609 129.831974 280.679587c-14.788821-14.762215-38.777165-14.762215-53.585429 0-14.788821 14.812357-14.788821 38.799678 0 53.607942l405.851425 405.805376c0.867764 1.107217 1.824555 2.190899 2.843768 3.206018 14.808264 14.788821 38.795585 14.788821 53.585429 0l408.230612-408.226518c14.807241-14.808264 14.807241-38.795585 0-53.584406-14.767332-14.785751-38.754652-14.785751-53.562916 0L511.906879 662.759609 511.906879 662.759609zM511.906879 662.759609"
                  fill="#272636"
                  p-id="9899"
                ></path>
              </svg>
            </n-button>
          </template>
          <!-- 选择城市的内容区域 -->
          <n-flex vertical :size="[0, 0]">
            <n-flex>
              按<span style="color: green"> 拼音首字母</span>选择：
            </n-flex>
            <!-- 第1行 -->
            <n-flex :size="[0, 0]" class="city-row">
              <span class="city-label">B:</span>
              <n-flex :size="[0, 0]" class="city-list">
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('北京')"
                >
                  北京
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('保定')"
                >
                  保定
                </n-button>
              </n-flex>
            </n-flex>
            <!-- 第2行 -->
            <n-flex :size="[0, 0]" class="city-row">
              <span class="city-label">C:</span>
              <n-flex :size="[0, 0]" class="city-list">
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('重庆')"
                >
                  重庆
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('成都')"
                >
                  成都
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('长沙')"
                >
                  长沙
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('长春')"
                >
                  长春
                </n-button>
              </n-flex>
            </n-flex>
            <!-- 第3行 -->
            <n-flex :size="[0, 0]" class="city-row">
              <span class="city-label">FG:</span>
              <n-flex :size="[0, 0]" class="city-list">
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('福州')"
                >
                  福州
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('广州')"
                >
                  广州
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('贵阳')"
                >
                  贵阳
                </n-button>
              </n-flex>
            </n-flex>
            <!-- 第4行 -->
            <n-flex :size="[0, 0]" class="city-row">
              <span class="city-label">H:</span>
              <n-flex :size="[0, 0]" class="city-list">
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('杭州')"
                >
                  杭州
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('哈尔滨')"
                >
                  哈尔滨
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('合肥')"
                >
                  合肥
                </n-button>
              </n-flex>
            </n-flex>
            <!-- 第5行 -->
            <n-flex :size="[0, 0]" class="city-row">
              <span class="city-label">JKL:</span>
              <n-flex :size="[0, 0]" class="city-list">
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('济南')"
                >
                  济南
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('昆明')"
                >
                  昆明
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('廊坊')"
                >
                  廊坊
                </n-button>
              </n-flex>
            </n-flex>
            <!-- 第6行 -->
            <n-flex :size="[0, 0]" class="city-row">
              <span class="city-label">NQ:</span>
              <n-flex :size="[0, 0]" class="city-list">
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('南京')"
                >
                  南京
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('南昌')"
                >
                  南昌
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('青岛')"
                >
                  青岛
                </n-button>
              </n-flex>
            </n-flex>
            <!-- 第7行 -->
            <n-flex :size="[0, 0]" class="city-row">
              <span class="city-label">S:</span>
              <n-flex :size="[0, 0]" class="city-list">
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('上海')"
                >
                  上海
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('深圳')"
                >
                  深圳
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('苏州')"
                >
                  苏州
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('沈阳')"
                >
                  沈阳
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('石家庄')"
                >
                  石家庄
                </n-button>
              </n-flex>
            </n-flex>
            <!-- 第8行 -->
            <n-flex :size="[0, 0]" class="city-row">
              <span class="city-label">TW:</span>
              <n-flex :size="[0, 0]" class="city-list">
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('天津')"
                >
                  天津
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('武汉')"
                >
                  武汉
                </n-button>
              </n-flex>
            </n-flex>
            <!-- 第9行 -->
            <n-flex :size="[0, 0]" class="city-row">
              <span class="city-label">X:</span>
              <n-flex :size="[0, 0]" class="city-list">
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('西安')"
                >
                  西安
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('厦门')"
                >
                  厦门
                </n-button>
              </n-flex>
            </n-flex>
            <!-- 第10行 -->
            <n-flex :size="[0, 0]" class="city-row city-row-last">
              <span class="city-label">Z:</span>
              <n-flex :size="[0, 0]" class="city-list">
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="selectCity('郑州')"
                >
                  郑州
                </n-button>
              </n-flex>
            </n-flex>
          </n-flex>
        </n-popover>
      </n-flex>
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

<style scoped lang="scss">
.city-row {
  border-bottom: 1px dashed green;
  height: 40px;
}

.city-row-last {
  border-bottom: none;
}

.city-label {
  margin: auto 0;
  width: 35px;
}
.city-list {
  width: 260px;
  margin: auto 0;
}

.city-btn {
  padding: auto 5px;
}
</style>
