<script setup lang="ts">
import sideBar from "@/component/side-bar.vue"
import Header from "@/component/header.vue"
import {
  NFlex,
  useMessage,
  NRadio,
  NRadioGroup,
  NDataTable,
  NButton,
  NEllipsis,
  NPopconfirm,
  NPagination,
} from "naive-ui"
import { h, reactive, watch } from "vue"
import { useRouter } from "vue-router"
import type { DataTableColumns, SelectOption } from "naive-ui"
import type { forRentListResult, forRentResult } from "@/type/for-rent"
import forRentApi from "@/api/for-rent"
import noImage from "@/asset/no-image.jpg"

const router = useRouter()
const message = useMessage()

//筛选条件的类型
type filterOptionResult = {
  type: SelectOption[] //房源还是求租
}

//已选条件的类型
type selectedOptionResult = {
  type: string //房源还是求租
}

//筛选条件的值
const filterOption = reactive<filterOptionResult>({
  type: [
    { label: "房源信息", value: "for-rent" },
    { label: "求租信息", value: "seek-house" },
  ],
})

//已选条件的值
const selectedOption = reactive<selectedOptionResult>({
  type: "for-rent",
})

const data: forRentListResult = reactive({
  list: [],
  paging: {
    page: 0,
    page_size: 0,
    total_pages: 0,
    total_records: 0,
  },
})

watch(
  () => selectedOption.type,
  (newValue) => getData(newValue),
  { immediate: true }
)

async function getData(type: string) {
  switch (type) {
    case "for-rent":
      const res = await forRentApi.getList({
        page: data.paging.page,
        page_size: data.paging.page_size,
        desc: true,
        created_by_myself: true,
      })

      if (res && res.data.list.length > 0) {
        data.list = res.data.list
        data.paging = res.data.paging
      }
      break
    case "seek-house":
      //待完善
      data.list = []
      break
  }
}

getData(selectedOption.type)

function getRecord(id: number) {
  const href = router.resolve({
    name: "房源详情",
    params: { id },
  })
  window.open(href.href, "_blank")
}

function updateRecord(id: number) {
  const href = router.resolve({
    name: "修改房源",
    params: { id },
  })
  window.open(href.href, "_blank")
}

async function deleteRecord(id: number) {
  const res = await forRentApi.delete(id)
  if (res && res.code !== 0) {
    message.error(res.message)
    console.log(res.err_detail)
    return
  }
  message.success("删除成功")
  getData(selectedOption.type)
}

const columns = createColumns({
  handleGet(row) {
    getRecord(row.id)
  },
  handleUpdate(row) {
    updateRecord(row.id)
  },
  handleDelete(row) {
    deleteRecord(row.id)
  },
})
function createColumns({
  handleGet,
  handleUpdate,
  handleDelete,
}: {
  handleGet: (row: forRentResult) => void
  handleUpdate: (row: forRentResult) => void
  handleDelete: (row: forRentResult) => void
}): DataTableColumns<forRentResult> {
  return [
    {
      title: "序号",
      key: "no",
      className: "no",
      render(_, index) {
        return index + 1
      },
    },
    {
      title: "图片",
      key: "image",
      className: "image",
      render(row: forRentResult) {
        //如果没有图片，则显示默认图片
        if (!row.files || row.files.length === 0) {
          return h("img", {
            src: noImage,
            onClick: () => handleGet(row),
            style: "max-width: 150px; max-height: 112px;cursor:pointer",
          })
        }
        //如果有图片，则显示第一张图片
        return h("img", {
          src: row.files[0].url,
          onClick: () => handleGet(row),
          style: "max-width: 150px; max-height: 112px;cursor:pointer",
        })
      },
    },
    {
      title: "说明",
      key: "description",
      titleAlign: "center",
      className: "description",
      render(row: any) {
        return h(
          NEllipsis,
          {
            tooltip: false,
            style: "max-width:400px;cursor:pointer",
            class: "description-ellipsis",
          },
          {
            default: () =>
              h(
                "span",
                {
                  onClick: () => handleGet(row),
                },
                { default: () => row.description }
              ),
          }
        )
      },
    },
    {
      title: "价格",
      key: "price",
      className: "price",
      render(row: any) {
        const result = [
          h(
            "span",
            {
              style: "color: green;font-size:22px",
            },
            { default: () => row.price }
          ),
          " 元/月",
        ]
        return result
      },
    },
    {
      title: "操作",
      key: "action",
      className: "action",
      render(row: any) {
        const buttons = [
          h(
            NButton,
            {
              strong: true,
              secondary: true,
              type: "primary",
              onClick: () => handleUpdate(row),
            },
            { default: () => "修改" }
          ),
          h(
            NPopconfirm,
            {
              onPositiveClick: () => handleDelete(row),
              trigger: "click",
              positiveText: "确定",
              cancelText: "取消",
              showIcon: true,
            },
            {
              trigger: () =>
                h(
                  NButton,
                  {
                    strong: true,
                    secondary: true,
                    type: "error",
                    style: "margin-left: 10px",
                  },
                  { default: () => "删除" }
                ),
              default: () => h("span", {}, { default: () => "真的要删除吗？" }),
            }
          ),
          ,
        ]
        return buttons
      },
    },
  ]
}

watch(
  () => data.paging.page,
  () => {
    getData(selectedOption.type)
    scrollTo(0, 0)
  }
)
</script>

<template>
  <!-- 页面布局 -->
  <n-flex style="min-width: 1280px; background-color: #f1f1f1">
    <!-- 头部区域 -->
    <Header />

    <!-- 内容区 -->
    <n-flex
      :size="[20, 20]"
      style="
        width: 1280px;
        margin: 0 auto;
        padding-top: 20px;
        padding-bottom: 20px;
      "
    >
      <!-- 左侧的侧边栏 -->
      <sideBar :activeKey="String(router.currentRoute.value.name)" />
      <!-- 右侧的内容 -->
      <n-flex vertical :size="[0, 20]">
        <!-- 筛选条件 -->
        <n-flex style="width: 1060px; background-color: white; padding: 20px">
          信息类型：<n-radio-group v-model:value="selectedOption.type">
            <n-radio
              v-for="item in filterOption.type"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </n-radio>
          </n-radio-group>
        </n-flex>
        <!-- 数据表格 -->
        <div style="width: 1060px; background-color: white; padding: 20px">
          <n-data-table
            :columns="columns"
            :data="data.list"
            :bordered="false"
            style="min-height: calc(100vh - 210px)"
          >
          </n-data-table>
          <!-- 分页器 -->
          <n-pagination
            v-model:page="data.paging.page"
            :page-count="data.paging.total_pages"
            v-model:page-size="data.paging.page_size"
            size="large"
            show-quick-jumper
            style="
              width: 100%;
              height: 60px;
              margin-top: 10px;
              margin-bottom: -10px;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: white;
            "
          ></n-pagination>
        </div>
      </n-flex>
    </n-flex>
  </n-flex>
</template>

<style scoped lang="scss">
:deep(.no) {
  width: 50px;
  text-align: center;
  padding: 0;
}
:deep(.image) {
  width: 200px;
  text-align: center;
  padding: 10px 0 10px 0;
}
:deep(.description) {
  padding: 10px;
}
:deep(.description-ellipsis:hover) {
  color: green;
}
:deep(.price) {
  width: 250px;
  text-align: center;
  padding: 0;
}
:deep(.action) {
  width: 200px;
  text-align: center;
}
</style>
