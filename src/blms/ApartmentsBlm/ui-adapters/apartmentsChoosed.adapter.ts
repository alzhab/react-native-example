import { useInjection } from 'inversify-react'
import { useMemo } from 'react'
import { ApartmentsStoreId, IApartmentsStore } from '../store'

export function useApartmentChoosedAdapter() {
  const store = useInjection<IApartmentsStore>(ApartmentsStoreId)

  const choosedApartment = useMemo(() => store.choosedApartment, [store.choosedApartment])

  return {
    choosedApartment,
  }
}
