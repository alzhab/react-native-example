import { inject, injectable } from 'inversify'
import { EInProgressFlowEvents, IInProgressFlow } from './types'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { IInProgressStore, InProgressStoreId } from 'blms/InProgressBlm/store'
import { IFlowReactions } from 'blms/types'

export const InProgressFlowId = Symbol.for('InProgressFlow')
EVENT_EMITTER.addFlowId(InProgressFlowId)

@injectable()
export class InProgressFlow implements IInProgressFlow {
  constructor(
    @inject(InProgressStoreId) private inProgressStore: IInProgressStore,
  ) {}

  get reactions(): IFlowReactions {
    return {
      [EInProgressFlowEvents.OPEN_INPROGRESS_PLUG]:
        this.openInProgressPlug.bind(this),
    }
  }

  openInProgressPlug() {
    this.inProgressStore.setIsPlugOpen(true)
  }
}
