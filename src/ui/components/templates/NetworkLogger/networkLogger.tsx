import React, { useState } from 'react'
import { CompProps } from 'types/component.types'
import { INetworkLoggerProps } from './types'
import { Block } from 'molecules/Block'
import { DocumenttextIcon } from 'icons/DocumenttextIcon'
import { View } from 'atoms/View'
import NetworkLoggerLib from 'react-native-network-logger'
import { ICreateStyles, useStyles } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { CloseIcon } from 'icons/CloseIcon'
import { FloatingBtn } from 'organisms/FloatingBtn'

export const NetworkLogger: CompProps<INetworkLoggerProps> = ({ isVisible }) => {
  const styles = useStyles(SS)

  return (
    <>
      {isVisible && (
        <View style={styles.container}>
          <NetworkLoggerLib />
        </View>
      )}

      {/*<FloatingBtn width={50}>*/}
      {/*  <Block*/}
      {/*    width={50}*/}
      {/*    height={50}*/}
      {/*    radius={50}*/}
      {/*    icon={showNetworkLogger ? CloseIcon : DocumenttextIcon}*/}
      {/*    onPress={() => setShowNetworkLogger(!showNetworkLogger)}*/}
      {/*  />*/}
      {/*</FloatingBtn>*/}
    </>
  )
}

const SS: ICreateStyles = ({ edges }) =>
  ScaledSheet.create({
    btn: {
      position: 'absolute',
      zIndex: 999,
      top: 30,
      left: 30,
    },
    container: {
      position: 'absolute',
      top: edges.top,
      left: 0,
      right: 0,
      bottom: edges.bottom,
      zIndex: 1000,
    },
  })
