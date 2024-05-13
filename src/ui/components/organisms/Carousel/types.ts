import { StyleProp, ViewStyle } from 'react-native'
import { ReactElement } from 'react'
import { SPACINGS } from '@corrbo/module-theme'
import { IStepsIndicatorProps } from 'molecules/StepsIndicator'

export interface ICarouselProps {
  data: Array<any>
  renderItem: ({ item }: { item: any }) => ReactElement
  containerStyle?: StyleProp<ViewStyle>
  container?: keyof typeof SPACINGS
  stepIndicatorPosition?: 'default' | 'bottom'
  stepsIndicatorType?: IStepsIndicatorProps['type']
  itemHeight?: number
}
