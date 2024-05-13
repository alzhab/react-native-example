import { inject, injectable } from 'inversify'
import { IVotesListActions } from './types'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import { IVotesStore, VotesStoreId } from 'blms/VotesBlm/store'

export const VotesListActionsId = Symbol.for('VotesListActions')

@injectable()
export class VotesListActions implements IVotesListActions {
  constructor(
    @inject(VotesStoreId) private votesStore: IVotesStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
  ) {}

  getListHome(): void {
    this.apiRepo
      .mainVotingListGET({
        query: { page_size: 3, page: 1, ordering: '-start_date' },
      })
      .then(res => {
        this.votesStore.setHomeList(res.data.results)
        this.votesStore.setListMaxCount(res.data.count)
      })
      .finally(() => this.votesStore.setListHomeLoading(false))
  }
}
