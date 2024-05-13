import { inject, injectable } from 'inversify'
import { ETenantsFlowEvents, ITenantsFlow, ITenantsFlowData } from './types'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { IFlowReactions } from 'blms/types'
import {
  ITempPasswordActions,
  ITenantsListActions,
  TempPasswordActionsId,
  TenantsListActionsId,
} from 'blms/TenantsBlm/actions'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'

export const TenantsFlowId = Symbol.for('TenantsFlow')
EVENT_EMITTER.addFlowId(TenantsFlowId)

@injectable()
export class TenantsFlow implements ITenantsFlow {
  constructor(
    @inject(TempPasswordActionsId) private tempPasswordActions: ITempPasswordActions,
    @inject(TenantsListActionsId) private tenantsListActions: ITenantsListActions,
  ) {}
  get reactions(): IFlowReactions {
    return {
      [ETenantsFlowEvents.OPEN_TEMP_PASSWORD_MODAL]: this.openTempPasswordOpen.bind(this),
      [ETenantsFlowEvents.RELOAD_TENANTS_LIST]: this.reloadTenantsList.bind(this),
    }
  }

  openTempPasswordOpen(data: ITenantsFlowData[ETenantsFlowEvents.OPEN_TEMP_PASSWORD_MODAL]) {
    this.tempPasswordActions.setTempData(data.data)
    this.tempPasswordActions.openTempModal()
  }

  reloadTenantsList() {
    this.tenantsListActions
      .reloadList()
      .finally(() => EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING }))
  }
}
