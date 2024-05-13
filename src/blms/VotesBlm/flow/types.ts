import { IBaseFlow } from '@corrbo/base/IOC'
import { IVotesStore } from 'blms/VotesBlm/store'
import { IApplicationsStore } from 'blms/ApplicationsBlm/store'
import { IApplications, IVoting } from 'repositories/Api'
import { EApplicationDetailFlowEvents } from 'blms/ApplicationsBlm/flow'
export type IVotesDetailFlow = IBaseFlow & {}

export enum EVotesDetailFlowEvents {
  OPEN_VOTE_DETAIl = 'OPEN_VOTE_DETAIl',
  DELETE_VOTE = 'DELETE_VOTE',
  OPEN_VOTE_EDIT = 'OPEN_VOTE_EDIT',
}

export type IVotesDetailFlowData = {
  [EVotesDetailFlowEvents.OPEN_VOTE_DETAIl]: { id: IVotesStore['detailDataId'] }
  [EVotesDetailFlowEvents.DELETE_VOTE]: { id: IVoting['id'] }
  [EVotesDetailFlowEvents.OPEN_VOTE_EDIT]: { id: IVotesStore['detailDataId'] }
}

export type IVoteFlow = IBaseFlow & {}
