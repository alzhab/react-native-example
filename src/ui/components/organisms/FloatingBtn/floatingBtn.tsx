/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { CompProps } from 'types/component.types'
import { IFloatingBtnProps } from 'organisms/FloatingBtn/types'
import { ICreateStyles, useStyles } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { SCREEN_HEIGHT, SCREEN_WIDTH, WIDTH } from 'configs/Theme/constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface AnimatedPosition {
  x: Animated.SharedValue<number>
  y: Animated.SharedValue<number>
}

const useFollowAnimatePosition = ({ x, y }: AnimatedPosition) => {
  const followLeft = useDerivedValue(() => {
    return withSpring(x.value, { duration: 1000 })
  })

  const followTop = useDerivedValue(() => {
    return withSpring(y.value, { duration: 1000 })
  })

  const rStyle = useAnimatedStyle(() => ({
    top: followTop.value,
    left: followLeft.value,
  }))

  return { followTop, followLeft, rStyle }
}

export const FloatingBtn: CompProps<IFloatingBtnProps> = ({ width, children }) => {
  const styles = useStyles(SS, { width })
  const top = useSharedValue(width)
  const left = useSharedValue(width)
  const context = useSharedValue({ x: 0, y: 0 })
  const edges = useSafeAreaInsets()

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: top.value, y: left.value }
    })
    .onUpdate(event => {
      top.value = event.absoluteX
      left.value = event.absoluteY
    })
    .onEnd(event => {
      if (event.absoluteX > SCREEN_WIDTH - 150) {
        top.value = SCREEN_WIDTH - width / 2
      } else if (event.absoluteX < 150) {
        top.value = width / 2
      }

      if (event.absoluteY > SCREEN_HEIGHT - 150) {
        left.value = SCREEN_HEIGHT - width / 2 + edges.bottom
      } else if (event.absoluteY < 150) {
        left.value = width / 2 + edges.top
      }
    })

  const { rStyle: blueRStyle } = useFollowAnimatePosition({
    x: top,
    y: left,
  })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.btn, blueRStyle]}>{children}</Animated.View>
    </GestureDetector>
  )
}

const SS: ICreateStyles<IFloatingBtnProps> = ({ props }) =>
  ScaledSheet.create({
    btn: {
      position: 'absolute',
      zIndex: 999,
      top: 30,
      left: 30,
      transform: [
        { translateX: -(props?.width || 2) / 2 },
        { translateY: -(props?.width || 2) / 2 },
      ],
    },
  })
