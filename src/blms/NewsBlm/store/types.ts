import { INews } from 'repositories/Api/models'

export interface INewsStore {
  editDataId: number
  setEditDataId(val: INewsStore['editDataId']): void

  editData: INews | null
  setEditData(val: INewsStore['editData']): void

  detailDataId: number
  setDetailDataId(val: INewsStore['detailDataId']): void

  detailData: INews | null
  setDetailData(val: INewsStore['detailData']): void

  detailDataLoading: boolean
  setDetailDataLoading(val: INewsStore['detailDataLoading']): void

  editDataLoading: boolean
  setEditDataLoading(val: INewsStore['editDataLoading']): void

  listPage: number
  setListPage(val: number): void

  listMaxCount: number
  setListMaxCount(val: number): void

  listStartLoading: boolean
  setListStartLoading(val: boolean): void

  listReloadLoading: boolean
  setListReloadLoading(val: boolean): void

  listMoreLoading: boolean
  setListMoreLoading(val: boolean): void

  list: INews[]
  setList(val: INews[]): void
  addList(val: INews[]): void

  listHomeLoading: boolean
  setListHomeLoading(val: INewsStore['listHomeLoading']): void

  homeList: INews[]
  setHomeList(val: INewsStore['list']): void
}
