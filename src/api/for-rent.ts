import type { pagingRequest } from "@/type/paging.ts"
import request from "@/util/request.ts"

// 创建出租信息的请求参数类型
type create = {
  price: number
  rent_type: number
  description: string
  gender_restriction: number
  mobile_phone?: string
  wechat_id?: string
  file_ids?: number[]
  level_1_admin_div?: number
  level_2_admin_div?: number
  level_3_admin_div?: number
  level_4_admin_div?: number
  community: string
  area?: number
  bedroom?: number
  living_room?: number
  bathroom?: number
  kitchen?: number
  floor?: number
  total_floor?: number
  orientation?: number
  tenant?: number
}

// 更新出租信息的请求参数类型
type update = create & {
  id: number
}

// 获取出租信息列表的请求参数类型
type getList = pagingRequest & {
  created_by_myself?: boolean
  rent_type?: number
  min_price?: number
  max_price?: number
  gender_restriction?: number
  keyword?: string
  level_2_admin_div?: number
  level_3_admin_div?: number
  level_4_admin_div?: number
}

// 出租信息接口
const forRentApi = {
  // 获取出租信息详情
  get: (id: number) =>
    request
      .get("/for-rent/" + id)
      .then((res) => res.data)
      .catch((err) => console.log(err)),

  // 获取出租信息的联系方式
  getContact: (id: number) =>
    request
      .get("/for-rent/" + id + "/contact")
      .then((res) => res.data)
      .catch((err) => console.log(err)),

  // 创建出租信息
  create: (param: create) =>
    request
      .post("/for-rent", param)
      .then((res) => res.data)
      .catch((err) => console.log(err)),

  // 更新出租信息
  update: (param: update) =>
    request
      .patch("/for-rent", param)
      .then((res) => res.data)
      .catch((err) => console.log(err)),

  // 获取出租信息列表
  getList: (param: getList) =>
    request
      .post("/for-rent/list", param)
      .then((res) => res.data)
      .catch((err) => console.log(err)),
}

export default forRentApi
