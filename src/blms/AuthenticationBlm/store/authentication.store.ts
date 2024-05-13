import { injectable } from 'inversify'
import { IAuthenticationStore } from './types'
import { makeAutoObservable } from 'mobx'
import { isHydrated, makePersistable } from 'mobx-persist-store'

export const AuthenticationStoreId = Symbol.for('AuthenticationStore')

@injectable()
export class AuthenticationStore implements IAuthenticationStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'AuthenticationStore',
      properties: ['isAuthorized', 'token'],
    })
  }

  showPasswordConfirm: boolean = false
  setShowPasswordConfirm(val: IAuthenticationStore['showPasswordConfirm']): void {
    this.showPasswordConfirm = val
  }

  isAuthorized: boolean = false
  setIsAuthorized(val: boolean): void {
    this.isAuthorized = val
  }

  isPlugModalOpen: boolean = false
  setIsPlugModalOpen(val: boolean): void {
    this.isPlugModalOpen = val
  }

  token: string = ''
  setToken(val: string): void {
    this.token = val
  }
  get isHydrated() {
    return isHydrated(this)
  }

  action: null | (() => void) = null
  setAction(val: null | (() => void)) {
    this.action = val
  }
}
