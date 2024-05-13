import { inject, injectable } from 'inversify'
import { INewsCreateActions, INewsSubmitData } from './types'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'
import { ContentType } from 'base/BaseRest'
import { IProfileStore, ProfileStoreId } from 'blms/ProfileBlm/store'
import { ENewsFlowEvents } from 'blms/NewsBlm/flow'
import { INavigationService, NavigationServiceId } from '@corrbo/module-navigation/services'

export const NewsCreateActionsId = Symbol.for('NewsCreateActions')

@injectable()
export class NewsCreateActions implements INewsCreateActions {
  constructor(
    @inject(ApiRepoId) private apiRepo: IApiRepo,
    @inject(ProfileStoreId) private profileStore: IProfileStore,
    @inject(NavigationServiceId) private navigationService: INavigationService,
  ) {}

  submit(data: INewsSubmitData): void {
    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    this.apiRepo
      .newsCreate({
        body: {
          user: +(this.profileStore.profile?.id || 0),
          description: data.description,
          name: data.name,
          apartment_id: data.house.val,
          image: data.file || { uri: '', type: '', name: '' },
        },
        type: ContentType.FormData,
      })
      .then(() => this.navigationService.goBack())
      .finally(() => EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING }))
  }
}
