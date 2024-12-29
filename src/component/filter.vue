<script setup lang="ts">
import administrativeDivisionApi from "@/api/administrative-division"
import dictionaryDetailApi from "@/api/dictionary-detail"
import forRentApi from "@/api/for-rent"
import useForRentStore from "@/store/for-rent.ts"
import { NCard, NButton, NInputNumber } from "naive-ui"
import { reactive, watch } from "vue"

//行政区划的类型
type adminDiv = {
  code: string
  name: string
  pinyinPrefix: string
}

//租赁类型的类型
type rentType = {
  id: number
  name: string
}

//筛选条件的类型
type filterConditionList = {
  level3AdminDiv?: adminDiv[]
  rentType?: rentType[]
}

//已选条件的类型
type selectedConditionList = {
  level3AdminDiv?: adminDiv
  minPrice?: number
  maxPrice?: number
  rentType?: rentType
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

async function fetchDataList() {
  const res = await forRentApi.getList({})
  if (res) {
    const forRentStore = useForRentStore()
    forRentStore.setData(res.data)
  }
}

fetchDataList()

watch(
  () => selectedCondition.level3AdminDiv,
  () => fetchDataList()
)

watch(
  () => selectedCondition.rentType,
  () => fetchDataList()
)
//清空已选条件
const clearSelectedCondition = () => window.location.reload()
</script>

<template>
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
        <n-button style="margin-left: 10px">确定</n-button>
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
</template>

<style lang="scss" scoped>
.main {
  width: 1280px;
  .n-button {
    padding-left: 8px;
    padding-right: 8px;
  }
}
</style>
