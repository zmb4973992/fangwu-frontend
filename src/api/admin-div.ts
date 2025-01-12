import type { pagingRequest } from "@/type/paging"
import type { listResponse } from "@/type/response"
import request from "@/util/request.ts"
import type { AxiosResponse } from "axios"

type getList = pagingRequest & {
  parent_code?: number
  level?: number
  grandpa_code?: number
}

//
const adminDivApi = {
  getList: (param: getList) =>
    request
      .post("/admin-div/list", param)
      .then((res: AxiosResponse<listResponse>) => res.data)
      .catch((err) => console.log(err)),
}

export default adminDivApi
