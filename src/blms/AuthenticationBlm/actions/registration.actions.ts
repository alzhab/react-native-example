import { inject, injectable } from 'inversify'
import { INavigationService, NavigationServiceId } from '@corrbo/module-navigation/services'
import { ApiRepoId, IApartmentCreate, IApiRepo, IUserTypeEnum } from 'repositories/Api'
import { AxiosError } from 'axios'
import { IRegistrationActions } from './types'
import {
  ERegistrationSteps,
  IRegistrationData,
  IRegistrationStore,
  RegistrationStoreId,
} from 'blms/AuthenticationBlm/store'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'
import { EAuthenticationFlowEvents } from 'blms/AuthenticationBlm/flow'
import { EGuideFlowEvents } from 'blms/GuideBlm/flow'

export const RegistrationActionsId = Symbol.for('RegistrationActions')

@injectable()
export class RegistrationActions implements IRegistrationActions {
  constructor(
    @inject(RegistrationStoreId) private registrationStore: IRegistrationStore,
    @inject(NavigationServiceId) private navigationService: INavigationService,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
  ) {}

  clear(): void {
    this.registrationStore.clearRegistrationData()
  }

  onStart(data: Pick<IRegistrationData, 'phone' | 'password'>): void {
    this.navigationService.navigate('RegistrationScreen')
    this.registrationStore.addRegistrationData(data)
    this.registrationStore.setStep(ERegistrationSteps.ENTER)
  }

  submitEnter(): void {
    this.registrationStore.setStep(ERegistrationSteps.IIN)
  }

  checkIin(data: Pick<IRegistrationData, 'name' | 'surname' | 'patronymic'>): void {
    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    new Promise(res => {
      setTimeout(() => {
        this.registrationStore.addRegistrationData(data)
        res(true)
      }, 1000)
    }).finally(() => {
      EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
    })
  }

  submitIin(data: Pick<IRegistrationData, 'name' | 'surname' | 'patronymic'>): void {
    this.registrationStore.addRegistrationData(data)
    this.registrationStore.setStep(ERegistrationSteps.APARTS)
  }

  submitAparts(data: IApartmentCreate): void {
    this.registrationStore.addRegistrationData({ apartmentData: data })
    this.registrationStore.setStep(ERegistrationSteps.ROLE)
  }

  submitRole(data: IUserTypeEnum): void {
    this.registrationStore.addRegistrationData({
      apartmentData: {
        ...this.registrationStore.data.apartmentData,
        type_user: data,
      },
    })

    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })

    this.apiRepo
      .mainRegistration({
        body: this.registrationStore.data,
      })
      .then(res => {
        EVENT_EMITTER.emitEvent({
          name: EAuthenticationFlowEvents.ON_REGISTER_SUCCESS,
          data: res.data,
        })
      })
      .catch((err: AxiosError<{ details: string }>) => {
        EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
        return Promise.reject(err)
      })
  }

  afterRegistration(): void {
    this.registrationStore.clearRegistrationData()
  }
}
