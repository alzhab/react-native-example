import { inject, injectable } from 'inversify'
import { EFloatInfoFlowEvents, IFloatInfoFlow, IFloatInfoFlowData } from './types'
import { FloatInfoStoreId, IFloatInfoStore } from 'blms/FloatInfoBlm/store'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { IFlowReactions } from 'blms/types'

export const FloatInfoFlowId = Symbol.for('FloatInfoFlow')

EVENT_EMITTER.addFlowId(FloatInfoFlowId)

@injectable()
export class FloatInfoFlow implements IFloatInfoFlow {
  constructor(@inject(FloatInfoStoreId) private floatInfoStore: IFloatInfoStore) {}

  get reactions(): IFlowReactions {
    return {
      [EFloatInfoFlowEvents.SHOW_FLOAT_INFO]: this.showFloatInfo.bind(this),
    }
  }

  showFloatInfo(data: IFloatInfoFlowData[EFloatInfoFlowEvents.SHOW_FLOAT_INFO]) {
    this.floatInfoStore.setDesc(data?.desc || '')
    this.floatInfoStore.setButtons(data?.buttons || [])
    this.floatInfoStore.setLayout(data.layout)
    this.floatInfoStore.setIsVisible(true)
  }
}
