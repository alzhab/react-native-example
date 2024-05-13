import { injectable } from 'inversify'
import { IGuideStepConfig, IGuideStore, TAddGuideStepConfigData, TGuideStepsConfig } from './types'
import { makeAutoObservable } from 'mobx'
import { isHydrated, makePersistable } from 'mobx-persist-store'

export const GuideStoreId = Symbol.for('GuideStore')

@injectable()
export class GuideStore implements IGuideStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'GuideStore', properties: ['isNeedToShow'] })
  }

  guideStepsConfig: TGuideStepsConfig = {}
  addGuideStepConfig({ key, val }: TAddGuideStepConfigData): void {
    this.guideStepsConfig = {
      ...this.guideStepsConfig,
      [key]: val,
    }
  }
  addGuideStepsConfig(data: TAddGuideStepConfigData[]): void {
    this.guideStepsConfig = {
      ...this.guideStepsConfig,
      ...data.reduce((prev, active) => {
        prev[active.key] = active.val
        return prev
      }, {} as { [p: string]: IGuideStepConfig }),
    }
  }

  isNeedToShow: boolean = false

  setIsNeedToShow(val: boolean): void {
    this.isNeedToShow = val
  }

  activeStep: number = 1

  setActiveStep(val: number): void {
    this.activeStep = val
  }

  isVisible: boolean = false
  setIsVisible(val: boolean): void {
    this.isVisible = val
  }

  clear(): void {
    this.activeStep = 1
    this.isVisible = false
    this.isNeedToShow = false
  }

  get isHydrated() {
    return isHydrated(this)
  }
}
