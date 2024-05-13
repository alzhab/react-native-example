import { IBaseFlow } from '@corrbo/base/IOC'
import {
  IMainAuthorizationCreateResponse200,
  IMainRegistrationCreateResponse200,
} from 'repositories/Api'
import { IChangeTempPasswordData, IRegistrationData } from 'blms/AuthenticationBlm/store'

export type IAuthenticationFlow = IBaseFlow & {}

export enum EAuthenticationFlowEvents {
  ON_AUTH_GUARD_ACTION = 'ON_AUTH_GUARD_ACTION',
  ON_AUTHORIZE_SUCCESS = 'ON_AUTHORIZE_SUCCESS',
  ON_REGISTER_SUCCESS = 'ON_REGISTER_SUCCESS',
  ON_CHANGE_TEMP_PASSWORD_SUCCESS = 'ON_CHANGE_TEMP_PASSWORD_SUCCESS',
  ON_OPEN_AUTHORIZED_APP = 'ON_OPEN_AUTHORIZED_APP',
  ON_LOGOUT = 'ON_LOGOUT',
  START_REGISTRATION = 'START_REGISTRATION',
  START_CHANGE_TEMP_PASSWORD = 'START_CHANGE_TEMP_PASSWORD',
  CHANGE_TEMP_PASSWORD = 'CHANGE_TEMP_PASSWORD',
  ON_PREPARE_DATA = 'ON_PREPARE_DATA',
  AFTER_DELETE = 'AFTER_DELETE'
}

export type IAuthenticationFlowData = {
  [EAuthenticationFlowEvents.ON_AUTH_GUARD_ACTION]: { action: () => void }
  [EAuthenticationFlowEvents.ON_AUTHORIZE_SUCCESS]: IMainAuthorizationCreateResponse200
  [EAuthenticationFlowEvents.ON_LOGOUT]: undefined
  [EAuthenticationFlowEvents.START_REGISTRATION]: Pick<IRegistrationData, 'phone' | 'password'>
  [EAuthenticationFlowEvents.START_CHANGE_TEMP_PASSWORD]: Pick<
    IChangeTempPasswordData,
    'temp_password'
  >
  [EAuthenticationFlowEvents.ON_REGISTER_SUCCESS]: IMainRegistrationCreateResponse200
  [EAuthenticationFlowEvents.ON_CHANGE_TEMP_PASSWORD_SUCCESS]: void
  [EAuthenticationFlowEvents.ON_PREPARE_DATA]: { after: () => void }
  [EAuthenticationFlowEvents.CHANGE_TEMP_PASSWORD]: Pick<IRegistrationData, 'phone' | 'password'>
  [EAuthenticationFlowEvents.ON_OPEN_AUTHORIZED_APP]: undefined
  [EAuthenticationFlowEvents.AFTER_DELETE]: undefined
}
