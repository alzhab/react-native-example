import { IApproveSmsCodeParams, ISendSmsCodeParams } from 'repositories/Api'

export interface ISmsCodeApproveActions {
  sendSmsCode(data: ISendSmsCodeParams): void
  checkSmsCode(data: Omit<IApproveSmsCodeParams, 'phone'>): void
  changePhone(): void
  resendCode(type: ISendSmsCodeParams['type']): void
  clear(): void
}
