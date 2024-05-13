import { inject, injectable } from 'inversify'
import { IApartmentsListActions } from './types'
import {
  ApiRepoId,
  IApartmentAdapter,
  IApartmentReponse,
  IApiRepo,
  IOwnerStatus,
  ITenantStatus,
  IUserTypeEnum,
} from 'repositories/Api'
import { ApartmentsStoreId, IApartmentsStore } from 'blms/ApartmentsBlm/store'
import { INavigationService, NavigationServiceId } from '@corrbo/module-navigation/services'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'
import { ContentType } from 'base/BaseRest'
import { IMediaFile } from 'services/MediaPickerService'
import Toast from 'react-native-toast-message'
import { IProfileStore, ProfileStoreId } from 'blms/ProfileBlm/store'

export const ApartmentsListActionsId = Symbol.for('ApartmentsListActions')

@injectable()
export class ApartmentsListActions implements IApartmentsListActions {
  constructor(
    @inject(ApartmentsStoreId) private apartmentsStore: IApartmentsStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
    @inject(NavigationServiceId) private navigationService: INavigationService,
    @inject(ProfileStoreId) private profileStore: IProfileStore,
  ) {}

  clearListStart(): void {
    this.apartmentsStore.setListStartLoading(true)
    this.apartmentsStore.setListPage(1)
  }

  openApproveScreen(val: IApartmentsStore['apartmentDetail']): void {
    this.apartmentsStore.setApartmentDetail(val)
    this.navigationService.navigate('ApartmentApproveScreen' as any)
  }

  sendDocumentToModeration(val: IMediaFile): void {
    if (this.apartmentsStore.apartmentDetail?.id) {
      EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
      this.apiRepo
        .apartmentSendToModeration({
          type: ContentType.FormData,
          body: {
            file: val,
            apartment: this.apartmentsStore.apartmentDetail?.id,
            user: this.profileStore.profile?.id || 0,
          },
        })
        .then(() => {
          this.reloadList()
          Toast.show({ type: 'success', text1: 'Файл отправлен на модерацию' })
          this.navigationService.goBack()
        })
        .finally(() => EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING }))
    }
  }

  apartmentResponseAdapter(apartment: IApartmentReponse): IApartmentAdapter {
    const type_user: IUserTypeEnum = Object.keys(apartment.user)[0] as IUserTypeEnum
    const permissions = Array.isArray(apartment.user[type_user]) ? apartment.user[type_user] : []
    const tenant_status = apartment.status

    const owner_status = apartment.is_confirmation
      ? IOwnerStatus.Approved
      : apartment.is_moderation
      ? IOwnerStatus.Moderation
      : IOwnerStatus.NotApproved

    // @ts-ignore
    const { can_work_applications, can_work_votes, is_osi } = (permissions || []).reduce(
      (
        prev: { can_work_applications: boolean; can_work_votes: boolean; is_osi: boolean },
        currentValue: any,
      ) => {
        if (Object.keys(currentValue).includes('can_work_applications')) {
          prev.can_work_applications = currentValue.can_work_applications
        } else if (Object.keys(currentValue).includes('can_work_votes')) {
          prev.can_work_votes = currentValue.can_work_votes
        } else if (Object.keys(currentValue).includes('is_osi')) {
          prev.is_osi = currentValue.is_osi
        }

        return prev
      },
      { can_work_applications: false, can_work_votes: false, is_osi: false },
    )

    return {
      ...apartment,
      can_work_applications,
      can_work_votes,
      is_osi,
      tenant_status,
      owner_status,
      type_user,
    }
  }

  getResults(res: IApartmentReponse[]) {
    const results = res.map(this.apartmentResponseAdapter)
    const choosedApartmentId = this.apartmentsStore.choosedApartment.id
    const filteredResults = results.filter(item =>
      item.type_user === IUserTypeEnum.Tenant
        ? item.tenant_status === ITenantStatus.Approved
        : item.owner_status === IOwnerStatus.Approved,
    )

    const choosedApartment: IApartmentAdapter | undefined = choosedApartmentId
      ? filteredResults.find(item => choosedApartmentId === item.id) || filteredResults[0]
      : filteredResults[0]

    if (choosedApartment) {
      this.chooseApartment(choosedApartment)
    }

    return results
  }

  getListStart(): Promise<void> {
    return this.apiRepo
      .mainApartmentsList({
        query: {
          page: this.apartmentsStore.listPage,
          page_size: 100,
        },
      })
      .then(res => {
        this.apartmentsStore.setListMaxCount(res.data.count)
        const results = this.getResults(res.data.results)
        this.apartmentsStore.setList(results)
      })
      .finally(() => this.apartmentsStore.setListStartLoading(false))
  }

  clearChoosedApartment() {
    this.apartmentsStore.clearChoosedApartment()
  }

  loadListMore(): void {
    if (
      this.apartmentsStore.list.length &&
      this.apartmentsStore.listMaxCount > this.apartmentsStore.list.length &&
      !this.apartmentsStore.listMoreLoading
    ) {
      this.apartmentsStore.setListMoreLoading(true)
      this.apiRepo
        .mainApartmentsList({
          query: {
            page: this.apartmentsStore.listPage + 1,
          },
        })
        .then(res => {
          this.apartmentsStore.setListPage(this.apartmentsStore.listPage + 1)
          this.apartmentsStore.setListMaxCount(res.data.count)
          const results = this.getResults(res.data.results)
          this.apartmentsStore.addList(results)
        })
        .finally(() => {
          this.apartmentsStore.setListMoreLoading(false)
        })
    }
  }

  reloadList(): void {
    this.apartmentsStore.setListReloadLoading(true)
    this.apiRepo
      .mainApartmentsList({
        query: { page: 1 },
      })
      .then(res => {
        this.apartmentsStore.setListPage(1)
        this.apartmentsStore.setListMaxCount(res.data.count)
        const results = this.getResults(res.data.results)
        this.apartmentsStore.setList(results)
      })
      .finally(() => this.apartmentsStore.setListReloadLoading(false))
  }

  chooseApartment(val: IApartmentsStore['choosedApartment']): void {
    const canChoose =
      val.type_user === IUserTypeEnum.Owner
        ? val.owner_status === IOwnerStatus.Approved
        : val.tenant_status === ITenantStatus.Approved

    if (canChoose) {
      this.apartmentsStore.setChoosedApartment(val)
    }
  }

  openApartmentManagementCompany(val: IApartmentsStore['apartmentDetail']): void {
    this.apartmentsStore.setApartmentDetail(val)
    this.navigationService.navigate('ManagamentCompanyScreen' as any)
  }

  deleteApartment(id: IApartmentAdapter['id']) {
    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    this.apiRepo
      .mainApartmentDelete({ query: { id } })
      .then(() => this.getListStart())
      .finally(() => {
        EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
      })
  }

  openApartmentEdit(val: IApartmentAdapter): void {
    this.apartmentsStore.setApartmentDetail(val)
    this.apartmentsStore.setCreateModalOpen(true)
  }

  openTenantsList(val: IApartmentAdapter): void {
    this.apartmentsStore.setApartmentDetail(val)
    // @ts-ignore
    this.navigationService.navigate('TenantsScreen')
  }
}
