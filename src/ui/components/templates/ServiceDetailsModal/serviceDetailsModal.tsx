import React, { useMemo } from 'react'
import { CompProps } from 'types/component.types'
import { IDetailsModalProps } from './types'
import { ModalBottom } from 'atoms/ModalBottom'
import { Text } from 'atoms/Text'
import { Carousel } from 'organisms/Carousel'
import { Image } from 'atoms/Image'
import { Block } from 'molecules/Block'
import { SPACINGS } from '@corrbo/module-theme'
import { View } from 'atoms/View'
import { observer } from 'mobx-react'
import { getServerImage } from 'hooks/useServerImage'
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated'
import { Loading } from 'molecules/Loading'
import { useCompanyDetailAdapter } from 'blms/CompaniesBlm/ui-adapters'

export const ServiceDetailsModal: CompProps<IDetailsModalProps> = observer(() => {
  const { data, isOpen, isLoading, close, action } = useCompanyDetailAdapter()
  const showContent = useMemo(() => !!data && !isLoading, [data, isLoading])

  return (
    <ModalBottom contentContainer={'container_0'} visible={isOpen} close={close}>
      {showContent ? (
        <Animated.View entering={FadeInDown.duration(300).delay(150)}>
          <Text type={'titleLarge'} marginB={10} paddingHor={SPACINGS.container_10}>
            {data?.name_service}
          </Text>

          <Carousel
            stepsIndicatorType={'light'}
            container={'container_10'}
            data={data?.image_service || []}
            renderItem={({ item }) => (
              <Image
                source={{ uri: getServerImage(item.image) }}
                height={172}
                marginB={20}
                borderRadius={10}
              />
            )}
            marginB={10}
          />

          <View paddingHor={SPACINGS.container_10}>
            <Text type={'labelMedium'} marginB={20}>
              {data?.description || ''}
            </Text>

            <Block
              onPress={action}
              width={'100%'}
              height={49}
              radius={100}
              text={data?.link_text || 'Действие'}
            />
          </View>
        </Animated.View>
      ) : (
        <Animated.View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          exiting={FadeOutDown.duration(300)}>
          <Loading size={150} />
        </Animated.View>
      )}
    </ModalBottom>
  )
})
