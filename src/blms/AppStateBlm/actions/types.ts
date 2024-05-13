import { IStatusButton } from 'blms/AppStateBlm/store/types'

export interface IMockRequestStatusesActions {
  openStatusesDialog(data: { buttons: IStatusButton[]; title: string }): void
  closeStatusesDialog(): void
}

export interface IServerApiStopActions {
  openServerStopPlug(): void
  refreshCheck(): void
  closeServerStopPlug(): void
}
