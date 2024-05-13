import { SPACINGS } from '@corrbo/module-theme'

export interface ISkeletonListProps {
  fullHeight: number
  count?: number
  container?: keyof typeof SPACINGS
  height?: number
  border?: number
  list?: ({ height: number; border?: number; width?: number } | true)[]
  // если включена то список будет дополнятся по count и list
  fill?: boolean
  bottomSpace?: number
  topSpace?: number
}
