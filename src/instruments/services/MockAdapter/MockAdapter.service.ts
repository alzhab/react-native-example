import Adapter from 'axios-mock-adapter'
import { inject, injectable } from 'inversify'
import { HttpClientId, IHttpClient } from 'services/HttpClientService'
import { AxiosInstance } from 'axios'
import { IMockAdapter } from './types'
import { MOCK_CONFIG } from 'configs/MockData'
import { Methods, Statuses, TMockRequestStatusBtn } from 'configs/MockData/types'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EAppStateFlowEvents } from 'blms/AppStateBlm/flow'

export const MockAdapterId = Symbol.for('MockAdapter')

@injectable()
export class MockAdapter implements IMockAdapter {
  $axios: AxiosInstance

  constructor(@inject(HttpClientId) private httpClient: IHttpClient) {
    this.$axios = httpClient.$mockAxios
  }

  init() {
    const mock = new Adapter(this.$axios, { delayResponse: 2000 })

    mock.onAny().reply(config => {
      const { url, method, baseURL } = config
      const route = MOCK_CONFIG[url as any]

      if (!(method && route[method.toUpperCase() as Methods])) {
        return [200, {}]
      }

      let { responses, defaultResponse } = route[method.toUpperCase() as Methods] || {
        responses: {},
        defaultResponse: 200,
      }

      responses = {
        ...responses,
        500: { detail: 'Ошибка сервера' },
      }

      if (defaultResponse && responses[defaultResponse]) {
        return [defaultResponse, responses[defaultResponse]]
      }

      if (Object.keys(responses).length) {
        const statuses = Object.keys(responses).map(Number) as Statuses[]

        const buttons: TMockRequestStatusBtn = onPress =>
          statuses.map(item => ({
            title: item.toString(),
            val: item,
            onPress: () => onPress(item),
          }))

        if (statuses.length) {
          return new Promise(res => {
            EVENT_EMITTER.emitEvent({
              name: EAppStateFlowEvents.ON_CHOOSE_MOCK_REQUEST_STATUS,
              data: {
                buttons: buttons(item => res([item, responses[item]])),
                title: url || '',
              },
            })
          })
        }
      }

      return [200, {}]
    })
  }
}
