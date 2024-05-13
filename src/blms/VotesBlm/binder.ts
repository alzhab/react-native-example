import { Container } from 'inversify'

import {
  IVotesListActions,
  VotesListActions,
  VotesListActionsId,
} from './actions'

import { IVotesStore, VotesStore, VotesStoreId } from './store'


export const bindVotesBlm = (container: Container) => {
  container.bind<IVotesStore>(VotesStoreId).to(VotesStore)
  container.bind<IVotesListActions>(VotesListActionsId).to(VotesListActions)
}
