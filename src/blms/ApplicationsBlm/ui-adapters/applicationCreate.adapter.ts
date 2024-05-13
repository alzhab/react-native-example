import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { InteractionManager } from 'react-native'
import { ApplicationsStoreId, IApplicationsStore } from 'blms/ApplicationsBlm/store'
import {
  ApplicationCreateActionsId,
  IApplicationCreateActions,
  IApplicationSubmitData,
} from 'blms/ApplicationsBlm/actions'

export function useApplicationCreateAdapter() {
  const actions = useInjection<IApplicationCreateActions>(ApplicationCreateActionsId)
  const store = useInjection<IApplicationsStore>(ApplicationsStoreId)

  const submit = useCallback((data: IApplicationSubmitData) => actions.submit(data), [])
  const createSuccessId = useMemo(() => store.createSuccessId, [store.createSuccessId])

  useFocusEffect(
    useCallback(() => {
      return () => {
        InteractionManager.runAfterInteractions(() => {
          actions.clear()
        })
      }
    }, []),
  )

  return { submit, createSuccessId }
}
