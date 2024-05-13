import { IDetailParams, IPaginationParams } from './base-types'
import {
  IApplicationsStatusEnum,
  IVotingStatusEnum,
  IVotingTypeEnum,
} from 'repositories/Api/models'
import { IMediaFile } from 'services/MediaPickerService'

export type INewsListParams = IPaginationParams & { house_id: number }

export type INotificationsListParams = IPaginationParams

export type IMainServiceDetailListParams = IDetailParams

export type IMainVotingDetailListParams = IDetailParams

export type IMainVotingDetailUpdateByParamParams = IDetailParams

export type IMainVotingDetailPartialUpdateByParamParams = IDetailParams

export type IMainVotingDetailDeleteByParamParams = IDetailParams

export type IMainVotingListParams = IPaginationParams & {
  house_id?: number
  search?: string
  type?: IVotingTypeEnum
  status?: IVotingStatusEnum
  start_date?: string
  end_date?: string
  ordering?: string
}

export type IMainApplicationsListDetailParams = IPaginationParams & {
  house_id?: number
  search?: string
  type?: string
  category?: string
  status?: IApplicationsStatusEnum
  start_date?: string
  end_date?: string
  ordering?: string
  affiliation_application?: 'own' | 'tenants' | 'owners'
}

export type IMainApplicationDetailListParams = IDetailParams

export type IMainApplicationDetailUpdateByParamParams = IDetailParams

export type IMainApplicationDetailPartialUpdateByParamParams = IDetailParams

export type IMainApplicationDetailDeleteByParamParams = IDetailParams

export type IMainApplicationDeleteFileParams = IDetailParams

export type IAuthorizationParams = {
  phone: string
  password: string
}

export type IRegistrationParams = {
  phone: string
  password: string
  name: string
  surname: string
  patronymic: string
  iin: string
  code: string
}

export type IProfileEditPasswordParams = {
  old_password: string
  new_password: string
}

export interface INewsCreate {
  user: number
  name: string
  description: string
  apartment_id: number
  image: IMediaFile
}

export interface IFirebaseSavePOSTParams {
  registration_id: string
  device_id: string
  type: 'ios' | 'android'
}

export interface IFirebaseSaveDeleteParams {
  registration_id: string
}

export interface ISendSmsCodeParams {
  phone: string
  type: 'registration_' | 'recovery_' | 'reset_'
}

export interface IApproveSmsCodeParams {
  phone: string
  code: string
  type: ISendSmsCodeParams['type']
}

export interface IRecoverPasswordParams {
  new_password: string
  phone: string
  code: string
}
