import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { toJS } from 'mobx'
import { useNavigation } from '@react-navigation/native'
import { IApartmentsStore } from 'blms/ApartmentsBlm/store'
import { IUserTypeEnum } from 'repositories/Api'
import {
  ERegistrationSteps,
  IRegistrationData,
  IRegistrationStore,
  RegistrationStoreId,
} from 'blms/AuthenticationBlm/store'
import { IRegistrationActions, RegistrationActionsId } from 'blms/AuthenticationBlm/actions'

export function useRegistrationIinFormAdapter() {
  const store = useInjection<IRegistrationStore>(RegistrationStoreId)
  const actions = useInjection<IRegistrationActions>(RegistrationActionsId)

  const checkIin = useCallback(
    (data: Pick<IRegistrationData, 'name' | 'surname' | 'patronymic'>) => actions.checkIin(data),
    [],
  )

  const submitIin = useCallback(
    (data: Pick<IRegistrationData, 'name' | 'surname' | 'patronymic'>) => actions.submitIin(data),
    [],
  )

  const data = useMemo(() => toJS(store.data), [store.data])

  return {
    submitIin,
    checkIin,
    data,
  }
}

export function useRegistrationApartsFormAdapter() {
  const actions = useInjection<IRegistrationActions>(RegistrationActionsId)
  const store = useInjection<IRegistrationStore>(RegistrationStoreId)

  const submitAparts = useCallback(
    (data: IApartmentsStore['createData']) => actions.submitAparts(data),
    [],
  )

  const data = useMemo(() => toJS(store.data), [store.data])

  return {
    submitAparts,
    data,
  }
}

export function useRegistrationRoleFormAdapter() {
  const actions = useInjection<IRegistrationActions>(RegistrationActionsId)

  const submitRole = useCallback((data: IUserTypeEnum) => actions.submitRole(data), [])

  return {
    submitRole,
  }
}

export function useRegistrationEnterAdapter() {
  const actions = useInjection<IRegistrationActions>(RegistrationActionsId)

  const submitEnter = useCallback(() => actions.submitEnter(), [])

  return {
    submitEnter,
  }
}

export function useRegistrationStepAdapter() {
  const store = useInjection<IRegistrationStore>(RegistrationStoreId)
  const navigation = useNavigation()
  const step = useMemo(() => store.step, [store.step])

  const back = useCallback(() => {
    switch (step) {
      case ERegistrationSteps.ENTER:
        navigation.goBack()
        break
      case ERegistrationSteps.IIN:
        store.setStep(ERegistrationSteps.ENTER)
        break
      case ERegistrationSteps.APARTS:
        store.setStep(ERegistrationSteps.IIN)
        break
      case ERegistrationSteps.ROLE:
        store.setStep(ERegistrationSteps.APARTS)
        break
    }
  }, [navigation, step, store])

  return {
    step,
    back,
  }
}
