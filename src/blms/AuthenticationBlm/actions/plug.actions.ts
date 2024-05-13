import { inject, injectable } from 'inversify'
import { IPlugActions } from './types'
import { AuthenticationStoreId, IAuthenticationStore } from '../store'

export const PlugActionsId = Symbol.for('PlugActions')

@injectable()
export class PlugActions implements IPlugActions {
  constructor(
    @inject(AuthenticationStoreId)
    private authenticationStore: IAuthenticationStore,
  ) {}

  checkAuthAction(call: () => void): void {
    if (!this.authenticationStore.isAuthorized) {
      this.authenticationStore.setAction(call)
      this.authenticationStore.setIsPlugModalOpen(true)
    } else {
      call()
    }
  }

  close(): void {
    this.authenticationStore.setIsPlugModalOpen(false)
  }
}
