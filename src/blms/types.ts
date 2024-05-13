import { EAppStateFlowEvents, IAppStateFlowData } from 'blms/AppStateBlm/flow'
import { EApartmentsFlowEvents, IApartmentsFlowData } from 'blms/ApartmentsBlm/flow'

import { EProfileFlowEvents, IProfileFlowData } from 'blms/ProfileBlm/flow'
import { ENewsFlowEvents, INewsFlowData } from 'blms/NewsBlm/flow'
import { EApplicationDetailFlowEvents, IApplicationDetailFlowData } from 'blms/ApplicationsBlm/flow'
import { EFloatInfoFlowEvents, IFloatInfoFlowData } from 'blms/FloatInfoBlm/flow'
import { EVotesDetailFlowEvents, IVotesDetailFlowData } from 'blms/VotesBlm/flow'
import { EGuideFlowEvents, IGuideFlowData } from 'blms/GuideBlm/flow'
import { EGlobalLoadingFlowEvents, IGlobalLoadingFlowData } from 'blms/GlobalLoadingBlm/flow'
import { EAuthenticationFlowEvents, IAuthenticationFlowData } from 'blms/AuthenticationBlm/flow'
import { ETenantsFlowEvents, ITenantsFlowData } from 'blms/TenantsBlm/flow'
import { EConfirmModalFlowEvents, IConfirmModalFlowData } from 'blms/ConfirmModalBlm/flow'
import { EInProgressFlowEvents, IInProgressFlowData } from 'blms/InProgressBlm/flow'
import { EMediaViewFlowEvents, IMediaViewFlowData } from 'blms/MediaViewBlm/flow'

export type IFlowReactions = {
  [key in EFlowEvents]: IFlowAction<key>
}

export type IFlowAction<EventName extends EFlowEvents> =
  undefined extends IFlowReactionsData[EventName]
    ? {
        (): void
      }
    : {
        (data: IFlowReactionsData[EventName]): void
      }

export type EFlowEvents = EProfileFlowEvents &
  EApartmentsFlowEvents &
  ENewsFlowEvents &
  EApplicationDetailFlowEvents &
  EFloatInfoFlowEvents &
  EVotesDetailFlowEvents &
  EGuideFlowEvents &
  EGlobalLoadingFlowEvents &
  EAuthenticationFlowEvents &
  EAppStateFlowEvents &
  ETenantsFlowEvents &
  EConfirmModalFlowEvents &
  EInProgressFlowEvents &
  EMediaViewFlowEvents

// export const EFlowEvents = {
//   ...EProfileFlowEvents,
//   ...EApartmentsFlowEvents,
//   ...ENewsFlowEvents,
//   ...EApplicationDetailFlowEvents,
//   ...EFloatInfoFlowEvents,
//   ...EVotesDetailFlowEvents,
//   ...EGuideFlowEvents,
//   ...EGlobalLoadingFlowEvents,
//   ...EAuthenticationFlowEvents,
//   ...EAppStateFlowEvents,
// }

export type IFlowReactionsData = IProfileFlowData &
  IApartmentsFlowData &
  INewsFlowData &
  IApplicationDetailFlowData &
  IFloatInfoFlowData &
  IVotesDetailFlowData &
  IGuideFlowData &
  IGlobalLoadingFlowData &
  IAuthenticationFlowData &
  IAppStateFlowData &
  ITenantsFlowData &
  IConfirmModalFlowData &
  IInProgressFlowData &
  IMediaViewFlowData
