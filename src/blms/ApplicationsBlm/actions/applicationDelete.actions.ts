import { inject, injectable } from 'inversify'
import { IApplicationDeleteActions } from './types'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'

export const ApplicationDeleteActionsId = Symbol.for('ApplicationDeleteActions')

@injectable()
export class ApplicationDeleteActions implements IApplicationDeleteActions {
  constructor(@inject(ApiRepoId) private apiRepo: IApiRepo) {}

  deleteItem(data: { id: number }): Promise<any> {
    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    return this.apiRepo.mainApplicationDELETE({
      query: data,
    })
  }
}
