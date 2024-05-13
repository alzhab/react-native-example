import { IMediaFile } from 'services/MediaPickerService'

export interface INewsListActions {
  getListHome(): void
  getListStart(): void
  clearListStart(): void
  loadListMore(): void
  reloadList(): Promise<void>
}

export interface INewsCreateActions {
  submit(data: INewsSubmitData): void
}

export interface INewsDeleteActions {
  deleteItem(data: { id: number }): Promise<any>
}

export interface INewsEditActions {
  getDetail(): void
  clear(): void
  submit(data: INewsSubmitData): void
}

export interface INewsDetailActions {
  getDetail(): void
  clearData(): void
}

export type INewsSubmitData = {
  name: string
  description: string
  house: { title: string; val: number }
  file?: IMediaFile
}
