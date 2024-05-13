import React from 'react'
import { observer } from 'mobx-react'
import { AuthorizationHeader } from 'templates/AuthorizationHeader'
import { AuthorizationGallery } from 'templates/AuthorizationGallery'
import { AuthorizationForm } from 'templates/AuthorizationForm'
import { AuthorizationTermsLink } from 'templates/AuthorizationTermsLink'
import { Screen } from 'templates/Screen'
import Animated from 'react-native-reanimated'
import { Pressable } from 'atoms/Pressable'
import { Text } from 'atoms/Text'
import { useAuthorizationAdapter } from 'blms/AuthenticationBlm/ui-adapters'
import { RecoverPasswordModal } from 'templates/RecoverPasswordModal'
import { useRecoverPasswordOpenModalAdapter } from 'blms/RecoverPasswordBlm/ui-adapters'

export const AuthorizationScreen = observer(() => {
  const { formSubmit, showPasswordConfirm } = useAuthorizationAdapter()
  const { openModal } = useRecoverPasswordOpenModalAdapter()

  return (
    <>
      <Screen
        scroll
        content={fullHeight => (
          <>
            <Animated.View
              style={{
                height: showPasswordConfirm ? fullHeight - 34 - 32 : undefined,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <AuthorizationHeader />
              {showPasswordConfirm ? (
                <Text
                  type={'headlineMedium'}
                  ta={'center'}
                  marginB={20}
                  style={{ width: '90%' }}>
                  Регистрация
                </Text>
              ) : (
                <AuthorizationGallery />
              )}
              <AuthorizationForm
                showPasswordConfirm={showPasswordConfirm}
                submit={formSubmit}
              />

              {showPasswordConfirm ? (
                <AuthorizationTermsLink />
              ) : (
                <Pressable paddingVer={8} onPress={openModal}>
                  <Text
                    style={{ textDecorationLine: 'underline' }}
                    type={'bodyMedium'}
                    color={'block_bg_variant1'}>
                    Забыли пароль ?
                  </Text>
                </Pressable>
              )}
            </Animated.View>
          </>
        )}
      />

      <RecoverPasswordModal />
    </>
  )
})
