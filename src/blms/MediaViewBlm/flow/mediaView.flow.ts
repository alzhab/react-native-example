import { inject, injectable } from 'inversify'
import { EMediaViewFlowEvents, IMediaViewFlow, IMediaViewFlowData } from './types'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { IMediaViewStore, MediaViewStoreId } from 'blms/MediaViewBlm/store'
import { IFlowReactions } from 'blms/types'

export const MediaViewFlowId = Symbol.for('MediaViewFlow')
EVENT_EMITTER.addFlowId(MediaViewFlowId)

@injectable()
export class MediaViewFlow implements IMediaViewFlow {
  constructor(@inject(MediaViewStoreId) private store: IMediaViewStore) {}
  get reactions(): IFlowReactions {
    return {
      [EMediaViewFlowEvents.OPEN_MEDIA_FILE]: this.openMediaFile.bind(this),
    }
  }

  openMediaFile(data: IMediaViewFlowData[EMediaViewFlowEvents.OPEN_MEDIA_FILE]) {
    this.store.setData(data.data)
    this.store.setIsOpen(true)
  }
}
