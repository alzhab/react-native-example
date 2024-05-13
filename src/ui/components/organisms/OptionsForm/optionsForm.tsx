import React, { useEffect } from 'react'
import { CompProps } from 'types/component.types'
import { IOptionsFormProps } from './types'
import { View } from 'atoms/View'
import { TrashIcon } from 'icons/TrashIcon'
import { useFieldArray } from 'react-hook-form'
import { Input } from 'molecules/Input'
import { AddcircleIcon } from 'icons/AddcircleIcon'
import { Spacings, useSpacings } from '@corrbo/module-spacing-props'
import { VALIDATOR_MESSAGES } from 'configs/Theme/constants'
import { useTheme } from '@corrbo/module-theme'

export const OptionsForm: CompProps<IOptionsFormProps & Spacings> = props => {
  const { margin, padding } = useSpacings(props)
  const { fields, append, remove } = useFieldArray({
    control: props.control,
    name: props.name,
    shouldUnregister: false,
  })
  const { colors } = useTheme()

  useEffect(() => {
    if (fields.length === 0) {
      append('')
    }
  }, [fields])

  return (
    <View gap={10} style={[margin, padding]}>
      {fields.map((item, index) => {
        return (
          <View key={item.id} dir={'row'} ai={'flex-start'} jc={'space-between'}>
            <Input
              rules={{ required: VALIDATOR_MESSAGES.required }}
              containerStyle={{ flex: 1 }}
              type={'outline'}
              name={`${props.name}.${index}`}
              control={props.control}
              placeholder={'Введите ФИО Члена ОСИ'}
            />

            {fields.length < (props.max || 3) && index === fields.length - 1 && (
              <AddcircleIcon
                size={25}
                sizeType={'height'}
                paddingVer={10}
                paddingHor={10}
                color={colors.options_form_item_icon_active}
                onPress={() => append('')}
              />
            )}

            <TrashIcon
              size={25}
              sizeType={'height'}
              paddingVer={10}
              paddingHor={10}
              onPress={fields.length === 1 ? undefined : () => remove(index)}
              color={
                fields.length === 1
                  ? colors.options_form_item_icon_disabled
                  : colors.options_form_item_icon_active
              }
            />
          </View>
        )
      })}
    </View>
  )
}

OptionsForm.defaultProps = {
  max: 3,
}
