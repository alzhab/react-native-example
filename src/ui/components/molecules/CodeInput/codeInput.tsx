import React from 'react'
import { CompProps } from 'types/component.types'
import { ICodeInputProps } from './types'
import { ICreateStyles, useStyles } from '@corrbo/module-theme'
import { IModalBottomProps } from 'atoms/ModalBottom'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { View } from 'atoms/View'
import { Text } from 'atoms/Text'
import { Spacings, useSpacings } from '@corrbo/module-spacing-props'
import { Controller } from 'react-hook-form'
import { TextInput } from 'react-native'

export const CodeInput: CompProps<ICodeInputProps & Spacings> = props => {
  const { margin } = useSpacings(props)
  const styles = useStyles(SS)

  return (
    <Controller
      control={props.control}
      render={({ field, fieldState }) => (
        <View
          dir={'row'}
          ai={'center'}
          style={[margin]}
          paddingHor={28}
          jc={'space-between'}
          gap={21}>
          {Array(props.size)
            .fill('')
            .map((_, index) => (
              <View key={index.toString()} style={styles.container}>
                {!!(field.value || '')[index] && (
                  <Text type={'headlineMedium'}>{(field.value || '')[index]}</Text>
                )}
              </View>
            ))}

          <TextInput
            style={styles.input}
            onChangeText={val => {
              if (val.length === props.size) {
                props.onFinish(val)
                field.onChange('')
              } else {
                field.onChange(val)
              }
            }}
            keyboardType={'numeric'}
            textContentType="oneTimeCode"
            autoComplete="one-time-code"
            autoFocus
            maxLength={props.size}
          />
        </View>
      )}
      name={props.name}
    />
  )
}

CodeInput.defaultProps = {
  size: 4,
}

const SS: ICreateStyles<IModalBottomProps> = ({ colors, edges, props }) =>
  ScaledSheet.create({
    container: {
      backgroundColor: colors.code_input_colors_bg,
      borderRadius: 7,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      aspectRatio: 1,
    },
    input: {
      position: 'absolute',
      zIndex: 2,
      opacity: 0,
      width: '100%',
      height: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  })
