import React from 'react'
import { CompProps } from 'types/component.types'
import { IMediaViewProps } from './types'
import { observer } from 'mobx-react'
import { useMediaViewAdapter } from 'blms/MediaViewBlm/ui-adapters'
import { ICreateStyles, SPACINGS, useStyles } from '@corrbo/module-theme'
import { Pressable } from 'atoms/Pressable'
import { CloseIcon } from 'icons/CloseIcon'
import Modal from 'react-native-modal'
import { IModalBottomProps } from 'atoms/ModalBottom'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { View } from 'atoms/View'
import { Text } from 'atoms/Text'
import { Image } from 'atoms/Image'
import { WIDTH } from 'configs/Theme/constants'

export const MediaView: CompProps<IMediaViewProps> = observer(() => {
  const styles = useStyles(SS)
  const { isOpen, data, close } = useMediaViewAdapter()

  return (
    <Modal
      testID={'modal'}
      isVisible={isOpen}
      onSwipeComplete={close}
      style={[styles.modalView]}
      hasBackdrop={true}
      onBackdropPress={close}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      useNativeDriver
      avoidKeyboard
      backdropColor={'rgba(112,112,112,0.7)'}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      animationInTiming={400}
      animationOutTiming={600}
      statusBarTranslucent={true}>
      <View style={styles.modalContent} full ai={'center'} jc={'center'}>
        <CloseIcon onPress={close} pressableStyle={styles.closeBtn} />
        <Image
          source={{ uri: data?.uri }}
          resizeMode={'cover'}
          style={{
            width: WIDTH - SPACINGS.container_20 * 2,
            height: WIDTH - SPACINGS.container_20 * 2,
          }}
          borderRadius={20}
        />
      </View>
    </Modal>
  )
})

const SS: ICreateStyles<IModalBottomProps> = ({ colors, edges, props }) =>
  ScaledSheet.create({
    modalView: {
      margin: 0,
    },
    modalContent: {
      aspectRatio: 1,
    },
    closeBtn: {
      position: 'absolute',
      top: SPACINGS.container_20,
      right: SPACINGS.container_20,
      paddingHorizontal: 15,
      paddingVertical: 15,
      zIndex: 2,
    },
  })
