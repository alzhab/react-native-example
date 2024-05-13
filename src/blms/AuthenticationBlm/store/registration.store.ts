import { injectable } from 'inversify'
import { ERegistrationSteps, IRegistrationData, IRegistrationStore } from './types'
import { makeAutoObservable } from 'mobx'
import { isHydrated, makePersistable } from 'mobx-persist-store'
import { DEFAULT_APARTMENT } from 'repositories/Api/models'

export const RegistrationStoreId = Symbol.for('RegistrationStore')

@injectable()
export class RegistrationStore implements IRegistrationStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'RegistrationStore',
      properties: [],
    })
  }

  step: ERegistrationSteps = ERegistrationSteps.ENTER

  setStep(step: ERegistrationSteps): void {
    this.step = step
  }

  data: IRegistrationData = {
    iin: '',
    name: '',
    surname: '',
    patronymic: '',
    phone: '',
    password: '',

    apartmentData: DEFAULT_APARTMENT,
  }

  addRegistrationData(data: Partial<IRegistrationData>): void {
    this.data = {
      ...this.data,
      ...data,
    }
  }

  setRegistrationData(data: IRegistrationData): void {
    this.data = data
  }

  clearRegistrationData(): void {
    this.data = {
      iin: '',
      name: '',
      surname: '',
      patronymic: '',
      phone: '',
      password: '',

      apartmentData: DEFAULT_APARTMENT,
    }
  }

  get isHydrated() {
    return isHydrated(this)
  }
}
