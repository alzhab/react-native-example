import { inject, injectable } from 'inversify'
import { IApplicationDetailActions } from './types'
import { ApiRepoId, IApiRepo, IApplicationsStatusEnum } from 'repositories/Api'
import { ApplicationsStoreId, IApplicationsStore } from 'blms/ApplicationsBlm/store'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'
import Toast from 'react-native-toast-message'
import { INavigationService, NavigationServiceId } from '@corrbo/module-navigation/services'

export const ApplicationDetailActionsId = Symbol.for('ApplicationDetailActions')

@injectable()
export class ApplicationDetailActions implements IApplicationDetailActions {
  constructor(
    @inject(ApplicationsStoreId) private store: IApplicationsStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
    @inject(NavigationServiceId) private navigationService: INavigationService,
  ) {}
  clearData(): void {
    this.store.setDetailDataLoading(true)
    this.store.setDetailData(null)
  }

  getDetail(): void {
    this.store.setDetailDataLoading(true)
    this.apiRepo
      .mainApplicationDetail({ query: { id: this.store.detailDataId } })
      .then(res => {
        this.store.setDetailData(res.data)
      })
      .catch(() => {
        Toast.show({ type: 'error', text1: 'Ошибка' })
        this.navigationService.goBack()
      })
      .finally(() => this.store.setDetailDataLoading(false))
  }

  accept(): void {
    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    this.apiRepo
      .mainApplicationEditStatus({
        body: {
          status: IApplicationsStatusEnum.AcceptedByCustomer,
          type: this.store.detailData?.type.id || 0,
          apartment: this.store.detailData?.apartment.id || 0,
          category: this.store.detailData?.category.id || 0,
          executor: this.store.detailData?.executor || 0,
        },
        query: { id: this.store.detailDataId },
      })
      .then(res => {
        this.store.setDetailData(res.data)
      })
      .finally(() => EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING }))
  }

  reject(): void {
    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    this.apiRepo
      .mainApplicationEditStatus({
        body: {
          status: IApplicationsStatusEnum.Enabled,
          type: this.store.detailData?.type.id || 0,
          apartment: this.store.detailData?.apartment.id || 0,
          category: this.store.detailData?.category.id || 0,
          executor: this.store.detailData?.executor || 0,
        },
        query: { id: this.store.detailDataId },
      })
      .then(res => {
        this.store.setDetailData(res.data)
      })
      .finally(() => EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING }))
  }

  cancel(): void {
    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    const body = {
      status: IApplicationsStatusEnum.Cancelled,
      type: this.store.detailData?.type.id || 0,
      apartment: this.store.detailData?.apartment.id || 0,
      category: this.store.detailData?.category.id || 0,
      executor: this.store.detailData?.executor || 0,
    }

    for (let filtersKey in body) {
      if (!(body as any)[filtersKey]) {
        delete (body as any)[filtersKey]
      }
    }

    this.apiRepo
      .mainApplicationEditStatus({
        body,
        query: { id: this.store.detailDataId },
      })
      .then(res => {
        this.store.setDetailData(res.data)
      })
      .finally(() => EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING }))
  }
}
