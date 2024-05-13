import { inject, injectable } from 'inversify'
import { ITenantsListActions } from './types'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import { ITenantsStore, TenantsStoreId } from 'blms/TenantsBlm/store'
import { ApartmentsStoreId, IApartmentsStore } from 'blms/ApartmentsBlm/store'

export const TenantsListActionsId = Symbol.for('TenantsListActions')

@injectable()
export class TenantsListActions implements ITenantsListActions {
  constructor(
    @inject(TenantsStoreId) private tenantsStore: ITenantsStore,
    @inject(ApartmentsStoreId) private apartmentsStore: IApartmentsStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
  ) {}

  clearListStart(): void {
    this.tenantsStore.setListStartLoading(true)
    this.tenantsStore.setListPage(1)
    this.apartmentsStore.setApartmentDetail(null)
  }

  getListStart(): void {
    this.apiRepo
      .tenantList({
        query: {
          id: this.apartmentsStore.apartmentDetail?.id || 0,
          page: this.tenantsStore.listPage,
        },
      })
      .then(res => {
        this.tenantsStore.setListMaxCount(res.data.count)
        this.tenantsStore.setList(res.data.results)
      })
      .finally(() => this.tenantsStore.setListStartLoading(false))
  }

  loadListMore(): void {
    if (
      this.tenantsStore.list.length &&
      this.tenantsStore.listMaxCount > this.tenantsStore.list.length &&
      !this.tenantsStore.listMoreLoading
    ) {
      this.tenantsStore.setListMoreLoading(true)
      this.apiRepo
        .tenantList({
          query: {
            id: this.apartmentsStore.apartmentDetail?.id || 0,
            page: this.tenantsStore.listPage + 1,
          },
        })
        .then(res => {
          this.tenantsStore.setListPage(this.tenantsStore.listPage + 1)
          this.tenantsStore.setListMaxCount(res.data.count)
          this.tenantsStore.addList(res.data.results)
        })
        .finally(() => {
          this.tenantsStore.setListMoreLoading(false)
        })
    }
  }

  reloadList(): Promise<void> {
    this.tenantsStore.setListReloadLoading(true)
    return this.apiRepo
      .tenantList({
        query: {
          id: this.apartmentsStore.apartmentDetail?.id || 0,
          page: 1,
        },
      })
      .then(res => {
        this.tenantsStore.setListPage(1)
        this.tenantsStore.setListMaxCount(res.data.count)
        this.tenantsStore.setList(res.data.results)
      })
      .finally(() => this.tenantsStore.setListReloadLoading(false))
  }
}
