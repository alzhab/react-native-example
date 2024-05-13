import { Container } from 'inversify'
import { NewsDetailActions, NewsDetailActionsId, INewsDetailActions } from './actions'

import { NewsEditActions, NewsEditActionsId, INewsEditActions } from './actions'

import { NewsDeleteActions, NewsDeleteActionsId, INewsDeleteActions } from './actions'

import { NewsCreateActions, NewsCreateActionsId, INewsCreateActions } from './actions'

import { NewsFlow, NewsFlowId, INewsFlow } from './flow'

import { NewsStore, NewsStoreId, INewsStore } from './store'

import { NewsListActions, NewsListActionsId, INewsListActions } from './actions'

export const bindNewsBlm = (container: Container) => {
  container.bind<INewsDetailActions>(NewsDetailActionsId).to(NewsDetailActions)
  container.bind<INewsEditActions>(NewsEditActionsId).to(NewsEditActions)
  container.bind<INewsDeleteActions>(NewsDeleteActionsId).to(NewsDeleteActions)
  container.bind<INewsCreateActions>(NewsCreateActionsId).to(NewsCreateActions)
  container.bind<INewsFlow>(NewsFlowId).to(NewsFlow)
  container.bind<INewsStore>(NewsStoreId).to(NewsStore)
  container.bind<INewsListActions>(NewsListActionsId).to(NewsListActions)
}
