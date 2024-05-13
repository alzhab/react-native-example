import React, { useCallback } from 'react'
import { CompProps } from 'types/component.types'
import { IAuthorizationTermsLinkProps } from './types'
import { View } from 'atoms/View'
import { Text } from 'atoms/Text'
import { Linking } from 'react-native'
import { PRIVACY_POLICY_LINK, TERMS_OF_USE } from '@env'
import { Pressable } from 'atoms/Pressable'

export const AuthorizationTermsLink: CompProps<IAuthorizationTermsLinkProps> = () => {
  const privacyLinkHandler = useCallback(() => {
    Linking.openURL(PRIVACY_POLICY_LINK)
  }, [])

  const termsOfUseLinkHandler = useCallback(() => {
    Linking.openURL(TERMS_OF_USE)
  }, [])

  return (
    <View
      style={{ width: '90%', alignSelf: 'center' }}
      dir={'row'}
      ai={'center'}
      jc={'center'}
      wrap={'wrap'}>
      <Text type={'bodySmall'}>Создавая аккаунт, Вы принимаете наши</Text>
      <Pressable onPress={termsOfUseLinkHandler}>
        <Text
          style={{ textDecorationLine: 'underline' }}
          color={'block_bg_variant1'}
          type={'bodySmall'}>
          Условия использования
        </Text>
      </Pressable>
      <Text type={'bodySmall'}> и </Text>
      <Pressable onPress={privacyLinkHandler}>
        <Text
          style={{ textDecorationLine: 'underline' }}
          color={'block_bg_variant1'}
          type={'bodySmall'}>
          Политику конфиденциальности.
        </Text>
      </Pressable>
    </View>
  )
}
