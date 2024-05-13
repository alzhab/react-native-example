import React, { useEffect, useState } from 'react'
import { CompProps } from 'types/component.types'
import { IAuthorizationFormProps } from './types'
import { View } from 'atoms/View'
import { SPACINGS } from '@corrbo/module-theme'
import { Block } from 'molecules/Block'
import { useForm } from 'react-hook-form'
import { Input } from 'molecules/Input'
import { PHONE_MASK, VALIDATOR_MESSAGES } from 'configs/Theme/constants'
import { observer } from 'mobx-react'
import { IAuthorizationData } from 'blms/AuthenticationBlm/actions'
import { PhoneApproveInput } from 'templates/PhoneApproveInput'

export const AuthorizationForm: CompProps<IAuthorizationFormProps> = observer(
  ({ submit, showPasswordConfirm }) => {
    const [sendSmsOneStartRegistrationPhone, setSendSmsOneStartRegistrationPhone] = useState('')
    const { control, handleSubmit, watch, setValue } = useForm<
      IAuthorizationData & { password_confirm: string }
    >({
      shouldFocusError: false,
      defaultValues: {
        phone: '',
        password: '',
        password_confirm: '',
      },
    })

    const password = watch('password')
    const phone = watch('phone')

    useEffect(() => {
      if (showPasswordConfirm) {
        setSendSmsOneStartRegistrationPhone(phone)
        setValue('phone', '')
      }
    }, [showPasswordConfirm])

    return (
      <View paddingHor={SPACINGS.container_20} style={{ width: '100%' }}>
        {sendSmsOneStartRegistrationPhone ? (
          <PhoneApproveInput
            phoneControl={control}
            sendSmsOnStartPhone={sendSmsOneStartRegistrationPhone}
            type={'registration_'}
            onApprove={v => {
              setValue('phone', v.phone)
              setValue('code', v.code)
            }}
          />
        ) : (
          <Input
            isPhone
            rules={{
              required: VALIDATOR_MESSAGES.required,
              minLength: { value: 10, message: VALIDATOR_MESSAGES.phone },
              maxLength: { value: 10, message: VALIDATOR_MESSAGES.phone },
            }}
            mask={PHONE_MASK}
            type={'outline'}
            name={'phone'}
            control={control}
            marginB={24}
            placeholder={'Номер телефона'}
            keyboardType={'phone-pad'}
          />
        )}
        <Input
          rules={{
            required: VALIDATOR_MESSAGES.required,
            minLength: { value: 8, message: VALIDATOR_MESSAGES.password_min_length },
          }}
          type={'outline'}
          name={'password'}
          control={control}
          marginB={24}
          placeholder={'Пароль'}
          secureTextEntry
        />
        {showPasswordConfirm && (
          <Input
            rules={{
              required: VALIDATOR_MESSAGES.required,
              validate: val => val === password || VALIDATOR_MESSAGES.password_confrim,
            }}
            type={'outline'}
            name={'password_confirm'}
            control={control}
            marginB={24}
            placeholder={'Подтвердите пароль'}
            secureTextEntry
          />
        )}

        <Block
          text={'Войти/Регистрация'}
          width={'100%'}
          paddingVer={14}
          textType={'titleSmall'}
          radius={100}
          onPress={handleSubmit(submit)}
          marginB={5}
        />
      </View>
    )
  },
)
