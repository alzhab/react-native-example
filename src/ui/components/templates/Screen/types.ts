import { ReactElement } from 'react'
import { IScreenHeaderProps } from 'templates/ScreenHeader'
import { SPACINGS } from '@corrbo/module-theme'

export interface IScreenProps {
  headerProps?: IScreenHeaderProps
  content: (fullHeight: number, animationFinished: boolean) => ReactElement
  container?: keyof typeof SPACINGS
  inBottomBar?: boolean
  isLoading?: boolean
  isRendered?: boolean
  scroll?: boolean
}
