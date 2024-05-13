import { useInjection } from 'inversify-react'
import { useCallback, useMemo, useState } from 'react'
import { toJS } from 'mobx'
import { ApplicationsStoreId, IApplicationsStore } from 'blms/ApplicationsBlm/store'
import { ApplicationListActionsId, IApplicationListActions } from 'blms/ApplicationsBlm/actions'

export function useApplicationsFilterAdapter() {
  const [isOpen, setIsOpen] = useState(false)
  const store = useInjection<IApplicationsStore>(ApplicationsStoreId)
  const actions = useInjection<IApplicationListActions>(ApplicationListActionsId)

  const filters = useMemo(() => toJS(store.listFilters), [])

  const clearFilter = useCallback(() => {
    actions.clearFilter()
    setIsOpen(false)
  }, [actions])

  const setFilter = useCallback(
    (data: Partial<IApplicationsStore['listFilters']>) => actions.setFilter(data),
    [],
  )
  const close = useCallback(() => setIsOpen(false), [])
  const open = useCallback(() => setIsOpen(true), [])

  return {
    filters,
    clearFilter,
    setFilter,
    isOpen,
    close,
    open,
  }
}
