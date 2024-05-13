import { inject, injectable } from 'inversify'
import { IProfileDeleteActions } from './types'
import { IProfileStore, ProfileStoreId } from 'blms/ProfileBlm/store'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import Toast from 'react-native-toast-message'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'
import { EAuthenticationFlowEvents } from 'blms/AuthenticationBlm/flow'

export const ProfileDeleteActionsId = Symbol.for('ProfileDeleteActions')

@injectable()
export class ProfileDeleteActions implements IProfileDeleteActions {
  constructor(
    @inject(ProfileStoreId) private profileStore: IProfileStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
  ) {}

  deleteProfile(): void {
    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    this.apiRepo
      .profileDelete()
      .then(() => {
        Toast.show({ type: 'success', text1: 'Аккаунт удален' })
        this.profileStore.setProfile(null)
        EVENT_EMITTER.emitEvent({ name: EAuthenticationFlowEvents.AFTER_DELETE })
      })
      .finally(() => {
        EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
      })
  }
}
