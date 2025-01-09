export type pagingRequest = {
  page?: number
  page_size?: number
  order_by?: string
  desc?: boolean
}

export type pagingResult = {
  page: number
  page_size: number
  total_pages: number
  total_records: number
}