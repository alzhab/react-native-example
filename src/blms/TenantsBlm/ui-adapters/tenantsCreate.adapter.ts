import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { ITenantCreateData, ITenantsCreateActions, TenantsCreateActionsId } from '../actions'
import { ITenantsStore, TenantsStoreId } from 'blms/TenantsBlm/store'

export function useTenantsCreateAdapter() {
  const actions = useInjection<ITenantsCreateActions>(TenantsCreateActionsId)
  const store = useInjection<ITenantsStore>(TenantsStoreId)

  const isCreateModalOpen = useMemo(() => store.createModalOpen, [store.createModalOpen])

  const submit = useCallback((data: ITenantCreateData) => actions.submit(data), [])
  const openCreateModal = useCallback(() => actions.openCreateModal(), [])
  const closeCreateModal = useCallback(() => actions.closeCreateModal(), [])

  return {
    submit,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
  }
}
