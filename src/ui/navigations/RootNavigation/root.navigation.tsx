import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RootNavigationParamsMap } from './types'
import { BottomBarNavigation } from 'navigations/BottomBarNavigation'
import { AuthorizationScreen } from 'screens/AuthorizationScreen'
import { slideFromBottom, slideFromRight } from 'navigations/animations'

const Nav = createStackNavigator<RootNavigationParamsMap>()

export const RootNavigation: FC<{
  initialScreen: keyof RootNavigationParamsMap
}> = ({ initialScreen }) => {
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: slideFromRight,
      }}
      initialRouteName={initialScreen}>
      <Nav.Screen
        name={'BottomBarNavigation'}
        component={BottomBarNavigation}
      />
      <Nav.Screen
        name={'AuthorizationScreen'}
        component={AuthorizationScreen}
        options={{ cardStyleInterpolator: slideFromBottom }}
      />
    </Nav.Navigator>
  )
}
