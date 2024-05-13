import { IChangeTempPasswordData, IRegistrationData } from '../store'
import { IApartmentsStore } from 'blms/ApartmentsBlm/store'
import { IUserTypeEnum } from 'repositories/Api'

export interface IPlugActions {
  close(): void
  checkAuthAction(call: () => void): void
}

export interface IAuthorizationActions {
  clear(): void
  authorizeSubmit(data: IAuthorizationData): void
}

export interface IAuthorizationData {
  phone: string
  password: string
  code?: string
}

export interface ILogoutActions {
  logout(): Promise<void>
  clear(): Promise<void>
}

export interface IRegistrationActions {
  onStart(data: Pick<IRegistrationData, 'phone' | 'password'>): void
  submitEnter(): void
  checkIin(data: Pick<IRegistrationData, 'name' | 'surname' | 'patronymic'>): void
  submitIin(data: Pick<IRegistrationData, 'name' | 'surname' | 'patronymic'>): void
  submitAparts(data: IApartmentsStore['createData']): void
  submitRole(data: IUserTypeEnum): void
  clear(): void
  afterRegistration(): void
}

export interface IChangeTempPasswordActions {
  onStart(data: Pick<IChangeTempPasswordData, 'temp_password'>): void
  submitEnter(): void
  submitFullname(data: Pick<IChangeTempPasswordData, 'name' | 'surname' | 'patronymic'>): void
  submitPassword(data: Pick<IChangeTempPasswordData, 'new_password'>): void
  clear(): void
  afterChangeTempPassword(): void
}
