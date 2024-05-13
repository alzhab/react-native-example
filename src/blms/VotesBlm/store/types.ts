import { IVoting, IVotingStatusEnum, IVotingTypeEnum } from 'repositories/Api/models'

export interface IVotesStore {
  listPage: number
  setListPage(val: IVotesStore['listPage']): void

  listMaxCount: number
  setListMaxCount(val: IVotesStore['listMaxCount']): void

  listStartLoading: boolean
  setListStartLoading(val: IVotesStore['listStartLoading']): void

  listReloadLoading: boolean
  setListReloadLoading(val: IVotesStore['listReloadLoading']): void

  listMoreLoading: boolean
  setListMoreLoading(val: IVotesStore['listMoreLoading']): void

  list: IVoting[]
  setList(val: IVotesStore['list']): void
  addList(val: IVotesStore['list']): void

  detailDataId: number
  setDetailDataId(val: IVotesStore['detailDataId']): void

  editDataId: number
  setEditDataId(val: IVotesStore['editDataId']): void

  detailDataLoading: boolean
  setDetailDataLoading(val: IVotesStore['detailDataLoading']): void

  editDataLoading: boolean
  setEditDataLoading(val: IVotesStore['editDataLoading']): void

  detailData: IVoting | null
  setDetailData(val: IVotesStore['detailData']): void

  editData: IVoting | null
  setEditData(val: IVotesStore['editData']): void

  listHomeLoading: boolean
  setListHomeLoading(val: IVotesStore['listHomeLoading']): void

  homeList: IVoting[]
  setHomeList(val: IVotesStore['list']): void

  listFilters: IVotesFilter
  setListFilters(data: Partial<IVotesStore['listFilters']>): void
  clearListFilters(): void
}

export interface IVotesFilter {
  tabType: EVotesStoreTabType
  search: string
  house: { title: string; val: number }
  type: { title: string; val: IVotingTypeEnum | '' }
  start_date: Date | null
  end_date: Date | null
  sortNew: { title: string; val: boolean }
}

export enum EVotesStoreTabType {
  active = IVotingStatusEnum.Active,
  finished = IVotingStatusEnum.Finished,
  archive = IVotingStatusEnum.Archive,
}
