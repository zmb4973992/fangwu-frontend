import request from "@/util/request.ts"

type getList = {
  dictionary_type_name: string
}

//
const dictionaryDetailApi = {
  getList: (param: getList) =>
    request
      .post("/dictionary-detail/list", param)
      .then((res) => res.data)
      .catch((err) => console.log(err)),
}

export default dictionaryDetailApi
