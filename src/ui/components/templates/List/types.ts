import { ListRenderItem } from '@react-native/virtualized-lists'
import { ITabsProps } from 'molecules/Tabs'
import { SPACINGS } from '@corrbo/module-theme'

export interface IListProps {
  data:
    | Array<any>
    | {
        [key: string]: Array<any>
      }
  tabsProps?: ITabsProps
  loading: boolean
  renderItem: ListRenderItem<any>
  more?: {
    loading: boolean
    handler: () => void
  }
  moreLoading?: boolean
  moreHandler?(): void
  refresh?: {
    loading: boolean
    handler: () => void
  }
  container?: keyof typeof SPACINGS
  bottom_offset?: number
}
