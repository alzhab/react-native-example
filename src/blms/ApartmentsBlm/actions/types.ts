import { IApartmentAdapter, IApartmentCreate, IUserTypeEnum } from 'repositories/Api/models'
import { IApartmentsStore } from 'blms/ApartmentsBlm/store'
import { IYandexMapAddress, IYandexMapCity, IYandexMapStreet } from 'repositories/YandexMap'
import { IMediaFile } from 'services/MediaPickerService'

export interface IApartmentsCreateActions {
  openModal(): void
  submitApartmentInfo(data: IApartmentsStore['createData']): void
  submitRoleInfo(data: { type_user: IUserTypeEnum }): void
  createApartment(data: IApartmentCreate): Promise<any>
  closeModal(): void
  getAddress(search: string): Promise<IYandexMapAddress[]>
  getCities(search: string): Promise<IYandexMapCity[]>
  getStreet(city: IYandexMapCity, search: string): Promise<IYandexMapStreet[]>
  getHouse(city: IYandexMapCity, street: string, search: string): Promise<IYandexMapAddress[]>
}

export interface IApartmentsListActions {
  getListStart(): Promise<void>
  clearListStart(): void
  loadListMore(): void
  reloadList(): void
  chooseApartment(val: IApartmentsStore['choosedApartment']): void
  clearChoosedApartment(): void
  openApartmentManagementCompany(val: IApartmentsStore['apartmentDetail']): void
  deleteApartment(id: IApartmentAdapter['id']): void
  openApartmentEdit(val: IApartmentAdapter): void
  openTenantsList(val: IApartmentAdapter): void
  sendDocumentToModeration(val: IMediaFile): void
  openApproveScreen(val: IApartmentsStore['apartmentDetail']): void
}

export interface IApartmentPlugActions {
  close(): void
  checkApartmentAction(data: {
    call: () => void
    type?: keyof Pick<IApartmentAdapter, 'can_work_applications' | 'can_work_votes' | 'is_osi'>
  }): void
}
