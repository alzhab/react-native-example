import { useInjection } from 'inversify-react'
import { useMemo } from 'react'
import { GlobalLoadingStoreId, IGlobalLoadingStore } from 'blms/GlobalLoadingBlm/store'

export function useGlobalLoadingAdapter() {
  const store = useInjection<IGlobalLoadingStore>(GlobalLoadingStoreId)

  const isVisible = useMemo(() => store.isVisible, [store.isVisible])

  return {
    isVisible,
  }
}
