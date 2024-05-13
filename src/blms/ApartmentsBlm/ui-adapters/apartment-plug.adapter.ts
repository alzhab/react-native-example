import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { IApartmentPlugActions } from '../actions/types'
import { ApartmentsStoreId, IApartmentsStore } from '../store'
import { ApartmentPlugActionsId } from '../actions'

export function useApartmentPlugAdapter() {
  const store = useInjection<IApartmentsStore>(ApartmentsStoreId)
  const actions = useInjection<IApartmentPlugActions>(ApartmentPlugActionsId)

  const isOpen = useMemo(() => store.isPlugModalOpen, [store.isPlugModalOpen])
  const plugType = useMemo(() => store.plugType, [store.plugType])

  const close = useCallback(() => actions.close(), [])

  return {
    isOpen,
    close,
    plugType,
  }
}
