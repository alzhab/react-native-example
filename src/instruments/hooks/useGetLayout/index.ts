import { useCallback, useRef, useState } from 'react'
import { LayoutChangeEvent } from 'react-native'

export function useGetLayout() {
  const [layout, setLayout] = useState<LayoutChangeEvent['nativeEvent']['layout']>()
  const refLayout = useRef<any>()

  const onLayout = useCallback(() => {
    if (refLayout && refLayout.current) {
      refLayout.current.measure(
        (x: number, y: number, width: number, height: number, pageX: number, pageY: number) =>
          setLayout({ width, height, x: pageX, y: pageY }),
      )
    }
  }, [])

  return {
    layout,
    onLayout,
    refLayout,
  }
}
