<script setup lang="ts">
import { reactive, watch } from "vue"
import adminDivApi from "@/api/admin-div"
import dictionaryDetailApi from "@/api/dictionary-detail"
import {
  NPagination,
  NFlex,
  NCard,
  NImage,
  NEllipsis,
  NButton,
  NInputNumber,
  useMessage,
  NButtonGroup,
} from "naive-ui"
import forRentApi from "@/api/for-rent"
import type { forRentListResult } from "@/type/for-rent"
import type { adminDivResult } from "@/type/admin-div"
import type { dictionaryDetailResult } from "@/type/dictionary-detail"
import Header from "@/component/header.vue"
import { useRouter } from "vue-router"
import noImage from "@/asset/no-image.jpg"
import useCityStore from "@/store/city"
const props = defineProps<{
  level3AdminDivCode: number
  minPrice: number
  maxPrice: number
  rentTypeId: number
}>()

const router = useRouter()
const message = useMessage()
const cityStore = useCityStore()

//筛选条件的类型
type filterOptionResult = {
  level3AdminDiv?: adminDivResult[]
  rentType?: dictionaryDetailResult[]
}

//已选条件的类型
type selectedOptionResult = {
  level3AdminDivCode?: number
  minPrice?: number | null
  maxPrice?: number | null
  rentTypeId?: number
}

//筛选条件的值
const filterOption = reactive<filterOptionResult>({})

//已选条件的值
const selectedOption = reactive<selectedOptionResult>({})

//获取筛选条件
async function getFilterOption() {
  try {
    const [res1, res2] = await Promise.all([
      adminDivApi.getList({
        parent_code: cityStore.code,
      }),
      dictionaryDetailApi.getList({
        dictionary_type_value: "租赁类型",
      }),
    ])

    if (res1) {
      filterOption.level3AdminDiv = res1.data.list
    }
    if (res2) {
      filterOption.rentType = res2.data.list
    }
  } catch (error) {
    message.error("获取筛选条件失败")
    console.error(error)
  }
}

getFilterOption()

//清空已选条件
const clearSelectedOption = () => {
  selectedOption.level3AdminDivCode = undefined
  selectedOption.minPrice = null
  selectedOption.maxPrice = null
  selectedOption.rentTypeId = undefined
  query()
}

const data: forRentListResult = reactive({
  list: [],
  paging: {
    page: 0,
    page_size: 0,
    total_pages: 0,
    total_records: 0,
  },
})

getData()

async function getData() {
  const res = await forRentApi.getList({
    page: data.paging.page,
    page_size: data.paging.page_size,
    desc: true,
    level_2_admin_div: cityStore.code,
    level_3_admin_div: selectedOption.level3AdminDivCode,
    min_price: selectedOption.minPrice ?? undefined,
    max_price: selectedOption.maxPrice ?? undefined,
    rent_type: selectedOption.rentTypeId,
  })

  if (res) {
    data.list = res.data.list
    data.paging = res.data.paging
  }
}

function getDetail(id: number) {
  const href = router.resolve({
    name: "房源详情",
    params: { id },
  })
  window.open(href.href, "_blank")
}

//用于拆选条件变化后的查询
function query() {
  router.push({
    name: router.currentRoute.value.name,
    query: {
      l3: selectedOption.level3AdminDivCode ?? undefined,
      min: selectedOption.minPrice ?? undefined,
      max: selectedOption.maxPrice ?? undefined,
      rt: selectedOption.rentTypeId ?? undefined,
    },
  })
  getData()
}

//验证价格区间是否合法
function validatePrice() {
  if (
    selectedOption.minPrice &&
    selectedOption.maxPrice &&
    selectedOption.maxPrice < selectedOption.minPrice
  ) {
    message.error("最高价必须大于最低价，请修改")

    return
  }
  query()
}

// 如果城市改变，则重新进入到当前页面、获取筛选条件、获取新数据
watch(
  () => cityStore.code,
  () => {
    router.push({ name: router.currentRoute.value.name })
    getFilterOption()
    getData()
  }
)

// 如果props.level3AdminDivCode改变，
// 则更新selectedOption.level3AdminDivCode的值，
// 并重新获取数据
watch(
  () => props.level3AdminDivCode,
  () => {
    selectedOption.level3AdminDivCode = props.level3AdminDivCode
    getData()
  }
)

// 如果props.minPrice改变，
// 则更新selectedOption.minPrice的值，
// 并重新获取数据
watch(
  () => props.minPrice,
  (newValue) => {
    if (newValue) {
      selectedOption.minPrice = newValue
      getData()
    }
  },
  { immediate: true }
)

// 如果props.maxPrice改变，
// 则更新selectedOption.maxPrice的值，
// 并重新获取数据
watch(
  () => props.maxPrice,
  (newValue) => {
    if (newValue) {
      selectedOption.maxPrice = newValue
      getData()
    }
  },
  { immediate: true }
)

// 如果props.rentTypeId改变，
// 则更新selectedOption.rentTypeId的值，
// 并重新获取数据
watch(
  () => props.rentTypeId,
  () => {
    selectedOption.rentTypeId = props.rentTypeId
    getData()
  }
)

// 如果data.paging.page改变，
// 则重新获取数据，并滚动到顶部
watch(
  () => data.paging.page,
  () => {
    getData()
    scrollTo(0, 0)
  }
)
</script>

<template>
  <!-- 头部区域 -->
  <Header />

  <!-- 内容区 -->
  <n-flex vertical style="width: 1280px; margin: 0 auto">
    <!-- 筛选条件 -->
    <n-flex
      vertical
      style="
        margin-top: 10px;
        padding-bottom: 20px;
        border-bottom: 1px solid lightgrey;
      "
    >
      <!-- 位置 -->
      <n-flex :size="[3, 3]">
        <span style="margin: auto 0">位置：</span>
        <n-button-group>
          <!-- 不限 -->
          <n-button
            quaternary
            @click="
              () => {
                selectedOption.level3AdminDivCode = undefined
                query()
              }
            "
            :color="props.level3AdminDivCode ? '' : 'red'"
            style="padding-left: 8px; padding-right: 8px"
          >
            不限
          </n-button>
          <!-- 具体的3级行政区划 -->
          <n-button
            v-for="level3AdminDiv in filterOption.level3AdminDiv"
            quaternary
            @click="
              () => {
                selectedOption.level3AdminDivCode = level3AdminDiv.code
                query()
              }
            "
            :color="
              props.level3AdminDivCode === level3AdminDiv.code ? 'red' : ''
            "
            style="padding-left: 8px; padding-right: 8px"
          >
            {{ level3AdminDiv.name }}
          </n-button>
        </n-button-group>
      </n-flex>

      <!-- 租金 -->
      <n-flex :size="[3, 3]" style="margin: 0 0">
        <span style="margin: auto 0">租金：</span>
        <n-input-number
          v-model:value="selectedOption.minPrice"
          min="0"
          max="99999"
          :show-button="false"
          style="width: 70px"
          placeholder="最低价"
        />
        <span style="margin: auto 0"> - </span>
        <n-input-number
          v-model:value="selectedOption.maxPrice"
          min="0"
          max="99999"
          :show-button="false"
          style="width: 70px"
          placeholder="最高价"
        />
        <span style="margin: auto 2px"> 元/月</span>
        <n-button style="margin-left: 10px" @click="validatePrice">
          确定
        </n-button>
      </n-flex>

      <!-- 租赁类型 -->
      <n-flex :size="[3, 3]" style="margin: 0 0">
        <span style="margin: auto 0">方式：</span>
        <n-button
          v-for="rentType in filterOption.rentType"
          quaternary
          :color="selectedOption.rentTypeId === rentType.id ? 'red' : ''"
          @click="
            () => {
              selectedOption.rentTypeId = rentType.id
              query()
            }
          "
        >
          {{ rentType.value }}
        </n-button>
      </n-flex>

      <!-- 清空筛选条件 -->
      <n-flex :size="[3, 3]" style="margin: 5px 0">
        <n-button @click="clearSelectedOption">清空筛选条件</n-button>
      </n-flex>
    </n-flex>

    <!-- 数据列表 -->
    <n-flex style="width: 1280px">
      <!-- 左栏 -->
      <n-flex :size="[0, 0]" vertical style="width: 1025px">
        <!-- 单条信息 -->
        <n-card
          v-for="item in data.list"
          :bordered="false"
          style="border-bottom: 1px solid lightgrey"
        >
          <n-flex justify="space-between">
            <!-- 左侧的图片 -->
            <n-image
              width="240"
              height="180"
              :src="item.files ? item.files[0].url : noImage"
              object-fit="contain"
              preview-disabled
              @click="
                () => {
                  if (item.id) {
                    getDetail(item.id)
                  }
                }
              "
              style="cursor: pointer"
            />
            <!-- 中间的信息 -->
            <n-flex vertical style="width: 540px">
              <!-- 详情 -->
              <n-flex
                style="font-size: 21px; font-weight: 600; margin-bottom: 5px"
              >
                <n-ellipsis :tooltip="false">
                  <span
                    @click="
                      () => {
                        if (item.id) {
                          getDetail(item.id)
                        }
                      }
                    "
                    class="description-title"
                  >
                    {{ item.description }}
                  </span>
                </n-ellipsis>
              </n-flex>
              <!-- 属性 -->
              <n-flex
                :size="[10, 0]"
                style="font-size: 16px; margin-bottom: 5px"
              >
                <span v-if="item.rent_type">
                  {{ item.rent_type?.value }}
                </span>
                <span
                  v-if="
                    item.bedroom ||
                    item.livingRoom ||
                    item.bathroom ||
                    item.kitchen
                  "
                  style="color: #ccc"
                  >|</span
                >
                <span
                  v-if="
                    item.bedroom ||
                    item.livingRoom ||
                    item.bathroom ||
                    item.kitchen
                  "
                >
                  <span v-if="item.bedroom">
                    {{ item.bedroom }}
                  </span>
                  <span v-if="item.bedroom">室</span>
                  <span v-if="item.livingRoom">
                    {{ item.livingRoom }}
                  </span>
                  <span v-if="item.livingRoom">厅</span>
                  <span v-if="item.bathroom">
                    {{ item.bathroom }}
                  </span>
                  <span v-if="item.bathroom">卫</span>
                  <span v-if="item.kitchen">
                    {{ item.kitchen }}
                  </span>
                  <span v-if="item.kitchen">厨</span>
                </span>
                <span v-if="item.area" style="color: #ccc"> | </span>
                <span v-if="item.area"> {{ item.area }}m² </span>
                <span v-if="item.gender_restriction" style="color: #ccc">
                  |
                </span>
                <span v-if="item.gender_restriction">
                  {{ item.gender_restriction?.value }}
                </span>
                <span v-if="item.orientation" style="color: #ccc"> | </span>
                <span v-if="item.orientation">
                  朝{{ item.orientation?.value }}
                </span>
                <span v-if="item.tenant" style="color: #ccc"> | </span>
                <span v-if="item.tenant">{{ item.tenant }}</span>
                <span v-if="item.tenant">户合租</span>
              </n-flex>
              <!-- 位置 -->
              <n-flex :size="[3, 3]" style="margin-bottom: 5px">
                <span>{{ item.level_3_admin_div?.name }}</span>
                <span v-if="item.level_4_admin_div">-</span>
                <span>{{ item.level_4_admin_div?.name }}</span>
                <span v-if="item.community">-</span>
                <span>{{ item.community }}</span>
              </n-flex>
            </n-flex>
            <!-- 右边的价格 -->
            <n-flex style="width: 145px" vertical justify="center">
              <div v-if="item.price" style="margin: auto">
                <span style="font-size: 28px; color: green; font-weight: 600">
                  {{ item.price }}
                </span>
                <span style="color: green"> 元/月</span>
              </div>
              <div v-else style="margin: auto">
                <span style="font-size: 25px; color: green; font-weight: 600">
                  电话谈价
                </span>
              </div>
            </n-flex>
          </n-flex>
        </n-card>
        <!-- 分页器 -->
        <div
          style="
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <n-pagination
            v-model:page="data.paging.page"
            :page-count="data.paging.total_pages"
            v-model:page-size="data.paging.page_size"
            size="large"
            show-quick-jumper
          ></n-pagination>
        </div>
      </n-flex>
      <!-- 右栏，预留位置，
       高500px是为了统一滚动条，以后有内容了可以改 -->
      <n-flex style="width: 241px; height: 500px; border: 1px solid #ccc">
        右栏
      </n-flex>
    </n-flex>
  </n-flex>

  <!-- 页脚 -->
  <div style="text-align: center">
    <div>页脚1</div>
  </div>
</template>

<style scoped lang="scss">
.description-title {
  cursor: pointer;
}

.description-title:hover {
  color: green;
}
</style>
