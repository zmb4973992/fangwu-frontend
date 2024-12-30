import type { file } from "./file.ts"
import type { dictionaryDetailResult } from "./dictionary-detail.ts"
import type { adminDivResult } from "./administrative-division.ts"
import type { pagingRequest, pagingResult } from "./paging.ts"

export type forRentRequest = pagingRequest & {
  
}

export type forRentResult = {
  id?: number
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
  house_type?: dictionaryDetailResult
  building_area?: number
}

export type forRentListResult = {
  list: forRentResult[]
  paging: pagingResult
}
