import {
  IYandexMapAddress,
  IYandexMapCity,
  IYandexMapRepo,
  IYandexMapStreet,
} from 'repositories/YandexMap/types'
import { injectable } from 'inversify'
import axios from 'axios'
import { YANDEX_GEOCODER_API } from '@env'

export const YandexMapRepoId = Symbol.for('YandexMapRepoId')

@injectable()
export class YandexMapRepo implements IYandexMapRepo {
  constructor() {}

  getAddress(search: string): Promise<IYandexMapAddress[]> {
    return axios
      .request({
        baseURL: 'https://geocode-maps.yandex.ru/1.x',
        params: {
          apikey: YANDEX_GEOCODER_API,
          geocode: search,
          format: 'json',
          kind: 'house',
        },
      })
      .then(res => {
        const places = res.data?.response?.GeoObjectCollection?.featureMember || undefined

        if (places) {
          const results: IYandexMapAddress[] = places
            .map((item: any) => {
              const GeoObject = item.GeoObject

              const components =
                GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components || []
              const title = GeoObject?.metaDataProperty?.GeocoderMetaData?.Address.formatted
              const id_object = GeoObject?.Point?.pos?.replace(' ', '_')

              const { country, city, street, house, district } = components.reduce(
                (prev: any, current: any) => {
                  switch (current.kind) {
                    case 'locality':
                      prev.city = current.name
                      break
                    case 'street':
                      prev.street = current.name
                      break
                    case 'house':
                      prev.house = current.name
                      break
                    case 'country':
                      prev.country = current.name
                      break
                    case 'district':
                      prev.district = current.name
                      break
                  }

                  return prev
                },
                {
                  city: '',
                  street: '',
                  house: '',
                },
              )

              return {
                val: {
                  id_object,
                  city,
                  street: street || district,
                  house,
                },
                title: title.replace(country + ', ', ''),
              }
            })
            .filter((item: any) => !!item.title)

          return results
        }

        return []
      })
  }

  getCities(search: string): Promise<IYandexMapCity[]> {
    return axios
      .request({
        baseURL: 'https://geocode-maps.yandex.ru/1.x',
        params: {
          apikey: YANDEX_GEOCODER_API,
          geocode: 'Казахстан ' + search,
          format: 'json',
        },
      })
      .then(res => {
        const places = res.data?.response?.GeoObjectCollection?.featureMember || undefined

        if (places) {
          return places
            .map((item: any) => {
              let result = { val: '', title: '' }

              const GeoObject = item.GeoObject

              const metaDataProperty = GeoObject.metaDataProperty

              const GeocoderMetaData = metaDataProperty.GeocoderMetaData

              const isLocality = GeocoderMetaData.kind === 'locality'

              if (isLocality) {
                const locality = GeocoderMetaData.text.replace('Казахстан, ', '')
                const Envelope = GeoObject.boundedBy.Envelope
                const lowerCorner = Envelope.lowerCorner.replace(' ', ',')
                const upperCorner = Envelope.upperCorner.replace(' ', ',')
                const val = `${lowerCorner}~${upperCorner}`
                result = { val, title: locality }
              }

              return result
            })
            .filter((item: any) => !!item.val)
        }

        return []
      })
  }

  getStreet(city: IYandexMapCity, search: string): Promise<IYandexMapStreet[]> {
    return axios
      .request({
        baseURL: 'https://geocode-maps.yandex.ru/1.x',
        params: {
          apikey: YANDEX_GEOCODER_API,
          geocode: search,
          format: 'json',
          bbox: city.val,
        },
      })
      .then(res => {
        const places = res.data?.response?.GeoObjectCollection?.featureMember || undefined

        if (places) {
          // const results: IYandexMapCity[] = places
          //   .map((item: any) => {
          //     const GeoObject = item.GeoObject
          //
          //     const components =
          //       GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components || []
          //
          //     const { district, street } = components.reduce((prev: any, current: any) => {
          //       switch (current.kind) {
          //         case 'district':
          //           prev.district = current.name
          //           break
          //         case 'street':
          //           prev.street = current.name
          //           break
          //       }
          //
          //       return prev
          //     }, {})
          //
          //     return {
          //       val: street || district,
          //       title: street || district,
          //     }
          //   })
          //   .filter((item: any) => !!item.title)
          //   .filter((value: any, index: number, self: any) => {
          //     return self.findIndex((v: any) => v.title === value.title) === index
          //   })

          // return results

          return places
            .map((item: any) => {
              let result = { val: '', title: '' }

              const GeoObject = item.GeoObject

              const metaDataProperty = GeoObject.metaDataProperty

              const GeocoderMetaData = metaDataProperty.GeocoderMetaData

              const isStreet = ['street', 'district'].includes(GeocoderMetaData.kind)

              if (isStreet) {
                const isStreetInCity = GeocoderMetaData.text.match(
                  'Казахстан, ' + city.title + ', ',
                )
                const isNotZK = !GeocoderMetaData.text.match('жилой комплекс')
                if (isStreetInCity && isNotZK) {
                  const street = GeocoderMetaData.text.replace(
                    'Казахстан, ' + city.title + ', ',
                    '',
                  )
                  const Envelope = GeoObject.boundedBy.Envelope
                  const lowerCorner = Envelope.lowerCorner.replace(' ', ',')
                  const upperCorner = Envelope.upperCorner.replace(' ', ',')
                  const val = `${lowerCorner}~${upperCorner}`
                  result = { val, title: street }
                }
              }

              return result
            })
            .filter((item: any) => !!item.val)
        }

        return []
      })
  }

  getHouse(city: IYandexMapCity, street: string, search: string): Promise<IYandexMapAddress[]> {
    return axios
      .request({
        baseURL: 'https://geocode-maps.yandex.ru/1.x',
        params: {
          apikey: YANDEX_GEOCODER_API,
          geocode: street + ' ' + search,
          format: 'json',
          bbox: city.val,
        },
      })
      .then(res => {
        const places = res.data?.response?.GeoObjectCollection?.featureMember || undefined

        if (places) {
          // const results: IYandexMapAddress[] = places
          //   .map((item: any) => {
          //     const GeoObject = item.GeoObject
          //
          //     const components =
          //       GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components || []
          //     const id_object = GeoObject?.Point?.pos?.replace(' ', '_')
          //
          //     const { house, district } = components.reduce(
          //       (prev: any, current: any) => {
          //         switch (current.kind) {
          //           case 'locality':
          //             prev.city = current.name
          //             break
          //           case 'street':
          //             prev.street = current.name
          //             break
          //           case 'house':
          //             prev.house = current.name
          //             break
          //           case 'country':
          //             prev.country = current.name
          //             break
          //           case 'district':
          //             prev.district = current.name
          //             break
          //         }
          //
          //         return prev
          //       },
          //       {
          //         city: '',
          //         street: '',
          //         house: '',
          //       },
          //     )
          //
          //     return {
          //       val: {
          //         id_object,
          //         city,
          //         street: street || district,
          //         house,
          //       },
          //       title: house,
          //     }
          //   })
          //   .filter((item: any) => !!item.title)
          //
          // return results

          return places
            .map((item: any) => {
              let result = { val: '', title: '' }

              const GeoObject = item.GeoObject

              const metaDataProperty = GeoObject.metaDataProperty

              const GeocoderMetaData = metaDataProperty.GeocoderMetaData

              const isHouse = ['exact', 'number', 'near', 'range'].includes(
                GeocoderMetaData.precision,
              )

              if (isHouse) {
                const titleItem = GeocoderMetaData.Address.Components.find(
                  (i: any) => i.kind === 'house',
                )
                if (titleItem) {
                  const title = titleItem.name
                  const val = GeoObject?.Point?.pos?.replace(' ', '_')
                  result = { val, title }
                }
              }

              return result
            })
            .filter((item: any) => !!item.val)
        }

        return []
      })
  }
}
