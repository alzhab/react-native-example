import { IBaseFlow } from '@corrbo/base/IOC'
import { INewsStore } from 'blms/NewsBlm/store'
import { INews } from 'repositories/Api'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'

export type INewsFlow = IBaseFlow & {}
export enum ENewsFlowEvents {
  OPEN_NEWS_DETAIl = 'OPEN_NEWS_DETAIl',
  DELETE_NEWS = 'DELETE_NEWS',
  OPEN_NEWS_EDIT = 'OPEN_NEWS_EDIT',
  REFRESH_NEWS_BY_ID_OR_LIST = 'REFRESH_NEWS_BY_ID_OR_LIST',
}

export type INewsFlowData = {
  [ENewsFlowEvents.OPEN_NEWS_DETAIl]: { id: INewsStore['detailDataId'] }
  [ENewsFlowEvents.OPEN_NEWS_EDIT]: { id: INewsStore['detailDataId'] }
  [ENewsFlowEvents.DELETE_NEWS]: { id: INews['id'] }
  [ENewsFlowEvents.REFRESH_NEWS_BY_ID_OR_LIST]: { id: INews['id'] }
}
