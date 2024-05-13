import { injectable } from 'inversify'
import { INotificationsStore } from './types'
import { makeAutoObservable } from 'mobx'
import { isHydrated, makePersistable } from 'mobx-persist-store'
import { INotification } from 'repositories/Api/models'

export const NotificationsStoreId = Symbol.for('NotificationsStore')

@injectable()
export class NotificationsStore implements INotificationsStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'NotificationsStore',
      properties: ['notificationEnabled'],
    })
  }

  listMaxCount: number = 0
  setListMaxCount(val: number): void {
    this.listMaxCount = val
  }

  listPage: number = 1
  setListPage(val: number): void {
    this.listPage = val
  }

  listStartLoading: boolean = true
  setListStartLoading(val: boolean): void {
    this.listStartLoading = val
  }

  listReloadLoading: boolean = false
  setListReloadLoading(val: boolean): void {
    this.listReloadLoading = val
  }

  listMoreLoading: boolean = false
  setListMoreLoading(val: boolean): void {
    this.listMoreLoading = val
  }

  list: INotification[] = []
  setList(val: INotification[]): void {
    this.list = val
  }
  addList(val: INotification[]): void {
    this.list = [...this.list, ...val]
  }

  notificationEnabled: boolean = false
  setNotificationEnabled(val: INotificationsStore['notificationEnabled']): void {
    this.notificationEnabled = val
  }

  notificationFcmToken: string = ''
  setNotificationFcmToken(val: INotificationsStore['notificationFcmToken']): void {
    this.notificationFcmToken = val
  }

  notificationToggleLoading: boolean = false
  setNotificationToggleLoading(val: INotificationsStore['notificationToggleLoading']): void {
    this.notificationToggleLoading = val
  }

  isHydrated(): boolean {
    return isHydrated(this)
  }
}
