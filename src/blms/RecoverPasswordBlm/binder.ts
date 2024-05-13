import { Container } from 'inversify'
import { RecoverPasswordStore, RecoverPasswordStoreId, IRecoverPasswordStore } from './store'

import {
  RecoverPasswordActions,
  RecoverPasswordActionsId,
  IRecoverPasswordActions,
} from './actions'

export const bindRecoverPasswordBlm = (container: Container) => {
  container.bind<IRecoverPasswordStore>(RecoverPasswordStoreId).to(RecoverPasswordStore)
  container.bind<IRecoverPasswordActions>(RecoverPasswordActionsId).to(RecoverPasswordActions)
}
