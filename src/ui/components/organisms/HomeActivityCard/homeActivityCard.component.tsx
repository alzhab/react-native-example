import React from 'react'
import { CompProps } from 'types/component.types'
import { IHomeActivityCardProps } from './types'
import { View } from 'atoms/View'
import { ICreateStyles, useStyles } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { Text } from 'atoms/Text'
import { Block } from 'molecules/Block'
import { FONTS_TYPES } from 'configs/Theme/fonts/types'
import { ArrowCircleRightIcon } from 'icons/ArrowCircleRightIcon'
import { ApplicationStatusColors, IApplicationsStatusEnum } from 'repositories/Api'
import { AddcircleIcon } from 'icons/AddcircleIcon'

export const HomeActivityCard: CompProps<IHomeActivityCardProps> = props => {
  const styles = useStyles(SS)

  return (
    <View style={styles.card}>
      <View dir={'row'} ai={'center'} jc={'space-between'} marginB={10}>
        <Text type={'titleSmall'}>{props.title}</Text>

        <Block
          bg={'variant1'}
          textFamily={FONTS_TYPES.semiBold}
          text={props.count.toString()}
          height={19}
          paddingHor={11}
          radius={10}
        />
      </View>

      <View gap={10}>
        {props.data.map((item, index) => (
          <Block
            textStyle={{ width: '70%' }}
            textNumbersOfLine={1}
            onPress={() => props.onPress(item.id)}
            key={index.toString()}
            bg={'variant8'}
            text={item.title}
            textSize={14}
            textFamily={FONTS_TYPES.regular}
            width={'100%'}
            radius={10}
            paddingHor={10}
            paddingVer={5}
            jc={'space-between'}>
            <Block
              onPress={() => props.onPress(item.id)}
              text={item.value}
              textNumbersOfLine={1}
              radius={5}
              textSize={10}
              textFamily={FONTS_TYPES.regular}
              width={90}
              jc={'center'}
              paddingHor={10}
              paddingVer={3}>
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor:
                      ApplicationStatusColors[item.status || IApplicationsStatusEnum.Open].circle,
                  },
                ]}
              />
            </Block>
          </Block>
        ))}
      </View>

      <View dir={'row'} ai={'center'} jc={'space-between'}>
        <Block
          onPress={props.onPressNew}
          paddingVer={10}
          bg={'transparent'}
          text={props.newText}
          textSize={12}
          textFamily={FONTS_TYPES.semiBold}
          iconColor={'variant1'}
          icon={AddcircleIcon}
          iconSize={18}
        />

        <Block
          onPress={props.onPressAll}
          paddingVer={10}
          rl
          bg={'transparent'}
          text={'Смотреть все'}
          textSize={12}
          textFamily={FONTS_TYPES.semiBold}
          iconColor={'variant1'}
          icon={ArrowCircleRightIcon}
          iconSize={18}
        />
      </View>
    </View>
  )
}

const SS: ICreateStyles = ({ colors }) =>
  ScaledSheet.create({
    card: {
      backgroundColor: colors.home_activity_card_bg,
      paddingHorizontal: 10,
      paddingTop: 10,
      borderRadius: 10,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 8,
    },
  })
