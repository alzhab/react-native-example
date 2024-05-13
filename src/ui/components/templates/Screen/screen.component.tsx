import React, { FC, useMemo, useState } from 'react'
import { ICreateStyles, SPACINGS, useStyles } from '@corrbo/module-theme'
import { ScreenHeader } from 'templates/ScreenHeader'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { View } from 'atoms/View'
import { IScreenProps } from 'templates/Screen/types'
import { useIsRendered } from 'hooks/useIsRendered'
import { Loading } from 'molecules/Loading'
import Animated, { FadeIn, FadeInDown, FadeOut, runOnJS } from 'react-native-reanimated'
import { SCREEN_BOTTOM_SPACING } from 'configs/Theme/constants'
import { useGetLayout } from 'hooks/useGetLayout'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ScrollView = Animated.createAnimatedComponent(KeyboardAwareScrollView)

export const Screen: FC<IScreenProps> = props => {
  const styles = useStyles(SS, props)
  const isRendered = useIsRendered()
  const showContent = useMemo(
    () => props.isRendered || (!props.isLoading && isRendered),
    [props.isRendered, props.isLoading, isRendered],
  )
  const [animationFinished, setAnimationFinished] = useState(false)
  const { onLayout, layout, refLayout } = useGetLayout()

  return (
    <View style={styles.screen}>
      {!!props.headerProps && (
        <ScreenHeader
          {...props.headerProps}
          paddingHor={
            props.scroll
              ? SPACINGS[props?.container || 'container_0'] || props.headerProps.paddingHor
              : props.headerProps.paddingHor
          }
        />
      )}

      <View flex elemRef={refLayout} onLayout={onLayout}>
        {showContent ? (
          props.scroll ? (
            <ScrollView
              entering={FadeInDown.duration(300)
                .delay(150)
                .withCallback(() => {
                  runOnJS(setAnimationFinished)(true)
                })}
              bounces={false}
              style={styles.container}
              overScrollMode={'never'}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.content_container}
              keyboardDismissMode={'interactive'}
              enableAutomaticScroll
              extraScrollHeight={150}
              enableOnAndroid={true}
              keyboardShouldPersistTaps={'handled'}
              keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
              {props.content(layout?.height || 300, animationFinished)}
            </ScrollView>
          ) : (
            props.content(layout?.height || 300, animationFinished)
          )
        ) : (
          <Animated.View
            style={styles.loadingContainer}
            entering={FadeIn}
            exiting={FadeOut.duration(300)}>
            <Loading size={150} />
          </Animated.View>
        )}
      </View>
    </View>
  )
}

const SS: ICreateStyles<IScreenProps> = ({ colors, edges, props }) =>
  ScaledSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.screen_background,
      paddingHorizontal: props?.scroll ? 0 : SPACINGS[props?.container || 'container_0'],
      paddingTop: edges.top,
      paddingBottom: props?.inBottomBar ? 0 : edges.bottom,
    },
    content: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: colors.screen_background,
    },
    content_container: {
      paddingBottom: SCREEN_BOTTOM_SPACING,
      paddingHorizontal: SPACINGS[props?.container || 'container_0'],
    },
  })
