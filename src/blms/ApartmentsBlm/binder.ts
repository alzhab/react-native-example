import { Container } from 'inversify'
import { ApartmentPlugActions, ApartmentPlugActionsId, IApartmentPlugActions } from './actions'

import { ApartmentsFlow, ApartmentsFlowId, IApartmentsFlow } from './flow'

import { ApartmentsStore, ApartmentsStoreId, IApartmentsStore } from './store'

import { ApartmentsListActions, ApartmentsListActionsId, IApartmentsListActions } from './actions'

import {
  ApartmentsCreateActions,
  ApartmentsCreateActionsId,
  IApartmentsCreateActions,
} from './actions'

export const bindApartmentsBlm = (container: Container) => {
  container.bind<IApartmentPlugActions>(ApartmentPlugActionsId).to(ApartmentPlugActions)
  container.bind<IApartmentsFlow>(ApartmentsFlowId).to(ApartmentsFlow)
  container.bind<IApartmentsStore>(ApartmentsStoreId).to(ApartmentsStore)
  container.bind<IApartmentsListActions>(ApartmentsListActionsId).to(ApartmentsListActions)
  container.bind<IApartmentsCreateActions>(ApartmentsCreateActionsId).to(ApartmentsCreateActions)
}
