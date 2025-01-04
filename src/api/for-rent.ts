import type { pagingRequest } from "@/type/paging.ts"
import request from "@/util/request.ts"

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

type getList = pagingRequest & {
  rent_type?: number
  min_price?: number
  max_price?: number
  gender_restriction?: number
  keyword?: string
}

//
const forRentApi = {
  create: (param: create) =>
    request
      .post("/for-rent", param)
      .then((res) => res.data)
      .catch((err) => console.log(err)),
  getList: (param: getList) =>
    request
      .post("/for-rent/list", param)
      .then((res) => res.data)
      .catch((err) => console.log(err)),
}

export default forRentApi
