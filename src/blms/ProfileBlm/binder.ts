import { Container } from 'inversify'
import { ProfileStore, ProfileStoreId, IProfileStore } from './store'

import { ProfileFlow, ProfileFlowId, IProfileFlow } from './flow'

import {
  ProfilePasswordEditActions,
  ProfilePasswordEditActionsId,
  IProfilePasswordEditActions,
} from './actions'

import { ProfileEditActions, ProfileEditActionsId, IProfileEditActions } from './actions'

import { ProfileDeleteActions, ProfileDeleteActionsId, IProfileDeleteActions } from './actions'

export const bindProfileBlm = (container: Container) => {
  container.bind<IProfileStore>(ProfileStoreId).to(ProfileStore)
  container.bind<IProfileFlow>(ProfileFlowId).to(ProfileFlow)
  container
    .bind<IProfilePasswordEditActions>(ProfilePasswordEditActionsId)
    .to(ProfilePasswordEditActions)
  container.bind<IProfileEditActions>(ProfileEditActionsId).to(ProfileEditActions)
  container.bind<IProfileDeleteActions>(ProfileDeleteActionsId).to(ProfileDeleteActions)
}
