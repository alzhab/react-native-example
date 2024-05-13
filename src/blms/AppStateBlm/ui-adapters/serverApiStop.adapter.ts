import { useInjection } from 'inversify-react'
import { IServerapistopStore } from 'blms/AppStateBlm/store/types'
import { useCallback, useMemo } from 'react'
import { ServerapistopStoreId } from 'blms/AppStateBlm/store'
import { IServerApiStopActions, ServerApiStopActionsId } from 'blms/AppStateBlm/actions'

export function useServerApiStopAdapter() {
  const store = useInjection<IServerapistopStore>(ServerapistopStoreId)
  const actions = useInjection<IServerApiStopActions>(ServerApiStopActionsId)

  const isPlugOpen = useMemo(() => store.isPlugOpen, [store.isPlugOpen])

  const refresh = useCallback(() => actions.refreshCheck(), [])

  return {
    isPlugOpen,
    refresh,
  }
}
