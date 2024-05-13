import React, { FC, useCallback, useMemo, useRef, useState } from 'react'
import { IBottomTabBarProps } from './types'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { Text } from 'atoms/Text'
import { observer } from 'mobx-react'
import { CompProps } from 'types/component.types'
import { ICreateStyles, useStyles } from '@corrbo/module-theme'
import { DEFAULT_SHADOW, TABS_HEIGHT, WIDTH } from 'configs/Theme/constants'
import { IIconProps } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'
import { Block } from 'molecules/Block'
import { GuideStep } from 'templates/GuideStep'
import { View } from 'atoms/View'
import { GUARD_TABS } from 'templates/BottomTabBar/constants'
import { BottomBarNavigationParamsMap } from 'navigations/BottomBarNavigation'
import { useKeyboardVisible } from 'hooks/useKeyboardVisible'
import DropShadow from 'react-native-drop-shadow'
import { CheckCircleIcon } from 'icons/CheckCircleIcon'
import { DocumentDuplicateIcon } from 'icons/DocumentDuplicateIcon'
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  ZoomInDown,
  ZoomOutDown,
} from 'react-native-reanimated'
import { Pressable as PressabelForAnim } from 'react-native'
import { Pressable } from 'atoms/Pressable'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EAuthenticationFlowEvents } from 'blms/AuthenticationBlm/flow'
import { EApartmentsFlowEvents } from 'blms/ApartmentsBlm/flow'
import { PluscirclebigIcon } from 'icons/PluscirclebigIcon'
import { useApartmentChoosedAdapter } from 'blms/ApartmentsBlm/ui-adapters'
import { NewspaperIcon } from 'icons/NewspaperIcon'

const AnimatedDropShadow = Animated.createAnimatedComponent(DropShadow)
const AnimatedPressable = Animated.createAnimatedComponent(PressabelForAnim)

interface IItemProps {
  onPress: () => void
  Icon: FC<IIconProps & Spacings>
  isFocused: boolean
  label: string
}

const Item: FC<IItemProps> = props => {
  const style = useStyles(SS)

  return (
    <Pressable
      onPress={props.onPress}
      ai={'center'}
      jc={'center'}
      style={style.tab}>
      <Block
        iconActive={props.isFocused}
        width={64}
        height={32}
        radius={50}
        icon={props.Icon}
        bg={props.isFocused ? 'variant5' : 'transparent'}
        iconColor={'variant1'}
        marginB={props.isFocused ? 8 : 4}
        style={{ opacity: props.isFocused ? 1 : 0.5 }}
        onPress={props.onPress}
      />

      <Text
        type={'labelSmall'}
        ta={'center'}
        numberOfLines={1}
        color={
          props.isFocused ? 'tabbar_active_label' : 'tabbar_inactive_label'
        }>
        {props.label}
      </Text>
    </Pressable>
  )
}

const BottomTabBarComp: CompProps<
  {
    onReady: () => void
    toggleBackdrop(): void
    closeBackdrop: () => void
  } & IBottomTabBarProps &
    BottomTabBarProps
> = observer(props => {
  const style = useStyles(SS)
  let timeout = useRef<any>(null)
  const activeIndex = useMemo(() => props.state.index, [props.state.index])

  const onPress = useCallback(
    (name: keyof BottomBarNavigationParamsMap) => {
      if (timeout && timeout.current) {
        clearTimeout(timeout.current)
      }

      const call = () => {
        props.closeBackdrop()
        props.navigation.navigate({ name, merge: true } as any)
      }

      const action = () => {
        if (name === 'ApplicationsScreen') {
          EVENT_EMITTER.emitEvent({
            name: EApartmentsFlowEvents.ON_APARTMENT_GUARD_ACTION,
            data: {
              call,
              type: 'can_work_applications',
            },
          })
        } else if (name === 'VotesScreen') {
          EVENT_EMITTER.emitEvent({
            name: EApartmentsFlowEvents.ON_APARTMENT_GUARD_ACTION,
            data: {
              call,
              type: 'can_work_votes',
            },
          })
        } else if (name === 'EventsScreen') {
          EVENT_EMITTER.emitEvent({
            name: EApartmentsFlowEvents.ON_APARTMENT_GUARD_ACTION,
            data: {
              call,
            },
          })
        } else {
          call()
        }
      }

      timeout.current = setTimeout(() => {
        if (GUARD_TABS.includes(name)) {
          props.closeBackdrop()
          EVENT_EMITTER.emitEvent({
            name: EAuthenticationFlowEvents.ON_AUTH_GUARD_ACTION,
            data: {
              action,
            },
          })
        } else {
          action()
        }
      }, 0)
    },
    [props],
  )

  return (
    <Animated.View
      entering={SlideInDown.duration(600)}
      style={style.bottomBar}
      onLayout={props.onReady}>
      {props.state.routes.slice(0, 2).map((route, index) => {
        const isFocused = activeIndex === index
        const { options } = props.descriptors[route.key]
        const label = options.tabBarLabel || ''
        const Icon: any = options.tabBarIcon

        return (
          <Item
            key={route.key}
            onPress={() =>
              onPress(route.name as keyof BottomBarNavigationParamsMap)
            }
            Icon={Icon}
            isFocused={isFocused}
            label={label as string}
          />
        )
      })}

      <PluscirclebigIcon
        onPress={() => {
          EVENT_EMITTER.emitEvent({
            name: EAuthenticationFlowEvents.ON_AUTH_GUARD_ACTION,
            data: {
              action: props.toggleBackdrop,
            },
          })
        }}
        pressableStyle={[
          { paddingBottom: 18.5, alignItems: 'center' },
          style.tab,
        ]}
        size={54}
      />

      {props.state.routes.slice(2, 4).map((route, index) => {
        const isFocused = activeIndex === index + 2
        const { options } = props.descriptors[route.key]
        const label = options.tabBarLabel || ''
        const Icon: any = options.tabBarIcon

        return (
          <Item
            key={route.key}
            onPress={() =>
              onPress(route.name as keyof BottomBarNavigationParamsMap)
            }
            Icon={Icon}
            isFocused={isFocused}
            label={label as string}
          />
        )
      })}
    </Animated.View>
  )
})

export const BottomTabBar: CompProps<IBottomTabBarProps & BottomTabBarProps> =
  observer(props => {
    const style = useStyles(SS)
    const [isReadToCapture, setIsReadToCapture] = useState(false)
    const { isKeyboardVisible } = useKeyboardVisible()
    const [isBackdropVisible, setIsBackdropVisible] = useState(false)
    const { choosedApartment } = useApartmentChoosedAdapter()

    // TODO Refactor
    return !isKeyboardVisible ? (
      <>
        {isBackdropVisible && (
          <AnimatedPressable
            onPress={() => setIsBackdropVisible(false)}
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
            style={style.backdrop}>
            <AnimatedDropShadow
              entering={ZoomInDown.duration(150)}
              exiting={ZoomOutDown.duration(150)}
              style={DEFAULT_SHADOW}>
              <View style={style.card} paddingHor={15} ai={'flex-start'}>
                {choosedApartment.is_osi && (
                  <>
                    <Block
                      style={{ justifyContent: 'flex-start' }}
                      width={'100%'}
                      gap={7}
                      iconActive
                      bg={'transparent'}
                      text={'Создать новость'}
                      onPress={() => {
                        EVENT_EMITTER.emitEvent({
                          name: EApartmentsFlowEvents.ON_APARTMENT_GUARD_ACTION,
                          data: {
                            call: () => {
                              props.navigation.navigate('NewsCreateScreen')
                              setIsBackdropVisible(false)
                            },
                            type: 'can_work_applications',
                          },
                        })
                      }}
                      paddingVer={10}
                      icon={NewspaperIcon}
                      iconColor={'variant1'}
                    />

                    <View style={style.divider} />
                  </>
                )}

                <Block
                  style={{ justifyContent: 'flex-start' }}
                  width={'100%'}
                  gap={7}
                  bg={'transparent'}
                  text={'Создать заявку'}
                  onPress={() => {
                    EVENT_EMITTER.emitEvent({
                      name: EApartmentsFlowEvents.ON_APARTMENT_GUARD_ACTION,
                      data: {
                        call: () => {
                          props.navigation.navigate('ApplicationCreateScreen')
                          setIsBackdropVisible(false)
                        },
                        type: 'can_work_applications',
                      },
                    })
                  }}
                  paddingVer={10}
                  icon={DocumentDuplicateIcon}
                  iconColor={'variant1'}
                />

                <View style={style.divider} />

                <Block
                  style={{ justifyContent: 'flex-start' }}
                  width={'100%'}
                  gap={7}
                  bg={'transparent'}
                  text={'Создать голосование'}
                  onPress={() => {
                    EVENT_EMITTER.emitEvent({
                      name: EApartmentsFlowEvents.ON_APARTMENT_GUARD_ACTION,
                      data: {
                        call: () => {
                          props.navigation.navigate('VoteCreateScreen')
                          setIsBackdropVisible(false)
                        },
                        type: 'can_work_votes',
                      },
                    })
                  }}
                  paddingVer={10}
                  icon={CheckCircleIcon}
                  iconColor={'variant1'}
                />
              </View>
            </AnimatedDropShadow>
          </AnimatedPressable>
        )}
        <GuideStep
          stepNumbers={[1, 2, 3, 4, 5]}
          style={style.container}
          isReadyToCapture={isReadToCapture}>
          <BottomTabBarComp
            toggleBackdrop={() => setIsBackdropVisible(!isBackdropVisible)}
            closeBackdrop={() => setIsBackdropVisible(false)}
            onReady={() => setIsReadToCapture(true)}
            {...props}
          />
        </GuideStep>
      </>
    ) : null
  })

const SS: ICreateStyles = ({ colors, edges }) =>
  ScaledSheet.create({
    container: {
      width: '100%',
      backgroundColor: colors.tabbar_bg,
      paddingBottom: edges.bottom,
      zIndex: 3,
    },
    backdrop: {
      position: 'absolute',
      top: 0,
      bottom: TABS_HEIGHT,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(112,112,112,0.7)',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 10 + edges.bottom,
    },
    card: {
      width: WIDTH * 0.6,
      borderRadius: 8,
      maxHeight: 200,
      backgroundColor: colors.info_btn_card_bg,
      zIndex: 2,
    },
    divider: {
      height: 1,
      width: '100%',
      backgroundColor: colors.drop_down_border,
    },
    bottomBar: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.tabbar_bg,
      height: TABS_HEIGHT,
    },
    tab: {
      width: '20%',
      height: '100%',
    },
    tabIcon: {},
  })
