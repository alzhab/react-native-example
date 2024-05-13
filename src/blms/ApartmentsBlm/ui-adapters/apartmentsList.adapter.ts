import { useInjection } from 'inversify-react'
import { useCallback, useEffect, useMemo } from 'react'
import { InteractionManager } from 'react-native'
import { ApartmentsStoreId, IApartmentsStore } from '../store'
import { ApartmentsListActionsId, IApartmentsListActions } from 'blms/ApartmentsBlm/actions'
import { IApartmentAdapter } from 'repositories/Api'
import { EVENTS } from 'react-hook-form/dist/constants'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EConfirmModalFlowEvents } from 'blms/ConfirmModalBlm/flow'

export function useApartmentsListAdapter() {
  const store = useInjection<IApartmentsStore>(ApartmentsStoreId)
  const actions = useInjection<IApartmentsListActions>(ApartmentsListActionsId)

  const data = useMemo(() => store.list, [store.list])
  const listStartLoading = useMemo(() => store.listStartLoading, [store.listStartLoading])
  const listReloadLoading = useMemo(() => store.listReloadLoading, [store.listReloadLoading])
  const listMoreLoading = useMemo(() => store.listMoreLoading, [store.listMoreLoading])
  const choosedApartment = useMemo(() => store.choosedApartment, [store.choosedApartment])
  const isLoading = useMemo(() => store.listStartLoading, [store.listStartLoading])

  const refreshList = useCallback(() => actions.reloadList(), [])
  const loadMore = useCallback(() => actions.loadListMore(), [])
  const chooseApartment = useCallback(
    (val: IApartmentsStore['choosedApartment']) => actions.chooseApartment(val),
    [],
  )
  const openApartmentDetail = useCallback(
    (val: IApartmentAdapter) => actions.openApartmentManagementCompany(val),
    [],
  )
  const deleteApartment = useCallback(
    (val: IApartmentAdapter['id']) => {
      EVENT_EMITTER.emitEvent({
        name: EConfirmModalFlowEvents.OPEN_CONFIRM_MODAL,
        data: {
          data: {
            title: 'Вы уверены?',
            desc: 'Вы удалите доступ к Вашей недвижимости',
            confirmCallback: () => {
              actions.deleteApartment(val)
            },
          },
        },
      })
    },
    [actions],
  )
  const openApartmentEdit = useCallback(
    (val: IApartmentAdapter) => actions.openApartmentEdit(val),
    [],
  )
  const openTenants = useCallback((val: IApartmentAdapter) => actions.openTenantsList(val), [])
  const openApproveScreen = useCallback(
    (val: IApartmentAdapter) => actions.openApproveScreen(val),
    [],
  )

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
    chooseApartment,
    choosedApartment,
    openApartmentDetail,
    deleteApartment,
    openApartmentEdit,
    openTenants,
    openApproveScreen,
    isLoading,
  }
}
