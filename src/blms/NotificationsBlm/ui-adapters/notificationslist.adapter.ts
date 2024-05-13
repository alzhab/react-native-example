import { useInjection } from 'inversify-react'
import { useCallback, useEffect, useMemo } from 'react'
import { InteractionManager } from 'react-native'
import {
  INotificationsStore,
  NotificationsStoreId,
} from 'blms/NotificationsBlm/store'
import {
  INotificationsListActions,
  NotificationsListActionsId,
} from 'blms/NotificationsBlm/actions'

export function useNotificationsListAdapter() {
  const store = useInjection<INotificationsStore>(NotificationsStoreId)
  const actions = useInjection<INotificationsListActions>(
    NotificationsListActionsId,
  )

  const data = useMemo(() => store.list, [store.list])
  const listStartLoading = useMemo(
    () => store.listStartLoading,
    [store.listStartLoading],
  )
  const listReloadLoading = useMemo(
    () => store.listReloadLoading,
    [store.listReloadLoading],
  )
  const listMoreLoading = useMemo(
    () => store.listMoreLoading,
    [store.listMoreLoading],
  )

  const refreshList = useCallback(() => actions.reloadList(), [])
  const loadMore = useCallback(() => actions.loadListMore(), [])

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      actions.getListStart()
    })

    return () => {
      actions.clearListStart()
    }
  }, [])

  return {
    data,
    listStartLoading,
    listReloadLoading,
    listMoreLoading,
    refreshList,
    loadMore,
  }
}
