import React, { useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react'
import { Navigation } from 'navigations/Navigation'
import {
  Button,
  InputAccessoryView,
  Keyboard,
  StatusBar,
  View,
} from 'react-native'
import { Boot } from 'templates/Boot'
import { COLORS_SB_PROPS, useTheme } from '@corrbo/module-theme'
import { GlobalLoading } from 'templates/GlobalLoading'
import { GuideBackdrop } from 'templates/GuideBackdrop'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { runOnJS } from 'react-native-reanimated'
import { FloatInfo } from 'templates/FloatInfo'
import { useServerApiStopAdapter } from 'blms/AppStateBlm/ui-adapters/serverApiStop.adapter'
import { ApiStopPlug } from 'templates/ApiStopPlug'
import Toast from 'react-native-toast-message'
import { TOAST_CONFIG } from 'configs/Toast'
import { useInitialScreenAdapter } from '@corrbo/module-navigation/blm/ui-adapters/initial-screen.adapter'
import { useIsStoresHydrated } from '@corrbo/module-localstorage/hooks/useIsStoresHydrated'
import { HYDRATED_STORES } from 'blms/hydrated-stores'
import { EAppStateFlowEvents } from 'blms/AppStateBlm/flow'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNotificationsHandlerAdapter } from 'blms/NotificationsBlm/ui-adapters'
import { IS_IOS, WIDTH } from 'configs/Theme/constants'
import { MediaView } from 'templates/MediaView'

const EntryPoint = observer(() => {
  useNotificationsHandlerAdapter()

  const { activeThemeName } = useTheme()
  const { initialScreen, isNavigationReady } = useInitialScreenAdapter()
  const edges = useSafeAreaInsets()

  const isStoresHydrated = useIsStoresHydrated(HYDRATED_STORES)

  const hideBoot = useMemo(
    () => isNavigationReady && !!initialScreen && isStoresHydrated,
    [isNavigationReady, initialScreen, isStoresHydrated],
  )

  const [isVisible, setIsVisible] = useState(false)

  const { isPlugOpen } = useServerApiStopAdapter()

  const gesture = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(4)
    .onStart(() => runOnJS(setIsVisible)(!isVisible))

  useEffect(() => {
    if (isStoresHydrated) {
      EVENT_EMITTER.emitEvent({ name: EAppStateFlowEvents.ON_APP_OPEN })
    }
  }, [isStoresHydrated])

  return !isPlugOpen ? (
    <GestureDetector gesture={gesture}>
      <Animated.View style={{ flex: 1 }}>
        <StatusBar {...COLORS_SB_PROPS[activeThemeName]} />

        <BottomSheetModalProvider>
          {isStoresHydrated && <Navigation initialScreen={initialScreen} />}
        </BottomSheetModalProvider>

        {/*<NetworkLogger isVisible={isVisible} />*/}

        <GlobalLoading />

        <Boot hide={hideBoot} />

        <GuideBackdrop />

        <FloatInfo />

        {/*<StatusesDialog />*/}

        <Toast topOffset={edges.top + 15} config={TOAST_CONFIG} />

        <MediaView />

        {IS_IOS && (
          <InputAccessoryView nativeID="Done">
            <View
              style={{
                width: WIDTH,
                height: 48,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: '#F8F8F8',
                paddingHorizontal: 8,
              }}>
              <Button onPress={() => Keyboard.dismiss()} title="Готово" />
            </View>
          </InputAccessoryView>
        )}
      </Animated.View>
    </GestureDetector>
  ) : (
    <>
      <ApiStopPlug />
      {/*<StatusesDialog />*/}
    </>
  )
})

export default EntryPoint
