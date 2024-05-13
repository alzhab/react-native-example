import { inject, injectable } from 'inversify'
import { ITempPasswordActions } from './types'
import { ITenantsStore, TenantsStoreId } from 'blms/TenantsBlm/store'
import Clipboard from '@react-native-clipboard/clipboard'
import Toast from 'react-native-toast-message'
import Share from 'react-native-share'

export const TempPasswordActionsId = Symbol.for('TempPasswordActions')

@injectable()
export class TempPasswordActions implements ITempPasswordActions {
  constructor(@inject(TenantsStoreId) private tenantsStore: ITenantsStore) {}
  closeTempModal(): void {
    this.tenantsStore.setTempPasswordModalOpen(false)
  }

  openTempModal(): void {
    this.tenantsStore.setTempPasswordModalOpen(true)
  }

  setTempData(data: ITenantsStore['tempPasswordModalData']): void {
    this.tenantsStore.setTempPasswordModalData(data)
  }

  share(): void {
    Share.open({
      message: this.tenantsStore.tempPasswordModalData.data,
    })
  }

  copy(): void {
    Clipboard.setString(this.tenantsStore.tempPasswordModalData.temp_password)
    Toast.show({ type: 'success', text1: 'Пароль скопирован' })
  }
}
