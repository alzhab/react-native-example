import React from 'react'
import { CompProps } from 'types/component.types'
import { IAuthorizationHeaderProps } from './types'
import { View } from 'atoms/View'
import { CloseIcon } from 'icons/CloseIcon'
import { useNavigation } from '@react-navigation/native'
import { LogoIcon } from 'icons/LogoIcon'
import { SPACINGS } from '@corrbo/module-theme'
import { LogotextIcon } from 'assets/icons/LogotextIcon'

export const AuthorizationHeader: CompProps<IAuthorizationHeaderProps> = () => {
  const navigation = useNavigation()

  return (
    <View dir={'row'} ai={'center'} jc={'space-between'} paddingHor={SPACINGS.container_25}>
      <View style={{ width: '25%' }} />
      <View style={{ width: '50%' }} dir={'row'} ai={'center'} jc={'center'}>
        <LogotextIcon />
      </View>
      <View style={{ width: '25%' }} ai={'flex-end'}>
        <CloseIcon onPress={navigation.goBack} />
      </View>
    </View>
  )
}
