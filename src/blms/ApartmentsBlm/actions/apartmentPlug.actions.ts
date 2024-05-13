import { inject, injectable } from 'inversify'
import { IApartmentPlugActions } from './types'
import { ApartmentsStoreId, IApartmentsStore } from 'blms/ApartmentsBlm/store'
import {
  IApartmentAdapter,
  IOwnerStatus,
  IUserTypeEnum,
} from 'repositories/Api'

export const ApartmentPlugActionsId = Symbol.for('ApartmentPlugActions')

@injectable()
export class ApartmentPlugActions implements IApartmentPlugActions {
  constructor(
    @inject(ApartmentsStoreId)
    private store: IApartmentsStore,
  ) {}

  checkApartmentAction(data: {
    call: () => void
    type?: keyof Pick<
      IApartmentAdapter,
      'can_work_applications' | 'can_work_votes' | 'is_osi'
    >
  }): void {
    const apartment = this.store.choosedApartment
    const isApartmentChoosed = !!apartment.id
    const type = data.type

    if (type) {
      const oneHasPermission = this.store.list.some(item => {
        if (item.type_user === IUserTypeEnum.Owner) {
          return (
            item.owner_status === IOwnerStatus.Approved &&
            (data.type === 'is_osi' ? item.is_osi : true)
          )
        } else {
          return item[type]
        }
      })
      if (oneHasPermission) {
        data.call()
      } else {
        const isOwnerApart = this.store.list.some(
          item => item.type_user === IUserTypeEnum.Owner,
        )
        this.store.setPlugType(
          isOwnerApart ? IUserTypeEnum.Owner : IUserTypeEnum.Tenant,
        )
        this.store.setIsPlugModalOpen(true)
      }
    } else {
      if (isApartmentChoosed) {
        data.call()
      } else {
        this.store.setPlugType(IUserTypeEnum.Tenant)
        this.store.setIsPlugModalOpen(true)
      }
    }
  }

  close(): void {
    this.store.setIsPlugModalOpen(false)
  }
}
