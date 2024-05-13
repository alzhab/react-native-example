import { IMediaFile } from 'services/MediaPickerService'
import { IApplicationsStore } from 'blms/ApplicationsBlm/store'

export interface IApplicationListActions {
  getListStart(): void
  clearListStart(): void
  loadListMore(): void
  reloadList(): Promise<void>
  getListHome(): void
  clearFilter(): void
  changeTab(val: IApplicationsStore['listFilters']['tabType']): void
  setFilter(data: Partial<IApplicationsStore['listFilters']>): void
}

export interface IApplicationCreateActions {
  submit(data: IApplicationSubmitData): void
  clear(): void
}

export interface IApplicationEditActions {
  getDetail(): void
  clear(): void
  submit(data: IApplicationSubmitData): void
}

export interface IApplicationSubmitData {
  house: { title: string; val: number }
  type: { title: string; val: number }
  category: { title: string; val: number }
  place: string
  phone: string
  description: string
  files: IMediaFile[]
  deleted_files_ids: number[]
}

export interface IApplicationDetailActions {
  getDetail(): void
  clearData(): void
  accept(): void
  reject(): void
  cancel(): void
}

export interface IApplicationConfigActions {
  getConfigData(): Promise<void>
}

export interface IApplicationDeleteActions {
  deleteItem(data: { id: number }): Promise<any>
}
