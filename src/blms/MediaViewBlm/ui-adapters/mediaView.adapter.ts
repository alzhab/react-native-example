import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { IMediaViewStore, MediaViewStoreId } from 'blms/MediaViewBlm/store'

export function useMediaViewAdapter() {
  const store = useInjection<IMediaViewStore>(MediaViewStoreId)

  const isOpen = useMemo(() => store.isOpen, [store.isOpen])
  const data = useMemo(() => store.data, [store.data])

  const close = useCallback(() => {
    store.setIsOpen(false)
    store.setData(null)
  }, [])

  return {
    isOpen,
    close,
    data,
  }
}
