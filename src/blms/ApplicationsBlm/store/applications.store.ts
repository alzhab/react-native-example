import {injectable} from 'inversify';
import {EApplicationStoreTabType, IApplicationFilter, IApplicationsStore} from './types';
import {makeAutoObservable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import {IApplications, IApplicationType} from 'repositories/Api/models';

export const ApplicationsStoreId = Symbol.for('ApplicationsStore')

@injectable()
export class ApplicationsStore implements IApplicationsStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'ApplicationsStore', properties: [] })
  }

  listFilters: IApplicationFilter = {
    tabType: EApplicationStoreTabType.all,
    search: '',
    house: { title: '', val: 0 },
    type: { title: '', val: 0 },
    category: { title: '', val: 0 },
    start_date: null,
    end_date: null,
    sortNew: { title: 'Сначала самые новые', val: true },
    affiliation_application: { title: 'Все', val: '' },
  }

  setListFilters(data: Partial<IApplicationsStore['listFilters']>): void {
    this.listFilters = {
      ...this.listFilters,
      ...data,
    }
  }

  clearListFilters(): void {
    this.listFilters = {
      tabType: EApplicationStoreTabType.all,
      search: '',
      house: { title: '', val: 0 },
      type: { title: '', val: 0 },
      category: { title: '', val: 0 },
      start_date: null,
      end_date: null,
      sortNew: { title: '', val: true },
      affiliation_application: { title: 'Все', val: '' },
    }
  }

  listMaxCount: number = 0
  setListMaxCount(val: number): void {
    this.listMaxCount = val
  }

  listPage: number = 1
  setListPage(val: IApplicationsStore['listPage']): void {
    this.listPage = val
  }

  listStartLoading: boolean = true
  setListStartLoading(val: IApplicationsStore['listStartLoading']): void {
    this.listStartLoading = val
  }

  listReloadLoading: boolean = false
  setListReloadLoading(val: IApplicationsStore['listReloadLoading']): void {
    this.listReloadLoading = val
  }

  listMoreLoading: boolean = false
  setListMoreLoading(val: IApplicationsStore['listMoreLoading']): void {
    this.listMoreLoading = val
  }

  list: IApplications[] = []
  setList(val: IApplicationsStore['list']): void {
    this.list = val
  }
  addList(val: IApplicationsStore['list']): void {
    this.list = [...this.list, ...val]
  }

  detailData: IApplications | null = null
  setDetailData(val: IApplicationsStore['detailData']): void {
    this.detailData = val
  }

  editData: IApplications | null = null
  setEditData(val: IApplicationsStore['editData']): void {
    this.editData = val
  }

  detailDataLoading: boolean = true
  setDetailDataLoading(val: IApplicationsStore['detailDataLoading']): void {
    this.detailDataLoading = val
  }

  editDataLoading: boolean = true
  setEditDataLoading(val: IApplicationsStore['editDataLoading']): void {
    this.editDataLoading = val
  }

  detailDataId: number = 0
  setDetailDataId(val: IApplicationsStore['detailDataId']): void {
    this.detailDataId = val
  }

  editDataId: number = 0
  setEditDataId(val: IApplicationsStore['editDataId']): void {
    this.editDataId = val
  }

  homeList: IApplications[] = []
  setHomeList(val: IApplicationsStore['list']): void {
    this.homeList = val
  }

  listHomeLoading: boolean = true
  setListHomeLoading(val: IApplicationsStore['listHomeLoading']): void {
    this.listHomeLoading = val
  }

  types: IApplicationType[] = []
  setTypes(val: IApplicationsStore['types']): void {
    this.types = val
  }

  createSuccessId: number = 0
  setCreateSuccess(val: IApplicationsStore['createSuccessId']): void {
    this.createSuccessId = val
  }
}
