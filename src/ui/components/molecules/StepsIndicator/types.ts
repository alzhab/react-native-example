import Animated from 'react-native-reanimated'

export interface IStepsIndicatorProps {
  steps: number
  size?: number
  type?: 'light' | 'default' | 'gray'
  progressValue: Animated.SharedValue<number>
}
