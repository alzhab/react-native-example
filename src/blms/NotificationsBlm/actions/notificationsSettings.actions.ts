import { inject, injectable } from 'inversify'
import { INotificationsSettingsActions } from './types'
import {
  check,
  checkNotifications,
  openSettings,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions'
import { IS_IOS } from 'configs/Theme/constants'
import {
  INotificationsStore,
  NotificationsStoreId,
} from 'blms/NotificationsBlm/store'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import messaging from '@react-native-firebase/messaging'
import Toast from 'react-native-toast-message'
import { Alert } from 'react-native'

export const NotificationsSettingsActionsId = Symbol.for(
  'NotificationsSettingsActions',
)

@injectable()
export class NotificationsSettingsActions
  implements INotificationsSettingsActions
{
  constructor(
    @inject(NotificationsStoreId)
    private notificationsStore: INotificationsStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
  ) {}

  // fcm token уже должен быть
  togglePermission(): Promise<void> {
    if (this.notificationsStore.notificationEnabled) {
      // Disable notificaitons
      // this.notificationsStore.setNotificationToggleLoading(true)
      return this.removeFcmToken()
        .then(() => this.notificationsStore.setNotificationEnabled(false))
        .finally(() =>
          this.notificationsStore.setNotificationToggleLoading(false),
        )
    } else {
      // Enable notificaitons
      return checkNotifications()
        .then(CHECK_NOTIFICATION_PERMISSION => {
          if (CHECK_NOTIFICATION_PERMISSION.status === RESULTS.GRANTED) {
            // this.notificationsStore.setNotificationToggleLoading(true)
            return this.saveFcmToken().then(() => {
              if (this.notificationsStore.notificationFcmToken) {
                this.notificationsStore.setNotificationEnabled(true)
              }
            })
          } else if (CHECK_NOTIFICATION_PERMISSION.status === RESULTS.DENIED) {
            return requestNotifications(['providesAppSettings']).then(
              PERMISSION_RES => {
                if (PERMISSION_RES.status === RESULTS.GRANTED) {
                  // this.notificationsStore.setNotificationToggleLoading(true)
                  return this.saveFcmToken().then(() => {
                    if (this.notificationsStore.notificationFcmToken) {
                      this.notificationsStore.setNotificationEnabled(true)
                    }
                  })
                } else {
                  this.openSettings()
                }
              },
            )
          } else {
            this.openSettings()
          }
        })
        .finally(() =>
          this.notificationsStore.setNotificationToggleLoading(false),
        )
    }
  }

  openSettings() {
    Alert.alert(
      'Отсутствует разрешение',
      'Пожалуйста, предоставьте приложению необходимые разрешения в настройках устройства',
      [{ text: 'Отмена', onPress: () => {}, style: 'cancel' }],
      { cancelable: true },
    )
  }

  checkNotificationsOnLogin() {
    if (!this.notificationsStore.notificationEnabled) {
      // Enable notificaitons
      return checkNotifications()
        .then(CHECK_NOTIFICATION_PERMISSION => {
          if (CHECK_NOTIFICATION_PERMISSION.status === RESULTS.GRANTED) {
            // this.notificationsStore.setNotificationToggleLoading(true)
            return this.saveFcmToken().then(() => {
              if (this.notificationsStore.notificationFcmToken) {
                this.notificationsStore.setNotificationEnabled(true)
              }
            })
          } else {
            return requestNotifications(['providesAppSettings']).then(
              PERMISSION_RES => {
                if (PERMISSION_RES.status === RESULTS.GRANTED) {
                  // this.notificationsStore.setNotificationToggleLoading(true)
                  return this.saveFcmToken().then(() => {
                    if (this.notificationsStore.notificationFcmToken) {
                      this.notificationsStore.setNotificationEnabled(true)
                    }
                  })
                }
              },
            )
          }
        })
        .finally(() =>
          this.notificationsStore.setNotificationToggleLoading(false),
        )
    } else {
      return Promise.resolve()
    }
  }

  checkPermissions(): Promise<void> {
    if (this.notificationsStore.notificationEnabled) {
      return requestNotifications(['providesAppSettings']).then(
        PERMISSION_RES => {
          if (PERMISSION_RES.status !== RESULTS.GRANTED) {
            Toast.show({
              type: 'error',
              text1: 'Системные уведомления выключены',
            })
            this.removeFcmToken().then(() =>
              this.notificationsStore.setNotificationEnabled(false),
            )
          }
        },
      )
    } else {
      return Promise.resolve()
    }
  }

  removeFcmToken(): Promise<any> {
    if (this.notificationsStore.notificationFcmToken) {
      return this.apiRepo
        .deviceFirebaseDELETE({
          query: {
            registration_id: this.notificationsStore.notificationFcmToken,
          },
        })
        .catch(() => Promise.resolve(true))
        .then(() => Promise.resolve(true))
    } else {
      return Promise.resolve()
    }
  }

  saveFcmToken(): Promise<void> {
    if (this.notificationsStore.notificationFcmToken) {
      return this.apiRepo
        .deviceFirebasePOST({
          body: {
            registration_id:
              this.notificationsStore.notificationFcmToken.trim(),
            device_id: this.notificationsStore.notificationFcmToken.trim(),
            type: IS_IOS ? 'ios' : 'android',
          },
        })
        .then()
    } else {
      return Promise.resolve()
    }
  }

  getFcmToken(): Promise<any> {
    if (this.notificationsStore.notificationFcmToken) {
      return Promise.resolve(true)
    } else {
      return messaging()
        .getToken()
        .then(res => {
          console.log({ res })
          this.notificationsStore.setNotificationFcmToken(res)
        })
        .catch(() => {
          Promise.resolve(true)
        })
    }
  }

  clear() {
    if (this.notificationsStore.notificationEnabled) {
      return this.togglePermission()
    } else {
      return Promise.resolve()
    }
  }
}
