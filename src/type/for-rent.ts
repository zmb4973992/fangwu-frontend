import type { file } from "./file.ts"
import type { dictionaryDetailResult } from "./dictionary-detail.ts"
import type { adminDivResult } from "./admin-div.ts"
import type {  pagingResult } from "./paging.ts"



export type forRentResult = {
  id: number
  rent_type?: dictionaryDetailResult
  price?: number
  description?: string
  gender_restriction?: dictionaryDetailResult
  mobile_phone?: string
  wechat_id?: string
  files?: file[]
  level_1_admin_div?: adminDivResult
  level_2_admin_div?: adminDivResult
  level_3_admin_div?: adminDivResult
  level_4_admin_div?: adminDivResult
  community?: string
  area?: number
  bedroom?: number
  livingRoom?: number
  bathroom?: number
  kitchen?: number
  floor?: number
  total_floor?: number
  orientation?: dictionaryDetailResult
  tenant?: number
  name?: string
  gender?: dictionaryDetailResult
}

export type forRentListResult = {
  list: forRentResult[]
  paging: pagingResult
}