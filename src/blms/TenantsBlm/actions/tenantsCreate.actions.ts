import { inject, injectable } from 'inversify'
import { ITenantCreateData, ITenantsCreateActions } from './types'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'
import { ITenantsStore, TenantsStoreId } from 'blms/TenantsBlm/store'
import { ETenantsFlowEvents } from 'blms/TenantsBlm/flow'
import { ApartmentsStoreId, IApartmentsStore } from 'blms/ApartmentsBlm/store'
import Toast from 'react-native-toast-message'

export const TenantsCreateActionsId = Symbol.for('TenantsCreateActions')

@injectable()
export class TenantsCreateActions implements ITenantsCreateActions {
  constructor(
    @inject(ApiRepoId) private apiRepo: IApiRepo,
    @inject(TenantsStoreId) private tenantsStore: ITenantsStore,
    @inject(ApartmentsStoreId) private apartmentsStore: IApartmentsStore,
  ) {}

  submit(data: ITenantCreateData): void {
    if (this.apartmentsStore.apartmentDetail?.id) {
      EVENT_EMITTER.emitEvent({
        name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING,
      })
      this.apiRepo
        .tenantCreate({
          body: {
            apartment: this.apartmentsStore.apartmentDetail?.id || 0,
            user: { phone: data.phone },
          },
        })
        .then(res => {
          this.closeCreateModal()
          EVENT_EMITTER.emitEvent({
            name: ETenantsFlowEvents.RELOAD_TENANTS_LIST,
          })

          if (res.data.is_new) {
            EVENT_EMITTER.emitEvent({
              name: ETenantsFlowEvents.OPEN_TEMP_PASSWORD_MODAL,
              data: {
                data: {
                  temp_password: res.data.password_trial,
                  data: res.data.data,
                },
              },
            })
          } else {
            // TODO показывать окно успеха
            Toast.show({
              type: 'success',
              text1:
                'Пользователь уже существует, недвижимость успешно привязана',
            })
          }
        })
        .catch(() => {
          EVENT_EMITTER.emitEvent({
            name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING,
          })
        })
    } else {
      Toast.show({ type: 'error', text1: 'apartmentDetail null' })
    }
  }

  openCreateModal(): void {
    this.tenantsStore.setCreateModalOpen(true)
  }

  closeCreateModal(): void {
    this.tenantsStore.setCreateModalOpen(false)
  }
}
