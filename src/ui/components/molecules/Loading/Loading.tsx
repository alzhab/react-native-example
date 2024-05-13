import LottieView from 'lottie-react-native'
import React from 'react'
import { View } from 'react-native'
import { CompProps } from 'types/component.types'
import { ILoadingProps } from './types'
import { Spacings, useSpacings } from '@corrbo/module-spacing-props'
import { IViewProps } from 'atoms/View'

export const Loading: CompProps<IViewProps & ILoadingProps & Spacings> = props => {
  const { margin, padding } = useSpacings(props)

  return (
    <View
      {...props}
      ref={undefined}
      style={[props.style, { width: props.size, height: props.size }, margin, padding]}>
      <LottieView
        source={require('assets/lottie/loader.json')}
        autoPlay
        loop
        resizeMode={'cover'}
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  )
}
