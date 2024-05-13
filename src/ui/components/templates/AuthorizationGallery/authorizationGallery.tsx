import React from 'react'
import { CompProps } from 'types/component.types'
import { IAuthorizationGalleryProps } from './types'
import { AuthorizationGalleryCard } from 'organisms/AuthorizationGalleryCard'
import { View } from 'atoms/View'
import { useSharedValue } from 'react-native-reanimated'
import { HEIGHT, WIDTH } from 'configs/Theme/constants'
import Carousel from 'react-native-reanimated-carousel'

export const AuthorizationGallery: CompProps<IAuthorizationGalleryProps> = () => {
  const progressValue = useSharedValue<number>(0)

  return (
    <View
      full
      flex
      style={{
        paddingTop: 37,
        paddingBottom: 48,
      }}>
      <Carousel
        vertical={false}
        width={WIDTH * 0.6}
        height={HEIGHT * 0.4}
        defaultIndex={1}
        style={{ width: WIDTH, alignItems: 'center', justifyContent: 'center' }}
        loop
        pagingEnabled={true}
        snapEnabled={true}
        autoPlay
        scrollAnimationDuration={600}
        autoPlayInterval={5000}
        onProgressChange={(_, absoluteProgress) => (progressValue.value = absoluteProgress)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 0,
          parallaxAdjacentItemScale: 0.7,
        }}
        data={[
          require('assets/images/Authorization/slider-1.jpg'),
          require('assets/images/Authorization/slider-2.jpg'),
          require('assets/images/Authorization/slider-3.jpg'),
        ]}
        renderItem={({ item }) => (
          <View ai={'center'} jc={'center'}>
            <AuthorizationGalleryCard img={item} />
          </View>
        )}
      />

      {/*<FlatList*/}
      {/*  style={{ flex: 1 }}*/}
      {/*  horizontal*/}
      {/*  showsHorizontalScrollIndicator={false}*/}
      {/*  showsVerticalScrollIndicator={false}*/}
      {/*  data={[*/}
      {/*    require('assets/images/Authorization/slider-1.jpg'),*/}
      {/*    require('assets/images/Authorization/slider-2.jpg'),*/}
      {/*    require('assets/images/Authorization/slider-3.jpg'),*/}
      {/*  ]}*/}
      {/*  snapToAlignment={'center'}*/}
      {/*  contentContainerStyle={{*/}
      {/*    alignItems: 'center',*/}
      {/*    gap: 17,*/}
      {/*    paddingHorizontal: 70,*/}
      {/*    paddingVertical: 30,*/}
      {/*  }}*/}
      {/*  decelerationRate={'fast'}*/}
      {/*  snapToInterval={verticalScale(WIDTH * 0.7)}*/}
      {/*  viewabilityConfig={{ viewAreaCoveragePercentThreshold: 90 }}*/}
      {/*  renderItem={({ item, index }) => (*/}
      {/*    <Item height={'100%'} item={item} viewableItems={viewableItems} index={index} />*/}
      {/*  )}*/}
      {/*  keyExtractor={keyExtractor}*/}
      {/*  onViewableItemsChanged={viewableChanged}*/}
      {/*/>*/}
    </View>
  )
}
