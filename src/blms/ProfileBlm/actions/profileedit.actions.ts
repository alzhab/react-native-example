import { inject, injectable } from 'inversify'
import { IProfileEditActions } from './types'
import { IProfileStore, ProfileStoreId } from 'blms/ProfileBlm/store'
import { ApiRepoId, IApiRepo, IUser } from 'repositories/Api'
import { InteractionManager } from 'react-native'
import { INavigationService, NavigationServiceId } from '@corrbo/module-navigation/services'
import Toast from 'react-native-toast-message'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'

export const ProfileEditActionsId = Symbol.for('ProfileEditActions')

@injectable()
export class ProfileEditActions implements IProfileEditActions {
  constructor(
    @inject(ProfileStoreId) private profileStore: IProfileStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
    @inject(NavigationServiceId) private navigation: INavigationService,
  ) {}

  submit(data: IUser): void {
    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    this.apiRepo
      .profileEdit({
        body: { ...data, phone: data.phone || this.profileStore.profile?.phone || '' },
      })
      .then(() => {
        Toast.show({ type: 'success', text1: 'Профиль успешно изменен' })
        this.profileStore.setProfile({
          ...this.profileStore.profile,
          ...data,
          phone: data.phone || this.profileStore.profile?.phone || '',
        })
        InteractionManager.runAfterInteractions(() => {
          this.navigation.goBack()
        })
      })
      .finally(() => {
        EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
      })
  }
}
