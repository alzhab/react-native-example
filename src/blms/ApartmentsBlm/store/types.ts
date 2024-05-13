import { IApartmentAdapter, IApartmentCreate, IUserTypeEnum } from 'repositories/Api/models'

export interface IApartmentsStore {
  listPage: number
  setListPage(val: number): void

  listMaxCount: number
  setListMaxCount(val: number): void

  listStartLoading: boolean
  setListStartLoading(val: boolean): void

  listReloadLoading: boolean
  setListReloadLoading(val: boolean): void

  listMoreLoading: boolean
  setListMoreLoading(val: boolean): void

  list: IApartmentAdapter[]
  setList(val: IApartmentAdapter[]): void
  addList(val: IApartmentAdapter[]): void

  createLoading: boolean
  setCreateLoading(val: IApartmentsStore['createLoading']): void

  createModalOpen: boolean
  setCreateModalOpen(val: IApartmentsStore['createModalOpen']): void

  createStep: EApartmentCreateStep
  setCreateStep(val: IApartmentsStore['createStep']): void

  createData: IApartmentStoreCreateData
  setCreateData(val: Partial<IApartmentsStore['createData']>): void

  choosedApartment: IApartmentAdapter
  setChoosedApartment(val: IApartmentsStore['choosedApartment']): void
  clearChoosedApartment(): void

  searchLoading: boolean
  setSearchLoading(val: IApartmentsStore['searchLoading']): void

  apartmentDetail: IApartmentAdapter | null
  setApartmentDetail(val: IApartmentsStore['apartmentDetail']): void

  isPlugModalOpen: boolean
  setIsPlugModalOpen(val: boolean): void

  plugType: IUserTypeEnum
  setPlugType(val: IApartmentsStore['plugType']): void

  isHydrated: boolean
}

export enum EApartmentCreateStep {
  ApartmentsInfo = 'ApartmentsInfo',
  Role = 'Role',
}

export type IApartmentStoreCreateData = IApartmentCreate
