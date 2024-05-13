import { IBaseFlow } from '@corrbo/base/IOC'
import { ITenantsStore } from 'blms/TenantsBlm/store'

export type ITenantsFlow = IBaseFlow & {}

export enum ETenantsFlowEvents {
  OPEN_TEMP_PASSWORD_MODAL = 'OPEN_TEMP_PASSWORD_MODAL',
  RELOAD_TENANTS_LIST = 'RELOAD_TENANTS_LIST',
}

export type ITenantsFlowData = {
  [ETenantsFlowEvents.OPEN_TEMP_PASSWORD_MODAL]: { data: ITenantsStore['tempPasswordModalData'] }
  [ETenantsFlowEvents.RELOAD_TENANTS_LIST]: undefined
}
