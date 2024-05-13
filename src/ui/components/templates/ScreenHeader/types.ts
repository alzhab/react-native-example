import { StyleProp, ViewProps, ViewStyle } from 'react-native'
import { Spacings } from '@corrbo/module-spacing-props'
import { IColors } from '@corrbo/module-theme'

export type IScreenHeaderProps = Spacings & {
  title?: string
  titleIcon?: boolean
  back?: boolean
  backPress?: () => void
  profile?: boolean
  onLayout?: ViewProps['onLayout']
  style?: StyleProp<ViewStyle>
  titleColor?: keyof IColors
}
