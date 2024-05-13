import React, { FC, useCallback, useState } from 'react'
import { IInputProps } from './types'
import { Text } from 'atoms/Text'
import { ScaledSheet, verticalScale } from 'react-native-size-matters/extend'
import { TextInput } from 'react-native'
import { Controller } from 'react-hook-form'
import { View } from 'atoms/View'
import { ICreateStyles, SPACINGS, useStyles, useTheme } from '@corrbo/module-theme'
import Animated from 'react-native-reanimated'
import { Spacings, useSpacings } from '@corrbo/module-spacing-props'
import { EyeOpenIcon } from 'icons/EyeOpenIcon'
import MaskInput from 'react-native-mask-input'

export const Input: FC<IInputProps & Spacings> = props => {
  const { colors } = useTheme()
  const style = useStyles<IInputProps>(SS, props)
  const { margin, padding } = useSpacings(props)
  const [showPassword, setShowPassword] = useState(!props.secureTextEntry)
  const [maskValue, setMaskValue] = useState(props.defaultValue)

  const onBlur = useCallback(
    (e: any, fieldOnBlur: () => void) => {
      if (props.onBlur) {
        props.onBlur(e)
        fieldOnBlur()
      }
    },
    [props],
  )

  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={props.rules}
      render={({ field, fieldState }) => (
        <>
          <Animated.View style={[props.containerStyle, margin, padding, { width: '100%' }]}>
            {!!props.label && (
              <Text type={'labelSmall'} color={'input_label'} marginB={8}>
                {props.label}
              </Text>
            )}

            <View
              style={[
                style.container,
                style['container' + props.type],
                fieldState.error?.message ? style.errorContainer : {},
                {
                  marginBottom: fieldState.error?.message || props.help ? 8 : 0,
                },
              ]}>
              {!!props.Icon && props.iconPosition === 'left' && (
                <props.Icon
                  color={colors[props.iconColor || 'input_error']}
                  size={verticalScale(props.iconSize || 20)}
                  pressableStyle={style.icon}
                />
              )}

              {props.mask ? (
                <>
                  {props.isPhone && <Text>🇰🇿 +7 </Text>}

                  <MaskInput
                    mask={props.mask}
                    value={maskValue}
                    style={[style.input]}
                    placeholderTextColor={colors[`input_placeholder_${props.type || 'default'}`]}
                    {...(props as any)}
                    inputAccessoryViewID="Done"
                    secureTextEntry={!showPassword}
                    onChangeText={(masked, unmasked) => {
                      setMaskValue(masked)
                      field.onChange(props.nospace ? unmasked.replace(/\s/g, '') : unmasked)
                    }}
                    onBlur={e => onBlur(e, field.onBlur)}
                    ref={field.ref}
                    scrollEnabled={false}
                    multiline={props.textarea}
                    autoCapitalize={'none'}
                    defaultValue={field.value}
                    cursorColor={colors[`input_text_${props.type || 'default'}`]}
                  />
                </>
              ) : (
                <TextInput
                  style={[style.input]}
                  placeholderTextColor={colors[`input_placeholder_${props.type || 'default'}`]}
                  {...(props as any)}
                  scrollEnabled={false}
                  inputAccessoryViewID="Done"
                  secureTextEntry={!showPassword}
                  onChangeText={e => field.onChange(props.nospace ? e.replace(/\s/g, '') : e)}
                  onBlur={e => onBlur(e, field.onBlur)}
                  ref={field.ref}
                  multiline={props.textarea}
                  autoCapitalize={'none'}
                  defaultValue={field.value}
                  cursorColor={colors[`input_text_${props.type || 'default'}`]}
                  maxLength={500}
                />
              )}

              {!!props.Icon && props.iconPosition === 'right' && (
                <props.Icon
                  color={colors[props.iconColor || 'input_error']}
                  size={verticalScale(props.iconSize || 20)}
                  style={style.icon}
                />
              )}

              {!!props.secureTextEntry && (
                <EyeOpenIcon
                  onPress={() => setShowPassword(!showPassword)}
                  style={style.icon}
                  paddingHor={14}
                  paddingVer={14}
                  active={showPassword}
                />
              )}
            </View>

            {!!fieldState.error?.message && (
              <Text marginB={16} color={'input_error'}>
                {fieldState.error?.message}
              </Text>
            )}

            {!fieldState.error?.message && props.help && (
              <Text marginB={16} color={'input_help'} style={style.errorText}>
                {props.help}
              </Text>
            )}
          </Animated.View>
        </>
      )}
    />
  )
}

Input.defaultProps = {
  type: 'default',
  iconPosition: 'right',
  editable: true,
}

const SS: ICreateStyles<IInputProps> = ({ colors, props }) =>
  ScaledSheet.create({
    container: {
      width: '100%',
      borderRadius: props?.borderRadius || 8,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACINGS[props?.container || 'container_16'],
      minHeight: props?.textarea ? 154 : props?.inputHeight || 48,
      maxHeight: props?.textarea ? 364 : props?.inputHeight || 48,
      gap: props?.gap || 0,
    },
    dropDown: {
      borderRadius: 8,
      maxHeight: 200,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
      width: '100%',
      backgroundColor: !props?.editable
        ? colors.input_placeholder_bg_disabled
        : colors.info_btn_card_bg,
      marginBottom: 10,
    },
    dropDownItem: {
      borderBottomWidth: 1,
      width: '100%',
      borderBottomColor: colors.drop_down_border,
    },
    ['container' + 'default']: {
      backgroundColor: !props?.editable
        ? colors.input_placeholder_bg_disabled
        : colors.input_background,
    },
    ['container' + 'outline']: {
      backgroundColor: !props?.editable
        ? colors.input_placeholder_bg_disabled
        : colors.input_background,
      borderColor: colors.input_border,
      borderWidth: 1,
    },
    ['container' + 'dark']: {
      backgroundColor: !props?.editable
        ? colors.input_placeholder_bg_disabled
        : colors.input_background_dark,
    },
    errorContainer: {
      borderColor: 'red',
      backgroundColor: !props?.editable ? colors.input_placeholder_bg_disabled : '#F0F0F5',
    },
    icon: {},
    input: {
      flex: 1,
      lineHeight: null,
      height: '100%',
      color: colors[`input_text_${props?.type || 'default'}`],
      width: props?.Icon || props?.secureTextEntry ? '90%' : '100%',
      textAlignVertical: props?.textarea ? 'top' : 'center',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: props?.textarea ? 10 : 0,
      paddingBottom: props?.textarea ? 10 : 0,
    },
  })
