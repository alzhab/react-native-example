import { IBaseFlow } from '@corrbo/base/IOC'
import { IApartmentAdapter } from 'repositories/Api'

export type IApartmentsFlow = IBaseFlow & {}

export enum EApartmentsFlowEvents {
  ON_APARTMENT_CREATED = 'ON_APARTMENT_CREATED',
  ON_APARTMENT_GUARD_ACTION = 'ON_APARTMENT_GUARD_ACTION',
  OPEN_APARTMENT_REFRESH = 'OPEN_APARTMENT_REFRESH',
}

export type IApartmentsFlowData = {
  [EApartmentsFlowEvents.ON_APARTMENT_CREATED]: undefined
  [EApartmentsFlowEvents.ON_APARTMENT_GUARD_ACTION]: {
    call: () => void
    type?: keyof Pick<IApartmentAdapter, 'can_work_applications' | 'can_work_votes' | 'is_osi'>
  }
  [EApartmentsFlowEvents.OPEN_APARTMENT_REFRESH]: undefined
}
