import { inject, injectable } from 'inversify'
import { ITenantsPermissionChangeActions } from './types'
import { ApiRepoId, IApiRepo, ITenant, ITenantStatus } from 'repositories/Api'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'
import { ETenantsFlowEvents } from 'blms/TenantsBlm/flow'

export const TenantsPermissionChangeActionsId = Symbol.for('TenantsPermissionChangeActions')

@injectable()
export class TenantsPermissionChangeActions implements ITenantsPermissionChangeActions {
  constructor(@inject(ApiRepoId) private apiRepo: IApiRepo) {}

  changePermissionApplication(data: { id: ITenant['id']; val: boolean }): void {
    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    this.apiRepo
      .mainChangePermissionsPUT({
        query: { id: data.id },
        body: { can_work_applications: data.val },
      })
      .then(() => EVENT_EMITTER.emitEvent({ name: ETenantsFlowEvents.RELOAD_TENANTS_LIST }))
      .catch(() => {
        EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
      })
  }

  changePermissionVote(data: { id: ITenant['id']; val: boolean }): void {
    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    this.apiRepo
      .mainChangePermissionsPUT({
        query: { id: data.id },
        body: { can_work_votes: data.val },
      })
      .then(() => EVENT_EMITTER.emitEvent({ name: ETenantsFlowEvents.RELOAD_TENANTS_LIST }))
      .catch(() => {
        EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
      })
  }

  changeTenantToApprove(data: { id: ITenant['id']; val: ITenantStatus }): void {
    if (data.val === ITenantStatus.Approved) {
      EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
      this.apiRepo
        .mainChangePermissionsPUT({
          query: { id: data.id },
          body: { status: ITenantStatus.Approved },
        })
        .then(() => EVENT_EMITTER.emitEvent({ name: ETenantsFlowEvents.RELOAD_TENANTS_LIST }))
        .catch(() => {
          EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
        })
    } else {
      EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
      this.apiRepo
        .tenantDelete({ query: { id: data.id } })
        .then(() => {
          EVENT_EMITTER.emitEvent({ name: ETenantsFlowEvents.RELOAD_TENANTS_LIST })
        })
        .catch(() => {
          EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
        })
    }
  }
}
