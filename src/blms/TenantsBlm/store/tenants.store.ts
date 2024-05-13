import { injectable } from 'inversify'
import { ITempPasswordModalData, ITenantsStore } from './types'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import { ITenant } from 'repositories/Api/models'

export const TenantsStoreId = Symbol.for('TenantsStore')

@injectable()
export class TenantsStore implements ITenantsStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'TenantsStore', properties: [] })
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

  list: ITenant[] = []
  setList(val: ITenant[]): void {
    this.list = val
  }
  addList(val: ITenant[]): void {
    this.list = [...this.list, ...val]
  }

  createModalOpen: boolean = false
  setCreateModalOpen(val: ITenantsStore['createModalOpen']): void {
    this.createModalOpen = val
  }

  tempPasswordModalOpen: boolean = false
  setTempPasswordModalOpen(val: ITenantsStore['tempPasswordModalOpen']): void {
    this.tempPasswordModalOpen = val
  }

  tempPasswordModalData: ITempPasswordModalData = { temp_password: '', data: '' }
  setTempPasswordModalData(val: ITenantsStore['tempPasswordModalData']): void {
    this.tempPasswordModalData = val
  }
}
