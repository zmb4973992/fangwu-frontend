import type { file } from "@/type/file"
import type { pagingRequest } from "@/type/paging.ts"
import type { commonResponse, listResponse } from "@/type/response"
import request from "@/util/request.ts"
import type { AxiosResponse } from "axios"

// 创建出租信息的请求参数类型
type create = {
  price: number
  rent_type: number
  description: string
  gender_restriction: number
  mobile_phone?: string
  wechat_id?: string
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
  name?: string
  gender?: number
  files?: file[]
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
      .then((res: AxiosResponse<commonResponse>) => res.data)
      .catch((err) => console.log(err)),

  // 获取出租信息的联系方式
  getContact: (id: number) =>
    request
      .get("/for-rent/" + id + "/contact")
      .then((res: AxiosResponse<commonResponse>) => res.data)
      .catch((err) => console.log(err)),

  // 创建出租信息
  create: (data: create) =>
    request
      .post("/for-rent", data)
      .then((res: AxiosResponse<commonResponse>) => res.data)
      .catch((err) => console.log(err)),

  // 更新出租信息
  update: (data: update) =>
    request
      .patch("/for-rent", data)
      .then((res: AxiosResponse<commonResponse>) => res.data)
      .catch((err) => console.log(err)),

  // 删除出租信息
  delete: (id: number) =>
    request
      .delete("/for-rent", { data: { id } })
      .then((res: AxiosResponse<commonResponse>) => res.data)
      .catch((err) => console.log(err)),
  // 获取出租信息列表
  getList: (data: getList) =>
    request
      .post("/for-rent/list", data)
      .then((res: AxiosResponse<listResponse>) => res.data)
      .catch((err) => console.log(err)),
}

export default forRentApi
