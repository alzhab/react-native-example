import { useInjection } from 'inversify-react'
import { IInProgressStore, InProgressStoreId } from 'blms/InProgressBlm/store'
import { useCallback, useMemo } from 'react'

export function useInProgressAdapter() {
  const store = useInjection<IInProgressStore>(InProgressStoreId)

  const isOpen = useMemo(() => store.isPlugOpen, [store.isPlugOpen])

  const close = useCallback(() => store.setIsPlugOpen(false), [])

  return {
    isOpen,
    close,
  }
}
