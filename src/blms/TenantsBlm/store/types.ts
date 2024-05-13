import { IApartmentAdapter, ITenant } from 'repositories/Api/models'

export interface ITenantsStore {
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

  list: ITenant[]
  setList(val: ITenant[]): void
  addList(val: ITenant[]): void

  createModalOpen: boolean
  setCreateModalOpen(val: ITenantsStore['createModalOpen']): void

  tempPasswordModalOpen: boolean
  setTempPasswordModalOpen(val: ITenantsStore['tempPasswordModalOpen']): void

  tempPasswordModalData: ITempPasswordModalData
  setTempPasswordModalData(val: ITenantsStore['tempPasswordModalData']): void
}

export interface ITempPasswordModalData {
  temp_password: string
  data: string
}
