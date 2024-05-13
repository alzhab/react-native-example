import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { ITempPasswordActions, TempPasswordActionsId } from 'blms/TenantsBlm/actions'
import { ITenantsStore, TenantsStoreId } from 'blms/TenantsBlm/store'

export function useTempPasswordAdapter() {
  const actions = useInjection<ITempPasswordActions>(TempPasswordActionsId)
  const store = useInjection<ITenantsStore>(TenantsStoreId)

  const isTempModalOpen = useMemo(() => store.tempPasswordModalOpen, [store.tempPasswordModalOpen])
  const tempData = useMemo(() => store.tempPasswordModalData, [store.tempPasswordModalData])

  const closeTempModal = useCallback(() => actions.closeTempModal(), [])

  const copy = useCallback(() => actions.copy(), [])
  const share = useCallback(() => actions.share(), [])

  return {
    isTempModalOpen,
    tempData,
    closeTempModal,
    copy,
    share,
  }
}
