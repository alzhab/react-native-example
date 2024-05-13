import { inject, injectable } from 'inversify'
import { IProfilePasswordEditActions } from './types'
import { IProfileStore, ProfileStoreId } from 'blms/ProfileBlm/store'
import { ApiRepoId, IApiRepo, IProfileEditPasswordParams } from 'repositories/Api'
import { INavigationService, NavigationServiceId } from '@corrbo/module-navigation/services'
import { InteractionManager } from 'react-native'
import Toast from 'react-native-toast-message'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'

export const ProfilePasswordEditActionsId = Symbol.for('ProfilePasswordEditActions')

@injectable()
export class ProfilePasswordEditActions implements IProfilePasswordEditActions {
  constructor(
    @inject(ProfileStoreId) private profileStore: IProfileStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
    @inject(NavigationServiceId) private navigation: INavigationService,
  ) {}

  submit(data: IProfileEditPasswordParams): void {
    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    this.apiRepo
      .profileEditPassword({ body: data })
      .then(() => {
        Toast.show({ type: 'success', text1: 'Пароль успешно изменен' })
        InteractionManager.runAfterInteractions(() => {
          this.navigation.goBack()
        })
      })
      .finally(() => {
        EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
      })
  }
}
