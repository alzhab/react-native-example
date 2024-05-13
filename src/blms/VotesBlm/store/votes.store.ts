import { injectable } from 'inversify'
import { EVotesStoreTabType, IVotesFilter, IVotesStore } from './types'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import { IVoting } from 'repositories/Api/models'

export const VotesStoreId = Symbol.for('VotesStore')

@injectable()
export class VotesStore implements IVotesStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'VotesStore', properties: [] })
  }

  listMaxCount: number = 0
  setListMaxCount(val: number): void {
    this.listMaxCount = val
  }

  listPage: number = 1
  setListPage(val: IVotesStore['listPage']): void {
    this.listPage = val
  }

  listStartLoading: boolean = true
  setListStartLoading(val: IVotesStore['listStartLoading']): void {
    this.listStartLoading = val
  }

  listReloadLoading: boolean = false
  setListReloadLoading(val: IVotesStore['listReloadLoading']): void {
    this.listReloadLoading = val
  }

  listMoreLoading: boolean = false
  setListMoreLoading(val: IVotesStore['listMoreLoading']): void {
    this.listMoreLoading = val
  }

  list: IVoting[] = []
  setList(val: IVotesStore['list']): void {
    this.list = val
  }
  addList(val: IVotesStore['list']): void {
    this.list = [...this.list, ...val]
  }

  detailData: IVoting | null = null
  setDetailData(val: IVotesStore['detailData']): void {
    this.detailData = val
  }

  detailDataLoading: boolean = true
  setDetailDataLoading(val: IVotesStore['detailDataLoading']): void {
    this.detailDataLoading = val
  }

  detailDataId: number = 0
  setDetailDataId(val: IVotesStore['detailDataId']): void {
    this.detailDataId = val
  }

  homeList: IVoting[] = []
  setHomeList(val: IVotesStore['list']): void {
    this.homeList = val
  }

  listHomeLoading: boolean = true
  setListHomeLoading(val: IVotesStore['listHomeLoading']): void {
    this.listHomeLoading = val
  }

  listFilters: IVotesFilter = {
    tabType: EVotesStoreTabType.active,
    search: '',
    house: { title: '', val: 0 },
    type: { title: '', val: '' },
    start_date: null,
    end_date: null,
    sortNew: { title: 'Сначала самые новые', val: true },
  }

  editData: IVoting | null = null

  setEditData(val: IVotesStore['editData']): void {
    this.editData = val
  }

  editDataId: number = 0
  setEditDataId(val: IVotesStore['editDataId']): void {
    this.editDataId = val
  }

  editDataLoading: boolean = false
  setEditDataLoading(val: IVotesStore['editDataLoading']): void {
    this.editDataLoading = val
  }

  setListFilters(data: Partial<IVotesStore['listFilters']>): void {
    this.listFilters = {
      ...this.listFilters,
      ...data,
    }
  }

  clearListFilters(): void {
    this.listFilters = {
      tabType: EVotesStoreTabType.active,
      search: '',
      house: { title: '', val: 0 },
      type: { title: '', val: '' },
      start_date: null,
      end_date: null,
      sortNew: { title: 'Сначала самые новые', val: true },
    }
  }
}
