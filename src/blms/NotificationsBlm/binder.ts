import { Container } from 'inversify'
import {
  NotificationsHandlersActions,
  NotificationsHandlersActionsId,
  INotificationsHandlersActions,
} from './actions'

import {
  NotificationsSettingsActions,
  NotificationsSettingsActionsId,
  INotificationsSettingsActions,
} from './actions'

import { INotificationsStore, NotificationsStore, NotificationsStoreId } from './store'

import {
  INotificationsListActions,
  NotificationsListActions,
  NotificationsListActionsId,
} from './actions'

export const bindNotificationsBlm = (container: Container) => {
  container
    .bind<INotificationsHandlersActions>(NotificationsHandlersActionsId)
    .to(NotificationsHandlersActions)
  container
    .bind<INotificationsSettingsActions>(NotificationsSettingsActionsId)
    .to(NotificationsSettingsActions)
  container.bind<INotificationsStore>(NotificationsStoreId).to(NotificationsStore)
  container.bind<INotificationsListActions>(NotificationsListActionsId).to(NotificationsListActions)
}
