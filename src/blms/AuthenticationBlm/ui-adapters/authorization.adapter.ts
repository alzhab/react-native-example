import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import {
  AuthorizationActionsId,
  IAuthorizationActions,
  IAuthorizationData,
} from 'blms/AuthenticationBlm/actions'
import { AuthenticationStoreId, IAuthenticationStore } from 'blms/AuthenticationBlm/store'
import { InteractionManager } from 'react-native'

export function useAuthorizationAdapter() {
  const authorizationAction = useInjection<IAuthorizationActions>(AuthorizationActionsId)
  const authenticationStore = useInjection<IAuthenticationStore>(AuthenticationStoreId)

  const formSubmit = useCallback((data: IAuthorizationData) => {
    authorizationAction.authorizeSubmit(data)
  }, [])

  const showPasswordConfirm = useMemo(
    () => authenticationStore.showPasswordConfirm,
    [authenticationStore.showPasswordConfirm],
  )

  const clear = useCallback(() => authorizationAction.clear(), [])

  useFocusEffect(
    useCallback(() => {
      return () => {
        InteractionManager.runAfterInteractions(() => {
          authorizationAction.clear()
        })
      }
    }, []),
  )

  return {
    formSubmit,
    showPasswordConfirm,
    clear,
  }
}
