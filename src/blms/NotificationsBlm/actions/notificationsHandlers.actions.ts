import { inject, injectable } from 'inversify'
import { ENotificationsType, INotificationsHandlersActions } from './types'
import messaging from '@react-native-firebase/messaging'
import {
  INavigationService,
  NavigationServiceId,
} from '@corrbo/module-navigation/services'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { ENewsFlowEvents } from 'blms/NewsBlm/flow'
import { EApplicationDetailFlowEvents } from 'blms/ApplicationsBlm/flow'

export const NotificationsHandlersActionsId = Symbol.for(
  'NotificationsHandlersActions',
)

@injectable()
export class NotificationsHandlersActions
  implements INotificationsHandlersActions
{
  constructor(
    @inject(NavigationServiceId) private navigation: INavigationService,
  ) {}
  messageBackgroundHandler(): void {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage)
    })
    // on app open
    messaging().onNotificationOpenedApp(this.onOpen.bind(this))

    // on app closed
    messaging().getInitialNotification().then(this.onOpen.bind(this))
  }

  onOpen(remoteMessage: any) {
    const type: ENotificationsType | undefined =
      remoteMessage && remoteMessage.data && remoteMessage.data.type
        ? (remoteMessage.data.type as ENotificationsType)
        : undefined
    const data: any = remoteMessage.data ? remoteMessage.data : undefined

    if (type) {
      switch (type) {
        // Пользователю пришло сообщение
        case ENotificationsType.news:
          if (data && data.news_id) {
            EVENT_EMITTER.emitEvent({
              name: ENewsFlowEvents.OPEN_NEWS_DETAIl,
              data: { id: +data.news_id },
            })
          } else {
            this.navigation.navigate('BottomBarNavigation', {
              // @ts-ignore
              screen: 'EventsScreen',
              params: { tab: 'news' },
            })
          }
          break
        case ENotificationsType.apartment:
          this.navigation.navigate('BottomBarNavigation', {
            // @ts-ignore
            screen: 'ProfilesTabStack',
            params: { screen: 'ApartmentsScreen' },
          })
          break
        case ENotificationsType.application:
          console.log({ application: data })
          if (data && data.application_id) {
            EVENT_EMITTER.emitEvent({
              name: EApplicationDetailFlowEvents.OPEN_APPLICATION_DETAIl,
              data: { id: +data.application_id },
            })
          } else {
            this.navigation.navigate('BottomBarNavigation', {
              // @ts-ignore
              screen: 'ApplicationsScreen',
            })
          }
          break
        default:
          return null
      }
    }
  }

  messageForegroundHandler(): () => void {
    return messaging().onMessage(async remoteMessage => {
      // const type: ENotificationsType | undefined =
      //   remoteMessage && remoteMessage.data && remoteMessage.data.type
      //     ? (remoteMessage.data.type as ENotificationsType)
      //     : undefined
      // const data: any = remoteMessage.data ? remoteMessage.data : undefined
      //
      // if (type) {
      //   if (
      //     remoteMessage.notification &&
      //     remoteMessage.notification.title &&
      //     remoteMessage.notification.body
      //   ) {
      //     Toast.show({
      //       type: 'info',
      //       text1: remoteMessage.notification.title,
      //       text2: remoteMessage.notification.body,
      //     })
      //   }
      //   switch (type) {
      //     // Пользователю пришло сообщение
      //     case ENotificationsType.news:
      //       EVENT_EMITTER.emitEvent({
      //         name: ENewsFlowEvents.REFRESH_NEWS_BY_ID_OR_LIST,
      //         data: { id: +data.news_id },
      //       })
      //       break
      //     case ENotificationsType.apartment:
      //       // @ts-ignore
      //       EVENT_EMITTER.emitEvent({ name: EApartmentsFlowEvents.OPEN_APARTMENT_REFRESH })
      //       break
      //     case ENotificationsType.application:
      //       EVENT_EMITTER.emitEvent({
      //         name: EApplicationDetailFlowEvents.REFRESH_APPLICATION_BY_ID_OR_LIST,
      //         data: { id: +data.application_id },
      //       })
      //       break
      //     default:
      //       return null
      //   }
      // }
    })
  }
}
