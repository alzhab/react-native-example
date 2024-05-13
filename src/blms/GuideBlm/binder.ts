import { Container } from 'inversify'

import { GuideStore, GuideStoreId, IGuideStore } from './store'

import { GuideFlow, GuideFlowId, IGuideFlow } from './flow'

import { GuideActions, GuideActionsId, IGuideActions } from './actions'

export const bindGuideBlm = (container: Container) => {
  container.bind<IGuideStore>(GuideStoreId).to(GuideStore)
  container.bind<IGuideFlow>(GuideFlowId).to(GuideFlow)
  container.bind<IGuideActions>(GuideActionsId).to(GuideActions)
}
