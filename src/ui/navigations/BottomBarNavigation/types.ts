import { NavigationProp, RouteProp } from '@react-navigation/core/src/types'
import { IVotingStatusEnum } from 'repositories/Api/models'
import { ProfilesTabStackNavigationParamsMap } from 'navigations/ProfileTabStack'

export type BottomBarNavigationParamsMap = {
  HomeScreen: undefined
  VotesScreen: { tab?: IVotingStatusEnum }
  EventsScreen: { tab?: 'notifications' | 'news' }
  ApplicationsScreen: { tab?: 'all' | 'open' | 'work' | 'finished' }
  ProfilesTabStack: { screen: keyof ProfilesTabStackNavigationParamsMap }
}

export type BottomBarNav = NavigationProp<BottomBarNavigationParamsMap>

export type BottomBarRoute<D extends keyof BottomBarNavigationParamsMap> = RouteProp<{
  params: BottomBarNavigationParamsMap[D]
}>
