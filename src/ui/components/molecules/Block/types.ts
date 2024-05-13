import { FC } from 'react'
import { IIconProps } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'
import { FONTS_TYPES } from 'configs/Theme/fonts/types'
import { DimensionValue, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { TYPOGRAPHY } from '@corrbo/module-theme'

type VARIANTS =
  | 'transparent'
  | 'variant1'
  | 'variant2'
  | 'variant3'
  | 'variant4'
  | 'variant5'
  | 'variant6'
  | 'variant7'
  | 'variant8'
  | 'variant9'

export interface IBlockProps {
  width?: DimensionValue
  height?: DimensionValue
  iconSize?: number
  bg?: 'disabled' | VARIANTS
  iconColor?: VARIANTS
  borderColor?: VARIANTS
  textColor?: VARIANTS
  border?: number | boolean | string
  radius?: number
  iconActive?: boolean
  textType?: keyof typeof TYPOGRAPHY
  onPress?: () => void
  icon?: FC<IIconProps & Spacings>
  text?: string
  rl?: boolean
  gap?: number
  textSize?: number
  textLineHeight?: number
  textStyle?: StyleProp<TextStyle>
  textFamily?: FONTS_TYPES
  style?: StyleProp<ViewStyle>
  textNumbersOfLine?: number
  jc?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
}
