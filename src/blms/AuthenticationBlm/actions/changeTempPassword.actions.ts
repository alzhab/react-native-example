import { inject, injectable } from 'inversify'
import { INavigationService, NavigationServiceId } from '@corrbo/module-navigation/services'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import { IChangeTempPasswordActions } from './types'
import {
  ChangeTempPasswordStoreId,
  EChangeTempPasswordSteps,
  IChangeTempPasswordData,
  IChangeTempPasswordStore,
} from 'blms/AuthenticationBlm/store'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'
import { EAuthenticationFlowEvents } from 'blms/AuthenticationBlm/flow'
import { EGuideFlowEvents } from 'blms/GuideBlm/flow'
import { IProfileStore, ProfileStoreId } from 'blms/ProfileBlm/store'

export const ChangeTempPasswordActionsId = Symbol.for('ChangeTempPasswordActions')

@injectable()
export class ChangeTempPasswordActions implements IChangeTempPasswordActions {
  constructor(
    @inject(ChangeTempPasswordStoreId) private store: IChangeTempPasswordStore,
    @inject(NavigationServiceId) private navigationService: INavigationService,
    @inject(ProfileStoreId) private profileStore: IProfileStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
  ) {}

  clear(): void {
    this.store.clearChangeTempPasswordData()
  }

  onStart(data: Pick<IChangeTempPasswordData, 'temp_password'>): void {
    this.navigationService.navigate('ChangeTempPasswordScreen')
    this.store.setNeedToShow(true)
    this.store.addChangeTempPasswordData(data)
    this.store.setStep(EChangeTempPasswordSteps.ENTER)
  }

  submitEnter(): void {
    this.store.setStep(EChangeTempPasswordSteps.PASSWORD)
  }

  submitPassword(data: Pick<IChangeTempPasswordData, 'new_password'>): void {
    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    this.apiRepo
      .profileEditPassword({
        body: { new_password: data.new_password, old_password: this.store.data.temp_password },
      })
      .then(() => {
        if (this.profileStore.profile) {
          this.profileStore.setProfile({
            ...this.profileStore.profile,
            is_trial: false,
          })
        }
        this.store.addChangeTempPasswordData(data)
        this.store.setStep(EChangeTempPasswordSteps.FULL_NAME)
      })
      .finally(() => {
        EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
      })
  }

  submitFullname(data: Pick<IChangeTempPasswordData, 'name' | 'surname' | 'patronymic'>): void {
    this.store.addChangeTempPasswordData(data)
    const profile = this.profileStore.profile
    if (profile) {
      EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
      this.apiRepo
        .profileEdit({ body: { ...profile, ...data } })
        .then(() => {
          this.profileStore.setProfile({
            ...profile,
            ...data,
          })
          EVENT_EMITTER.emitEvent({
            name: EAuthenticationFlowEvents.ON_CHANGE_TEMP_PASSWORD_SUCCESS,
          })
        })
        .finally(() => {
          EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
        })
    }
  }

  afterChangeTempPassword(): void {
    this.store.clearChangeTempPasswordData()
  }
}
