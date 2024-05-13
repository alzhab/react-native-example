import { IBaseFlow } from '@corrbo/base/IOC'
import { IStatusButton } from 'blms/AppStateBlm/store/types'

export type IAppState = IBaseFlow & {}

export enum EAppStateFlowEvents {
  ON_APP_OPEN = 'ON_APP_OPEN',
  ON_CHOOSE_MOCK_REQUEST_STATUS = 'ON_CHOOSE_MOCK_REQUEST_STATUS',
  ON_SERVER_API_STOP = 'ON_SERVER_API_STOP',
  ON_SERVER_API_START = 'ON_SERVER_API_START',
}

export type IAppStateFlowData = {
  [EAppStateFlowEvents.ON_APP_OPEN]: undefined
  [EAppStateFlowEvents.ON_CHOOSE_MOCK_REQUEST_STATUS]: { buttons: IStatusButton[]; title: string }
  [EAppStateFlowEvents.ON_SERVER_API_STOP]: undefined
  [EAppStateFlowEvents.ON_SERVER_API_START]: undefined
}
