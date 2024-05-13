import React from 'react'
import { CompProps } from 'types/component.types'
import { IApartmentPlugProps } from './types'
import { ModalBottom } from 'atoms/ModalBottom'
import { ICreateStyles, useStyles } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { Text } from 'atoms/Text'
import { View } from 'atoms/View'
import Svg, { Path } from 'react-native-svg'
import { observer } from 'mobx-react'
import { Image } from 'atoms/Image'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { useApartmentPlugAdapter } from 'blms/ApartmentsBlm/ui-adapters/apartment-plug.adapter'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { IUserTypeEnum } from 'repositories/Api'

export const ApartmentPlug: CompProps<IApartmentPlugProps> = observer(() => {
  const styles = useStyles(SS)
  const { isOpen, close, plugType } = useApartmentPlugAdapter()
  const edges = useSafeAreaInsets()

  return (
    <ModalBottom visible={isOpen} close={close}>
      <View ai={'center'}>
        <Text ta={'center'} type={'headlineSmall'} marginB={18}>
          Возможности аккаунта ограничены
        </Text>

        <Text ta={'center'} type={'labelLarge'} marginB={35} style={{ width: '80%' }}>
          {plugType === IUserTypeEnum.Tenant
            ? 'Вам необходимо запросить доступ у Владельца недвижимости, для разблокировки всех функций приложения'
            : 'Вам необходимо подтвердить право собственности в разделе Профиль - Управление недвижимостью'}
        </Text>

        <View
          style={styles.imageContainer}
          ai={'center'}
          jc={'flex-end'}
          marginB={-(edges.bottom || 24)}>
          <Svg
            width="287"
            height="144"
            viewBox="0 0 287 144"
            fill="none"
            style={styles.imageContainerCircle}>
            <Path
              d="M0 144C0 64.471 64.2471 0 143.5 0C222.753 0 287 64.471 287 144H0Z"
              fill="#708ED780"
            />
          </Svg>

          <Animated.View entering={SlideInDown.duration(600).delay(150)}>
            <Image source={require('assets/images/AuthPlug/image.png')} style={styles.img} />
          </Animated.View>
        </View>
      </View>
    </ModalBottom>
  )
})

const SS: ICreateStyles = () =>
  ScaledSheet.create({
    imageContainer: {
      height: 144,
      width: '90%',
      alignSelf: 'center',
    },
    imageContainerCircle: {
      height: '100%',
      width: '100%',
      position: 'absolute',
    },
    img: {
      backgroundColor: 'transparent',
    },
  })
