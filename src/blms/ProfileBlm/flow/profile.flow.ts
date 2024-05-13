import { inject, injectable } from 'inversify'
import { EProfileFlowEvents, IProfileFlow } from './types'
import { IProfileDeleteActions, ProfileDeleteActionsId } from 'blms/ProfileBlm/actions'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { IFlowReactions } from 'blms/types'

export const ProfileFlowId = Symbol.for('ProfileFlow')
EVENT_EMITTER.addFlowId(ProfileFlowId)

@injectable()
export class ProfileFlow implements IProfileFlow {
  constructor(
    @inject(ProfileDeleteActionsId) private profileDeleteActions: IProfileDeleteActions,
  ) {}

  get reactions(): IFlowReactions {
    return {
      [EProfileFlowEvents.ON_DELETE_PROFILE]: this.onDeleteProfile.bind(this),
    }
  }

  onDeleteProfile() {
    this.profileDeleteActions.deleteProfile()
  }
}
