import { availableCities } from "@/constant"
import type { adminDivResult } from "@/type/admin-div"
import { defineStore } from "pinia"

const useCityStore = defineStore("city", {
  persist: true,
  state: () => ({
    name: <string | null>null,
    abbr: <string | null>null,
    code: <number | null>null,
    parentCode: <number | null>null,
    pinyinPrefix: <string | null>null,
  }),
  actions: {
    setCityInfo(city: adminDivResult) {
      this.name = city.name
      this.abbr =
        availableCities.find((item) => item.code === city.code)?.abbr ?? null
      this.code = city.code
      this.parentCode = city.parent_code
      this.pinyinPrefix = city.pinyin_prefix
    },
  },
})

export default useCityStore
