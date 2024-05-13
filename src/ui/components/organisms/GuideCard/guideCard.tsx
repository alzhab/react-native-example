import React, { useEffect } from 'react'
import { CompProps } from 'types/component.types'
import { IGuideCardProps } from './types'
import { ICreateStyles, SPACINGS, useStyles, useTheme } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { View } from 'atoms/View'
import { WIDTH } from 'configs/Theme/constants'
import { Block } from 'molecules/Block'
import { Text } from 'atoms/Text'
import { ArrowDownIcon } from 'icons/ArrowDownIcon'
import { CloseIcon } from 'icons/CloseIcon'
import { StepsIndicator } from 'molecules/StepsIndicator'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { LogotextIcon } from 'assets/icons/LogotextIcon'
import { Image } from 'atoms/Image'

export const GuideCard: CompProps<IGuideCardProps> = props => {
  const styles = useStyles<IGuideCardProps>(SS, props)
  const { colors } = useTheme()
  const progressValue = useSharedValue(props.activeStep)

  useEffect(() => {
    progressValue.value = withTiming(props.activeStep - 1)
  }, [props.activeStep])

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header} dir={'row'} ai={'center'} jc={'space-between'}>
          <LogotextIcon color={colors.guide_card_close} />
          <CloseIcon color={colors.guide_card_close} onPress={props.onClose} />
        </View>
        <Image
          source={props.info.image ? props.info.image : { uri: 'https://dummy.img' }}
          style={styles.image}
        />
        <View dir={'row'} ai={'center'} jc={'space-between'} paddingVer={4} paddingHor={24}>
          <StepsIndicator progressValue={progressValue} steps={props.stepsCount} />

          <Block
            textType={'titleSmall'}
            bg={'transparent'}
            onPress={props.onNext}
            text={'Далее'}
            paddingVer={14}
            paddingHor={12}
          />
        </View>

        <View paddingVer={31} marginB={10} gap={5} paddingHor={18}>
          <Text type={'titleMedium'}>{props.info.title}</Text>
          <Text type={'bodyMedium'}>{props.info.desc}</Text>
        </View>
      </View>

      <ArrowDownIcon pressableStyle={styles.arrow} />
    </>
  )
}

const SS: ICreateStyles<IGuideCardProps> = ({ props, colors, edges }) => {
  const cardContainerLayout: any = {}
  const arrowContainerLayout: any = {}
  const imageCompLayout: any = props?.config.layout || {}
  const cardLayout: any = props?.info.cardLayoutFromComponentImage || {}
  const arrowLayout: any = props?.info.arrowLayoutFromComponentImage || {}

  Object.keys(cardLayout).forEach((key: string) => {
    const styleKey: any = key.toLowerCase().replace('plus', '')

    cardContainerLayout[styleKey] = imageCompLayout[styleKey] + cardLayout[key]

    arrowContainerLayout[styleKey] = imageCompLayout[styleKey] + arrowLayout[key]
  })

  return ScaledSheet.create({
    header: {
      position: 'absolute',
      top: 15,
      left: 15,
      right: 15,
      zIndex: 4,
    },
    container: {
      position: 'absolute',
      zIndex: 3,
      width: WIDTH - SPACINGS.container_20 * 2,
      borderRadius: 18,
      backgroundColor: colors.guide_card_bg,
      overflow: 'hidden',
      ...cardContainerLayout,
    },
    arrow: {
      position: 'absolute',
      zIndex: 2,
      transform: [{ translateX: -23 / 2 }],
      ...arrowContainerLayout,
    },
    image: {
      height: 189,
      width: '100%',
      backgroundColor: colors.guide_card_image_bg,
    },
  })
}
