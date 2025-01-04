<script lang="ts" setup>
import forRentApi from "@/api/for-rent"
import Header from "@/component/header.vue"
import type { forRentResult } from "@/type/for-rent"
import {
  NFlex,
  NEllipsis,
  NButton,
  NCarousel,
  NImageGroup,
  NImage,
} from "naive-ui"
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

const router = useRouter()

const data = reactive<forRentResult>({})

async function fetchData() {
  const res = await forRentApi.get(props.id)
  // 如果不是成功的状态码，则跳转到404页面
  if (res.code !== 0) {
    console.log(res)
    router.push({ name: "NotFound" })
    return
  }

  data.id = res.data.id
  data.rent_type = res.data.rent_type
  data.price = res.data.price
  data.description = res.data.description
  data.gender_restriction = res.data.gender_restriction
  data.files = res.data.files
  data.level_1_admin_div = res.data.level_1_admin_div
  data.level_2_admin_div = res.data.level_2_admin_div
  data.level_3_admin_div = res.data.level_3_admin_div
  data.level_4_admin_div = res.data.level_4_admin_div
  data.community = res.data.community
  data.area = res.data.area
  data.bedroom = res.data.bedroom
  data.livingRoom = res.data.livingRoom
  data.bathroom = res.data.bathroom
  data.kitchen = res.data.kitchen
  data.floor = res.data.floor
  data.total_floor = res.data.total_floor
  data.orientation = res.data.orientation
  data.tenant = res.data.tenant
}

async function fetchContactData() {
  const res = await forRentApi.getContact(props.id)
  if (res.code !== 0) {
    console.log(res.err_detail)
  }
  data.mobile_phone = formatPhoneNumber(res.data.mobile_phone)
  data.wechat_id = res.data.wechat_id
}

fetchData()

//生成xxx-xxxx-xxx格式的手机号
function formatPhoneNumber(phone: string | undefined): string | undefined {
  if (phone?.length == 11) {
    return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7, 11)}`
  }
  return phone
}

const show = ref(true)
</script>

<template>
  <Header />
  <n-flex vertical style="width: 1200px; margin: 20px auto">
    <!-- 上部信息 -->
    <n-flex vertical>
      <!-- 标题和按钮 -->
      <n-flex justify="space-between">
        <!-- 标题 -->
        <n-ellipsis
          :tooltip="false"
          style="
            width: 700px;
            margin: auto 0;
            font-size: 28px;
            font-weight: 600;
          "
        >
          {{ data.description }}
        </n-ellipsis>
        <!-- 按钮 -->
        <n-flex style="margin: auto 0">
          <n-button>收藏</n-button>
          <n-button>反馈/举报</n-button>
        </n-flex>
      </n-flex>

      <!-- 轮播图和右侧文字 -->
      <n-flex style="padding-bottom: 20px; border-bottom: 1px solid #ccc">
        <!-- 轮播图 -->
        <n-flex style="width: 700px">
          <n-carousel show-arrow>
            <img
              v-for="img in data.files"
              :key="img.download_path"
              style="width: 100%; height: 525px; object-fit: contain"
              :src="img.download_path"
            />
            <!-- 当前无图或只有一张图片时禁用按钮 -->
            <template #arrow="{ prev, next }">
              <div class="custom-arrow">
                <n-button
                  type="primary"
                  color="#7a7a7a"
                  class="custom-arrow-l"
                  @click="prev"
                  :disabled="(data.files?.length || 0) <= 1 ? true : false"
                >
                  上一张
                </n-button>
                <n-button
                  type="primary"
                  color="#7a7a7a"
                  class="custom-arrow--r"
                  @click="next"
                  :disabled="(data.files?.length || 0) <= 1 ? true : false"
                >
                  下一张
                </n-button>
              </div>
            </template>
          </n-carousel>

          <!-- 自定义轮播图的按钮 -->
          <template #dots="{ total, currentIndex, to }">
            <ul class="custom-dots">
              <li
                v-for="index of total"
                :key="index"
                :class="{ ['is-active']: currentIndex === index - 1 }"
                @click="to(index - 1)"
              />
            </ul>
          </template>
        </n-flex>

        <!-- 右侧文字 -->
        <n-flex vertical style="margin-left: 15px">
          <!-- 价格 -->
          <n-flex style="border-bottom: 1px solid #ccc">
            <span
              style="font-size: 40px; font-weight: 600; margin: 0; color: green"
            >
              {{ data.price }}
            </span>
            <span style="margin: auto 0">元/月</span>
          </n-flex>
          <!-- 属性标签 -->
          <n-flex style="width: 471px; border-bottom: 1px solid #ccc">
            <!-- 出租方式 -->
            <n-flex
              vertical
              style="width: 149px; margin: 10px 0"
              v-if="data.rent_type"
            >
              <n-flex style="font-size: 18px">
                {{ data.rent_type?.name }}
              </n-flex>
              <n-flex style="font-size: 13px; color: gray">出租方式</n-flex>
            </n-flex>
            <!-- 户型 -->
            <n-flex
              v-if="
                data.bedroom || data.livingRoom || data.bathroom || data.kitchen
              "
              vertical
              style="width: 149px; margin: 10px 0"
            >
              <div style="font-size: 18px">
                <span v-if="data.bedroom">{{ data.bedroom }}</span>
                <span v-if="data.bedroom">室</span>
                <span v-if="data.livingRoom">{{ data.livingRoom }}</span>
                <span v-if="data.livingRoom">厅</span>
                <span v-if="data.bathroom">{{ data.bathroom }}</span>
                <span v-if="data.bathroom">卫</span>
                <span v-if="data.kitchen">{{ data.kitchen }}</span>
                <span v-if="data.kitchen">厨</span>
              </div>
              <div style="font-size: 13px; color: gray">户型</div>
            </n-flex>
            <!-- 面积 -->
            <n-flex
              v-if="data.area"
              vertical
              style="width: 149px; margin: 10px 0"
            >
              <n-flex style="font-size: 18px"> {{ data.area }}&nbsp;m² </n-flex>
              <n-flex style="font-size: 13px; color: gray">面积</n-flex>
            </n-flex>
            <!-- 朝向 -->
            <n-flex
              v-if="data.orientation"
              vertical
              style="width: 149px; margin: 10px 0"
            >
              <n-flex style="font-size: 18px">
                {{ data.orientation?.name }}
              </n-flex>
              <n-flex style="font-size: 13px; color: gray">朝向</n-flex>
            </n-flex>
            <!-- 性别要求 -->
            <n-flex
              v-if="data.gender_restriction"
              vertical
              style="width: 149px; margin: 10px 0"
            >
              <n-flex style="font-size: 18px">
                {{ data.gender_restriction?.name }}
              </n-flex>
              <n-flex style="font-size: 13px; color: gray">性别要求</n-flex>
            </n-flex>
            <!-- 楼层 -->
            <n-flex
              v-if="data.floor"
              vertical
              style="width: 149px; margin: 10px 0"
            >
              <div style="font-size: 18px">
                {{ data.floor }}
                <span v-if="data.total_floor"> / {{ data.total_floor }}</span>
                层
              </div>
              <n-flex style="font-size: 13px; color: gray">楼层</n-flex>
            </n-flex>
            <!-- 合租户数 -->
            <n-flex
              v-if="data.tenant"
              vertical
              style="width: 149px; margin: 10px 0"
            >
              <n-flex style="font-size: 18px">
                {{ data.tenant }}&nbsp;户
              </n-flex>
              <n-flex style="font-size: 13px; color: gray">合租户数</n-flex>
            </n-flex>
          </n-flex>

          <!-- 小区和位置 -->
          <n-flex v-if="data.community" vertical style="margin-bottom: 10px">
            <div style="font-size: 18px; margin: 10px 0">
              小区：{{ data.community }}
            </div>
            <div
              v-if="data.level_3_admin_div || data.level_4_admin_div"
              style="font-size: 18px; margin: 10px 0"
            >
              位置：
              <span v-if="data.level_3_admin_div">
                {{ data.level_3_admin_div?.name }}
              </span>
              <span v-if="data.level_4_admin_div">
                - {{ data.level_4_admin_div?.name }}
              </span>
            </div>
          </n-flex>
          <!-- 查看联系方式的按钮 -->
          <n-flex vertical v-if="show" style="height: 61px">
            <n-button
              type="primary"
              @click="() => fetchContactData().then(() => (show = !show))"
              style="
                width: 300px;
                height: 55px;
                font-size: 22px;
                font-weight: 600;
              "
            >
              查看联系方式
            </n-button>
          </n-flex>
          <!-- 具体的联系方式 -->
          <n-flex v-if="!show">
            <!-- 手机号 -->
            <n-flex v-if="data.mobile_phone" vertical style="width: 47%">
              <n-flex style="font-size: 24px; font-weight: 600; color: green">
                {{ data.mobile_phone }}
              </n-flex>
              <n-flex style="font-size: 13px; color: gray">手机号</n-flex>
            </n-flex>
            <!-- 微信号 -->
            <n-flex v-if="data.wechat_id" vertical style="width: 50%">
              <n-flex style="font-size: 24px; font-weight: 600; color: green">
                {{ data.wechat_id }}
              </n-flex>
              <n-flex style="font-size: 13px; color: gray">微信号</n-flex>
            </n-flex>
          </n-flex>
        </n-flex>
      </n-flex>
    </n-flex>

    <!-- 中部信息 -->
    <n-flex style="margin-top: 20px">
      <!-- 内容区 -->
      <n-flex vertical style="width: 850px">
        <!-- 详情 -->
        <n-flex>
          <!-- 房源描述的标题 -->
          <n-flex
            style="
              width: 850px;
              font-size: 22px;
              font-weight: 600;
              border-bottom: 1px solid #ccc;
              padding: 10px;
            "
          >
            房源描述
          </n-flex>
          <!-- 房源描述的内容 -->
          <n-flex style="width: 850px; padding: 10px">
            {{ data.description }}
          </n-flex>
        </n-flex>
        <!-- 房源图片 -->
        <n-flex>
          <!-- 房源图片的标题 -->
          <n-flex
            style="
              width: 850px;
              font-size: 22px;
              font-weight: 600;
              border-bottom: 1px solid #ccc;
              padding: 10px;
            "
          >
            房源图片
          </n-flex>

          <!-- 房源图片的内容 -->
          <n-flex style="width: 850px">
            <n-image-group>
              <n-image
                v-for="item in data.files"
                width="419"
                height="314"
                object-fit="contain"
                :src="item.download_path"
              >
              </n-image>
            </n-image-group>
          </n-flex>
        </n-flex>
      </n-flex>
      <!-- 广告 -->
      <n-flex style="width: 336px; border: 1px solid #ccc">广告</n-flex>
    </n-flex>

    <!-- 下部信息 -->
    <n-flex> 其他房源推荐 </n-flex>
  </n-flex>
</template>

<style scoped lang="scss">
.custom-arrow {
  display: flex;
  position: absolute;
  bottom: 25px;
  right: 30px;
}

.custom-arrow-l {
  margin-right: 10px;
}

</style>
