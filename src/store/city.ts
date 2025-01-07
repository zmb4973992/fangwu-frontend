import { allCities } from "@/constant"
import { createDiscreteApi } from "naive-ui"
import { defineStore } from "pinia"

const { message } = createDiscreteApi(["message"])

const useCityStore = defineStore("city", {
  persist: true,
  state: () => ({
    name: <string>"北京市",
    code: <number>1101,
    parent_code: <number>11,
    pinyin_prefix: <string>"b",
  }),
  actions: {
    setCity(cityName: string) {
      const city = allCities.find((item) => item.name.includes(cityName))
      if (!city) {
        message.error("该城市暂未开通服务，请重新选择")
        return
      }

      this.name = city.name
      this.code = city.code
      this.parent_code = city.parent_code
      this.pinyin_prefix = city.pinyin_prefix
    },
  },
})

export default useCityStore
