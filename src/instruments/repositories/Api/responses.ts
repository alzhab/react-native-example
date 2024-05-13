import { IFile, IReponsePagination200 } from './base-types'
import {
  IApartmentReponse,
  IApplications,
  IApplicationType,
  INews,
  INotification,
  IServices,
  IServicesCategory,
  IServicesMinInfo,
  ITenant,
  IUser,
  IVoting,
} from './models'

export type IApartmentAddApartmentCreateResponse200 = void

export type IApartmentSendToModerationResponse200 = void

export type IMainApartmentsListResponse200 =
  IReponsePagination200<IApartmentReponse>

export type IMainAuthorizationCreateResponse200 = { token: string; user: IUser }

export type IMainRegistrationCreateResponse200 = { token: string; user: IUser }

export type IMainChangeTempPasswordResponse200 = { token: string; user: IUser }

export type INewsListResponse200 = IReponsePagination200<INews>
export type INewsDetailResponse200 = INews

export type INewsCreateResponse200 = void
export type INewsEditResponse200 = void
export type INewsDeleteResponse200 = void

export type ILogoutResponse200 = void

export type INotificationsListResponse200 = IReponsePagination200<INotification>

export type IMainChangePermissionsDetailResponse200 = any

export type IMainChangePermissionsCreateResponse200 = void

export type IMainChangePermissionsPutResponse200 = void

export type IMainVotingListCreateCreateResponse200 = IVoting

export type IMainServiceDetailListResponse200 = IServices

export type IMainServicesListDetailResponse200 =
  IReponsePagination200<IServicesCategory>

export type IMainHomeServicesListDetailResponse200 = {
  services: IServicesMinInfo[]
}

export type IMainVotingDetailListResponse200 = IVoting

export type IMainVotingDetailUpdateByParamResponse200 = IVoting

export type IMainVotingDetailPartialUpdateByParamResponse200 = IVoting

export type IMainVotingDetailDeleteByParamResponse200 = void

export type IMainVotingListCreateDetailResponse200 =
  IReponsePagination200<IVoting>

export type IMainVotingFileReportDownloadResponse200 = {
  PDF: string
  XLSX: string
}

export type IMainApplicationConfigDetailResponse200 = any

export type IMainApplicationsListDetailResponse200 =
  IReponsePagination200<IApplications>

export type IMainApplicationCreateCreateResponse200 = IApplications

export type IMainApplicationDetailListResponse200 = IApplications

export type IMainApplicationDetailUpdateByParamResponse200 = IApplications

export type IMainApplicationDetailPartialUpdateByParamResponse200 =
  IApplications

export type IMainApplicationDetailDeleteByParamResponse200 = void

export type IMainApplicationFileCreateResponse200 = IFile

export type IMainApplicationFileDeleteResponse200 = void

export type IMainServicesAllListResponse200 = any

export type ITenantCreateResponse200 = {
  tenant: ITenant
  is_new: boolean
  password_trial: string
  data: string
}

export type ITenantsListResponse200 = IReponsePagination200<ITenant>

export type IMainApplicationsConfigResponse200 = IApplicationType[]
export type IProfileDeleteResponse200 = void
export type IProfileEditResponse200 = void
export type IProfileEditPasswordResponse200 = void
export type IDeviceFirebasePOSTResponse200 = void
export type IDeviceFirebaseDELETEResponse200 = void
export type IApproveSmsCodeResponse200 = void
export type IRecoverPasswordResponse200 = void
export type ISendSmsCodeResponse200 = void
