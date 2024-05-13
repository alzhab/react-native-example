import { Container } from 'inversify'
import { HttpClient, HttpClientId, IHttpClient } from 'services/HttpClientService'
import { IMockAdapter, MockAdapter, MockAdapterId } from './MockAdapter'
import {
  IMediaPickerService,
  MediaPickerService,
  MediaPickerServiceId,
} from 'services/MediaPickerService'

export function bindServices(container: Container) {
  container.bind<IMediaPickerService>(MediaPickerServiceId).to(MediaPickerService)
  container.bind<IHttpClient>(HttpClientId).to(HttpClient)
  container.get<IHttpClient>(HttpClientId).init()
  container.bind<IMockAdapter>(MockAdapterId).to(MockAdapter)
  container.get<IMockAdapter>(MockAdapterId).init()
}
