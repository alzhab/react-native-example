import { TAddGuideStepConfigData } from 'blms/GuideBlm/store'

export interface IGuideActions {
  nextStep(): void
  prevStep(): void
  startGuide(): void
  stopGuide(): void
  addGuideStepsConfig(data: TAddGuideStepConfigData[]): void
  addGuideStepConfig(data: TAddGuideStepConfigData): void
}
