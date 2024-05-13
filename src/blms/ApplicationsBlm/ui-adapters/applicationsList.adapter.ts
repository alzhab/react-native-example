import { useInjection } from 'inversify-react'
import { useCallback, useMemo, useRef } from 'react'
import { InteractionManager } from 'react-native'
import { toJS } from 'mobx'
import { useFocusEffect } from '@react-navigation/native'
import { IApplications } from 'repositories/Api'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { ApplicationsStoreId, IApplicationsStore } from 'blms/ApplicationsBlm/store'
import { ApplicationListActionsId, IApplicationListActions } from 'blms/ApplicationsBlm/actions'
import { EApplicationDetailFlowEvents } from 'blms/ApplicationsBlm/flow'

export function useApplicationsListAdapter() {
  const store = useInjection<IApplicationsStore>(ApplicationsStoreId)
  const listActions = useInjection<IApplicationListActions>(ApplicationListActionsId)

  const data = useMemo(() => store.list, [store.list])
  const listStartLoading = useMemo(() => store.listStartLoading, [store.listStartLoading])
  const listReloadLoading = useMemo(() => store.listReloadLoading, [store.listReloadLoading])
  const listMoreLoading = useMemo(() => store.listMoreLoading, [store.listMoreLoading])
  const filters = useMemo(() => toJS(store.listFilters), [store.listFilters])
  const listMaxCount = useMemo(
    () =>
      !listStartLoading && !listReloadLoading && !listMoreLoading ? store.listMaxCount : undefined,
    [listMoreLoading, listReloadLoading, listStartLoading, store.listMaxCount],
  )
  let timeout = useRef<any>(null)

  const tabType = useMemo(() => filters.tabType, [filters])

  const refreshList = useCallback(() => listActions.reloadList(), [])
  const loadMore = useCallback(() => listActions.loadListMore(), [])
  const changeTab = useCallback(
    (val: IApplicationsStore['listFilters']['tabType']) => listActions.changeTab(val),
    [],
  )
  const deleteItem = useCallback(
    (id: IApplications['id']) =>
      EVENT_EMITTER.emitEvent({
        name: EApplicationDetailFlowEvents.DELETE_APPLICATION,
        data: { id },
      }),
    [],
  )
  const editItem = useCallback(
    (item: IApplications) =>
      EVENT_EMITTER.emitEvent({
        name: EApplicationDetailFlowEvents.OPEN_APPLICATION_DETAIl,
        data: { id: item.id || 1 },
      }),
    [],
  )
  const onPress = useCallback((item: IApplications) => {
    EVENT_EMITTER.emitEvent({
      name: EApplicationDetailFlowEvents.OPEN_APPLICATION_DETAIl,
      data: { id: item.id || 1 },
    })
  }, [])

  useFocusEffect(
    useCallback(() => {
      InteractionManager.runAfterInteractions(() => {
        if (timeout && timeout.current) {
          clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(() => {
          listActions.getListStart()
        }, 600)
      })

      return () => {
        listActions.clearListStart()
      }
    }, [filters]),
  )

  return {
    data,
    listStartLoading,
    listReloadLoading,
    listMoreLoading,
    refreshList,
    loadMore,
    tabType,
    changeTab,
    listMaxCount,
    deleteItem,
    editItem,
    onPress,
  }
}
