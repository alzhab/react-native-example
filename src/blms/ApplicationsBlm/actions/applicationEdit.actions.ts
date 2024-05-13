import { inject, injectable } from 'inversify'
import { IApplicationEditActions, IApplicationSubmitData } from './types'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import { IS_IOS } from 'configs/Theme/constants'
import { ContentType } from 'base/BaseRest'
import { INavigationService, NavigationServiceId } from '@corrbo/module-navigation/services'
import { ApplicationsStoreId, IApplicationsStore } from 'blms/ApplicationsBlm/store'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'

export const ApplicationEditActionsId = Symbol.for('ApplicationEditActions')

@injectable()
export class ApplicationEditActions implements IApplicationEditActions {
  constructor(
    @inject(ApiRepoId) private apiRepo: IApiRepo,
    @inject(ApplicationsStoreId) private applicationStore: IApplicationsStore,
    @inject(NavigationServiceId) private navigationService: INavigationService,
  ) {}

  getDetail(): void {
    this.apiRepo
      .mainApplicationDetail({ query: { id: this.applicationStore.editDataId } })
      .then(res => {
        if (res.data.can_edit) {
          this.applicationStore.setEditData(res.data)
        } else {
          this.navigationService.goBack()
        }
      })
      .finally(() => this.applicationStore.setEditDataLoading(false))
  }

  clear(): void {
    this.applicationStore.setEditDataLoading(true)
    this.applicationStore.setEditData(null)
  }

  submit(data: IApplicationSubmitData): void {
    const files = data.files.map(item => ({
      name: item.name,
      type: item.type,
      uri: IS_IOS ? item.uri?.replace('file://', '') : item.uri,
    }))

    EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
    this.apiRepo
      .mainApplicationPUT({
        query: { id: this.applicationStore.editDataId },
        body: {
          apartment: data.house.val,
          type: data.type.val,
          category: data.category.val,
          place: data.place,
          phone: data.phone,
          description: data.description,
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
          ).then(() => res)
        } else {
          return res
        }
      })
      .then(res => {
        return Promise.all(
          data.deleted_files_ids.map(file_id =>
            this.apiRepo.mainApplicationFileDelete({
              query: { id: file_id },
            }),
          ),
        ).then(() => res)
      })
      .then(() => this.navigationService.goBack())
      .finally(() => EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING }))
  }
}
