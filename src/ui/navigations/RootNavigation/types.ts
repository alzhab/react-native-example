import { NavigationProp, RouteProp } from '@react-navigation/core/src/types'
import { BottomBarNavigationParamsMap } from 'navigations/BottomBarNavigation'

export type RootNavigationParamsMap = {
  BottomBarNavigation: BottomBarNavigationParamsMap
  AuthorizationScreen: undefined
  RegistrationScreen: undefined
  ChangeTempPasswordScreen: undefined
  NewsDetailScreen: undefined
  VotesDetailScreen: undefined
  VoteEditScreen: undefined
  VoteCreateScreen: undefined
  ServicesScreen?: { categoryName?: string }
  ApplicationsDetailScreen: undefined
  ApplicationCreateScreen: undefined
  NewsCreateScreen: undefined
  NewsEditScreen: undefined
  ApplicationEditScreen: undefined
  RecoverPasswordScreen: undefined
}

export type RootNav = NavigationProp<RootNavigationParamsMap>

export type RootRoute<D extends keyof RootNavigationParamsMap> = RouteProp<{
  params: RootNavigationParamsMap[D]
}>
