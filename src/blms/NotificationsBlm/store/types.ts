import { INotification } from 'repositories/Api/models'

export interface INotificationsStore {
  listPage: number
  setListPage(val: number): void

  listMaxCount: number
  setListMaxCount(val: number): void

  listStartLoading: boolean
  setListStartLoading(val: boolean): void

  listReloadLoading: boolean
  setListReloadLoading(val: boolean): void

  listMoreLoading: boolean
  setListMoreLoading(val: boolean): void

  list: INotification[]
  setList(val: INotification[]): void
  addList(val: INotification[]): void

  notificationEnabled: boolean
  setNotificationEnabled(val: INotificationsStore['notificationEnabled']): void

  notificationFcmToken: string
  setNotificationFcmToken(val: INotificationsStore['notificationFcmToken']): void

  notificationToggleLoading: boolean
  setNotificationToggleLoading(val: INotificationsStore['notificationToggleLoading']): void

  isHydrated(): boolean
}

