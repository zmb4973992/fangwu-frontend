<script setup lang="ts">
import adminDivApi from "@/api/admin-div"
import dictionaryDetailApi from "@/api/dictionary-detail"
import forRentApi from "@/api/for-rent"
import Header from "@/component/header.vue"
import { bathroom, bedroom, kitchen, livingRoom, tenant } from "@/constant"
import useCityStore from "@/store/city"
import useUserStore from "@/store/user"
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
  NUpload,
  NButton,
  type SelectOption,
  type FormRules,
  type UploadFileInfo,
  useMessage,
  type FormInst,
  NSpin,
} from "naive-ui"
import { reactive, ref, watch } from "vue"
import { useRouter } from "vue-router"

const message = useMessage()
const router = useRouter()
const userStore = useUserStore()
const cityStore = useCityStore()
const uploadUrl =
  import.meta.env.VITE_BASE_URL + import.meta.env.VITE_BATCH_UPLOAD_URL

const formData = reactive({
  loading: <boolean>false,
  rentType: <number | null>null,
  description: <string>"",
  genderRestriction: <number | null>null,
  mobilePhone: <string>"",
  wechatId: <string>"",
  level3AdminDiv: <number | null>null,
  level4AdminDiv: <number | null>null,
  community: <string>"",
  area: <number | null>null,
  price: <number | null>null,
  bedroom: <number | null>null,
  livingRoom: <number | null>null,
  bathroom: <number | null>null,
  kitchen: <number | null>null,
  floor: <number | null>null,
  totalFloor: <number | null>null,
  orientation: <number | null>null,
  tenant: <number | null>null,
  //增加backendId字段，用于上传图片时携带后端生成的id
  //sort字段用于排序
  files: <
    (UploadFileInfo & {
      backendId: number
      sort: number
    })[]
  >[],
  name: <string>"",
  gender: <number | null>null,
})

//筛选条件的类型
type formOptionResult = {
  rentType?: dictionaryDetailResult[]
  genderRestriction?: dictionaryDetailResult[]
  level3AdminDiv?: SelectOption[]
  level4AdminDiv?: SelectOption[]
  //下拉框需要使用这种类型
  bedroom?: SelectOption[]
  livingRoom?: SelectOption[]
  bathroom?: SelectOption[]
  kitchen?: SelectOption[]
  orientation?: SelectOption[]
  tenant?: SelectOption[]
  gender?: dictionaryDetailResult[]
}

//表单选项的值
const formOption = reactive<formOptionResult>({
  bedroom,
  livingRoom,
  bathroom,
  kitchen,
  tenant,
})

async function getFormOption() {
  try {
    const [res1, res2, res3, res4, res5] = await Promise.all([
      dictionaryDetailApi.getList({
        dictionary_type_value: "租赁类型",
      }),
      dictionaryDetailApi.getList({
        dictionary_type_value: "性别限制",
      }),
      adminDivApi.getList({
        parent_code: cityStore.code,
      }),
      dictionaryDetailApi.getList({
        dictionary_type_value: "朝向",
      }),
      dictionaryDetailApi.getList({
        dictionary_type_value: "性别",
      }),
    ])

    if (res1) {
      formOption.rentType = res1.data.list
    }
    if (res2) {
      formOption.genderRestriction = res2.data.list
    }
    if (res3) {
      formOption.level3AdminDiv = res3.data.list.map((item: any) => {
        return {
          label: item.name,
          value: item.code,
        }
      })
    }
    if (res4) {
      formOption.orientation = res4.data.list.map((item: any) => {
        return {
          label: item.value,
          value: item.id,
        }
      })
    }
    if (res5) {
      formOption.gender = res5.data.list
    }
  } catch (error) {
    message.error("获取表单选项失败")
    console.error(error)
  }
}

getFormOption()

const formRules = reactive<FormRules>({
  rentType: {
    type: "number",
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
    type: "number",
    required: true,
    message: "请选择性别要求",
    trigger: ["input"],
  },
  mobilePhone: {
    validator: (_, value) => {
      if (!value && !formData.wechatId) {
        return new Error("手机号或微信号至少填写一项")
      }
      return true
    },
    trigger: ["input"],
  },
  wechatId: {
    validator: (_, value) => {
      if (!value && !formData.mobilePhone) {
        return new Error("手机号或微信号至少填写一项")
      }
      return true
    },
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
    message: "请填写面积",
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
    const res = await adminDivApi.getList({
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

watch(
  () => formData.rentType,
  (newVal) => {
    //rentType的值等于formOption里'整租'的id
    if (
      newVal ===
      (formOption.rentType || []).filter((item) => item.value === "整租")[0].id
    ) {
      //清空合租户数的值
      formData.tenant = null
    }
  }
)

//图片成功上传的回调函数
function handleUploadFinish({
  //file用于获取上传文件的信息，event用于获取上传文件的响应结果
  file,
  event,
}: {
  //这是naive-ui规定的类型
  file: UploadFileInfo
  event?: ProgressEvent
}) {
  //响应返回的response被转成了文本，需要通过Json.parse()转成对象
  const response = JSON.parse((event?.target as XMLHttpRequest).response)
  if (response.code === 0) {
    for (let i = 0; i < response.data.length; i++) {
      formData.files.push({
        id: file.id,
        name: file.name,
        status: "finished",
        backendId: response.data[i].id,
        sort: formData.files.length + 1,
      })
    }
  }
}

//图片删除后的回调函数
function handleUploadRemove(data: {
  //file是删除的文件，fileList是删除后的文件列表
  file: UploadFileInfo
  fileList: UploadFileInfo[]
}) {
  //删除图片后，需要把图片的相关信息从formData.files中删除
  formData.files = formData.files.filter((item) => item.id !== data.file.id)
}

//图片上传前的回调函数
function beforeUpload(data: any) {
  //判断文件类型，如果不是图片类型，则不允许上传
  const isImage =
    data.file.file?.type === "image/jpeg" ||
    data.file.file?.type === "image/png"
  if (!isImage) {
    message.error("只能上传jpg/jpeg/png格式的图片")
    return false
  }

  //判断文件大小，如果大于10mb，则不允许上传
  const isLessThan10mb = data.file.file?.size / 1024 / 1024 < 10
  if (!isLessThan10mb) {
    message.error("单张图片的大小不能超过 10 mb")
    return false
  }

  return true
}

const formRef = ref<FormInst | null>(null)

function validateForm(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors: any) => {
    if (errors) {
      message.error("请根据提示填写相关信息")
      return
    }
    //如果表单验证通过，则调用保存接口
    submitForm()
  })
}

//提交表单
async function submitForm() {
  // 显示加载状态
  formData.loading = true

  const res = await forRentApi.create({
    price: formData.price == null ? 0 : formData.price,
    rent_type: formData.rentType ?? 0,
    description: formData.description,
    gender_restriction: formData.genderRestriction ?? 0,
    mobile_phone: formData.mobilePhone ?? undefined,
    wechat_id: formData.wechatId ?? undefined,
    level_2_admin_div: cityStore.code,
    level_3_admin_div: formData.level3AdminDiv ?? undefined,
    level_4_admin_div: formData.level4AdminDiv ?? undefined,
    community: formData.community,
    area: formData.area ?? undefined,
    bedroom: formData.bedroom ?? undefined,
    living_room: formData.livingRoom ?? undefined,
    bathroom: formData.bathroom ?? undefined,
    kitchen: formData.kitchen ?? undefined,
    floor: formData.floor ?? undefined,
    total_floor: formData.totalFloor ?? undefined,
    orientation: formData.orientation ?? undefined,
    tenant: formData.tenant ?? undefined,
    name: formData.name,
    gender: formData.gender ?? undefined,
    files: formData.files.map((item) => {
      return {
        id: item.backendId,
        sort: item.sort,
      }
    }),
  })

  console.log(
    formData.files.map((item) => {
      return {
        id: item.backendId,
        sort: item.sort,
      }
    })
  )

  //如果提交失败，则提示错误信息，并打印日志
  if (res?.code !== 0) {
    const errMsg = res?.message || "提交失败"
    message.error(errMsg)
    console.log(res?.err_detail)
    // 隐藏加载状态
    formData.loading = false
    return
  }

  setTimeout(() => {
    // 隐藏加载状态
    formData.loading = false
    // 跳转到房源详情页面
    router.push({
      name: "房源详情",
      params: {
        id: res.data.id,
      },
    })
  }, 2000)
}
</script>

<template>
  <n-spin :show="formData.loading">
    <!-- 加载框的提示信息 -->
    <template #description> 正在提交，请稍等...</template>
    <!-- 头部区域 -->
    <Header />

    <!-- 内容区域 -->
    <n-flex justify="center" style="width: 1280px">
      <!-- 左侧 -->
      <n-flex justify="center" style="width: 70%">
        <div style="margin-top: 20px; width: 700px">
          <n-form
            ref="formRef"
            :label-width="100"
            :model="formData"
            :rules="formRules"
            label-placement="left"
          >
            <!-- 租赁类型 -->
            <n-form-item label="类型" path="rentType">
              <n-radio-group v-model:value="formData.rentType">
                <n-radio
                  v-for="item in formOption.rentType"
                  :key="item.id"
                  :value="item.id"
                  style="margin-left: 10px"
                >
                  {{ item.value }}
                </n-radio>
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

            <!-- 手机号 -->
            <n-form-item label="手机号" path="mobilePhone">
              <n-input
                v-model:value="formData.mobilePhone"
                placeholder="手机号或微信号至少填写一项"
                style="width: 250px"
              >
              </n-input>
            </n-form-item>

            <!-- 微信号 -->
            <n-form-item label="微信号" path="wechatId">
              <n-input
                v-model:value="formData.wechatId"
                placeholder="手机号或微信号至少填写一项"
                style="width: 250px"
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
                placeholder="请填写整数"
                :show-button="false"
                :precision="0"
                style="width: 100px"
              >
              </n-input-number>
              <span style="margin-left: 10px">m²</span>
            </n-form-item>

            <!-- 租金 -->
            <n-form-item label="租金" path="price">
              <n-input-number
                v-model:value="formData.price"
                placeholder="请填写整数"
                :show-button="false"
                :precision="0"
                style="width: 100px"
              >
              </n-input-number>
              <span style="margin-left: 10px">元/月</span>
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

            <!-- 性别限制 -->
            <n-form-item label="性别要求" path="genderRestriction">
              <n-radio-group v-model:value="formData.genderRestriction">
                <n-radio
                  v-for="item in formOption.genderRestriction"
                  :key="item.id"
                  :value="item.id"
                  style="margin-left: 10px"
                >
                  {{ item.value }}
                </n-radio>
              </n-radio-group>
            </n-form-item>

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

            <!-- 合租户数 -->
            <!-- 如果选了rentType，
             而且rentType的值等于formOption里'合租'的id，
          才显示这个选项 -->
            <n-form-item
              v-if="
                formData.rentType &&
                formData.rentType ===
                  (formOption.rentType || []).filter((item) => {
                    return item.value === '合租'
                  })[0].id
              "
              label="合租户数"
              path="tenant"
            >
              <n-select
                v-model:value="formData.tenant"
                :options="formOption.tenant"
                placeholder="请选择"
                style="width: 120px"
              >
              </n-select>
            </n-form-item>

            <n-flex>
              <!-- 姓名 -->
              <n-form-item label="联系人姓名：" path="name">
                <n-input
                  placeholder="请输入姓名"
                  v-model:value="formData.name"
                  maxlength="10"
                  style="width: 150px"
                >
                </n-input>
              </n-form-item>

              <!-- 性别 -->
              <n-form-item path="gender">
                <n-radio-group v-model:value="formData.gender">
                  <n-radio
                    v-for="item in formOption.gender"
                    :key="item.id"
                    :value="item.id"
                    style="margin-left: 10px"
                  >
                    {{ item.value }}
                  </n-radio>
                </n-radio-group>
              </n-form-item>
            </n-flex>

            <!-- 上传 -->
            <n-form-item label="本地上传" path="fileIds">
              <n-upload
                multiple
                list-type="image-card"
                :action="uploadUrl"
                :headers="{
                  access_token: userStore.accessToken,
                }"
                @finish="handleUploadFinish"
                @remove="handleUploadRemove"
                @before-upload="beforeUpload"
                :default-file-list="formData.files"
                :max="9"
              >
                <span>上传图片</span>
              </n-upload>
            </n-form-item>

            <div style="margin-left: 100px; margin-top: -15px">
              <div>
                1.支持同时上传多张图片，最多可以上传9张图片，单张图片最大10mb；
              </div>
              <div>
                2.多图房源点击量比无图房源高出3-5倍。上传高质量的室内图，有祝您快速出租！
              </div>
            </div>

            <div style="display: flex; justify-content: center; margin: 20px">
              <n-button
                type="primary"
                @click="validateForm"
                style="width: 200px; height: 45px; font-size: 22px"
                >提 交</n-button
              >
            </div>
          </n-form>
        </div>
      </n-flex>

      <!-- 右侧 -->
      <n-flex style="width: calc(30% - 20px); border: 1px solid #ccc">
        广告
      </n-flex>
    </n-flex>
  </n-spin>
</template>

<style lang="scss" scoped></style>
