export interface ISmsCodeApproveStore {
  loading: boolean
  setLoading(val: ISmsCodeApproveStore['loading']): void

  state: ESmsCodeApproveState
  setState(val: ISmsCodeApproveStore['state']): void

  phone: string
  setPhone(val: ISmsCodeApproveStore['phone']): void

  code: string
  setCode(val: ISmsCodeApproveStore['code']): void

  isCodeInvalid: boolean
  setIsCodeInvalid(val: ISmsCodeApproveStore['isCodeInvalid']): void

  phoneError: string
  setPhoneError(val: ISmsCodeApproveStore['phoneError']): void

  time: number
  setTime(val: ISmsCodeApproveStore['time']): void

  clear(): void
}

export enum ESmsCodeApproveState {
  phone = 'phone',
  code = 'code',
  approved = 'approved',
}
