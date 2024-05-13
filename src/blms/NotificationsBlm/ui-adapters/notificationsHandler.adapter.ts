import { useInjection } from 'inversify-react'
import { useEffect } from 'react'
import {
  INotificationsHandlersActions,
  NotificationsHandlersActionsId,
} from 'blms/NotificationsBlm/actions'

export function useNotificationsHandlerAdapter() {
  const actions = useInjection<INotificationsHandlersActions>(
    NotificationsHandlersActionsId,
  )

  useEffect(() => {
    actions.messageBackgroundHandler()

    return actions.messageForegroundHandler()
  }, [])
}
