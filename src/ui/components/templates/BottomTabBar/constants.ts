import { BottomBarNavigationParamsMap } from 'navigations/BottomBarNavigation'

export const BOTTOM_TAB_BAR_COLORS = {
  tabbar_active_label: '#000',
  tabbar_inactive_label: '#595959',
  tabbar_bg: '#fff',
}

export const GUARD_TABS: (keyof BottomBarNavigationParamsMap)[] = [
  'ApplicationsScreen',
  'VotesScreen',
  'EventsScreen',
]
