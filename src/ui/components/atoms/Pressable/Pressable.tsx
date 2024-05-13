import React from 'react'
import { IPressableProps } from './types'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { CompProps } from 'types/component.types'
import { Spacings, useSpacings } from '@corrbo/module-spacing-props'
import { IViewProps } from 'atoms/View'

export const Pressable: CompProps<
  IPressableProps & TouchableOpacityProps & Spacings & IViewProps
> = ({ children, ...props }) => {
  const { margin, padding } = useSpacings(props)

  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity || 0.7}
      {...props}
      style={[
        {
          flexWrap: props.wrap,
          flex: props.flex ? (Number.isNaN(props.flex) ? 1 : +props.flex) : undefined,
          flexDirection: props.dir,
          width: props.full ? '100%' : undefined,
          justifyContent: props.jc,
          alignItems: props.ai,
          gap: props?.gap,
          columnGap: props?.columnGap,
          rowGap: props?.rowGap,
        },
        margin,
        padding,
        props.style,
      ]}
      ref={props.elemRef}>
      {children}
    </TouchableOpacity>
  )
}
