import { useInjection } from 'inversify-react'
import { useCallback, useEffect, useMemo } from 'react'
import { InteractionManager } from 'react-native'
import { CompaniesStoreId, ICompaniesStore } from 'blms/CompaniesBlm/store'
import { CompanyDetailActionsId, ICompanyDetailActions } from 'blms/CompaniesBlm/actions'

export function useCompanyDetailAdapter() {
  const store = useInjection<ICompaniesStore>(CompaniesStoreId)
  const actions = useInjection<ICompanyDetailActions>(CompanyDetailActionsId)

  const data = useMemo(() => store.companyDetail, [store.companyDetail])
  const isOpen = useMemo(() => !!store.companyDetailId, [store.companyDetailId])
  const isLoading = useMemo(() => store.companyDetailLoading, [store.companyDetailLoading])

  const close = useCallback(() => actions.closeCompanyDetailInfo(), [])

  const action = useCallback(() => actions.detailAction(), [])

  useEffect(() => {
    if (store.companyDetailId) {
      InteractionManager.runAfterInteractions(() => {
        actions.getCompanyDetailInfo()
      })
    } else {
      actions.closeCompanyDetailInfo()
    }
  }, [store.companyDetailId])

  return { data, isOpen, isLoading, close, action }
}
