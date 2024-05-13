import { useInjection } from 'inversify-react'
import { useCallback } from 'react'
import { IRecoverPasswordActions, RecoverPasswordActionsId } from 'blms/RecoverPasswordBlm/actions'
import { useFocusEffect } from '@react-navigation/native'

export function useRecoverPasswordFormAdapter() {
  const actions = useInjection<IRecoverPasswordActions>(RecoverPasswordActionsId)

  const submit = useCallback(
    (val: { password: string }) => actions.onPasswordSubmit(val.password),
    [],
  )

  useFocusEffect(
    useCallback(() => {
      return () => {
        actions.clear()
      }
    }, []),
  )

  return {
    submit,
  }
}
