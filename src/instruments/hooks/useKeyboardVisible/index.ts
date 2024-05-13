import { useEffect, useState } from 'react'
import { Keyboard, KeyboardEvent } from 'react-native'

export function useKeyboardVisible() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e: KeyboardEvent) => {
      setKeyboardVisible(true) // or some other action
      setKeyboardHeight(e.endCoordinates.height)
    })
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (e: KeyboardEvent) => {
      setKeyboardVisible(false) // or some other action
      setKeyboardHeight(0)
    })

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  return { keyboardHeight, isKeyboardVisible }
}
