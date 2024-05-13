import React, { useCallback } from 'react'
import { CompProps } from 'types/component.types'
import { IInfoBtnProps } from './types'
import { View } from 'atoms/View'
import { InfoIcon } from 'icons/InfoIcon'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EFloatInfoFlowEvents } from 'blms/FloatInfoBlm/flow'
import { useGetLayout } from 'hooks/useGetLayout'

const ICON_SIZE = 40

export const InfoBtn: CompProps<IInfoBtnProps> = props => {
  const { refLayout, onLayout, layout } = useGetLayout()

  const open = useCallback(() => {
    EVENT_EMITTER.emitEvent({
      name: EFloatInfoFlowEvents.SHOW_FLOAT_INFO,
      data: {
        layout: { x: (layout?.x || 0) + ICON_SIZE, y: layout?.y || 0 },
        desc: props.desc,
      },
    })
  }, [layout?.x, layout?.y, props.desc])

  return (
    <>
      <View elemRef={refLayout} onLayout={onLayout}>
        <InfoIcon size={ICON_SIZE} onPress={open} />
      </View>
    </>
  )
}
