import React, { useEffect } from 'react'
import { CompProps } from 'types/component.types'
import { ISkeletonProps } from './types'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { Spacings, useSpacings } from '@corrbo/module-spacing-props'
import { SPACINGS } from '@corrbo/module-theme'

export const Skeleton: CompProps<ISkeletonProps & Spacings> = props => {
  const anim = useSharedValue(1)
  const { margin, padding } = useSpacings(props)

  useEffect(() => {
    anim.value = withRepeat(
      withSequence(
        withTiming(0, {
          duration: 3000,
        }),
        withTiming(1, {
          duration: 3000,
        }),
      ),
      Infinity,
      true,
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(anim.value, [0.3, 1], ['#708ED7', '#9CB9FF'])

    return {
      backgroundColor,
    }
  })

  return (
    <Animated.View
      style={{
        paddingHorizontal: props.container ? SPACINGS.container_20 : 0,
        width: props.width || '100%',
        flex: props.flex,
      }}>
      <Animated.View
        style={[
          {
            width: '100%',
            height: props.height || 150,
            borderRadius: props.border || 0,
          },
          animatedStyle,
          margin,
          padding,
        ]}
      />
    </Animated.View>
  )
}

Skeleton.defaultProps = {
  entering: true,
  exiting: true,
}
