import type { commonResponse } from "@/type/response"
import request from "@/util/request.ts"
import type { AxiosResponse } from "axios"

type getList = {
  dictionary_type_value: string
}

//
const dictionaryDetailApi = {
  getList: (param: getList) =>
    request
      .post("/dictionary-detail/list", param)
      .then((res: AxiosResponse<commonResponse>) => res.data)
      .catch((err) => console.log(err)),
}

export default dictionaryDetailApi
