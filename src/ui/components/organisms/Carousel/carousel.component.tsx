import React, { useCallback, useState } from 'react'
import { CompProps } from 'types/component.types'
import { ICarouselProps } from './types'
import { View } from 'atoms/View'
import { ICreateStyles, SPACINGS, useStyles } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { StepsIndicator } from 'molecules/StepsIndicator'
import { Spacings, useSpacings } from '@corrbo/module-spacing-props'
import { Skeleton } from 'atoms/Skeleton'
import CarouselLib from 'react-native-reanimated-carousel'
import Animated, { FadeOut, useSharedValue } from 'react-native-reanimated'
import { LayoutChangeEvent } from 'react-native/Libraries/Types/CoreEventTypes'
import { InteractionManager } from 'react-native'

export const Carousel: CompProps<ICarouselProps & Spacings> = props => {
  const styles = useStyles(SS, props)
  const { margin, padding } = useSpacings(props)
  const progressValue = useSharedValue<number>(0)
  const [width, setWidth] = useState(0)
  const [itemHeight, setItemHeight] = useState(props.itemHeight || 0)

  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <View
        style={{
          width: width,
          paddingHorizontal: SPACINGS[props.container || 'container_0'],
        }}>
        {props.renderItem({ item })}
      </View>
    ),
    [props, width],
  )

  const setLayout = useCallback((e: LayoutChangeEvent) => {
    const layoutHeight = e.nativeEvent.layout.height
    InteractionManager.runAfterInteractions(() => {
      setItemHeight(layoutHeight)
    })
  }, [])

  return (
    <View
      style={[margin, padding, props.containerStyle]}
      onLayout={e => setWidth(e.nativeEvent.layout.width)}>
      {props.stepIndicatorPosition === 'default' && (
        <StepsIndicator
          progressValue={progressValue}
          type={props.stepsIndicatorType}
          style={styles.steps}
          steps={props.data.length}
          size={6}
        />
      )}

      {width && props.data[0] ? (
        <>
          {itemHeight && props.data.length > 1 ? (
            <CarouselLib
              width={width}
              height={itemHeight}
              style={{ width, alignItems: 'center', justifyContent: 'center' }}
              loop
              pagingEnabled={true}
              snapEnabled={true}
              scrollAnimationDuration={600}
              onProgressChange={(_, absoluteProgress) => (progressValue.value = absoluteProgress)}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 1,
                parallaxScrollingOffset: 0,
                parallaxAdjacentItemScale: 1,
              }}
              data={props.data}
              renderItem={renderItem}
            />
          ) : (
            <Animated.View exiting={FadeOut.duration(1).delay(300)} onLayout={setLayout}>
              {renderItem({ item: props.data[0] })}
            </Animated.View>
          )}
        </>
      ) : (
        <Skeleton container border={10} width={'100%'} height={itemHeight} />
      )}

      {props.stepIndicatorPosition === 'bottom' && (
        <View ai={'center'}>
          <StepsIndicator
            marginT={15}
            progressValue={progressValue}
            steps={props.data.length}
            size={6}
            type={props.stepsIndicatorType}
          />
        </View>
      )}
    </View>
  )
}

Carousel.defaultProps = {
  stepIndicatorPosition: 'default',
}

const SS: ICreateStyles<ICarouselProps> = ({ props }) =>
  ScaledSheet.create({
    container: {},
    contentContainer: {},
    card: {
      height: 172,
      borderRadius: 10,
    },
    image: {
      height: '100%',
      borderRadius: 10,
    },
    steps: {
      position: 'absolute',
      zIndex: 2,
      top: 8,
      right: 10 + SPACINGS[props?.container || 'container_0'],
    },
  })
