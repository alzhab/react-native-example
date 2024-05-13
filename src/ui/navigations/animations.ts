import { StackCardInterpolationProps } from '@react-navigation/stack/src/types'
import { HEIGHT, WIDTH } from 'configs/Theme/constants'

export const slideFromRight = ({ current }: StackCardInterpolationProps) => {
  const translateX = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [WIDTH, 0],
    extrapolate: 'clamp',
  })

  return {
    cardStyle: {
      transform: [{ translateX }],
    },
  }
}

export const slideFromBottom = ({ current }: StackCardInterpolationProps) => {
  const translateY = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [HEIGHT / 2, 0],
    extrapolate: 'clamp',
  })

  const opacity = current.progress.interpolate({
    inputRange: [0, 0, 0.8],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  })

  return {
    cardStyle: {
      opacity,
      transform: [{ translateY }],
    },
  }
}
