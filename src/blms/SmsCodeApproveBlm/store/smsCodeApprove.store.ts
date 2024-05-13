import { injectable } from 'inversify'
import { ESmsCodeApproveState, ISmsCodeApproveStore } from './types'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

export const SmsCodeApproveStoreId = Symbol.for('SmsCodeApproveStore')

@injectable()
export class SmsCodeApproveStore implements ISmsCodeApproveStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'SmsCodeApproveStore', properties: [] })
  }

  isCodeInvalid: boolean = false
  setIsCodeInvalid(val: ISmsCodeApproveStore['isCodeInvalid']): void {
    this.isCodeInvalid = val
  }

  phone: string = ''
  setPhone(val: ISmsCodeApproveStore['phone']): void {
    this.phone = val
  }

  state: ESmsCodeApproveState = ESmsCodeApproveState.phone
  setState(val: ISmsCodeApproveStore['state']): void {
    this.state = val
  }

  loading: boolean = false
  setLoading(val: ISmsCodeApproveStore['loading']): void {
    this.loading = val
  }

  time: number = 0
  setTime(val: ISmsCodeApproveStore['time']): void {
    this.time = val
  }

  phoneError: string = ''
  setPhoneError(val: ISmsCodeApproveStore['phoneError']): void {
    this.phoneError = val
  }

  code: string = ''
  setCode(val: ISmsCodeApproveStore['code']): void {
    this.code = val
  }

  clear(): void {
    this.isCodeInvalid = false
    this.phone = ''
    this.state = ESmsCodeApproveState.phone
    this.loading = false
    this.time = 0
    this.phoneError = ''
    this.code = ''
  }
}
