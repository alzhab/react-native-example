import React, { useCallback, useMemo } from 'react'
import { CompProps } from 'types/component.types'
import { IDotsBtnProps } from './types'
import { View } from 'atoms/View'
import { ICreateStyles, useStyles } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { Pressable } from 'atoms/Pressable'
import { useGetLayout } from 'hooks/useGetLayout'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EFloatInfoFlowEvents } from 'blms/FloatInfoBlm/flow'

export const DotsBtn: CompProps<IDotsBtnProps> = props => {
  const styles = useStyles(SS)
  const { refLayout, layout, onLayout } = useGetLayout()
  const buttons = useMemo<{ title: string; onPress: () => void }[]>(
    () =>
      [
        { title: 'Редактировать', onPress: props.onEdit },
        { title: 'Удалить', onPress: props.onDelete },
      ].filter(item => !!item.onPress) as any,
    [props.onEdit, props.onDelete],
  )

  const open = useCallback(() => {
    EVENT_EMITTER.emitEvent({
      name: EFloatInfoFlowEvents.SHOW_FLOAT_INFO,
      data: {
        layout: { x: (layout?.x || 0) + 36, y: (layout?.y || 0) + 32 },
        buttons,
      },
    })
  }, [layout?.x, layout?.y, buttons])

  return (
    <>
      <Pressable
        style={styles.container}
        onPress={open}
        elemRef={refLayout}
        gap={1.5}
        paddingR={30}
        paddingT={30}
        paddingB={30}
        paddingL={30}
        onLayout={onLayout}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </Pressable>
    </>
  )
}

const SS: ICreateStyles = ({ colors }) =>
  ScaledSheet.create({
    container: {
      position: 'absolute',
      right: -20,
      top: -20,
      zIndex: 3,
    },
    dot: {
      width: 3,
      height: 3,
      borderRadius: 3,
      backgroundColor: colors.dopts_btn_icon_bg,
    },
  })
