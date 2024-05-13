import { inject, injectable } from 'inversify'
import { EVotesDetailFlowEvents, IVotesDetailFlow } from './types'
import { IVotesStore, VotesStoreId } from 'blms/VotesBlm/store'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { IFlowReactions } from 'blms/types'
import {
  INavigationService,
  NavigationServiceId,
} from '@corrbo/module-navigation/services'
import { IVotesListActions, VotesListActionsId } from 'blms/VotesBlm/actions'

export const VotesDetailFlowId = Symbol.for('VotesDetailFlow')
EVENT_EMITTER.addFlowId(VotesDetailFlowId)

@injectable()
export class VotesDetailFlow implements IVotesDetailFlow {
  constructor(
    @inject(VotesStoreId) private votesStore: IVotesStore,
    @inject(NavigationServiceId) private navigation: INavigationService,
    @inject(VotesListActionsId)
    private applicationListActions: IVotesListActions,
  ) {}

  get reactions(): IFlowReactions {
    return {
      [EVotesDetailFlowEvents.OPEN_VOTE_DETAIl]: () => {},
      [EVotesDetailFlowEvents.OPEN_VOTE_EDIT]: () => {},
      [EVotesDetailFlowEvents.DELETE_VOTE]: () => {},
    }
  }
}
