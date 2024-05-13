import { ThemeStoreId } from '@corrbo/module-theme'
import { ApartmentsStoreId } from 'blms/ApartmentsBlm/store'
import { ProfileStoreId } from 'blms/ProfileBlm/store'
import {
  AuthenticationStoreId,
  ChangeTempPasswordStoreId,
  RegistrationStoreId,
} from 'blms/AuthenticationBlm/store'
import { GuideStoreId } from 'blms/GuideBlm/store'
import { NotificationsStoreId } from 'blms/NotificationsBlm/store'

export const HYDRATED_STORES = [
  ThemeStoreId,
  RegistrationStoreId,
  AuthenticationStoreId,
  GuideStoreId,
  ApartmentsStoreId,
  ProfileStoreId,
  ChangeTempPasswordStoreId,
  NotificationsStoreId,
]
