import { IMediaFile } from 'services/MediaPickerService'
import { IFile } from './base-types'

export interface IUser {
  id: number
  email: string
  phone: string
  name: string
  surname: string
  patronymic: string
  iin: string
  password_trial?: string
  is_trial: boolean
}

export interface IApartmentAdapter {
  id: number
  house: IHouse
  flat: string
  can_work_applications: boolean
  can_work_votes: boolean
  type_user: IUserTypeEnum
  is_osi: boolean
  tenant_status: ITenantStatus
  owner_status: IOwnerStatus
  floor: number
  entrance: string
}

export interface IApartmentReponse {
  id: number
  house: IHouse
  user: {
    [key in IUserTypeEnum]?: [
      { can_work_applications: boolean },
      { can_work_votes: boolean },
      { is_osi: boolean },
    ]
  }
  flat: string
  status: ITenantStatus
  floor: number
  entrance: string
  is_moderation: boolean
  is_confirmation: boolean
}

export interface IHouse {
  id: number
  id_object: string
  region_city: string
  street: string
  house: string
  body: string
  block: string
  management_company: {
    id: string
    user: IUser
    name: string
    address: string
  }
}

export interface IApartmentCreate {
  house: Omit<IHouse, 'id' | 'management_company'>
  flat: IApartmentAdapter['flat']
  type_user: IUserTypeEnum
  floor: number
  entrance: string
}

export interface IApartmentSendToModeration {
  file: IMediaFile
  user: IUser['id']
  apartment: IApartmentReponse['id']
}

export enum IUserTypeEnum {
  Owner = 'owner',
  Tenant = 'tenant',
}

export const UserTypeTitle: { [key in IUserTypeEnum]: string } = {
  [IUserTypeEnum.Owner]: 'Владелец',
  [IUserTypeEnum.Tenant]: 'Житель',
}

export interface INews {
  id: number
  name: string
  description: string
  image: string
  house_id: number
  apartment: IApartmentReponse
  date: string
  can_edit: boolean
}
export interface IServices {
  name_service: string
  image_logo?: string
  description: string
  link: string
  link_text: string
  image_service?: {
    id?: number
    image?: string
  }[]
}
export interface INotification {
  id: number
  title: string
  text: string
  date: string
  image_url: string

  user: number
  unread: boolean
}
export interface IVoting {
  id: number
  name: string
  option: string
  description: string
  status?: IVotingStatusEnum
  type: IVotingTypeEnum
  start_date?: string
  end_date?: string
  user: number
  apartment: IApartmentReponse
  voting_file_request: IVotingFileRequest[]
  voting_file_report: IVotingFileReport[]
  can_edit: boolean
  your_vote: {
    vote: IVotingVote
    id: number
  }
  data_vote: {
    agree: {
      amount: number
      percent: number
    }
    against: {
      amount: number
      percent: number
    }
    forgo: {
      amount: number
      percent: number
    }
    appearance: {
      amount: number
      percent: number
    }
  }
}
export interface ITenant {
  id: number
  user: IUser
  status: ITenantStatus
  apartment: IApartmentAdapter
  can_work_applications: boolean
  can_work_votes: boolean
  data: string
}

export enum ITenantStatus {
  NotApproved = 'Неподтвержденный',
  Approved = 'Подтверждённый',
}

export enum IOwnerStatus {
  NotApproved = 'Неподтвержденный',
  Approved = 'Подтверждённый',
  Moderation = 'На модерации',
}

export interface IServicesMinInfo {
  id?: number
  name_service: string
  image_logo?: string
}
export interface IServicesCategory {
  name_category: string
  image_category?: string
  services: IServicesMinInfo[]
}
export type IVotingFileRequest = IFile & { voting: number; type: 'banner' | 'attachment' }
export type IVotingFileReport = { id: number; voting: number; file_xlsx: string; file_pdf: string }
export interface IVotingCreate {
  name: string
  description: string
  type: IVotingTypeEnum
  user: IUser['id']
  apartment: IApartmentReponse['id']
  end_date: string
  option: string
}

export interface IVotingVoteCreate {
  user: IUser['id']
  apartment: IApartmentReponse['id']
  voting: IVoting['id']
  vote: IVotingVote
}

export interface IChangePermissionPutData {
  status?: ITenantStatus
  can_work_applications?: boolean
  can_work_votes?: boolean
}
export enum IVotingStatusEnum {
  Active = 'Актив',
  Archive = 'Архив',
  Finished = 'Завершено',
}
export enum IVotingTypeEnum {
  Household = 'Общедомовое',
  Entrance = 'По подъезду',
  Floor = 'По этажу',
  Registration = 'Регистрация членов ОСИ',
}
export enum IVotingVote {
  agree = 'За',
  against = 'Против',
  forgo = 'Воздержался',
}
export type IApplicationFile = IFile & {
  application: number
}
export interface IApplications {
  id: number
  date: string
  type: IApplicationType
  category: IApplicationCategory
  place: string
  phone: string
  description: string
  application_file: IApplicationFile[]
  status?: IApplicationsStatusEnum
  application_status_history?: { status: string; date_tile: string; comment: string }[]
  can_edit: boolean
  apartment: IApartmentReponse
  executor_phone: string
  executor: number
}
export interface IApplicationsCreate {
  type: number
  category: number
  place: string
  phone: string
  description: string
  files: IMediaFile[]
  apartment: number
}

export interface IApplicationsEdit {
  type: number
  category: number
  place: string
  phone: string
  description: string
  apartment: number
}

export interface IApplicationsEditStatus {
  status: IApplications['status']
  type: number
  category: number
  apartment: number
  executor: IApplications['executor']
}

export type ITenantCreateData = {
  user: {
    phone: string
  }
  apartment: IApartmentAdapter['id']
}
export enum IApplicationsStatusEnum {
  Open = 'Открыта',
  EmployeeAssigned = 'Назначен исполнитель',
  Enabled = 'В работе',
  Entered = 'Выполнена',
  AcceptedByCustomer = 'Принята заказчиком',
  Cancelled = 'Отменена',
}

export const ApplicationStatusColors = {
  [IApplicationsStatusEnum.Open]: { circle: '#fff', bg: '#708ED7' },
  [IApplicationsStatusEnum.EmployeeAssigned]: { circle: '#FFA87C', bg: '#FFA87C' },
  [IApplicationsStatusEnum.Enabled]: { circle: '#6FC46F', bg: '#6FC46F' },
  [IApplicationsStatusEnum.Entered]: { circle: '#8F69E0', bg: '#8F69E0' },
  [IApplicationsStatusEnum.AcceptedByCustomer]: { circle: '#009FB5', bg: '#009FB5' },
  [IApplicationsStatusEnum.Cancelled]: { circle: '#C14444', bg: '#C14444' },
}

export const ApplicationStatusShortNames = {
  [IApplicationsStatusEnum.Open]: 'Открыта',
  [IApplicationsStatusEnum.EmployeeAssigned]: 'Назначен',
  [IApplicationsStatusEnum.Enabled]: 'В работе',
  [IApplicationsStatusEnum.Entered]: 'Выполнена',
  [IApplicationsStatusEnum.AcceptedByCustomer]: 'Принята',
  [IApplicationsStatusEnum.Cancelled]: 'Отменена',
}

export const DEFAULT_APARTMENT: IApartmentAdapter = {
  id: 0,
  house: {
    id: 0,
    id_object: '',
    region_city: '',
    street: '',
    house: '',
    body: '',
    block: '',
  } as any,
  flat: '',
  can_work_applications: false,
  can_work_votes: false,
  type_user: IUserTypeEnum.Tenant,
  tenant_status: ITenantStatus.NotApproved,
  owner_status: IOwnerStatus.NotApproved,
  is_osi: false,
  entrance: '',
  floor: 0,
}

export const DEFAULT_APARTMENT_CREATE: IApartmentCreate = {
  house: {
    id: 0,
    id_object: '',
    region_city: '',
    street: '',
    house: '',
    body: '',
    block: '',
  } as any,
  flat: '',
  type_user: IUserTypeEnum.Tenant,
  floor: 0,
  entrance: '',
}

export interface IApplicationCategory {
  id: number
  name: string
}
export interface IApplicationType {
  id: number
  name: string
  category: IApplicationCategory[]
}

export interface IChangeTempPassword {
  temp_password: string
  new_password: string
  name: string
  surname: string
  patronymic: string
}
