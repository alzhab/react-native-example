import { ITenantsStore } from 'blms/TenantsBlm/store'
import { ITenant, ITenantStatus } from 'repositories/Api'

export interface ITenantsCreateActions {
  submit(data: ITenantCreateData): void
  openCreateModal(): void
  closeCreateModal(): void
}

export interface ITenantsListActions {
  getListStart(): void
  clearListStart(): void
  loadListMore(): void
  reloadList(): Promise<void>
}

export type ITenantCreateData = {
  phone: string
}

export interface ITempPasswordActions {
  openTempModal(): void
  closeTempModal(): void
  setTempData(data: ITenantsStore['tempPasswordModalData']): void
  share(): void
  copy(): void
}

export interface ITenantDeleteActions {
  openConfirmModal(id: ITenant['id']): void
}

export interface ITenantsPermissionChangeActions {
  changePermissionApplication(data: { id: ITenant['id']; val: boolean }): void
  changePermissionVote(data: { id: ITenant['id']; val: boolean }): void
  changeTenantToApprove(data: { id: ITenant['id']; val: ITenantStatus }): void
}
