import type { pagingRequest } from "@/type/paging"
import type { commonResponse, listResponse } from "@/type/response"
import request from "@/util/request.ts"
import type { AxiosResponse } from "axios"

type get = {
  name: string
}

type getList = pagingRequest & {
  parent_code?: number
  level?: number
}

//
const adminDivApi = {
  get: (param: get) =>
    request
      .post("/admin-div", param)
      .then((res: AxiosResponse<commonResponse>) => res.data)
      .catch((err) => console.log(err)),

  getList: (param: getList) =>
    request
      .post("/admin-div/list", param)
      .then((res: AxiosResponse<listResponse>) => res.data)
      .catch((err) => console.log(err)),
}

export default adminDivApi
