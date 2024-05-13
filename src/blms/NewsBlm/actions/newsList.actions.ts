import { inject, injectable } from 'inversify'
import { INewsListActions } from './types'
import { INewsStore, NewsStoreId } from '../store'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import { ApartmentsStoreId, IApartmentsStore } from 'blms/ApartmentsBlm/store'

export const NewsListActionsId = Symbol.for('NewsListActions')

@injectable()
export class NewsListActions implements INewsListActions {
  constructor(
    @inject(NewsStoreId) private newsStore: INewsStore,
    @inject(ApartmentsStoreId) private apartmentsStore: IApartmentsStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
  ) {}

  clearListStart(): void {
    this.newsStore.setListStartLoading(true)
    this.newsStore.setListPage(1)
  }

  getListStart(): void {
    if (this.apartmentsStore.choosedApartment.id) {
      this.apiRepo
        .newsList({
          query: {
            page: this.newsStore.listPage,
            house_id: this.apartmentsStore.choosedApartment.id,
          },
        })
        .then(res => {
          this.newsStore.setListMaxCount(res.data.count)
          this.newsStore.setList(res.data.results)
        })
        .finally(() => this.newsStore.setListStartLoading(false))
    }
  }

  loadListMore(): void {
    if (
      this.newsStore.list.length &&
      this.newsStore.listMaxCount > this.newsStore.list.length &&
      !this.newsStore.listMoreLoading
    ) {
      this.newsStore.setListMoreLoading(true)
      this.apiRepo
        .newsList({
          query: {
            page: this.newsStore.listPage + 1,
            house_id: this.apartmentsStore.choosedApartment.id,
          },
        })
        .then(res => {
          this.newsStore.setListPage(this.newsStore.listPage + 1)
          this.newsStore.setListMaxCount(res.data.count)
          this.newsStore.addList(res.data.results)
        })
        .finally(() => {
          this.newsStore.setListMoreLoading(false)
        })
    }
  }

  reloadList(): Promise<void> {
    this.newsStore.setListReloadLoading(true)
    return this.apiRepo
      .newsList({
        query: { page: 1, house_id: this.apartmentsStore.choosedApartment.id },
      })
      .then(res => {
        this.newsStore.setListPage(1)
        this.newsStore.setListMaxCount(res.data.count)
        this.newsStore.setList(res.data.results)
      })
      .finally(() => this.newsStore.setListReloadLoading(false))
  }

  getListHome(): void {
    this.apiRepo
      .newsList({
        query: { house_id: this.apartmentsStore.choosedApartment.id, page_size: 3, page: 1 },
      })
      .then(res => {
        this.newsStore.setListMaxCount(res.data.count)
        this.newsStore.setHomeList(res.data.results)
      })
      .finally(() => this.newsStore.setListHomeLoading(false))
  }
}
