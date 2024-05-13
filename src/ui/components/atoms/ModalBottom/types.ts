import { ReactElement } from 'react'
import { SPACINGS } from '@corrbo/module-theme'
import { DimensionValue } from 'react-native'

export interface IModalBottomProps {
  visible: boolean
  close?: () => void
  empty?: boolean
  hasBackdrop?: boolean
  header?: ReactElement
  maxHeight?: DimensionValue
  minHeight?: DimensionValue
  contentContainer?: keyof typeof SPACINGS
  backdropColor?: string
  scroll?: boolean
  isForm?: boolean
}
