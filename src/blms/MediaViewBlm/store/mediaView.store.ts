import { injectable } from 'inversify'
import { IMediaViewStore } from './types'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

export const MediaViewStoreId = Symbol.for('MediaViewStore')

@injectable()
export class MediaViewStore implements IMediaViewStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'MediaViewStore', properties: [] })
  }

  data: { uri: string } | null = null
  setData(val: IMediaViewStore['data']): void {
    this.data = val
  }

  isOpen: boolean = false
  setIsOpen(val: boolean): void {
    this.isOpen = val
  }
}
