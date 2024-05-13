import { TABS_HEIGHT, WIDTH } from 'configs/Theme/constants'
import { SPACINGS } from '@corrbo/module-theme'
import { ImageSourcePropType, Platform } from 'react-native'

export const GUIDE_STEPS: { [key: string]: IGuideStep } = {
  ['1']: {
    title: 'Главная страница приложения',
    desc: 'На этой странице собрана основная информация и полезные виджеты',
    image: require('assets/images/Guide/guide-1.png'),
    arrowType: 'bottom',
    cardLayoutFromComponentImage: {
      plusBottom: Platform.select({ ios: 36, android: TABS_HEIGHT, default: 36 }),
      plusLeft: SPACINGS.container_20,
    },
    arrowLayoutFromComponentImage: {
      plusBottom: Platform.select({ ios: 36, android: TABS_HEIGHT, default: 36 }) - 8,
      plusLeft: WIDTH / 10,
    },
  },
  ['2']: {
    title: 'Все ваши заявки собраны тут',
    desc: 'Здесь Вы можете оставить заявку напрямую для УК или ОСИ',
    image: require('assets/images/Guide/guide-2.png'),
    arrowType: 'bottom',
    cardLayoutFromComponentImage: {
      plusBottom: Platform.select({ ios: 36, android: TABS_HEIGHT, default: 36 }),
      plusLeft: SPACINGS.container_20,
    },
    arrowLayoutFromComponentImage: {
      plusBottom: Platform.select({ ios: 36, android: TABS_HEIGHT, default: 36 }) - 8,
      plusLeft: (WIDTH / 10) * 3,
    },
  },
  ['3']: {
    title: 'Создание заявок и голосований',
    desc: 'По нажатию на эту кнопку Вы можете добавить заявку или голосование',
    image: require('assets/images/Guide/guide-3.png'),
    arrowType: 'bottom',
    cardLayoutFromComponentImage: {
      plusBottom: Platform.select({ ios: 36, android: TABS_HEIGHT, default: 36 }),
      plusLeft: SPACINGS.container_20,
    },
    arrowLayoutFromComponentImage: {
      plusBottom: Platform.select({ ios: 36, android: TABS_HEIGHT, default: 36 }) - 8,
      plusLeft: (WIDTH / 10) * 5,
    },
  },
  ['4']: {
    title: 'Активные голосования и история',
    desc: 'В этой вкладке Вы можете поучаствовать в голосованиях по вашему ЖК',
    image: require('assets/images/Guide/guide-4.png'),
    arrowType: 'bottom',
    cardLayoutFromComponentImage: {
      plusBottom: Platform.select({ ios: 36, android: TABS_HEIGHT, default: 36 }),
      plusLeft: SPACINGS.container_20,
    },
    arrowLayoutFromComponentImage: {
      plusBottom: Platform.select({ ios: 36, android: TABS_HEIGHT, default: 36 }) - 8,
      plusLeft: (WIDTH / 10) * 7,
    },
  },
  ['5']: {
    title: 'Новости и уведомления',
    desc: 'Все актуальные новости, а также системные уведомления собраны здесь',
    image: require('assets/images/Guide/guide-5.png'),
    arrowType: 'bottom',
    cardLayoutFromComponentImage: {
      plusBottom: Platform.select({ ios: 36, android: TABS_HEIGHT, default: 36 }),
      plusLeft: SPACINGS.container_20,
    },
    arrowLayoutFromComponentImage: {
      plusBottom: Platform.select({ ios: 36, android: TABS_HEIGHT, default: 36 }) - 8,
      plusLeft: (WIDTH / 10) * 9,
    },
  },
}

export interface IGuideStep {
  image: ImageSourcePropType
  title: string
  desc: string
  cardLayoutFromComponentImage: {
    plusTop?: number
    plusLeft?: number
    plusBottom?: number
    plusRight?: number
  }
  arrowType: 'top' | 'left' | 'bottom' | 'right'
  arrowLayoutFromComponentImage: {
    plusTop?: number
    plusLeft?: number
    plusBottom?: number
    plusRight?: number
  }
}
