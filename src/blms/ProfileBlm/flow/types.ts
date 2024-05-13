import { IBaseFlow } from '@corrbo/base/IOC'

export type IProfileFlow = IBaseFlow & {}

export enum EProfileFlowEvents {
  ON_DELETE_PROFILE = 'ON_DELETE_PROFILE',
}

export type IProfileFlowData = {
  [EProfileFlowEvents.ON_DELETE_PROFILE]: undefined
}
