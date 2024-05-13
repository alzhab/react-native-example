import { useInjection } from 'inversify-react'
import { useCallback, useMemo, useState } from 'react'
import { ApartmentsCreateActionsId, IApartmentsCreateActions } from 'blms/ApartmentsBlm/actions'
import { ApartmentsStoreId, IApartmentsStore } from 'blms/ApartmentsBlm/store'
import { IDropDownSearchProps } from 'organisms/DropDownSearch'
import { IYandexMapCity } from 'repositories/YandexMap'

export function useApartmentsSearchAdapter(city: IYandexMapCity, street: string) {
  const store = useInjection<IApartmentsStore>(ApartmentsStoreId)
  const actions = useInjection<IApartmentsCreateActions>(ApartmentsCreateActionsId)

  const [citiesButtons, setCitiesButtons] = useState<IDropDownSearchProps['options']>([])
  const [streetsButtons, setStreetsButtons] = useState<IDropDownSearchProps['options']>([])
  const [houseButtons, setHouseButtons] = useState<IDropDownSearchProps['options']>([])

  const loading = useMemo(() => store.searchLoading, [store.searchLoading])

  const searchCities = useCallback((search: string) => {
    actions
      .getCities(search)
      .then(res => setCitiesButtons(res))
      .catch(e => console.log(e))
  }, [])

  const searchStreets = useCallback(
    (search: string) => {
      actions
        .getStreet(city, search)
        .then(res => setStreetsButtons(res))
        .catch(e => console.log(e))
    },
    [city],
  )

  const searchHouse = useCallback(
    (search: string) => {
      actions
        .getHouse(city, street, search)
        .then(res => setHouseButtons(res))
        .catch(e => console.log(e))
    },
    [city, street],
  )

  return {
    citiesButtons,
    searchCities,
    loading,
    streetsButtons,
    houseButtons,
    searchStreets,
    searchHouse,
  }
}
