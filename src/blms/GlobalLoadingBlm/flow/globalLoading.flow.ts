import { inject, injectable } from 'inversify'
import { EGlobalLoadingFlowEvents, IGlobalLoadingFlow } from './types'
import { GlobalLoadingStoreId, IGlobalLoadingStore } from '../store'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { IFlowReactions } from 'blms/types'

export const GlobalLoadingFlowId = Symbol.for('GlobalLoadingFlow')
EVENT_EMITTER.addFlowId(GlobalLoadingFlowId)

@injectable()
export class GlobalLoadingFlow implements IGlobalLoadingFlow {
  constructor(@inject(GlobalLoadingStoreId) private globalLoadingStore: IGlobalLoadingStore) {}

  get reactions(): IFlowReactions {
    return {
      [EGlobalLoadingFlowEvents.SHOW_GLB_LOADING]: this.showLoading.bind(this),
      [EGlobalLoadingFlowEvents.HIDE_GLB_LOADING]: this.hideLoading.bind(this),
    }
  }

  showLoading() {
    this.globalLoadingStore.setIsVisible(true)
  }

  hideLoading() {
    this.globalLoadingStore.setIsVisible(false)
  }
}
