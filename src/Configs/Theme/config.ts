import { FONTS_TYPES } from 'configs/Theme/fonts/types'
import { SCREEN_HEADER_COLORS } from 'templates/ScreenHeader/constants'
import { HOME_NEWS_CARD_COLORS } from 'organisms/HomeNewsCard/constants'
import { BLOCK_COLORS } from 'molecules/Block/constants'
import { HOME_ACTIVITY_CARD_COLORS } from 'organisms/HomeActivityCard/constants'
import { MODAL_BOTTOM_COLORS } from 'atoms/ModalBottom/constants'
import { AUTH_PLUG_COLORS } from 'templates/AuthPlug/constants'
import { BOTTOM_TAB_BAR_COLORS } from 'templates/BottomTabBar/constants'
import { AUTHORIZATION_GALLERY_CARD } from 'organisms/AuthorizationGalleryCard/constants'
import { INPUT_COLORS } from 'molecules/Input/constants'
import { HOME_SERVICE_CARD_ALL_COLORS } from 'organisms/HomeServiceCardAll/constants'
import { IMAGE_COLORS } from 'atoms/Image/constants'
import { RADIO_COLORS } from 'atoms/Radio/constants'
import { GLOBAL_LOADING_COLORS } from 'templates/GlobalLoading/constants'
import { GUIDE_BACKDROP_COLORS } from 'templates/GuideBackdrop/constants'
import { GUIDE_CARD_COLORS } from 'organisms/GuideCard/constants'
import { STEPS_INDICATOR_COLORS } from 'molecules/StepsIndicator/constants'
import { TABS_COLORS } from 'molecules/Tabs/constants'
import { INFO_BTN_COLORS } from 'molecules/InfoBtn/constants'
import { OPTIONS_FORM_COLORS } from 'organisms/OptionsForm/constants'
import { DOTS_BTN_COLORS } from 'molecules/DotsBtn/constants'
import { FLOAT_INFO_COLORS } from 'templates/FloatInfo/constants'
import { CODE_INPUT_COLORS } from 'molecules/CodeInput/constants'

export interface IStatusBar {
  translucent: boolean
  backgroundColor: string
  animated: boolean
  barStyle: string
}

const colors = {
  DEFAULT_COLORS: {
    navigation_primary: '#000',
    navigation_background: '#000',
    navigation_card: '#000',
    navigation_text: '#000',
    navigation_border: '#000',
    navigation_notification: '#000',
    screen_background: '#fff',
    auth_screen_background: '#fff',
    default_text: '#000',
    ...SCREEN_HEADER_COLORS,
    ...HOME_NEWS_CARD_COLORS,
    ...BLOCK_COLORS,
    ...HOME_ACTIVITY_CARD_COLORS,
    ...MODAL_BOTTOM_COLORS,
    ...AUTH_PLUG_COLORS,
    ...BOTTOM_TAB_BAR_COLORS,
    ...AUTHORIZATION_GALLERY_CARD,
    ...INPUT_COLORS,
    ...HOME_SERVICE_CARD_ALL_COLORS,
    ...IMAGE_COLORS,
    ...RADIO_COLORS,
    ...GLOBAL_LOADING_COLORS,
    ...GUIDE_BACKDROP_COLORS,
    ...GUIDE_CARD_COLORS,
    ...STEPS_INDICATOR_COLORS,
    ...TABS_COLORS,
    ...INFO_BTN_COLORS,
    ...OPTIONS_FORM_COLORS,
    ...DOTS_BTN_COLORS,
    ...FLOAT_INFO_COLORS,
    ...CODE_INPUT_COLORS,
  },
}

const fonts = {
  default_text: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: FONTS_TYPES.regular,
    fontWeight: '400',
  },
  displayLarge: {
    fontSize: 57,
    lineHeight: 64,
    fontFamily: FONTS_TYPES.bold,
    fontWeight: '700',
  },
  displayMedium: {
    fontSize: 45,
    lineHeight: 52,
    fontFamily: FONTS_TYPES.bold,
    fontWeight: '700',
  },
  displaySmall: {
    fontSize: 36,
    lineHeight: 43,
    fontFamily: FONTS_TYPES.bold,
    fontWeight: '700',
  },
  headlineLarge: {
    fontSize: 32,
    lineHeight: 39,
    fontFamily: FONTS_TYPES.semiBold,
    fontWeight: '600',
  },
  headlineMedium: {
    fontSize: 28,
    lineHeight: 35,
    fontFamily: FONTS_TYPES.semiBold,
    fontWeight: '600',
  },
  headlineSmall: {
    fontSize: 24,
    lineHeight: 31,
    fontFamily: FONTS_TYPES.semiBold,
    fontWeight: '600',
  },
  titleLarge: {
    fontSize: 22,
    lineHeight: 29,
    fontFamily: FONTS_TYPES.semiBold,
    fontWeight: '600',
  },
  titleMedium: {
    fontSize: 16,
    lineHeight: 23,
    fontFamily: FONTS_TYPES.semiBold,
    fontWeight: '600',
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: FONTS_TYPES.semiBold,
    fontWeight: '600',
  },
  labelLarge: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: FONTS_TYPES.regular,
    fontWeight: '400',
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 19,
    fontFamily: FONTS_TYPES.regular,
    fontWeight: '400',
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 18,
    fontFamily: FONTS_TYPES.regular,
    fontWeight: '400',
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS_TYPES.regular,
    fontWeight: '400',
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: FONTS_TYPES.regular,
    fontWeight: '400',
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 19,
    fontFamily: FONTS_TYPES.regular,
    fontWeight: '400',
  },
  tab: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: FONTS_TYPES.semiBold,
    fontWeight: '600',
  },
  switchLabel: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: FONTS_TYPES.regular,
    fontWeight: '400',
  },
  statusSmall: {
    fontSize: 10,
    lineHeight: 12,
    fontFamily: FONTS_TYPES.regular,
    fontWeight: '400',
  },
  dot: {
    fontSize: 22,
    lineHeight: 24,
    fontFamily: FONTS_TYPES.regular,
    fontWeight: '400',
  },
}

const status_bars: {
  [key in string]: IStatusBar
} = {
  DEFAULT_COLORS: {
    translucent: true,
    backgroundColor: 'transparent',
    animated: true,
    barStyle: 'dark-content',
  },
}

const spacings = {
  container_0: 0,
  container_8: 8,
  container_10: 10,
  container_15: 15,
  container_16: 16,
  container_20: 20,
  container_25: 25,
  container_30: 30,
}

export const CONFIG = {
  colors,
  status_bars,
  fonts,
  spacings,
}
