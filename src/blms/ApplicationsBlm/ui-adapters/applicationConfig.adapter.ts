import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { ApplicationsStoreId, IApplicationsStore } from 'blms/ApplicationsBlm/store'

export function useApplicationConfigAdapter() {
  const store = useInjection<IApplicationsStore>(ApplicationsStoreId)

  const types = useMemo(() => store.types, [store.types])
  const getCategories = useCallback(
    (id: number) => {
      const type = store.types.find(item => item.id === id)

      return type ? type.category : []
    },
    [store.types],
  )

  return { getCategories, types }
}
