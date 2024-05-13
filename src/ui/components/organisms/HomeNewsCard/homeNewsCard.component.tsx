import React from 'react'
import { CompProps } from 'types/component.types'
import { IHomeNewsCardProps } from './types'
import { ICreateStyles, SPACINGS, useStyles } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { View } from 'atoms/View'
import { Text } from 'atoms/Text'
import { Block } from 'molecules/Block'
import { ArrowNarrowRightIcon } from 'icons/ArrowNarrowRightIcon'
import { ImageBackground } from 'react-native'
import { Pressable } from 'atoms/Pressable'
import { useServerImage } from 'hooks/useServerImage'
import { WIDTH } from 'configs/Theme/constants'

export const HomeNewsCard: CompProps<IHomeNewsCardProps> = props => {
  const styles = useStyles(SS)
  const img = useServerImage(props.img || '')

  return (
    <Pressable onPress={props.onPress} style={styles.card}>
      <ImageBackground imageStyle={{ borderRadius: 10 }} style={styles.image} source={{ uri: img }}>
        <View jc={'flex-end'} style={styles.content}>
          <ImageBackground
            resizeMode={'cover'}
            style={styles.info}
            imageStyle={{ width: '110%' }}
            source={require('assets/images/newsBack.png')}>
            <View style={styles.textContainer}>
              <Text type={'titleSmall'} color={'home_news_card_title'}>
                {props.title}
              </Text>
              <Text numberOfLines={1} type={'labelMedium'} color={'home_news_card_desc'}>
                {props.desc}
              </Text>
            </View>

            <Block radius={100} icon={ArrowNarrowRightIcon} iconSize={18} width={38} height={28} />
          </ImageBackground>
        </View>
      </ImageBackground>
    </Pressable>
  )
}

const SS: ICreateStyles = ({ colors }) =>
  ScaledSheet.create({
    card: {
      width: '100%',
      minHeight: 170,
      aspectRatio: 2,
      borderRadius: 10,
      overflow: 'hidden',
    },
    content: { width: '100%', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
    info: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingTop: 7,
      paddingBottom: 10,
    },
    image: {
      width: WIDTH - SPACINGS.container_20 * 2,
      height: '100%',
      borderRadius: 10,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: colors.home_news_card_bg,
    },
    textContainer: {
      width: '60%',
    },
  })
