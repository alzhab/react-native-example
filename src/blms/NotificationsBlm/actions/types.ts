export interface INotificationsListActions {
  getListStart(): void
  clearListStart(): void
  loadListMore(): void
  reloadList(): void
}

export interface INotificationsSettingsActions {
  togglePermission(): void
  checkPermissions(): Promise<void>
  removeFcmToken(): Promise<void>
  saveFcmToken(): Promise<void>
  getFcmToken(): Promise<any>
  checkNotificationsOnLogin(): Promise<void>
  clear(): Promise<void>
}

export interface INotificationsHandlersActions {
  messageBackgroundHandler(): void
  messageForegroundHandler(): void
}

export enum ENotificationsType {
  application = 'Application',
  apartment = 'Apartment',
  news = 'News',
}

export type INotificationData = {
  [ENotificationsType.apartment]: { apartment_id: number }
  [ENotificationsType.application]: { application_id: number }
  [ENotificationsType.news]: { news_id: number }
}
