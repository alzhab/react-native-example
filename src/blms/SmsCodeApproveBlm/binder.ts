import { Container } from 'inversify'
import { SmsCodeApproveStore, SmsCodeApproveStoreId, ISmsCodeApproveStore } from './store'

import { SmsCodeApproveActions, SmsCodeApproveActionsId, ISmsCodeApproveActions } from './actions'

export const bindSmsCodeApproveBlm = (container: Container) => {
  container.bind<ISmsCodeApproveStore>(SmsCodeApproveStoreId).to(SmsCodeApproveStore)
  container.bind<ISmsCodeApproveActions>(SmsCodeApproveActionsId).to(SmsCodeApproveActions)
}
