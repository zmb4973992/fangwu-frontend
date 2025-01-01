<script setup lang="ts">
import administrativeDivisionApi from "@/api/administrative-division"
import dictionaryDetailApi from "@/api/dictionary-detail"
import Header from "@/component/header.vue"
import { bathroom, bedroom, kitchen, livingRoom, tenant } from "@/constant"
import type { adminDivResult } from "@/type/administrative-division"
import type { dictionaryDetailResult } from "@/type/dictionary-detail"
import {
  NFlex,
  NForm,
  NFormItem,
  NInput,
  NRadioGroup,
  NRadio,
  NInputNumber,
  NSelect,
  type SelectOption,
  type FormRules,
} from "naive-ui"
import { reactive, watch } from "vue"

//筛选条件的类型
type formOptionList = {
  rentType?: dictionaryDetailResult[]
  genderRestriction?: dictionaryDetailResult[]
  level3AdminDiv?: adminDivResult[]
  level4AdminDiv?: adminDivResult[]
  bedroom?: SelectOption[]
  livingRoom?: SelectOption[]
  bathroom?: SelectOption[]
  kitchen?: SelectOption[]
  orientation?: SelectOption[]
  tenant?: SelectOption[]
}

//表单选项的值
const formOption = reactive<formOptionList>({
  bedroom,
  livingRoom,
  bathroom,
  kitchen,
  tenant,
})

async function getFormOption() {
  const res1 = await dictionaryDetailApi.getList({
    dictionary_type_name: "租赁类型",
  })
  if (res1) {
    formOption.rentType = res1.data.list
  }

  const res2 = await dictionaryDetailApi.getList({
    dictionary_type_name: "性别限制",
  })
  if (res2) {
    formOption.genderRestriction = res2.data.list
  }

  //获取3级行政区划
  const res3 = await administrativeDivisionApi.getList({
    parent_code: 1101,
  })
  if (res3) {
    formOption.level3AdminDiv = res3.data.list.map((item: any) => {
      return {
        label: item.name,
        value: item.code,
      }
    })
  }

  const res4 = await dictionaryDetailApi.getList({
    dictionary_type_name: "朝向",
  })
  if (res4) {
    formOption.orientation = res4.data.list.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      }
    })
  }
}

getFormOption()

const formData = reactive({
  rentType: null,
  description: null,
  genderRestriction: null,
  mobilePhone: null,
  wechatId: null,
  level3AdminDiv: null,
  level4AdminDiv: null,
  community: null,
  area: null,
  price: null,
  bedroom: null,
  livingRoom: null,
  bathroom: null,
  kitchen: null,
  floor: null,
  totalFloor: null,
  orientation: null,
  tenant:null,

  gender: "",
  houseType: "",
  buildingArea: "",
  files: [],
})

const formRule = reactive<FormRules>({
  rentType: {
    required: true,
    message: "请选择租赁类型",
    trigger: ["input"],
  },
  description: {
    required: true,
    message: "请输入详细说明",
    trigger: ["input"],
  },
  genderRestriction: {
    required: true,
    message: "请选择性别限制",
    trigger: ["input"],
  },
  mobilePhone: {
    required: true,
    message: "请输入手机号码",
    trigger: ["input"],
  },
  level3AdminDiv: {
    type: "number",
    required: true,
    message: "请选择区县",
    trigger: ["input"],
  },
  community: {
    required: true,
    message: "请填写小区名称",
    trigger: ["input"],
  },
  area: {
    type: "number",
    required: true,
    message: "请填写面积（填写整数）",
    trigger: ["input"],
  },
  price: {
    type: "number",
    required: true,
    message: "请填写租金",
    trigger: ["input"],
  },
})

watch(
  () => formData.level3AdminDiv,
  async () => {
    formData.level4AdminDiv = null
    //如果没有选择3级行政区划，则直接返回
    if (!formData.level3AdminDiv) {
      return
    }
    const res = await administrativeDivisionApi.getList({
      parent_code: formData.level3AdminDiv,
    })
    if (!res) {
      return
    }
    formOption.level4AdminDiv = res.data.list.map((item: any) => {
      return {
        label: item.name,
        value: item.code,
      }
    })
  }
)
</script>

<template>
  <!-- 头部区域 -->
  <Header />

  <!-- 内容区域 -->
  <n-flex justify="center" style="width: 1280px">
    <!-- 左侧 -->
    <n-flex justify="center" style="width: 70%; border: 1px solid #ccc">
      <div style="width: 700px; border: 1px solid #ccc">
        <n-form
          ref="formRef"
          :label-width="100"
          :model="formData"
          :rules="formRule"
          label-placement="left"
        >
          <!-- 租赁类型 -->
          <n-form-item label="类型" path="rentType">
            <n-radio-group v-model:value="formData.rentType">
              <n-radio
                v-for="item in formOption.rentType"
                :key="item.id"
                :value="item.name"
                style="margin-left: 10px"
                >{{ item.name }}</n-radio
              >
            </n-radio-group>
          </n-form-item>

          <!-- 详细说明 -->
          <n-form-item label="详细说明" path="description">
            <n-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 8 }"
              placeholder="请输入内容"
              v-model:value="formData.description"
              maxlength="1000"
              show-count
            >
            </n-input>
          </n-form-item>

          

          <!-- 手机号码 -->
          <n-form-item label="手机号码" path="mobilePhone">
            <n-input
              v-model:value="formData.mobilePhone"
              placeholder="请输入手机号码"
              style="width: 200px"
            >
            </n-input>
          </n-form-item>

          <!-- 微信号 -->
          <n-form-item label="微信号" path="wechatId">
            <n-input
              v-model:value="formData.wechatId"
              placeholder="请输入微信号"
              style="width: 200px"
            ></n-input>
          </n-form-item>

          <!-- 位置 -->
          <n-flex>
            <n-form-item
              label="位置"
              path="level3AdminDiv"
              style="width: 250px"
            >
              <n-select
                v-model:value="formData.level3AdminDiv"
                :options="formOption.level3AdminDiv"
                placeholder="请选择区县"
              >
              </n-select>
            </n-form-item>

            <n-form-item path="level4AdminDiv" style="width: 160px">
              <n-select
                v-model:value="formData.level4AdminDiv"
                :options="formOption.level4AdminDiv"
                placeholder="请选择乡/镇/街道"
              >
              </n-select>
            </n-form-item>
          </n-flex>

          <!-- 小区 -->
          <n-form-item label="小区名称" path="community">
            <n-input
              placeholder="请输入小区名称"
              v-model:value="formData.community"
              maxlength="20"
              show-count
              style="width: 400px"
            >
            </n-input>
          </n-form-item>

          <!-- 面积 -->
          <n-form-item label="面积" path="area">
            <n-input-number
              v-model:value="formData.area"
              placeholder="请输入面积"
              :show-button="false"
              :precision="0"
              style="width: 100px"
            >
            </n-input-number>
            <span style="margin-left: 10px">m²（请填写整数）</span>
          </n-form-item>

          <!-- 租金 -->
          <n-form-item label="租金" path="price">
            <n-input-number
              v-model:value="formData.price"
              placeholder="请输入租金"
              :show-button="false"
              :precision="0"
              style="width: 100px"
            >
            </n-input-number>
            <span style="margin-left: 10px">元/月（请填写整数）</span>
          </n-form-item>

          <!-- 户型 -->
          <n-flex>
            <!-- 卧室数量 -->
            <n-form-item label="户型" path="bedroom">
              <n-select
                v-model:value="formData.bedroom"
                :options="formOption.bedroom"
                placeholder="卧室数量"
                style="width: 120px"
              >
              </n-select>
            </n-form-item>

            <!-- 客厅数量 -->
            <n-form-item path="livingRoom">
              <n-select
                v-model:value="formData.livingRoom"
                :options="formOption.livingRoom"
                placeholder="客厅数量"
                style="width: 120px"
              >
              </n-select>
            </n-form-item>

            <!-- 卫生间数量 -->
            <n-form-item path="bathroom">
              <n-select
                v-model:value="formData.bathroom"
                :options="formOption.bathroom"
                placeholder="卫生间数量"
                style="width: 120px"
              >
              </n-select>
            </n-form-item>

            <!-- 厨房数量 -->
            <n-form-item path="kitchen">
              <n-select
                v-model:value="formData.kitchen"
                :options="formOption.kitchen"
                placeholder="厨房数量"
                style="width: 120px"
              >
              </n-select>
            </n-form-item>
          </n-flex>

          <!-- 楼层 -->
          <n-flex>
            <n-form-item label="楼层" path="floor" style="width: 250px">
              <n-input-number
                v-model:value="formData.floor"
                placeholder="请输入楼层"
                :show-button="false"
                :precision="0"
                style="width: 100px"
              >
              </n-input-number>
              <span style="margin-left: 10px">楼</span>
            </n-form-item>

            <n-form-item path="totalFloor" style="width: 200px">
              <span style="margin-left: 10px">总楼层：</span>
              <n-input-number
                v-model:value="formData.totalFloor"
                placeholder="请输入总楼层"
                :show-button="false"
                :precision="0"
                style="width: 110px"
              >
              </n-input-number>
              <span style="margin-left: 10px">楼</span>
            </n-form-item>
          </n-flex>

          <!-- 朝向 -->
          <n-form-item label="朝向" path="orientation">
            <n-select
              v-model:value="formData.orientation"
              :options="formOption.orientation"
              placeholder="请选择朝向"
              style="width: 120px"
            >
            </n-select>
          </n-form-item>

          <!-- 合租性别 -->
          <n-form-item label="合租性别" path="genderRestriction">
            <n-radio-group v-model:value="formData.genderRestriction">
              <n-radio
                v-for="item in formOption.genderRestriction"
                :key="item.id"
                :value="item.name"
                style="margin-left: 10px"
                >{{ item.name }}</n-radio
              >
            </n-radio-group>
          </n-form-item>

          <!-- 合租户数 -->
          <n-form-item label="合租户数" path="tenant">
            <n-select
              v-model:value="formData.tenant"
              :options="formOption.tenant"
              placeholder="请选择"
              style="width: 120px"
            >
            </n-select>
          </n-form-item>

        </n-form>
      </div>

      <div style="width: 600px; text-align: center">
        formData.rentType: {{ formData.rentType }}
      </div>
      <div style="width: 600px; text-align: center">
        formData.description: {{ formData.description }}
      </div>
      <div style="width: 600px; text-align: center">
        formData.genderRestriction: {{ formData.genderRestriction }}
      </div>
      <div style="width: 600px; text-align: center">
        formData.mobilePhone: {{ formData.mobilePhone }}
      </div>
      <div style="width: 600px; text-align: center">
        formData.wechatId: {{ formData.wechatId }}
      </div>
      <div style="width: 600px; text-align: center">
        formData.level3AdminDiv: {{ formData.level3AdminDiv }}
      </div>
      <div style="width: 600px; text-align: center">
        formData.level4AdminDiv: {{ formData.level4AdminDiv }}
      </div>
      <div style="width: 600px; text-align: center">
        formData.community: {{ formData.community }}
      </div>
      <div style="width: 600px; text-align: center">
        formData.area: {{ formData.area }}
      </div>
      <div style="width: 600px; text-align: center">
        formData.price: {{ formData.price }}
      </div>
      <div style="width: 600px; text-align: center">
        formData.bedroom: {{ formData.bedroom }}
      </div>
      <div style="width: 600px; text-align: center">
        formData.livingRoom: {{ formData.livingRoom }}
      </div>
      <div style="width: 600px; text-align: center">
        formData.bathroom: {{ formData.bathroom }}
      </div>
      <div style="width: 600px; text-align: center">
        formData.kitchen: {{ formData.kitchen }}
      </div>
    </n-flex>

    <!-- 右侧 -->
    <n-flex style="width: calc(30% - 20px); border: 1px solid #ccc">
      广告
    </n-flex>
  </n-flex>
</template>

<style lang="scss" scoped></style>
