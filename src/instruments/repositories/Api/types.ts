import { ContentType, TRequestData } from 'base/BaseRest'
import { AxiosResponse } from 'axios'
import { IDetailParams, IPaginationParams } from './base-types'
import {
  IApartmentAddApartmentCreateResponse200,
  IApartmentSendToModerationResponse200,
  IApproveSmsCodeResponse200,
  IDeviceFirebaseDELETEResponse200,
  IDeviceFirebasePOSTResponse200,
  ILogoutResponse200,
  IMainApartmentsListResponse200,
  IMainApplicationConfigDetailResponse200,
  IMainApplicationCreateCreateResponse200,
  IMainApplicationDetailDeleteByParamResponse200,
  IMainApplicationDetailListResponse200,
  IMainApplicationDetailPartialUpdateByParamResponse200,
  IMainApplicationDetailUpdateByParamResponse200,
  IMainApplicationFileCreateResponse200,
  IMainApplicationFileDeleteResponse200,
  IMainApplicationsConfigResponse200,
  IMainApplicationsListDetailResponse200,
  IMainAuthorizationCreateResponse200,
  IMainChangePermissionsCreateResponse200,
  IMainChangePermissionsDetailResponse200,
  IMainChangePermissionsPutResponse200,
  IMainChangeTempPasswordResponse200,
  IMainRegistrationCreateResponse200,
  IMainServiceDetailListResponse200,
  IMainServicesListDetailResponse200,
  IMainVotingDetailDeleteByParamResponse200,
  IMainVotingDetailListResponse200,
  IMainVotingDetailPartialUpdateByParamResponse200,
  IMainVotingDetailUpdateByParamResponse200,
  IMainVotingFileReportDownloadResponse200,
  IMainVotingListCreateCreateResponse200,
  IMainVotingListCreateDetailResponse200,
  INewsCreateResponse200,
  INewsDeleteResponse200,
  INewsDetailResponse200,
  INewsEditResponse200,
  INewsListResponse200,
  INotificationsListResponse200,
  IProfileDeleteResponse200,
  IProfileEditPasswordResponse200,
  IProfileEditResponse200,
  IRecoverPasswordResponse200,
  ISendSmsCodeResponse200,
  ITenantCreateResponse200,
  ITenantsListResponse200,
} from './responses'
import {
  IApartmentCreate,
  IApartmentSendToModeration,
  IApplications,
  IApplicationsCreate,
  IApplicationsEdit,
  IApplicationsEditStatus,
  IChangePermissionPutData,
  IChangeTempPassword,
  ITenantCreateData,
  IUser,
  IVoting,
  IVotingCreate,
  IVotingVote,
  IVotingVoteCreate,
} from './models'
import {
  IApproveSmsCodeParams,
  IAuthorizationParams,
  IFirebaseSaveDeleteParams,
  IFirebaseSavePOSTParams,
  IMainApplicationDeleteFileParams,
  IMainApplicationDetailDeleteByParamParams,
  IMainApplicationDetailListParams,
  IMainApplicationDetailPartialUpdateByParamParams,
  IMainApplicationDetailUpdateByParamParams,
  IMainApplicationsListDetailParams,
  IMainServiceDetailListParams,
  IMainVotingDetailDeleteByParamParams,
  IMainVotingDetailListParams,
  IMainVotingDetailPartialUpdateByParamParams,
  IMainVotingDetailUpdateByParamParams,
  IMainVotingListParams,
  INewsCreate,
  INewsListParams,
  INotificationsListParams,
  IProfileEditPasswordParams,
  IRecoverPasswordParams,
  IRegistrationParams,
  ISendSmsCodeParams,
} from './params'
import { IMediaFile } from 'services/MediaPickerService'

export interface IApiRepo {
  getCsrfToken(): Promise<AxiosResponse<{ csrfToken: string }>>
  changeTempPassword(
    data?: TRequestData<IChangeTempPassword>,
  ): Promise<AxiosResponse<IMainChangeTempPasswordResponse200>>
  tenantList(
    data?: TRequestData<{}, IDetailParams & IPaginationParams>,
  ): Promise<AxiosResponse<ITenantsListResponse200>>
  tenantCreate(
    data?: TRequestData<ITenantCreateData>,
  ): Promise<AxiosResponse<ITenantCreateResponse200>>
  tenantDelete(data?: TRequestData<{}, IDetailParams>): Promise<AxiosResponse<void>>
  mainApartmentsList(
    data?: TRequestData<{}, IPaginationParams>,
  ): Promise<AxiosResponse<IMainApartmentsListResponse200>>
  mainApartmentDelete(data?: TRequestData<{}, IDetailParams>): Promise<AxiosResponse<void>>
  mainApplicationsConfig(
    data?: TRequestData,
  ): Promise<AxiosResponse<IMainApplicationsConfigResponse200>>
  mainApplicationsList(
    data?: TRequestData<{}, IMainApplicationsListDetailParams>,
  ): Promise<AxiosResponse<IMainApplicationsListDetailResponse200>>
  mainApplicationConfig(
    data?: TRequestData,
  ): Promise<AxiosResponse<IMainApplicationConfigDetailResponse200>>
  mainApplicationCreate(
    data?: TRequestData<IApplicationsCreate, {}, ContentType.FormData>,
  ): Promise<AxiosResponse<IMainApplicationCreateCreateResponse200>>
  mainApplicationDetail(
    data?: TRequestData<{}, IMainApplicationDetailListParams>,
  ): Promise<AxiosResponse<IMainApplicationDetailListResponse200>>
  mainApplicationPUT(
    data?: TRequestData<
      IApplicationsEdit,
      IMainApplicationDetailUpdateByParamParams,
      ContentType.FormData
    >,
  ): Promise<AxiosResponse<IMainApplicationDetailUpdateByParamResponse200>>
  mainApplicationEditStatus(
    data?: TRequestData<
      IApplicationsEditStatus,
      IMainApplicationDetailUpdateByParamParams,
      ContentType.FormData
    >,
  ): Promise<AxiosResponse<IMainApplicationDetailUpdateByParamResponse200>>
  mainApplicationPATCH(
    data?: TRequestData<IApplications, IMainApplicationDetailPartialUpdateByParamParams>,
  ): Promise<AxiosResponse<IMainApplicationDetailPartialUpdateByParamResponse200>>
  mainApplicationDELETE(
    data?: TRequestData<{}, IMainApplicationDetailDeleteByParamParams>,
  ): Promise<AxiosResponse<IMainApplicationDetailDeleteByParamResponse200>>
  mainApplicationFileCreate(
    data?: TRequestData<{ file: IMediaFile; application: number }, {}, ContentType.FormData>,
  ): Promise<AxiosResponse<IMainApplicationFileCreateResponse200>>
  mainApplicationFileDelete(
    data?: TRequestData<{}, IMainApplicationDeleteFileParams>,
  ): Promise<AxiosResponse<IMainApplicationFileDeleteResponse200>>
  mainChangePermissionsGET(
    data?: TRequestData,
  ): Promise<AxiosResponse<IMainChangePermissionsDetailResponse200>>
  mainChangePermissionsPOST(
    data?: TRequestData,
  ): Promise<AxiosResponse<IMainChangePermissionsCreateResponse200>>
  mainChangePermissionsPUT(
    data?: TRequestData<IChangePermissionPutData, IDetailParams>,
  ): Promise<AxiosResponse<IMainChangePermissionsPutResponse200>>
  mainServiceDetail(
    data?: TRequestData<{}, IMainServiceDetailListParams>,
  ): Promise<AxiosResponse<IMainServiceDetailListResponse200>>
  mainServicesList(data?: TRequestData): Promise<AxiosResponse<IMainServicesListDetailResponse200>>
  apartmentAddApartment(
    data?: TRequestData<IApartmentCreate>,
  ): Promise<AxiosResponse<IApartmentAddApartmentCreateResponse200>>
  apartmentSendToModeration(
    data?: TRequestData<IApartmentSendToModeration, {}, ContentType.FormData>,
  ): Promise<AxiosResponse<IApartmentSendToModerationResponse200>>
  mainAuthorization(
    data?: TRequestData<IAuthorizationParams>,
  ): Promise<AxiosResponse<IMainAuthorizationCreateResponse200>>
  mainRegistration(
    data?: TRequestData<IRegistrationParams>,
  ): Promise<AxiosResponse<IMainRegistrationCreateResponse200>>
  logout(data?: TRequestData): Promise<AxiosResponse<ILogoutResponse200>>
  newsList(data?: TRequestData<{}, INewsListParams>): Promise<AxiosResponse<INewsListResponse200>>
  newsDetail(data?: TRequestData<{}, IDetailParams>): Promise<AxiosResponse<INewsDetailResponse200>>
  newsCreate(
    data?: TRequestData<INewsCreate, {}, ContentType.FormData>,
  ): Promise<AxiosResponse<INewsCreateResponse200>>
  newsEdit(
    data?: TRequestData<INewsCreate, IDetailParams, ContentType.FormData>,
  ): Promise<AxiosResponse<INewsEditResponse200>>
  newsDelete(data?: TRequestData<{}, IDetailParams>): Promise<AxiosResponse<INewsDeleteResponse200>>
  notificationsList(
    data?: TRequestData<{}, INotificationsListParams>,
  ): Promise<AxiosResponse<INotificationsListResponse200>>
  profileDelete(data?: TRequestData): Promise<AxiosResponse<IProfileDeleteResponse200>>
  profileEdit(data?: TRequestData<IUser>): Promise<AxiosResponse<IProfileEditResponse200>>
  profileEditPassword(
    data?: TRequestData<IProfileEditPasswordParams>,
  ): Promise<AxiosResponse<IProfileEditPasswordResponse200>>
  deviceFirebasePOST(
    data?: TRequestData<IFirebaseSavePOSTParams>,
  ): Promise<AxiosResponse<IDeviceFirebasePOSTResponse200>>
  deviceFirebaseDELETE(
    data?: TRequestData<{}, IFirebaseSaveDeleteParams>,
  ): Promise<AxiosResponse<IDeviceFirebaseDELETEResponse200>>
  sendSmsCode(
    data?: TRequestData<ISendSmsCodeParams>,
  ): Promise<AxiosResponse<ISendSmsCodeResponse200>>
  approveSmsCode(
    data?: TRequestData<IApproveSmsCodeParams>,
  ): Promise<AxiosResponse<IApproveSmsCodeResponse200>>
  recoverPassword(
    data?: TRequestData<IRecoverPasswordParams>,
  ): Promise<AxiosResponse<IRecoverPasswordResponse200>>

  mainVotingDetail(
    data?: TRequestData<{}, IMainVotingDetailListParams>,
  ): Promise<AxiosResponse<IMainVotingDetailListResponse200>>
  mainVotingCreate(
    data?: TRequestData<IVotingCreate>,
  ): Promise<AxiosResponse<IMainVotingListCreateCreateResponse200>>
  mainVotingPUT(
    data?: TRequestData<IVotingCreate, IMainVotingDetailUpdateByParamParams>,
  ): Promise<AxiosResponse<IMainVotingDetailUpdateByParamResponse200>>
  mainVoteArchive(
    data?: TRequestData<{}, IDetailParams>,
  ): Promise<AxiosResponse<IMainVotingDetailUpdateByParamResponse200>>
  mainVotingDELETE(
    data?: TRequestData<{}, IMainVotingDetailDeleteByParamParams>,
  ): Promise<AxiosResponse<IMainVotingDetailDeleteByParamResponse200>>
  mainVotingListGET(
    data?: TRequestData<{}, IMainVotingListParams>,
  ): Promise<AxiosResponse<IMainVotingListCreateDetailResponse200>>
  mainVotingFileReportDownload(
    data?: TRequestData<{}, IDetailParams>,
  ): Promise<AxiosResponse<IMainVotingFileReportDownloadResponse200>>
  mainVotingFileCreate(
    data?: TRequestData<
      { file: IMediaFile; voting_id: number; type: 'attachment' | 'banner' },
      {},
      ContentType.FormData
    >,
  ): Promise<AxiosResponse<void>>
  mainVotingFileDelete(data?: TRequestData<{}, IDetailParams>): Promise<AxiosResponse<void>>
  newVotingVote(data?: TRequestData<IVotingVoteCreate>): Promise<
    AxiosResponse<{
      vote: IVotingVote
      id: number
    }>
  >
  changeVotingVote(data?: TRequestData<IVotingVoteCreate, IDetailParams>): Promise<
    AxiosResponse<{
      vote: IVotingVote
      id: number
    }>
  >
}
