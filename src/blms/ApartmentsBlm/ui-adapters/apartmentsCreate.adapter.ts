import { useInjection } from 'inversify-react'
import { useCallback, useEffect, useMemo } from 'react'
import { ApartmentsCreateActionsId, IApartmentsCreateActions } from 'blms/ApartmentsBlm/actions'
import { ApartmentsStoreId, IApartmentsStore } from 'blms/ApartmentsBlm/store'
import { IUserTypeEnum } from 'repositories/Api/models'

export function useApartmentsCreateAdapter() {
  const store = useInjection<IApartmentsStore>(ApartmentsStoreId)
  const actions = useInjection<IApartmentsCreateActions>(ApartmentsCreateActionsId)

  const isModalOpen = useMemo(() => store.createModalOpen, [store.createModalOpen])
  const step = useMemo(() => store.createStep, [store.createStep])
  const createLoading = useMemo(() => store.createLoading, [store.createLoading])

  const openModal = useCallback(() => actions.openModal(), [])
  const submitApartmentInfo = useCallback(
    (data: IApartmentsStore['createData']) => actions.submitApartmentInfo(data),
    [],
  )
  const submitRole = useCallback(
    (data: { type_user: IUserTypeEnum }) => actions.submitRoleInfo(data),
    [],
  )
  const closeModal = useCallback(() => actions.closeModal(), [])

  const defaultData = useMemo(() => store.apartmentDetail, [store.apartmentDetail])

  useEffect(() => {
    if (!isModalOpen) {
      store.setApartmentDetail(null)
    }
  }, [isModalOpen])

  return {
    isModalOpen,
    openModal,
    closeModal,
    submitApartmentInfo,
    submitRole,
    step,
    createLoading,
    defaultData,
  }
}
