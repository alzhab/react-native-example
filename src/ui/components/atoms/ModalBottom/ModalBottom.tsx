import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { CompProps } from 'types/component.types'
import { IModalBottomProps } from './types'
import Modal from 'react-native-modal'
import { ICreateStyles, SPACINGS, useStyles } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { View } from 'atoms/View'
import { CloseIcon } from 'icons/CloseIcon'
import { HEIGHT } from 'configs/Theme/constants'
import { ScrollView } from 'react-native'
import { observer } from 'mobx-react'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import Toast from 'react-native-toast-message'
import { TOAST_CONFIG } from 'configs/Toast'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const ModalBottom: CompProps<IModalBottomProps> = observer(props => {
  const styles = useStyles(SS, props)
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const edges = useSafeAreaInsets()

  const open = useCallback(() => {
    if (bottomSheetModalRef && bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.present()
    }
  }, [bottomSheetModalRef])

  const close = useCallback(() => {
    if (bottomSheetModalRef && bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.close()
    }
  }, [])

  const snapPoints = useMemo(
    () => [props.minHeight || '90%', props.maxHeight || '90%'],
    [props.maxHeight, props.minHeight],
  )

  useEffect(() => {
    if (props.isForm) {
      if (props.visible) {
        open()
      } else {
        close()
      }
    }
  }, [props.visible])

  return props.isForm ? (
    <BottomSheetModal
      onDismiss={props.close}
      style={{ paddingLeft: 0 }}
      bottomInset={0}
      containerStyle={{ paddingLeft: 0 }}
      ref={bottomSheetModalRef}
      // @ts-ignore
      snapPoints={snapPoints}
      backdropComponent={backdropProps => (
        <BottomSheetBackdrop
          {...backdropProps}
          style={[backdropProps.style]}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      )}>
      {!!props.header && props.header}
      {props.scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          overScrollMode={'never'}
          style={styles.modalContentStyle}
          contentContainerStyle={[styles.modalContentCotainerStyle]}>
          {!!props.close && <CloseIcon onPress={props.close} pressableStyle={styles.closeBtn} />}
          {props.children}
        </ScrollView>
      ) : (
        <View style={[styles.modalContentStyle, styles.modalContentCotainerStyle]}>
          {!!props.close && <CloseIcon onPress={props.close} pressableStyle={styles.closeBtn} />}
          {props.children}
        </View>
      )}
    </BottomSheetModal>
  ) : (
    <Modal
      testID={'modal'}
      isVisible={props.visible}
      onSwipeComplete={props.close}
      style={[styles.modalView]}
      hasBackdrop={props.hasBackdrop}
      onBackdropPress={props.close}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      useNativeDriver
      avoidKeyboard
      backdropColor={props.backdropColor || 'rgba(112,112,112,0.7)'}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      animationInTiming={400}
      animationOutTiming={600}
      statusBarTranslucent={true}>
      {props.visible && <Toast topOffset={edges.top + 15} config={TOAST_CONFIG} />}

      <View paddingHor={SPACINGS.container_10}>
        {!!props.header && props.header}
        {props.scroll ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            overScrollMode={'never'}
            style={styles.modalContentStyle}
            contentContainerStyle={[styles.modalContentCotainerStyle]}>
            {!!props.close && <CloseIcon onPress={props.close} pressableStyle={styles.closeBtn} />}
            {props.children}
          </ScrollView>
        ) : (
          <View style={[styles.modalContentStyle, styles.modalContentCotainerStyle]}>
            {!!props.close && <CloseIcon onPress={props.close} pressableStyle={styles.closeBtn} />}
            {props.children}
          </View>
        )}
      </View>
    </Modal>
  )
})

ModalBottom.defaultProps = {
  hasBackdrop: true,
  scroll: true,
}

const SS: ICreateStyles<IModalBottomProps> = ({ colors, edges, props }) =>
  ScaledSheet.create({
    modalView: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContentStyle: {
      maxHeight: props?.maxHeight || HEIGHT - 10,
      minHeight: props?.minHeight || 0,
      backgroundColor: props?.empty ? 'transparent' : colors.modal_bottom_colors,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalContentCotainerStyle: {
      paddingTop: props?.close ? 48 : 20,
      paddingHorizontal: SPACINGS[props?.contentContainer || 'container_10'],
      backgroundColor: props?.empty ? 'transparent' : colors.modal_bottom_colors,
      paddingBottom: edges.bottom || 24,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    closeBtn: {
      position: 'absolute',
      top: 0,
      right: 0,
      paddingHorizontal: 15,
      paddingVertical: 15,
    },
  })
