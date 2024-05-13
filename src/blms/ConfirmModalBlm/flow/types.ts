import { IBaseFlow } from '@corrbo/base/IOC'
import { IConfirmModalStore } from 'blms/ConfirmModalBlm/store'

export type IConfirmModalFlow = IBaseFlow & {}

export enum EConfirmModalFlowEvents {
  OPEN_CONFIRM_MODAL = 'OPEN_CONFIRM_MODAL',
}

export type IConfirmModalFlowData = {
  [EConfirmModalFlowEvents.OPEN_CONFIRM_MODAL]: { data: IConfirmModalStore['confirmModalData'] }
}
