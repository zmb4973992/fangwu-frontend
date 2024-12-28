import request from "@/util/request.ts"

type getList = {
  parent_code: number
}

//
const administrativeDivisionApi = {
  getList: (param: getList) =>
    request
      .post("/administrative-division/list", param)
      .then((res) => res.data)
      .catch((err) => console.log(err)),
}

export default administrativeDivisionApi
