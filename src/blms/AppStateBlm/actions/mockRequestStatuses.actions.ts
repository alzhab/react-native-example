import { inject, injectable } from 'inversify'
import { IMockRequestStatusesActions } from './types'
import { IMockRequestStatusesStore, IStatusButton } from '../store/types'
import { MockRequestStatusesStoreId } from '../store'

export const MockRequestStatusesActionsId = Symbol.for('MockRequestStatusesActions')

@injectable()
export class MockRequestStatusesActions implements IMockRequestStatusesActions {
  constructor(
    @inject(MockRequestStatusesStoreId) private mockRequestStore: IMockRequestStatusesStore,
  ) {}

  closeStatusesDialog(): void {
    this.mockRequestStore.setShowMockRequestDialog(false)
    this.mockRequestStore.setStatusButtons([])
    this.mockRequestStore.setStatusTitle('')
  }

  openStatusesDialog(data: { buttons: IStatusButton[]; title: string }): void {
    this.mockRequestStore.setShowMockRequestDialog(true)
    this.mockRequestStore.setStatusButtons(data.buttons)
    this.mockRequestStore.setStatusTitle(data.title)
  }
}
