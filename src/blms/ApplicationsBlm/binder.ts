import { Container } from 'inversify'
import {
  ApplicationConfigActions,
  ApplicationConfigActionsId,
  ApplicationCreateActions,
  ApplicationCreateActionsId,
  ApplicationDeleteActions,
  ApplicationDeleteActionsId,
  ApplicationDetailActions,
  ApplicationDetailActionsId,
  ApplicationListActions,
  ApplicationListActionsId,
  IApplicationConfigActions,
  IApplicationCreateActions,
  IApplicationDeleteActions,
  IApplicationDetailActions,
  IApplicationEditActions,
  IApplicationListActions,
} from './actions'

import { ApplicationsStore, ApplicationsStoreId, IApplicationsStore } from './store'

import { ApplicationDetailFlow, ApplicationDetailFlowId, IApplicationDetailFlow } from './flow'
import {
  ApplicationEditActions,
  ApplicationEditActionsId,
} from 'blms/ApplicationsBlm/actions/applicationEdit.actions'

export const bindApplicationsBlm = (container: Container) => {
  container.bind<IApplicationConfigActions>(ApplicationConfigActionsId).to(ApplicationConfigActions)
  container.bind<IApplicationsStore>(ApplicationsStoreId).to(ApplicationsStore)
  container.bind<IApplicationDetailFlow>(ApplicationDetailFlowId).to(ApplicationDetailFlow)
  container.bind<IApplicationListActions>(ApplicationListActionsId).to(ApplicationListActions)
  container.bind<IApplicationDetailActions>(ApplicationDetailActionsId).to(ApplicationDetailActions)
  container.bind<IApplicationCreateActions>(ApplicationCreateActionsId).to(ApplicationCreateActions)
  container.bind<IApplicationEditActions>(ApplicationEditActionsId).to(ApplicationEditActions)
  container.bind<IApplicationDeleteActions>(ApplicationDeleteActionsId).to(ApplicationDeleteActions)
}
