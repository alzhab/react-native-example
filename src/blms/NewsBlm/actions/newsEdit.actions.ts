import { inject, injectable } from 'inversify'
import { INewsEditActions, INewsSubmitData } from './types'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import { NewsStoreId, INewsStore } from 'blms/NewsBlm/store'
import { INavigationService, NavigationServiceId } from '@corrbo/module-navigation/services'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'
import { ContentType } from 'base/BaseRest'
import { ENewsFlowEvents } from 'blms/NewsBlm/flow'
import { IProfileStore, ProfileStoreId } from 'blms/ProfileBlm/store'

export const NewsEditActionsId = Symbol.for('NewsEditActions')

@injectable()
export class NewsEditActions implements INewsEditActions {
  constructor(
    @inject(ApiRepoId) private apiRepo: IApiRepo,
    @inject(NewsStoreId) private store: INewsStore,
    @inject(NavigationServiceId) private navigationService: INavigationService,
    @inject(ProfileStoreId) private profileStore: IProfileStore,
  ) {}

  getDetail(): void {
    this.apiRepo
      .newsDetail({ query: { id: this.store.editDataId } })
      .then(res => {
        this.store.setEditData(res.data)
      })
      .finally(() => this.store.setEditDataLoading(false))
  }

  clear(): void {
    this.store.setEditDataLoading(true)
    this.store.setEditData(null)
  }

  submit(data: INewsSubmitData): void {
    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    this.apiRepo
      .newsEdit({
        body: {
          user: +(this.profileStore.profile?.id || 0),
          description: data.description,
          name: data.name,
          apartment_id: data.house.val,
          image: data.file,
        },
        type: ContentType.FormData,
      })
      .then(() => this.navigationService.goBack())
      .catch(() => EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING }))
  }
}
