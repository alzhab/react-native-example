import { injectable } from 'inversify'
import {
  EChangeTempPasswordSteps,
  IChangeTempPasswordData,
  IChangeTempPasswordStore,
} from './types'
import { makeAutoObservable } from 'mobx'
import { isHydrated, makePersistable } from 'mobx-persist-store'

export const ChangeTempPasswordStoreId = Symbol.for('ChangeTempPasswordStore')

@injectable()
export class ChangeTempPasswordStore implements IChangeTempPasswordStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'ChangeTempPasswordStore',
      properties: ['needToShow', 'data'],
    })
  }

  needToShow: boolean = false

  setNeedToShow(val: boolean): void {
    this.needToShow = val
  }

  step: EChangeTempPasswordSteps = EChangeTempPasswordSteps.ENTER

  setStep(step: EChangeTempPasswordSteps): void {
    this.step = step
  }

  data: IChangeTempPasswordData = {
    name: '',
    surname: '',
    patronymic: '',
    temp_password: '',
    new_password: '',
  }

  addChangeTempPasswordData(data: Partial<IChangeTempPasswordData>): void {
    this.data = {
      ...this.data,
      ...data,
    }
  }

  setChangeTempPasswordData(data: IChangeTempPasswordData): void {
    this.data = data
  }

  clearChangeTempPasswordData(): void {
    this.needToShow = false
    this.data = {
      name: '',
      surname: '',
      patronymic: '',
      temp_password: '',
      new_password: '',
    }
  }

  get isHydrated() {
    return isHydrated(this)
  }
}
