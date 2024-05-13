import React from 'react'
import { IViewProps } from './types'
import { View as ViewLib } from 'react-native'
import { useSpacings } from '@corrbo/module-spacing-props'
import { CompProps } from 'types/component.types'

export const View: CompProps<IViewProps> = props => {
  const { margin, padding } = useSpacings(props)

  return (
    <ViewLib
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
      {props.children}
    </ViewLib>
  )
}
