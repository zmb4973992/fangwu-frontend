// 通用返回类型
export type commonResponse = {
  data: any
  code: number
  message: string
  err_detail?: {
    file_name: string
    function_name: string
    line: number
    description: string
  }
}

// 列表返回类型
export type listResponse = {
  data: {
    list: any[]
    paging: {
      page: number
      page_size: number
      total_pages: number
      total_records: number
    }
  }
  code: number
  message: string
  err_detail?: {
    file_name: string
    function_name: string
    line: number
    description: string
  }
}
