import { inject, injectable } from 'inversify'
import { IAuthorizationActions, IAuthorizationData } from './types'
import { AuthenticationStoreId, IAuthenticationStore } from '../store'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import { AxiosError } from 'axios'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'
import { EAuthenticationFlowEvents } from 'blms/AuthenticationBlm/flow'
import Toast from 'react-native-toast-message'

export const AuthorizationActionsId = Symbol.for('AuthorizationActions')

@injectable()
export class AuthorizationActions implements IAuthorizationActions {
  constructor(
    @inject(AuthenticationStoreId)
    private authenticationStore: IAuthenticationStore,
    @inject(ApiRepoId)
    private apiRepo: IApiRepo,
  ) {}

  clear(): void {
    this.authenticationStore.setShowPasswordConfirm(false)
  }

  authorizeSubmit(data: IAuthorizationData): void {
    data.password = data.password.trim()
    if (this.authenticationStore.showPasswordConfirm) {
      EVENT_EMITTER.emitEvent({ name: EAuthenticationFlowEvents.START_REGISTRATION, data })
    } else {
      EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
      this.apiRepo
        .mainAuthorization({ body: { password: data.password, phone: data.phone } })
        .then(res => {
          EVENT_EMITTER.emitEvent({
            name: EAuthenticationFlowEvents.ON_AUTHORIZE_SUCCESS,
            data: res.data,
          })
        })
        .catch((err: AxiosError<{ details: string; non_field_errors: string[] }>) => {
          EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
          if (err.response && err.response.status.toString() === '400') {
            this.authenticationStore.setShowPasswordConfirm(true)
          } else {
            Toast.show({ type: 'error', text1: err.response?.data.details || 'Неверный пароль' })
          }
          return Promise.reject(err)
        })
    }
  }
}
