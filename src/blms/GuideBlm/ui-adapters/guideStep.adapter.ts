import { useInjection } from 'inversify-react'
import { useCallback } from 'react'
import { GuideActionsId, IGuideActions } from 'blms/GuideBlm/actions'
import { TAddGuideStepConfigData } from 'blms/GuideBlm/store'

export function useGuideStepAdapter() {
  const actions = useInjection<IGuideActions>(GuideActionsId)

  const addActiveSteps = useCallback(
    (data: TAddGuideStepConfigData[]) => actions.addGuideStepsConfig(data),
    [],
  )

  const addActiveStep = useCallback(
    (data: TAddGuideStepConfigData) => actions.addGuideStepConfig(data),
    [],
  )

  return {
    addActiveSteps,
    addActiveStep,
  }
}
