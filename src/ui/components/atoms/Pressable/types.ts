import { LegacyRef } from 'react'
import { TouchableOpacity } from 'react-native'

export interface IPressableProps {
  activeOpacity?: number
  elemRef?: LegacyRef<TouchableOpacity> | undefined
}
