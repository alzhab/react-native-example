import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { InteractionManager } from 'react-native'
import { INewsStore, NewsStoreId } from 'blms/NewsBlm/store'
import { INewsListActions, NewsListActionsId } from 'blms/NewsBlm/actions'
import { IApplications, INews } from 'repositories/Api'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { ENewsFlowEvents } from 'blms/NewsBlm/flow'
import { useFocusEffect } from '@react-navigation/native'

export function useNewsListAdapter() {
  const store = useInjection<INewsStore>(NewsStoreId)
  const actions = useInjection<INewsListActions>(NewsListActionsId)

  const data = useMemo(() => store.list, [store.list])
  const listStartLoading = useMemo(() => store.listStartLoading, [store.listStartLoading])
  const listReloadLoading = useMemo(() => store.listReloadLoading, [store.listReloadLoading])
  const listMoreLoading = useMemo(() => store.listMoreLoading, [store.listMoreLoading])

  const refreshList = useCallback(() => actions.reloadList(), [])
  const loadMore = useCallback(() => actions.loadListMore(), [])

  const deleteItem = useCallback(
    (id: IApplications['id']) =>
      EVENT_EMITTER.emitEvent({
        name: ENewsFlowEvents.DELETE_NEWS,
        data: { id },
      }),
    [],
  )

  const editItem = useCallback(
    (item: INews) =>
      EVENT_EMITTER.emitEvent({
        name: ENewsFlowEvents.OPEN_NEWS_EDIT,
        data: { id: item.id || 1 },
      }),
    [],
  )

  const onPress = useCallback((item: INews) => {
    EVENT_EMITTER.emitEvent({
      name: ENewsFlowEvents.OPEN_NEWS_DETAIl,
      data: { id: item.id || 1 },
    })
  }, [])

  useFocusEffect(
    useCallback(() => {
      InteractionManager.runAfterInteractions(() => {
        actions.getListStart()
      })

      return () => {
        actions.clearListStart()
      }
    }, []),
  )

  return {
    data,
    listStartLoading,
    listReloadLoading,
    listMoreLoading,
    refreshList,
    loadMore,
    editItem,
    deleteItem,
    onPress,
  }
}
