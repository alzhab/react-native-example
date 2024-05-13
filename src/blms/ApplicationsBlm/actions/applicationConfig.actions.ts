import { inject, injectable } from 'inversify'
import { IApplicationConfigActions } from './types'
import { ApplicationsStoreId, IApplicationsStore } from 'blms/ApplicationsBlm/store'
import { ApiRepoId, IApiRepo } from 'repositories/Api'

export const ApplicationConfigActionsId = Symbol.for('ApplicationConfigActions')

@injectable()
export class ApplicationConfigActions implements IApplicationConfigActions {
  constructor(
    @inject(ApplicationsStoreId) private applicationsStore: IApplicationsStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
  ) {}

  getConfigData(): Promise<void> {
    return this.apiRepo.mainApplicationsConfig().then(res => {
      this.applicationsStore.setTypes(res.data)
    })
  }
}
