import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { IRecoverPasswordStore, RecoverPasswordStoreId } from 'blms/RecoverPasswordBlm/store'
import { IRecoverPasswordActions, RecoverPasswordActionsId } from 'blms/RecoverPasswordBlm/actions'

export function useRecoverPasswordModalAdapter() {
  const store = useInjection<IRecoverPasswordStore>(RecoverPasswordStoreId)
  const actions = useInjection<IRecoverPasswordActions>(RecoverPasswordActionsId)

  const isModalOpen = useMemo(() => store.showRecoverModal, [store.showRecoverModal])

  const openModal = useCallback(() => actions.openModal(), [])
  const closeModal = useCallback(() => actions.closeModal(), [])

  const onCodeSubmit = useCallback(
    (val: { phone: string; code: string }) => actions.onCodeSubmit(val),
    [],
  )

  return {
    isModalOpen,
    openModal,
    closeModal,
    onCodeSubmit,
  }
}

export function useRecoverPasswordOpenModalAdapter() {
  const actions = useInjection<IRecoverPasswordActions>(RecoverPasswordActionsId)

  const openModal = useCallback(() => actions.openModal(), [])

  return {
    openModal,
  }
}
