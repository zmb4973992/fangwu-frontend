import type { pagingRequest } from "@/type/paging.ts"
import request from "@/util/request.ts"

type getList = pagingRequest & {
  rent_type?: number
  min_price?: number
  max_price?: number
  gender_restriction?: number
  keyword?: string
}

//
const forRentApi = {
  getList: (param: getList) =>
    request
      .post("/for-rent/list", param)
      .then((res) => res.data)
      .catch((err) => console.log(err)),
}

export default forRentApi
