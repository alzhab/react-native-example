import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { InteractionManager } from 'react-native'
import { ITenantsStore, TenantsStoreId } from '../store'
import {
  ITenantDeleteActions,
  ITenantsListActions,
  ITenantsPermissionChangeActions,
  TenantDeleteActionsId,
  TenantsListActionsId,
  TenantsPermissionChangeActionsId,
} from 'blms/TenantsBlm/actions'
import { useApartmentDetailAdapter } from 'blms/ApartmentsBlm/ui-adapters/apartmentDetail.adapter'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { ITenant, ITenantStatus } from 'repositories/Api'

export function useTenantsListAdapter() {
  const store = useInjection<ITenantsStore>(TenantsStoreId)
  const actions = useInjection<ITenantsListActions>(TenantsListActionsId)
  const deleteActions = useInjection<ITenantDeleteActions>(TenantDeleteActionsId)
  const permissionsActions = useInjection<ITenantsPermissionChangeActions>(
    TenantsPermissionChangeActionsId,
  )
  const navigation = useNavigation()

  const { data: apartment } = useApartmentDetailAdapter()
  const data = useMemo(() => store.list, [store.list])
  const listStartLoading = useMemo(() => store.listStartLoading, [store.listStartLoading])
  const listReloadLoading = useMemo(() => store.listReloadLoading, [store.listReloadLoading])
  const listMoreLoading = useMemo(() => store.listMoreLoading, [store.listMoreLoading])

  const refreshList = useCallback(() => actions.reloadList(), [])
  const loadMore = useCallback(() => actions.loadListMore(), [])
  const deleteTenant = useCallback((id: ITenant['id']) => deleteActions.openConfirmModal(id), [])
  const changePermissionApplication = useCallback(
    (d: { id: ITenant['id']; val: boolean }) => permissionsActions.changePermissionApplication(d),
    [],
  )
  const changePermissionVote = useCallback(
    (d: { id: ITenant['id']; val: boolean }) => permissionsActions.changePermissionVote(d),
    [],
  )
  const changeTenantToApprove = useCallback(
    (d: { id: ITenant['id']; val: ITenantStatus }) => permissionsActions.changeTenantToApprove(d),
    [],
  )

  useFocusEffect(
    useCallback(() => {
      if (apartment) {
        InteractionManager.runAfterInteractions(() => {
          actions.getListStart()
        })
      } else {
        navigation.goBack()
      }

      return () => {
        actions.clearListStart()
      }
    }, [apartment]),
  )

  return {
    data,
    listStartLoading,
    listReloadLoading,
    listMoreLoading,
    refreshList,
    loadMore,
    apartment,
    deleteTenant,
    changePermissionApplication,
    changePermissionVote,
    changeTenantToApprove,
  }
}
