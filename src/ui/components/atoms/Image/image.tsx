import React, { useState } from 'react'
import { Image as ImageLib, ImageProps, View } from 'react-native'
import { CompProps } from 'types/component.types'
import { IImageProps } from './types'
import { Spacings, useSpacings } from '@corrbo/module-spacing-props'
import { useTheme } from '@corrbo/module-theme'
import { Loading } from 'molecules/Loading'

export const Image: CompProps<IImageProps & ImageProps & Spacings> = props => {
  const { margin, padding } = useSpacings(props)
  const [isError, setIsError] = useState(false)
  const { colors } = useTheme()

  return !isError && props.source ? (
    <ImageLib
      {...props}
      style={[margin, padding, { backgroundColor: colors.image_bg }, props.style]}
      onError={() => {
        setIsError(true)
      }}
    />
  ) : (
    <View
      {...props}
      style={[
        {
          backgroundColor: colors.image_bg,
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.style,
        margin,
        padding,
      ]}>
      <Loading size={props.iconSize || 100} />
    </View>
  )
}
