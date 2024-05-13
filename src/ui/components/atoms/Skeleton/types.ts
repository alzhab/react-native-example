import { DimensionValue } from 'react-native'

export interface ISkeletonProps {
  container?: boolean
  height?: DimensionValue
  width?: DimensionValue
  border?: number
  delayIn?: number
  delayOut?: number
  entering?: boolean
  exiting?: boolean
  flex?: number
}
