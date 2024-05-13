import { Dimensions, NativeModules, Platform } from 'react-native'
import { FadeIn, FadeOut } from 'react-native-reanimated'

const { StatusBarManager } = NativeModules

export const WIDTH = Dimensions.get('window').width
export const HEIGHT = Dimensions.get('window').height
export const SCREEN_HEIGHT = Dimensions.get('screen').height
export const SCREEN_WIDTH = Dimensions.get('screen').width

export const SB_HEIGHT = StatusBarManager ? StatusBarManager.HEIGHT : 0
export const IS_IOS = Platform.OS === 'ios'

export const ELEM_IN = 400
export const ELEM_OUT = 300

export const TABS_HEIGHT = 80
export const SCREEN_TAB_FULL_HEIGHT = SCREEN_HEIGHT - TABS_HEIGHT
export const ELEM_ZOOM_IN = ELEM_IN - 100
export const SKEL_IN = 400
export const SKEL_OUT = 350
export const ELEM_DEL = SKEL_OUT / 2

export const BOOT_DEL = 400

export const SMS_RESEND_TIME_SECONDS = 60

// 20 MB
export const APPLICATION_MAX_SIZE_KB = 20000000

export const VALIDATOR_MESSAGES = {
  required: 'Обязательный параметр',
  phone: 'Неверный номер телeфона',
  iin: 'Неверный ИИН',
  password_confrim: 'Пароль не совпадает',
  password_min_length: 'Пароль должен содержать 8 символов',
  applications_description_max_length: 'Максимальное количество символов 500',
  email: 'Неверный email',
}

export const VALIDATOR_PATTERNS = {
  email: {
    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    message: VALIDATOR_MESSAGES.email,
  },
}

export const DEFAULT_SHADOW = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 2.8,
}

export const SCREEN_BOTTOM_SPACING = 15

export const PHONE_MASK = [
  '(',
  /\d/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
]

export const IIN_MASK = [
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
]

export const elemEntering = ({
  duration = ELEM_IN,
  delay = 0,
}: {
  duration?: number
  delay?: number
} = {}) => FadeIn.duration(duration).delay(delay)

export const elemExiting = ({
  duration = ELEM_IN,
  delay = 0,
}: {
  duration?: number
  delay?: number
} = {}) => FadeOut.duration(duration).delay(delay)
