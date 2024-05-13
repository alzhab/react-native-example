import React, { useCallback } from 'react'
import { CompProps } from 'types/component.types'
import { IHomeActivitiesProps } from './types'
import { Text } from 'atoms/Text'
import { HomeActivityCard } from 'organisms/HomeActivityCard/homeActivityCard.component'
import { View } from 'atoms/View'
import { SPACINGS } from '@corrbo/module-theme'
import { WIDTH } from 'configs/Theme/constants'
import { observer } from 'mobx-react'
import { LogoIcon } from 'icons/LogoIcon'
import { Block } from 'molecules/Block'
import { Carousel } from 'organisms/Carousel'

export interface IRenderItem {
  title: string
  count: number
  data: { id: number; title: string; value: any; status?: any }[]
  onPress(id: number): void
  onPressAll(): void
  onPressNew(): void
  newText: string
}

export const HomeActivities: CompProps<IHomeActivitiesProps> = observer(
  props => {
    const renderItem = useCallback(
      ({ item }: { item: IRenderItem }) => (
        <View style={{ width: WIDTH - SPACINGS.container_20 * 2 }}>
          <HomeActivityCard
            title={item.title}
            count={item.count}
            data={item.data}
            onPress={item.onPress}
            onPressAll={item.onPressAll}
            onPressNew={item.onPressNew}
            newText={item.newText}
          />
        </View>
      ),
      [],
    )

    return (
      <View marginB={20}>
        <Text
          type={'titleLarge'}
          marginB={15}
          paddingHor={SPACINGS.container_20}>
          Активности
        </Text>

        {props.activities.length ? (
          <Carousel
            itemHeight={WIDTH / 2}
            stepIndicatorPosition={'bottom'}
            stepsIndicatorType={'gray'}
            container={'container_20'}
            data={props.activities}
            renderItem={renderItem}
          />
        ) : (
          <View paddingHor={SPACINGS.container_20}>
            <Block
              width={'100%'}
              height={172}
              radius={10}
              bg={'variant5'}
              icon={LogoIcon}
              iconSize={150}
            />
          </View>
        )}
      </View>
    )
  },
)
