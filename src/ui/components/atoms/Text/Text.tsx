import React from 'react'
import { ITextProps } from './types'
import { StyleSheet, Text as TextLib, TextProps } from 'react-native'
import { CompProps } from 'types/component.types'
import { TYPOGRAPHY, useTheme } from '@corrbo/module-theme'
import { Spacings, useSpacings } from '@corrbo/module-spacing-props'

export const Text: CompProps<ITextProps & TextProps & Spacings> = props => {
  const { colors } = useTheme()
  const { margin, padding } = useSpacings(props)

  return (
    <TextLib
      {...props}
      style={[
        {
          textAlign: props.ta || undefined,
          color: colors[props.color || 'default_text'],
          fontWeight: props.weight || '400',
        },
        margin,
        padding,
        TYPOGRAPHY[props.type || 'default_text'],
        props.wrap && style.wrap,
        props.style,
      ]}>
      {props.children}
    </TextLib>
  )
}

const style = StyleSheet.create({
  wrap: { flex: 1, flexWrap: 'wrap' },
})
