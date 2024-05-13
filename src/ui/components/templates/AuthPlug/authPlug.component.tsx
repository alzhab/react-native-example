import React, { useCallback } from 'react'
import { CompProps } from 'types/component.types'
import { ModalBottom } from 'atoms/ModalBottom'
import { ICreateStyles, useStyles } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { Text } from 'atoms/Text'
import { View } from 'atoms/View'
import { Block } from 'molecules/Block'
import Svg, { Path } from 'react-native-svg'
import { observer } from 'mobx-react'
import { useNavigation } from '@react-navigation/native'
import { RootNav } from 'navigations/RootNavigation'
import { Image } from 'atoms/Image'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { useAuthPlugAdapter } from 'blms/AuthenticationBlm/ui-adapters'
import { IAuthPlugProps } from 'templates/AuthPlug/types'

export const AuthPlug: CompProps<IAuthPlugProps> = observer(() => {
  const styles = useStyles(SS)
  const { isOpen, close } = useAuthPlugAdapter()
  const navigation = useNavigation<RootNav>()

  const pressCallback = useCallback(() => {
    close()
    navigation.navigate('AuthorizationScreen')
  }, [close, navigation])

  return (
    <ModalBottom visible={isOpen} close={close}>
      <View ai={'center'}>
        <Text ta={'center'} type={'headlineSmall'} marginB={18}>
          Для доступа ко всем возможностям приложения, вам необходимо пройти регистрацию!
        </Text>

        <Text ta={'center'} type={'labelLarge'} marginB={35} style={{ width: '80%' }}>
          Зарегистрировавшись, Вы получите доступ к этому разделу, а также многим другим функциям
          <Text type={'titleSmall'}> Qauym!</Text>
        </Text>

        <View style={styles.imageContainer} ai={'center'} jc={'flex-end'}>
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
        <Block
          onPress={pressCallback}
          textType={'titleSmall'}
          text={'Войти/Регистрация'}
          width={'100%'}
          radius={100}
          paddingVer={14}
        />
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
