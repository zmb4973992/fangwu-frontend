import type { commonResponse } from "@/type/response"
import request from "@/util/request.ts"
import type { AxiosResponse } from "axios"

type login = {
  username: string
  password: string
}

type register = {
  username: string
  password: string
}

//
const userApi = {
  login: (param: login) =>
    request
      .post("/login", param)
      .then((res: AxiosResponse<commonResponse>) => res.data),
  getCurrentUser: () =>
    request.get("/user").then((res: AxiosResponse<commonResponse>) => res.data),
  register: (param: register) =>
    request.post("/user", param).then((res: AxiosResponse<commonResponse>) => res.data),
}

export default userApi
