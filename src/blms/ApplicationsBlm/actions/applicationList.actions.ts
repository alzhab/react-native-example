import { inject, injectable } from 'inversify'
import { IApplicationListActions } from './types'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import {
  ApplicationsStoreId,
  EApplicationStoreTabType,
  IApplicationsStore,
} from 'blms/ApplicationsBlm/store'
import { ApartmentsStoreId, IApartmentsStore } from 'blms/ApartmentsBlm/store'

export const ApplicationListActionsId = Symbol.for('ApplicationListActions')

@injectable()
export class ApplicationListActions implements IApplicationListActions {
  constructor(
    @inject(ApplicationsStoreId) private applicationsStore: IApplicationsStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
  ) {}

  clearFilter(): void {
    this.applicationsStore.clearListFilters()
  }

  setFilter(data: Partial<IApplicationsStore['listFilters']>): void {
    this.clearListStart()
    this.applicationsStore.setListFilters(data)
  }

  clearListStart(): void {
    this.applicationsStore.setListStartLoading(true)
    this.applicationsStore.setListPage(1)
  }

  changeTab(val: IApplicationsStore['listFilters']['tabType']): void {
    this.clearListStart()
    this.applicationsStore.setListFilters({ tabType: val })
  }

  getListStart(): void {
    const filters = this.getFilters()

    this.applicationsStore.setListStartLoading(true)
    this.apiRepo
      .mainApplicationsList({
        query: { page: this.applicationsStore.listPage, ...filters },
      })
      .then(res => {
        this.applicationsStore.setListMaxCount(res.data.count)
        this.applicationsStore.setList(res.data.results)
      })
      .finally(() => this.applicationsStore.setListStartLoading(false))
  }

  loadListMore(): void {
    const filters = this.getFilters()

    if (
      this.applicationsStore.list.length &&
      this.applicationsStore.listMaxCount > this.applicationsStore.list.length &&
      !this.applicationsStore.listMoreLoading
    ) {
      this.applicationsStore.setListMoreLoading(true)
      this.apiRepo
        .mainApplicationsList({
          query: { page: this.applicationsStore.listPage + 1, ...filters },
        })
        .then(res => {
          this.applicationsStore.setListPage(this.applicationsStore.listPage + 1)
          this.applicationsStore.setListMaxCount(res.data.count)
          this.applicationsStore.addList(res.data.results)
        })
        .finally(() => {
          this.applicationsStore.setListMoreLoading(false)
        })
    }
  }

  getListHome(): void {
    this.apiRepo
      .mainApplicationsList({
        query: { page_size: 3, page: 1, ordering: '-start_date' },
      })
      .then(res => {
        this.applicationsStore.setHomeList(res.data.results)
        this.applicationsStore.setListMaxCount(res.data.count)
      })
      .finally(() => this.applicationsStore.setListHomeLoading(false))
  }

  reloadList(): Promise<void> {
    const filters = this.getFilters()

    this.applicationsStore.setListReloadLoading(true)
    return this.apiRepo
      .mainApplicationsList({
        query: { page: 1, ...filters },
      })
      .then(res => {
        this.applicationsStore.setListPage(1)
        this.applicationsStore.setListMaxCount(res.data.count)
        this.applicationsStore.setList(res.data.results)
      })
      .finally(() => this.applicationsStore.setListReloadLoading(false))
  }

  getFilters() {
    const filters: any = {
      house_id: this.applicationsStore.listFilters.house.val,
      search: this.applicationsStore.listFilters.search,
      type: this.applicationsStore.listFilters.type.val,
      category: this.applicationsStore.listFilters.category.val,
      status:
        this.applicationsStore.listFilters.tabType === EApplicationStoreTabType.all
          ? 0
          : this.applicationsStore.listFilters.tabType,
      start_date: this.applicationsStore.listFilters.start_date,
      end_date: this.applicationsStore.listFilters.end_date,
      ordering: this.applicationsStore.listFilters.sortNew.val ? '-start_date' : 'start_date',
      affiliation_application: this.applicationsStore.listFilters.affiliation_application.val,
    }

    for (let filtersKey in filters) {
      if (!filters[filtersKey]) {
        delete filters[filtersKey]
      }
    }

    return filters
  }
}
