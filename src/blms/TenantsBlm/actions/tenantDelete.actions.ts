import { inject, injectable } from 'inversify'
import { ITenantDeleteActions } from './types'
import { ApiRepoId, IApiRepo, ITenant } from 'repositories/Api'
import { ITenantsStore, TenantsStoreId } from 'blms/TenantsBlm/store'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'
import { EConfirmModalFlowEvents } from 'blms/ConfirmModalBlm/flow'
import { ETenantsFlowEvents } from 'blms/TenantsBlm/flow'

export const TenantDeleteActionsId = Symbol.for('TenantDeleteActions')

@injectable()
export class TenantDeleteActions implements ITenantDeleteActions {
  constructor(
    @inject(ApiRepoId) private apiRepo: IApiRepo,
    @inject(TenantsStoreId) private tenantsStore: ITenantsStore,
  ) {}

  openConfirmModal(id: ITenant['id']): void {
    EVENT_EMITTER.emitEvent({
      name: EConfirmModalFlowEvents.OPEN_CONFIRM_MODAL,
      data: {
        data: {
          title: 'Вы уверены?',
          desc: 'Вы удалите доступ к Вашей недвижимости для этого жильца',
          confirmCallback: () => {
            EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
            this.apiRepo
              .tenantDelete({ query: { id } })
              .then(() => {
                EVENT_EMITTER.emitEvent({ name: ETenantsFlowEvents.RELOAD_TENANTS_LIST })
              })
              .catch(() => {
                EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
              })
          },
        },
      },
    })
  }
}
