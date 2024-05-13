import { injectable } from 'inversify'
import { IServerapistopStore } from './types'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

export const ServerapistopStoreId = Symbol.for('ServerapistopStore')

@injectable()
export class ServerapistopStore implements IServerapistopStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'ServerapistopStore', properties: [] })
  }

  isPlugOpen: boolean = false
  setIsPlugOpen(val: IServerapistopStore['isPlugOpen']): void {
    this.isPlugOpen = val
  }
}
