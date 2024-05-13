import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { IPlugActions } from '../actions/types'
import { AuthenticationStoreId, IAuthenticationStore } from '../store'
import { PlugActionsId } from '../actions'

export function useAuthPlugAdapter() {
  const authStore = useInjection<IAuthenticationStore>(AuthenticationStoreId)
  const plugActions = useInjection<IPlugActions>(PlugActionsId)

  const isOpen = useMemo(() => authStore.isPlugModalOpen, [authStore.isPlugModalOpen])

  const close = useCallback(() => plugActions.close(), [])

  return {
    isOpen,
    close,
  }
}
