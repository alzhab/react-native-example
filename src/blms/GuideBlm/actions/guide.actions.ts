import { inject, injectable } from 'inversify'
import { IGuideActions } from './types'
import { GuideStoreId, IGuideStore, TAddGuideStepConfigData } from '../store'
import { GUIDE_STEPS } from 'configs/Guide'

export const GuideActionsId = Symbol.for('GuideActions')

@injectable()
export class GuideActions implements IGuideActions {
  constructor(@inject(GuideStoreId) private guideStore: IGuideStore) {}

  nextStep(): void {
    const activeStepNext = this.guideStore.activeStep + 1

    if (GUIDE_STEPS[activeStepNext.toString()]) {
      this.guideStore.setActiveStep(activeStepNext)
    } else {
      this.guideStore.clear()
    }
  }

  prevStep(): void {
    const activeStepNext = this.guideStore.activeStep - 1

    if (activeStepNext !== 0 && GUIDE_STEPS[this.guideStore.activeStep]) {
      this.guideStore.setActiveStep(activeStepNext)
    }
  }

  startGuide(): void {
    if (this.guideStore.isNeedToShow) {
      this.guideStore.setIsVisible(true)
    }
  }

  stopGuide(): void {
    this.guideStore.clear()
  }

  addGuideStepsConfig(data: TAddGuideStepConfigData[]): void {
    this.guideStore.addGuideStepsConfig(data)
  }

  addGuideStepConfig(data: TAddGuideStepConfigData): void {
    this.guideStore.addGuideStepConfig(data)
  }
}
