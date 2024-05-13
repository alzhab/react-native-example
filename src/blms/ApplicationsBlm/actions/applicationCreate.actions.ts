import { inject, injectable } from 'inversify'
import { IApplicationCreateActions, IApplicationSubmitData } from './types'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import { IS_IOS } from 'configs/Theme/constants'
import { ContentType } from 'base/BaseRest'
import { InteractionManager } from 'react-native'
import { ApplicationsStoreId, IApplicationsStore } from '../store'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'
import Toast from 'react-native-toast-message'

export const ApplicationCreateActionsId = Symbol.for('ApplicationCreateActions')

@injectable()
export class ApplicationCreateActions implements IApplicationCreateActions {
  constructor(
    @inject(ApiRepoId) private apiRepo: IApiRepo,
    @inject(ApplicationsStoreId) private applicationsStore: IApplicationsStore,
  ) {}

  submit(data: IApplicationSubmitData): void {
    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    const files = data.files.map(item => ({
      name: item.name,
      type: item.type,
      uri: IS_IOS ? item.uri?.replace('file://', '') : item.uri,
    }))

    this.apiRepo
      .mainApplicationCreate({
        body: {
          apartment: data.house.val,
          type: data.type.val,
          category: data.category.val,
          place: data.place || 'place',
          phone: data.phone,
          description: data.description,
          files: [],
        },
      })
      .then(res => {
        if (files.length) {
          return Promise.all(
            files.map(file =>
              this.apiRepo.mainApplicationFileCreate({
                body: { file, application: res.data.id },
                type: ContentType.FormData,
              }),
            ),
          )
            .then(() => res)
            .catch(() => {
              Toast.show({ type: 'error', text1: 'Не удалось прикрепить файл' })
              return Promise.resolve(res)
            })
        } else {
          return res
        }
      })
      .then(res => {
        this.applicationsStore.setCreateSuccess(res.data.id)
        setTimeout(() => {
          InteractionManager.runAfterInteractions(() => {
            EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
          })
        }, 600)
      })
      .catch(err => {
        InteractionManager.runAfterInteractions(() => {
          EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
        })

        return Promise.reject(err)
      })
      .finally(() => {
        EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
      })
  }

  clear(): void {
    this.applicationsStore.setCreateSuccess(0)
  }
}
