import React, { useMemo } from 'react'
import { CompProps } from 'types/component.types'
import { IHomeServicesProps } from './types'
import { Text } from 'atoms/Text'
import { ICreateStyles, SPACINGS, useStyles } from '@corrbo/module-theme'
import { DEFAULT_SHADOW } from 'configs/Theme/constants'
import { View } from 'atoms/View'
import { ScaledSheet } from 'react-native-size-matters/extend'
import DropShadow from 'react-native-drop-shadow'
import { Pressable } from 'atoms/Pressable'
import { AnnouncementIcon } from 'icons/AnnouncementIcon'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EInProgressFlowEvents } from 'blms/InProgressBlm/flow'
import { NewspaperIcon } from 'icons/NewspaperIcon'
import { ViewGridAddIcon } from 'icons/ViewGridAddIcon'
import { VideoIcon } from 'icons/VideoIcon'
import { PhoneIntercomIcon } from 'icons/PhoneIntercomIcon'
import { PaymentCardIcon } from 'icons/PaymentCardIcon'
import { EAuthenticationFlowEvents } from 'blms/AuthenticationBlm/flow'
import { useNavigation } from '@react-navigation/native'
import { RootNav } from 'navigations/RootNavigation'
import { EApartmentsFlowEvents } from 'blms/ApartmentsBlm/flow'

export const HomeServices: CompProps<IHomeServicesProps> = () => {
  const styles = useStyles(SS)
  const navigation = useNavigation<RootNav>()
  const config = useMemo(() => {
    return [
      {
        icon: AnnouncementIcon,
        title: 'Объявления',
        onPress: () =>
          EVENT_EMITTER.emitEvent({ name: EInProgressFlowEvents.OPEN_INPROGRESS_PLUG }),
      },
      {
        icon: NewspaperIcon,
        title: 'Новости',
        onPress: () =>
          EVENT_EMITTER.emitEvent({
            name: EAuthenticationFlowEvents.ON_AUTH_GUARD_ACTION,
            data: {
              action: () =>
                EVENT_EMITTER.emitEvent({
                  name: EApartmentsFlowEvents.ON_APARTMENT_GUARD_ACTION,
                  data: {
                    call: () =>
                      navigation.navigate('BottomBarNavigation', {
                        // @ts-ignore
                        screen: 'EventsScreen',
                        params: { tab: 'news' },
                      }),
                  },
                }),
            },
          }),
      },
      {
        icon: ViewGridAddIcon,
        title: 'Партнеры',
        onPress: () =>
          EVENT_EMITTER.emitEvent({
            name: EAuthenticationFlowEvents.ON_AUTH_GUARD_ACTION,
            data: { action: () => navigation.navigate('ServicesScreen') },
          }),
      },
      {
        icon: VideoIcon,
        title: 'Видео',
        onPress: () =>
          EVENT_EMITTER.emitEvent({ name: EInProgressFlowEvents.OPEN_INPROGRESS_PLUG }),
      },
      {
        icon: PhoneIntercomIcon,
        title: 'Домофон',
        onPress: () =>
          EVENT_EMITTER.emitEvent({ name: EInProgressFlowEvents.OPEN_INPROGRESS_PLUG }),
      },
      {
        icon: PaymentCardIcon,
        title: 'Платежи',
        onPress: () =>
          EVENT_EMITTER.emitEvent({ name: EInProgressFlowEvents.OPEN_INPROGRESS_PLUG }),
      },
    ]
  }, [])

  return (
    <View>
      <Text type={'titleLarge'} marginB={15} paddingHor={SPACINGS.container_20}>
        Сервисы
      </Text>

      <View
        dir={'row'}
        ai={'center'}
        wrap={'wrap'}
        jc={'space-between'}
        paddingHor={SPACINGS.container_20}>
        {config.map(item => (
          <Pressable
            ai={'center'}
            marginB={15}
            key={item.title}
            activeOpacity={1}
            onPress={item.onPress}
            style={styles.card}>
            <DropShadow style={DEFAULT_SHADOW}>
              <item.icon
                marginB={7}
                paddingHor={11}
                pressableStyle={styles.imageContainer}
                size={56}
                sizeType={'height'}
                paddingVer={11}
              />
            </DropShadow>
            <Text ta={'center'} type={'bodySmall'} numberOfLines={1}>
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const SS: ICreateStyles = ({ colors }) =>
  ScaledSheet.create({
    card: {
      width: '33%',
    },
    imageContainer: {
      width: 72,
      borderRadius: 10,
      backgroundColor: '#fff',
    },
    image: {
      backgroundColor: colors.home_voting_card_bg,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
  })
