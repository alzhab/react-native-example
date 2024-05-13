import { inject, injectable } from 'inversify'
import { EApartmentsFlowEvents, IApartmentsFlow, IApartmentsFlowData } from './types'
import {
  ApartmentPlugActionsId,
  ApartmentsListActionsId,
  IApartmentPlugActions,
  IApartmentsListActions,
} from 'blms/ApartmentsBlm/actions'
import { IFlowReactions } from 'blms/types'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'

export const ApartmentsFlowId = Symbol.for('ApartmentsFlow')
EVENT_EMITTER.addFlowId(ApartmentsFlowId)

@injectable()
export class ApartmentsFlow implements IApartmentsFlow {
  constructor(
    @inject(ApartmentsListActionsId) private apartmentsListActions: IApartmentsListActions,
    @inject(ApartmentPlugActionsId) private apartmentPlugActions: IApartmentPlugActions,
  ) {}

  get reactions(): IFlowReactions {
    return {
      [EApartmentsFlowEvents.ON_APARTMENT_CREATED]: this.onApartmentCreated.bind(this),
      [EApartmentsFlowEvents.ON_APARTMENT_GUARD_ACTION]: this.onApartmentGuardAction.bind(this),
      [EApartmentsFlowEvents.OPEN_APARTMENT_REFRESH]: this.onApartmentsRefresh.bind(this),
    }
  }

  onApartmentCreated() {
    this.apartmentsListActions.reloadList()
  }

  onApartmentGuardAction(
    data: IApartmentsFlowData[EApartmentsFlowEvents.ON_APARTMENT_GUARD_ACTION],
  ) {
    // Временно что бы выйти
    this.apartmentPlugActions.checkApartmentAction(data)
  }

  onApartmentsRefresh() {
    this.apartmentsListActions.reloadList()
  }
}
