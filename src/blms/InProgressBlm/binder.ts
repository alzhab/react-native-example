import { Container } from 'inversify'
import { InProgressStore, InProgressStoreId, IInProgressStore } from './store'

import { InProgressFlow, InProgressFlowId, IInProgressFlow } from './flow'

export const bindInProgressBlm = (container: Container) => {
  container.bind<IInProgressStore>(InProgressStoreId).to(InProgressStore)
  container.bind<IInProgressFlow>(InProgressFlowId).to(InProgressFlow)
}
