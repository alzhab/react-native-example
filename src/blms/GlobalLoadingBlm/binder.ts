import { Container } from 'inversify'
import { GlobalLoadingStore, GlobalLoadingStoreId, IGlobalLoadingStore } from './store'

import { GlobalLoadingFlow, GlobalLoadingFlowId, IGlobalLoadingFlow } from './flow'

export const bindGlobalLoadingBlm = (container: Container) => {
  container.bind<IGlobalLoadingStore>(GlobalLoadingStoreId).to(GlobalLoadingStore)
  container.bind<IGlobalLoadingFlow>(GlobalLoadingFlowId).to(GlobalLoadingFlow)
}
