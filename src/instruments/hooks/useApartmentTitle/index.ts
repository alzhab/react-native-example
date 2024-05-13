import { IApartmentAdapter, IApartmentReponse } from 'repositories/Api'
import { useMemo } from 'react'

export function useApartmentTitle(data?: IApartmentReponse | IApartmentAdapter) {
  return useMemo(() => (data ? getApartmentTitle(data) : ''), [data])
}

export function getApartmentTitle(data: IApartmentReponse | IApartmentAdapter) {
  return [
    data.house.region_city,
    data.house.street,
    data.house.body ? 'Блок ' + data.house.body : '',
    data.house.block ? 'Подъезд ' + data.house.block : '',
    data.house.house ? 'Дом ' + data.house.house : '',
    data.flat ? 'Квартира ' + data.flat : '',
    data.flat ? 'Этаж ' + data.floor : '',
  ]
    .filter(item => !!item)
    .join(', ')
    .replace(/,,|, ,/g, ',')
}
