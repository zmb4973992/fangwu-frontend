import type { forRentListResult } from "@/type/for-rent.ts"
import { defineStore } from "pinia"

const useForRentStore = defineStore("for-rent", {
  persist: true,
  state: (): forRentListResult => ({
    list: [],
    paging: {
      page: 1,
      page_size: 0,
      number_of_pages: 1,
      number_of_records: 0,
    },
  }),
  actions: {
    setData(data: forRentListResult) {
      this.list = data.list
      this.paging = data.paging
    },
  },
})

export { useForRentStore }
