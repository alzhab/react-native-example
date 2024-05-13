import React, { FC, useEffect, useState } from 'react'
import { InteractionManager } from 'react-native'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { IBootProps } from './types'
import { observer } from 'mobx-react'
import { LogoIcon } from 'icons/LogoIcon'
import { BOOT_DEL, HEIGHT } from 'configs/Theme/constants'
import { Loading } from 'molecules/Loading'
import { View } from 'atoms/View'

export const Boot: FC<IBootProps> = observer(({ hide }) => {
  const offset = useSharedValue(0)
  const [show, setShow] = useState(true)

  const animatedStyles = useAnimatedStyle(() => {
    const translateY = interpolate(offset.value, [0, 1], [0, HEIGHT])
    const opacity = interpolate(offset.value, [0, 1], [1, 0])

    return {
      transform: [{ translateY }],
      opacity,
    }
  })

  useEffect(() => {
    if (hide) {
      InteractionManager.runAfterInteractions(() => {
        offset.value = withTiming(1, {
          duration: BOOT_DEL,
          easing: Easing.inOut(Easing.quad),
        })
        setTimeout(() => {
          setShow(false)
        }, BOOT_DEL + 100)
      })
    }
  }, [hide])

  return show ? (
    <Animated.View
      style={[
        {
          position: 'absolute',
          zIndex: 2,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        },
        animatedStyles,
      ]}>
      <LogoIcon size={150} />
      <View style={{ position: 'absolute', top: HEIGHT / 2 + 180 }}>
        <Loading size={150} />
      </View>
    </Animated.View>
  ) : null
})
