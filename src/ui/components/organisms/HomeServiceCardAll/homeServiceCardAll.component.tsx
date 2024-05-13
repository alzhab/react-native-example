import React from 'react'
import { CompProps } from 'types/component.types'
import { IVotingCardAllProps } from './types'
import { Text } from 'atoms/Text'
import { Pressable } from 'atoms/Pressable'
import { Block } from 'molecules/Block'
import { ArrowNarrowRightIcon } from 'icons/ArrowNarrowRightIcon'

export const HomeServiceCardAll: CompProps<IVotingCardAllProps> = ({ onPress }) => {
  return (
    <Pressable paddingVer={10} paddingHor={10} onPress={onPress} ai={'center'} jc={'center'}>
      <Block
        radius={100}
        icon={ArrowNarrowRightIcon}
        iconSize={18}
        paddingHor={10}
        paddingVer={5}
        marginB={5}
        onPress={onPress}
      />

      <Text type={'labelSmall'}>Смотреть все</Text>
    </Pressable>
  )
}
