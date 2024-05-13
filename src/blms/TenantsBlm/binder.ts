import { Container } from 'inversify'
import {
  TenantsPermissionChangeActions,
  TenantsPermissionChangeActionsId,
  ITenantsPermissionChangeActions,
} from './actions'

import { TenantDeleteActions, TenantDeleteActionsId, ITenantDeleteActions } from './actions'

import { TempPasswordActions, TempPasswordActionsId, ITempPasswordActions } from './actions'

import { TenantsFlow, TenantsFlowId, ITenantsFlow } from './flow'

import { TenantsStore, TenantsStoreId, ITenantsStore } from './store'

import { TenantsListActions, TenantsListActionsId, ITenantsListActions } from './actions'

import { TenantsCreateActions, TenantsCreateActionsId, ITenantsCreateActions } from './actions'

export const bindTenantsBlm = (container: Container) => {
  container
    .bind<ITenantsPermissionChangeActions>(TenantsPermissionChangeActionsId)
    .to(TenantsPermissionChangeActions)
  container.bind<ITenantDeleteActions>(TenantDeleteActionsId).to(TenantDeleteActions)
  container.bind<ITempPasswordActions>(TempPasswordActionsId).to(TempPasswordActions)
  container.bind<ITenantsFlow>(TenantsFlowId).to(TenantsFlow)
  container.bind<ITenantsStore>(TenantsStoreId).to(TenantsStore)
  container.bind<ITenantsListActions>(TenantsListActionsId).to(TenantsListActions)
  container.bind<ITenantsCreateActions>(TenantsCreateActionsId).to(TenantsCreateActions)
}
