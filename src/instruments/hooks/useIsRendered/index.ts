import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { InteractionManager } from 'react-native'

export const useIsRendered = (delay?: number) => {
  const [isRendered, setIsRendered] = useState(false)

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        if (delay) {
          setTimeout(() => {
            setIsRendered(true)
          }, delay)
        } else {
          setIsRendered(true)
        }
      })

      return () => {
        task.cancel()
      }
    }, []),
  )

  return isRendered
}
