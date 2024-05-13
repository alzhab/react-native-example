import { IBaseFlow } from '@corrbo/base/IOC'

export type IInProgressFlow = IBaseFlow & {}

export enum EInProgressFlowEvents {
  OPEN_INPROGRESS_PLUG = 'OPEN_INPROGRESS_PLUG',
}

export type IInProgressFlowData = {
  [EInProgressFlowEvents.OPEN_INPROGRESS_PLUG]: undefined
}
