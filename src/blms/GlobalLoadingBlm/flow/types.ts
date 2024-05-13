import { IBaseFlow } from '@corrbo/base/IOC'
export type IGlobalLoadingFlow = IBaseFlow & {}

export enum EGlobalLoadingFlowEvents {
  SHOW_GLB_LOADING = 'SHOW_GLB_LOADING',
  HIDE_GLB_LOADING = 'HIDE_GLB_LOADING',
}

export type IGlobalLoadingFlowData = {
  [EGlobalLoadingFlowEvents.SHOW_GLB_LOADING]: undefined
  [EGlobalLoadingFlowEvents.HIDE_GLB_LOADING]: undefined
}
