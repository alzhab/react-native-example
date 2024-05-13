import { inject, injectable } from 'inversify'
import { ISmsCodeApproveActions } from './types'
import {
  ESmsCodeApproveState,
  ISmsCodeApproveStore,
  SmsCodeApproveStoreId,
} from 'blms/SmsCodeApproveBlm/store'
import { ApiRepoId, IApiRepo, IApproveSmsCodeParams, ISendSmsCodeParams } from 'repositories/Api'
import { AxiosError } from 'axios'
import { SMS_RESEND_TIME_SECONDS } from 'configs/Theme/constants'

export const SmsCodeApproveActionsId = Symbol.for('SmsCodeApproveActions')

@injectable()
export class SmsCodeApproveActions implements ISmsCodeApproveActions {
  constructor(
    @inject(SmsCodeApproveStoreId) private store: ISmsCodeApproveStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
  ) {}

  changePhone(): void {
    this.store.clear()
  }

  checkSmsCode(data: Omit<IApproveSmsCodeParams, 'phone'>): void {
    this.store.setLoading(true)
    this.apiRepo
      .approveSmsCode({ body: { phone: this.store.phone, ...data } })
      .then(() => {
        this.store.setCode(data.code)
        this.store.setState(ESmsCodeApproveState.approved)
      })
      .catch(() => this.store.setIsCodeInvalid(true))
      .finally(() => this.store.setLoading(false))
  }

  clear(): void {
    this.store.clear()
  }

  sendSmsCode(data: ISendSmsCodeParams): void {
    this.store.setLoading(true)
    this.apiRepo
      .sendSmsCode({ body: data })
      .then(() => {
        this.store.setPhone(data.phone)
        this.store.setState(ESmsCodeApproveState.code)
        this.store.setTime(SMS_RESEND_TIME_SECONDS)
      })
      .catch((err: AxiosError<{ details: string; non_field_errors: string[] }>) => {
        this.store.setPhoneError(err?.response?.data?.details || 'Неизвестная ошибка')
      })
      .finally(() => this.store.setLoading(false))
  }

  resendCode(type: ISendSmsCodeParams['type']): void {
    if (this.store.time === 0) {
      this.sendSmsCode({ phone: this.store.phone, type })
    }
  }
}
