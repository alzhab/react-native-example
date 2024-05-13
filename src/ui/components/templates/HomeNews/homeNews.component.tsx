import React, { useCallback } from 'react'
import { CompProps } from 'types/component.types'
import { IHomeNewsProps } from './types'
import { HomeNewsCard } from 'organisms/HomeNewsCard/homeNewsCard.component'
import { Carousel } from 'organisms/Carousel'
import { INews } from 'repositories/Api'
import { observer } from 'mobx-react'
import { Block } from 'molecules/Block'
import { LogoIcon } from 'icons/LogoIcon'
import { View } from 'atoms/View'
import { SPACINGS } from '@corrbo/module-theme'

export const HomeNews: CompProps<IHomeNewsProps> = observer(
  ({ data, onPress }) => {
    const renderItem = useCallback(
      ({ item }: { item: INews }) => (
        <HomeNewsCard
          img={item.image}
          title={item.name}
          desc={item.description}
          onPress={() => onPress(item)}
        />
      ),
      [onPress],
    )

    return data.length ? (
      <Carousel
        stepsIndicatorType={'light'}
        container={'container_20'}
        marginB={20}
        data={data}
        renderItem={renderItem}
      />
    ) : (
      <View marginB={20} paddingHor={SPACINGS.container_20}>
        <Block
          width={'100%'}
          height={172}
          radius={10}
          bg={'variant5'}
          icon={LogoIcon}
          iconSize={150}
        />
      </View>
    )
  },
)
