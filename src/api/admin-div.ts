import type { pagingRequest } from "@/type/paging"
import request from "@/util/request.ts"

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
      .then((res) => res.data)
      .catch((err) => console.log(err)),

  getList: (param: getList) =>
    request
      .post("/admin-div/list", param)
      .then((res) => res.data)
      .catch((err) => console.log(err)),
}

export default adminDivApi
