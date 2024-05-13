import { IApplications, IApplicationsStatusEnum, IApplicationType } from 'repositories/Api/models'

export interface IApplicationsStore {
  listPage: number
  setListPage(val: IApplicationsStore['listPage']): void

  listMaxCount: number
  setListMaxCount(val: IApplicationsStore['listMaxCount']): void

  listStartLoading: boolean
  setListStartLoading(val: IApplicationsStore['listStartLoading']): void

  listReloadLoading: boolean
  setListReloadLoading(val: IApplicationsStore['listReloadLoading']): void

  listMoreLoading: boolean
  setListMoreLoading(val: IApplicationsStore['listMoreLoading']): void

  list: IApplications[]
  setList(val: IApplicationsStore['list']): void
  addList(val: IApplicationsStore['list']): void

  detailDataId: number
  setDetailDataId(val: IApplicationsStore['detailDataId']): void

  editDataId: number
  setEditDataId(val: IApplicationsStore['editDataId']): void

  detailDataLoading: boolean
  setDetailDataLoading(val: IApplicationsStore['detailDataLoading']): void

  editDataLoading: boolean
  setEditDataLoading(val: IApplicationsStore['editDataLoading']): void

  detailData: IApplications | null
  setDetailData(val: IApplicationsStore['detailData']): void

  editData: IApplications | null
  setEditData(val: IApplicationsStore['editData']): void

  listHomeLoading: boolean
  setListHomeLoading(val: IApplicationsStore['listHomeLoading']): void

  homeList: IApplications[]
  setHomeList(val: IApplicationsStore['list']): void

  listFilters: IApplicationFilter
  setListFilters(data: Partial<IApplicationsStore['listFilters']>): void
  clearListFilters(): void

  types: IApplicationType[]
  setTypes(val: IApplicationsStore['types']): void

  createSuccessId: number
  setCreateSuccess(val: IApplicationsStore['createSuccessId']): void
}

export interface IApplicationFilter {
  tabType: EApplicationStoreTabType
  search: string
  house: { title: string; val: number }
  type: { title: string; val: number }
  category: { title: string; val: number }
  start_date: Date | null
  end_date: Date | null
  sortNew: { title: string; val: boolean }
  affiliation_application: { title: string; val: string }
}

export enum EApplicationStoreTabType {
  all = 'all',
  open = IApplicationsStatusEnum.Open,
  work = IApplicationsStatusEnum.Enabled + ',' + IApplicationsStatusEnum.EmployeeAssigned,
  finished = IApplicationsStatusEnum.Entered,
}
