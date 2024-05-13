import React, { FC, useCallback } from 'react'
import {
  RootNavigation,
  RootNavigationParamsMap,
} from 'navigations/RootNavigation'
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import { useInjection } from 'inversify-react'
import { TRoutes } from 'navigations/types'
import { observer } from 'mobx-react'
import { AuthPlug } from 'templates/AuthPlug'
import { ServiceDetailsModal } from 'templates/ServiceDetailsModal'
import { useNavigationReadyAdapter } from '@corrbo/module-navigation/blm/ui-adapters/navigation-ready.adapter'
import {
  INavigationService,
  NavigationServiceId,
} from '@corrbo/module-navigation/services'
import { ConfirmModal } from 'templates/ConfirmModal'
import { GET_LINKING } from 'configs/Linking'
import { ApartmentPlug } from 'templates/ApartmentPlug'
import { InProgressPlug } from 'templates/InProgressPlug'

export const Navigation: FC<{
  initialScreen: null | keyof RootNavigationParamsMap
}> = observer(({ initialScreen }) => {
  const navigationService =
    useInjection<INavigationService>(NavigationServiceId)
  const navigationRef = useNavigationContainerRef<TRoutes>()
  const { setNavigationReady } = useNavigationReadyAdapter()

  const onReady = useCallback(() => {
    navigationService.init(navigationRef)
    setNavigationReady()
  }, [navigationRef, navigationService, setNavigationReady])

  return initialScreen ? (
    <NavigationContainer
      fallback={null}
      linking={GET_LINKING(() => {})}
      // @ts-ignore
      ref={navigationRef}
      onReady={onReady}>
      <RootNavigation initialScreen={initialScreen} />
      <AuthPlug />
      <InProgressPlug />
      <ApartmentPlug />
      <ServiceDetailsModal />
      <ConfirmModal />
    </NavigationContainer>
  ) : null
})
