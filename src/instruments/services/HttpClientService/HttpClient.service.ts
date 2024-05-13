import axios from 'axios'
import { SERVER_URL } from '@env'
import { inject, injectable } from 'inversify'
import { IHttpClient } from './types'
import { LocalStorageClientId } from '@corrbo/module-localstorage/services/LocalClientService/LocalClient.service'
import { ILocalStorageClient } from '@corrbo/module-localstorage/services/LocalClientService/types'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EAppStateFlowEvents } from 'blms/AppStateBlm/flow'
import CookieManager from '@react-native-cookies/cookies'
import moment from 'moment'
import { EAuthenticationFlowEvents } from 'blms/AuthenticationBlm/flow'
import Toast from 'react-native-toast-message'

export const HttpClientId = Symbol.for('HttpClient')

@injectable()
export class HttpClient implements IHttpClient {
  public $axios = axios.create({
    baseURL: SERVER_URL + '/api',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      // Referer: SERVER_URL + '/api',
    },
    withCredentials: true,
  })
  public $mockAxios = axios.create({
    baseURL: SERVER_URL + '/api',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    withCredentials: true,
  })

  constructor(@inject(LocalStorageClientId) private _localClient: ILocalStorageClient) {}

  init() {
    this._setupAxios()
    this._setupMockAxios()
  }

  _setupAxios() {
    this.$axios.interceptors.request.use(
      async config => {
        const { token } = (await this._localClient.getObject('AuthenticationStore')) as any
        const { csrftoken } = await CookieManager.get((config.baseURL || '') + (config.url || ''))

        if (csrftoken && csrftoken.value) {
          config.headers['X-CSRFToken'] = csrftoken.value
          config.headers.Referer = SERVER_URL + '/'
        }

        if (config && config.headers && token) {
          config.headers.Authorization = 'Token ' + token
        }

        return config
      },
      err => Promise.reject(err),
    )
    this.$axios.interceptors.response.use(
      config => config,
      async err => {
        const status = err.response ? err.response.status : null

        switch (status) {
          // case 403:
          //   return this.csrfRefreshCheck(err)
          case 502:
            return this.serverApiWorkCheck(err)
          case 401:
            return this.unauthorized(err)
          default:
            EVENT_EMITTER.emitEvent({ name: EAppStateFlowEvents.ON_SERVER_API_START })
            if (err.request.url === '/main/authorization/') {
              const message =
                err?.response?.data?.details ||
                (err?.response?.data?.non_field_errors
                  ? err?.response?.data?.non_field_errors[0]
                  : err)

              Toast.show({
                type: 'error',
                text1: typeof message === 'string' ? message : 'Ошибка',
              })
            }
            return Promise.reject(err)
        }
      },
    )
  }

  async csrfRefreshCheck(err: any) {
    const localCSRFToken = await this._localClient.getString('csrfToken')
    const isCSRF =
      err.response.data && err.response.data.detail && err.response.data.detail.includes('CSRF')

    if (isCSRF) {
      return this.getCsrfToken()
        .then(res => {
          err.headers['X-CSRFToken'] = res
          return this._localClient
            .set('csrfToken', res)
            .then(() =>
              CookieManager.set(SERVER_URL + '/api', {
                name: 'csrftoken',
                value: res,
                domain: 'smarthome-dev.neutronbotarb.com',
                path: '/',
                version: '1',
                expires: '2015-05-30T12:30:00.00-05:00',
              }),
            )
            .then(res => {
              console.log(res)
            })
        })
        .then(() => this.$axios.request(err.config))
    }

    return Promise.reject(err)
  }

  serverApiWorkCheck(err: any) {
    EVENT_EMITTER.emitEvent({ name: EAppStateFlowEvents.ON_SERVER_API_STOP })
    return Promise.reject(err)
  }

  unauthorized(err: any) {
    Toast.show({ type: 'error', text1: 'Сессия истекла' })
    EVENT_EMITTER.emitEvent({ name: EAuthenticationFlowEvents.ON_LOGOUT })
    return Promise.reject(err)
  }

  getCsrfToken() {
    return this.$axios
      .request<{ csrfToken: string }>({
        method: 'GET',
        url: '/main/get-csrf-token/',
      })
      .then(res => res.data.csrfToken)
  }

  _setupMockAxios() {
    this.$mockAxios.interceptors.request.use(
      async config => config,
      err => Promise.reject(err),
    )
  }
}
