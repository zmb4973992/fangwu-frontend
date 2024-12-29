<script setup lang="ts">
import administrativeDivisionApi from "@/api/administrative-division"
import { NCard, NButton, NInputNumber } from "naive-ui"
import { reactive } from "vue"
import { ref } from "vue"
import type { Ref } from "vue"

const selectedOptions = reactive({
  level3AdminDiv: {},
  maxPrice: null,
  minPrice: null,
  rentType: String,
})

type adminDiv = {
  code: string
  name: string
  pinyinPrefix: string
}

const level3AdminDivs: Ref<adminDiv[]> = ref([])

async function getOptions() {
  const res = await administrativeDivisionApi.getList({ parent_code: 1101 })
  if (res) {
    level3AdminDivs.value = res.data.list
    console.log(level3AdminDivs.value)
  }
}

getOptions()
</script>

<template>
  <div class="main">
    <n-card>
      <!-- 位置 -->
      <div>
        <span>位置：</span>
        <span v-for="level3AdminDiv in level3AdminDivs">
          <n-button quaternary @click="selectedOptions.level3AdminDiv = level3AdminDiv">{{ level3AdminDiv.name }}</n-button>
        </span>
      </div>
      <!-- 月租金 -->
      <div style="display: flex;margin: 5px 0;">
        <span style="margin: auto 0">月租金：</span>
        <n-input-number
          v-model:value="selectedOptions.minPrice"
          :min="0"
          :show-button="false"
          style="width: 70px"
          placeholder=""
        />
        <span style="margin: auto 0">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
        <n-input-number
          v-model:value="selectedOptions.maxPrice"
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
      <div style="display: flex;margin: 5px 0;">
        <span style="margin: auto 0">方式：</span>
        <n-button quaternary @click="selectedOptions.rentType = '整租'">整租</n-button>
        <n-button quaternary>合租/单间</n-button>
      </div>
    </n-card>

    <div>
      level3AdminDivs: {{ selectedOptions.level3AdminDiv }}
    </div>
    <div>
      minPrice: {{ selectedOptions.minPrice }}
    </div>
    <div>
      maxPrice: {{ selectedOptions.maxPrice }}
    </div>
    <div>
      rentType: {{ selectedOptions.rentType }}
    </div>
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
