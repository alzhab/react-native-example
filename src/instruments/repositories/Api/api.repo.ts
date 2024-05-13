import { BaseRest, ContentType, TRequestData } from 'base/BaseRest'
import { AxiosResponse } from 'axios'
import { injectable } from 'inversify'
import { IApiRepo } from './types'
import { IDetailParams, IPaginationParams } from 'repositories/Api/base-types'
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
  IVotingStatusEnum,
  IVotingVote,
  IVotingVoteCreate,
} from './models'
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
  IApproveSmsCodeParams,
  IAuthorizationParams,
  IFirebaseSaveDeleteParams,
  IFirebaseSavePOSTParams,
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
} from 'repositories/Api/params'
import { IMediaFile } from 'services/MediaPickerService'

export const ApiRepoId = Symbol.for('ApiRepo')

@injectable()
export class ApiRepo extends BaseRest implements IApiRepo {
  changeTempPassword(
    data?: TRequestData<IChangeTempPassword>,
  ): Promise<AxiosResponse<IMainChangeTempPasswordResponse200>> {
    return this.request<IMainChangeTempPasswordResponse200>({
      path: '/main/change-temp-password',
      method: 'POST',
      isMock: true,
      ...(data || {}),
    })
  }

  mainApplicationsConfig(
    data?: TRequestData,
  ): Promise<AxiosResponse<IMainApplicationsConfigResponse200>> {
    return this.request<IMainApplicationsConfigResponse200>({
      path: '/main/application-config',
      method: 'GET',
      isMock: false,
      ...(data || {}),
    })
  }

  getCsrfToken(): Promise<AxiosResponse<{ csrfToken: string }>> {
    return this.request<{ csrfToken: string }>({
      path: '/main/get-csrf-token/',
      method: 'GET',
    })
  }

  tenantCreate(
    data?: TRequestData<ITenantCreateData>,
  ): Promise<AxiosResponse<ITenantCreateResponse200>> {
    return this.request<ITenantCreateResponse200>({
      path: '/owner/tenant-create',
      method: 'POST',
      ...(data || {}),
    })
  }

  tenantDelete(data?: TRequestData<{}, IDetailParams>): Promise<AxiosResponse<void>> {
    return this.request<void>({
      path: `/owner/tenant-remove/${data?.query?.id}`,
      method: 'DELETE',
      ...(data || {}),
    })
  }

  tenantList(
    data?: TRequestData<{}, IDetailParams & IPaginationParams>,
  ): Promise<AxiosResponse<ITenantsListResponse200>> {
    return this.request<ITenantsListResponse200>({
      path: `/owner/apartment-tenants/${data?.query?.id}`,
      method: 'GET',
      ...(data || {}),
    })
  }

  mainApartmentsList(
    data?: TRequestData<{}, IPaginationParams>,
  ): Promise<AxiosResponse<IMainApartmentsListResponse200>> {
    return this.request<IMainApartmentsListResponse200>({
      path: '/apartment/my-apartments',
      method: 'GET',
      isMock: false,
      ...(data || {}),
    })
  }

  mainApartmentDelete(data?: TRequestData<{}, IDetailParams>): Promise<AxiosResponse<void>> {
    return this.request<void>({
      path: `/apartment/remove-apartment/${data?.query?.id}`,
      method: 'GET',
      ...(data || {}),
    })
  }

  mainApplicationsList(
    data?: TRequestData<{}, IMainApplicationsListDetailParams>,
  ): Promise<AxiosResponse<IMainApplicationsListDetailResponse200>> {
    return this.request<IMainApplicationsListDetailResponse200>({
      path: '/main/application-list',
      method: 'GET',
      ...(data || {}),
    })
  }
  mainApplicationConfig(
    data?: TRequestData,
  ): Promise<AxiosResponse<IMainApplicationConfigDetailResponse200>> {
    return this.request<IMainApplicationConfigDetailResponse200>({
      path: '/main/application-config',
      method: 'GET',
      ...(data || {}),
    })
  }
  mainApplicationCreate(
    data?: TRequestData<IApplicationsCreate, {}, ContentType.FormData>,
  ): Promise<AxiosResponse<IMainApplicationCreateCreateResponse200>> {
    return this.request<IMainApplicationCreateCreateResponse200>({
      path: '/main/application-create/',
      method: 'POST',
      ...(data || {}),
    })
  }

  mainApplicationFileCreate(
    data?: TRequestData<{ file: IMediaFile; application: number }, {}, ContentType.FormData>,
  ): Promise<AxiosResponse<IMainApplicationFileCreateResponse200>> {
    return this.request<IMainApplicationFileCreateResponse200>({
      path: '/main/application-file-create/',
      method: 'POST',
      ...(data || {}),
    })
  }

  mainApplicationFileDelete(
    data?: TRequestData<{}, IMainApplicationDetailDeleteByParamParams>,
  ): Promise<AxiosResponse<IMainApplicationFileDeleteResponse200>> {
    return this.request<IMainApplicationFileDeleteResponse200>({
      path: `/main/application-file-work/${data?.query?.id}/`,
      method: 'DELETE',
      ...(data || {}),
    })
  }

  mainApplicationDetail(
    data?: TRequestData<{}, IMainApplicationDetailListParams>,
  ): Promise<AxiosResponse<IMainApplicationDetailListResponse200>> {
    return this.request<IMainApplicationDetailListResponse200>({
      path: `/main/application-detail/${data?.query?.id}/`,
      method: 'GET',
      ...(data || {}),
    })
  }
  mainApplicationPUT(
    data?: TRequestData<
      IApplicationsEdit,
      IMainApplicationDetailUpdateByParamParams,
      ContentType.FormData
    >,
  ): Promise<AxiosResponse<IMainApplicationDetailUpdateByParamResponse200>> {
    return this.request<IMainApplicationDetailUpdateByParamResponse200>({
      path: `/main/application-detail/${data?.query?.id}/`,
      method: 'PUT',
      body: data?.body,
      type: data?.type,
      query: {},
    })
  }
  mainApplicationEditStatus(
    data?: TRequestData<
      IApplicationsEditStatus,
      IMainApplicationDetailUpdateByParamParams,
      ContentType.FormData
    >,
  ): Promise<AxiosResponse<IMainApplicationDetailUpdateByParamResponse200>> {
    return this.request<IMainApplicationDetailUpdateByParamResponse200>({
      path: `/main/application-detail/${data?.query?.id}/`,
      method: 'PUT',
      ...(data || {}),
    })
  }
  mainApplicationPATCH(
    data?: TRequestData<IApplications, IMainApplicationDetailPartialUpdateByParamParams>,
  ): Promise<AxiosResponse<IMainApplicationDetailPartialUpdateByParamResponse200>> {
    return this.request<IMainApplicationDetailPartialUpdateByParamResponse200>({
      path: `/main/application-detail/${data?.query?.id}/`,
      method: 'PATCH',
      ...(data || {}),
    })
  }
  mainApplicationDELETE(
    data?: TRequestData<{}, IMainApplicationDetailDeleteByParamParams>,
  ): Promise<AxiosResponse<IMainApplicationDetailDeleteByParamResponse200>> {
    return this.request<IMainApplicationDetailDeleteByParamResponse200>({
      path: `/main/application-detail/${data?.query?.id}/`,
      method: 'DELETE',
      ...(data || {}),
    })
  }
  mainChangePermissionsGET(
    data?: TRequestData,
  ): Promise<AxiosResponse<IMainChangePermissionsDetailResponse200>> {
    return this.request<IMainChangePermissionsDetailResponse200>({
      path: '/main/change-permissions/',
      method: 'GET',
      ...(data || {}),
    })
  }
  mainChangePermissionsPOST(
    data?: TRequestData,
  ): Promise<AxiosResponse<IMainChangePermissionsCreateResponse200>> {
    return this.request<IMainChangePermissionsCreateResponse200>({
      path: '/main/change-permissions/',
      method: 'POST',
      ...(data || {}),
    })
  }

  mainChangePermissionsPUT(
    data?: TRequestData<IChangePermissionPutData, IDetailParams>,
  ): Promise<AxiosResponse<IMainChangePermissionsPutResponse200>> {
    return this.request<IMainChangePermissionsCreateResponse200>({
      path: `/owner/tenant-change-permissions/${data?.query?.id}`,
      method: 'PUT',
      ...(data || {}),
    })
  }

  mainServiceDetail(
    data?: TRequestData<{}, IMainServiceDetailListParams>,
  ): Promise<AxiosResponse<IMainServiceDetailListResponse200>> {
    return this.request<IMainServiceDetailListResponse200>({
      path: `/main/service-detail/${data?.query?.id}/`,
      method: 'GET',
      ...(data || {}),
    })
  }
  mainServicesList(
    data?: TRequestData,
  ): Promise<AxiosResponse<IMainServicesListDetailResponse200>> {
    return this.request<IMainServicesListDetailResponse200>({
      path: '/main/services-list/',
      method: 'GET',
      ...(data || {}),
    })
  }
  apartmentAddApartment(
    data?: TRequestData<IApartmentCreate>,
  ): Promise<AxiosResponse<IApartmentAddApartmentCreateResponse200>> {
    return this.request<IApartmentAddApartmentCreateResponse200>({
      path: '/apartment/add-apartment/',
      method: 'POST',
      ...(data || {}),
    })
  }
  apartmentSendToModeration(
    data?: TRequestData<IApartmentSendToModeration, {}, ContentType.FormData>,
  ): Promise<AxiosResponse<IApartmentSendToModerationResponse200>> {
    return this.request<IApartmentSendToModerationResponse200>({
      path: '/owner/new-confirming-document/',
      method: 'POST',
      ...(data || {}),
    })
  }
  mainAuthorization(
    data?: TRequestData<IAuthorizationParams>,
  ): Promise<AxiosResponse<IMainAuthorizationCreateResponse200>> {
    return this.request<IMainAuthorizationCreateResponse200>({
      path: '/main/authorization/',
      method: 'POST',
      ...(data || {}),
    })
  }
  mainRegistration(
    data?: TRequestData<IRegistrationParams>,
  ): Promise<AxiosResponse<IMainRegistrationCreateResponse200>> {
    return this.request<IMainRegistrationCreateResponse200>({
      path: '/main/registration/',
      method: 'POST',
      ...(data || {}),
    })
  }
  logout(data?: TRequestData): Promise<AxiosResponse<ILogoutResponse200>> {
    return this.request<ILogoutResponse200>({
      path: '/api-auth/logout/',
      method: 'GET',
      ...(data || {}),
    })
  }
  notificationsList(
    data?: TRequestData<{}, INotificationsListParams>,
  ): Promise<AxiosResponse<INotificationsListResponse200>> {
    return this.request<INotificationsListResponse200>({
      path: '/main/notification-list',
      method: 'GET',
      ...(data || {}),
    })
  }

  profileDelete(data?: TRequestData): Promise<AxiosResponse<IProfileDeleteResponse200>> {
    return this.request<IProfileDeleteResponse200>({
      path: '/main/remove-account',
      method: 'GET',
      ...(data || {}),
    })
  }

  profileEdit(data?: TRequestData<IUser>): Promise<AxiosResponse<IProfileEditResponse200>> {
    return this.request<IProfileDeleteResponse200>({
      path: '/main/change-personal-info/',
      method: 'PUT',
      ...(data || {}),
    })
  }

  profileEditPassword(
    data?: TRequestData<IProfileEditPasswordParams>,
  ): Promise<AxiosResponse<IProfileEditPasswordResponse200>> {
    return this.request<IProfileDeleteResponse200>({
      path: '/main/reset-login-password/',
      method: 'POST',
      ...(data || {}),
    })
  }

  deviceFirebaseDELETE(
    data?: TRequestData<{}, IFirebaseSaveDeleteParams>,
  ): Promise<AxiosResponse<IDeviceFirebaseDELETEResponse200>> {
    return this.request<IDeviceFirebaseDELETEResponse200>({
      path: `/devices-firebase/${data?.query?.registration_id}/`,
      method: 'DELETE',
      ...(data || {}),
    })
  }

  deviceFirebasePOST(
    data?: TRequestData<IFirebaseSavePOSTParams>,
  ): Promise<AxiosResponse<IDeviceFirebasePOSTResponse200>> {
    return this.request<IDeviceFirebasePOSTResponse200>({
      path: '/devices-firebase/',
      method: 'POST',
      ...(data || {}),
    })
  }

  approveSmsCode(
    data?: TRequestData<IApproveSmsCodeParams>,
  ): Promise<AxiosResponse<IApproveSmsCodeResponse200>> {
    return this.request<IApproveSmsCodeResponse200>({
      path: '/main/authorization-sms/',
      method: 'POST',
      ...(data || {}),
    })
  }

  sendSmsCode(
    data?: TRequestData<ISendSmsCodeParams>,
  ): Promise<AxiosResponse<ISendSmsCodeResponse200>> {
    return this.request<ISendSmsCodeResponse200>({
      path: '/main/send-sms/',
      method: 'POST',
      ...(data || {}),
    })
  }

  recoverPassword(
    data?: TRequestData<IRecoverPasswordParams>,
  ): Promise<AxiosResponse<IRecoverPasswordResponse200>> {
    return this.request<IRecoverPasswordResponse200>({
      path: '/main/reset-password-sms/',
      method: 'POST',
      ...(data || {}),
    })
  }

  newsList(data?: TRequestData<{}, INewsListParams>): Promise<AxiosResponse<INewsListResponse200>> {
    return this.request<INewsListResponse200>({
      path: '/main/news-list',
      method: 'GET',
      isMock: false,
      ...(data || {}),
    })
  }

  newsCreate(
    data?: TRequestData<INewsCreate, {}, ContentType.FormData>,
  ): Promise<AxiosResponse<INewsCreateResponse200>> {
    return this.request<INewsCreateResponse200>({
      path: '/owner/news-create/',
      method: 'POST',
      isMock: false,
      ...(data || {}),
    })
  }
  newsDelete(
    data?: TRequestData<{}, IDetailParams>,
  ): Promise<AxiosResponse<INewsDeleteResponse200>> {
    return this.request<INewsDeleteResponse200>({
      path: `/owner/news-work/${data?.query?.id}/`,
      method: 'DELETE',
      ...(data || {}),
    })
  }

  newsDetail(
    data?: TRequestData<{}, IDetailParams>,
  ): Promise<AxiosResponse<INewsDetailResponse200>> {
    return this.request<INewsDetailResponse200>({
      path: `/main/news-item/${data?.query?.id}`,
      method: 'GET',
      ...(data || {}),
    })
  }

  newsEdit(
    data?: TRequestData<INewsCreate, IDetailParams, ContentType.FormData>,
  ): Promise<AxiosResponse<INewsEditResponse200>> {
    return this.request<INewsEditResponse200>({
      path: `/owner/news-work/${data?.query?.id}/`,
      method: 'PUT',
      ...(data || {}),
    })
  }
  mainVotingDetail(
    data?: TRequestData<{}, IMainVotingDetailListParams>,
  ): Promise<AxiosResponse<IMainVotingDetailListResponse200>> {
    return this.request<IMainVotingDetailListResponse200>({
      path: `/main/voting-detail/${data?.query?.id}/`,
      method: 'GET',
      ...(data || {}),
    })
  }
  mainVotingPUT(
    data?: TRequestData<IVotingCreate, IMainVotingDetailUpdateByParamParams>,
  ): Promise<AxiosResponse<IMainVotingDetailUpdateByParamResponse200>> {
    return this.request<IMainVotingDetailUpdateByParamResponse200>({
      path: `/main/voting-detail/${data?.query?.id}/`,
      method: 'PUT',
      ...(data || {}),
    })
  }

  mainVoteArchive(
    data?: TRequestData<{}, IDetailParams>,
  ): Promise<AxiosResponse<IMainVotingDetailUpdateByParamResponse200>> {
    return this.request<IMainVotingDetailUpdateByParamResponse200>({
      path: `/main/voting-detail/${data?.query?.id}/`,
      method: 'PATCH',
      body: { status: IVotingStatusEnum.Archive },
      ...(data || {}),
    })
  }

  mainVotingDELETE(
    data?: TRequestData<{}, IMainVotingDetailDeleteByParamParams>,
  ): Promise<AxiosResponse<IMainVotingDetailDeleteByParamResponse200>> {
    return this.request<IMainVotingDetailDeleteByParamResponse200>({
      path: `/main/voting-detail/${data?.query?.id}/`,
      method: 'DELETE',
      ...(data || {}),
    })
  }
  mainVotingListGET(
    data?: TRequestData<{}, IMainVotingListParams>,
  ): Promise<AxiosResponse<IMainVotingListCreateDetailResponse200>> {
    return this.request<IMainVotingListCreateDetailResponse200>({
      path: '/main/voting-list',
      method: 'GET',
      ...(data || {}),
    })
  }
  mainVotingCreate(
    data?: TRequestData<IVotingCreate>,
  ): Promise<AxiosResponse<IMainVotingListCreateCreateResponse200>> {
    return this.request<IMainVotingListCreateCreateResponse200>({
      path: '/main/voting-create/',
      method: 'POST',
      ...(data || {}),
    })
  }

  mainVotingFileCreate(
    data?: TRequestData<
      {
        file: IMediaFile
        voting_id: number
      },
      {},
      ContentType.FormData
    >,
  ): Promise<AxiosResponse<void>> {
    return this.request({
      path: '/main/create-voting-file/',
      method: 'POST',
      ...(data || {}),
    })
  }

  mainVotingFileDelete(data?: TRequestData<{}, IDetailParams>): Promise<AxiosResponse<void>> {
    return this.request({
      path: `/main/work-voting-file/${data?.query?.id}`,
      method: 'DELETE',
      ...(data || {}),
    })
  }

  mainVotingFileReportDownload(
    data?: TRequestData<{}, IDetailParams>,
  ): Promise<AxiosResponse<IMainVotingFileReportDownloadResponse200>> {
    return this.request({
      path: `/main/voting-file-report-download/${data?.query?.id}`,
      method: 'GET',
      ...(data || {}),
    })
  }

  newVotingVote(data?: TRequestData<IVotingVoteCreate>): Promise<
    AxiosResponse<{
      vote: IVotingVote
      id: number
    }>
  > {
    return this.request({
      path: '/main/new-voting-vote/',
      method: 'POST',
      ...(data || {}),
    })
  }

  changeVotingVote(data?: TRequestData<IVotingVoteCreate, IDetailParams>): Promise<
    AxiosResponse<{
      vote: IVotingVote
      id: number
    }>
  > {
    return this.request({
      path: `/main/change-voting-vote/${data?.query?.id}/`,
      method: 'PUT',
      ...(data || {}),
    })
  }
}
