import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { FloatInfoStoreId, IFloatInfoStore } from 'blms/FloatInfoBlm/store'

export function useFloatInfoAdapter() {
  const store = useInjection<IFloatInfoStore>(FloatInfoStoreId)

  const desc = useMemo(() => store.desc, [store.desc])
  const buttons = useMemo(() => store.buttons, [store.buttons])
  const layout = useMemo(() => store.layout, [store.layout])
  const isVisible = useMemo(() => store.isVisible, [store.isVisible])

  const close = useCallback(() => {
    store.setDesc('')
    store.setButtons([])
    store.setIsVisible(false)
    store.setLayout({ x: 0, y: 0, width: 0 })
  }, [])

  return {
    desc,
    layout,
    isVisible,
    close,
    buttons,
  }
}
