import { IApartmentCreate, IUser } from 'repositories/Api/models'

export interface IAuthenticationStore {
  isAuthorized: boolean
  setIsAuthorized(val: boolean): void

  isPlugModalOpen: boolean
  setIsPlugModalOpen(val: boolean): void

  token: string
  setToken(val: string): void

  action: null | (() => void)
  setAction(val: null | (() => void)): void

  showPasswordConfirm: boolean
  setShowPasswordConfirm(val: IAuthenticationStore['showPasswordConfirm']): void

  isHydrated: boolean
}

export interface IRegistrationStore {
  step: ERegistrationSteps
  setStep(step: ERegistrationSteps): void

  data: IRegistrationData
  setRegistrationData(data: IRegistrationData): void
  addRegistrationData(data: Partial<IRegistrationData>): void
  clearRegistrationData(): void

  isHydrated: boolean
}

export enum ERegistrationSteps {
  ENTER = 1,
  IIN = 2,
  APARTS = 3,
  ROLE = 4,
}

export interface IRegistrationData {
  iin: string
  name: string
  surname: string
  patronymic: string
  phone: string
  password: string
  code: string

  apartmentData: IApartmentCreate
}

export interface IChangeTempPasswordStore {
  needToShow: boolean
  setNeedToShow(val: boolean): void

  step: EChangeTempPasswordSteps
  setStep(step: EChangeTempPasswordSteps): void

  data: IChangeTempPasswordData
  setChangeTempPasswordData(data: IChangeTempPasswordData): void
  addChangeTempPasswordData(data: Partial<IChangeTempPasswordData>): void
  clearChangeTempPasswordData(): void

  isHydrated: boolean
}

export enum EChangeTempPasswordSteps {
  ENTER = 1,
  PASSWORD = 2,
  FULL_NAME = 3,
}

export interface IChangeTempPasswordData {
  name: string
  surname: string
  patronymic: string
  temp_password: string
  new_password: string
}
