import React, { ReactElement, useEffect } from 'react'
import { CompProps } from 'types/component.types'
import { IPhoneApproveInputProps } from './types'
import { observer } from 'mobx-react'
import { usePhoneApproveInputAdapter } from 'blms/SmsCodeApproveBlm/ui-adapters'
import { PHONE_MASK, VALIDATOR_MESSAGES } from 'configs/Theme/constants'
import { Input } from 'molecules/Input'
import { useController, useForm } from 'react-hook-form'
import { Block } from 'molecules/Block'
import { Loading } from 'molecules/Loading'
import { View } from 'atoms/View'
import { Text } from 'atoms/Text'
import { ESmsCodeApproveState } from 'blms/SmsCodeApproveBlm/store'
import { CodeInput } from 'molecules/CodeInput'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { InteractionManager } from 'react-native'

export const PhoneApproveInput: CompProps<IPhoneApproveInputProps> = observer(
  props => {
    const {
      state,
      loading,
      phone,
      isCodeInvalid,
      phoneError,
      time,

      sendSmsCode,
      checkSmsCode,
      changePhone,
      resendCode,
    } = usePhoneApproveInputAdapter({
      onApprove: props.onApprove,
      type: props.type,
      state: props.defaultPhone
        ? ESmsCodeApproveState.approved
        : ESmsCodeApproveState.phone,
      sendSmsOnStartPhone: props.sendSmsOnStartPhone,
      defaultPhone: props.defaultPhone,
    })

    const { control, handleSubmit, setFocus } = useForm({
      defaultValues: { phone: '', code: '' },
    })
    const { fieldState } = useController({
      control: props.phoneControl || control,
      name: 'phone',
      defaultValue: props.defaultPhone,
      rules: {
        required: props.defaultPhone ? undefined : VALIDATOR_MESSAGES.required,
        minLength: { value: 10, message: VALIDATOR_MESSAGES.phone },
        maxLength: { value: 10, message: VALIDATOR_MESSAGES.phone },
      },
    })

    useEffect(() => {
      if (state === ESmsCodeApproveState.code) {
        InteractionManager.runAfterInteractions(() => {
          setFocus('code')
        })
      }
    }, [state])

    const STATE_COMP: { [key in ESmsCodeApproveState]: ReactElement } = {
      [ESmsCodeApproveState.phone]: (
        <Animated.View
          style={{ width: '100%' }}
          exiting={FadeOut.duration(300)}>
          {props.withTitle && (
            <Text
              type={'titleMedium'}
              ta={'center'}
              marginB={38}
              style={{ width: '90%', alignSelf: 'center' }}>
              Для восстановления пароля введите номер телефона
            </Text>
          )}

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

          {!!phoneError && (
            <Text marginB={15} color={'input_error'}>
              {phoneError}
            </Text>
          )}

          <Block
            text={'Отправить СМС-код'}
            width={'100%'}
            paddingVer={14}
            textType={'titleSmall'}
            radius={100}
            onPress={handleSubmit(sendSmsCode)}
          />
        </Animated.View>
      ),
      [ESmsCodeApproveState.code]: (
        <Animated.View
          style={{ width: '100%' }}
          entering={FadeIn.duration(600).delay(300)}
          exiting={FadeOut.duration(300)}>
          {props.withTitle && (
            <Text
              type={'titleMedium'}
              ta={'center'}
              marginB={15}
              style={{ width: '90%', alignSelf: 'center' }}>
              СМС-код отправлен на номер:
            </Text>
          )}

          <Text ta={'center'} type={'bodyLarge'} marginB={15}>
            +7 {phone}
          </Text>

          <CodeInput
            control={control}
            name={'code'}
            onFinish={(val: string) =>
              checkSmsCode({ code: val, type: props.type })
            }
          />

          {!!time && (
            <Text
              ta={'center'}
              marginT={10}
              marginB={15}
              type={'bodyLarge'}
              color={
                isCodeInvalid ? 'input_error' : 'input_placeholder_outline'
              }>
              {isCodeInvalid && (
                <Text type={'bodyLarge'} color={'input_error'}>
                  СМС-код неправильный,{' '}
                </Text>
              )}
              Повторная отправка кода через {time} сек
            </Text>
          )}

          {time === 0 && (
            <Block
              marginT={15}
              text={'Повторить отправку'}
              width={'100%'}
              paddingVer={14}
              radius={100}
              onPress={resendCode}
              marginB={10}
            />
          )}

          <Block
            text={'Изменить номер'}
            width={'100%'}
            bg={'transparent'}
            textColor={'variant2'}
            borderColor={'variant7'}
            border={1}
            height={41}
            radius={100}
            onPress={changePhone}
          />
        </Animated.View>
      ),
      [ESmsCodeApproveState.approved]: (
        <Animated.View
          style={{ width: '100%' }}
          entering={FadeIn.duration(600).delay(300)}
          exiting={FadeOut.duration(300)}>
          <Text ta={'center'} type={'bodyLarge'} marginB={15}>
            +7 {phone || props.defaultPhone}
          </Text>

          <Block
            text={'Изменить номер'}
            width={'100%'}
            bg={'transparent'}
            textColor={'variant2'}
            borderColor={'variant7'}
            border={1}
            height={41}
            radius={100}
            onPress={changePhone}
          />
        </Animated.View>
      ),
    }

    return (
      <>
        <View marginB={20} ai={'center'}>
          {!loading ? <>{STATE_COMP[state]}</> : <Loading size={150} />}
        </View>

        {!!props.phoneControl && (
          <>
            {!!fieldState.error?.message && (
              <Text marginB={16} color={'input_error'}>
                {fieldState.error?.message}
              </Text>
            )}
          </>
        )}
      </>
    )
  },
)
