import { Container } from 'inversify'

import { ApiRepo, ApiRepoId, IApiRepo } from 'repositories/Api'
import { IYandexMapRepo } from 'repositories/YandexMap/types'
import { YandexMapRepo, YandexMapRepoId } from 'repositories/YandexMap/yandex-map.repo'

export function bindRepositories(container: Container) {
  container.bind<IApiRepo>(ApiRepoId).to(ApiRepo)
  container.bind<IYandexMapRepo>(YandexMapRepoId).to(YandexMapRepo)
}
