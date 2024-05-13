import { inject, injectable } from 'inversify'
import { IRecoverPasswordActions } from './types'
import { IRecoverPasswordStore, RecoverPasswordStoreId } from 'blms/RecoverPasswordBlm/store'
import { INavigationService, NavigationServiceId } from '@corrbo/module-navigation/services'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'
import Toast from 'react-native-toast-message'

export const RecoverPasswordActionsId = Symbol.for('RecoverPasswordActions')

@injectable()
export class RecoverPasswordActions implements IRecoverPasswordActions {
  constructor(
    @inject(RecoverPasswordStoreId) private store: IRecoverPasswordStore,
    @inject(NavigationServiceId) private navigation: INavigationService,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
  ) {}

  closeModal(): void {
    this.store.setShowRecoverModal(false)
  }

  onCodeSubmit(val: { code: string; phone: string }): void {
    this.store.setCode(val.code)
    this.store.setPhone(val.phone)
    this.store.setShowRecoverModal(false)
    this.navigation.navigate('RecoverPasswordScreen')
  }

  onPasswordSubmit(password: string): void {
    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    this.apiRepo
      .recoverPassword({
        body: { new_password: password, phone: this.store.phone, code: this.store.code },
      })
      .then(() => {
        Toast.show({ type: 'success', text1: 'Пароль успешно изменен' })
        this.navigation.goBack()
      })
      .finally(() => {
        EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
      })
  }

  clear() {
    this.store.setCode('')
    this.store.setPhone('')
  }

  openModal(): void {
    this.store.setShowRecoverModal(true)
  }
}
