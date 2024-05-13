import { injectable } from 'inversify'
import { IConfirmModalData, IConfirmModalStore } from './types'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

export const ConfirmModalStoreId = Symbol.for('ConfirmModalStore')

@injectable()
export class ConfirmModalStore implements IConfirmModalStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'ConfirmModalStore', properties: [] })
  }

  confirmModalData: IConfirmModalData = {}

  setConfirmModalData(val: IConfirmModalData): void {
    this.confirmModalData = val
  }

  isModalOpen: boolean = false
  setIsModalOpen(val: IConfirmModalStore['isModalOpen']): void {
    this.isModalOpen = val
  }
}
