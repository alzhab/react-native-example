import { Container } from 'inversify'
import { FloatInfoStore, FloatInfoStoreId, IFloatInfoStore } from './store'

import { FloatInfoFlow, FloatInfoFlowId, IFloatInfoFlow } from './flow'

export const bindFloatInfoBlm = (container: Container) => {
  container.bind<IFloatInfoStore>(FloatInfoStoreId).to(FloatInfoStore)
  container.bind<IFloatInfoFlow>(FloatInfoFlowId).to(FloatInfoFlow)
}
