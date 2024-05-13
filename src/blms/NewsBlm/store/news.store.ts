import { injectable } from 'inversify'
import { INewsStore } from './types'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import { INews } from 'repositories/Api/models'

export const NewsStoreId = Symbol.for('NewsStore')

@injectable()
export class NewsStore implements INewsStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'NewsStore', properties: [] })
  }

  detailData: INews | null = null
  setDetailData(val: INewsStore['detailData']): void {
    this.detailData = val
  }

  listMaxCount: number = 0
  setListMaxCount(val: number): void {
    this.listMaxCount = val
  }

  listPage: number = 1
  setListPage(val: number): void {
    this.listPage = val
  }

  listStartLoading: boolean = true
  setListStartLoading(val: boolean): void {
    this.listStartLoading = val
  }

  listReloadLoading: boolean = false
  setListReloadLoading(val: boolean): void {
    this.listReloadLoading = val
  }

  listMoreLoading: boolean = false
  setListMoreLoading(val: boolean): void {
    this.listMoreLoading = val
  }

  list: INews[] = []
  setList(val: INews[]): void {
    this.list = val
  }
  addList(val: INews[]): void {
    this.list = [...this.list, ...val]
  }

  homeList: INews[] = []
  setHomeList(val: INewsStore['homeList']): void {
    this.homeList = val
  }

  listHomeLoading: boolean = true
  setListHomeLoading(val: INewsStore['listHomeLoading']): void {
    this.listHomeLoading = val
  }

  editDataId: number = 0
  setEditDataId(val: INewsStore['editDataId']): void {
    this.editDataId = val
  }

  editData: INews | null = null
  setEditData(val: INewsStore['editData']): void {
    this.editData = val
  }

  detailDataId: number = 0
  setDetailDataId(val: INewsStore['detailDataId']): void {
    this.detailDataId = val
  }

  detailDataLoading: boolean = true
  setDetailDataLoading(val: INewsStore['detailDataLoading']): void {
    this.detailDataLoading = val
  }

  editDataLoading: boolean = true
  setEditDataLoading(val: INewsStore['editDataLoading']): void {
    this.editDataLoading = val
  }
}
