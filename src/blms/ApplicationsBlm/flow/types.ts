import { IBaseFlow } from '@corrbo/base/IOC'
import { IApplications } from 'repositories/Api'
import { IApplicationsStore } from 'blms/ApplicationsBlm/store'

export type IApplicationDetailFlow = IBaseFlow & {}

export enum EApplicationDetailFlowEvents {
  OPEN_APPLICATION_DETAIl = 'OPEN_APPLICATION_DETAIl',
  DELETE_APPLICATION = 'DELETE_APPLICATION',
  OPEN_APPLICATION_EDIT = 'OPEN_APPLICATION_EDIT',
  REFRESH_APPLICATION_BY_ID_OR_LIST = 'REFRESH_APPLICATION_BY_ID_OR_LIST',
}

export type IApplicationDetailFlowData = {
  [EApplicationDetailFlowEvents.OPEN_APPLICATION_DETAIl]: { id: IApplicationsStore['detailDataId'] }
  [EApplicationDetailFlowEvents.OPEN_APPLICATION_EDIT]: { id: IApplicationsStore['detailDataId'] }
  [EApplicationDetailFlowEvents.DELETE_APPLICATION]: { id: IApplications['id'] }
  [EApplicationDetailFlowEvents.REFRESH_APPLICATION_BY_ID_OR_LIST]: { id?: IApplications['id'] }
}

export type IVoteFlow = IBaseFlow & {}
