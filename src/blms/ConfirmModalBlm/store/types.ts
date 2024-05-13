export interface IConfirmModalStore {
  confirmModalData: IConfirmModalData
  setConfirmModalData(val: IConfirmModalData): void

  isModalOpen: boolean
  setIsModalOpen(val: IConfirmModalStore['isModalOpen']): void
}

export interface IConfirmModalData {
  title?: string
  desc?: string
  confirmTitle?: string
  cancelTitle?: string
  confirmCallback?: () => void
  cancelCallback?: () => void
}
