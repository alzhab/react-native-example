import React, { useCallback } from 'react'
import { CompProps } from 'types/component.types'
import { IScreenHeaderProps } from './types'
import { View } from 'atoms/View'
import { Text } from 'atoms/Text'
import { UserIcon } from 'icons/UserIcon'
import { observer } from 'mobx-react'
import { ArrowLeftIcon } from 'icons/ArrowLeftIcon'
import { useNavigation } from '@react-navigation/native'
import { useSpacings } from '@corrbo/module-spacing-props'
import { RootNav } from 'navigations/RootNavigation'
import { Block } from 'molecules/Block'
import { LogotextIcon } from 'assets/icons/LogotextIcon'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EAuthenticationFlowEvents } from 'blms/AuthenticationBlm/flow'
import { EGuideFlowEvents } from 'blms/GuideBlm/flow'

export const ScreenHeader: CompProps<IScreenHeaderProps> = observer(props => {
  const { margin, padding } = useSpacings(props)
  const navigaton = useNavigation<RootNav>()

  const profileCallback = useCallback(() => {
    EVENT_EMITTER.emitEvent({
      name: EGuideFlowEvents.ON_GUIDE_NEED_TO_SHOW,
      // @ts-ignore
    })
  }, [navigaton])

  const goBackCallback = useCallback(() => {
    if (props.backPress) {
      props.backPress()
    } else {
      navigaton.goBack()
    }
  }, [navigaton, props])

  return (
    <View
      dir={'row'}
      ai={'center'}
      jc={'space-between'}
      style={[
        margin,
        padding,
        { paddingBottom: 7.5, paddingTop: 10 },
        props.style,
      ]}
      onLayout={props.onLayout}>
      {props.back && (
        <ArrowLeftIcon paddingR={8} paddingVer={8} onPress={goBackCallback} />
      )}

      {!!props.title && (
        <Text
          type={'titleLarge'}
          color={props.titleColor || 'screen_header_title'}>
          {props.title}
        </Text>
      )}

      {props.titleIcon && <LogotextIcon />}

      {props.profile && (
        <Block
          icon={UserIcon}
          bg={'variant5'}
          paddingHor={13}
          paddingVer={11}
          radius={10}
          onPress={profileCallback}
        />
      )}
    </View>
  )
})
