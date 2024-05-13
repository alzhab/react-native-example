import React, { useCallback, useRef } from 'react'
import { CompProps } from 'types/component.types'
import { ITab, ITabsProps } from './types'
import { View } from 'atoms/View'
import { Pressable } from 'atoms/Pressable'
import { ICreateStyles, useStyles } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { Text } from 'atoms/Text'
import { DimensionValue } from 'react-native'
import { Spacings, useSpacings } from '@corrbo/module-spacing-props'

export const Tabs: CompProps<ITabsProps & Spacings> = props => {
  const styles = useStyles(SS, props)
  const { margin, padding } = useSpacings(props)
  let timeout = useRef<any>(null)

  const onPress = useCallback(
    (item: ITab) => {
      if (timeout && timeout.current) {
        clearTimeout(timeout.current)
      }

      const action = () => {
        props.setTab(item)
      }

      timeout.current = setTimeout(() => {
        action()
      }, 0)
    },
    [props, timeout],
  )

  return (
    <View
      style={[styles.container, margin, padding]}
      dir={'row'}
      ai={'center'}
      jc={'space-between'}>
      {props.tabs.map(item => {
        const isActive = props.activeTab === item.val
        return (
          <Pressable
            onPress={() => onPress(item)}
            style={[styles.tab, isActive ? styles.tabActive : styles.tabInactive]}
            key={item.title}
            paddingVer={10}>
            <Text
              numberOfLines={1}
              type={'tab'}
              ta={'center'}
              color={isActive ? 'tabs_title_active' : 'tabs_title_inactive'}>
              {item.title}
              {typeof item.count === 'number' && isActive ? ' (' + item.count + ')' : ''}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const SS: ICreateStyles<ITabsProps> = ({ colors, props }) => {
  const tabWidth = (100 / (props?.tabs.length || 1) + '%') as DimensionValue

  return ScaledSheet.create({
    container: {
      borderBottomWidth: 2,
      borderColor: colors.tabs_border,
    },
    tab: {
      width: (props?.tabs.length || 1) > 3 ? undefined : tabWidth,
    },
    tabInactive: {
      borderBottomWidth: 1,
      borderBottomColor: 'transparent',
    },
    tabActive: {
      borderBottomWidth: 2,
      borderBottomColor: colors.tabs_tab_border_active,
    },
  })
}
