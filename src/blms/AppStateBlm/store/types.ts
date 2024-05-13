export interface IMockRequestStatusesStore {
  showMockRequestDialog: boolean
  setShowMockRequestDialog(val: boolean): void

  statusButtons: IStatusButton[]
  setStatusButtons(val: IStatusButton[]): void

  title: string
  setStatusTitle(val: string): void
}

export interface IStatusButton {
  title: string
  val: any
  onPress: () => void
}

export interface IServerapistopStore {
  isPlugOpen: boolean
  setIsPlugOpen(val: IServerapistopStore['isPlugOpen']): void
}
