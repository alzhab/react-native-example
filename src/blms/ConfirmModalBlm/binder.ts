import { Container } from 'inversify'
import { ConfirmModalStore, ConfirmModalStoreId, IConfirmModalStore } from './store'

import { ConfirmModalFlow, ConfirmModalFlowId, IConfirmModalFlow } from './flow'

import { ConfirmModalActions, ConfirmModalActionsId, IConfirmModalActions } from './actions'

export const bindConfirmModalBlm = (container: Container) => {
  container.bind<IConfirmModalStore>(ConfirmModalStoreId).to(ConfirmModalStore)
  container.bind<IConfirmModalFlow>(ConfirmModalFlowId).to(ConfirmModalFlow)
  container.bind<IConfirmModalActions>(ConfirmModalActionsId).to(ConfirmModalActions)
}
