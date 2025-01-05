<script setup lang="ts">
import { NImage, useMessage } from "naive-ui"
import logo from "@/asset/logo.jpg"
import { NFlex, NButton, NDropdown, NPopover } from "naive-ui"
import login from "@/component/login.vue"
import { reactive, ref } from "vue"
import adminDivApi from "@/api/admin-div"
import useUserStore from "@/store/user"
import { useRouter } from "vue-router"
import { ChevronDown12Regular } from "@vicons/fluent"
import { Icon } from "@vicons/utils"
import { availableCities } from "@/constant"

const loginRef = ref()

const message = useMessage()

function showLoginModal() {
  loginRef.value.openModal()
}

//筛选条件的值
const filterCondition = reactive({
  level2AdminDiv: undefined,
})

async function getFilterCondition() {
  const res1 = await adminDivApi.getList({ parent_code: 33 })
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
      router.push({ name: "首页", params: { cityAbbr: "bj" } })
      break
  }
}

const props = defineProps<{ cityAbbr: string }>()
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
              {{
                // 在可用城市的数组中进行过滤，找到当前城市的名称
                availableCities.filter(
                  (item) => item.abbr === props.cityAbbr
                )[0].name
              }}
              <Icon size="14" style="margin-left: 5px">
                <ChevronDown12Regular />
              </Icon>
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
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'bj' },
                    })
                  "
                >
                  北京
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'bd' },
                    })
                  "
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
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'cq' },
                    })
                  "
                >
                  重庆
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'cd' },
                    })
                  "
                >
                  成都
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'cs' },
                    })
                  "
                >
                  长沙
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'cc' },
                    })
                  "
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
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'fz' },
                    })
                  "
                >
                  福州
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'gz' },
                    })
                  "
                >
                  广州
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'gy' },
                    })
                  "
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
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'hz' },
                    })
                  "
                >
                  杭州
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'heb' },
                    })
                  "
                >
                  哈尔滨
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'hf' },
                    })
                  "
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
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'jn' },
                    })
                  "
                >
                  济南
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'km' },
                    })
                  "
                >
                  昆明
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'lf' },
                    })
                  "
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
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'nj' },
                    })
                  "
                >
                  南京
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'nc' },
                    })
                  "
                >
                  南昌
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'qd' },
                    })
                  "
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
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'sh' },
                    })
                  "
                >
                  上海
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'sz' },
                    })
                  "
                >
                  深圳
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'suzhou' },
                    })
                  "
                >
                  苏州
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'sy' },
                    })
                  "
                >
                  沈阳
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'sjz' },
                    })
                  "
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
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'tj' },
                    })
                  "
                >
                  天津
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'wh' },
                    })
                  "
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
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'xa' },
                    })
                  "
                >
                  西安
                </n-button>
                <n-button
                  quaternary
                  size="small"
                  class="city-btn"
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'xm' },
                    })
                  "
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
                  @click="
                    router.push({
                      name: '房源列表',
                      params: { cityAbbr: 'zz' },
                    })
                  "
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
