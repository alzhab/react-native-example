import { injectable } from 'inversify'
import { IRecoverPasswordStore } from './types'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

export const RecoverPasswordStoreId = Symbol.for('RecoverPasswordStore')

@injectable()
export class RecoverPasswordStore implements IRecoverPasswordStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'RecoverPasswordStore', properties: [] })
  }

  code: string = ''
  setCode(val: IRecoverPasswordStore['code']): void {
    this.code = val
  }

  phone: string = ''
  setPhone(val: IRecoverPasswordStore['phone']): void {
    this.phone = val
  }

  showRecoverModal: boolean = false
  setShowRecoverModal(val: IRecoverPasswordStore['showRecoverModal']): void {
    this.showRecoverModal = val
  }
}
