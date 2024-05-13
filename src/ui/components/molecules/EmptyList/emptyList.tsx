import React from 'react'
import { CompProps } from 'types/component.types'
import { IEmptyListProps } from './types'
import { LogoIcon } from 'icons/LogoIcon'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { LogotextIcon } from 'assets/icons/LogotextIcon'

export const EmptyList: CompProps<IEmptyListProps> = props => {
  return (
    <Animated.View
      style={{ height: props.fullHeight, alignItems: 'center', justifyContent: 'center' }}
      entering={FadeIn.duration(600).delay(300)}
      exiting={FadeOut.duration(300)}>
      <LogotextIcon size={201} color={'#708ED780'} />
    </Animated.View>
  )
}
