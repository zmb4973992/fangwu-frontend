export type pagingRequest = {
    page?: number
    page_size?: number
    order_by?: string
    desc?: boolean
  }

export type pagingResult = {
  page: number
  page_size: number
  number_of_pages: number
  number_of_records: number
}