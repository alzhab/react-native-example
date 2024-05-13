import { View, ViewProps } from 'react-native'
import { Spacings } from '@corrbo/module-spacing-props'
import { LegacyRef } from 'react'

export type IViewProps = ViewProps &
  Spacings & {
    flex?: boolean | number
    full?: boolean
    jc?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
    ai?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
    dir?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
    wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
    gap?: number
    rowGap?: number
    columnGap?: number
    elemRef?: LegacyRef<View> | undefined
  }
