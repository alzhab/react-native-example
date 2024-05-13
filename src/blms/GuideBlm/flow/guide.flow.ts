import { inject, injectable } from 'inversify'
import { EGuideFlowEvents, IGuideFlow } from './types'
import { GuideActionsId, IGuideActions } from '../actions'
import { GuideStoreId, IGuideStore } from '../store'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { IFlowReactions } from 'blms/types'
import {
  AuthenticationStoreId,
  IAuthenticationStore,
} from 'blms/AuthenticationBlm/store'

export const GuideFlowId = Symbol.for('GuideFlow')
EVENT_EMITTER.addFlowId(GuideFlowId)

@injectable()
export class GuideFlow implements IGuideFlow {
  constructor(
    @inject(GuideActionsId) private guideActions: IGuideActions,
    @inject(GuideStoreId) private guideStore: IGuideStore,
    @inject(AuthenticationStoreId)
    private authenticationStore: IAuthenticationStore,
  ) {}

  get reactions(): IFlowReactions {
    return {
      [EGuideFlowEvents.CHECK_GUIDE_SHOW]: this.checkGuideShow.bind(this),
      [EGuideFlowEvents.ON_GUIDE_NEED_TO_SHOW]: this.onNeedToShow.bind(this),
    }
  }

  checkGuideShow() {
    if (this.authenticationStore.isAuthorized) {
      this.guideActions.startGuide()
    }
  }

  onNeedToShow() {
    this.guideStore.setIsNeedToShow(true)
    this.guideActions.startGuide()
  }
}
