import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CompProps } from 'types/component.types'
import { IListProps } from './types'
import { InteractionManager, RefreshControl } from 'react-native'
import { ICreateStyles, SPACINGS, useStyles } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { observer } from 'mobx-react'
import { View } from 'atoms/View'
import { Tabs } from 'molecules/Tabs'
import { SCREEN_BOTTOM_SPACING } from 'configs/Theme/constants'
import { EmptyList } from 'molecules/EmptyList'
import Animated, { FadeInDown, FadeOut, FadeOutDown } from 'react-native-reanimated'
import { Loading } from 'molecules/Loading'

export const List: CompProps<IListProps> = observer(props => {
  const [isRendered, setIsRendered] = useState(false)
  const styles = useStyles(SS, props)
  const [listFullHeight, setListFullHeight] = useState(0)
  const data = useMemo(
    () =>
      Array.isArray(props.data)
        ? props.data
        : (props.data && props.data[props.tabsProps?.activeTab]) || [],
    [props.tabsProps, props.data],
  )

  const refreshControl = useMemo(
    () =>
      props.refresh ? (
        <RefreshControl refreshing={props.refresh?.loading} onRefresh={props.refresh?.handler} />
      ) : undefined,
    [props.refresh],
  )

  const onEndReached = useCallback(() => {
    if (props.more && !props.more.loading && data.length) {
      props.more.handler()
    }
  }, [props.more, props.data])

  const ListFooterComponent = useMemo(
    () =>
      props.more && props.more.loading ? (
        <View style={{ alignSelf: 'center' }}>
          <Loading size={100} />
        </View>
      ) : null,
    [props.more],
  )

  const EmptyComponent = useMemo(
    () => <EmptyList fullHeight={listFullHeight - SCREEN_BOTTOM_SPACING - 10 - 30} />,
    [listFullHeight],
  )

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => setIsRendered(true))
  }, [])

  return (
    <>
      {!!props.tabsProps && (
        <Tabs paddingHor={SPACINGS[props?.container || 'container_0']} {...props.tabsProps} />
      )}

      <View flex onLayout={e => setListFullHeight(e.nativeEvent.layout.height)}>
        {isRendered && !props.loading ? (
          <Animated.FlatList
            entering={FadeInDown.duration(300).delay(150)}
            exiting={FadeOut.duration(300)}
            refreshControl={refreshControl}
            overScrollMode={'never'}
            showsVerticalScrollIndicator={false}
            data={data}
            ListEmptyComponent={EmptyComponent}
            renderItem={props.renderItem}
            contentContainerStyle={styles.container}
            onEndReached={onEndReached}
            ListFooterComponent={ListFooterComponent}
            keyExtractor={(_, index) => index.toString()}
          />
        ) : (
          <Animated.View style={styles.loadingContainer} exiting={FadeOutDown.duration(300)}>
            <Loading size={150} />
          </Animated.View>
        )}
      </View>
    </>
  )
})

const SS: ICreateStyles<IListProps> = ({ props }) =>
  ScaledSheet.create({
    container: {
      paddingHorizontal: SPACINGS[props?.container || 'container_0'],
      paddingBottom: SCREEN_BOTTOM_SPACING + (props?.bottom_offset || 0),
      paddingTop: 10,
      gap: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
