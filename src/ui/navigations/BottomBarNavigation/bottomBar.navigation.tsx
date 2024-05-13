import React from 'react'
import { BottomBarNavigationParamsMap } from './types'
import { HomeScreen } from 'screens/BottomBar/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabBar } from 'templates/BottomTabBar'
import { HomeIcon } from 'icons/HomeIcon'
import { BellIcon } from 'icons/BellIcon'
import { CheckCircleIcon } from 'icons/CheckCircleIcon'
import { DocumentDuplicateIcon } from 'icons/DocumentDuplicateIcon'

const Nav = createBottomTabNavigator<BottomBarNavigationParamsMap>()

export const BottomBarNavigation = () => {
  return (
    <Nav.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <BottomTabBar {...props} />}>
      <Nav.Screen
        name={'HomeScreen'}
        component={HomeScreen}
        options={{ tabBarIcon: HomeIcon, tabBarLabel: 'Главная' }}
      />
      <Nav.Screen
        name={'ApplicationsScreen'}
        component={HomeScreen}
        options={{ tabBarIcon: DocumentDuplicateIcon, tabBarLabel: 'Заявки' }}
      />
      <Nav.Screen
        name={'VotesScreen'}
        component={HomeScreen}
        options={{ tabBarIcon: CheckCircleIcon, tabBarLabel: 'Голосования' }}
      />
      <Nav.Screen
        name={'EventsScreen'}
        component={HomeScreen}
        options={{ tabBarIcon: BellIcon, tabBarLabel: 'События' }}
      />
    </Nav.Navigator>
  )
}
