import { useInjection } from 'inversify-react'
import { useCallback, useEffect, useMemo } from 'react'
import { get } from 'mobx'
import { GUIDE_STEPS } from 'configs/Guide'
import { GuideActionsId, IGuideActions } from 'blms/GuideBlm/actions'
import { GuideStoreId, IGuideStepConfig, IGuideStore } from 'blms/GuideBlm/store'
import { BackHandler } from 'react-native'

export function useGuideBackdropAdapter() {
  const actions = useInjection<IGuideActions>(GuideActionsId)
  const store = useInjection<IGuideStore>(GuideStoreId)

  const isVisible = useMemo(() => store.isVisible, [store.isVisible])

  const activeStepKey = useMemo(
    () => (isVisible ? store.activeStep.toString() : '0'),
    [isVisible, store.activeStep],
  )

  const activeStepConfig: IGuideStepConfig | undefined = get(
    store.guideStepsConfig,
    activeStepKey.toString(),
  )
  const activeStepInfo = useMemo(
    () => (activeStepKey ? GUIDE_STEPS[activeStepKey] : null),
    [activeStepKey],
  )

  const nextStep = useCallback(() => actions.nextStep(), [])
  const prevStep = useCallback(() => actions.prevStep(), [])
  const stopGuide = useCallback(() => actions.stopGuide(), [])

  useEffect(() => {
    let backHandler: any = null

    if (isVisible) {
      backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        prevStep()
        return true
      })
    }

    return () => {
      if (backHandler) {
        backHandler.remove()
      }
    }
  }, [isVisible])

  return {
    isVisible,
    activeStepInfo,
    activeStepConfig,
    activeStep: +activeStepKey,
    nextStep,
    prevStep,
    stopGuide,
  }
}
