import { injectable } from 'inversify'
import { IGlobalLoadingStore } from './types'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

export const GlobalLoadingStoreId = Symbol.for('GlobalLoadingStore')

@injectable()
export class GlobalLoadingStore implements IGlobalLoadingStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'GlobalLoadingStore', properties: [] })
  }

  isVisible: boolean = false
  setIsVisible(val: boolean): void {
    this.isVisible = val
  }
}
