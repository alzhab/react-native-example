import { FC, ReactElement } from 'react'
import { StyleProp, TextInputProps, ViewStyle } from 'react-native'
import { IIconProps } from '@corrbo/module-icon'
import { Mask } from 'react-native-mask-input/src/formatWithMask.types'
import { Control } from 'react-hook-form/dist/types/form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { IColors, SPACINGS } from '@corrbo/module-theme'

export type IInputProps = TextInputProps & {
  control: Control<any, any>
  name: string
  rules?: Omit<
    RegisterOptions<any, any>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  Icon?: FC<IIconProps>
  iconPosition?: 'left' | 'right'
  iconSize?: number
  iconColor?: keyof IColors
  textarea?: boolean
  nospace?: boolean
  type?: 'default' | 'outline' | 'dark'
  label?: string
  containerStyle?: StyleProp<ViewStyle>
  help?: string
  borderRadius?: number
  mask?: Mask
  LeftElem?: (value?: any) => ReactElement | null
  isPhone?: boolean
  inputHeight?: number
  container?: keyof typeof SPACINGS
  gap?: number
  inputRef?: any
}
