import { Container } from 'inversify'
import {
  LogoutActions,
  LogoutActionsId,
  ILogoutActions,
  IRegistrationActions,
  RegistrationActionsId,
  RegistrationActions,
  IChangeTempPasswordActions,
} from './actions'

import { AuthenticationFlow, AuthenticationFlowId, IAuthenticationFlow } from './flow'

import { AuthorizationActions, AuthorizationActionsId, IAuthorizationActions } from './actions'

import { PlugActions, PlugActionsId, IPlugActions } from './actions'
import {
  AuthenticationStore,
  AuthenticationStoreId,
  IAuthenticationStore,
  IChangeTempPasswordStore,
  IRegistrationStore,
  RegistrationStore,
  RegistrationStoreId,
} from './store'
import {
  ChangeTempPasswordStore,
  ChangeTempPasswordStoreId,
} from 'blms/AuthenticationBlm/store/changeTempPassword.store'
import {
  ChangeTempPasswordActions,
  ChangeTempPasswordActionsId,
} from 'blms/AuthenticationBlm/actions/changeTempPassword.actions'

export const bindAuthenticationBlm = (container: Container) => {
  container.bind<ILogoutActions>(LogoutActionsId).to(LogoutActions)
  container.bind<IRegistrationActions>(RegistrationActionsId).to(RegistrationActions)
  container
    .bind<IChangeTempPasswordActions>(ChangeTempPasswordActionsId)
    .to(ChangeTempPasswordActions)
  container.bind<IAuthenticationFlow>(AuthenticationFlowId).to(AuthenticationFlow)
  container.bind<IAuthorizationActions>(AuthorizationActionsId).to(AuthorizationActions)
  container.bind<IPlugActions>(PlugActionsId).to(PlugActions)
  container.bind<IAuthenticationStore>(AuthenticationStoreId).to(AuthenticationStore)
  container.bind<IRegistrationStore>(RegistrationStoreId).to(RegistrationStore)
  container.bind<IChangeTempPasswordStore>(ChangeTempPasswordStoreId).to(ChangeTempPasswordStore)
}
