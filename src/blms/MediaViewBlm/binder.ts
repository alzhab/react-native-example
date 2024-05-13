import { Container } from 'inversify'
import { MediaViewStore, MediaViewStoreId, IMediaViewStore } from './store'

import { MediaViewFlow, MediaViewFlowId, IMediaViewFlow } from './flow'

export const bindMediaViewBlm = (container: Container) => {
  container.bind<IMediaViewStore>(MediaViewStoreId).to(MediaViewStore)
  container.bind<IMediaViewFlow>(MediaViewFlowId).to(MediaViewFlow)
}
