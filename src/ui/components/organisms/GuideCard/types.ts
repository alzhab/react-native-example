import { IGuideStep } from 'configs/Guide'
import { IGuideStepConfig } from 'blms/GuideBlm/store'

export interface IGuideCardProps {
  config: IGuideStepConfig
  info: IGuideStep
  onNext(): void
  onClose(): void
  activeStep: number
  stepsCount: number
}
