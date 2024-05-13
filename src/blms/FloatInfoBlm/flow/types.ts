import { IBaseFlow } from '@corrbo/base/IOC'
import { IFloatInfoStore } from 'blms/FloatInfoBlm/store'

export type IFloatInfoFlow = IBaseFlow & {}

export enum EFloatInfoFlowEvents {
  SHOW_FLOAT_INFO = 'SHOW_FLOAT_INFO',
}

export type IFloatInfoFlowData = {
  [EFloatInfoFlowEvents.SHOW_FLOAT_INFO]: {
    layout: IFloatInfoStore['layout']
    desc?: IFloatInfoStore['desc']
    buttons?: IFloatInfoStore['buttons']
  }
}
