import React from 'react'
import { CompProps } from 'types/component.types'
import { IFloatInfoProps } from './types'
import { observer } from 'mobx-react'
import { Pressable } from 'atoms/Pressable'
import { DEFAULT_SHADOW, WIDTH } from 'configs/Theme/constants'
import { ICreateStyles, useStyles } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { Text } from 'atoms/Text'
import { ScrollView } from 'react-native'
import { useFloatInfoAdapter } from 'blms/FloatInfoBlm/ui-adapters'
import DropShadow from 'react-native-drop-shadow'

export const FloatInfo: CompProps<IFloatInfoProps> = observer(() => {
  const { isVisible, desc, layout, close, buttons } = useFloatInfoAdapter()
  const styles = useStyles(SS)

  return isVisible ? (
    <Pressable activeOpacity={1} onPress={close} style={styles.backdrop}>
      <DropShadow style={[DEFAULT_SHADOW]}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
          style={[
            styles.card,
            {
              top: layout?.y || 0,
              right: WIDTH - (layout?.x || 0),
              width: layout.width || 245,
            },
          ]}>
          {!!desc && <Text type={'bodySmall'}>{desc}</Text>}
          {buttons.map((item, index) => {
            return (
              <Pressable
                style={[index === buttons.length - 1 ? {} : styles.item]}
                key={item.title}
                onPress={() => {
                  item.onPress()
                  close()
                }}
                paddingVer={15}>
                <Text>{item.title}</Text>
              </Pressable>
            )
          })}
        </ScrollView>
      </DropShadow>
    </Pressable>
  ) : null
})

const SS: ICreateStyles = ({ colors }) =>
  ScaledSheet.create({
    backdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: WIDTH,
      zIndex: 900,
    },
    card: {
      position: 'absolute',
      borderRadius: 8,
      maxHeight: 200,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
      backgroundColor: colors.float_info_card_bg,
      borderWidth: 1,
      borderColor: colors.float_info_card_border,
    },
    item: {
      borderBottomWidth: 1,
      borderBottomColor: colors.float_info_card_border,
    },
  })
