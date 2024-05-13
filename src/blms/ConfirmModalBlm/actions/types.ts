import { IConfirmModalStore } from 'blms/ConfirmModalBlm/store'

export interface IConfirmModalActions {
  openConfirmModal(data: IConfirmModalStore['confirmModalData']): void
  closeConfirmModal(): void
}
