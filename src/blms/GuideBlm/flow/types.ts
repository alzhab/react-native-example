import { IBaseFlow } from '@corrbo/base/IOC'
export type IGuideFlow = IBaseFlow & {}

export enum EGuideFlowEvents {
  CHECK_GUIDE_SHOW = 'CHECK_GUIDE_SHOW',
  ON_GUIDE_NEED_TO_SHOW = 'ON_GUIDE_NEED_TO_SHOW',
}

export type IGuideFlowData = {
  [EGuideFlowEvents.CHECK_GUIDE_SHOW]: undefined
  [EGuideFlowEvents.ON_GUIDE_NEED_TO_SHOW]: undefined
}
