import { useInjection } from 'inversify-react'
import { useMemo } from 'react'
import { AuthenticationStoreId, IAuthenticationStore } from '../store'

export function useIsAuthorziedAdapter() {
  const authStore = useInjection<IAuthenticationStore>(AuthenticationStoreId)

  const isAuthorized = useMemo(() => authStore.isAuthorized, [])

  return {
    isAuthorized,
  }
}
