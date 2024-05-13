import { inject, injectable } from 'inversify'
import { ENewsFlowEvents, INewsFlow, INewsFlowData } from './types'
import { INewsStore, NewsStoreId } from 'blms/NewsBlm/store'
import { INavigationService, NavigationServiceId } from '@corrbo/module-navigation/services'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { IFlowReactions } from 'blms/types'
import {
  INewsDeleteActions,
  INewsDetailActions,
  INewsListActions,
  NewsDeleteActionsId,
  NewsListActionsId,
} from 'blms/NewsBlm/actions'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'

export const NewsFlowId = Symbol.for('NewsFlow')
EVENT_EMITTER.addFlowId(NewsFlowId)

@injectable()
export class NewsFlow implements INewsFlow {
  constructor(
    @inject(NewsStoreId) private newsStore: INewsStore,
    @inject(NewsListActionsId) private newsListActions: INewsListActions,
    @inject(NavigationServiceId) private navigationService: INavigationService,
    @inject(NewsDeleteActionsId) private newsDeleteActions: INewsDeleteActions,
    @inject(NewsDeleteActionsId) private newsDetailActions: INewsDetailActions,
  ) {}

  get reactions(): IFlowReactions {
    return {
      [ENewsFlowEvents.OPEN_NEWS_DETAIl]: this.newsDetail.bind(this),
      [ENewsFlowEvents.OPEN_NEWS_EDIT]: this.openNewsEdit.bind(this),
      [ENewsFlowEvents.DELETE_NEWS]: this.deleteNews.bind(this),
      [ENewsFlowEvents.REFRESH_NEWS_BY_ID_OR_LIST]: this.refreshNewsByIdOrList.bind(this),
    }
  }

  newsDetail(data: INewsFlowData[ENewsFlowEvents.OPEN_NEWS_DETAIl]) {
    this.newsStore.setDetailDataId(data.id)
    this.navigationService.navigate('NewsDetailScreen')
  }

  deleteNews(data: INewsFlowData[ENewsFlowEvents.DELETE_NEWS]) {
    this.newsDeleteActions
      .deleteItem(data)
      .then(() => this.newsListActions.reloadList())
      .finally(() => EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING }))
  }

  openNewsEdit(data: INewsFlowData[ENewsFlowEvents.OPEN_NEWS_EDIT]) {
    this.newsStore.setEditDataId(data.id)
    this.navigationService.navigate('NewsEditScreen')
  }

  refreshNewsByIdOrList(data: INewsFlowData[ENewsFlowEvents.REFRESH_NEWS_BY_ID_OR_LIST]) {
    if (this.newsStore.detailDataId === data.id) {
      this.newsDetailActions.getDetail()
    } else {
      this.newsListActions.reloadList()
    }
  }
}
