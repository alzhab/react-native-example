import { inject, injectable } from 'inversify'
import { IConfirmModalActions } from './types'
import { ConfirmModalStoreId, IConfirmModalStore } from 'blms/ConfirmModalBlm/store'

export const ConfirmModalActionsId = Symbol.for('ConfirmModalActions')

@injectable()
export class ConfirmModalActions implements IConfirmModalActions {
  constructor(@inject(ConfirmModalStoreId) private confirmModalStore: IConfirmModalStore) {}

  closeConfirmModal(): void {
    this.confirmModalStore.setConfirmModalData({})
    this.confirmModalStore.setIsModalOpen(false)
  }

  openConfirmModal(data: IConfirmModalStore['confirmModalData']): void {
    this.confirmModalStore.setConfirmModalData(data)
    this.confirmModalStore.setIsModalOpen(true)
  }
}
