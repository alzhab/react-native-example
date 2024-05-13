import { inject, injectable } from 'inversify'
import { EConfirmModalFlowEvents, IConfirmModalFlow, IConfirmModalFlowData } from './types'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { IFlowReactions } from 'blms/types'
import { ConfirmModalActionsId, IConfirmModalActions } from 'blms/ConfirmModalBlm/actions'

export const ConfirmModalFlowId = Symbol.for('ConfirmModalFlow')
EVENT_EMITTER.addFlowId(ConfirmModalFlowId)

@injectable()
export class ConfirmModalFlow implements IConfirmModalFlow {
  constructor(@inject(ConfirmModalActionsId) private confirmModalActions: IConfirmModalActions) {}
  get reactions(): IFlowReactions {
    return {
      [EConfirmModalFlowEvents.OPEN_CONFIRM_MODAL]: this.openConfirmModal.bind(this),
    }
  }

  openConfirmModal(data: IConfirmModalFlowData[EConfirmModalFlowEvents.OPEN_CONFIRM_MODAL]) {
    this.confirmModalActions.openConfirmModal(data.data)
  }
}
