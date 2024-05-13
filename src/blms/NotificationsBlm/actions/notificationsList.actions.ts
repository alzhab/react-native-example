import { inject, injectable } from 'inversify'
import { INotificationsListActions } from './types'
import { INotificationsStore, NotificationsStoreId } from '../store'
import { ApiRepoId, IApiRepo } from 'repositories/Api'

export const NotificationsListActionsId = Symbol.for('NotificationsListActions')

@injectable()
export class NotificationsListActions implements INotificationsListActions {
  constructor(
    @inject(NotificationsStoreId) private notificationsStore: INotificationsStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
  ) {}

  clearListStart(): void {
    this.notificationsStore.setListStartLoading(true)
    this.notificationsStore.setListPage(1)
  }

  getListStart(): void {
    this.apiRepo
      .notificationsList({
        query: {
          page: this.notificationsStore.listPage,
        },
      })
      .then(res => {
        this.notificationsStore.setListMaxCount(res.data.count)
        this.notificationsStore.setList(res.data.results)
      })
      .finally(() => this.notificationsStore.setListStartLoading(false))
  }

  loadListMore(): void {
    if (
      this.notificationsStore.list.length &&
      this.notificationsStore.listMaxCount > this.notificationsStore.list.length &&
      !this.notificationsStore.listMoreLoading
    ) {
      this.notificationsStore.setListMoreLoading(true)
      this.apiRepo
        .notificationsList({
          query: {
            page: this.notificationsStore.listPage + 1,
          },
        })
        .then(res => {
          this.notificationsStore.setListPage(this.notificationsStore.listPage + 1)
          this.notificationsStore.setListMaxCount(res.data.count)
          this.notificationsStore.addList(res.data.results)
        })
        .finally(() => {
          this.notificationsStore.setListMoreLoading(false)
        })
    }
  }

  reloadList(): void {
    this.notificationsStore.setListReloadLoading(true)
    this.apiRepo
      .notificationsList({
        query: {
          page: 1,
        },
      })
      .then(res => {
        this.notificationsStore.setListPage(1)
        this.notificationsStore.setListMaxCount(res.data.count)
        this.notificationsStore.setList(res.data.results)
      })
      .finally(() => this.notificationsStore.setListReloadLoading(false))
  }
}
