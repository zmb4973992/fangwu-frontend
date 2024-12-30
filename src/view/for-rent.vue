<script setup lang="ts">
import login from "@/component/login.vue"
import { reactive, ref, watch } from "vue"
import administrativeDivisionApi from "@/api/administrative-division"
import dictionaryDetailApi from "@/api/dictionary-detail"
import {
  NPagination,
  NFlex,
  NCard,
  NImage,
  NEllipsis,
  NDivider,
  NButton,
  NInputNumber,
} from "naive-ui"
import forRentApi from "@/api/for-rent"
import type { forRentListResult } from "@/type/for-rent"
import type { adminDivResult } from "@/type/administrative-division"
import type { dictionaryDetailResult } from "@/type/dictionary-detail"

//筛选条件的类型
type filterConditionList = {
  level3AdminDiv?: adminDivResult[]
  rentType?: dictionaryDetailResult[]
}

//已选条件的类型
type selectedConditionList = {
  level3AdminDiv?: adminDivResult
  minPrice?: number
  maxPrice?: number
  rentType?: dictionaryDetailResult
}

//筛选条件的值
const filterCondition = reactive<filterConditionList>({})

//已选条件的值
const selectedCondition = reactive<selectedConditionList>({})

async function getFilterCondition() {
  const res1 = await administrativeDivisionApi.getList({ parent_code: 1101 })
  if (res1) {
    filterCondition.level3AdminDiv = res1.data.list
  }

  const res2 = await dictionaryDetailApi.getList({
    dictionary_type_name: "租赁类型",
  })
  if (res2) {
    filterCondition.rentType = res2.data.list
  }
}

getFilterCondition()

watch(
  () => selectedCondition.level3AdminDiv,
  () => fetchData()
)

watch(
  () => selectedCondition.rentType,
  () => fetchData()
)
//清空已选条件
const clearSelectedCondition = () => window.location.reload()

const loginRef = ref()
function showLoginModal() {
  loginRef.value.openModal()
}

const data: forRentListResult = reactive({
  list: [],
  paging: {
    page: 0,
    page_size: 10,
    number_of_pages: 0,
    number_of_records: 0,
  },
})

watch(() => data.paging.page, fetchData)
watch(() => data.paging.page_size, fetchData)

fetchData()

async function fetchData() {
  const res = await forRentApi.getList({
    page: data.paging.page,
    page_size: data.paging.page_size,
  })
  if (res) {
    data.list = res.data.list
    data.paging = res.data.paging
  }
}
</script>

<template>
  <!-- 筛选条件 -->
  <div class="main">
    <n-card>
      <!-- 位置 -->
      <div>
        <span>位置：</span>
        <n-button
          v-for="level3AdminDiv in filterCondition.level3AdminDiv"
          quaternary
          :color="
            selectedCondition.level3AdminDiv == level3AdminDiv ? 'red' : ''
          "
          @click="selectedCondition.level3AdminDiv = level3AdminDiv"
        >
          {{ level3AdminDiv.name }}
        </n-button>
      </div>

      <!-- 月租金 -->
      <div style="display: flex; margin: 5px 0">
        <span style="margin: auto 0">月租金：</span>
        <n-input-number
          v-model:value="selectedCondition.minPrice"
          :min="0"
          :show-button="false"
          style="width: 70px"
          placeholder=""
        />
        <span style="margin: auto 0">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
        <n-input-number
          v-model:value="selectedCondition.maxPrice"
          :min="0"
          :max="50000"
          :show-button="false"
          style="width: 70px"
          placeholder=""
        />
        <span style="margin: auto 2px">&nbsp;&nbsp;元/月</span>
        <n-button style="margin-left: 10px" @click="fetchData">确定</n-button>
      </div>

      <!-- 租赁类型 -->
      <div style="display: flex; margin: 5px 0">
        <span style="margin: auto 0">方式：</span>
        <n-button
          v-for="rentType in filterCondition.rentType"
          quaternary
          :color="selectedCondition.rentType == rentType ? 'red' : ''"
          @click="selectedCondition.rentType = rentType"
        >
          {{ rentType.name }}
        </n-button>
      </div>

      <!-- 清空筛选条件 -->
      <div style="display: flex; margin: 5px 0">
        <n-button @click="clearSelectedCondition">清空筛选条件</n-button>
      </div>
    </n-card>

    <div>level3AdminDivs: {{ selectedCondition.level3AdminDiv }}</div>
    <div>minPrice: {{ selectedCondition.minPrice }}</div>
    <div>maxPrice: {{ selectedCondition.maxPrice }}</div>
    <div>rentType: {{ selectedCondition.rentType }}</div>
  </div>
  <button @click="showLoginModal">测试</button>
  <div>for-rent.vue</div>
  <login ref="loginRef" />

  <!-- 数据列表 -->
  <n-flex
    style="
      margin-top: 20px;
      width: 1240px;
      border: 1px solid #e3e3e3;
      padding: 20px;
    "
  >
    <!-- 左栏 -->
    <n-flex style="width: 80%; border: 1px solid #e3e3e3">
      <!-- 单条信息 -->
      <n-card
        v-for="item in data.list"
        :bordered="false"
        style="border-bottom: 1px solid #e3e3e3"
      >
        <n-flex justify="space-between" style="border: 1px solid">
          <!-- 左侧的图片 -->
          <n-image
            width="200"
            height="140"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            style="border: 1px solid #ccc"
          />
          <!-- 中间的信息 -->
          <n-flex style="width: 530px; border: 1px solid" vertical>
            <!-- 详情 -->
            <div style="font-size: 21px; font-weight: 600; margin-bottom: 5px">
              <n-ellipsis>
                {{ item.description }}
              </n-ellipsis>
            </div>
            <!-- 属性 -->
            <div style="display: flex; font-size: 16px; margin-bottom: 5px">
              <div>{{ item.rent_type?.name }}</div>
              <div v-show="item.rent_type"><n-divider vertical /></div>
              <div>{{ item.house_type?.name }}</div>
              <div><n-divider vertical v-show="item.house_type" /></div>
              <div v-show="item.building_area">{{ item.building_area }}m²</div>
              <div v-show="item.building_area"><n-divider vertical /></div>
              <div>{{ item.gender_restriction?.name }}</div>
            </div>
            <!-- 位置 -->
            <div style="display: flex; margin-bottom: 5px">
              <span>{{ item.level_3_admin_div?.name }}</span>
              <span v-show="item.level_4_admin_div">-</span>
              <span>{{ item.level_4_admin_div?.name }}</span>
              <span v-show="item.community">-</span>
              <span>{{ item.community }}</span>
            </div>
          </n-flex>
          <!-- 右边的价格 -->
          <n-flex
            style="width: 180px; border: 1px solid #ccc"
            vertical
            justify="center"
          >
            <div style="margin: auto">
              <span style="font-size: 28px; color: red; font-weight: 600">{{
                item.price
              }}</span>
              <span>&nbsp;元/月</span>
            </div>
          </n-flex>
        </n-flex>
      </n-card>

      <!-- 分页器 -->
      <div
        style="
          width: 100%;
          height: 60px;
          border: 1px solid #ccc;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <n-pagination
          v-model:page="data.paging.page"
          :page-count="data.paging.number_of_pages"
          v-model:page-size="data.paging.page_size"
          size="large"
          show-quick-jumper
          show-size-picker
          :page-sizes="[10, 30, 50]"
        ></n-pagination>
      </div>
    </n-flex>
    <!-- 右栏，预留广告位 -->
    <n-flex style="width: calc(20% - 15px); border: 1px solid #ccc">
      右栏
    </n-flex>
  </n-flex>

  <!-- 页脚 -->
  <div style="text-align: center;">
    <div>页脚1</div>
    <div>页脚2</div>
    </div>
</template>

<style scoped lang="scss">
.main {
  width: 1280px;
  .n-button {
    padding-left: 8px;
    padding-right: 8px;
  }
}
</style>
