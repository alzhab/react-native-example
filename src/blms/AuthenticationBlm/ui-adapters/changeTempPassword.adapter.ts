import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { toJS } from 'mobx'
import { useNavigation } from '@react-navigation/native'
import {
  ChangeTempPasswordStoreId,
  EChangeTempPasswordSteps,
  IChangeTempPasswordData,
  IChangeTempPasswordStore,
} from 'blms/AuthenticationBlm/store'
import {
  ChangeTempPasswordActionsId,
  IChangeTempPasswordActions,
} from 'blms/AuthenticationBlm/actions'
import { RootNav } from 'navigations/RootNavigation'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EAuthenticationFlowEvents } from 'blms/AuthenticationBlm/flow'

export function useChangeTempPasswordFullnameFormAdapter() {
  const store = useInjection<IChangeTempPasswordStore>(ChangeTempPasswordStoreId)
  const actions = useInjection<IChangeTempPasswordActions>(ChangeTempPasswordActionsId)

  const submitFullname = useCallback(
    (data: Pick<IChangeTempPasswordData, 'name' | 'surname' | 'patronymic'>) =>
      actions.submitFullname(data),
    [],
  )

  const data = useMemo(() => toJS(store.data), [store.data])

  return {
    submitFullname,
    data,
  }
}

export function useChangeTempPasswordPasswordFormAdapter() {
  const actions = useInjection<IChangeTempPasswordActions>(ChangeTempPasswordActionsId)
  const store = useInjection<IChangeTempPasswordStore>(ChangeTempPasswordStoreId)

  const submitPassword = useCallback(
    (data: Pick<IChangeTempPasswordData, 'new_password'>) => actions.submitPassword(data),
    [],
  )

  const data = useMemo(() => toJS(store.data), [store.data])

  return {
    submitPassword,
    data,
  }
}

export function useChangeTempPasswordEnterAdapter() {
  const actions = useInjection<IChangeTempPasswordActions>(ChangeTempPasswordActionsId)

  const submitEnter = useCallback(() => actions.submitEnter(), [])

  return {
    submitEnter,
  }
}

export function useChangeTempPasswordStepAdapter() {
  const store = useInjection<IChangeTempPasswordStore>(ChangeTempPasswordStoreId)
  const navigation = useNavigation<RootNav>()
  const step = useMemo(() => store.step, [store.step])

  const back = useCallback(() => {
    switch (step) {
      case EChangeTempPasswordSteps.ENTER:
        EVENT_EMITTER.emitEvent({ name: EAuthenticationFlowEvents.ON_LOGOUT })
        break
      case EChangeTempPasswordSteps.PASSWORD:
        store.setStep(EChangeTempPasswordSteps.ENTER)
        break
      case EChangeTempPasswordSteps.FULL_NAME:
        store.setStep(EChangeTempPasswordSteps.PASSWORD)
        break
    }
  }, [navigation, step, store])

  return {
    step,
    back,
  }
}
