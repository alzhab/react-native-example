export type IPaginationParams = {
  ordering?: string
  page?: number
  page_size?: number
}

export type IDetailParams = {
  id: number
}

export type IFile = {
  id: number
  file?: string
}

export interface IReponsePagination200<D> {
  count: number
  next?: string | null
  previous?: string | null
  results: D[]
}
