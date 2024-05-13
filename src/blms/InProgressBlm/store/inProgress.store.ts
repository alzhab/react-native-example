import { injectable } from 'inversify'
import { IInProgressStore } from './types'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

export const InProgressStoreId = Symbol.for('InProgressStore')

@injectable()
export class InProgressStore implements IInProgressStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'InProgressStore', properties: [] })
  }

  isPlugOpen: boolean = false

  setIsPlugOpen(val: IInProgressStore['isPlugOpen']): void {
    this.isPlugOpen = val
  }
}
