import { Container } from 'inversify'
import { ServerApiStopActions, ServerApiStopActionsId, IServerApiStopActions } from './actions'

import { ServerapistopStore, ServerapistopStoreId, IServerapistopStore } from './store'

import {
  MockRequestStatusesActions,
  MockRequestStatusesActionsId,
  IMockRequestStatusesActions,
} from './actions'

import { IAppState, AppStateFlow, AppStateFlowId } from './flow'
import { IMockRequestStatusesStore } from 'blms/AppStateBlm/store/types'
import { MockRequestStatusesStore, MockRequestStatusesStoreId } from 'blms/AppStateBlm/store'

export const bindAppStateBlm = (container: Container) => {
  container.bind<IServerApiStopActions>(ServerApiStopActionsId).to(ServerApiStopActions)
  container.bind<IServerapistopStore>(ServerapistopStoreId).to(ServerapistopStore)
  container
    .bind<IMockRequestStatusesActions>(MockRequestStatusesActionsId)
    .to(MockRequestStatusesActions)
  container.bind<IMockRequestStatusesStore>(MockRequestStatusesStoreId).to(MockRequestStatusesStore)
  container.bind<IAppState>(AppStateFlowId).to(AppStateFlow)
}
