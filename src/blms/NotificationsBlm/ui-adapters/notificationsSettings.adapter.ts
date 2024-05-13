import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { INotificationsStore, NotificationsStoreId } from 'blms/NotificationsBlm/store'
import {
  INotificationsSettingsActions,
  NotificationsSettingsActionsId,
} from 'blms/NotificationsBlm/actions'

export function useNotificationsSettingsAdapter() {
  const store = useInjection<INotificationsStore>(NotificationsStoreId)
  const actions = useInjection<INotificationsSettingsActions>(NotificationsSettingsActionsId)

  const isEnabled = useMemo(() => store.notificationEnabled, [store.notificationEnabled])
  const notificationsLoading = useMemo(
    () => store.notificationToggleLoading,
    [store.notificationToggleLoading],
  )
  const toggleNotification = useCallback(() => actions.togglePermission(), [])

  return {
    toggleNotification,
    isEnabled,
    notificationsLoading,
  }
}
