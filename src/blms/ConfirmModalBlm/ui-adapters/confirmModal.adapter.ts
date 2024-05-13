import { useInjection } from 'inversify-react'
import { ConfirmModalStoreId, IConfirmModalStore } from 'blms/ConfirmModalBlm/store'
import { ConfirmModalActionsId, IConfirmModalActions } from 'blms/ConfirmModalBlm/actions'
import { useCallback, useMemo } from 'react'

export function useConfirmModalAdapter() {
  const actions = useInjection<IConfirmModalActions>(ConfirmModalActionsId)
  const store = useInjection<IConfirmModalStore>(ConfirmModalStoreId)

  const isConfirmModalOpen = useMemo(() => store.isModalOpen, [store.isModalOpen])
  const data = useMemo(() => store.confirmModalData, [store.confirmModalData])

  const closeConfirmModal = useCallback(() => {
    actions.closeConfirmModal()
    if (data.cancelCallback) {
      data.cancelCallback()
    }
  }, [actions, data])

  const acceptConfirmModal = useCallback(() => {
    actions.closeConfirmModal()
    if (data.confirmCallback) {
      data.confirmCallback()
    }
  }, [actions, data])

  return {
    isConfirmModalOpen,
    closeConfirmModal,
    data,
    acceptConfirmModal,
  }
}
