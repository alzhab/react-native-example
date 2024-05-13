import React, { useEffect } from 'react'
import { CompProps } from 'types/component.types'
import { IGlobalLoadingProps } from './types'
import { ICreateStyles, useStyles } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { ELEM_IN, ELEM_OUT } from 'configs/Theme/constants'
import { observer } from 'mobx-react'
import { Loading } from 'molecules/Loading'
import { Keyboard } from 'react-native'
import { useGlobalLoadingAdapter } from 'blms/GlobalLoadingBlm/ui-adapters'

export const GlobalLoading: CompProps<IGlobalLoadingProps> = observer(() => {
  const styles = useStyles(SS)
  const { isVisible } = useGlobalLoadingAdapter()

  useEffect(() => {
    if (isVisible) {
      Keyboard.dismiss()
    }
  }, [isVisible])

  return isVisible ? (
    <Animated.View
      entering={FadeIn.duration(ELEM_IN)}
      exiting={FadeOut.duration(ELEM_OUT)}
      style={styles.container}>
      <Loading size={150} />
    </Animated.View>
  ) : null
})
const SS: ICreateStyles = ({ colors }) =>
  ScaledSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999,
      backgroundColor: colors.global_loading_bg,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
