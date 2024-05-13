import React, { useMemo } from 'react'
import { CompProps } from 'types/component.types'
import { ISkeletonListProps } from './types'
import { SPACINGS } from '@corrbo/module-theme'
import { Skeleton } from 'atoms/Skeleton'
import Animated from 'react-native-reanimated'
import { elemExiting, SKEL_OUT } from 'configs/Theme/constants'

const GAP = 10

export const SkeletonList: CompProps<ISkeletonListProps> = props => {
  const count = useMemo(() => props.count || 4, [props.count])
  const listItemsCount = useMemo(
    () => (props.list ? props.list.filter(item => typeof item !== 'boolean').length : 0),
    [props.list],
  )
  const countCheck = useMemo(() => {
    if (!props.list) {
      return count
    } else {
      if (props.list.length < count) {
        return count - listItemsCount
      } else {
        return props.list.length - listItemsCount
      }
    }
  }, [count, listItemsCount, props.list])

  const gapCount = useMemo(
    () => (props.list ? (props.list.length < count ? count : props.list.length) - 1 : count - 1),
    [count, props.list],
  )
  const listItemsSumHeight = useMemo(
    () =>
      props.list
        ? props.list.reduce((prev, item) => prev + (typeof item !== 'boolean' ? item.height : 0), 0)
        : 0,
    [props.list],
  )
  const full_height = useMemo(() => {
    return (
      props.fullHeight -
      GAP * gapCount -
      listItemsSumHeight -
      (props.topSpace || 0) -
      (props.bottomSpace || 0)
    )
  }, [gapCount, listItemsSumHeight, props.bottomSpace, props.fullHeight, props.topSpace])

  const item_height = useMemo(
    () => props.height || full_height / countCheck,
    [countCheck, full_height, props.height],
  )
  const list = useMemo(() => {
    if (!props.list) {
      return Array(props.count).fill({ height: item_height })
    } else if (props.fill && props.list.length < count) {
      return [
        ...props.list.map(item => (typeof item === 'boolean' ? { height: item_height } : item)),
        ...Array(count - props.list.length).fill({ height: item_height }),
      ]
    } else {
      return props.list.map(item => (typeof item === 'boolean' ? { height: item_height } : item))
    }
  }, [count, item_height, props.count, props.fill, props.list])

  return (
    <Animated.View
      exiting={elemExiting({ duration: SKEL_OUT })}
      style={{
        alignItems: 'center',
        paddingHorizontal: props.container ? SPACINGS[props.container] : 0,
        gap: GAP,
        paddingTop: props.topSpace,
        paddingBottom: props.bottomSpace,
      }}>
      {list.map(({ height, width, border }, index) => (
        <Skeleton
          key={index}
          border={border || props.border}
          width={width || '100%'}
          height={height}
        />
      ))}
    </Animated.View>
  )
}

SkeletonList.defaultProps = {
  count: 4,
  border: 10,
}
