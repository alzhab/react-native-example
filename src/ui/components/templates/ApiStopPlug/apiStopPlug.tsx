import React from 'react'
import { CompProps } from 'types/component.types'
import { IApiStopPlugProps } from './types'
import { observer } from 'mobx-react'
import { ICreateStyles, useStyles } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { View } from 'atoms/View'
import { Text } from 'atoms/Text'
import { LogotextIcon } from 'assets/icons/LogotextIcon'
import { useServerApiStopAdapter } from 'blms/AppStateBlm/ui-adapters/serverApiStop.adapter'
import { Block } from 'molecules/Block'

export const ApiStopPlug: CompProps<IApiStopPlugProps> = observer(() => {
  const styles = useStyles(SS)
  const { refresh } = useServerApiStopAdapter()

  return (
    <View ai={'center'} gap={48} jc={'center'} flex style={styles.container}>
      <LogotextIcon size={150} />
      <View>
        <Text marginB={16} type={'headlineSmall'} ta={'center'}>
          Ошибка сервера: 502
        </Text>
        <Text type={'bodyLarge'} ta={'center'}>
          Мы уже работаем над восстановлением системы
        </Text>
      </View>
      <Block onPress={refresh} paddingHor={40} paddingVer={14} text={'Обновить'} radius={100} />
    </View>
  )
})

const SS: ICreateStyles = ({ colors }) =>
  ScaledSheet.create({
    container: {
      backgroundColor: colors.screen_background,
    },
  })
