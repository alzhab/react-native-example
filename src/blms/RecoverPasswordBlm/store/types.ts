export interface IRecoverPasswordStore {
  showRecoverModal: boolean
  setShowRecoverModal(val: IRecoverPasswordStore['showRecoverModal']): void

  code: string
  setCode(val: IRecoverPasswordStore['code']): void

  phone: string
  setPhone(val: IRecoverPasswordStore['phone']): void
}
