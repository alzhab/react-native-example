import { useInjection } from 'inversify-react'
import { ApartmentsStoreId, IApartmentsStore } from 'blms/ApartmentsBlm/store'
import { useCallback, useMemo } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { IApartmentAdapter } from 'repositories/Api'
import { INavigationService, NavigationServiceId } from '@corrbo/module-navigation/services'

export function useApartmentDetailAdapter() {
  const store = useInjection<IApartmentsStore>(ApartmentsStoreId)
  const navigation = useInjection<INavigationService>(NavigationServiceId)
  const data: IApartmentAdapter = useMemo(() => store.apartmentDetail as any, [store.apartmentDetail])

  useFocusEffect(
    useCallback(() => {
      if (!data) {
        navigation.goBack()
      }

      return () => {
        store.setApartmentDetail(null)
      }
    }, []),
  )

  return {
    data,
  }
}
