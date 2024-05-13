import { DimensionValue } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'

export interface IGuideStore {
  guideStepsConfig: TGuideStepsConfig
  addGuideStepConfig(data: TAddGuideStepConfigData): void
  addGuideStepsConfig(data: TAddGuideStepConfigData[]): void

  isNeedToShow: boolean
  setIsNeedToShow(val: boolean): void

  isVisible: boolean
  setIsVisible(val: boolean): void

  activeStep: number
  setActiveStep(val: number): void

  clear(): void

  isHydrated: boolean
}

export interface IGuideStepConfig {
  componentImage?: string
  layout: {
    top: number
    left: number
    bottom: number
    right: number
    width: DimensionValue
    height: DimensionValue
  }
}

export type TGuideStepsConfig = { [key: string]: IGuideStepConfig }
export type TAddGuideStepConfigData = { key: string; val: IGuideStepConfig }
