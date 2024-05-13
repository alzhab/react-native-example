import { useInjection } from 'inversify-react'

import { useCallback, useEffect, useMemo } from 'react'
import { IServicesMinInfo } from 'repositories/Api/models'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { RootNav } from 'navigations/RootNavigation'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { CompaniesStoreId, ICompaniesStore } from 'blms/CompaniesBlm/store'
import { CompaniesListActionsId, ICompaniesListActions } from 'blms/CompaniesBlm/actions'
import { EAuthenticationFlowEvents } from 'blms/AuthenticationBlm/flow'

export function useCompaniesListAdapter() {
  const store = useInjection<ICompaniesStore>(CompaniesStoreId)
  const actions = useInjection<ICompaniesListActions>(CompaniesListActionsId)
  const navigation = useNavigation<RootNav>()

  const data = useMemo(() => store.companies, [store.companies])
  const isLoading = useMemo(() => store.companiesLoading, [store.companiesLoading])

  const openDetail = useCallback(
    (id: IServicesMinInfo['id']) =>
      EVENT_EMITTER.emitEvent({
        name: EAuthenticationFlowEvents.ON_AUTH_GUARD_ACTION,
        data: {
          action: () => actions.openCompanyInfo(id),
        },
      }),
    [navigation],
  )

  useFocusEffect(
    useCallback(() => {
      actions.getCompaniesList()
    }, []),
  )

  return { data, isLoading, openDetail }
}

export function useCompaniesStartAdapter() {
  const store = useInjection<ICompaniesStore>(CompaniesStoreId)
  const actions = useInjection<ICompaniesListActions>(CompaniesListActionsId)
  const navigation = useNavigation<RootNav>()

  const data = useMemo(() => store.companies, [store.companies])
  const isLoading = useMemo(() => store.companiesLoading, [store.companiesLoading])

  const openAll = useCallback(
    () =>
      EVENT_EMITTER.emitEvent({
        name: EAuthenticationFlowEvents.ON_AUTH_GUARD_ACTION,
        data: {
          action: () => {
            navigation.navigate('ServicesScreen')
          },
        },
      }),
    [navigation],
  )

  const openCompany = useCallback(
    (name: string) =>
      EVENT_EMITTER.emitEvent({
        name: EAuthenticationFlowEvents.ON_AUTH_GUARD_ACTION,
        data: {
          action: () => {
            navigation.navigate('ServicesScreen', { categoryName: name })
          },
        },
      }),
    [navigation],
  )

  useEffect(() => {
    actions.getCompaniesList()
  }, [])

  return { data, isLoading, openAll, openCompany }
}
