import { injectable } from 'inversify'
import { EApartmentCreateStep, IApartmentsStore, IApartmentStoreCreateData } from './types'
import { makeAutoObservable } from 'mobx'
import { isHydrated, makePersistable } from 'mobx-persist-store'
import {
  DEFAULT_APARTMENT,
  DEFAULT_APARTMENT_CREATE,
  IApartmentAdapter,
  IApartmentCreate,
  IUserTypeEnum,
} from 'repositories/Api/models'

export const ApartmentsStoreId = Symbol.for('ApartmentsStore')

@injectable()
export class ApartmentsStore implements IApartmentsStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'ApartmentsStore',
      properties: ['choosedApartment'],
    })
  }

  createLoading: boolean = false
  setCreateLoading(val: IApartmentsStore['createLoading']): void {
    this.createLoading = val
  }

  listMaxCount: number = 0
  setListMaxCount(val: number): void {
    this.listMaxCount = val
  }

  listPage: number = 1
  setListPage(val: number): void {
    this.listPage = val
  }

  listStartLoading: boolean = true
  setListStartLoading(val: boolean): void {
    this.listStartLoading = val
  }

  listReloadLoading: boolean = false
  setListReloadLoading(val: boolean): void {
    this.listReloadLoading = val
  }

  listMoreLoading: boolean = false
  setListMoreLoading(val: boolean): void {
    this.listMoreLoading = val
  }

  list: IApartmentAdapter[] = []
  setList(val: IApartmentAdapter[]): void {
    this.list = val
  }
  addList(val: IApartmentAdapter[]): void {
    this.list = [...this.list, ...val]
  }

  createData: IApartmentCreate = DEFAULT_APARTMENT_CREATE

  setCreateData(val: Partial<IApartmentStoreCreateData>): void {
    this.createData = { ...this.createData, ...val }
  }

  createModalOpen: boolean = false
  setCreateModalOpen(val: IApartmentsStore['createModalOpen']): void {
    this.createModalOpen = val
  }

  createStep: EApartmentCreateStep = EApartmentCreateStep.ApartmentsInfo
  setCreateStep(val: IApartmentsStore['createStep']): void {
    this.createStep = val
  }

  choosedApartment: IApartmentAdapter = DEFAULT_APARTMENT
  setChoosedApartment(val: IApartmentsStore['choosedApartment']): void {
    if (val) {
      this.choosedApartment = val
    }
  }
  clearChoosedApartment(): void {
    this.choosedApartment = DEFAULT_APARTMENT
  }

  apartmentDetail: IApartmentAdapter | null = null
  setApartmentDetail(val: IApartmentsStore['apartmentDetail']): void {
    this.apartmentDetail = val
  }

  searchLoading: boolean = false
  setSearchLoading(val: IApartmentsStore['searchLoading']): void {
    this.searchLoading = val
  }

  isPlugModalOpen: boolean = false
  setIsPlugModalOpen(val: boolean): void {
    this.isPlugModalOpen = val
  }

  plugType: IUserTypeEnum = IUserTypeEnum.Owner
  setPlugType(val: IApartmentsStore['plugType']): void {
    this.plugType = val
  }

  get isHydrated() {
    return isHydrated(this)
  }
}
