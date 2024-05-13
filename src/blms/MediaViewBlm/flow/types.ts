import { IMediaViewStore } from 'blms/MediaViewBlm/store'
import { IBaseFlow } from '@corrbo/base/IOC'
export type IMediaViewFlow = IBaseFlow & {}

export enum EMediaViewFlowEvents {
  OPEN_MEDIA_FILE = 'OPEN_MEDIA_FILE',
}

export type IMediaViewFlowData = {
  [EMediaViewFlowEvents.OPEN_MEDIA_FILE]: { data: IMediaViewStore['data'] }
}
