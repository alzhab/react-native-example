import { inject, injectable } from 'inversify'
import { IApartmentsCreateActions } from './types'
import { ApartmentsStoreId, EApartmentCreateStep, IApartmentsStore } from 'blms/ApartmentsBlm/store'
import { DEFAULT_APARTMENT, IApartmentCreate, IUserTypeEnum } from 'repositories/Api/models'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import {
  IYandexMapAddress,
  IYandexMapCity,
  IYandexMapStreet,
  YandexMapRepo,
  YandexMapRepoId,
} from 'repositories/YandexMap'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EApartmentsFlowEvents } from 'blms/ApartmentsBlm/flow'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'
import Toast from 'react-native-toast-message'

export const ApartmentsCreateActionsId = Symbol.for('ApartmentsCreateActions')

@injectable()
export class ApartmentsCreateActions implements IApartmentsCreateActions {
  constructor(
    @inject(ApartmentsStoreId) private store: IApartmentsStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
    @inject(YandexMapRepoId) private yandexMapRepo: YandexMapRepo,
  ) {}

  closeModal(): void {
    this.store.setCreateModalOpen(false)
    this.store.setCreateStep(EApartmentCreateStep.ApartmentsInfo)
    this.store.setCreateData(DEFAULT_APARTMENT)
  }

  openModal(): void {
    this.store.setCreateModalOpen(true)
  }

  submitApartmentInfo(data: IApartmentsStore['createData']): void {
    const apartmentDetail = this.store.apartmentDetail
    // Редактирование
    if (apartmentDetail) {
      EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
      this.store.setCreateLoading(true)
      this.apiRepo
        .mainApartmentDelete({ query: { id: apartmentDetail.id } })
        .then(() =>
          this.createApartment({
            ...data,
            type_user: apartmentDetail.type_user,
          }),
        )
        .then(() => {
          this.closeModal()
          EVENT_EMITTER.emitEvent({ name: EApartmentsFlowEvents.ON_APARTMENT_CREATED })
        })
        .finally(() => {
          EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
          this.store.setCreateLoading(false)
        })
    } else {
      // Создание
      this.store.setCreateData(data)
      this.store.setCreateStep(EApartmentCreateStep.Role)
    }
  }

  submitRoleInfo(data: { type_user: IUserTypeEnum }): void {
    if (this.store.createData) {
      EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
      this.store.setCreateLoading(true)
      this.createApartment({ ...this.store.createData, type_user: data.type_user })
        .then(() => {
          this.closeModal()
          EVENT_EMITTER.emitEvent({ name: EApartmentsFlowEvents.ON_APARTMENT_CREATED })
        })
        .finally(() => {
          EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
          this.store.setCreateLoading(false)
        })
    }
  }

  createApartment(data: IApartmentCreate): Promise<any> {
    const alreadyExist = this.store.list.some(item => item.house.id_object === data.house.id_object)

    if (alreadyExist) {
      Toast.show({ type: 'error', text1: 'Недвижимость уже существует' })
      return Promise.resolve(true)
    } else {
      return this.apiRepo.apartmentAddApartment({
        body: {
          house: {
            id_object: data.house.id_object,
            region_city: data.house.region_city,
            street: data.house.street,
            house: data.house.house,
            body: data.house.body,
            block: data.house.block,
          },
          flat: data.flat,
          type_user: data.type_user,
          floor: data.floor,
          entrance: data.entrance || 'entrance',
        },
      })
    }
  }

  getAddress(search: string): Promise<IYandexMapAddress[]> {
    this.store.setSearchLoading(true)
    return this.yandexMapRepo.getAddress(search).finally(() => this.store.setSearchLoading(false))
  }

  getCities(search: string): Promise<IYandexMapCity[]> {
    this.store.setSearchLoading(true)
    return this.yandexMapRepo.getCities(search).finally(() => this.store.setSearchLoading(false))
  }

  getHouse(city: IYandexMapCity, street: string, search: string): Promise<IYandexMapAddress[]> {
    this.store.setSearchLoading(true)
    return this.yandexMapRepo
      .getHouse(city, street, search)
      .finally(() => this.store.setSearchLoading(false))
  }

  getStreet(city: IYandexMapCity, search: string): Promise<IYandexMapStreet[]> {
    this.store.setSearchLoading(true)
    return this.yandexMapRepo
      .getStreet(city, search)
      .finally(() => this.store.setSearchLoading(false))
  }
}
