import { inject, injectable } from 'inversify'
import { ILogoutActions } from './types'
import { AuthenticationStoreId, IAuthenticationStore } from '../store'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import { LocalStorageClientId } from '@corrbo/module-localstorage/services/LocalClientService/LocalClient.service'
import { ILocalStorageClient } from '@corrbo/module-localstorage/services/LocalClientService/types'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'

export const LogoutActionsId = Symbol.for('LogoutActions')

@injectable()
export class LogoutActions implements ILogoutActions {
  constructor(
    @inject(AuthenticationStoreId) private authenticationStore: IAuthenticationStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
    @inject(LocalStorageClientId) private _localClient: ILocalStorageClient,
  ) {}

  logout() {
    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    return this.apiRepo
      .logout()
      .then(() => this.clear())
      .catch(() => {
        EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
      })
  }

  clear() {
    return this._localClient.remove('csrfToken').then(() => {
      this.authenticationStore.setToken('')
      this.authenticationStore.setIsAuthorized(false)
    })
  }
}
