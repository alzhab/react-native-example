import { IMediaFile } from 'services/MediaPickerService'
import { IVotingTypeEnum, IVotingVote } from 'repositories/Api/models'

export interface IVotesListActions {
  getListHome(): void
}

export interface IVoteCreateActions {
  submit(data: IVotingSubmitData): void
}

export interface IVotingSubmitData {
  dateFinish: Date
  desc: string
  name: string
  photos: IMediaFile[]
  files: IMediaFile[]
  type: { title: string; val: IVotingTypeEnum }
  apartment: { title: string; val: number }
  options: string[]
}

export interface IVoteDetailActions {
  getDetail(): void
  clearData(): void
  voteCreate(vote: IVotingVote): void
  archive(): void
  getReportFile(type: 'pdf' | 'xlsx'): void
}

export interface IVotesDeleteActions {
  deleteItem(data: { id: number }): Promise<any>
}
