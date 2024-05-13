import { inject, injectable } from 'inversify'
import { INewsDetailActions } from './types'
import { NewsStoreId, INewsStore } from 'blms/NewsBlm/store'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import { INavigationService, NavigationServiceId } from '@corrbo/module-navigation/services'
import Toast from 'react-native-toast-message'

export const NewsDetailActionsId = Symbol.for('NewsDetailActions')

@injectable()
export class NewsDetailActions implements INewsDetailActions {
  constructor(
    @inject(NewsStoreId) private store: INewsStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
    @inject(NavigationServiceId) private navigationService: INavigationService,
  ) {}
  clearData(): void {
    this.store.setDetailDataLoading(true)
    this.store.setDetailData(null)
  }

  getDetail(): void {
    this.store.setDetailDataLoading(true)
    this.apiRepo
      .newsDetail({ query: { id: this.store.detailDataId } })
      .then(res => {
        this.store.setDetailData(res.data)
      })
      .catch(() => {
        Toast.show({ type: 'error', text1: 'Ошибка' })
        this.navigationService.goBack()
      })
      .finally(() => this.store.setDetailDataLoading(false))
  }
}
