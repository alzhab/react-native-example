import { inject, injectable } from 'inversify'
import { IServerApiStopActions } from './types'
import { ServerapistopStoreId } from 'blms/AppStateBlm/store'
import { IServerapistopStore } from 'blms/AppStateBlm/store/types'
import { ApiRepoId, IApiRepo } from 'repositories/Api'

export const ServerApiStopActionsId = Symbol.for('ServerApiStopActions')

@injectable()
export class ServerApiStopActions implements IServerApiStopActions {
  constructor(
    @inject(ServerapistopStoreId) private serverApiStopStore: IServerapistopStore,
    @inject(ApiRepoId) private apiRepi: IApiRepo,
  ) {}

  closeServerStopPlug(): void {
    this.serverApiStopStore.setIsPlugOpen(false)
  }

  openServerStopPlug(): void {
    this.serverApiStopStore.setIsPlugOpen(true)
  }

  refreshCheck(): void {
    this.apiRepi.mainApplicationConfig()
  }
}
