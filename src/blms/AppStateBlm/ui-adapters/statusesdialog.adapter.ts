import { useInjection } from 'inversify-react'
import { IMockRequestStatusesStore } from 'blms/AppStateBlm/store/types'
import { IMockRequestStatusesActions } from 'blms/AppStateBlm/actions/types'
import { useCallback, useMemo } from 'react'
import { MockRequestStatusesStoreId } from 'blms/AppStateBlm/store'
import { MockRequestStatusesActionsId } from 'blms/AppStateBlm/actions'

export function useStatusesDialogAdapter() {
  const store = useInjection<IMockRequestStatusesStore>(MockRequestStatusesStoreId)
  const actions = useInjection<IMockRequestStatusesActions>(MockRequestStatusesActionsId)

  const isOpen = useMemo(() => store.showMockRequestDialog, [store.showMockRequestDialog])
  const buttons = useMemo(() => store.statusButtons, [store.statusButtons])
  const title = useMemo(() => store.title, [store.title])

  const close = useCallback(() => actions.closeStatusesDialog(), [])

  return {
    isOpen,
    close,
    buttons,
    title,
  }
}
